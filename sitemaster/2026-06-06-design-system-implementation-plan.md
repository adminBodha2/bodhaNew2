# Design System Implementation Plan

Date: 2026-06-06
Based on: `2026-06-06-bodha-design-system.md` + all audit files in `sitemaster/audits/`

---

## Part A: Easy Fixes (Do These Yourself)

Simple typo fixes, class renames, and dead code removal. Each is a straightforward find-and-replace or single-file edit.

### A.1 Typos & Class Names

| # | File | What to do |
|---|---|---|
| 1 | `about/+page.svelte` | Replace `ttxt-2xl` → `txt-2xl` (×8 occurences) |
| 2 | `about/+page.svelte` | Replace `fitted-landscape` → `fitted landscape` |
| 3 | `about/+page.svelte` | Change `src="images/heroes/key-designbodha.webp"` → `src="/images/heroes/key-designbodha.webp"` |
| 4 | `contact/+page.svelte` | In all 4 social icons, change `color={'var(--color-theme-dark'}` → `color={'var(--color-theme-dark)'}` (add missing `)`) |
| 5 | `wiki/temples/[temple]/+page.svelte` | Remove duplicate `<p class="paragraph-text">{data.temple.description}</p>` — keep only one |

### A.2 Inline Styles → Design System Classes

| # | File | What to do |
|---|---|---|
| 6 | `blog/+page.svelte` | Replace `style="row-gap: 2rem"` → `rgap32` on the `<section>` |
| 7 | `blog/external-posts/+page.svelte` | Same — replace inline `style` with `rgap32` |
| 8 | `blog/tags/+page.svelte` | Same — replace inline `style` with `rgap32` |
| 9 | `library/sections/ashtadhyayi/[sutra]/+page.svelte` | Replace `style="margin-bottom: 2rem"` → `mbot32`, `style="margin-bottom: 0"` → `mbot0` |

### A.3 Dead Code Removal

| # | File | What to remove |
|---|---|---|
| 10 | `blog/external-posts/+page.svelte` | Remove `mobileMenuOpen`, `firstMenuItem`, `closeMobileMenu`, `onWindowKeydown`, `<svelte:window onkeydown={onWindowKeydown}>` |
| 11 | `blog/tags/[tag]/+page.svelte` | Same — remove `mobileMenuOpen`, `firstMenuItem`, `closeMobileMenu`, `onWindowKeydown` |
| 12 | `designbodha/+page.svelte` | Remove `iW` state, remove `<svelte:window bind:innerWidth={iW}>` |
| 13 | `designbodha/pramana-library/+page.svelte` | Remove `iW`, `sY` state, remove `<svelte:window bind:innerWidth={iW} bind:scrollY={sY}>` |
| 14 | `ontology/+page.svelte` | Remove `totalNodes` computed value |
| 15 | `blog/[post]/+page.svelte` | Delete the entire commented-out TOC block (lines ~130-142) or uncomment it |
| 16 | `explorer/[id]/+page.svelte` | Remove unused `Heading` import |
| 17 | `library/(..)/journal-archaeology/[issue]/+page.svelte` | Remove `Container` import (unused) |
| 18 | `anveshi/+page.svelte` | Remove unused imports: `iW` state, `LightboxGallery`, `GalleryImage`, `GalleryThumbnail` from the import line |
| 19 | `inspiration/+page.svelte` | Remove `ref2`, `visref2`, `ref3`, `visref3`, `useInView` (keep only `ref` + `visref`) |
| 20 | `inspiration/[item]/+page.svelte` | Remove `sY` state, remove `<svelte:window bind:scrollY={sY}>` |
| 21 | `research/[item]/+page.svelte` | Remove `sY` state, remove `<svelte:window bind:scrollY={sY}>` |
| 22 | `big-questions/+page.svelte` | Remove `ref`, `ref2`, `vis`, `vis2`, `useInView` |
| 23 | `academy/+page.svelte` | Remove `isVisible`, `revealVis`, `reference`, `revealref`, `useInView` |

### A.4 SASS Cleanup

| # | File | What to do |
|---|---|---|
| 24 | `library/sections/ashtadhyayi/[sutra]/+page.svelte` | In `<style>`, remove the `@media (min-width: 1025px)` block that duplicates the base rules (lines ~90-97) |
| 25 | `blog/tags/+page.svelte` | In `<style>`, remove `.main-btn.active` block — it's already defined in `_buttons-links.sass` |

---

## Part B: AI-Recommended Fixes (Let the AI Handle These)

These require creating new files, cross-page refactoring, or understanding data shapes. Best done by AI in a single pass.

### B.1 New SASS Primitives

Create/add these to the SASS partials in `src/lib/styles/system/`:

