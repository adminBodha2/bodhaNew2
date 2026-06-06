# Blog Pages Audit

Routes:
- `src/routes/blog/+page.svelte` (index)
- `src/routes/blog/[post]/+page.svelte`
- `src/routes/blog/external-posts/+page.svelte`
- `src/routes/blog/tags/+page.svelte`
- `src/routes/blog/tags/[tag]/+page.svelte`
- `src/routes/blog/writers/+page.svelte`
- `src/routes/blog/writers/[writer]/+page.svelte`

Date: 2026-06-06

## Summary

The blog section is the most complex route group on the site (7 pages). The pages are generally well-structured but have the highest concentration of design system drift — custom layouts, inline styles, duplicated patterns, and some unused code.

---

## `blog/+page.svelte` (Index)

The most complex page on the site with 495 lines of Svelte. Contains the full blog layout with featured posts, hero section, sidebar, category filter, and paginated article grid.

### Design System Issues

#### 1. Custom Hero Layout (Not Standard Pattern)

**Location**: Lines 155–250.

The blog index uses a unique hero layout with:
- A `.featured-essay` with gradient overlay (`.featured-overlay`)
- A `.highlight2` column with secondary posts
- A `.sidearea` with external posts, writers, and tags

This layout is defined in the page-level `<style>` block with 100+ lines of SASS. None of this is reusable — it's entirely page-specific.

**Observation**: This is acceptable for the blog index, which is deliberately the most visually rich page on the site. The pattern would only make sense to extract if a second listing page needed the same treatment.

#### 2. `blog.sass` Import

**Location**: Line 15.

```ts
import '$lib/styles/system/blog.sass';
```

Blog pages import a separate `blog.sass` file. This file also imports `_blog.sass`:

```
$ cat _blog.sass  (from initial read — _blog.sass is a partial)
```

The blog SASS file defines `.blog-wrapper`, `.blog-bucket`, and other blog-specific classes used across blog subroutes. This is a reasonable separation of concerns, but it means blog pages depend on a non-system stylesheet.

#### 3. Inline `style` Attributes

**Location**: Lines 23, 30, 35, 40.

The `<section>` tags use inline styles:
```svelte
<section class="wrapper-std header-margin" style="row-gap: 2rem">
```

The design system provides `rgap32` — this should be `class="wrapper-std header-margin rgap32"` rather than inline CSS. This pattern repeats on:
- `blog/tags/+page.svelte`
- `blog/external-posts/+page.svelte`
- `blog/writers/+page.svelte`

**Fix**: Replace `style="row-gap: 2rem"` with `rgap32` class.

#### 4. Category Filter: Custom Implementation

**Location**: Lines 295–310.

A responsive menu-based category filter similar to the wiki domain tabs and academy course tabs. This is the fourth distinct tab/filter implementation on the site.

#### 5. Load More Pagination

**Location**: Lines 403–415.

Uses a custom `.load-more-wrap` / `.load-more-button` pattern defined in page-level SASS. This is the only pagination on the site. If other listing pages eventually need pagination, this pattern should be extracted.

#### 6. Unused Mobile Menu Code

**Location**: Lines 24–25, 54–64.

```ts
let categoryMenuOpen = $state(false);
let firstCategoryItem: HTMLButtonElement | undefined = $state();
```

`firstCategoryItem` is set but never referenced in the template. The `$effect` that focuses it uses `tick()` but the variable is never assigned to any element.

### Observations

#### 7. `#all-articles` Section Uses `Slide` for Category Buttons

**Location**: Line 293.

```svelte
<Slide targetSelector=".small-button">
```

Animates all the category filter buttons. This is fine but unusual — most pages animate content grids, not filter bars.

#### 8. JSON-LD

Uses `collectionPageJsonLd` with all posts as items. ✅ Correct.

### Positive

- ✅ Rich visual layout with hero, sidebar, and grid sections
- ✅ Category filter works well
- ✅ Pagination (load more) works correctly
- ✅ No legacy Svelte patterns

---

## `blog/[post]/+page.svelte`

A 244-line blog post reader with TOC, reading progress, social sharing, and related posts.

### Design System Issues

#### 1. Store Usage

**Location**: Line 14.

```ts
import { readerChromeHidden } from '$lib/utils/globalstores';
```

Uses a Svelte store (`readerChromeHidden`) instead of a rune. The store is set in `processScroll` and cleared in `onDestroy`. This is the only store-driven component in the audited pages (besides the minor `iW` usage on aryavarta/[issue]).

**Severity**: Low. The store is used for cross-component communication (header chrome visibility), which runes don't natively support without a module-level pattern.

#### 2. Mouse Store Import

**Location**: Line 13.

```ts
import { mouseStore } from '$lib/utils/mousestore';
```

Also a store. Used for `mouseViewportY` calculation to show/hide reader chrome when the mouse approaches the top.

#### 3. Inline Scroll Chrome Logic

**Location**: Lines 53–92.

The scroll chrome visibility logic (40 lines) is inline in the component. This is self-contained and well-structured with `processScroll` as a named function. If the reader pattern is reused elsewhere, this could be extracted.

