# Building a RAG Chatbot for Bodha — Complete Implementation Guide

This guide walks you through adding an AI chatbot to bodha.org that can answer questions about Bodha's research, blog articles, big questions, library books, wiki entries, Anveshi, and the knowledge base. The chatbot will be grounded in your actual content — it searches your material first, then generates answers from it, rather than hallucinating.

**Stack:** Groq (free LLM inference) + Supabase pgvector (semantic search over your content) + SvelteKit API route + Svelte chat widget.

**Estimated time:** 3–4 hours for the full implementation.

---

## How it works (read this first)

A user types "what does Bodha say about Hindu models of temple management?" The chatbot:

1. Converts that question into a vector embedding (a list of ~1536 numbers that captures its meaning)
2. Searches your Supabase database for content chunks whose embeddings are mathematically closest to that question
3. Takes the top 5 matching chunks (e.g. a paragraph from your research article, a book summary, a big-question description)
4. Sends those chunks + the original question to Groq's Llama model
5. Groq generates a grounded answer, citing only what was found

This is called Retrieval-Augmented Generation (RAG). The model cannot make up things about your site because it only sees what the search retrieved.

---

## Part 1: Groq API Setup

### 1.1 Create a Groq account and get an API key

Go to **https://console.groq.com**. Sign up with your Google account or email. You will land on the console dashboard.

In the left sidebar, click **API Keys**. Click **Create API Key**. Name it `bodha-chatbot`. Copy the key immediately — it is only shown once. It looks like `gsk_xxxxxxxxxxxxxxxxxxxx`.

Groq's free tier as of 2025: 14,400 requests/day, 6,000 tokens/minute. This is more than enough for a site chatbot.

### 1.2 Add the key to your environment

Open the file `.env` in the root of your project (`/Users/amrit/Documents/GitHub/bodhaNew2/.env`). If it doesn't exist, create it. Add this line:

```
GROQ_API_KEY=gsk_your_actual_key_here
```

Then open `.env.example` (or create it if absent) and add the placeholder:

```
GROQ_API_KEY=your_groq_api_key
```

SvelteKit automatically loads `.env` in development. On Vercel, you will add this later (Part 5).

**Important:** SvelteKit distinguishes between public and private env vars. A key starting with `PUBLIC_` is exposed to the browser. `GROQ_API_KEY` does NOT start with `PUBLIC_`, so it stays server-side only. You will access it via `$env/static/private` in your server route. Never expose this key to the browser.

---

## Part 2: Supabase pgvector Setup

You already have Supabase connected. This part sets up a new table to store your content chunks and their vector embeddings, and a function to search them.

### 2.1 Enable the pgvector extension

Go to **https://supabase.com** and open your project (the one with URL `sddlbohniijgegvypkfk.supabase.co` based on your image URLs).

In the left sidebar, click **Database** → **Extensions**.

Search for `vector`. Find the extension named **vector** (description: "Open-source vector similarity search for Postgres"). Click the toggle to enable it. It will ask for confirmation. Confirm.

### 2.2 Create the content chunks table

In the left sidebar, click **SQL Editor**. Click **New query**. Paste this entire block and click **Run**:

```sql
-- Create the table that stores all your content as searchable chunks
CREATE TABLE IF NOT EXISTS content_chunks (
  id          bigserial PRIMARY KEY,
  source_type text      NOT NULL,  -- 'blog', 'research', 'big-question', 'library', 'wiki', 'anveshi', 'path'
  source_slug text      NOT NULL,  -- the filename/slug, e.g. 'hindu-school-of-history'
  title       text      NOT NULL,
  url_path    text      NOT NULL,  -- the actual route, e.g. '/research/hindu-school-of-history'
  chunk_text  text      NOT NULL,  -- the text chunk that was embedded
  embedding   vector(1536),        -- the numeric representation of chunk_text
  metadata    jsonb     DEFAULT '{}'::jsonb,
  created_at  timestamptz DEFAULT now()
);

-- Create the index that makes vector search fast
CREATE INDEX IF NOT EXISTS content_chunks_embedding_idx
  ON content_chunks
  USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);
```

You should see "Success. No rows returned." This created the table and the search index.

### 2.3 Create the search function

Still in the SQL Editor, run a second query:

```sql
-- This function takes a query embedding and returns the closest chunks
CREATE OR REPLACE FUNCTION match_content_chunks(
  query_embedding vector(1536),
  match_count     int DEFAULT 5,
  match_threshold float DEFAULT 0.3
)
RETURNS TABLE (
  id          bigint,
  source_type text,
  source_slug text,
  title       text,
  url_path    text,
  chunk_text  text,
  metadata    jsonb,
  similarity  float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    c.id,
    c.source_type,
    c.source_slug,
    c.title,
    c.url_path,
    c.chunk_text,
    c.metadata,
    1 - (c.embedding <=> query_embedding) AS similarity
  FROM content_chunks c
  WHERE 1 - (c.embedding <=> query_embedding) > match_threshold
  ORDER BY c.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
```

### 2.4 Get your Supabase service role key

You already have `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_PUBLISHABLE_KEY` in your env. For the ingestion script (which writes to the database), you need the **service role key**, which bypasses Row Level Security.

In Supabase, go to **Project Settings** (gear icon in left sidebar) → **Data API**. Under **Project API keys**, copy the key labeled **service_role** (it says "secret" next to it). It starts with `eyJ...`.

Add it to your `.env` file:

```
SUPABASE_SERVICE_ROLE_KEY=eyJ_your_service_role_key
```

