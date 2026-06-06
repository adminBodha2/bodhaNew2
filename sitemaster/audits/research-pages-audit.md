# Research Pages Audit

Routes:
- `src/routes/research/+page.svelte`
- `src/routes/research/[item]/+page.svelte`

Date: 2026-06-06

## Summary

The research section consists of a landing page and a detail page. Both are well-structured and follow design system patterns closely.

---

## `research/+page.svelte`

### Design System Compliance

#### 1. Standard Landing Page Pattern

Uses Parallax → Container → Crumb → sections. ✅ Consistent with Academy, Big Questions, Aryavarta.

#### 2. Research Pillars — Custom Card Layout

**Location**: Lines 56–92.

The research areas use a custom `.area-wrapper` layout with image left and content right on desktop (stacked on mobile). This is a unique card pattern not found elsewhere on the site. Acceptable as a deliberate design choice.

#### 3. Unique Hover Effects

**Location**: Lines 98–130 (page SASS).

```sass
.area-wrapper
  img
    filter: saturate(0%)
  &:hover
    img
      filter: saturate(100%)
```

Images are fully desaturated by default and colorize on hover. Similar to the big-question cards but applied differently (image desaturation vs. card image desaturation).

#### 4. `.area-link-dim` Class

**Location**: Lines 50–52.

```svelte
{:else}
  <p class="area-link-dim">{item.label}</p>
{/if}
```

Used for research areas that don't have a linked page yet. Defined in page-level SASS. ✅ Simple and effective.

### Positive

- ✅ Standard page shell with Parallax → Container → Crumb → sections
- ✅ JSON-LD with webPageJsonLd
- ✅ All images have alt text
- ✅ All sections use animation wrappers (Reveal, Slide)
- ✅ No legacy Svelte patterns

---

## `research/[item]/+page.svelte`

### Design System Observations

#### 1. Unused `sY` State

**Location**: Line 18.

```ts
let sY = $state(0);
```

`<svelte:window bind:scrollY={sY} />` is bound but `sY` is never referenced in the template or computed values. Dead code.

#### 2. `docgrid` Layout

**Location**: Lines 35–36.

```svelte
<section class="docgrid">
  <div class="box docside">...</div>
  <div class="docmain rgap32 box pbot32">...</div>
</section>
```

✅ Correct use of `docgrid` with sidebar + main content.

#### 3. Related Items Grid ("Also See")

**Location**: Lines 62–72.

```svelte
<a class="rgap8 box tight-pad slide-item b-main h-paper-1 whitestone" href={item.linkpath}>
```

Inline card pattern. Same as big questions detail page. ✅ `CardGrid` candidate.

#### 4. Crumb Tags

**Location**: Lines 41–48.

```svelte
<Crumb ...>
  {#if data.tags && data.tags.length > 0}
    <div class="row cgap8 rgap4 wrap">
      {#each data.tags as tag}
        <a class="standard-pill" href="/concepts/{tag}">#{tag.replaceAll('-', ' ')}</a>
      {/each}
    </div>
  {/if}
</Crumb>
```

Uses `Crumb` children slot for tag pills. ✅ `TagList` candidate.

### Positive

- ✅ Standard page shell with Parallax → Container → Crumb → sections
- ✅ `docgrid` layout with sidebar + main content
- ✅ JSON-LD with article schema
- ✅ `classic-document` for prose
- ✅ All images have alt text

## Recommendations

1. **Remove unused `sY` state** from `[item]/+page.svelte`
2. **No critical issues** — both pages are well-structured