#### 4. WaterRipple Hero

**Location**: Line 125.

```svelte
<WaterRipple src={metaImage} class="ripple-motion" brushSize={100} />
```

Uses the custom WaterRipple component. This is the only page using it. ✅ Well-encapsulated.

#### 5. Commented-Out TOC

**Location**: Lines 130–142.

The entire TOC nav is commented out:
```svelte
<!--
{#if headings.length >= 2}
  <nav class="toc box rgap16" aria-label="On this page">
    ...
  </nav>
{/if}
-->
```

Dead code. The `headings` variable is still populated via `$effect` (lines 96–109), so the computation runs on every page load but is never rendered.

**Fix**: Either remove the commented block or uncomment it if TOC should be shown.

#### 6. Image Alt Text

**Location**: The WaterRipple component doesn't receive alt text, but uses `metaImage` as src. The `blog-image-area` div has no alt on the ripple. Since WaterRipple is a canvas/visual effect, this is acceptable — but an aria-label on the parent would be better for accessibility.

#### 7. Blog Article Typography

Uses `.blog-article` class from `_typography-utilities.sass` which sets `font-family: 'STIX Two Text'` and specific heading/paragraph styles. ✅ Correct use of the design system.

### Positive

- ✅ Well-structured with clear separation of concerns
- ✅ `$effect` boundaries are narrow and well-documented
- ✅ JSON-LD with full article schema
- ✅ `onDestroy` cleanup for store
- ✅ Proper SSR guards

---

## `blog/external-posts/+page.svelte`

A simple listing page for external essays.

### Design System Issues

#### 1. Inline Style on Section

**Location**: Line 77.

```svelte
<section class="wrapper-std header-margin" style="row-gap: 2rem">
```

**Fix**: Use `rgap32` class instead of inline style.

#### 2. Duplicate Blog Menu Pattern

**Location**: Lines 78–83.

The `ResponsiveMenu` with blog sub-navigation (External Posts, Writers, Tags) is duplicated across 5 of the 7 blog pages:
- `blog/+page.svelte` (with an additional "Blog" home link)
- `blog/external-posts/+page.svelte`
- `blog/tags/+page.svelte`
- `blog/tags/[tag]/+page.svelte`
- `blog/writers/+page.svelte`
- `blog/writers/[writer]/+page.svelte`

This is 6 copies of the same markup. A blog layout (`+layout.svelte`) could provide this menu once for all subroutes. Currently there is **no blog layout file**.

**Fix**: Create `src/routes/blog/+layout.svelte` with the shared `ResponsiveMenu` and wrap all subroutes.

#### 3. Dead Mobile Menu Code

**Location**: Lines 17–18, 30–33, 37–40, 45–57.

```ts
let mobileMenuOpen = $state(false);
let firstMenuItem: HTMLButtonElement | undefined = $state();
```

Same unused focus-trap pattern as `blog/+page.svelte`. `onWindowKeydown` is attached via `<svelte:window>` but `closeMobileMenu` and `firstMenuItem` are never used in the template. Dead code.

#### 4. External Post Card Pattern

```svelte
<a class="blank box rgap16 whitestone std-pad b-main" href={post.route} ...>
  <p class="txt-xs tt-u grey1">{post.platform}</p>
  <p class="txt-xl w600 a-hover">{post.title}</p>
  <p class="grey1">{post.description}</p>
  ...tags...
</a>
```

Matches the inline card pattern from wiki, concepts, etc. — another `CardGrid` candidate.

### Positive

- ✅ JSON-LD with collection schema
- ✅ Clean and minimal
- ✅ No legacy Svelte patterns

---

## `blog/tags/+page.svelte`

Tag directory with alphabetical/count toggle and tag post preview.

### Design System Issues

#### 1. Tag Count Toggle Uses Custom Pattern

**Location**: Lines 109–130.

Uses a `.toggler-std` toggle switch (defined in `_buttons-links.sass`) to switch between alphabetical and by-count views. This is the only usage of `.toggler-std` outside of global UI (theme toggle, etc.).

#### 2. Custom `blog-wrapper` Grid Layout

**Location**: Lines 133–150 (page-level SASS).

```sass
.blog-wrapper
  display: grid
  grid-template-columns: 1fr
  grid-template-areas: "tags" "results"
  @media (min-width: 1025px)
    grid-template-columns: 360px 1fr
    grid-template-areas: "tags results"
```

A custom sidebar+main grid defined per-page. The design system has `doc-header-grid` (in `_sections.sass`) that provides this exact layout:
- 360px sidebar + 1fr main on desktop
- Stacked on mobile
- Optional `.inverted`, `.wide-aside` variants

**Fix**: Replace the custom `.blog-wrapper` grid with `doc-header-grid` from the design system.

#### 3. `main-btn` with `active` Class

**Location**: Tag filter buttons use `.main-btn.tt-u` with `.active` toggle. Same pattern as the aryavarta issue page language toggle. The page-level style block has custom active styles:
```sass
.main-btn.active
  background: var(--color-theme-dark)
  color: var(--color-back)
```

