# Bodha SEO Optimizer Developer Guide

## Purpose

This document records the design and build decisions for the Bodha SEO Optimizer. It is meant for a human developer or another agent to take over the project without needing the original conversation.

The tool should be an offline/local analyzer first. It should read the Bodha repository and the public live site, appraise SEO and AI-oriented discoverability, then produce concrete reports and optional patches. It may edit the Bodha codebase only when explicitly triggered by the user. The default mode is read-only.

Primary site:

- `https://www.bodharesearch.in/`

Primary repo:

- `/Users/amrit/Documents/GitHub/bodhaNew2`

## Product Goal

Build a local SEO manager for Bodha that can:

1. Appraise site SEO, route metadata, page metadata, structured data, sitemap coverage, and crawl discoverability.
2. Explain how to optimize individual pages and route families.
3. Help Bodha rank for selected domains and search terms such as `Hindu temple`, `Indian Knowledge Systems`, `IKS`, `Dharma`, `Hindu education`, and `sacred geography`.
4. Act as a repeatable SEO manager that can be called from the command line first and later from agent environments such as Claude, Cursor, and Codex.

The key product distinction is that this is not a generic SEO checklist. It should understand Bodha as a Hindu/IKS/civilizational knowledge graph surfaced through routes, markdown pages, search APIs, tags, concepts, explorer pages, research pages, blog pages, and sitemap entries.

## Current Repo Facts

Observed Bodha repo structure:

- SvelteKit app using Svelte 5.
- Main package file: `package.json`.
- SEO helper utilities: `src/lib/utils/seo.ts`.
- Current primary head component: `src/lib/comps/headcomponent.svelte`.
- Broader existing SEO component: `src/lib/comps/seo-optimizer.svelte`.
- Sitemap endpoint: `src/routes/sitemap.xml/+server.ts`.
- Robots file: `static/robots.txt`.
- Search API endpoint: `src/routes/api/search.json/+server.ts`.
- Tags API endpoint: `src/routes/api/tags/+server.ts`.
- Blog routes under `src/routes/blog`.
- Research routes under `src/routes/research`.
- Big-question routes under `src/routes/big-questions` if present in the current checkout.
- Library path pages under `src/routes/library/(library-subroutes)/paths`.
- Concept routes under `src/routes/concepts`.
- Explorer routes under `src/routes/explorer`.
- Temple wiki routes under `src/routes/wiki/temples`.

Important existing data files exist under `src/lib/serving` and `src/lib/data`, but the inventory layer must not treat all backend data dumps as direct inventory sources. The analyzer should privilege published and discoverable route surfaces.

## Initial Decisions

### Decision 1: Local Analyzer First

The first implementation should be a local CLI analyzer, not an MCP/plugin-first project.

Reason:

- The scoring and recommendations need to become trustworthy before exposing them to agents.
- Local reports are easier to inspect, diff, and refine.
- The same core engine can later be wrapped by MCP tools.

### Decision 2: Read-Only By Default

Default commands must not edit the Bodha codebase.

The normal flow is:

1. Audit.
2. Generate reports.
3. Generate patch suggestions.
4. Apply patches only when the user explicitly runs an apply command.

No automatic code modification should happen during plain audit commands.

### Decision 3: Published Inventory Is The Source Of Truth

The inventory layer must not directly read these files as inventory sources:

- `src/lib/serving/library-items.json`
- `src/lib/serving/db-hindu-temples.json`
- `src/lib/data/nodes.json`

Those files may power the site internally, but the SEO optimizer should judge what is actually discoverable through public-facing surfaces. If content exists in backend data but is absent from sitemap/search/routes/live pages, that is an SEO issue to surface separately through a later optional diagnostic, not the main inventory baseline.

### Decision 4: Developer Documentation Is A First-Class Artifact

This file, `sitemaster/seomaster/developer.md`, must be updated as the build progresses.

Every meaningful implementation step should record:

- What was added.
- Where it was added.
- Why it exists.
- How to run it.
- What assumptions it makes.
- What is still missing.

This doc is part of the product, not an afterthought.

## Inventory Architecture

The inventory layer should build a normalized index of published/discoverable pages and content surfaces.

Allowed inventory sources:

- Live `https://www.bodharesearch.in/sitemap.xml`.
- Local sitemap route implementation: `src/routes/sitemap.xml/+server.ts`.
- Live and/or local `api/search.json`.
- Live and/or local `api/tags`.
- Markdown files under public route families.
- Blog markdown/pages.
- Research markdown/pages.
- Big-question markdown/pages.
- Library path pages.
- Tag pages where discoverable.
- Writer pages where discoverable.
- Concept subroutes.
- Explorer subroutes.
- Static SvelteKit route files.
- Live HTML for selected public pages.

The inventory should normalize each discovered page into a record like:

```ts
type SeoPageInventoryItem = {
  urlPath: string;
  absoluteUrl: string;
  source: 'sitemap' | 'search-api' | 'tags-api' | 'route-file' | 'markdown' | 'live-crawl';
  routeFamily: string;
  title?: string;
  description?: string;
  tags?: string[];
  headings?: string[];
  outgoingLinks?: string[];
  discoveredFrom: string[];
};
```

The same URL may be discovered from several sources. The inventory should merge duplicate URL records and preserve all `discoveredFrom` evidence.

## Core Modules

Recommended local package location:

- `sitemaster/seomaster/`

Recommended module layout:

```text
sitemaster/seomaster/
  package.json
  README.md
  src/
    cli.ts
    config.ts
    inventory/
      collect.ts
      sitemap.ts
      search-api.ts
      tags-api.ts
      route-files.ts
      markdown.ts
      live-crawl.ts
      normalize.ts
    audit/
      audit-site.ts
      audit-page.ts
      rules.ts
      score.ts
    topics/
      clusters.ts
      hinduism.ts
      iks.ts
      temples.ts
      internal-links.ts
    schema/
      book.ts
      hindu-temple.ts
      article.ts
      collection-page.ts
      breadcrumb.ts
      organization.ts
    patches/
      suggest.ts
      apply.ts
      formats.ts
    reports/
      write-json.ts
      write-markdown.ts
    mcp/
      server.ts
```

MCP can be added later. The first build should keep the core engine independent of MCP.

## CLI Design

Recommended commands:

```bash
yarn seo:audit
yarn seo:audit --live
yarn seo:page /wiki/temples/somnath-temple
yarn seo:topic hindu-temple
yarn seo:topic indian-knowledge-systems
yarn seo:patch /wiki/temples/somnath-temple
yarn seo:patch --apply /wiki/temples/somnath-temple
```

Suggested root `package.json` scripts:

```json
{
  "seo:audit": "tsx sitemaster/seomaster/src/cli.ts audit",
  "seo:page": "tsx sitemaster/seomaster/src/cli.ts page",
  "seo:topic": "tsx sitemaster/seomaster/src/cli.ts topic",
  "seo:patch": "tsx sitemaster/seomaster/src/cli.ts patch"
}
```

The first implementation can avoid adding new dependencies if possible and use Node built-ins plus packages already in the repo. If HTML parsing becomes necessary, choose a small parser deliberately and document the reason here.

## Report Outputs

Reports should be written under:

- `sitemaster/seomaster/reports/`

Recommended outputs:

```text
sitemaster/seomaster/reports/site-audit.json
sitemaster/seomaster/reports/site-audit.md
sitemaster/seomaster/reports/page-issues.json
sitemaster/seomaster/reports/topic-gaps.md
sitemaster/seomaster/reports/internal-link-opportunities.md
sitemaster/seomaster/reports/schema-suggestions.md
sitemaster/seomaster/reports/patch-suggestions.md
```

Report rules:

- JSON reports should be machine-readable and stable enough for agent use.
- Markdown reports should be readable by the user without tooling.
- Each issue should include severity, route, finding, evidence, and suggested fix.
- Do not only produce scores. Always produce fix instructions.

Example issue shape:

```ts
type SeoIssue = {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  urlPath: string;
  category: 'metadata' | 'schema' | 'sitemap' | 'content' | 'links' | 'topic' | 'technical';
  finding: string;
  evidence: string[];
  recommendation: string;
  patchAvailable: boolean;
};
```

## Audit Rules

Generic SEO rules:

- Missing or duplicate title.
- Title too short, too long, or not page-specific.
- Missing or weak meta description.
- Missing canonical URL.
- Missing OpenGraph metadata.
- Missing Twitter card metadata.
- Missing or invalid JSON-LD.
- Missing H1 or multiple conflicting H1s.
- Thin visible text.
- Missing image alt text.
- Broken internal links.
- Pages discoverable in routes but absent from sitemap.
- Pages in sitemap that return non-200 status.
- Pages in search API absent from sitemap.
- Pages in sitemap absent from search API, if they should be searchable.