| # | File to create/edit | What to add | Prep needed? |
|---|---|---|---|
| 1 | `_modifiers.sass` or new `_forms.sass` | `.input-std` class — standardizes input styling across wiki tags, wiki domain, IKS search | No |
| 2 | `_modifiers.sass` or `_surfaces.sass` | Avatar classes: `.avatar-lg` (120px), `.avatar-md` (80px), `.avatar-sm` (64px) | No |
| 3 | `_sections.sass` | `.doc-header-grid.right-aside` variant for right-side sidebar | No |

After these are created, apply them:
- Replace inline input styles on `wiki/tags/+page.svelte` + `wiki/[domain]/+page.svelte` with `.input-std`
- Replace custom avatar classes on `about`, `team`, `blog/writers`, `blog/writers/[writer]` with `.avatar-*`
- Replace `temple-grid` on `wiki/temples/[temple]` with `.doc-header-grid.right-aside`

### B.2 New Svelte Components

Create these files in `src/lib/comps/`:

| # | Component | Depends on |
|---|---|---|
| 4 | `tag-list.svelte` | Nothing |
| 5 | `card-grid.svelte` | TagList (uses it internally) |
| 6 | `tabs.svelte` | ResponsiveMenu + Menudrop (existing) |
| 7 | `fact-grid.svelte` | Nothing |
| 8 | `section-shell.svelte` | Title + Slide/Reveal/Blur (existing) |

### B.3 Page Refactoring (After Components Are Built)

Replace inline patterns with new components:

| # | Page | Replace | With |
|---|---|---|---|
| 9 | `explorer/+page.svelte` | 7 duplicated `{#each}` card blocks | Single `<CardGrid>` per tab |
| 10 | `wiki/[domain]/[item]/+page.svelte` | 2 inline card grids | `<CardGrid>` |
| 11 | `wiki/[domain]/+page.svelte` | 1 inline card grid + tab implementation | `<CardGrid>` + `<Tabs>` |
| 12 | `wiki/tags/+page.svelte` | 1 inline card grid | `<CardGrid>` |
| 13 | `concepts/[slug]/+page.svelte` | 1 inline card grid + broken tabs | `<CardGrid>` + `<Tabs>` |
| 14 | `lab/+page.svelte` | inline card grid | `<CardGrid>` |
| 15 | `newsletter/+page.svelte` | inline card grid (add `gap16` while at it) | `<CardGrid>` |
| 16 | `aryavarta/+page.svelte` | inline card grid | `<CardGrid>` |
| 17 | `blog/external-posts/+page.svelte` | inline card grid | `<CardGrid>` |
| 18 | `library/sections/+page.svelte` | inline card grid | `<CardGrid>` |
| 19 | `academy/+page.svelte` | course card loops | `<CardGrid>` |
| 20 | `research/[item]/+page.svelte` | 1 inline card grid | `<CardGrid>` |
| 21 | `big-questions/[item]/+page.svelte` | "Also See" card grid | `<CardGrid>` |
| 22 | `big-questions/+page.svelte` | "All Big Questions" card grid | `<CardGrid>` |
| 23 | `academy/[course]/+page.svelte` | tab implementation | `<Tabs>` |
| 24 | `wiki/temples/[temple]/+page.svelte` | fact grid (state, deity etc.) | `<FactGrid>` |
| 25 | `academy/[course]/+page.svelte` | metadata grid (calendar, sessions etc.) | `<FactGrid>` |
| 26 | `anveshi/[chapter]/+page.svelte` | icon box metadata grid | `<FactGrid>` |
| 27 | All pages (~15 instances) | `.wrapper-std.growingline` + `<Title>` + animation boilerplate | `<SectionShell>` |

### B.4 Blog Layout Extraction

| # | Action |
|---|---|
| 28 | Create `src/routes/blog/+layout.svelte` with shared submenu nav |
| 29 | Remove duplicated submenu from all 6 blog subpages |
| 30 | Handle `blog/+page.svelte` special case (its unique blog-bucket layout) |

### B.5 Reconcile SEO Components

| # | Action |
|---|---|
| 31 | Merge `Head` and `Optimizer` components — `wiki/temples/+page.svelte` uses `Optimizer` while every other page uses `Head`. Either make them interchangeable or migrate one. |

---

## Quick Reference

| Category | Count | Effort |
|---|---|---|
| **A.1 Typos** | 5 fixes | ~5 min |
| **A.2 Inline styles** | 4 fixes | ~2 min |
| **A.3 Dead code** | 14 pages | ~15 min |
| **A.4 SASS cleanup** | 2 fixes | ~2 min |
| **B.1 New SASS primitives** | 3 additions + apply | ~20 min (AI) |
| **B.2 New components** | 5 files | ~1-2 hrs (AI) |
| **B.3 Page refactoring** | 19 pages | ~2-3 hrs (AI) |
| **B.4 Blog layout** | 1 new file + 6 edits | ~30 min (AI) |
| **B.5 SEO reconciliation** | 1 merge | ~30 min (AI) |
