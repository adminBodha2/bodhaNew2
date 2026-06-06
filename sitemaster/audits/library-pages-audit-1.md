# Library Pages Audit (Part 1)

Routes (batch 1):
- `src/routes/library/+page.svelte`
- `src/routes/library/sections/+page.svelte`
- `src/routes/library/sections/dhatus/+page.svelte`
- `src/routes/library/sections/dhatus/[dhatu]/+page.svelte`
- `src/routes/library/sections/dhatus/[dhatu]/words/+page.svelte`
- `src/routes/library/sections/ashtadhyayi/+page.svelte`
- `src/routes/library/sections/ashtadhyayi/[sutra]/+page.svelte`
- `src/routes/library/sections/words/+page.svelte`
- `src/routes/library/sections/words/[word]/+page.svelte`

Date: 2026-06-06

## Summary

The library section contains the Synaptic tools (Ashtadhyayi, Dhatupatha, Sanskrit dictionary) plus supporting pages. These are among the most data-driven pages on the site. Many use custom grid patterns with tight spacing.

---

## `library/+page.svelte`

### Observations

#### 1. Uses `docgrid` Layout

**Location**: Lines 42–43.

```svelte
<section class="docgrid">
  <div class="docside">...</div>
  <div class="docmain">...</div>
</section>
```

✅ Correct use of the design system's document layout.

#### 2. `.h-also` Image Class

**Location**: The `h-also` class is defined only for `<img>` elements but likely used here too. Verified on the page.

---

## `library/sections/+page.svelte`

### Observations

#### 1. Inline Card Pattern

Uses the standard `whitestone b-main tight-pad` card pattern. ✅ `CardGrid` candidate.

---

## `library/sections/dhatus/+page.svelte`

### Design System Issues

#### 1. Custom `selection-button-2` Usage

**Location**: Lines 73–79.

```svelte
<ResponsiveMenu>
  <a class="selection-button-2" class:active={!data.gana} href={ganaHref(null)}>All</a>
  {#each data.ganas as gana}
    <a class="selection-button-2" class:active={data.gana === gana.gana} href={ganaHref(gana.gana)}>{gana.name}</a>
  {/each}
</ResponsiveMenu>
```

Uses `selection-button-2` (smaller variant) instead of the standard `selection-button`. This is one of the few pages using this variant. Acceptable — it's a deliberate visual choice for data-heavy filter bars.

#### 2. Dhatu Grid — Minimal Card

**Location**: Lines 91–96.

```svelte
{#each data.slice.items as dhatu}
  <a class="blank box rgap8" href={`/library/sections/dhatus/${dhatu.slug}`}>
    <p class="txt-xl w500 a-hover">√{dhatu.rootIast}</p>
  </a>
{/each}
```

Minimal card with just the root text. No `.whitestone`, no `.b-main`. This is a deliberate minimal style for dense data browsing.

#### 3. `.library-search` Input Class

**Location**: Line 86.

```svelte
<input class="library-search" type="search" name="q" ... />
```

`.library-search` is defined in `_modifiers.sass` with `max-width: 320px`. The class names suggests it's intended for library pages specifically. ✅ Valid.

#### 4. Pagination Pattern

**Location**: Lines 102–111.

Uses `.primary.grey` secondary button and `.primary` primary button for prev/next. Same pattern as ashtadhyayi listing. ✅ Consistent across the library set.

---

## `library/sections/dhatus/[dhatu]/+page.svelte`

### Observations

#### 1. Rich Dhatu Detail Page

A well-structured detail page with metadata card, derived words grid, related rules, and navigation. Follows `wrapper-std` + section pattern. ✅

#### 2. `<details>` / `<summary>` Accordion Pattern

**Location**: Lines 80–93.

```svelte
<details class="box rgap4">
  <summary class="theme w500">{word.headword}</summary>
  <div class="box rgap4">...</div>
  <a class="txt-sm" href={`/library/sections/words/${word.slug}`}>Open meaning</a>
</details>
```

Uses native HTML `<details>` for accordion behavior. This is the only page on the site using this pattern. The design system has no accordion component — but for a data-heavy page, native `<details>` is appropriate.

