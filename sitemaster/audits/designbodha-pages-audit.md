# DesignBodha Pages Audit

Routes:
- `src/routes/designbodha/+page.svelte`
- `src/routes/designbodha/[paper]/+page.svelte`
- `src/routes/designbodha/pramana-library/+page.svelte`
- `src/routes/designbodha/pramana-library/[card]/+page.svelte`

Date: 2026-06-06

## Summary

The designBodha section is visually distinctive with its own color scheme (`desb` / `--color-designB`). Pages follow the standard shell patterns with some custom flourishes. Several issues found.

---

## `designbodha/+page.svelte`

### Critical Issues

#### 1. Missing `<Head>` Component

**Location**: The `[paper]/+page.svelte` has no `<Head>` component at all — no title, meta description, canonical URL, or JSON-LD. This page has zero SEO metadata.

**Wait — that's `[paper]/+page.svelte`, not this one.** This page does have `Head`. ✅

### Design System Issues

#### 2. Unused State Variables

**Location**: Lines 13–14.

```ts
let iW = $state(0);
let sY = $state(0);
```

`sY` is used for the parallax motif rotation. `iW` is bound via `<svelte:window bind:innerWidth={iW}>` but **never referenced** in the template or computed values. Dead state.

#### 3. Custom Motif Image with Inline Transform

**Location**: Lines 56–57.

```svelte
<img class="motif anim-flyin-right"
  style="margin-left: 200px;transform: translateX(-{sY / 7}px) rotate({sY / 2}deg)"
  ... />
```

Uses inline `style` with scroll-driven transform for a parallax rotation effect. The class `anim-flyin-right` is not defined in the design system or in page-level SASS — it's referenced only here. Likely an animation class from the svelteanim library that's not being applied.

**Observation**: The inline transform works, but `anim-flyin-right` appears to be a no-op (undefined class).

#### 4. `iW` vs. `innerWidth` Naming

**Location**: Line 13.

```ts
let iW = $state(0);
```

Abbreviated name. Other pages use `sY` for scrollY but `iW` for innerWidth is inconsistently named compared to the SvelteKit convention of binding `innerWidth` directly. Minor naming issue.

#### 5. Unique Section Layout

**Location**: Lines 82–115.

The "explore designbodha" section uses a `grid-cols-1 lg:grid-cols-3` layout with mixed content:
- Left column: text
- Middle: card link to Pramana Library (wrapped in `Slide`)
- Right: roadmap card (wrapped in `Slide start="top 70%"`)

This is a unique layout not seen elsewhere. Acceptable for a landing page.

### Positive

- ✅ Standard page shell with Parallax → Container → Crumb → sections
- ✅ JSON-LD with AboutPage schema
- ✅ All images have alt text
- ✅ designBodha brand color used correctly

---

## `designbodha/[paper]/+page.svelte`

### Critical Issues

#### 1. Missing `<Head>` Component — No SEO Metadata

**Location**: The entire script set up.

There is no `Head` component import, no `<title>`, no meta description, no canonical URL, no JSON-LD. The page renders with the default SvelteKit title. This is the only content page in the audited set missing SEO metadata entirely.

**Fix**: Add `Head`, `absoluteUrl`, `absoluteImage` imports and pass metadata.

#### 2. Missing `ogType`, `jsonld` Props on Non-existent `Head`

Since there's no `Head`, there are no OG tags or structured data. Search engines and social media will have no information about this page.

### Design System Issues

#### 3. Custom `whitepaper-box` Centering

**Location**: Lines 30–40 (page SASS).

```sass
.whitepaper-box
  .classic-document
    width: 1024px
    background: var(--color-back)
    margin-left: auto
    margin-right: auto
    padding: 4rem
```

An inline `doc-main` style centering with a fixed max-width of 1024px. The design system has `.docgrid` which provides this same layout (sidebar + centered main content with `max-width: 58rem`).

**Fix**: Consider using `docgrid` with a single-column layout (no sidebar) instead of custom centering.

#### 4. No Container Wrapper?

**Location**: The wrapper structure is:

