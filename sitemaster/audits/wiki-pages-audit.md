# Wiki Pages Audit

Routes:
- `src/routes/wiki/+page.svelte`
- `src/routes/wiki/[domain]/+page.svelte`
- `src/routes/wiki/[domain]/[item]/+page.svelte`
- `src/routes/wiki/temples/+page.svelte`
- `src/routes/wiki/temples/[temple]/+page.svelte`
- `src/routes/wiki/tags/+page.svelte`

Date: 2026-06-06

## Summary

The wiki section is the most design-system-compliant section on the site. Pages consistently follow the standard patterns: Head → Container → Crumb → sections, with `wrapper-std.growingline` + `Title` + animated grids. Few issues found.

---

## `wiki/+page.svelte`

### Design System Issues

#### 1. Graph Section with `#graph-section` Anchor

**Location**: Lines 88–89.

```svelte
<section class="wrapper-std growingline" id="graph-section">
  <Title text="Graph View" />
```

✅ Standard section pattern.

#### 2. Domain Grid — Inline Card

```svelte
<a href="/wiki/{domain.slug}" class="whitestone rgap16 blank box slide-item2 std-pad b-main">
  <p class="txt-2xl w600">{domain.title}</p>
  <p class="grey1">{domain.description}</p>
  <div><p class="txt-xs tt-u w500" style="color: {domain.color}">{domain.count}</p>
  <p class="txt-00 grey2 w600">connections</p></div>
</a>
```

Uses `style="color: {domain.color}"` for domain-specific colors. The design system defines `--color-theme` but not domain colors. This inline approach is appropriate for data-driven colors.

### Positive

- ✅ Standard landing page with Parallax → Container → Crumb → sections
- ✅ Interactive WikiGraph component
- ✅ JSON-LD with proper metadata
- ✅ `#graph-section` anchor navigation works with scroll-smooth

---

## `wiki/[domain]/+page.svelte`

### Design System Issues

#### 1. Tab Implementation (#5 on the site)

**Location**: Lines 82–120.

Uses `selection-button` buttons with `Responsive` wrapper and `activeTab` state. This is the **fifth** distinct tab implementation on the site, after:
1. Academy course: `Menudrop` + `selection-button`
2. Concepts slug: `isItem` toggle (non-functional)
3. Explorer: `Responsive` + `active` index
4. Wiki tags filter: custom toggle
5. **Wiki domain: `Responsive` + `selection-button` + `activeTab`**

This one is closest to the explorer's implementation (both use `Responsive` wrapper) but with different state management.

#### 2. IKS Papers Search Section

**Location**: Lines 64–79.

A domain-specific feature: when the domain is "Indian Knowledge Systems and Education", a search input appears with IKS database results. This is conditionally shown via:
```svelte
{#if data.domain.title === 'Indian Knowledge Systems and Education'}
```

✅ Good use of conditional rendering for domain-specific features.

#### 3. `Crumb2` Variant

**Location**: Line 61.

```svelte
<Crumb2 showT={true} title={data.domain.title} showD={true} desc={data.domain.description} showRow={true}>
```

Uses the `Crumb2` variant (defined in `crumb-2.svelte`). This is the only section using `Crumb2` instead of `Crumb`. The difference is subtle — slightly different layout in the header area.

### Positive

- ✅ Standard section pattern with tabs + filtered grids
- ✅ Comprehensive tab system with content-aware availability
- ✅ JSON-LD with webPageJsonLd
- ✅ IKS paper search is well-integrated

---

## `wiki/[domain]/[item]/+page.svelte`

### Design System Observations

#### 1. No Section Headers (Intentionally)

**Location**: Lines 53–98.

The "Referenced by" and "Draws on & addresses" sections don't use `Title` components or `growingline` — they're plain sections with `<p>` headings. The `growingline` pattern would add visual weight that this page type doesn't need. ✅ Acceptable.

#### 2. Card Grid — Inline Pattern

```svelte
<a class="box whitestone tight-pad paper-1" href={nodeHref(item)}>
  <p class="txt-xs tt-u w500 theme">{item.type.replaceAll('-', ' ')}</p>
  <p class="txt-lg w600 a-hover ptop12 pbot4">{item.title}</p>
  {#if item.description}
    <p class="grey1 lh14 txt-sm">{item.description}</p>
  {/if}
</a>
```