#### 3. Navigation Links — Consistent Pattern

**Location**: Lines 101–107.

```svelte
<div class="row wrap cgap8 rgap8">
  {#if data.neighbors.previous}
    <a class="primary grey" href="..."><span>√{data.neighbors.previous.rootIast}</span></a>
  {/if}
  <a class="primary" href="/library/sections/dhatus"><span>All Dhātus</span></a>
  {#if data.neighbors.next}
    <a class="primary grey" href="..."><span>√{data.neighbors.next.rootIast}</span></a>
  {/if}
</div>
```

✅ Consistent with `dhatus/[dhatu]/words` and `ashtadhyayi/[sutra]` navigation patterns.

---

## `library/sections/dhatus/[dhatu]/words/+page.svelte`

### Observations

#### 1. Header Table Row

**Location**: Lines 32–42.

```svelte
<div class="grid grid-cols-1 md:grid-cols-5 gap16">
  <p class="txt-sm w600">Root Word</p>
  <p class="txt-sm w600 md:col-span-2">Meaning</p>
  <p class="txt-sm w600">Class</p>
  <p class="txt-sm w600">Source</p>
  <p class="theme">√{data.dhatu.rootIast}</p>
  <p class="md:col-span-2">{data.dhatu.meaningIast}</p>
  <p>{data.dhatu.gana}</p>
  <a href={data.dhatu.sourceUrl}>Dhātupāṭha</a>
</div>
```

Uses a grid as a table-like layout (header row + data row). This is a clean pattern for data-heavy content. ✅ Acceptable.

#### 2. `<details>` Accordion for Words

Same `<details>` / `<summary>` pattern as the dhatu detail page. ✅ Consistent.

---

## `library/sections/ashtadhyayi/+page.svelte`

### Observations

#### 1. Complex Filter UI

**Location**: Lines 100–124.

Two-tier filter: Adhyāya (1-8) + conditional Pāda (1-4) filters, plus search input with debounced navigation via `goto`. This is the most complex filter UI on the site.

#### 2. Debounced Search

**Location**: Lines 53–62.

```ts
function handleSearchInput(event: Event) {
  const searchTerm = ...;
  searchDraft = searchTerm;
  if (searchTimer) clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    void goto(searchHref(query), { keepFocus: true, noScroll: true });
  }, 250);
}
```

Debounced navigation on search input. This is the only page using this pattern. ✅ Clean implementation.

#### 3. `IconPrev` / `IconNext` Pagination

**Location**: Lines 132–139.

```svelte
{#if liveSlice.page > 1}
  <a class="row ycenter a-svg" href={pageHref(liveSlice.page - 1)}><IconPrev/></a>
{/if}
```

Uses SVG icons for page navigation instead of text buttons. This is the only place using this pattern. The dhatus page uses `.primary` buttons for the same purpose.

#### 4. Grid — Minimal Card

**Location**: Lines 142–152.

```svelte
<a class="blank box rgap8" href={...}>
  <p class="txt-xs tt-u w500 theme">{rule.id}</p>
  <p class="txt-lg w400 a-hover hind lh15 a-hover">{rule.text}</p>
  <p class="grey2 txt-sm lh14">{rule.transliteration}</p>
</a>
```

Minimal card without `.whitestone` or `.b-main`. ✅ Consistent minimal style for dense data.

---

## `library/sections/ashtadhyayi/[sutra]/+page.svelte`

### Design System Issues

#### 1. Inline Styles

**Location**: Lines 72, 76.

```svelte
<div class="box std-pad b-main stonecard" style="margin-bottom: 2rem">
<p class="txt-xl" style="margin-bottom: 0">
```

Uses inline `style` for margins instead of design system spacing classes. Should use `mbot32` and `mbot0`.

**Fix**: Replace `style="margin-bottom: 2rem"` with `mbot32`, and `style="margin-bottom: 0"` with `mbot0`.

#### 2. `docgrid` Layout

**Location**: Lines 37–38.

```svelte
<div class="docgrid inverted">
  <aside class="docside">...</aside>
  <div class="docmain">...</div>
</div>
```