```svelte
<Container>
  <section class="wrapper-std">
    <div>
      <Crumb ... />
      <div class="whitepaper-box">
        <div class="classic-document"><data.content /></div>
      </div>
    </div>
  </section>
</Container>
```

The content works but doesn't follow the standard section pattern (no `growingline`, no `Title`). Acceptable for a readable document.

### Positive

- ✅ Uses `classic-document` for long-form content
- ✅ All images (via content) handled by `classic-document` styles
- ✅ Crumb present with title and description

---

## `designbodha/pramana-library/+page.svelte`

### Design System Issues

#### 1. Unused State Variables

**Location**: Lines 11–12.

```ts
let iW = $state(0);
let sY = $state(0);
```

Neither `iW` nor `sY` is used in the template. Both are dead state. The `<svelte:window bind:innerWidth={iW} bind:scrollY={sY} />` is bound but never consumed.

**Fix**: Remove both state variables and the `<svelte:window>` binding.

#### 2. Inline Card Pattern for Pramana Cards

**Location**: Lines 79–100.

```svelte
<a class="box rgap16 b-main p24 lg:p32 whitestone" href={item.linkpath}>
  <div class="row mwrap xbetween">
    <p class="txt-00 tt-u desb">{item.meta.id}</p>
    {#if item.meta.tradition}
      <p class="txt-00 tt-u desb">{item.meta.tradition}</p>
    {/if}
  </div>
  ...
</a>
```

Another instance of the inline card pattern. This one has unique visual elements (ID, tradition, Sanskrit transliteration) that make it less generic than other card patterns. However, it still follows the card-grid structure.

#### 3. Import Name: `Revealing` vs `Reveal`

**Location**: Line 5.

```ts
import Revealing from '$lib/svelteanim/components/Reveal.svelte';
```

The imported component is aliased as `Revealing` instead of the standard `Reveal` used everywhere else. In the template it's used as `<Revealing>`. This works but breaks the naming convention — all other pages import it as `Reveal`.

### Positive

- ✅ Standard page shell with Parallax → Container → Crumb → sections
- ✅ JSON-LD with webPageJsonLd
- ✅ All images have alt text

---

## `designbodha/pramana-library/[card]/+page.svelte`

### Design System Issues

#### 1. Custom Sidebar Link Class

**Location**: Lines 56–63 (page SASS).

```sass
.sidebar-link
  transition: all 110ms ease
  padding: 6px 4px
  &:hover
    background: var(--color-grey-0)
```

The sidebar navigation uses a custom class instead of the design system's `.doclink` class (defined in `_document-layout.sass`). `.doclink` provides identical hover behavior (`padding-left` shift + transition).

**Fix**: Replace `.sidebar-link` with `.doclink` from the design system.

#### 2. `docgrid.library` Usage

**Location**: Line 51.

```svelte
<div class="docgrid library">
```

Uses the `docgrid` layout with the `.library` modifier (440px sidebar instead of standard 360px). ✅ Correct use of the design system.

#### 3. `classic-document.classic-type-2`

**Location**: Line 53.

```svelte
<article class="classic-document classic-type-2">
```

Uses the `.classic-type-2` variant which is defined in `_typography-utilities.sass`:
```sass
&.classic-type-2
  p, pre, li
    font-size: calc(var(--txt-xl) * 0.9)
  p, pre
    line-height: 1.7
  h2
    font-size: var(--txt-xl)
```

This is the only page using `.classic-type-2`. ✅ Valid.

### Positive

- ✅ `docgrid` layout with sidebar + main content
- ✅ `classic-document` for prose
- ✅ Crumb with metadata tags
- ✅ JSON-LD with WebPage schema
- ✅ All images (via content) handled by `classic-document`
- ✅ No legacy Svelte patterns

## Cross-Cutting Recommendations

1. **Add `Head` to `[paper]/+page.svelte`** — missing SEO metadata entirely
2. **Remove unused `iW`/`sY` state** from `designbodha/+page.svelte` and `pramana-library/+page.svelte`
3. **Standardize `Reveal` import name** on `pramana-library/+page.svelte` to match the rest of the site
4. **Replace `.sidebar-link` with `.doclink`** on `[card]/+page.svelte`
