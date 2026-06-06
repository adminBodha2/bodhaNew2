# Library Journal Archaeology Issue Page Audit

Page: `src/routes/library/(library-subroutes)/journal-archaeology/[issue]/+page.svelte`
Date: 2026-06-06

## Summary

A content page displaying a journal issue with related articles. Part of the library group pages, sharing the same missing-Container pattern.

## Design System Issues

### 1. Missing `Container` Wrapper

**Location**: Content starts directly with `<section class="box rgap32">`. Same as other library pages. No standard page padding.

### 2. Un-typed Props

**Location**: Line 7.

```ts
let { data } = $props();
```

No `PageData` typing.

### 3. Missing `Container` Import is Unused

`Container` is imported (line 3) but never used — the content doesn't wrap in it. Dead import.

### 4. Inline Card Pattern

```svelte
<div class="grid grid-cols-1 lg:grid-cols-3 related-articles gap16">
  {#each data.relatedArticles as item}
    <div class="box whitestone std-pad b-main">
```

✅ `CardGrid` candidate. Note: the outer wrapper is a `<div>` not `<a>` — cards are not linked individually (the link is inside each card as "SEE JOURNAL→").

### 5. `classic-document` for Prose

**Location**: Line 17.

```svelte
<div class="doctext classic-document ptop32 pbot16">
  <data.content />
</div>
```

✅ Uses `classic-document` for issue content.

### 6. JSON-LD

**Location**: Not present on this page (no `Head` or `jsonld` variable visible). The page has `Head` imported and used via callback, but no structured data set.

## Recommendations

1. **Wrap in `Container`** — add the missing page wrapper
2. **Add `PageData` typing** to the props
3. **Remove unused `Container` import** if it remains unwrapped (or add the Container)
