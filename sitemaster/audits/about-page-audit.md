# About Page Audit

Page: `src/routes/about/+page.svelte`
Date: 2026-06-06

## Summary

The About page is structurally sound and uses the page shell pattern correctly (Head → Parallax → Container → Crumb → sections). It contains three bugs and several opportunities for design system compliance.

## Critical Issues

### 1. CSS Class Typo: `.ttxt-2xl`

**Location**: Lines 130, 137, 143, 150, 157, 164, 171 — all 8 cards in the "Our Work" section.

```svelte
<p class="ttxt-2xl lg:txt-3xl w600 a-hover ls002m">Research</p>
```

`ttxt-2xl` is not a valid class. The design system defines `txt-2xl`. This class does nothing and the text falls back to default body size.

**Fix**: Replace `ttxt-2xl` with `txt-2xl` in all 8 occurrences.

### 2. CSS Class Typo: `.fitted-landscape`

**Location**: Line 170, the designBodha card.

```svelte
<img class="fitted-landscape" src="..." alt="designbodha"/>
```

`.fitted-landscape` is not a valid class. The design system uses `.fitted.landscape` (two separate classes on the same element).

**Fix**: Change `class="fitted-landscape"` to `class="fitted landscape"`.

### 3. Broken Image Path

**Location**: Line 170 (same designBodha card).

```svelte
<img class="fitted-landscape" src="images/heroes/key-designbodha.webp" .../>
```

The image path is relative (`images/...`) instead of absolute (`/images/...`). All other images on this page use absolute paths. This image will not load on most routes.

**Fix**: Change `src="images/heroes/key-designbodha.webp"` to `src="/images/heroes/key-designbodha.webp"`.

## Design System Compliance Issues

### 4. Undefined Classes: `.link-one` and `.link-two`

**Location**: Lines 39–40.

```svelte
<a class="link-one highlight-text themed" href="...">Meaning Behind Our Logo →</a>
<a class="link-two highlight-text themed" href="...">Pyramid of Priorities →</a>
```

Classes `.link-one` and `.link-two` are not defined anywhere in the design system or local `<style>` block. They apply no styling. The design system provides `.hollow-link` for this pattern (link with arrow hover).

**Fix**: Replace with `.hollow-link` class, or if distinct styling is intended, define the classes in the page-level `<style>` block.

### 5. Missing Design System Gap: Avatar Pattern

**Location**: Lines 188–194 (team member images) and the `member-image` class.

```sass
.member-image img
  width: 120px
  height: 120px
  border-radius: 50%
  object-fit: cover
  ...
```

The design system has no avatar primitive. This pattern (team/author photos in a circle) is also used in:
- `blog/writers/+page.svelte` (`.avatar` class, 64px)
- `blog/writers/[writer]/+page.svelte` (likely similar)
- `big-questions/+page.svelte` (104px circle)

Three different sizes, three different implementations. Should be standardized as a design system primitive (e.g., `.avatar-{sm,md,lg}` or an `Avatar` component).

### 6. Custom Section Without Standard Pattern

**Location**: Lines 45–82 (the "Our Mandate" section).

This section:
- Uses a custom heading `<h3 class="txt-xl w400 grey1">` instead of the `Title` component
- Has no `growingline` animation
- Is wrapped in `wrapper-std` but without `growingline`

Compare with the "Our Work" and "The Team" sections below it, which both use `wrapper-std.growingline` + `<Title>`. This inconsistency means the mandate section doesn't participate in the page's scroll-animated line pattern.

**Fix**: Either:
- Promote this to use `<Title text="Our Mandate" />` + `.wrapper-std.growingline` (if it should match the other sections), or
- Accept it as a deliberate exception (it has a unique visual treatment with the `Cut` animation)

## Minor Issues

### 7. Inconsistent Card Grid Column Counts

| Section | Columns |
|---|---|
| "Our Mandate" | `1 md:3 lg:3` |
| "Our Work" | `1 md:2 lg:4` |
| "The Team" | `1 md:2 lg:3` |

Each has a reasonable justification (mandate has 3 items, work has 8 items, team is variable), but the spec should codify these as named grid tiers rather than ad-hoc choices.

### 8. Inline SVG Icons

**Location**: Lines 68, 72, 77.

The mandate section uses `Policy`, `Concern`, and `Aware` Svelte icon components. These are passed a `color` prop. This works but differs from how icons are used elsewhere (e.g., the academy course page uses icon components without color props, relying on CSS). Minor inconsistency.

## Good Practices (Positive)

- ✅ Correctly uses `Head`, `Container`, `Crumb`, `Parallax`, `Title` components
- ✅ Sections follow `wrapper-std.growingline` + `<Title>` + animated grid pattern
- ✅ Uses design system spacing classes (`rgap16`, `gap16`, `p16`, `std-pad`, etc.)
- ✅ Uses design system typography classes correctly overall
- ✅ JSON-LD structured data present for AboutPage type
- ✅ No deprecated legacy Svelte patterns (no `$:`, no `export let`)

## Recommendations

1. **Fix critical bugs** — typos and broken image path (items 1–3)
2. **Extract avatar primitive** — as a design system addition for team/author photos
3. **Standardize mandate section** — decide whether it joins the `growingline` pattern or stays as a deliberate exception
4. **Replace `.link-one`/`.link-two`** with `.hollow-link` or define the classes