**Never expose this key to the browser or commit it to git.** It has full database access.

---

## Part 3: Content Ingestion Script

This script reads all your content (blog .md files, research .md files, library-items.json, wiki-main.json, etc.), splits it into chunks, embeds each chunk, and inserts them into Supabase. You run this once now, and again whenever you add significant new content.

### 3.1 Install the required packages

Open your terminal in the project root and run:

```bash
yarn add -D @supabase/supabase-js
```

Wait — you already have `@supabase/supabase-js` as a dependency. Check with:

```bash
grep supabase package.json
```

If it's there, skip the install. You also need a way to call an embedding API. We'll use Groq's embedding endpoint (they offer `nomic-embed-text` for free), so no new package is needed — it's a plain `fetch` call.

### 3.2 Create the ingestion script

Create a new file at `src/lib/scripts/ingest-content.ts`. Create the `scripts` folder if it doesn't exist.

The full script:

```typescript
// src/lib/scripts/ingest-content.ts
// Run with: npx tsx --env-file=.env src/lib/scripts/ingest-content.ts
//
// This script reads all site content, chunks it, embeds it, and upserts into Supabase.
// Run it once to populate, and again whenever you add new content.
//
// tsconfig note: this file runs via tsx (Node), NOT via SvelteKit's compiler,
// so it is excluded from the SvelteKit tsconfig. If your editor shows path-alias
// errors here (e.g. $lib not found), that is expected — this file uses Node fs/path
// directly and has no SvelteKit aliases.

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// ─── Shared row type ─────────────────────────────────────────────────────────

// Defined once and reused everywhere to avoid the `const rows = []` → never[] pitfall.
// Under strict:true, an untyped empty array literal is inferred as never[] and
// will error when you push into it.
type ChunkRow = {
  source_type: string;
  source_slug: string;
  title: string;
  url_path: string;
  chunk_text: string;
  embedding: number[];
  metadata: Record<string, unknown>;
};

// ─── Config ─────────────────────────────────────────────────────────────────

// Non-null assertions are intentional: if these are missing the script should
// crash loudly at startup, not silently later. The main() function validates
// them with readable errors before any network calls happen.
const SUPABASE_URL = process.env['PUBLIC_SUPABASE_URL'] ?? '';
const SUPABASE_SERVICE_KEY = process.env['SUPABASE_SERVICE_ROLE_KEY'] ?? '';
const GROQ_API_KEY = process.env['GROQ_API_KEY'] ?? '';

// How many characters per chunk. ~600 chars ≈ ~150 tokens, well within embedding limits.
const CHUNK_SIZE = 600;
// Overlap between consecutive chunks so context isn't lost at boundaries
const CHUNK_OVERLAP = 100;

// ─── Supabase client (service role — has write access) ──────────────────────

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// ─── Groq API response shapes ────────────────────────────────────────────────

type GroqEmbeddingResponse = {
  data: Array<{ embedding: number[] }>;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Split a long string into overlapping chunks.
 */
function chunkText(text: string): string[] {
  const chunks: string[] = [];
  let start = 0;
  while (start < text.length) {
    const end = Math.min(start + CHUNK_SIZE, text.length);
    chunks.push(text.slice(start, end).trim());
    if (end === text.length) break;
    start += CHUNK_SIZE - CHUNK_OVERLAP;
  }
  return chunks.filter((c) => c.length > 80); // drop tiny fragments
}

// Frontmatter values can be strings, numbers, arrays, or nested objects.
// Record<string, unknown> is safer than Record<string, any> under strict:true
// because it forces explicit narrowing before use.
type Frontmatter = Record<string, unknown>;

/**
 * Parse frontmatter from a .md file. Returns { metadata, body }.
 */
function parseMd(content: string): { metadata: Frontmatter; body: string } {
  if (!content.startsWith('---')) return { metadata: {}, body: content };
  const end = content.indexOf('---', 3);
  if (end === -1) return { metadata: {}, body: content };
  const frontmatter = content.slice(3, end).trim();
  const body = content.slice(end + 3).trim();
  const metadata: Frontmatter = {};
  for (const line of frontmatter.split('\n')) {
    const colon = line.indexOf(':');
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    const value = line.slice(colon + 1).trim().replace(/^["']|["']$/g, '');
    metadata[key] = value;
  }
  return { metadata, body };
}

// Small helpers to safely extract typed values from unknown frontmatter fields.
// These prevent the TS2571 "Object is of type unknown" errors that arise when
// accessing metadata fields without narrowing under strict:true.
function strVal(v: unknown): string {
  return typeof v === 'string' ? v : '';
}

function strArr(v: unknown): string[] {
  if (Array.isArray(v)) return v.map(String);
  if (typeof v === 'string' && v) return [v];
  return [];
}

function strOrArr(v: unknown): string {
  if (Array.isArray(v)) return v.map(String).join(', ');
  return typeof v === 'string' ? v : '';
}

/**
 * Call Groq's embedding API.
 * Model: nomic-embed-text-v1_5 — free tier, 1536 dimensions.
 */
async function embed(text: string): Promise<number[]> {
  const response = await fetch('https://api.groq.com/openai/v1/embeddings', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'nomic-embed-text-v1_5',
      input: text
    })
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Groq embedding failed: ${response.status} ${err}`);
  }

  const data = (await response.json()) as GroqEmbeddingResponse;

  // Guard against an empty data array — Groq should never return this,
  // but the cast above doesn't prove it at runtime.
  const first = data.data[0];
  if (!first) throw new Error('Groq returned an empty embedding array');

  return first.embedding;
}

