import { json } from '@sveltejs/kit';
import libraryItems from '$lib/serving/library-items.json';
import type { SearchResult } from '$lib/search/lib-blog-search';

type LibraryRaw = {
  id: number;
  name: string;
  author: string;
  type: string;
  linkreal: string;
  linkfinal: string;
};

type PostFrontmatter = {
  title?: string;
  author?: string | string[];
  category?: string;
  image?: string;
};

export const prerender = true;

export async function GET() {
  const books: SearchResult[] = (libraryItems as LibraryRaw[]).map((b) => ({
    id: `book:${b.id}`,
    kind: 'book',
    name: b.name,
    author: b.author,
    type: b.type,
    linkreal: b.linkreal,
    linkfinal: b.linkfinal
  }));

  const files = import.meta.glob('/src/routes/blog/*.md', { eager: true }) as Record<
    string,
    { metadata?: PostFrontmatter }
  >;

const posts: SearchResult[] = Object.entries(files)
  .map(([path, mod]): SearchResult | null => {
    const meta = mod.metadata;
    if (!meta?.title) return null;
    const slug = path.slice('/src/routes/blog/'.length, -'.md'.length);
    const author = Array.isArray(meta.author)
      ? meta.author.join(', ')
      : (meta.author ?? '');
    return {
      id: `post:${slug}`,
      kind: 'post',
      name: meta.title,
      author,
      type: meta.category ?? 'post',
      linkreal: meta.image ?? '',
      linkfinal: `/blog/${slug}`
    };
  })
  .filter((p): p is SearchResult => p !== null);

  return json([...books, ...posts]);
}