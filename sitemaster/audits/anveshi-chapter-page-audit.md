# Anveshi Chapter Page Audit

Page: `src/routes/anveshi/[chapter]/+page.svelte`
Date: 2026-06-06

## Summary

The chapter detail page follows the standard page shell (Parallax → Container → Crumb → sections) but uses customized section widths and styling. Generally clean with minor issues.

## Design System Observations

### 1. Custom Icon Box Grid (Metadata)

**Location**: Lines 100–135.

The metadata grid (dates, price, duration, temples, register, brochure) uses a custom grid:
```svelte
<div class="grid grid-cols-2 lg:grid-cols-6 gap16">
```

Each cell is an `.icon-box.box.dates.std-pad.b-main` with an SVG icon, value, and label. This is similar to:
- The course page metadata grid (calendar/sessions/timings/price) which uses `white-grid`
- The temple page fact grid

All three are candidates for `FactGrid.svelte`.

### 2. `pre` Element for Itinerary Text

**Location**: Line 142.

```svelte
<pre class="txt-lg">{item.itinerary}</pre>
```

The design system styles `pre` elements with `white-space: pre-line` (in `_typography-utilities.sass`), which collapses whitespace. If the itinerary data contains intentional line breaks (`\n`), they will render correctly. If the data relies on raw whitespace formatting, it may not display as intended. Verify the data format.

### 3. Chapter Title in Crumb: Quoted String vs. Variable

**Location**: Line 84.

```svelte
<Crumb showT={true} title="{data.slug} Chapter" ... />
```

The title is `{data.slug} Chapter` — a string concatenation inside the template. If `data.slug` is "badami", the title becomes "badami Chapter". The lowercase slug may not be ideal for display. Consider using a `chapterName` derived from data or adding proper casing.

**Fix**: If `data.slug` is used directly, consider `{data.title}` or capitalize the slug: `{data.slug.charAt(0).toUpperCase() + data.slug.slice(1)} Chapter`.

### 4. Global Style Leak

**Location**: Lines 189–199 (the `<style>` block).

```sass
:global(.anveshi-tabs .tab)
  --tab-active-color: var(--color-anveshi)
```

Using `:global` to style tabs from an external library or component. This is an acceptable pattern but creates a global style dependency. If the `.anveshi-tabs` class is specific to this page, consider scoping the global styles more tightly.

### 5. `h-also` Usage

**Location**: Not on this page (was on academy course page). This page doesn't use it.

### 6. Image Alt Text

**Location**: Lines 153 (temples inside swiper).

```svelte
<img class="fitted landscape" src={item.image} alt={item.temple} />
```

✅ Good — uses temple name as alt text.

## Positive

- ✅ Standard page shell: Parallax → Container → Crumb → sections
- ✅ JSON-LD with detailed itinerary schema
- ✅ All sections use `Slide` or `Reveal` animation wrappers appropriately
- ✅ Minimal page-level SASS — good design system compliance
- ✅ No legacy Svelte patterns

## Recommendations

1. **Add display title** — don't use the raw slug as the page title; derive a proper chapter name
2. **Extract icon box grid** — this metadata pattern shares structure with course page and temple page grids
3. **No critical issues** — this page is well-maintained
