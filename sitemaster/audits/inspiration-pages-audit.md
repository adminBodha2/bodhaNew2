# Inspiration Pages Audit

Routes:
- `src/routes/inspiration/+page.svelte`
- `src/routes/inspiration/[item]/+page.svelte`

Date: 2026-06-06

## Summary

The inspiration pages showcase thinkers and schools of thought. Both pages are well-structured with minimal issues.

---

## `inspiration/+page.svelte`

### Design System Issues

#### 1. Unused `useInView` State and Refs

**Location**: Lines 18–22.

```ts
let ref = $state<HTMLElement | null>(null);
let visref = useInView(() => ref, { threshold: 0.6, once: true });
let ref2 = $state<HTMLElement | null>(null);
let ref3 = $state<HTMLElement | null>(null);
let visref2 = useInView(() => ref2, { threshold: 0.6, once: true });
let visref3 = useInView(() => ref3, { threshold: 0.6, once: true });
```

`ref2`, `visref2`, `ref3`, `visref3` are never used in the template or anywhere else. `ref` is used via `bind:this={ref}` on the intro section. `visref` is used as `visible={visref.visible}` on the quote Reveal. But `ref2`, `visref2`, `ref3`, `visref3` are dead code.

**Fix**: Remove `ref2`, `visref2`, `ref3`, `visref3`.

#### 2. Unique Card Pattern: `.inspiration-card`

**Location**: Lines 130–156 (page SASS).

```sass
.inspiration-card
  position: relative
  min-height: 250px
  background: #111
  ...
.card-image
  position: absolute
  inset: 0
  ...
.card-overlay
  position: relative
  z-index: 1
  background: linear-gradient(180deg, ...)
```

This is a visually rich card with background image + gradient overlay + text. It's unique to the inspiration section and doesn't match the generic `CardGrid` proposal (which assumes a simpler card with title/description/tags). This pattern is acceptable as a deliberate variant.

#### 3. Hardcoded `#111` Background

**Location**: Line 133.

```sass
background: #111
```

This hardcoded color won't adapt to the dark theme. Should use `--color-primary` or `--color-grey-4` instead.

**Fix**: Replace `#111` with `var(--color-primary)` or similar CSS variable.

#### 4. `.card-overlay` Gradient — Hardcoded

**Location**: Line 150.

```sass
background: linear-gradient(180deg, rgba(18, 18, 18, 0.02) 28%, rgba(18, 18, 18, 0.9) 100%)
```

Hardcoded `rgba(18, 18, 18, ...)` values won't adapt to dark theme. Should use a combination of CSS variables for the overlay.

### Positive

- ✅ Standard page shell: Parallax → Container → Crumb → sections
- ✅ JSON-LD with collection schema
- ✅ Good use of Blur animation for card grid

---

## `inspiration/[item]/+page.svelte`

### Design System Issues

#### 1. ScrollY State for Unused Parallax?

**Location**: Line 15.

```ts
let sY = $state(0);
```

`sY` is bound via `<svelte:window bind:scrollY={sY}>` but never used in the template. Dead code.

#### 2. Parallax + `docgrid` Pattern

**Location**: Lines 35–38.

```svelte
<Parallax imageLink={metaImage} wipe={true} />
<Container>
  <section class="docgrid">
```

Uses both `Parallax` hero and `docgrid` layout. This is the only page combining both. The parallax sets the hero, then the docgrid provides sidebar+content layout. ✅ Valid.

#### 3. Sidebar with Link Lists

**Location**: Lines 40–57.

```svelte
<nav class="doclist">
  {#if data.schools && data.schools.length > 0}
    <div class="box rgap16">
    {#each data.schools as item}
      <a class="doclink txt-bs sm:txt-lg grey2" href={item.linkpath}>{item.meta.title}</a>
    {/each}
    </div>
  {/if}
  {#if data.thinkers && data.thinkers.length > 0}
    ...similar...
  {/if}
</nav>
```

Uses `docgrid` + `.doclist` + `.doclink` correctly. ✅

#### 4. Custom JSON-LD with `withContext`

**Location**: Lines 20–31.

```ts
withContext(data.type === 'thinker' ? 'Person' : 'CreativeWork', { ... })
```

Uses a utility function `withContext` from the SEO utils. This is the only page using this approach — other pages use `webPageJsonLd`, `articleJsonLd`, etc. This is a valid variant for type-specific schema.

### Positive

- ✅ `docgrid` layout with sidebar navigation
- ✅ Uses `classic-document` for prose
- ✅ Parallax hero with content
- ✅ JSON-LD with Person/CreativeWork schema

## Recommendations

1. **Remove unused state** (`ref2`, `visref2`, `ref3`, `visref3`, `sY`) from both pages
2. **Replace hardcoded colors** in inspiration index card styles with CSS variables for theme support
