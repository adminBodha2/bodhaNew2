# Aryavarta Page Audit

Page: `src/routes/aryavarta/+page.svelte`
Date: 2026-06-06

## Summary

The Scrolls of Aryavarta landing page follows the standard landing page pattern (Parallax → Container → Crumb → sections). Clean implementation with no critical bugs.

## Design System Observations

### 1. Comic Card Grid — Repeating Inline Card Pattern

**Location**: Lines 78–95.

```svelte
{#each posts as item}
  <a class="blank box rgap24 whitestone b-main std-pad comic-item" href={item.linkpath}>
    <div><img class="fitted landscape" src={item.meta.image} alt={item.meta.title} /></div>
    <div class="box gap16">
      <p class="txt-xl lg:txt-2xl w600 a-hover">{item.meta.title}</p>
      <p class="grey1 txt-lg">{item.meta.description}</p>
      <p class="txt-xs w500 tt-u">Vol. {item.meta.volume}, Issue {item.meta.issue} | {item.meta.date}</p>
    </div>
  </a>
{/each}
```

This is another instance of the inline card pattern that the proposed `CardGrid.svelte` would consolidate. This specific variant has:
- Image top (`.fitted.landscape`)
- Title, description, metadata below
- Outer wrapper: `.blank.box.whitestone.b-main.std-pad`

Matches the generic card pattern used in wiki domain items, concepts, tags, etc.

### 2. Content Highlights / Intro Section

**Location**: Lines 54–73.

Uses a two-column grid with `Reveal` animated paragraphs. Consistent with the intro section pattern on Academy, Research, and Big Questions pages:
```svelte
<div class="grid grid-cols-1 lg:grid-cols-2 cgap64 rgap16">
  <div class="box rgap16">
    <Reveal><p class="highlight-text">...</p></Reveal>
  </div>
  <div class="box rgap16">
    <Reveal><p class="highlight-text">...</p></Reveal>
  </div>
</div>
```

✅ This is a well-established design system pattern for page introductions.

### 3. JSON-LD Structure

**Location**: Lines 16–35.

Uses `collectionPageJsonLd` with a derived list of comic items. This is the correct structured data type for a listing page.

✅ Good — consistent with other listing pages.

### 4. Image Paths Reloaded

**Location**: Parallax image source is `/images/heroes/key-soa.webp`.

✅ Uses absolute paths consistently. No relative path issues.

## Positive

- ✅ Standard page shell with Parallax → Container → Crumb → sections
- ✅ JSON-LD with collection schema
- ✅ All sections use animation wrappers
- ✅ All images have alt text
- ✅ No legacy Svelte patterns
- ✅ Minimal page-level SASS (no `<style>` block)

## Recommendations

1. **Extract card to CardGrid** — the comic card grid matches the generic `CardGrid.svelte` proposal
2. **No critical issues** — this page is well-structured and consistent