/**
 * Upsert a batch of chunks into Supabase.
 * Deletes existing chunks for the slug first so re-runs are safe.
 */
async function upsertChunks(rows: ChunkRow[]): Promise<void> {
  if (rows.length === 0) return;

  // rows[0] is safe here: we checked rows.length > 0 on the line above.
  // We still use the non-null assertion to satisfy the TS compiler, which
  // does not narrow array access through the length check.
  const slug = rows[0]!.source_slug;
  await supabase.from('content_chunks').delete().eq('source_slug', slug);

  const { error } = await supabase.from('content_chunks').insert(rows);
  if (error) throw new Error(`Supabase insert failed: ${error.message}`);
}

/**
 * Small delay to stay within Groq's rate limit (30 req/min on free tier for embeddings).
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─── Content loaders ─────────────────────────────────────────────────────────

type MdEntry = { filePath: string; metadata: Frontmatter; body: string };

/**
 * Load all .md files from a directory and return parsed entries.
 */
function loadMdDir(dirPath: string): MdEntry[] {
  if (!fs.existsSync(dirPath)) return [];
  return fs
    .readdirSync(dirPath)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const filePath = path.join(dirPath, f);
      const content = fs.readFileSync(filePath, 'utf-8');
      return { filePath, ...parseMd(content) };
    });
}

// ─── Ingest functions per content type ───────────────────────────────────────

async function ingestBlog(rootDir: string): Promise<void> {
  console.log('\n📝 Ingesting blog posts...');
  const entries = loadMdDir(path.join(rootDir, 'src/routes/blog'));
  let count = 0;

  for (const { filePath, metadata, body } of entries) {
    const slug = path.basename(filePath, '.md');
    const title = strVal(metadata['title']) || slug;
    const description = strVal(metadata['excerpt']) || strVal(metadata['description']);
    const author = strOrArr(metadata['author']);

    const fullText = `${title}. ${description}\n\n${body}`;
    const chunks = chunkText(fullText);
    // Explicit type annotation prevents the empty-array-as-never[] error
    const rows: ChunkRow[] = [];

    for (const chunk of chunks) {
      await sleep(100); // ~10 embeds/sec, well under rate limit
      const embedding = await embed(chunk);
      rows.push({
        source_type: 'blog',
        source_slug: slug,
        title,
        url_path: `/blog/${slug}`,
        chunk_text: chunk,
        embedding,
        metadata: { author, tags: strArr(metadata['tags']) }
      });
    }

    await upsertChunks(rows);
    count++;
    console.log(`  ✓ ${title} (${chunks.length} chunks)`);
  }

  console.log(`  Blog: ${count} posts ingested.`);
}

async function ingestBigQuestions(rootDir: string): Promise<void> {
  console.log('\n❓ Ingesting big questions...');
  const entries = loadMdDir(path.join(rootDir, 'src/routes/big-questions'));
  let count = 0;

  for (const { filePath, metadata, body } of entries) {
    const slug = path.basename(filePath, '.md');
    const title = strVal(metadata['title']) || slug;
    const description = strVal(metadata['description']);
    const fullText = `Big Question: ${title}. ${description}\n\n${body}`;
    const chunks = chunkText(fullText);
    const rows: ChunkRow[] = [];

    for (const chunk of chunks) {
      await sleep(100);
      const embedding = await embed(chunk);
      rows.push({
        source_type: 'big-question',
        source_slug: slug,
        title,
        url_path: `/big-questions/${slug}`,
        chunk_text: chunk,
        embedding,
        metadata: { tags: strArr(metadata['tags']) }
      });
    }

    await upsertChunks(rows);
    count++;
    console.log(`  ✓ ${title}`);
  }

  console.log(`  Big Questions: ${count} entries ingested.`);
}

async function ingestResearch(rootDir: string): Promise<void> {
  console.log('\n🔬 Ingesting research projects...');
  const entries = loadMdDir(path.join(rootDir, 'src/routes/research'));
  let count = 0;

  for (const { filePath, metadata, body } of entries) {
    const slug = path.basename(filePath, '.md');
    const title = strVal(metadata['title']) || slug;
    const description = strVal(metadata['description']);
    const fullText = `Research project: ${title}. ${description}\n\n${body}`;
    const chunks = chunkText(fullText);
    const rows: ChunkRow[] = [];

    for (const chunk of chunks) {
      await sleep(100);
      const embedding = await embed(chunk);
      rows.push({
        source_type: 'research',
        source_slug: slug,
        title,
        url_path: `/research/${slug}`,
        chunk_text: chunk,
        embedding,
        metadata: { tags: strArr(metadata['tags']) }
      });
    }

    await upsertChunks(rows);
    count++;
    console.log(`  ✓ ${title}`);
  }

  console.log(`  Research: ${count} projects ingested.`);
}

async function ingestAnveshi(rootDir: string): Promise<void> {
  console.log('\n🗺️  Ingesting Anveshi chapters...');
  const entries = loadMdDir(path.join(rootDir, 'src/routes/anveshi'));
  let count = 0;

  for (const { filePath, metadata, body } of entries) {
    const slug = path.basename(filePath, '.md');
    const title = strVal(metadata['title']) || `Anveshi: ${slug}`;
    const fullText = `Anveshi field journey: ${title}.\n\n${body}`;
    const chunks = chunkText(fullText);
    const rows: ChunkRow[] = [];

    for (const chunk of chunks) {
      await sleep(100);
      const embedding = await embed(chunk);
      rows.push({
        source_type: 'anveshi',
        source_slug: slug,
        title,
        url_path: `/anveshi/${slug}`,
        chunk_text: chunk,
        embedding,
        metadata: {}
      });
    }

    await upsertChunks(rows);
    count++;
    console.log(`  ✓ ${title}`);
  }

  console.log(`  Anveshi: ${count} chapters ingested.`);
}

