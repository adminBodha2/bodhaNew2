# Bodha SEO Manager Guide

## Purpose

This guide is for a new SEO manager joining Bodha. It explains how to use the Bodha SEO Optimizer from day one: what the tool does, how to run it, how to read the reports, and how to turn findings into practical SEO work.

The tool is designed to help manage Bodha's search visibility across general SEO, AI-oriented discoverability, and domain-specific topics such as Hinduism, Dharma, Indian Knowledge Systems, Hindu temples, Sanskrit, sacred geography, and Hindu education.

The tool is read-only by default. It does not change the website unless a developer or agent is explicitly asked to apply a patch.

## What This Tool Is

The Bodha SEO Optimizer is a local audit and planning tool for the Bodha website.

It checks:

- Page titles and descriptions.
- Canonical URLs.
- OpenGraph and Twitter metadata.
- JSON-LD structured data.
- Sitemap and search discoverability.
- Route and page coverage.
- Topic clusters such as `hindu-temple`, `indian-knowledge-systems`, and `dharma`.
- Internal linking opportunities.
- Pages that exist locally but may not be surfaced well through sitemap/search.

It produces reports in:

```text
sitemaster/seomaster/reports/
```

The most useful reports are Markdown files, which can be read directly.

## Where The Tool Lives

Main tool folder:

```text
sitemaster/seomaster/
```

Main user-facing reports:

```text
sitemaster/seomaster/reports/site-audit.md
sitemaster/seomaster/reports/topic-hindu-temple.md
sitemaster/seomaster/reports/topic-indian-knowledge-systems.md
sitemaster/seomaster/reports/page-core-indian-knowledge-systems.md
```

Developer handoff documentation:

```text
sitemaster/seomaster/developer.md
```

This user guide:

```text
sitemaster/seomaster/seo-manager.md
```

## Day 1 Setup

Ask a developer or agent to confirm you are in the Bodha repo:

```bash
pwd
```

Expected repo:

```text
/Users/amrit/Documents/GitHub/bodhaNew2
```

Then run the basic local SEO audit:

```bash
npm run seo:audit
```

This writes:

```text
sitemaster/seomaster/reports/site-audit.json
sitemaster/seomaster/reports/site-audit.md
```

Open the Markdown report first:

```text
sitemaster/seomaster/reports/site-audit.md
```

This is the main dashboard for the current website SEO state.

## Core Commands

### Full Local Audit

```bash
npm run seo:audit
```

Use this for routine checks. It reads the local site structure and content surfaces.

Best for:

- Weekly SEO review.
- Checking whether recent site changes created metadata gaps.
- Finding pages that are not represented well in sitemap/search surfaces.

### Live Audit

```bash
npm run seo:audit -- --live --limit 25
```

Use this when you want to compare the local repo against the public website.

Best for:

- Production SEO checks.
- Confirming whether deployed pages have canonical URLs, JSON-LD, metadata, and headings.
- Checking whether the live sitemap/search API surfaces content properly.

The `--limit 25` setting means the tool will crawl only 25 live pages. Increase this slowly if needed.

### Single Page Audit

```bash
npm run seo:page -- /core/indian-knowledge-systems
```

Use this when reviewing one page.

Examples:

```bash
npm run seo:page -- /core/temple
npm run seo:page -- /research/hindu-frameworks-of-education
npm run seo:page -- /blog/kshetrashastrautsava
```

This writes a page-specific report:

```text
sitemaster/seomaster/reports/page-<page-slug>.md
```

### Topic Audit

```bash
npm run seo:topic -- hindu-temple
npm run seo:topic -- indian-knowledge-systems
npm run seo:topic -- dharma
```

Use this when planning SEO work around a specific domain.

Best for:

- Topic-cluster planning.
- Internal linking work.
- Deciding which pages should serve as hubs.
- Finding support pages for a search term.

### Generated Hub Links

```bash
npm run seo:topic-links
```

Use this after metadata, sitemap, or content changes that affect topic clusters.

This writes:

```text
src/lib/generated/seo-topic-links.json
```