This is unnecessary — the design system's `.main-btn.active` is already defined in `_buttons-links.sass` with identical styles. Redundant declaration.

**Fix**: Remove the duplicate `.main-btn.active` from the page-level style block.

#### 4. Inline Style on Section

**Location**: Line 105.

```svelte
<section class="wrapper-std header-margin" style="row-gap: 2rem">
```

**Fix**: Use `rgap32` class.

#### 5. `activeTag` State + `$effect` for Data Fetching

**Location**: Lines 24–28.

```ts
let activeTag = $state<string | null>(null);
let tagPosts = $state<any[]>([]);

$effect(() => {
  const tag = activeTag;
  if (!tag) { tagPosts = []; return; }
  fetchTagPosts(tag).then(posts => { tagPosts = posts; });
});
```

Fetches posts when a tag is selected. Uses `any[]` type — should be typed. But the `selectedTag` import from `$lib/utils/blogpulls` may not export typed functions.

### Positive

- ✅ Toggle between alphabetical and count views is a nice UX pattern
- ✅ JSON-LD with collection schema
- ✅ Uses shared `Card` component for post previews

---

## `blog/tags/[tag]/+page.svelte`

Tag detail page showing all posts for a specific tag.

### Design System Issues

#### 1. `route` Variable from Data

**Location**: Line 19.

```ts
let route = $derived(data.route);
```

The variable is named `route` but the template uses it as the tag name in `<title>` ("Tag | {route}"). This is a data naming issue, not a template issue.

#### 2. Card Pattern

The post cards use a custom structure similar to the blog index but with slightly different class compositions. Another `CardGrid` candidate.

#### 3. Dead Mobile Menu Code

**Location**: Lines 21–22, 27–30, 33–37, 40–57.

Same dead code pattern as `external-posts`: `mobileMenuOpen`, `firstMenuItem`, `closeMobileMenu`, `onWindowKeydown` are all defined but `firstMenuItem` is never used in the template.

#### 4. No Crumb Title

**Location**: Line 68.

```svelte
<Crumb showT={false} title="Tags | Bodha" showRow={true}>
```

`showT={false}` hides the crumb title. This is correct — the `PageHead` at the top already provides the title. ✅

### Positive

- ✅ Clean listing page
- ✅ JSON-LD with collection schema

---

## `blog/writers/+page.svelte`

Writer directory with avatar grid.

### Design System Issues

#### 1. Avatar Pattern — 64px

**Location**: Lines 62–70.

```svelte
<a class="blank whitestone p16 row ycenter cgap16" href={post.link}>
  <img class="avatar" src={post.image} alt={post.writer} />
  <p class="txt-xl w500">{post.writer}</p>
</a>
```

Uses a `.avatar` class defined in page-level SASS:
```sass
.avatar
  object-fit: cover
  width: 64px
  height: 64px
  border-radius: 40px
```

This is the **fourth** distinct avatar size on the site:
- About team: 120px circle (`.member-image img`)
- Big Questions sponsor: 104px circle (`.shri-hari-kiran-vadlamani`)
- Blog writers index: 64px (`.avatar`)
- Blog writers page title: probably similar

All should be standardized with an avatar primitive.

### Positive

- ✅ Clean, minimal page
- ✅ JSON-LD with collection schema
- ✅ White-grid for writer listing

---

## `blog/writers/[writer]/+page.svelte`

Writer detail page showing all posts by a writer.

### Design System Issues

#### 1. `any[]` Type

**Location**: Line 11.

```ts
let posts = $derived(data.posts ?? []);
let posts... // typed as any[]
```

If `data.posts` is untyped, `posts` defaults to `any[]`. Should use a typed interface matching the blog post shape.

#### 2. Blog Card Pattern

Uses the shared `Card` component from `$lib/comps/blog-card.svelte`. ✅ Good — this is the only listing page that correctly uses the existing Card component instead of inline card markup.

#### 3. Submenu Pattern

The `ResponsiveMenu` region menu matches other blog subpages. See the recommendation for a blog layout.

#### 4. No Dead Code

No `mobileMenuOpen`/`firstMenuItem` dead code on this page. ✅

## Cross-Cutting Recommendations

### 1. Create Blog Layout (`+layout.svelte`)

All 6 blog subpages duplicate the same `ResponsiveMenu` with blog navigation links. A layout file at `src/routes/blog/+layout.svelte` would provide this once.

### 2. Standardize Inline Styles → Design System Classes

3+ pages use `style="row-gap: 2rem"` instead of `rgap32`.

### 3. Clean Up Dead Code

`blog/+page.svelte`, `blog/external-posts/+page.svelte`, and `blog/tags/[tag]/+page.svelte` all have unused `mobileMenuOpen`/`firstMenuItem`/`closeMobileMenu` state and functions.

### 4. Uncomment or Remove TOC

The commented-out TOC in `blog/[post]/+page.svelte` should either be restored or removed (along with the `headings` computation).

### 5. Replace Custom `.blog-wrapper` with `doc-header-grid`

The tags page defines its own sidebar+main grid that duplicates functionality already in the design system.
