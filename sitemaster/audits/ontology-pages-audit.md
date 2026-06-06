# Ontology Pages Audit

Routes:
- `src/routes/ontology/+page.svelte`
- `src/routes/ontology/[varga]/+page.svelte`

Date: 2026-06-06

## Summary

The ontology section uses the `docgrid` layout for the detail page. The index page is WIP. Both are generally clean.

---

## `ontology/+page.svelte`

### Observations

#### 1. WIP Status

The page displays "Work in progress, incomplete page." despite having a complete grid of varga cards. The cards are functional and link to the correct detail pages. This message may be outdated.

#### 2. Varga Cards — Non-clickable

**Location**: Lines 44–53.

```svelte
{#each data.ontology as item (item.varga.id)}
  <div class="blank box rgap16 b-main std-pad cut-item">
    <p class="txt-xl w600 a-hover">{item.varga.title}</p>
    <p class="grey1">{item.varga.description}</p>
    <p class="txt-xs tt-u w500 theme-dark">{item.content.length} nodes</p>
  </div>
{/each}
```

Uses `<div>` instead of `<a>`, so the cards are not clickable. The detail pages exist at `/ontology/{varga.slug}` but users can't navigate to them from the index. Compare with the concepts index which links each card to its detail page.

**Fix**: Wrap each card in an `<a>` tag pointing to `/ontology/{item.varga.slug}`.

#### 3. Unused `totalNodes`

**Location**: Line 13.

```ts
const totalNodes = $derived(data.ontology.reduce((total, item) => total + item.content.length, 0));
```

`totalNodes` is computed but never used in the template. Dead code.

### Positive

- ✅ Standard page shell: Head → Container → Crumb → sections
- ✅ JSON-LD with collection schema
- ✅ No legacy Svelte patterns

---

## `ontology/[varga]/+page.svelte`

### Observations

#### 1. Node Cards — Unique Pattern

**Location**: Lines 40–57.

```svelte
<a class="blank box whitestone node-card b-main p16 lg:p24 radius rgap8" href={item.href}>
  <p class="tag-pill tt-u themed hollow dead">{item.node.type.replaceAll('-', ' ')}</p>
  <p class="paragraph-text w600 a-hover tight">{item.node.title}</p>
  <p class="citation blue tight"># {item.classification.reason}</p>
  ...
</a>
```

Uses `.tag-pill`, `.paragraph-text`, `.citation`, `.blue` classes. The `.blue` class is not in the design system (colors are `theme`, `grey0-3`, etc.). `.blue` may be defined globally but is not documented in `_tokens.sass`.

**Fix**: Replace `.blue` with `.theme` for consistency with the design system.

#### 2. `docgrid.scrollside` Layout

**Location**: Line 37.

```svelte
<section class="docgrid scrollside">
```

Uses a `.scrollside` variant of `docgrid`. This is defined in `_document-layout.sass` as:
```sass
&.scrollside
  .docside
    position: sticky
    top: 80px
    height: calc(100vh - 80px)
    overflow-y: scroll
```

✅ Correct use of the design system variant for a scrollable sidebar.

#### 3. Concept Badges in Crumb

**Location**: Lines 46–52.

```svelte
<Crumb ...>
  {#if data.ontology.concepts && data.ontology.concepts.length > 0}
    <div class="row wrap cgap4 rgap4">
      {#each data.ontology.concepts as concept (concept.id)}
        <a class="small-button" href={`/concepts/${concept.slug}`}>{concept.title}</a>
      {/each}
    </div>
  {/if}
</Crumb>
```

✅ Uses Crumb children slot for related links. Consistent pattern.

### Positive

- ✅ `docgrid.scrollside` layout with sidebar navigation
- ✅ JSON-LD with collection schema
- ✅ Sidebar with active state on current varga
- ✅ Clean card grid for ontology nodes

## Recommendations

1. **Make varga cards clickable** on ontology index — link to detail pages
2. **Remove unused `totalNodes`** computation
3. **Consider removing "WIP" label** — the page is functional
4. **Replace `.blue` with `.theme`** on `[varga]` node cards