// Typed shape of library-items.json entries
type LibraryItem = {
  id?: number;
  name?: string;
  author?: string;
  summary?: string;
  tags?: string[];
  slug?: string;
  linkfinal?: string;
  topic?: string;
  wikigroup?: string;
};

async function ingestLibrary(rootDir: string): Promise<void> {
  console.log('\n📚 Ingesting library books...');
  const filePath = path.join(rootDir, 'src/lib/serving/library-items.json');
  if (!fs.existsSync(filePath)) {
    console.log('  library-items.json not found, skipping.');
    return;
  }

  const items = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as LibraryItem[];
  let count = 0;

  for (const item of items) {
    const slug = item.slug ?? String(item.id ?? count);
    const title = item.name ?? 'Untitled';
    const author = item.author ?? '';
    const summary = item.summary ?? '';
    const topic = item.topic ?? item.wikigroup ?? '';

    if (!summary && !author) continue;

    const text = `Book: "${title}" by ${author}. Topic: ${topic}. ${summary}`;
    await sleep(100);
    const embedding = await embed(text);

    await upsertChunks([{
      source_type: 'library',
      source_slug: slug,
      title,
      url_path: item.linkfinal ?? '/library',
      chunk_text: text,
      embedding,
      metadata: { author, tags: item.tags ?? [], topic }
    }]);

    count++;
    if (count % 20 === 0) console.log(`  ... ${count} books done`);
  }

  console.log(`  Library: ${count} books ingested.`);
}

// Typed shape of wiki-main.json entries
type WikiItem = {
  filename?: string;
  title?: string;
  type?: string;
  description?: string;
  tags?: string[];
  route?: string;
};

async function ingestWiki(rootDir: string): Promise<void> {
  console.log('\n🌐 Ingesting wiki entries...');
  const filePath = path.join(rootDir, 'src/lib/serving/wiki-main.json');
  if (!fs.existsSync(filePath)) {
    console.log('  wiki-main.json not found, skipping.');
    return;
  }

  const items = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as WikiItem[];
  let count = 0;

  for (const item of items) {
    const slug = item.filename ?? 'unknown';
    const title = item.title ?? slug;
    const description = item.description ?? '';
    const type = item.type ?? 'article';

    if (!description) continue;

    const text = `${type}: "${title}". ${description}`;
    await sleep(100);
    const embedding = await embed(text);

    await upsertChunks([{
      source_type: 'wiki',
      source_slug: slug,
      title,
      url_path: item.route ? `${item.route}/${slug}` : '/wiki',
      chunk_text: text,
      embedding,
      metadata: { type, tags: item.tags ?? [] }
    }]);

    count++;
    if (count % 30 === 0) console.log(`  ... ${count} wiki entries done`);
  }

  console.log(`  Wiki: ${count} entries ingested.`);
}

async function ingestLearningPaths(rootDir: string): Promise<void> {
  console.log('\n🛤️  Ingesting learning paths...');
  const pathsDir = path.join(rootDir, 'src/routes/library/(library-subroutes)/paths');
  const entries = loadMdDir(pathsDir);
  let count = 0;

  for (const { filePath, metadata, body } of entries) {
    const slug = path.basename(filePath, '.md');
    const title = strVal(metadata['title']) || slug;
    const description = strVal(metadata['description']);
    const fullText = `Learning Path: ${title}. ${description}\n\n${body}`;
    const chunks = chunkText(fullText);
    const rows: ChunkRow[] = [];

    for (const chunk of chunks) {
      await sleep(100);
      const embedding = await embed(chunk);
      rows.push({
        source_type: 'path',
        source_slug: slug,
        title,
        url_path: `/library/paths/${slug}`,
        chunk_text: chunk,
        embedding,
        metadata: {}
      });
    }

    await upsertChunks(rows);
    count++;
    console.log(`  ✓ ${title}`);
  }

  console.log(`  Paths: ${count} entries ingested.`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const rootDir = path.resolve(process.cwd());
  console.log('🚀 Bodha content ingestion starting...');
  console.log(`   Project root: ${rootDir}`);
  console.log('   This will take a few minutes due to rate limiting.\n');

  // Validate env vars with readable errors before any network calls
  if (!SUPABASE_URL) throw new Error('PUBLIC_SUPABASE_URL is not set in .env');
  if (!SUPABASE_SERVICE_KEY) throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set in .env');
  if (!GROQ_API_KEY) throw new Error('GROQ_API_KEY is not set in .env');

  await ingestBlog(rootDir);
  await ingestBigQuestions(rootDir);
  await ingestResearch(rootDir);
  await ingestAnveshi(rootDir);
  await ingestLibrary(rootDir);
  await ingestWiki(rootDir);
  await ingestLearningPaths(rootDir);

  console.log('\n✅ Ingestion complete. Your chatbot knowledge base is ready.');
}

// err is unknown in strict mode. We only pass it to console.error which accepts
// unknown, so no cast needed.
main().catch((err: unknown) => {
  console.error('Ingestion failed:', err);
  process.exit(1);
});
```

### 3.3 Run the ingestion script

In your terminal, from the project root:

```bash
npx tsx --env-file=.env src/lib/scripts/ingest-content.ts
```

The `--env-file=.env` flag loads your `.env` variables before running the script. Watch the console output — it logs each piece of content as it processes. The whole run will take 5–15 minutes depending on how many blog posts you have (the rate-limiting sleep keeps it within Groq's free tier limits).

If you see an error like `Groq embedding failed: 429`, the rate limit was hit. Either increase the `sleep(100)` call to `sleep(300)`, or just rerun the script — it deletes and re-inserts by slug so it's safe to run multiple times.

When it finishes, go to Supabase → **Table Editor** → **content_chunks** to verify rows exist.

---

## Part 4: SvelteKit API Route + Chat Widget

### 4.1 Create the chat API route

Create the file `src/routes/api/chat/+server.ts`:

```typescript
// src/routes/api/chat/+server.ts
import { GROQ_API_KEY } from '$env/static/private';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY } from '$env/static/public';
import { createClient } from '@supabase/supabase-js';
import { json, error as kitError } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// ─── Note on the `error` import rename ───────────────────────────────────────
// SvelteKit exports a function named `error`. We rename it to `kitError` here
// to avoid a collision with the `error` property returned by Supabase
// (`const { data, error } = await supabase.rpc(...)`). Without the rename,
// the Supabase destructuring would shadow the SvelteKit function and cause a
// TS2448 "Block-scoped variable used before its declaration" error.

