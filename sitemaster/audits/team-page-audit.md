# Team Page Audit

Page: `src/routes/team/+page.svelte`
Date: 2026-06-06

## Summary

A simple team listing page, nearly identical in structure to the About page's team section but with smaller avatars (80px vs 120px). This is essentially a standalone version of a pattern embedded in the About page.

## Design System Issues

### 1. Avatar Size Drift — 80px

**Location**: Lines 73–80 (page SASS).

```sass
.member-image img
  width: 80px
  height: 80px
  border-radius: 50%
```

This is a **fifth** distinct avatar size:
- About team: 120px (`.member-image img`)
- Big Questions sponsor: 104px (`.shri-hari-kiran-vadlamani`)
- Blog writers index: 64px (`.avatar`)
- Blog writers page: shown at 64px
- **Team page: 80px**

Five sizes, all with the same circular shape and `object-fit: cover`. The member link styles (`.member-link`, `.link-sep`) are also duplicated between this page and the About page's team section.

**Fix**: A single `.avatar-{sm,md,lg,xl}` primitive or `<Avatar>` component would eliminate this duplication.

### 2. JSON-LD

**Location**: Lines 11–30.

Uses a custom JSON-LD structure with `mainEntity` of type `Organization` listing all `member` entities. This is more semantically rich than the About page's JSON-LD. ✅ Good.

### 3. No Parallax Hero

This page doesn't use `Parallax` — it's a simple listing. ✅ Appropriate.

### 4. No Animation Wrappers

No `Slide`, `Reveal`, or scroll-triggered animations. ✅ Appropriate for a straightforward listing page.

### 5. Duplicated Member Card Markup

The team card markup is almost identical to the About page's team section but with:
- 80px avatar vs 120px on About
- No "Writings" link (About shows it for first 4 members)
- Different link separator styling

Both should use the same component.

### Positive

- ✅ Standard page shell: Head → Container → Crumb → grid
- ✅ Rich JSON-LD with Person entities
- ✅ All images have alt text
- ✅ No legacy Svelte patterns

## Recommendations

1. **Create avatar primitive** — this is the 5th avatar size variant on the site
2. **Extract team member card** — the About page and Team page duplicate the same member card pattern with slight variations
3. **No critical issues**
