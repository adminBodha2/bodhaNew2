# Contact Page Audit

Page: `src/routes/contact/+page.svelte`
Date: 2026-06-06

## Summary

A simple, clean contact page. Very little room for design system issues.

## Design System Observations

### 1. Social Media Icons

**Location**: Lines 48–65.

```svelte
<a class="blank" href="..." rel="noreferrer" target="_blank">
  <Twitter size="24" color={'var(--color-theme-dark'} />
</a>
```

**Bug**: `color={'var(--color-theme-dark'}` is missing a closing parenthesis. Should be `{'var(--color-theme-dark)'}`. This affects all four social media icons.

This means the `color` prop receives `var(--color-theme-dark` (invalid CSS) instead of `var(--color-theme-dark)` (valid custom property). The icons likely fall back to their default color.

### 2. JSON-LD

Uses `webPageJsonLd` with `type: 'ContactPage'` and nested `mainEntity` of type `Organization` with address and social links. This is the most complete JSON-LD on the site. ✅

### 3. No Animation Wrappers

The contact page doesn't use `Slide`, `Reveal`, or any scroll-triggered animations. For a simple utilitarian page, this is appropriate. ✅

### 4. Crumb With `thinBot`

**Location**: Line 43.

```svelte
<Crumb showT={true} title="Contact Us" thinBot={true} />
```

Uses the `thinBot` prop variant. This is the only page using this prop. The variant reduces bottom padding on the crumb.

### 5. Missing `+page.ts` / `+page.server.ts`

No data loading — all content is hardcoded in the template. This is appropriate for a contact page.

## Positive

- ✅ Clean, minimal page
- ✅ Comprehensive JSON-LD with Organization schema
- ✅ No legacy Svelte patterns
- ✅ No page-level SASS

## Recommendations

1. **Fix the CSS typo** — add closing parenthesis to `color` props on all 4 social icons