Bodha-specific rules:

- Hindu temple pages should expose deity, location/state, coordinates when present, category/type, related research, and relevant internal links.
- Temple pages should be candidates for `HinduTemple` JSON-LD where the page represents a specific temple.
- Book pages should expose title, author, summary, topic/path, tags, and related reading paths.
- Research pages should connect to relevant topics, library paths, concepts, and search intents.
- IKS pages should connect to Sanskrit, darshana, shastra, education, arts, sciences, Dharampal, and traditional knowledge systems where applicable.
- Topic hub gaps should be surfaced when many pages support a topic but no strong hub exists.
- Concept and explorer subroutes should be checked for discoverability through sitemap/search/internal links.

## Topic Cluster Design

Initial topic clusters:

### Hindu Temple

Seed terms:

- Hindu temple
- mandir
- mandira
- kshetra
- sacred geography
- pilgrimage
- tirtha
- deity
- murti
- temple architecture
- jyotirlinga
- shakti pitha
- char dham
- saptapuri

Expected route families:

- `/wiki/temples`
- `/wiki/temples/[temple]`
- `/research`
- `/library/(library-subroutes)/paths`
- `/concepts`
- `/explorer`
- relevant blog pages

### Indian Knowledge Systems

Seed terms:

- Indian Knowledge Systems
- IKS
- Sanskrit
- shastra
- darshana
- Ayurveda
- ganita
- vyakarana
- nyaya
- mimamsa
- traditional education
- gurukula
- Dharampal

Expected route families:

- `/library`
- `/library/(library-subroutes)/paths/indian-knowledge-systems`
- `/research`
- `/concepts`
- `/explorer`
- `/blog`

### Dharma

Seed terms:

- dharma
- sanatana dharma
- dharmic
- Hindu ethics
- Hindu law
- varna
- ashrama
- purushartha
- seva
- dana
- family
- polity

Expected route families:

- `/research`
- `/blog`
- `/library/(library-subroutes)/paths/dharma-ethics-and-law`
- `/concepts`
- `/explorer`

## Structured Data Strategy

Reuse and extend `src/lib/utils/seo.ts` where possible. Avoid adding disconnected JSON-LD generators in random route files.

Existing helpers include:

- `organizationJsonLd`
- `websiteJsonLd`
- `webPageJsonLd`
- `collectionPageJsonLd`
- `articleJsonLd`
- `bookJsonLd`
- `touristTripJsonLd`

Likely additions:

- `hinduTempleJsonLd`
- `breadcrumbListJsonLd`
- `definedTermJsonLd`
- possibly `itemListJsonLd`

Patch suggestions should prefer adding reusable helpers first, then wiring pages to those helpers.

## Patch Workflow

Default patch command:

```bash
yarn seo:patch /some/path
```

Expected behavior:

- Analyze target route.
- Generate a patch proposal.
- Write it to `sitemaster/seomaster/reports/patch-suggestions.md`.
- Do not modify code.

Apply command:

```bash
yarn seo:patch --apply /some/path
```

Expected behavior:

- Apply only the patch for the requested path or route family.
- Keep changes narrow.
- Run relevant verification.
- Record changed files in `sitemaster/seomaster/developer.md`.

Patch safety rules:

- Never rewrite broad route trees in one step.
- Never rewrite source content prose unless the user asks for content edits.
- Prefer metadata, JSON-LD, sitemap, and internal-link additions.
- Any generated text should be inspectable in reports before applying.
- If a page has ambiguous topic intent, report ambiguity instead of forcing a keyword.

## Future MCP/Plugin Layer

After the CLI engine is useful, expose it as an MCP server.

Potential MCP tools:

- `audit_site`
- `audit_page`
- `audit_topic`
- `suggest_metadata`
- `suggest_schema`
- `suggest_internal_links`
- `create_patch`
- `apply_patch`

The MCP server should call the same core modules used by the CLI. It should not duplicate SEO logic.

Agent safety:

- `audit_*` tools are read-only.
- `suggest_*` tools are read-only.
- `create_patch` writes reports only.
- `apply_patch` requires explicit user instruction.

## Build Log

