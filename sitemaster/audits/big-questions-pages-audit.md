# Big Questions Pages Audit

Routes:
- `src/routes/big-questions/+page.svelte`
- `src/routes/big-questions/[item]/+page.svelte`

Date: 2026-06-06

## Summary

Both pages are well-structured and follow the design system closely. No critical bugs. The list page uses the standard landing page pattern, the detail page uses a custom three-column layout (`triple-grid`).

---

## `big-questions/+page.svelte`

### Design System Compliance

#### 1. Parallax Hero

Uses `<Parallax imageLink="/images/key-bigquestions.webp" wipe={true} />` — consistent with Academy, Research, and Aryavarta landing pages. ✅

#### 2. Intro Section — Two-Column Text

**Location**: Lines 78–101.

```svelte
<div class="grid grid-cols-1 lg:grid-cols-2 rgap16 cgap64">
```

Follows the standard intro section pattern. ✅

#### 3. 2026 Big Question Feature Card

**Location**: Lines 108–131.

The "Big Question 2026" section is a custom two-column layout with:
- Left column: title, description, CTA, sponsor info
- Right column: hero image

Not an inline card pattern — this is a one-off feature block. Uses animation via `Blur` (not `Slide` like other sections). This is a deliberate design choice to highlight the current year's question.

#### 4. All Big Questions Grid

**Location**: Lines 133–147.

Uses a card grid with images:
```svelte
<a class="box whitestone question-holder b-main" href={item.linkpath}>
  <div class="p8"><img class="question-image fitted landscape" ... /></div>
  <div class="box rgap16 std-pad">
    <p class="txt-2xl ... w600 lh12 a-hover">{item.meta.title}</p>
    <p class="grey2 txt-lg lh14">{item.meta.description}</p>
  </div>
</a>
```

Another instance of the inline card pattern. Matches the generic `CardGrid` proposal.

### Observations

#### 5. Unused State Variables

**Location**: Lines 29–30.

```ts
let ref = $state<HTMLElement | null>(null);
let ref2 = $state<HTMLElement | null>(null);
let vis = useInView(() => ref, { threshold: 0.5, once: true });
let vis2 = useInView(() => ref2, { threshold: 0.9, once: true });
```

`ref`, `ref2`, `vis`, `vis2` are declared but never used in the template or elsewhere. Dead code.

#### 6. Sponsor Image: Custom Class

**Location**: Line 130.

```svelte
<img class="shri-hari-kiran-vadlamani" src="/images/shri-hari-kiran-vadlamani.webp" ... />
```

Uses a custom class defined in the page-level `<style>` block (104px circle). This is another instance of the avatar pattern seen in About (120px), blog writers (64px). Should be standardized once an avatar primitive exists.

#### 7. Image Saturation Filter

**Location**: Lines 210–216 (page styles).

```sass
.question-holder
  .question-image
    filter: saturate(1%)
    transition: all 280ms ease-in
  &:hover
    .question-image
      filter: saturate(100%)
```

Cards start nearly desaturated and colorize on hover. This is a unique visual treatment not seen elsewhere on the site. Not a bug — but worth documenting as a deliberate pattern if reused.

### Positive

- ✅ Standard page shell with Parallax → Container → Crumb → sections
- ✅ JSON-LD with collection schema
- ✅ All animation wrappers used correctly
- ✅ All images have alt text
- ✅ No legacy Svelte patterns

---

## `big-questions/[item]/+page.svelte`

### Design System Observations

#### 1. Triple Grid Layout (Document Layout)

**Location**: Lines 87–119.

```svelte
<div class="triple-grid">
  <div class="triple-left">...</div>
  <div class="triple-mid">...</div>
  <div class="triple-right">...</div>
</div>
```

A custom three-column layout defined in page-level SASS:
```sass
.triple-grid
  @media (min-width: 1025px)
    grid-template-columns: 400px 1fr
    grid-template-areas: "triple-left triple-mid"
```

The `.triple-right` section is positioned inside `.triple-mid` on the template (line 103):
```svelte
<div class="triple-mid">
  <div class="doctext classic-document"><data.content /></div>
  <div class="triple-right">...</div>
</div>
```

So the right column is actually a sub-section of the middle column, not a true third column. On mobile, all three stack: `.triple-left` has a `border-top`, `.triple-mid` comes first, `.triple-left` follows.

**Observation**: This is a unique layout not used elsewhere. The design system's `doc-header-grid` or `docgrid` could potentially replace it, but the triple-panel structure (left nav, middle content, right related) is distinctive enough to keep as-is.

#### 2. Left Navigation — Question Links

**Location**: Lines 91–100.

```svelte
<nav class="box rgap16">
  {#each data.questions as item (item.linkpath)}
    {#if item.meta.title !== data.title}
      <a class="box doclink" href={item.linkpath}>
        <p class="w600 a-hover">{item.meta.title}</p>
        <p class="txt-sm grey1">{item.meta.description}</p>
      </a>
    {/if}
  {/each}
</nav>
```

Uses `.doclink` class from `_document-layout.sass`. This is the only other page besides the library/document pages that uses the `.doclink` class. ✅ Good cross-reference.

#### 3. Related Items Grid (Also See)

**Location**: Lines 104–117.

```svelte
<div class="grid grid-cols-1 lg:grid-cols-2 gap16">
  {#each data.matrixItems as item}
    <a class="rgap8 box tight-pad slide-item b-main h-paper-1 whitestone" href={item.linkpath}>
```

Another instance of the inline card pattern. Uses `.h-paper-1` (shadow on hover) instead of `.paper-1` (shadow that disappears on hover). This is inverted from the wiki domain item cards — worth noting for CardGrid extraction.

#### 4. Image Alt Text

**Location**: Line 39.

```svelte
<Parallax imageLink={data.icon} alt={data.title} />
```

✅ Parallax has alt text.

#### 5. Section Grid: `.doclink` + Slide Animation

**Location**: Line 89.

```svelve
<Slide targetSelector=".doclink">
```

Note: `targetSelector` is `.doclink`, but `.doclink` is also a SASS class for link styling. The animation wrapper selects by CSS class — so the animation targets the same elements that get the doclink styling. This works but could cause confusion if `.doclink` class naming changes.

### Positive

- ✅ Standard page shell with Parallax → Container → Crumb → sections
- ✅ JSON-LD with article schema
- ✅ `classic-document` class for long-form content
- ✅ Uses `.sticky` positioning for left navigation
- ✅ No legacy Svelte patterns
- ✅ Minimal page-level SASS

### Recommendations

1. **Remove unused state variables** on `big-questions/+page.svelte` (`ref`, `ref2`, `vis`, `vis2`)
2. **Standardize card grids** across both pages when `CardGrid` is built
3. **Add avatar primitive** — the sponsor photo (104px circle) is a third avatar variant