This is **the canonical inline card pattern**. It appears on:
- `wiki/[domain]/[item]` (referencedBy + related)
- `concepts/[slug]`
- `wiki/tags`
- `wiki/[domain]`

This is the strongest candidate for `CardGrid.svelte` extraction.

#### 3. Tag List — Inline

```svelte
<span class="txt-xs tt-u w500 grey0">{tag.replaceAll('-', ' ')}</span>
```

✅ `TagList` candidate.

### Positive

- ✅ Clean, well-structured detail page
- ✅ JSON-LD with webPageJsonLd
- ✅ Minimal page-level SASS
- ✅ No legacy Svelte patterns

---

## `wiki/temples/+page.svelte`

### Observations

#### 1. Inline Card Pattern

The temple directory uses `.whitestone.b-main.std-pad` cards with image, title, state, and tags. Similar to the canonical card pattern with a large hero image.

#### 2. Temple-Specific Layout

The temple directory has a unique header with a search input and a large image — not fitting the standard section pattern. ✅ Acceptable for a directory page.

---

## `wiki/temples/[temple]/+page.svelte`

### Design System Issues

#### 1. Custom `temple-grid` Layout

**Location**: Lines 145–173 (page SASS).

```sass
.temple-grid
  grid-template-columns: 1fr
  grid-template-areas: "side" "main"
  @media (min-width: 1025px)
    grid-template-columns: 360px 1fr
    grid-template-areas: "side main"
```

This custom grid is almost identical to `doc-header-grid` from the design system (360px sidebar + 1fr main). The only difference is that the temple grid has the sidebar on the RIGHT ("side" then "main") while `doc-header-grid` has the sidebar on the LEFT ("aside" then "mainarea").

**Fix**: This could use `doc-header-grid` with an `inverted` variant if the sidebar should be on the right. Currently `doc-header-grid .inverted` keeps the aside on the left but reverses the mobile order. A new variant `.right-aside` could be added to `_sections.sass`.

#### 2. Duplicated Description Paragraph

**Location**: Lines 139–140.

```svelte
<p class="paragraph-text">{data.temple.description}</p>
<p class="paragraph-text">{data.temple.description}</p>
```

The same line is duplicated — the description appears twice. This is either a formatting bug or intentional emphasis.

**Severity**: Likely a copy-paste bug. Verify intent.

#### 3. Image Alt Text

**Location**: Line 110.

```svelte
<img class="fit radius" src={displayImage} alt={templeName} />
```

✅ Uses `templeName` as alt text.

### Positive

- ✅ Comprehensive JSON-LD metadata
- ✅ Fact grid with `white-grid` pattern
- ✅ Clean funtional helper functions
- ✅ Well-structured page-level logic

---

## `wiki/tags/+page.svelte`

### Design System Issues

#### 1. Custom `.doc-header-grid` Usage

**Location**: Lines 93–94.

```svelte
<div class="doc-header-grid wide-aside inverted">
  <aside class="box">...</aside>
  <div class="main-area rgap32 box">...</div>
</div>
```

Uses `.doc-header-grid.wide-aside.inverted` — 480px sidebar, aside on left. ✅ Correct usage.

#### 2. Tag Filter — Custom Toggle

**Location**: Lines 40–50.

Multiple buttons with `toggleTag`, `clearFilters`, `removeTag` functions. This is a multi-select filter pattern (unlike the big-questions region filter which is single-select). ✅ Well-implemented.

#### 3. Input Styling

**Location**: Lines 157–162 (page SASS).

```sass
input
  padding: 0.5rem 1rem
  border: var(--border-darker)
  border-radius: 4px
  font-size: 0.9rem
  width: 100%
```

Input styling is defined in page-level SASS and duplicated in `wiki/domains` and potentially other pages. The design system has no `<input>` primitive — inputs are styled per-page.

**Recommendation**: Add an `.input-std` class to the design system for text inputs, search inputs, and textareas.

## Cross-Cutting Recommendations (Wiki)

1. **Extract `CardGrid.svelte`** — the wiki pages are the most consistent users of the inline card pattern
2. **Standardize `doc-header-grid` sidebar position** — the temple page's `temple-grid` is a mirror of `doc-header-grid` with right-side sidebar
3. **Create input primitive** — input styles are duplicated across wiki tags, wiki domain, and potentially other pages
4. **Check duplicated description** on temple detail page