### 2026-05-18: Initial Architecture

Decisions recorded:

- Start with an offline/local analyzer that reads the Bodha repo plus live site.
- Allow edits only through explicit user-triggered patch commands.
- Use published route/content surfaces as inventory sources.
- Do not use `library-items.json`, `db-hindu-temples.json`, or `nodes.json` as direct inventory sources.
- Create this comprehensive developer handoff document at `sitemaster/seomaster/developer.md`.

Files created:

- `sitemaster/seomaster/developer.md`

Why:

- To document product goals, architecture, file layout, source-of-truth rules, command design, patch safety, and future MCP/plugin direction.

### 2026-05-18: First Read-Only CLI Slice

Implemented the first executable version of the local analyzer.

Files added:

- `sitemaster/seomaster/README.md`
- `sitemaster/seomaster/src/cli.mjs`
- `sitemaster/seomaster/src/config.mjs`
- `sitemaster/seomaster/src/fs-utils.mjs`
- `sitemaster/seomaster/src/metadata.mjs`
- `sitemaster/seomaster/src/inventory.mjs`
- `sitemaster/seomaster/src/audit.mjs`
- `sitemaster/seomaster/src/reports.mjs`
- `sitemaster/seomaster/seo-manager.md`

What each file does:

- `README.md` gives the minimal run commands and states the read-only default.
- `cli.mjs` provides `audit`, `page`, and `topic` commands.
- `config.mjs` stores the site URL, repo-root-relative paths, route families, and initial topic clusters.
- `fs-utils.mjs` contains filesystem helpers for reading, walking, and writing reports.
- `metadata.mjs` extracts simple HTML and Markdown metadata without adding dependencies.
- `inventory.mjs` collects route files, markdown pages, sitemap-code hints, and optional live sitemap/search/tags/live-page data.
- `audit.mjs` applies metadata, discoverability, and topic-cluster rules.
- `reports.mjs` writes JSON and Markdown reports under `sitemaster/seomaster/reports/`.
- `seo-manager.md` is the non-technical operating guide for a newly hired SEO manager.

Current commands:

```bash
node sitemaster/seomaster/src/cli.mjs audit
node sitemaster/seomaster/src/cli.mjs audit --live --limit 25
node sitemaster/seomaster/src/cli.mjs page /core/indian-knowledge-systems
node sitemaster/seomaster/src/cli.mjs topic hindu-temple
node sitemaster/seomaster/src/cli.mjs topic-links
```

Package scripts added to root `package.json`:

```bash
npm run seo:audit
npm run seo:audit -- --live --limit 25
npm run seo:page -- /core/indian-knowledge-systems
npm run seo:topic -- hindu-temple
npm run seo:topic-links
```

Direct Node commands remain valid:

```bash
node sitemaster/seomaster/src/cli.mjs audit
node sitemaster/seomaster/src/cli.mjs audit --live --limit 25
node sitemaster/seomaster/src/cli.mjs page /core/indian-knowledge-systems
node sitemaster/seomaster/src/cli.mjs topic hindu-temple
```

Current report outputs:

- `sitemaster/seomaster/reports/site-audit.json`
- `sitemaster/seomaster/reports/site-audit.md`
- `sitemaster/seomaster/reports/page-<slug>.json`
- `sitemaster/seomaster/reports/page-<slug>.md`
- `sitemaster/seomaster/reports/topic-<topic>.json`
- `sitemaster/seomaster/reports/topic-<topic>.md`
- `src/lib/generated/seo-topic-links.json`

Current limitations:

- HTML parsing is intentionally lightweight regex extraction, not a full DOM parser.
- Patch generation is not implemented yet.
- Live crawling is opt-in with `--live`.
- Local sitemap-code inventory expands markdown glob entries such as `import.meta.glob('/src/routes/big-questions/*.md')` into concrete markdown routes, so route files represented by sitemap generation are not incorrectly reported as absent from sitemap sources.
- The blog sitemap path helper `blogContentPaths()` is recognized as a local sitemap source and expanded to the concrete `src/routes/blog/*.md` article routes. This keeps the analyzer aligned with `src/routes/sitemap.xml/+server.ts` without directly reading excluded backend JSON inventories.
- Endpoint and account-only routes such as `/members/callback` and `/members/signed-in` are treated as non-rankable. They should not be added to the public sitemap just to satisfy an audit; the public `/members` subscription entry point is the rankable route.
- Dynamic concept and explorer route patterns are inventoried, but individual dynamic URLs are only discovered through sitemap/search/live surfaces.
- Topic reports filter to internal rankable Bodha pages, even when the live search API exposes external book/PDF URLs.

