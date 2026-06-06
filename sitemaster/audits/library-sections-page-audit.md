# Library Section Index Audit

Page: `src/routes/library/sections/+page.svelte`
Date: 2026-06-06

## Summary

The Sanskrit Universe / Synaptic landing page. Clean index with three cards linking to the main tools.

## Design System Observations

### 1. Hardcoded Section Data

**Location**: Lines 11–28.

```ts
let sections = $derived([
  { title: 'Aṣṭādhyāyī', href: '/library/sections/ashtadhyayi', desc: '...' },
  { title: 'Dhātupāṭha', href: '/library/sections/dhatus', desc: '...' },
  { title: 'Dictionary Words', href: '/library/sections/words', desc: '...' }
]);
```

Hardcoded section data in the template. If more tools are added, this array needs manual updating. Could be server-driven, but for a static set of tools this is acceptable.

### 2. Inline Card Pattern

```svelte
<a class="blank box rgap8 std-pad b-main whitestone" href={section.href}>
  <p class="txt-xl w600 a-hover">{section.title}</p>
  <p class="grey2 lh14">{section.desc}</p>
</a>
```

✅ `CardGrid` candidate. Simple card with title and description.

### Positive

- ✅ Standard page shell: Head → Container → Crumb → grid
- ✅ JSON-LD with collection schema referencing all three sections
- ✅ No animation wrappers (simple index — appropriate)
- ✅ No page-level SASS
- ✅ No legacy Svelte patterns

## Recommendations

1. **No issues found** — this page is clean and minimal
