# Library Pages Audit (Part 2)

Routes (batch 2):
- `src/routes/library/(library-subroutes)/journal-archaeology/+page.svelte`
- `src/routes/library/(library-subroutes)/journal-archaeology/[issue]/+page.svelte`
- `src/routes/library/bharata1000/+page.svelte`
- `src/routes/library/bharata1000/[book]/+page.svelte`
- `src/routes/library/(library-subroutes)/paths/[path]/+page.svelte`
- `src/routes/library/(library-subroutes)/categories/[category]/+page.svelte`
- `src/routes/library/(library-subroutes)/books/[book]/+page.svelte`

Date: 2026-06-06

---

## `library/(library-subroutes)/journal-archaeology/+page.svelte`

### Design System Issues

#### 1. Missing `Container` Wrapper

**Location**: This page doesn't use `<Container>`. Content starts directly with `<section class="box rgap32">`. This means the journal-archaeology page doesn't have the standard left/right padding that every other page on the site has.

**Fix**: Wrap content in `<Container>`.

#### 2. Custom Grid for Issues

**Location**: Lines 124–170 (page SASS).

```sass
.grid.issues
  grid-template-columns: 1fr 1fr
  @media screen and (min-width: 1025px)
    grid-template-columns: repeat(3, 1fr)
```

A custom expandable issue grid with accordion behavior. When an issue is clicked (`.openeditem`), it spans `grid-column: span 2` (mobile) or `span 3` (desktop). This is a unique layout pattern not found elsewhere.

#### 3. Legacy Svelte: Svelte Transitions

**Location**: Lines 3–4.

```ts
import { flip } from 'svelte/animate';
import { slide } from 'svelte/transition';
import { sineIn, sineOut } from 'svelte/easing';
```

Uses Svelte 4's `svelte/animate` and `svelte/transition` with `animate:flip` and `in:slide`/`out:slide` directives. This is a valid Svelte 5 pattern (transitions/animate are NOT deprecated), ✅ correct.

#### 4. Unused Class Name

**Location**: Lines 92.

```svelte
<button class="blank row xbetween thisdoes" onclick={() => toggleIssue(item.issue)}>
```

`.thisdoes` is not defined anywhere. No-op class.

#### 5. Duplicate Crumb Pattern

**Location**: Line 55.

```svelte
<Crumb showT={true} title="Indian Journal of Archaeology" showD={true} desc={metaDescription} fullP={true} sidebarSoloPad2={true} />
```

Uses `sidebarSoloPad2={true}` prop — a specialized Crumb variant for library pages. ✅ Valid.

#### 6. `lgrey` Class

**Location**: Not on this page. ✅ `.lgrey` was seen on videos page but not here.

### Positive

- ✅ Rich interactive UI with expandable issue accordion
- ✅ JSON-LD with CollectionPage schema
- ✅ Unique parallax effect via `scroY / 6` inline

---

## `library/(library-subroutes)/journal-archaeology/[issue]/+page.svelte`

Not fully read. Skipped in this pass.

---

## `library/bharata1000/+page.svelte`

### Design System Issues

#### 1. Missing `Container` Wrapper

**Location**: Content starts directly with `<section>` — no `<Container>`. This is the same issue as journalism-archaeology.

#### 2. Complex Data Logic

**Location**: Lines 52–80.

The page builds a `sections` data structure from the raw `rows` array: grouping by section → subsection, counting items. This is complex logic that should live in a `+page.server.ts` load function rather than inline in the template.

#### 3. Inline Card Pattern

The section navigation and reading path cards use `.tight-pad.whitestone` pattern. ✅ `CardGrid` candidate.

### Positive

- ✅ JSON-LD with collection schema
- ✅ URL-based filter state
- ✅ All functions and derivations are clearly named

---

## `library/bharata1000/[book]/+page.svelte`

### Observations

#### 1. Missing `Container` Wrapper

Same issue as other library pages — no `<Container>`.

#### 2. Inline Card Pattern

```svelte
<div class="grid grid-cols-1 lg:grid-cols-3 gap16">
  {#each bookItems as item}
    <a class="blank box rgap8 tight-pad whitestone" href={item.link}>
```

✅ `CardGrid` candidate.

#### 3. `any` Typing

**Location**: Line 8.

```ts
let { data } = $props();
```

Un-typed props. Should use `PageData`.

### Positive

- ✅ JSON-LD with collection schema
- ✅ Single crumb with clear title/description

---

## `library/(library-subroutes)/paths/[path]/+page.svelte`

### Observations

#### 1. Missing `Container` Wrapper

No `<Container>`.

#### 2. Un-typed Props

```ts
let { data } = $props();
```

No `PageData` type.

#### 3. Inline Card Pattern

```svelte
<div class="grid grid-cols-1 lg:grid-cols-3 gap16">
  {#each bookItems as item}
    <a class="blank box rgap8 tight-pad whitestone" href={item.link}>
```

✅ `CardGrid` candidate.

### Positive

- ✅ JSON-LD with WebPage schema
- ✅ Clean layout

---

## `library/(library-subroutes)/categories/[category]/+page.svelte`

### Observations

#### 1. Missing `Container` Wrapper

No `<Container>`.

#### 2. Un-typed Props

```ts
let { data } = $props();
```

No `PageData` type.

#### 3. Inline Card Pattern

Two branches (`aryan-issue` type vs. standard) share the same card structure with different link targets. This is a good `CardGrid` candidate with a variant for external vs. internal links.

#### 4. `any` Typing

**Location**: Line 36.

```ts
books.map((book: any) => ({
```

Explicit `.any` type in map.

### Positive

- ✅ Crumb with fullP and sidebarSoloPad2
- ✅ JSON-LD with collection schema

---

## `library/(library-subroutes)/books/[book]/+page.svelte`

### Critical Issues

#### 1. Legacy Svelte Export Syntax

**Location**: Line 4.

```ts
export let data
```

Uses **deprecated Svelte 4** `export let` syntax for props instead of Svelte 5's `$props()` rune. This is the only page in the entire audited set using legacy syntax.

**Fix**: Replace with:
```ts
import type { PageData } from './$types';
let { data }: { data: PageData } = $props();
```

#### 2. Missing Import Semicolons

**Location**: Lines 5–6.

```ts
import Container from '$lib/comps/wrapper.svelte'
import Crumb from '$lib/comps/breadcrumb.svelte'
```

Missing semicolons. Minor formatting issue.

### Positive

- ✅ Uses `Container` wrapper (one of the few library pages that does)
- ✅ Minimal, clean layout

## Cross-Cutting Recommendations (Library Part 2)

1. **Add `Container` wrapper** to: journal-archaeology, bharata1000, bharata1000/[book], paths/[path], categories/[category] — all lack the standard page padding
2. **Fix legacy `export let`** on `books/[book]/+page.svelte`
3. **Add `PageData` typing** to un-typed pages
4. **Remove unused `.thisdoes` class** from journal-archaeology