const EMBED_MODEL = 'nomic-embed-text-v1_5';
const CHAT_MODEL = 'llama-3.1-8b-instant'; // Fast, free-tier Groq model

// ─── Typed API response shapes ────────────────────────────────────────────────

type GroqEmbeddingResponse = {
  data: Array<{ embedding: number[] }>;
};

type GroqChatResponse = {
  choices: Array<{
    message: { content: string };
  }>;
};

// The shape returned by match_content_chunks. This is what Supabase's .rpc()
// returns as unknown without a generated schema, so we cast and validate manually.
type ChunkResult = {
  title: string;
  source_type: string;
  url_path: string;
  chunk_text: string;
  similarity: number;
};

// Shape of each message in the conversation history
type HistoryMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

// Shape of the POST request body
type ChatRequestBody = {
  message: string;
  history?: HistoryMessage[];
};

// System prompt — tells the model who it is and how to behave
const SYSTEM_PROMPT = `You are the Bodha assistant — a knowledgeable guide for the Bodha website, which is dedicated to Hindu civilizational thought, Dharmic philosophy, Indian history, and cultural knowledge.

You have access to Bodha's research projects, blog articles, big questions, library of books, wiki entries, Anveshi field journeys, and learning paths.

Your role:
- Help users find content on the site that is relevant to their question
- Answer questions about Bodha's work, research, and publications
- Guide users toward learning paths, books, and articles relevant to their interest
- When you cite something, mention its title and where on the site it can be found (the URL path)

Rules:
- Only answer based on the context provided. If the context doesn't contain enough to answer, say so honestly and suggest the user explore the library or contact Bodha directly.
- Do not speculate or fabricate content that isn't in the provided context.
- Be concise. Most answers should be 2–4 short paragraphs.
- Maintain a respectful, thoughtful tone consistent with Bodha's civilizational perspective.
- If asked about something completely unrelated to Bodha's work, politely redirect.`;

async function getEmbedding(text: string): Promise<number[]> {
  const response = await fetch('https://api.groq.com/openai/v1/embeddings', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ model: EMBED_MODEL, input: text })
  });

  if (!response.ok) {
    throw new Error(`Embedding request failed: ${response.status}`);
  }

  const data = (await response.json()) as GroqEmbeddingResponse;

  // Guard: Groq should always return at least one embedding, but the cast above
  // doesn't guarantee it at runtime.
  const first = data.data[0];
  if (!first) throw new Error('Groq returned empty embedding data');

  return first.embedding;
}

