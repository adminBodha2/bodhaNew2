# Lab Pages Audit

Routes:
- `src/routes/lab/+page.svelte`
- `src/routes/lab/[item]/+page.svelte`

Date: 2026-06-06

## Summary

Clean, minimal pages. The lab index is a simple listing and the detail page uses the docgrid layout correctly.

---

## `lab/+page.svelte`

### Design System Issues

#### 1. Inline Card Pattern

**Location**: Lines 36–46.

```svelte
<a class="box blank whitestone std-pad b-main rgap16" href={item.linkpath}>
  <p class="txt-xs tt-u w500 grey1">{item.formattedDate}</p>
  <p class="txt-lg w600 a-hover">{item.meta.title}</p>
  <p class="grey1">{item.meta.excerpt}</p>
  <p class="txt-00 w500 tt-u theme-dark self-bottom">{item.meta.category}</p>
</a>
```

Another instance of the inline card pattern. Uses `theme-dark` for the category label while most other card grids use `theme` — minor inconsistency.

### Positive

- ✅ Standard page shell: Head → Container → Crumb → grid
- ✅ JSON-LD with collection schema
- ✅ No animation wrappers (simple listing — appropriate)
- ✅ No page-level SASS
- ✅ No legacy Svelte patterns

---

## `lab/[item]/+page.svelte`

### Design System Issues

#### 1. `.js` Import

**Location**: Line 4.

```ts
import { formatYear, formatDOM, formatMonth } from '$lib/utils/localpulls.js';
```

Uses a `.js` extension import. The rest of the codebase uses `.ts` or no extension. Minor inconsistency.

#### 2. `docgrid` Layout — Correct

**Location**: Lines 32–49.

```svelte
<section class="docgrid">
  <div class="docside">...</div>
  <div class="docmain">
    <Crumb ... />
    <div class="doctext classic-document"><data.content /></div>
  </div>
</section>
```

Uses `docgrid` with `.docside` sidebar and `.docmain` content area. ✅ Correct layout pattern.

#### 3. `any[]` Type

**Location**: Line 14.

```ts
let labitems = $derived(data.labitems ?? []);
```

Typed as `any[]` via inference. Should use a proper interface.

### Positive

- ✅ `docgrid` layout with sidebar navigation
- ✅ `classic-document` for prose
- ✅ JSON-LD with article schema
- ✅ No page-level SASS
- ✅ No legacy Svelte patterns

## Recommendations

1. **Remove `.js` import extension** on lab detail page for consistency
2. **No critical issues** — both pages are clean and well-structured
