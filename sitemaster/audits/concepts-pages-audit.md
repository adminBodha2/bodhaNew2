# Concepts Pages Audit

Routes:
- `src/routes/concepts/+layout.svelte`
- `src/routes/concepts/+page.svelte`
- `src/routes/concepts/[slug]/+page.svelte`

Date: 2026-06-06

## Summary

The concepts section is well-structured and follows the design system closely. The layout file is minimal (just renders children). The index and detail pages are clean.

---

## `concepts/+layout.svelte`

```svelte
<script lang="ts">
  import type { LayoutProps } from './$types';
  let { children }: LayoutProps = $props();
</script>

{@render children?.()}
```

✅ Minimal, correct Svelte 5 layout using `{@render children?.()}`.

---

## `concepts/+page.svelte`

### Design System Compliance

#### 1. Card Grid — Domain Listing

**Location**: Lines 29–44.

```svelte
<a class="box rgap16 blank b-main std-pad whitestone slide-item" href="/concepts/{domain.slug}">
  <p class="txt-00 w500 tt-u grey1">{domain.count} connections</p>
  <p class="txt-xl w600 a-hover">{domain.title}</p>
  <p class="grey1">{domain.description}</p>
  <div class="row wrap">
    {#each domain.tags as tag}<p class="txt-xs w500 tt-u theme-dark">{tag.replaceAll('-', ' ')}</p>{/each}
  </div>
</a>
```

Another instance of the inline card pattern. Matches the `CardGrid` proposal.

#### 2. JSON-LD

Uses `collectionPageJsonLd` with domain items. ✅ Correct.

#### 3. Breaks From Standard Landing Pattern

Concepts/+page does NOT use `Parallax` or a hero image. It goes directly into `Container` + `Crumb` + grid. This is a deliberate choice — the concepts index is positioned as a directory page rather than a landing page.

✅ Acceptable deviation.

### Positive

- ✅ Standard page shell: Head → Container → Crumb → sections
- ✅ JSON-LD with collection schema
- ✅ All images handled via default meta image
- ✅ No legacy Svelte patterns
- ✅ No page-level SASS (no `<style>` block)

---

## `concepts/[slug]/+page.svelte`

### Design System Issues

#### 1. Custom Tab System (`isItem` Toggle)

**Location**: Lines 28–30, 72–99.

```ts
let isItem = $state(0);
function toggleIsItem(newIndex: number) {
  isItem = newIndex;
}
```

This is the third distinct tab implementation:
- Wiki domain: `selection-button` buttons with `activeTab` state
- Academy course: `Menudrop` wrapper + `selection-button` + `active` state
- Concepts slug: custom `toggleIsItem` with manual `{#if i === isItem}`

Unlike the other two, this one has **no visual tab bar** in the template — `toggleIsItem` is declared but never called from any button in the rendered output. The tab switching is effectively unused unless triggered programmatically.

**Severity**: Medium — the tab state exists but there's no visible UI to change it. The page always shows the first group of items.

#### 2. Non-functional Tab Toggle

**Location**: Line 72.

```svelte
{#each groups as group, i (group.label)}
  {#if i === isItem}
    <div class="grid grid-cols-1 lg:grid-cols-3 gap16" id="node-grid">
```

Since `isItem` is initialized to 0 and never changed (no `toggleIsItem` call in the template), only the first group (Essays) is ever displayed. If there are other groups with content (Books, Big Questions, etc.), they are never visible.

**Fix**: Either:
- Add a tab/filter UI so users can switch groups, or
- Remove the tab logic and show all groups as separate sections (like the wiki domain page), or
- Remove the dead tab code entirely.

#### 3. Domain Navigation Links (Sidebar)

**Location**: Lines 62–67.

```svelte
<aside class="box" aria-label="Card metadata">
  <nav class="box rgap16 ptop32 stickybox">
    {#each data.domains as domain (domain.id)}
      <a class="doclink blank box rgap4 p12 linkonhover" href={`/concepts/${domain.slug}`}>
        {domain.title}
      </a>
    {/each}
  </nav>
</aside>
```

Uses `doc-header-grid` from the design system correctly with sticky sidebar. ✅

#### 4. Card Grid — Node Items

**Location**: Lines 73–90.

```svelte
<a class="blank box rgap8 tight-pad b-main whitestone slide-item" href={item.href} ...>
  <p class="txt-00 tt-u w500 grey1">{item.type}</p>
  <p class="txt-lg w600 a-hover">{item.title}</p>
  {#if item.description}
    <p class="grey1">{item.description}</p>
  {/if}
  ...
</a>
```

Matching inline card pattern from wiki domain items. ✅ `CardGrid` candidate.

### Positive

- ✅ Standard page shell: Head → Container → Crumb → sections
- ✅ `doc-header-grid` sidebar+main layout used correctly
- ✅ JSON-LD with collection schema and related nodes
- ✅ `.stickybox` for sidebar scroll
- ✅ No legacy Svelte patterns
- ✅ Minimal page-level SASS (none)

## Recommendations

1. **Fix the non-functional tab system** on `concepts/[slug]` — either add a tab UI, show all groups as distinct sections, or remove the dead code
2. **Extract card grids to `CardGrid`** when built
