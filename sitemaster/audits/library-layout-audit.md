# Library Group Layout Audit

Page: `src/routes/library/(library-subroutes)/+layout.svelte`
Date: 2026-06-06

## Summary

The library group layout provides a shared sidebar navigation with accordion-based category and path menus for all library subroutes. This is the only route group on the site using the SvelteKit route group pattern `(library-subroutes)`.

## Design System Observations

### 1. Custom Accordion Implementation

**Location**: Lines 73–127.

The accordion sidebar uses custom `.sidebar-button` and `.accordion-item` classes defined in page-level SASS. The accordion logic (toggle via `openAccordion` state, auto-open on navigation) is inline.

This is the **only accordion navigation** on the site. It is not extracted as a component and is not documented in the design system.

**Observation**: The accordion works well and is self-contained. Extracting it to `$lib/comps/accordion-nav.svelte` would only be worthwhile if another section needs an accordion sidebar.

### 2. `docgrid.scrollside.library` Layout

**Location**: Line 56.

```svelte
<section class="docgrid scrollside library">
```

Uses `docgrid` with:
- `.scrollside` — sticky scrollable sidebar (from `_document-layout.sass`)
- `.library` — 440px sidebar width (from `_document-layout.sass`)

✅ Correct use of the design system's document layout variants.

### 3. Hidden Bullet Style Override

**Location**: Lines 173–187 (page SASS).

```sass
.docmain
  background: var(--color-back)
```

Minor — forces white background on the main content area. This is likely to override the dark navbar area. ✅ Acceptable.

### 4. Custom `sidebar-button`, `book-link`, `accordion-icon` Classes

These are all defined in page-level SASS. The patterns are:
- `.sidebar-button` — full-width button with hover and active states
- `.book-link` — book title link with hover
- `.accordion-item` — container with `border-bottom`

None of these exist in the design system's `_buttons-links.sass` or `_layout.sass`. They are layout-specific UI elements that only appear in this one file.

### 5. `libCategories` and `libPaths` Data

**Location**: Line 6.

```ts
import { libCategories, libPaths } from '$lib/utils/localsends';
```

The sidebar data is loaded from a shared utility module. ✅ Good separation of concerns.

### 6. Complex Derived Data

**Location**: Lines 21–33.

```ts
let booksByCategory = $derived.by(...)
let booksByPath = $derived.by(...)
```

These derived values compute the book groupings for each accordion section. The data flows from `library-items.json` and `path-books-map.json` JSON files through utility functions into this layout.

### 7. Auto-Animate on Accordion

**Location**: Lines 81, 100.

```svelte
<div class="accordion-item" use:autoAnimate>
```

Uses `@formkit/auto-animate` for smooth accordion open/close. ✅ Clean.

## Positive

- ✅ `docgrid` layout with correct scrollside variant
- ✅ URL-aware auto-open (tracks page path to open correct accordion)
- ✅ Clean accordion implementation with auto-animate
- ✅ Dynamic book lists from JSON data
- ✅ Responsive — sidebar hides on mobile, content fills width
- ✅ No legacy Svelte patterns
- ✅ Minimal page-level SASS

## Recommendations

1. **No critical issues** — the library layout is well-structured for its specific purpose
2. **Document the accordion pattern** if another section ever needs a collapsible sidebar nav
