# Academy Page Audit

Page: `src/routes/academy/+page.svelte`
Date: 2026-06-06

## Summary

The Academy landing page is well-structured and mostly conforms to the design system. No critical bugs found. Several minor compliance observations.

## Design System Compliance

### 1. Course Cards: Inconsistent Link Wrapping

**Location**: Lines ~62–89 (the `#each courses` loop).

Courses with `detail.page === true` get wrapped in an `<a>` tag. Courses without it get a `<div>`. This is correct behavior. However, the card structure duplicates a significant block of markup (image, title, description, instructor/status footer) — ~12 lines repeated in both branches with only the outer element changing.

**Fix**: This is a good candidate for a card component extraction once `CardGrid.svelte` is built. The pattern matches the proposed `CardGrid` spec exactly (type/authors/title/description).

### 2. Academy Scholars Section: `.width80`

**Location**: Line 97.

```svelte
<div class="box width80">
```

The `width80` class collapses to `width: 100%` on mobile (≤1024px) per `_sizing.sass`. On desktop this constrains the team listing to 80%. This is a deliberate design choice but worth noting it's the only listing section on the site that doesn't use the full-width grid pattern.

### 3. Image Alt Text

**Location**: Lines 107 (scholar images).

```svelte
<img class="fitted" src={item.photo} alt={item.name} />
```

✅ Good — uses the scholar's name as alt text.

**Location**: Lines 68 and 78 (course card images).

```svelte
<img class="fitted landscape" src={detail.image ?? '/images/key-academy.webp'} alt={detail.title} />
```

✅ Good — uses course title as alt text.

### 4. Parallax Hero Pattern

Uses `Parallax` with `wipe={true}` — consistent with Research, Big Questions, Aryavarta, Wiki home pages. ✅

## Observations

### 5. JSON-LD

**Location**: Script section.

No JSON-LD is set on this page (no `jsonld` variable passed to `Head`). Compare with:
- About page ✅ — uses `webPageJsonLd` with `AboutPage` type
- Research page ✅ — uses `webPageJsonLd`
- Big Questions page ✅ — uses `collectionPageJsonLd`

This is a minor SEO gap. The Academy page could benefit from at minimum a `webPageJsonLd` with `type: 'EducationalOccupationalProgram'` or simply `CollectionPage`.

### 6. Course Card Footer Pattern

**Location**: Lines 88 and 99.

```svelte
<p class="txt-sm tt-u w500 grey3 bordertop px16 lg:px32 py16 self-bottom">
  {detail.instructor} | {detail.status}
</p>
```

Uses `.grey3` for the footer text. In the design system, `.grey3` is the highest-contrast grey (#474747 light / #CCD1D5 dark). Other pages use `.grey1` or `.grey2` for secondary text — consider whether this should be consistent.

### 7. Animation Wrapper Choice

The team section uses `Blur` while most other listing sections use `Slide`. This is a deliberate stylistic difference — the team cards blur in rather than sliding. Worth noting for the animation spec.

### 8. `useInView` import

**Location**: Line 7.

```ts
import { useInView } from '$lib/svelteanim/utils/useInView.svelte';
```

This imported utility is used for `isVisible` and `revealVis` state variables, but neither of these is actually referenced in the template. The `reference` and `revealref` bindings exist but are unused in the rendered output. This is dead code — the variables were likely used during development and never cleaned up.

## Positive

- ✅ Correct page shell: Head → Parallax → Container → Crumb → sections
- ✅ Consistent section pattern: `wrapper-std.growingline` + `<Title>` + animated grid
- ✅ All class names validate against the design system
- ✅ No legacy Svelte patterns (no `$:`, no `export let`)
- ✅ Correct responsive grid usage
- ✅ Alt text on all images
- ✅ Page-level SASS is minimal, relying on design system classes

## Recommendations

1. **Add JSON-LD** — at minimum `webPageJsonLd` for SEO
2. **Clean up unused code** — remove `isVisible`, `revealVis`, `reference`, `revealref`, and the `useInView` import if they're truly unused
3. **Standardize card component** — once `CardGrid` is built, refactor the course card loops to use it
4. **Document `.width80`** — this section-level width constraint is unique on the site; consider making it a deliberate token or using `wrapper-std.tight-stack` instead
