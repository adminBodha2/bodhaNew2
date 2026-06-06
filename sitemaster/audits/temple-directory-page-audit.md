# Temple Directory Page Audit (Supplemental)

Page: `src/routes/wiki/temples/+page.svelte`
Date: 2026-06-06

## Summary

The temple directory is the most complex single page on the site at 985 lines. It features an interactive MapLibre map with clustering, multi-filter system (states, categories, deities, anveshi-only), search, and popup cards. The page was mentioned but not properly audited in the wiki audit. This is a supplemental deep-dive.

## Design System Issues

### 1. No `Head` Component — Uses `Optimizer` Instead

**Location**: Line 1 (after script block).

```svelte
<Optimizer {title} description={metaDescription} url={data.seo.url} ... />
```

This page uses the `Optimizer` component (from `$lib/comps/seo-optimizer.svelte`) instead of the standard `Head` component used by every other page on the site. The `Optimizer` component provides similar SEO metadata (title, meta, OG tags, JSON-LD breadcrumbs) but through a different API.

**Observation**: This is inconsistent with the rest of the site. Every other audited page uses `<Head>` from `$lib/comps/headcomponent.svelte`. The temple directory uses `Optimizer` from `$lib/comps/seo-optimizer.svelte`. These appear to be two different SEO components with overlapping responsibilities.

**Severity**: Medium — it works, but the site now has two competing SEO components. `Optimizer` accepts a different set of props (breadcrumbs as JSON array, siteUrl, noindex, author, twitterCreator) that `Head` doesn't support. If the site needs these features, they should be unified.

### 2. Missing `Container`? No — Container IS Used

✅ Confirmed: `<Container>` wraps the page content (line ~140). Correct.

### 3. Crumb Used Correctly

✅ `<Crumb>` with meta description and data source attribution. Correct.

### 4. Massive Client-Side Logic (985 Lines)

This page is **985 lines** — the longest file on the site by a wide margin. It contains:
- Map initialization with CARTO dark tiles + India boundary overlay
- Temple clustering logic
- State/category/deity filter system
- Search with debounce
- Popup positioning (above/below marker logic)
- 30+ state management variables
- 20+ functions
- 3 `$effect` blocks
- Complex derived data structures

This is not a design system issue, but it's a **maintainability concern**. The map logic alone could be extracted into a `TempleMap.svelte` component in `$lib/comps/`.

### 5. Hardcoded State Colors

**Location**: Lines 94–130.

```ts
const STATE_COLORS: Record<string, string> = {
  'Andaman and Nicobar Islands': '#26a69a',
  'Andhra Pradesh': '#ef5350',
  ...
};
```

34 hardcoded state colors. These are not design system tokens and should not be — they are map-specific data. ✅ Acceptable.

### 6. Massive Page-Level SASS

**Location**: Lines 370–460+ (page `<style>` block).

The page-level styles are ~100+ lines covering:
- Map shell layout
- Filter panel and dropdown styling
- Popup card styling
- MapLibre GL control overrides
- State/category filter item styles

This is the largest per-page style block on the site. Many of these styles could be design system primitives (`.filter-dropdown`, `.filter-item`, `.temple-popup`, etc.) if the map pattern is reused elsewhere. For now, they are page-specific.

### 7. MapLibre GL Third-Party Integration

This page imports `maplibre-gl` and `geojson` types. The map is styled with a custom dark theme (CARTO dark tiles). The third-party map controls (`maplibregl-ctrl-group`, `maplibregl-ctrl button`) are overridden in page-level styles to match the site theme (gold accents).

### 8. Unique Component: `HubRelatedLinks`

**Location**: Line ~153.

```svelte
<HubRelatedLinks title="Related Paths" items={relatedTemplePages} />
```

Uses the shared `HubRelatedLinks` component for related SEO links. ✅ Correct.

### 9. `svelte:options runnes={true}`

**Location**: Line 1.

File starts with `<svelte:options runes={true} />`. ✅ Correct — explicitly opts into runes (required since the file doesn't use `<script lang="ts">` with runes naturally).

## Positive

- ✅ Rich interactive map with clustering, filters, and popups
- ✅ Comprehensive filter system (states, categories, 4 deity types, anveshi-only)
- ✅ Search with instant results
- ✅ Smart popup positioning (above/below/center based on screen space)
- ✅ URL-based navigation to temple detail pages
- ✅ Responsive — popup moves to center on mobile
- ✅ Proper cleanup in `onDestroy` (map removal)
- ✅ All images have alt text

## Recommendations

1. **Unify SEO components** — reconcile `Optimizer` and `Head` into a single component or clearly document their different use cases
2. **Extract `TempleMap` component** — the map initialization, clustering, popup, and filter logic could all live in `$lib/comps/temple-map.svelte` to reduce this file below 500 lines
3. **Consider extracting filter dropdown** — the `.filter-panel`, `.filter-dropdown`, and `.filter-item` styles could become design system primitives if interactive maps are used elsewhere
4. **No critical bugs found** — the page works correctly despite its complexity