Uses `.inverted` variant. ✅ Correct.

#### 3. `@html` in Explainer Content

**Location**: Line 82.

```svelte
<p>{@html paragraph}</p>
```

Renders user-generated HTML content (rule references with `<a>` tags injected by `linkRuleReferences`). This is a security risk if the content source is compromised, but the content is pre-processed and the replacement is tightly scoped to known rule IDs.

#### 4. Duplicate SASS

**Location**: Lines 87–98 (page SASS).

```sass
.sidebar-second
  padding-top: 2rem
  border-top: var(--border-main)
  margin-top: 2rem
  margin-bottom: 1rem
  @media (min-width: 1025px)
    padding-top: 2rem
    border-top: var(--border-main)
    margin-top: 2rem
    margin-bottom: 1rem
```

The same rules are applied to all breakpoints — the `@media` block is identical to the base rules. This is dead SASS: the `@media` block does nothing.

**Fix**: Remove the `@media` block since the base rules already cover all breakpoints.

---

## `library/sections/words/+page.svelte`

### Observations

#### 1. Word Card Grid — Inline Pattern

**Location**: Lines 72–86.

```svelte
<a class="blank box rgap8 tight-pad whitestone b-main" href={...}>
  <p class="txt-xs tt-u w500 theme">{word.dictionaries.join(' + ')}</p>
  <p class="txt-xl w600 a-hover">{word.headword}</p>
  ...
</a>
```

✅ `CardGrid` candidate. Has unique features (dictionary label, preview lines, dhatu link count).

#### 2. Dictionary Filter

**Location**: Lines 55–61.

```svelte
<ResponsiveMenu>
  <a class="selection-button" class:active={!data.dictionary} href={dictionaryHref(null)}>All</a>
  <a class="selection-button" class:active={data.dictionary === 'apte'} href={dictionaryHref('apte')}>Apte</a>
  <a class="selection-button" class:active={data.dictionary === 'mw'} href={dictionaryHref('mw')}>Monier-Williams</a>
</ResponsiveMenu>
```

✅ Uses `selection-button` correctly with URL-based navigation.

---

## `library/sections/words/[word]/+page.svelte`

### Observations

#### 1. Bilingual Dictionary Display

**Location**: Lines 40–50.

```svelte
{#each data.entries as entry}
  <article class="box rgap8 tight-pad whitestone b-main">
    <p class="txt-xs tt-u w500 theme">{entry.dictionaryLabel}</p>
    <div class="box rgap4">
      {#each entry.meaningLines as line}
        <p class="lh14">{line}</p>
      {/each}
    </div>
    <a class="txt-sm w500" href={entry.sourceUrl} target="_blank" rel="noreferrer">Source entry</a>
  </article>
{/each}
```

✅ Clean card layout for dictionary entries.

#### 2. Dhatu Links Section

**Location**: Lines 52–63.

```svelte
{#each data.dhatuLinks as link}
  <a class="blank box rgap8 tight-pad whitestone b-main" href={...}>
    <p class="txt-xs tt-u w500 theme">Gaṇa {link.gana}</p>
    <p class="txt-xl w600 a-hover">√{link.rootIast}</p>
    <p class="grey2">{link.basis}</p>
  </a>
{/each}
```

✅ `CardGrid` candidate — dhatu link cards.

## Positive (All Library Pages)

- ✅ Consistent use of `Head` with custom meta images per section
- ✅ JSON-LD on nearly every page (collection or webPage schema)
- ✅ Pagination with `.primary.grey` + `.primary` buttons
- ✅ Clear typing on data interfaces
- ✅ URL-based filter state (hydration-friendly)
- ✅ No legacy Svelte patterns
- ✅ Minimal page-level SASS, heavy reliance on design system classes

## Recommendations

1. **Fix inline styles** on `ashtadhyayi/[sutra]` — replace with design system spacing classes
2. **Remove duplicate SASS** `@media` block on `ashtadhyayi/[sutra]`
3. **Standardize pagination icons** — `IconPrev`/`IconNext` on ashtadhyayi vs. `primary` buttons on dhatus. Pick one.