Verification performed:

```bash
node sitemaster/seomaster/src/cli.mjs audit
```

Result:

- Inventory pages: `253`
- Issues: `345`
- Critical: `0`
- High: `9`
- Medium: `173`
- Low: `163`

```bash
node sitemaster/seomaster/src/cli.mjs audit --live --limit 20
```

Result:

- Inventory pages: `652`
- Issues: `695`
- Critical: `0`
- High: `168`
- Medium: `281`
- Low: `246`

Live mode was verified after network approval. It pulled live sitemap, search API, tags API, and 20 live pages.

Additional commands verified:

```bash
node sitemaster/seomaster/src/cli.mjs page /core/indian-knowledge-systems --live --limit 20
node sitemaster/seomaster/src/cli.mjs topic indian-knowledge-systems --live --limit 20
npm run seo:audit
npm run seo:topic -- hindu-temple
npm run seo:page -- /core/indian-knowledge-systems
```

The topic audit originally counted external R2 book/PDF URLs from the live search API as candidate pages. This was corrected so topic reports focus on internal Bodha pages. After the correction, `indian-knowledge-systems` reported `18` internal candidate pages in the non-live package-script run.

### 2026-05-19: Generated Topic Support Links

Implemented the first bridge between the SEO optimizer and rankable hub pages.

Files added:

- `sitemaster/seomaster/src/topic-links.mjs`
- `src/lib/generated/seo-topic-links.json`

Files updated:

- `sitemaster/seomaster/src/cli.mjs`
- `sitemaster/seomaster/src/audit.mjs`
- `sitemaster/seomaster/src/config.mjs`
- `package.json`
- `src/routes/wiki/temples/+page.svelte`
- `src/routes/wiki/[domain]/+page.svelte`
- `src/routes/big-questions/[item]/+page.ts`
- `src/routes/big-questions/[item]/+page.svelte`
- `sitemaster/seomaster/developer.md`
- `sitemaster/seomaster/seo-manager.md`

What changed:

- `audit.mjs` now exports the rankable-page, external-page, and topic scoring helpers so topic audits and generated link data use one scoring model.
- `config.mjs` now marks `/wiki/temples` as the primary `hindu-temple` hub.
- `config.mjs` now marks `/wiki/indian-knowledge-systems-and-education` as the primary `indian-knowledge-systems` hub while keeping `/core/indian-knowledge-systems`, `/library/paths/indian-knowledge-systems`, and `/research/hindu-frameworks-of-education` as expected supporting hubs.
- `config.mjs` now marks `/big-questions/core-of-sanatana-dharma` as the primary `dharma` hub while keeping `/core/dharma` and `/core/sanatana-dharma` as expected supporting hubs.
- `topic-links.mjs` builds `src/lib/generated/seo-topic-links.json` from the same public/discoverable inventory used by the audit tool.
- `cli.mjs` adds a `topic-links` command.
- `package.json` adds `npm run seo:topic-links`.
- `/wiki/temples` imports `seo-topic-links.json` and renders the strongest `hindu-temple` support pages in a `Related Temple Research` panel.
- `/wiki/[domain]` imports `seo-topic-links.json` and, for `/wiki/indian-knowledge-systems-and-education`, renders the strongest `indian-knowledge-systems` support pages in a `Related IKS Research` panel.
- `/big-questions/[item]` imports `seo-topic-links.json` and, for `/big-questions/core-of-sanatana-dharma`, renders the strongest `dharma` support pages in a `Related Dharma Research` panel.
- `src/lib/comps/hub-related-links.svelte` is the shared hub-page layout component for generated related links. It uses the existing site layout classes (`wrapper-std`, `growingline`, responsive grid utilities, `white-grid`, `blank`, `whitestone`, and text/padding utilities) so future hub pages can reuse the same section without duplicating markup or styling.

Run command:

```bash
npm run seo:topic-links
```

Optional limits:

```bash
npm run seo:topic-links -- --link-limit 12
npm run seo:topic-links -- --live --limit 25 --link-limit 12
```

Important behavior:

- The generated JSON is source-controlled site data, not an audit report.
- It is regenerated from routes, markdown, sitemap-code, and optional live sources.
- It does not read excluded backend inventory dumps as source data.
- Hub pages can import the JSON and select their topic key instead of manually maintaining related-link lists.

Project check result:

```bash
npm run check
```

Result:

- Failed with existing Svelte diagnostics outside the SEO tool.
- Errors observed in `src/lib/comps/wikigraph.svelte` around `NodeType` comparisons with `"domain"` and a `linkCurvature(0)` type mismatch.
- Warnings observed in drawer/navmenu/pagebottom/research components.
- No errors were reported from `sitemaster/seomaster`.

### 2026-05-20: Dynamic Route Concrete URL Matching

The audit previously reported route templates such as `/anveshi/[chapter]` even when concrete rankable URLs such as `/anveshi/badami`, `/anveshi/gujarat`, `/anveshi/kannur`, and `/anveshi/kullu` were already present in sitemap-derived inventory.

Files updated:

- `sitemaster/seomaster/src/audit.mjs`

What changed:

- `auditPageItem` now receives the full inventory so dynamic route templates can be evaluated against concrete paths.
- Dynamic route templates with matching concrete rankable pages are skipped as templates rather than audited for missing metadata.
- Orphan dynamic templates still produce the same low-priority technical warning.
- The matcher supports SvelteKit single-segment params such as `[chapter]`, rest params such as `[...slug]`, optional rest params such as `[[...slug]]`, and sitemap glob hints such as `*`.

Validation:

```bash
node sitemaster/seomaster/src/cli.mjs page '/anveshi/[chapter]'
node sitemaster/seomaster/src/cli.mjs audit
```

Result:

- `/anveshi/[chapter]` no longer reports the dynamic route warning.
- The `/anveshi/[chapter]` page audit has no issues because the concrete chapter URLs are the rankable pages.
- The full audit still reports unrelated dynamic routes that do not yet have concrete inventory URLs, such as blog tag, blog writer, and concept detail routes.

### 2026-05-20: Hubbed Topic Cluster Issue Suppression

The topic audit previously emitted a low-priority "discoverable candidate pages" issue for every topic cluster with matching pages. That was useful for discovering clusters, but noisy once a primary hub had been chosen and connected.

Files updated:

- `sitemaster/seomaster/src/audit.mjs`
- `sitemaster/seomaster/src/config.mjs`
- `sitemaster/seomaster/src/reports.mjs`

What changed:

- `hindu-temple` is now labeled `Temple / Hindu Temple` because the SEO cluster treats those as one search-intent family.
- `indian-knowledge-systems` is now labeled `Indian Knowledge Systems / Education` because the SEO cluster treats Indian Knowledge Systems and Indian Knowledge Systems and Education as one search-intent family.
- Topic candidate-page lists are no longer emitted as actionable issues when the cluster has a configured `primaryHub` and that hub is discoverable in the inventory.
- Topic reports still compute matches and still report missing hubs or low coverage.
- Empty topic issue reports now print `No actionable topic issues found.` instead of an empty findings section.

Validation:

```bash
node sitemaster/seomaster/src/cli.mjs topic hindu-temple
node sitemaster/seomaster/src/cli.mjs topic indian-knowledge-systems
node sitemaster/seomaster/src/cli.mjs topic dharma
node sitemaster/seomaster/src/cli.mjs audit
```

Result:

- `sitemaster/seomaster/reports/topic-hindu-temple.md` no longer reports the "candidate pages" item when `/wiki/temples` is discoverable.
- The same suppression applies to `indian-knowledge-systems` and `dharma` because both now have discoverable primary hubs.

### 2026-05-20: Derived Concrete URLs For Dynamic Route Audits

The audit previously reported several SvelteKit dynamic route templates even when the repo already had enough local information to prove concrete URLs exist. The fix keeps the analyzer offline/local while avoiding direct reads from the excluded large backend inventory dumps.

Files updated:

- `sitemaster/seomaster/src/inventory.mjs`
- `sitemaster/seomaster/src/audit.mjs`
- `sitemaster/seomaster/src/metadata.mjs`

What changed:

