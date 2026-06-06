# Home Page Audit

Page: `src/routes/+page.svelte`
Date: 2026-06-06

## Summary

The home page is the most visually rich page on the site (276 lines). It follows the standard landing page pattern with Parallax hero, intro, verticals, latest items, blog grid, publications, and knowledge base sections. Well-structured overall.

## Design System Observations

### 1. `StackingWords` Import with Partial ComponentProps

**Location**: Line 33.

```ts
import type { ComponentProps } from 'svelte';

type Props = Partial<ComponentProps<typeof StackingWords>>;
```

`Props` extends `StackingWords` props but none of its specific props are used — the page only passes `data` which is typed via `PageData`. This typing is overly generic and unused. `StackingWords` works without it.

### 2. Parallax Hero — Full Width Variant

**Location**: Line 40.

```svelte
<Parallax imageLink="/images/heroimage2.webp" isClass="is100" />
```

Uses `isClass="is100"` to make the hero full viewport height. Other pages use the half-height `Parallax` (parallaxhalf.svelte) variant. ✅ Valid.

### 3. Verticals Section — Unique Card Treatment

**Location**: Lines 72–85.

```svelte
<a class="box blank verticals radius4 overflow-hidden paper-1" href={item.href}>
  <div class="overflow-hidden"><img class="fitted sm:herocard md:port" ... /></div>
  <div class="box rgap16 ptop24 pbot32 px16 lg:px24">
    <h2 class="txt-3xl lg:txt-4xl ...">{item.title}</h2>
    <p class="txt-lg grey1 lh14">{item.desc}</p>
  </div>
</a>
```

Uses `.paper-1` class (shadow that disappears on hover) with `overflow-hidden`. Unique hover effect with `::after` pseudo-element (defined in page-level SASS). This card pattern is unique to the home page.

### 4. Blog Card Pattern — Inline

**Location**: Lines 110–138.

The blog listing renders inline cards with image + title + excerpt + author + tags + date. This duplicates the blog card pattern that `blog-card.svelte` provides. However, the home page variant includes reading time, tags as links, and a different author layout — it's different enough from `blog-card.svelte` that using it would require modification.

### 5. Publications Section — Custom Layout

**Location**: Lines 140–156.

Uses a custom `grid grid-cols-1 lg:grid-cols-2` with `.books` class for image+text side-by-side on desktop. This layout is defined in page-level SASS. ✅ Unique pattern, not duplicated elsewhere.

### 6. Patron Sections (Footer CTAs)

**Location**: Lines 161–183.

A full-width dark gradient section (`linear-gradient(to right, #004e92, #000428)`) with three CTA cards (Newsletter, Aryavarta, Subscribe). This is the only dark-themed section on the site. The gradient uses hardcoded colors instead of design system variables.

**Fix**: Consider adding a `--gradient-footer` token to the design system if this pattern is reused.

### 7. Image Ratios on Verticals

**Location**: Line 75.

```svelte
<img class="fitted sm:herocard md:port" ... />
```

Uses `sm:herocard` (3/2 ratio on mobile) and `md:port` (3/4 ratio on tablet+). This is a creative use of responsive image ratio classes. ✅ Clever.

### 8. Unused Data Destructuring

**Location**: Lines 35–39.

```ts
let blogs = $derived(data.blogs ?? []);
let vids = $derived(data.vids ?? []);
let latestItems = $derived(data.latestItems ?? []);
let wikiItems = $derived(data.wikiOpeners ?? []);
```

All used in the template. ✅ No dead code.

### 9. `WaterRipple` Not on Home Page

The WaterRipple effect is only on blog posts, not the home page. ✅ Correct.

## Positive

- ✅ Rich, well-structured landing page
- ✅ Good use of animation wrappers (Slide, Reveal, Cut, StackingWords)
- ✅ JSON-LD with organization + website schema
- ✅ All images have alt text
- ✅ No legacy Svelte patterns
- ✅ All sections follow the pattern: .wrapper-std > Title > animated grid

## Recommendations

1. **No critical issues** — the home page is well-maintained and follows design system patterns appropriately for a landing page
2. **Consider extracting footer gradient** as a design system token if reused elsewhere