export const POST: RequestHandler = async ({ request }) => {
  // ── Parse and validate the request body ─────────────────────────────────────
  // We cannot destructure before the try/catch because `body` is assigned inside
  // the try block. Declaring it as a typed variable first and asserting it is
  // defined after the try block is the correct pattern under strict:true —
  // the alternative (using a non-null assertion after the catch) would lose the
  // error path entirely.
  let parsedBody: ChatRequestBody;

  try {
    // response.json() returns unknown under strict:true. We cast to our request
    // body type here and validate the fields below before trusting them.
    parsedBody = (await request.json()) as ChatRequestBody;
  } catch {
    // JSON.parse threw — malformed request body
    throw kitError(400, 'Invalid JSON body');
  }

  const { message, history = [] } = parsedBody;

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    throw kitError(400, 'message is required');
  }

  if (message.length > 500) {
    throw kitError(400, 'Message too long');
  }

  // ── Step 1: Embed the user's question ────────────────────────────────────────
  let queryEmbedding: number[];
  try {
    queryEmbedding = await getEmbedding(message.trim());
  } catch (embedErr: unknown) {
    // embedErr is unknown under strict:true — passing it to console.error is fine
    console.error('Embedding error:', embedErr);
    throw kitError(500, 'Failed to process your question');
  }

  // ── Step 2: Search Supabase for relevant content ──────────────────────────────
  const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY);

  // supabase.rpc() returns unknown for the data field without a generated schema.
  // We cast to ChunkResult[] and validate the shape is non-null before use.
  const { data: rpcData, error: supabaseError } = await supabase.rpc('match_content_chunks', {
    query_embedding: queryEmbedding,
    match_count: 5,
    match_threshold: 0.3
  });

  if (supabaseError) {
    console.error('Vector search error:', supabaseError);
    throw kitError(500, 'Failed to search content');
  }

  const chunks = (rpcData ?? []) as ChunkResult[];

  // ── Step 3: Build context from retrieved chunks ───────────────────────────────
  const context =
    chunks.length > 0
      ? chunks
          .map(
            (chunk) =>
              `[${chunk.source_type.toUpperCase()}] "${chunk.title}" (${chunk.url_path})\n${chunk.chunk_text}`
          )
          .join('\n\n---\n\n')
      : 'No directly relevant content was found in the knowledge base for this query.';

  // ── Step 4: Build the messages array for Groq ────────────────────────────────
  // Keep the last 4 turns (8 messages) of history to maintain conversation context
  const recentHistory: HistoryMessage[] = history.slice(-8);

  const groqMessages: HistoryMessage[] = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...recentHistory,
    {
      role: 'user',
      content: `Here is relevant content from the Bodha knowledge base:\n\n${context}\n\n---\n\nUser question: ${message}`
    }
  ];

  // ── Step 5: Call Groq for the answer ─────────────────────────────────────────
  const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: CHAT_MODEL,
      messages: groqMessages,
      max_tokens: 600,
      temperature: 0.4,
      stream: false
    })
  });

  if (!groqResponse.ok) {
    const errText = await groqResponse.text();
    console.error('Groq chat error:', groqResponse.status, errText);
    throw kitError(500, 'Failed to generate response');
  }

  const groqData = (await groqResponse.json()) as GroqChatResponse;

  // choices[0] could be undefined if Groq returns an empty array (should not happen,
  // but the type does not guarantee it — optional chaining handles it safely).
  const answer =
    groqData.choices[0]?.message?.content ?? 'I was unable to generate a response.';

  // ── Return answer + sources ───────────────────────────────────────────────────
  return json({
    answer,
    sources: chunks.map((c) => ({
      title: c.title,
      url: c.url_path,
      type: c.source_type
    }))
  });
};
```

### 4.2 Create the chat widget component

Create `src/lib/comps/chatbot.svelte`:

```svelte
<script lang="ts">
  // Bodha AI Assistant — chat widget
  // Drop this into any layout or page with: <Chatbot />

  // ── Types ──────────────────────────────────────────────────────────────────
  // Defined before use. Under verbatimModuleSyntax:true (which SvelteKit enables),
  // type declarations inside <script lang="ts"> are fine — they are erased at
  // compile time and never emitted.

  type Source = {
    title: string;
    url: string;
    type: string;
  };

  type ChatMessage = {
    role: 'user' | 'assistant';
    content: string;
    sources?: Source[];
  };

  // Shape of the /api/chat response — typed so the fetch result is not unknown
  type ChatApiResponse = {
    answer: string;
    sources: Source[];
  };

  // ── State ──────────────────────────────────────────────────────────────────

  let isOpen = $state(false);
  let inputText = $state('');  // renamed from `message` to avoid shadowing the
                                // ChatMessage type field named `content`
  let loading = $state(false);

  let messages: ChatMessage[] = $state([
    {
      role: 'assistant',
      content:
        'Namaste. I can help you explore Bodha’s research, articles, library, and knowledge base. What are you looking for?'
      // Note: the curly apostrophe in "Bodha's" is written as a Unicode escape
      // above to avoid a syntax conflict with the template literal delimiter in
      // some editor/linter configurations. You can write it as a plain ' in your
      // actual file — it is only escaped here for safety in the guide.
    }
  ]);

  // bind:this gives HTMLDivElement | undefined. We keep it undefined until the
  // element mounts; the $effect guard checks before use.
  let chatEl: HTMLDivElement | undefined = $state(undefined);

  // ── Effects ────────────────────────────────────────────────────────────────

  // Scroll to bottom whenever a new message is added.
  // chatEl is narrowed to HTMLDivElement inside the if-guard, so no non-null
  // assertion is needed here — removing the `!` that would otherwise appear.
  $effect(() => {
    if (messages.length && chatEl !== undefined) {
      const el = chatEl;
      setTimeout(() => {
        el.scrollTop = el.scrollHeight;
      }, 50);
    }
  });

  // ── Handlers ───────────────────────────────────────────────────────────────

  async function sendMessage(): Promise<void> {
    const trimmed = inputText.trim();
    if (!trimmed || loading) return;

    messages = [...messages, { role: 'user', content: trimmed }];
    inputText = '';
    loading = true;

    // Build history for the API: skip the initial greeting (index 0) and the
    // message we just appended (last item). The API expects plain role/content pairs.
    const history: Array<{ role: 'user' | 'assistant'; content: string }> = messages
      .slice(1, -1)
      .map((m) => ({ role: m.role, content: m.content }));

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, history })
      });

      if (!res.ok) throw new Error(`API error: ${res.status}`);

      // fetch response.json() returns unknown. Casting to ChatApiResponse is
      // the correct approach — there is no other way to type a fetch response
      // without a generated client.
      const data = (await res.json()) as ChatApiResponse;

      messages = [
        ...messages,
        {
          role: 'assistant',
          content: data.answer,
          // Filter out external URLs — we only want internal site links as sources
          sources: (data.sources ?? []).filter((s) => s.url && !s.url.startsWith('http'))
        }
      ];
    } catch (_err: unknown) {
      // _err is prefixed with _ to signal it is intentionally unused.
      // Under strict:true, caught values are unknown — we cannot template
      // _err into a string without narrowing, so we use a static message.
      messages = [
        ...messages,
        {
          role: 'assistant',
          content: 'Something went wrong. Please try again in a moment.'
        }
      ];
    } finally {
      loading = false;
    }
  }

  function handleKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void sendMessage();
      // void: sendMessage is async. Calling it without await inside a sync
      // event handler is intentional — we don't want to block the UI. The
      // `void` operator silences the "floating promise" TS lint warning.
    }
  }