The website can use this file to show related research links on hub pages. For example, `/wiki/temples` reads the `hindu-temple` section, `/wiki/indian-knowledge-systems-and-education` reads the `indian-knowledge-systems` section, and `/big-questions/core-of-sanatana-dharma` reads the `dharma` section. Each hub displays the strongest related research pages automatically.

Hub pages should render this through the shared related-links layout so the section stays visually consistent across the site.

## How To Read The Site Audit

Open:

```text
sitemaster/seomaster/reports/site-audit.md
```

Start with the summary:

```text
Inventory pages
Issues
Critical
High
Medium
Low
```

Severity meaning:

- `critical`: The page or site has a severe discoverability problem.
- `high`: Fix soon. Usually missing metadata, schema, canonical data, or important sitemap/search coverage.
- `medium`: Important, but can be batched into weekly optimization work.
- `low`: Useful improvements, cleanup, or cluster-planning signals.

Recommended workflow:

1. Fix `critical` issues first.
2. Fix `high` issues on rankable public pages.
3. Group `medium` issues by route family, such as blog, research, temples, library, concepts.
4. Use `low` findings for internal linking and topic planning.

Ignore or defer issues for pages that are not meant to rank, such as private test pages, auth pages, or internal documentation pages. The tool already filters many of these, but use judgment.

## What Counts As A Good SEO Page

For Bodha, a strong page should have:

- A clear page-specific title.
- A concise meta description.
- One clear H1.
- Canonical URL.
- OpenGraph and Twitter metadata.
- JSON-LD structured data appropriate to the page type.
- Strong internal links to related pages.
- Clear connection to a topic cluster.
- Enough visible text for search engines and AI systems to understand the page.

For research pages, also check:

- Does the page identify the research question?
- Does it name the Hindu/IKS/civilizational domain clearly?
- Does it link to related library paths, concepts, essays, or topic hubs?

For temple pages, also check:

- Temple name.
- State/location.
- Main deity where available.
- Category/type where available.
- Sacred geography or pilgrimage terms where relevant.
- Internal links to temple architecture, sacred geography, research, and related concepts.
- `HinduTemple` structured data where applicable.

For IKS pages, also check:

- Sanskrit, shastra, darshana, traditional education, and knowledge-system vocabulary where relevant.
- Links to books, research, concepts, and reading paths.
- A clear hub/supporting-page structure.

## Topic Cluster Workflow

Run:

```bash
npm run seo:topic -- indian-knowledge-systems
```

Read:

```text
sitemaster/seomaster/reports/topic-indian-knowledge-systems.md
```

The report shows candidate pages for the topic. Use these to build a cluster:

1. Pick one main hub page.
2. Identify 5-15 supporting pages.
3. Make sure the hub links to supporting pages.
4. Make sure supporting pages link back to the hub where natural.
5. Make sure page titles/descriptions use the topic language naturally.
6. Avoid keyword stuffing. Bodha pages should read seriously and cleanly.

For example, an IKS cluster might include:

- `/core/indian-knowledge-systems`
- `/library/paths/indian-knowledge-systems`
- `/research/hindu-frameworks-of-education`
- `/blog/sanskritvsfate`
- `/library/paths/darshanas-and-philosophy`
- relevant concept and explorer pages.

## Practical Weekly SEO Routine

### Monday: Site Health

Run:

```bash
npm run seo:audit
```

Review:

```text
sitemaster/seomaster/reports/site-audit.md
```

Make a short priority list:

- Top 5 high-severity issues.
- Pages with missing metadata.
- Pages absent from sitemap/search but worth ranking.
- Any unexpected changes from last week.

### Wednesday: Topic Cluster Work

Pick one strategic topic.

Examples:

```bash
npm run seo:topic -- hindu-temple
npm run seo:topic -- indian-knowledge-systems
npm run seo:topic -- dharma
```

Then plan:

- Which page is the hub?
- Which pages support it?
- Which internal links are missing?
- Which descriptions need sharpening?

Then regenerate hub link data:

```bash
npm run seo:topic-links
```

For the Hindu temple cluster, the primary hub is:

```text
/wiki/temples
```

### Friday: Production Check

Run:

```bash
npm run seo:audit -- --live --limit 25
```

