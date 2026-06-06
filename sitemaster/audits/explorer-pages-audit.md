# Explorer Pages Audit

Routes:
- `src/routes/explorer/+page.svelte`
- `src/routes/explorer/[id]/+page.svelte`

Date: 2026-06-06

## Summary

The explorer is a one-stop content browser. The index page has a tab system with 7 content groups. The detail page is marked as WIP with commented-out content.

---

## `explorer/+page.svelte`

### Design System Issues

#### 1. Massive Duplicated Card Markup (7 Tabs)

**Location**: Lines 60–137.

This page has **7 nearly identical `{#each}` blocks**, one per tab. Each one renders the same card pattern:

```svelte
<a class="box p16 whitestone blank rgap8 b-main" href={nodeHref(node)}>
  <p class="txt-xl w600 a-hover">{node.title}</p>
  <p class="txt-sm grey2">{node.description}</p>
  {#if node.tags && node.tags.length > 0}
    <div class="row wrap cgap4 self-bottom">
      {#each node.tags as tag}
        <p class="txt-xs tt-u w500 theme">{tag.replaceAll('-',' ')}</p>
      {/each}
    </div>
  {/if}
</a>
```

Differences between tabs:
- `active === 0` (Blog): has tags, uses `nodeHref(node)`
- `active === 1` (Books): has tags, links to `/library`
- `active === 2` (Questions): no tags, uses `nodeHref(node)`
- `active === 3` (Research): no tags, uses `nodeHref(node)`
- `active === 4` (Thinkers): no tags, uses `nodeHref(node)`
- `active === 5` (Schools): no tags, uses `nodeHref(node)`
- `active === 6` (Lab): has tags, uses `nodeHref(node)`

That's ~80 lines of repeated markup. This is the strongest candidate for `CardGrid` extraction on the entire site — it's the same component rendered 7 times with slightly different data shapes.

#### 2. Tab System (4th Implementation on Site)

**Location**: Lines 50–56.

```svelte
<Responsive>
  {#each tabs as tab, i}
    <button class="selection-button" class:active={active === i} onclick={() => (active = i)}>{tab}</button>
  {/each}
</Responsive>
```

This is the **fourth** distinct tab implementation on the site:
1. Wiki domain: `selection-button` + `activeTab` state (no Responsive wrapper)
2. Academy course: `Menudrop` wrapper + selection buttons
3. Concepts slug: `isItem` toggle (non-functional)
4. Explorer: `Responsive` wrapper + `active` index toggle

#### 3. JSON-LD

**Location**: Lines 28–35.

```ts
items: Object.values(data.grouped).flat().map((node) => ({
  name: node.title,
  url: node.slug ? `/${node.slug}` : metaUrl
}))
```

JSON-LD includes all nodes from all groups. ✅ Correct collection schema.

#### 4. Custom `.thisbox` Class

**Location**: Line 143.

```sass
.thisbox
  min-height: 80vh
  align-items: start
  align-content: start
```

The page doesn't use `wrapper-std.min100vh` or any other design system pattern for section height. The `.thisbox` class is defined once per-page. Could be replaced with `min100vh` from the design system.

### Positive

- ✅ Standard page shell: Head → Container → Crumb → sections
- ✅ Uses `Responsive` menu for tab system
- ✅ Good JSON-LD coverage
- ✅ No legacy Svelte patterns

---

## `explorer/[id]/+page.svelte`

### Status: Work in Progress

This page displays "WIP - under construction." and a "← Back to Explorer" link. The entire intended content is commented out in an HTML comment (lines 33–91).

### Design System Issues

#### 1. Unused Import

**Location**: Line 8.

```ts
import Heading from '$lib/comps/page-header-one.svelte';
```

`Heading` is imported but never used in the template. Dead import.

#### 2. Commented-Out Content

The commented-out HTML contains a complete card grid with concepts, vargas, related, and referenced-by sections. When this is uncommented, it will need:
- Proper styling for the `white-grid` concept cards
- Tag display for node tags
- `nodeHref` and `conceptHref` helper functions (already defined)

### Positive

- ✅ Correct page shell with Head, Container, Crumb
- ✅ JSON-LD with WebPage schema
- ✅ All imports ready for when content is uncommented

## Cross-Cutting Recommendations

1. **Extract `CardGrid.svelte`** — the explorer page's 7-tab card markup is the clearest example of duplication that a generic card component would eliminate
2. **Consolidate tab implementations** — this is the 4th distinct tab system on the site
3. **Finalize the explorer detail page** — uncomment or remove the WIP content
4. **Remove unused `Heading` import** from `[id]/+page.svelte`