</script>

<!-- Floating button -->
<button
  class="chat-trigger"
  onclick={() => (isOpen = !isOpen)}
  aria-label="Open Bodha Assistant"
>
  {#if isOpen}
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  {:else}
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  {/if}
</button>

<!-- Chat panel -->
{#if isOpen}
  <div class="chat-panel">
    <div class="chat-header">
      <span>Bodha Assistant</span>
      <button onclick={() => (isOpen = false)} aria-label="Close">✕</button>
    </div>

    <div class="chat-messages" bind:this={chatEl}>
      {#each messages as msg}
        <div class="msg {msg.role}">
          <p>{msg.content}</p>
          {#if msg.sources && msg.sources.length > 0}
            <div class="sources">
              <span class="sources-label">Sources:</span>
              {#each msg.sources as source}
                <a href={source.url} class="source-link">{source.title}</a>
              {/each}
            </div>
          {/if}
        </div>
      {/each}

      {#if loading}
        <div class="msg assistant loading">
          <span></span><span></span><span></span>
        </div>
      {/if}
    </div>

    <div class="chat-input">
      <textarea
        bind:value={inputText}
        onkeydown={handleKeydown}
        placeholder="Ask about Bodha's work..."
        rows="2"
        disabled={loading}
      ></textarea>
      <button onclick={() => void sendMessage()} disabled={loading || !inputText.trim()}>
        Send
      </button>
    </div>
  </div>
{/if}

<style lang="sass">
.chat-trigger
	position: fixed
	bottom: 2rem
	right: 2rem
	width: 52px
	height: 52px
	border-radius: 50%
	background: #1a1a1a
	color: #fff
	border: none
	cursor: pointer
	display: flex
	align-items: center
	justify-content: center
	box-shadow: 0 4px 20px rgba(0,0,0,0.25)
	z-index: 9999
	transition: transform 0.15s ease

	&:hover
		transform: scale(1.05)

.chat-panel
	position: fixed
	bottom: 5.5rem
	right: 2rem
	width: 360px
	max-height: 520px
	background: #fff
	border-radius: 12px
	box-shadow: 0 8px 40px rgba(0,0,0,0.18)
	display: flex
	flex-direction: column
	z-index: 9998
	overflow: hidden

	@media (max-width: 480px)
		width: calc(100vw - 2rem)
		right: 1rem
		bottom: 5rem

.chat-header
	display: flex
	align-items: center
	justify-content: space-between
	padding: 0.75rem 1rem
	background: #1a1a1a
	color: #fff
	font-size: 0.875rem
	font-weight: 600

	button
		background: none
		border: none
		color: #fff
		cursor: pointer
		font-size: 1rem
		opacity: 0.7

		&:hover
			opacity: 1

.chat-messages
	flex: 1
	overflow-y: auto
	padding: 1rem
	display: flex
	flex-direction: column
	gap: 0.75rem
	min-height: 0

.msg
	padding: 0.6rem 0.85rem
	border-radius: 10px
	font-size: 0.85rem
	line-height: 1.5
	max-width: 88%

	p
		margin: 0

	&.user
		align-self: flex-end
		background: #1a1a1a
		color: #fff
		border-bottom-right-radius: 3px

	&.assistant
		align-self: flex-start
		background: #f5f4f0
		color: #1a1a1a
		border-bottom-left-radius: 3px

	&.loading
		display: flex
		gap: 4px
		align-items: center
		padding: 0.75rem 1rem

		span
			width: 7px
			height: 7px
			background: #999
			border-radius: 50%
			animation: bounce 1.2s infinite

			&:nth-child(2)
				animation-delay: 0.2s

			&:nth-child(3)
				animation-delay: 0.4s

@keyframes bounce
	0%, 60%, 100%
		transform: translateY(0)
	30%
		transform: translateY(-6px)

.sources
	margin-top: 0.5rem
	padding-top: 0.4rem
	border-top: 1px solid rgba(0,0,0,0.08)
	font-size: 0.75rem

.sources-label
	color: #888
	display: block
	margin-bottom: 0.2rem

.source-link
	display: block
	color: #5b4a2a
	text-decoration: none
	margin-bottom: 0.15rem

	&:hover
		text-decoration: underline

.chat-input
	display: flex
	gap: 0.5rem
	padding: 0.75rem
	border-top: 1px solid #eee

	textarea
		flex: 1
		resize: none
		border: 1px solid #ddd
		border-radius: 8px
		padding: 0.5rem 0.75rem
		font-size: 0.85rem
		font-family: inherit
		line-height: 1.4

		&:focus
			outline: none
			border-color: #1a1a1a

	button
		padding: 0 1rem
		background: #1a1a1a
		color: #fff
		border: none
		border-radius: 8px
		cursor: pointer
		font-size: 0.85rem
		white-space: nowrap

		&:disabled
			opacity: 0.4
			cursor: not-allowed
</style>
```

### 4.3 Add the widget to your layout

Open `src/routes/+layout.svelte`. Import and add the component so it appears on every page:

```svelte
<script>
  // ... your existing imports
  import Chatbot from '$lib/comps/chatbot.svelte';
</script>

<!-- ... your existing layout markup -->

<Chatbot />
```

Place the `<Chatbot />` tag at the very bottom of the template, just before the closing tag of your outermost element. Since the widget is `position: fixed`, its DOM position doesn't affect layout.

---

## Part 5: Environment Variables on Vercel

Your local `.env` works in development. For production (Vercel), you need to add the keys through the Vercel dashboard — Vercel does not read your `.env` file.

Go to **https://vercel.com** → your Bodha project → **Settings** → **Environment Variables**.

Add each of these, setting the environment to **Production**, **Preview**, and **Development** for all three:

| Name | Value | Notes |
|---|---|---|
| `GROQ_API_KEY` | your gsk_... key | Server-only, never public |
| `SUPABASE_SERVICE_ROLE_KEY` | your eyJ_... key | Only needed for the ingest script, not runtime — but add it anyway for future use |

The `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_PUBLISHABLE_KEY` you already have on Vercel from your existing setup. Confirm they're there under Settings → Environment Variables.

After adding, **redeploy** the project. In Vercel, go to the **Deployments** tab, click the three-dot menu on the latest deployment, and click **Redeploy**. Or push any commit to trigger a new deploy.

---

## Part 6: Testing

### 6.1 Local testing (development)

Start your dev server:

```bash
yarn dev
```

Open `http://localhost:5173` (or whichever port Vite uses). You should see the chat button in the bottom-right corner. Click it.

Type a test message: **"What has Bodha written about Hindu temple management?"**

Expected behavior:
- The loading dots appear
- After 2–4 seconds, an answer appears that references the temple management research article
- Below the answer, source links appear pointing to `/research/hindu-models-of-temple-management`

Try a few more:
- "What learning paths are available for understanding Vedic texts?"
- "Tell me about the Anveshi field journeys"
- "What books does Bodha recommend on dharma and ethics?"
- "What is Bodha's big question about Sanatana Dharma?"

### 6.2 Check what was retrieved

To debug what the vector search is actually returning for a given query, temporarily add a `console.log` in the API route, right after the Supabase search:

```typescript
console.log('Retrieved chunks:', chunks?.map(c => ({ title: c.title, similarity: c.similarity })));
```

In development, this logs to your terminal where `yarn dev` is running. Remove it before deploying.

### 6.3 Verify Supabase data

Go to Supabase → **Table Editor** → **content_chunks**. Click on a row. Confirm:
- `embedding` column has a long array (not null)
- `chunk_text` looks like meaningful text from your content
- `url_path` is a valid route

To test the search function directly from Supabase, go to **SQL Editor** and run:

```sql
-- First, you need an embedding to test with.
-- Use a random embedding just to confirm the function runs without error:
SELECT title, source_type, similarity
FROM match_content_chunks(
  array_fill(0.1, ARRAY[1536])::vector,
  5,
  0.0
);
```

This should return 5 rows (with low similarity since the vector is fake). If it returns rows, the function is working.

### 6.4 Common problems and fixes

**Chat widget doesn't appear:** Check that you added `<Chatbot />` to `+layout.svelte` and that the import path is correct. Open browser dev tools (F12) → Console for errors.

**"Failed to process your question" error:** The Groq API key isn't being found. In dev, check that `.env` exists and contains `GROQ_API_KEY=gsk_...`. In production, check Vercel environment variables.

**"Failed to search content" error:** The `match_content_chunks` function isn't found in Supabase, or the `content_chunks` table is empty. Re-run the ingestion script.

**Answers don't mention your content:** The similarity threshold (0.3) may be too high, or the content wasn't ingested. Lower it to 0.2 in both the ingestion script search and the API route. Also check the chunks table has rows.

**Ingestion script crashes mid-way:** It's safe to rerun — the script deletes existing entries for each slug before reinserting. If you hit a rate limit error, increase the sleep between embeds to `sleep(300)`.

**TypeScript errors in the API route:** Make sure `src/app.d.ts` doesn't need any updates. The API route uses `./$types` — SvelteKit generates this automatically via `svelte-kit sync`.

---

## Part 7: Keeping the Knowledge Base Fresh

Whenever you publish a significant number of new blog posts, research papers, or wiki entries, rerun the ingestion script:

```bash
npx tsx --env-file=.env src/lib/scripts/ingest-content.ts
```

It is safe to run at any time. Existing chunks are deleted per-slug and re-embedded. It won't affect the live site since the API route just reads from Supabase.

For a single new file, you could run only the relevant function — but the simplest approach is always to run the full script. At your current content volume, it finishes in under 15 minutes.

---

## Summary of files created or modified

| File | What it does |
|---|---|
| `.env` | Adds `GROQ_API_KEY` and `SUPABASE_SERVICE_ROLE_KEY` |
| `src/lib/scripts/ingest-content.ts` | One-time (and repeatable) script to populate Supabase with embedded content |
| `src/routes/api/chat/+server.ts` | API route that handles chat requests: embeds query → searches Supabase → calls Groq → returns answer |
| `src/lib/comps/chatbot.svelte` | Chat widget UI component |
| `src/routes/+layout.svelte` | Modified to include `<Chatbot />` |
| Supabase: `content_chunks` table | Stores all content chunks and their vector embeddings |
| Supabase: `match_content_chunks` function | PostgreSQL function for cosine similarity search |
