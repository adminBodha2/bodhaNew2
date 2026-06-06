# Root Layout Audit

Page: `src/routes/+layout.svelte`
Date: 2026-06-06

## Summary

The root layout is the site skeleton — provides the header/navbar, footer, announcement banner, theme toggle, and wraps all pages. It is the single most impactful file on the site for design system compliance.

## Structure

The layout provides:
1. `<Head />` component (note: site-wide Head, separate from per-page `<Head>` in page templates)
2. Announcement banner (conditionally shown via sessionStorage)
3. Navbar with logo, navigation links, desktop + mobile menus
4. `<main>` wrapper around `{@render children?.()}`
5. Footer with columns and social links
6. Theme toggle (light/dark) with localStorage persistence

## Design System Issues

### 1. Duplicate Theme Toggle Logic

**Location**: The layout has inline theme toggle logic (checking `localStorage`, toggling `.dark` class on `<html>`, setting `<meta name="theme-color">`). This same logic likely exists in other files. If not extracted into a shared utility in `$lib/utils`, it should be.

**Severity**: Low — the logic works, but it's a concern if any page ever needs to toggle the theme independently.

### 2. Navbar Menu — Desktop vs. Mobile

**Location**: The desktop nav renders `<a>` tags directly. The mobile nav renders a hamburger toggle → dropdown. This is the site's primary navigation and is not part of the design system's component library — it's implemented inline in the layout.

**Observation**: The navbar's structure (logo left, links center, theme toggle + CTA right) is the site's most important layout pattern. It is **not** documented in any design system component. If the navbar ever needs to change, the modification is in a single file — it's not duplicated. ✅ That's acceptable.

### 3. Footer — Hardcoded Column Structure

**Location**: The footer renders 4 columns (Bodha, Research, Connect, Publications) with hardcoded links. This is **not** extracted as a component and is not documented in the design system.

**Observation**: Same as the navbar — the footer is important but lives in one file. ✅ Acceptable.

### 4. Announcement Banner — sessionStorage Based

**Location**: The announcement banner is dismissed via `sessionStorage`. This pattern (banner → dismiss → store → hidden) is used for the root layout banner. ✅ Clean.

### 5. Theme Persistence — `localStorage` + `.dark` Class

**Location**: Theme is toggled by adding/removing `.dark` on `<html>` and persisted in `localStorage`. This is the correct pattern for the design system's dual-theme tokens. ✅

### 6. `<Head>` Component in Layout

**Location**: The root layout renders its own `<Head>` component with default site metadata. Individual pages then override via their own `<Head>`. This is the correct pattern for SvelteKit — the inner component's `<svelte:head>` merges with the outer. ✅

### 7. No Animation Wrappers

The layout doesn't use `Slide`, `Reveal`, or any animation wrappers. ✅ Appropriate for a shell layout.

### 8. Page-Level Class

**Location**: `<main>` is rendered with a `class={data.pageClass}` which likely comes from the layout's load function. This lets individual pages modify the main wrapper class. ✅ Flexible.

## Observations

### 9. Navigation Links — Static Array

The nav links (About, Research, Academy, Knowledge Base, Blog, etc.) are hardcoded inline. If the site structure changes, this is the single point of update. ✅ Good.

### 10. `ReaderChromeHidden` Store Integration

**Location**: The layout reads `$readerChromeHidden` to toggle the navbar's visibility on blog post pages. This is how the Reader Mode (scroll-to-hide nav) feature works — the blog post component sets the store, and the layout reads it.

This is the cross-component communication pattern that uses Svelte stores (not runes). ✅ Valid use case.

## Positive

- ✅ Single source of truth for site shell (navbar + footer)
- ✅ Correct theme toggle with localStorage persistence
- ✅ Responsive nav with mobile hamburger menu
- ✅ Announcement banner with dismiss
- ✅ Footer with 4 columns
- ✅ Breadcrumb via `<Head>` component

## Recommendations

1. **No critical issues** — the root layout is well-structured
2. **Consider extracting navbar** if the menu structure ever needs to be shared (e.g., with a sitemap)
3. **Document navbar/footer patterns** in the design system as "shell patterns" (even if not extracted to components)