Review live-only problems:

- Missing JSON-LD.
- Missing canonical URL.
- Missing OpenGraph metadata.
- Pages in sitemap returning unexpected status.
- Pages visible locally but not deployed.

## How To Request Changes

The tool currently audits and reports. It does not automatically edit pages.

When you want a developer or agent to make changes, give them:

1. The report path.
2. The route path.
3. The desired outcome.

Example request:

```text
Please fix the high-priority SEO issues for /core/indian-knowledge-systems using sitemaster/seomaster/reports/page-core-indian-knowledge-systems.md. Keep the page prose unchanged unless needed. Add or improve metadata and JSON-LD only.
```

Another example:

```text
Please improve the Hindu temple topic cluster using sitemaster/seomaster/reports/topic-hindu-temple.md. Add internal links only where contextually natural. Do not rewrite article prose yet.
```

Good change requests are specific. Avoid saying only "fix SEO" without naming pages or reports.

## How To Prioritize Work

Priority 1:

- Homepage.
- Research landing page.
- Library landing page.
- Temple landing page.
- Major topic hubs.
- Pages targeting important terms such as `Hindu temple`, `Indian Knowledge Systems`, `Dharma`, `Sanskrit`, `Hindu education`.

Priority 2:

- High-value research pages.
- Strong blog essays that already receive attention.
- Library path pages.
- Concept pages.
- Explorer pages that support major clusters.

Priority 3:

- Tag pages.
- Archive pages.
- Low-traffic support pages.
- Internal or legal pages.

## What Not To Do

Do not:

- Stuff keywords into titles or descriptions.
- Rewrite Bodha's voice into generic SEO copy.
- Add links where they feel unnatural.
- Treat every page as equally important.
- Optimize private/test/auth pages for ranking.
- Change site code without reviewing the report and the intended route.
- Assume live production matches the local repo. Use `--live` to check.

## Domain Guidance For Bodha

Bodha should speak in its own voice. SEO should clarify the site's knowledge structure, not flatten it.

Use terms naturally:

- Hindu temple
- mandir
- sacred geography
- kshetra
- tirtha
- Dharma
- Sanatana Dharma
- Indian Knowledge Systems
- IKS
- Sanskrit
- shastra
- darshana
- gurukula
- Hindu education
- temple architecture
- Hindu civilizational thought

Prefer precise, topic-rich descriptions over generic marketing language.

Weak:

```text
Learn more about our work and resources.
```

Stronger:

```text
Bodha's guide to Indian Knowledge Systems, linking research, Sanskrit traditions, Hindu education, darshanas, and curated library paths.
```

## Current Known Limitations

The current tool is the first working slice.

Limitations:

- It does not apply code changes yet.
- HTML parsing is lightweight and may miss unusual metadata patterns.
- Live crawl is opt-in.
- Dynamic concept and explorer pages are counted only when discoverable through public surfaces.
- Topic clusters are seed-based and should be reviewed by a human.
- Reports are diagnostic, not a substitute for editorial judgment.

## First Week Checklist

On your first week:

- [ ] Run `npm run seo:audit`.
- [ ] Read `sitemaster/seomaster/reports/site-audit.md`.
- [ ] Run `npm run seo:topic -- hindu-temple`.
- [ ] Run `npm run seo:topic -- indian-knowledge-systems`.
- [ ] Pick 5 high-priority pages.
- [ ] For each page, run `npm run seo:page -- <path>`.
- [ ] Create a prioritized SEO worklist.
- [ ] Ask a developer or agent to fix one small batch first.
- [ ] Run the audit again after changes.
- [ ] Record what improved and what remains.

## Handoff Notes

If you need technical help, point the developer or agent to:

```text
sitemaster/seomaster/developer.md
```

If you need a current SEO snapshot, point them to:

```text
sitemaster/seomaster/reports/site-audit.md
```

If you need cluster planning, point them to:

```text
sitemaster/seomaster/reports/topic-hindu-temple.md
sitemaster/seomaster/reports/topic-indian-knowledge-systems.md
```

The best operating habit is simple: run the audit, read the report, choose a focused batch, make changes deliberately, then rerun the audit.
