# Anveshi Page Audit

Page: `src/routes/anveshi/+page.svelte`
Date: 2026-06-06

## Summary

The Anveshi landing page is the most visually distinctive page on the site, with a custom parallax screener, marquee testimonials, swiper carousels, and region filter system. It deviates significantly from the standard page shell due to its unique hero treatment. Some bugs and several design system gaps.

## Critical Issues

### 1. Undefined Svelte Component: `Lightbox` and `LightboxGallery` from `svelte-lightbox`

**Location**: Line 19 (import) and lines 361, 375 (usage in past chapters).

```ts
import { Lightbox, LightboxGallery, GalleryImage, GalleryThumbnail } from 'svelte-lightbox';
```

The imports `LightboxGallery`, `GalleryImage`, and `GalleryThumbnail` are imported but never used in the template. Only `Lightbox` is used. This is dead import overhead but not a bug.

However, `Lightbox` is used to wrap `<img>` tags directly:
```svelte
<Lightbox><img class="fitted herocard" src={item.gallery} alt={item.chapter} /></Lightbox>
```

`Lightbox` from `svelte-lightbox` typically expects children that are images it can trigger on click. This usage pattern is likely correct but unusual — most implementations wrap the image in a trigger element. If it works, fine. If the lightbox doesn't trigger on click, this is the cause.

**Fix**: Verify `svelte-lightbox` works with bare `<img>` children and remove unused imports.

### 2. Duplicate Slide Markup in Testimonials Section

**Location**: Lines 230–260.

The testimonials are rendered in two `<Mark>` (marquee) components — one forward, one reverse. Both render the same content:

```svelte
{#each testis as item}
  <div class="testimonial box rgap8 std-pad b-main">...</div>
{/each}
```

The reverse marquee attempts to filter with `{#if i > 3}` but this means testimonials 0–3 appear in the first marquee AND testimonials 4+ appear in the second. This creates an asymmetric display where some testimonials appear once and others twice. This may be intentional (the marquee is seamless only if content repeats), but the overlap pattern is unclear.

## Design System Observations

### 3. Custom Screener Instead of Parallax Hero

**Location**: Lines 60–76.

This page uses a custom `.screener-wrap` + `.screener` with `background-image` and inline `translateY` transform instead of the `Parallax` component used by other landing pages (Academy, Research, Big Questions, etc.).

The custom implementation:
```sass
.screener
  background-image: url('/images/key-anveshi.webp')
  background-position: center center
  background-size: cover
  .inscreen
    background: rgba(0,0,0,0.7)
  // parallax via style:transform={`translateY(${screenerY}px)`}
  // screenerY = sY / 2
```

This works but duplicates the parallax hero pattern. Compare with other pages which use `<Parallax imageLink="..." wipe={true} />`. The Anveshi version has a darker overlay (`rgba(0,0,0,0.7)`) and a more dramatic parallax speed (scrollY/2 vs. the component's default).

**Fix**: Not necessarily a bug — the Anveshi hero is intentionally darker and more dramatic. But it should be documented as a deliberate variant.

### 4. Region Filter: Hardcoded Region Buttons + Toggle State

**Location**: Lines 269–325.

The region filter uses a hardcoded array of 8 buttons (All, North, East, West, South, Centre, Himalayas, International) with a corresponding `isRegion` boolean array and `region` string state. The toggle logic (`toggleRegion`) forces at most one region to be active at a time (radio-button behavior).

This is the only filter of its kind on the site. The wiki tags filter uses a different approach (multi-select with `selectedTags` array). If filters are ever standardized, this pattern should be considered.

### 5. `w650` Font Weight

**Location**: Lines 341, 355.

```svelte
<p class="txt-xl w650 tt-c">{item.chapter}</p>
```

`w650` generates `font-weight: 650`. The design system's `$font-weights` map includes 650, so this is valid. However, 650 is an unusual weight — most pages use 400, 500, 600, or 700. This is a deliberate stylistic choice for chapter names in the future/past chapter cards.

### 6. Custom Anveshi Color Classes Defined Inline vs. Design System

The design system defines `--color-anveshi` (#D3633A) and `--color-anveshi-alt` (#9F401D), with utility classes `.anveshi-o` (color) and `.primary.anveshi` (button). However, this page defines additional variations:

- `.anv-orange` — `color: var(--color-anveshi)` — duplicates `.anveshi-o`
- `.hollow-link.anveshi` — anveshi-colored hollow link (used in future/past chapters)
- `.anveshi-pill` — anveshi-colored pill badge (used on chapter page, not this page)

**Recommendation**: Standardize Anveshi color variants in the design system rather than per-page styles.

### 7. Unused State Variables

**Location**: Line 43.

```ts
let sY = $state(0);
let iW = $state(0);
```

`sY` is used (for parallax and `goTime`). `iW` is bound via `<svelte:window bind:innerWidth={iW}>` but never referenced in the template. Dead state.

### 8. Region Filter Theme Classes

**Location**: Lines 272+ (region filter buttons).

The region filter uses `.selection-button` which has a specific desktop style (box-shadow, uppercase, padding). On mobile, these collapse via `.responsive-menu__items .selection-button` to remove the shadows. This works but the region filter is the only instance where `selection-button` is used inside `ResponsiveMenu` with a specific active toggle — in other pages, `selection-button` is used standalone or with `Menudrop`.

## Positive

- ✅ Rich JSON-LD with `TouristTrip` schema — best structured data on the site
- ✅ Uses `Title` component with `anveshi={true}` prop for theme-colored headings
- ✅ Carousels use the shared `Swipes` component consistently
- ✅ Marquee testimonials are a unique and engaging pattern
- ✅ All images have alt text
- ✅ No legacy Svelte patterns

## Recommendations

1. **Remove unused imports** — `LightboxGallery`, `GalleryImage`, `GalleryThumbnail`, and `iW`
2. **Standardize Anveshi color variants** — extract `.anv-orange` and `.hollow-link.anveshi` into the design system
3. **Document parallax variant** — note that Anveshi uses a custom screener instead of `Parallax` component
4. **Consider extraction** — the region filter + swiper combination is complex and could be its own component if reused elsewhere