- Blog tag routes are derived from blog markdown frontmatter tags.
- Blog writer routes are derived from blog markdown frontmatter authors.
- Concept routes are derived from concept ids in `src/lib/data/edges.json`, avoiding direct use of excluded `nodes.json`.
- Library category routes are derived from `libCategories` links in `src/lib/utils/localsends.ts`, avoiding direct use of `library-items.json`.
- Ontology varga routes are derived from `src/lib/ontology/node-varga-map.json`, matching the varga slugs used by the route load function.
- Markdown frontmatter parsing now supports indented YAML list items, which the blog files use for `author` and `tags`.
- Derived records are marked `isVirtualConcrete`; they can satisfy dynamic-route concrete URL checks but are not audited as full metadata-bearing pages and are not included in topic scoring.
- Synthetic sitemap wildcard records from markdown globs are no longer added because concrete markdown files are already collected from those globs.
- `/docs/[item]` is excluded from rankable dynamic-template warnings because current concrete children are legal/support docs already excluded from SEO ranking.
- `/wiki/temples/[temple]` is excluded from offline dynamic-template warnings because enumerating those concrete pages requires `db-hindu-temples.json`, which is outside the analyzer inventory boundary by decision.

Validation:

```bash
node sitemaster/seomaster/src/cli.mjs audit
node sitemaster/seomaster/src/cli.mjs page '/blog/tags/[tag]'
node sitemaster/seomaster/src/cli.mjs page '/blog/writers/[writer]'
node sitemaster/seomaster/src/cli.mjs page '/concepts/[slug]'
node sitemaster/seomaster/src/cli.mjs page '/docs/[item]'
node sitemaster/seomaster/src/cli.mjs page '/library/categories/[category]'
node sitemaster/seomaster/src/cli.mjs page '/ontology/[varga]'
node sitemaster/seomaster/src/cli.mjs page '/wiki/temples/[temple]'
```

Result:

- The full site audit no longer reports `Dynamic route pattern found`.
- The listed dynamic page reports have empty issue lists.

### 2026-05-20: Sitemaster SEO Reorganization

SEO implementation, reports, and operator documentation were consolidated under `sitemaster/seomaster` so the root of the repo does not accumulate scattered SEO folders.

Files moved:

- `docs/seo-optimizer/developer.md` -> `sitemaster/seomaster/developer.md`
- `docs/seo-optimizer/seo-manager.md` -> `sitemaster/seomaster/seo-manager.md`
- `tools/bodha-seo/README.md` -> `sitemaster/seomaster/README.md`
- `tools/bodha-seo/src/` -> `sitemaster/seomaster/src/`
- `reports/seo/` -> `sitemaster/seomaster/reports/`
- `scripts/enrich-temples.mjs` -> `sitemaster/toolmaster/enrich-temples.mjs`
- `scripts/generate-node-varga-map.mjs` -> `sitemaster/toolmaster/generate-node-varga-map.mjs`

Folders removed:

- `reports/`
- `tools/`
- `scripts/`
- `temp/`
- `outputs/seo-description-review-2026-05-20`

Code/reference updates:

- `package.json` SEO scripts now call `node sitemaster/seomaster/src/cli.mjs ...`.
- `config.mjs` writes SEO reports to `sitemaster/seomaster/reports`.
- CLI help text and report write messages use the new paths.
- SEO docs and generated topic-link metadata now reference `sitemaster/seomaster`.

Validation:

```bash
npm run seo:audit
npm run seo:topic-links
npm run seo:topic -- hindu-temple
npm run seo:topic -- indian-knowledge-systems
npm run seo:topic -- dharma
npm run check
```

Result:

- SEO audit and topic reports write successfully under `sitemaster/seomaster/reports`.
- Generated topic links still write to `src/lib/generated/seo-topic-links.json`.
- `npm run check` completed with 0 errors and the existing Svelte warnings.

## Next Implementation Steps

1. Improve sitemap-code inventory so dynamic sitemap outputs are better represented without reading excluded backend JSON directly.
2. Add richer schema detection for live pages.
3. Add dry-run patch suggestions.
4. Add a rankable-route config file so private/test/docs exclusions are easier to tune.
5. Only then add `--apply`.

## Open Questions

- Should audit commands run against the live production site by default, or should live crawling require `--live`?
- Should generated patch suggestions be unified diffs, Markdown instructions, or both?
- Should topic cluster definitions live in TypeScript modules or editable JSON/YAML files?
- Should the first MCP server live inside this repo or in the user's Codex plugin marketplace?
