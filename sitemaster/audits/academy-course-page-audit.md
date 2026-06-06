# Academy Course Page Audit

Page: `src/routes/academy/[course]/+page.svelte`
Date: 2026-06-06

## Summary

The course detail page is one of the more complex pages on the site, with a tabbed interface for course details. Generally well-structured with one notable bug and several design system observations.

## Critical Issues

### 1. CSS Class Typo: `.h-also`

**Location**: Line 113, facilitator section.

```svelte
<img class="fitted h-also" src={person.photo} alt={person.name} />
```

`.h-also` is defined in `_modifiers.sass` as:
```sass
img.fitted
  &.h-also
    height: 100%
```

This is valid — the class exists. However, it's defined as a chained selector (`img.fitted.h-also`), which means it only works when BOTH `.fitted` and `.h-also` are present on an `<img>`. This usage is correct. Not a bug.

## Design System Observations

### 2. Tab System: Custom Implementation

**Location**: Lines 30–156 (entire tab panel).

This page implements tabs using `Menudrop` + custom `selection-button` buttons + `autoAnimate` for transitions. This is one of three different tab implementations on the site:
- This page: `Menudrop` wrapper with `selection-button` buttons
- `wiki/[domain]/+page.svelte`: custom `selection-button` buttons (no `Menudrop`)
- `concepts/[slug]/+page.svelte`: custom `isItem` toggle with inline buttons

All three should be consolidated into the proposed `Tabs.svelte` component.

### 3. Course Header: Custom Layout vs. Design System

**Location**: Lines 33–76.

The course header uses a custom two-column grid with `.ordered` (which enables `.up`/`.down` reordering on mobile), `.down` on the text column, and `.up` on the image column. On mobile, the image appears above the text (because `.down` / `.up` map to grid areas).

This is correct usage of the design system's `.ordered` pattern (defined in `_grid.sass`):
```sass
.ordered
  @media (max-width: 1024px)
    grid-template-areas: "up" "down"
```

✅ Good — uses existing primitives correctly.

### 4. Meta Data Grid: Inconsistent with Temple Page

The course metadata (calendar, sessions, timings, price) uses:
```svelte
<div class="grid grid-cols-2 lg:grid-cols-4 white-grid mtop16">
```

The temple page uses the same `white-grid` pattern for facts. This is a candidate for the proposed `FactGrid.svelte` component.

### 5. Tab Content Grid Variants

Each tab uses a different grid layout:

| Tab | Grid | Count |
|---|---|---|
| Overview | `grid-cols-1 lg:grid-cols-2` | 2 items |
| Audience | `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` | Variable |
| Takeaways | `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` | Variable |
| Facilitator | `grid-cols-1 lg:grid-cols-2` | 1 item |
| Sessions | `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` | Variable |

This variation is justified by content differences. No issue.

### 6. Page-Level Style Overhead

**Location**: Lines 159–172 (the `<style>` block).

The page-level styles are minimal (5 selectors, mostly layout rules for the header grid). This is good — the page relies heavily on design system classes. ✅

### 7. Date Range Display

**Location**: Line 49.

```svelte
<p class="txt-sm tt-u w500">{detail.dates}</p>
```

Dates like courses typically span multiple days/months. The course data drives this display, so content quality is a data concern, not a template concern. ✅

## Positive

- ✅ Correct page shell: Head → Container → sections
- ✅ Uses `Crumb` with `isSolo` variant (no description)
- ✅ Uses `Title` component consistently
- ✅ Tab system works well responsively (collapses to dropdown on mobile via `Menudrop`)
- ✅ All images have alt text
- ✅ No legacy Svelte patterns
- ✅ Minimal page-level SASS — good design system adherence

## Recommendations

1. **Consolidate tab implementations** — this page, `wiki/[domain]`, and `concepts/[slug]` should all use the same `Tabs.svelte` component
2. **Extract `FactGrid.svelte`** — the metadata grid (calendar/sessions/timings/price) matches the temple facts pattern exactly
3. **No other issues found** — this page is well-structured
