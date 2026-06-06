# Aryavarta Issue Page Audit

Page: `src/routes/aryavarta/[issue]/+page.svelte`
Date: 2026-06-06

## Summary

A straightforward content page with a PDF reader, language toggle, and standard page shell. Clean and minimal — one of the simpler pages on the site.

## Design System Observations

### 1. `main-btn` Button Pattern

**Location**: Lines 57–58.

```svelte
<button class="main-btn" class:active={!showHindi} ...>Read in English</button>
<button class="main-btn" class:active={showHindi} ...>हिंदी में पढ़ें</button>
```

Uses `.main-btn` with `.active` class toggle. The `.main-btn` class is defined in `_buttons-links.sass` and uses `--color-theme` for the active state. This is the only page on the site that uses `.main-btn`. All other pages use `.small-button`, `.primary`, or `.selection-button`.

**Observation**: Not a bug, but an inconsistent button style. If this pattern is needed elsewhere, it should be documented. If not, it's a one-off that's fine to keep.

### 2. Language Preference in `localStorage`

**Location**: Lines 11–14.

```ts
const LANG_KEY = 'aryavarta_lang_pref';
let showHindi = $state(browser ? localStorage.getItem(LANG_KEY) === 'hi' : false);
// ...
if (browser) localStorage.setItem(LANG_KEY, showHindi ? 'hi' : 'en');
```

✅ Properly guarded with `browser` check. Good practice for SSR compatibility.

### 3. `$iW` Store Import

**Location**: Line 10.

```ts
import { iW } from '$lib/utils/globalstores';
```

Uses a Svelte store (`$iW` with `$` prefix in the template for `doubleSpread` prop). The project is otherwise fully migrated to runes. This is a legacy store import — the only store usage on this page. The `iW` value could be derived from a rune `$state` instead. Minor inconsistency.

### 4. Parallax + Crumb Pattern

**Location**: Lines 35–38.

```svelte
<Parallax imageLink={data.image} wipe={true} />
<Container>
  <Crumb showT={true} title={data.title} ... />
```

✅ Follows the standard landing page pattern (Parallax → Container → Crumb).

### 5. PDF Reader Integration

**Location**: Line 62.

Uses the `PDFReader` component from `$lib/comps`. This is the only page in the audited set that uses this component. It's well-encapsulated and doesn't leak styling concerns.

## Positive

- ✅ Clean, minimal page template
- ✅ Proper SSR guards on browser-only code
- ✅ JSON-LD with article schema
- ✅ All sections use animation wrappers appropriately
- ✅ No legacy Svelte patterns (except the store import)
- ✅ Minimal page-level SASS (none — no `<style>` block)

## Recommendations

1. **Replace store with rune** — `iW` could be a `$state` bound via `<svelte:window bind:innerWidth>`, aligning with the rest of the codebase
2. **No critical issues** — this page is well-structured
