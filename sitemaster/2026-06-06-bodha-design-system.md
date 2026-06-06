# Bodha Design System

Date: 2026-06-06
Status: Draft

## Purpose

This document defines the Bodha design system — a shared vocabulary of tokens, CSS primitives, Svelte components, and layout patterns extracted from the existing codebase. The goal is to standardize all pages on the website so that:

- New pages can be built predictably without reinventing patterns
- Existing pages can be refactored toward consistency
- Design decisions are documented and intentional

---

## Part 1: Design Tokens

All tokens are defined in `src/lib/styles/system/_tokens.sass` and exposed as CSS custom properties on `:root`.

### 1.1 Spacing Scale

| Token | Value (rem) | Common use |
|---|---|---|
| `$space-scale: 0` | 0 | Collapse gap |
| `4` | 0.25rem | Tight gaps inside cards, between tags |
| `8` | 0.5rem | Tight padding inside small elements |
| `16` | 1rem | Standard card padding, section gap |
| `24` | 1.5rem | Loose card padding, paragraph bottom |
| `32` | 2rem | Section heading margin, generous gaps |
| `48` | 3rem | Large section padding |
| `64` | 4rem | Very large padding, page sections |
| `80` | 5rem | Page header top padding |
| `104` | 6.5rem | Sticky offset height |
| `128` | 8rem | Maximum spacing |

### 1.2 Typography Scale

Base: `--txt-bs: 1rem`, scale factor `--txt-scale: 1.17` (mobile), `1.2` (desktop).

| Class | Use case |
|---|---|
| `txt-00` | 10.55px — metadata, small labels |
| `txt-xs` | 0.75rem — tag labels, secondary info |
| `txt-sm` | 0.875rem — tertiary text, footnotes |
| `txt-bs` | 1rem — body text (base) |
| `txt-lg` | ~1.17rem — emphasis paragraph, card body |
| `txt-xl` | ~1.4rem — intro paragraphs, large card text |
| `txt-2xl` | ~1.64rem — subheading, card title |
| `txt-3xl` | ~1.92rem — section heading |
| `txt-4xl` | ~2.25rem — page heading (mobile h1) |
| `txt-5xl`–`txt-9xl` | ~2.63rem–5.07rem — hero headings, display type |

**Font families:**

- `--fontface-sans`: `'Google Sans Flex', sans-serif` — body, UI labels, most text
- `--fontface-serif`: `'Source Serif 4', serif` — display headings, serif emphasis
- `STIX Two Text` — blog article body text
- `Newsreader` — available for future long-form use
- `Hind` — available for Devanagari text

**Weights:**

| Class | Weight | Use |
|---|---|---|
| `w400` | 400 | Body text |
| `w500` | 500 | Bold labels, uppercase headers |
| `w600` | 600 | Subheadings, card titles |
| `w690`–`w700` | 690–700 | Display headings, emphasis |

### 1.3 Color Palette

#### Light theme

| Variable | Value | Use case |
|---|---|---|
| `--color-primary` | #1B1E20 | Body text, headings |
| `--color-back` | #FFFFFF | Page background, card surfaces |
| `--color-theme` | #104A96 | Link color, accent, brand elements |
| `--color-theme-dark` | #023E8A | Active state, hover backgrounds |
| `--color-theme-light` | #65b7fa | Underline decoration, subtle accents |
| `--color-theme-light2` | #DAF2FC | Light accent fills |
| `--color-theme-alt` | #1a7852 | Alternative accent (green) |
| `--color-grey-0` | #aaaaaa | Muted labels, secondary decor |
| `--color-grey-1` | #8c8c8c | Secondary text, descriptions |
| `--color-grey-2` | #676767 | Tertiary text |
| `--color-grey-3` | #474747 | High-contrast grey text |
| `--color-grey-4` | #303030 | Button backgrounds, near-black grey |
| `--color-stone-0` | #F9F8F6 | Subtle background tint |
| `--color-stone-1` | #fbfaf9 | Card hover, section background |
| `--color-stone-2` | #fafafa | Alternate section background |
| `--color-stone-3` | #F3F5F7 | Button background, active filters |
| `--color-stone-4` | #F3F3F2 | Pill/chip background |
| `--color-anveshi` | #D3633A | Anveshi section brand |
| `--color-anveshi-alt` | #9F401D | Anveshi dark accent |
| `--color-designB` | #2A9134 | Design/build brand (green) |
| `--color-designB-alt` | #38B000 | Design/build bright accent |
| `--color-border` | #E7E7E7 | Standard border (light) |
| `--color-border-light` | #F1F1F1 | Subtle border |
| `--color-border-dark` | #D1D1D1 | Stronger border |

**Text color usage guidelines:**

| What | Class/Variable |
|---|---|
| Primary body text | `--color-primary` (default) |
| Secondary / description text | `grey1` |
| Tertiary / muted text | `grey2` or `grey0` |
| Link text | `theme` |
| Uppercase labels | `grey0`, `grey1`, or `theme` depending on prominence |
| Tag/label text | `theme` or `grey0` |
| Caption / metadata | `grey2` or `grey0.tt-u` |

#### Dark theme

Parallel set under `.dark` selector. Structure mirrors light theme with inverted luminance values. Always test both themes when adding new color-dependent UI.

### 1.4 Borders

| Variable | Value | Use |
|---|---|---|
| `--border-main` | 1px solid `--color-border` | Card borders, section separators |
| `--border-dark` | 1px solid `--color-border-dark` | Stronger separators, sidebar borders |
| `--border-darker` | 1px solid #a7a7a7 (light) | Input borders, high-contrast dividers |
| `--border-light` | 1px solid `--color-border-light` | Subtle dividers |

### 1.5 Easing & Duration

| Variable | Value | Use |
|---|---|---|
| `--dur-short` | 120ms | Micro-interactions, button hovers |
| `--dur-180` | 180ms | Card hovers, menu transitions |
| `--dur-320` | 320ms | Panel open/close |
| `--dur-560` | 560ms | Page transitions, large moves |
| `--es-smooth` | cubic-bezier(0.22, 1, 0.36, 1) | Default smooth easing |
| `--es-snap` | cubic-bezier(0.755, 0.050, 0.855, 0.060) | Quick snap |
| `--es-back` | cubic-bezier(0.190, 1.000, 0.220, 1.000) | Card hover with slight overshoot |

---

## Part 2: CSS Primitives

All defined as SASS mixins in `src/lib/styles/system/` and called through the `+responsive-classes` mixin to generate prefixed versions for breakpoints.

### 2.1 Layout

| Class | Effect |
|---|---|
| `row` | `display: flex; flex-direction: row` |
| `box` | `display: flex; flex-direction: column` |
| `wrap` | `flex-wrap: wrap` |
| `.row.xleft` / `.box.xleft` | Justify left (row: flex-start, box: align-items flex-start) |
| `.row.xcenter` / `.box.xcenter` | Center |
| `.row.xbetween` | Space-between |
| `.row.ycenter` | Align items center |
| `.box.ycenter` | Justify content center |

**Responsive overrides** (mobile-first): `md\:mcol`, `lg\:mwrap`, `sm\:mleft`, etc. Mobile breakpoint uses `mcol`, `mrow`, `mwrap`, `mleft` unprefixed.

### 2.2 Grid

| Class | Effect |
|---|---|
| `grid` | `display: grid; grid-template-columns: minmax(0, 1fr)` |
| `grid-cols-{1..6}` | Repeat columns |
| `col-span-{1..6}` | Span columns |
| `col-span-full` | Grid column 1 / -1 |
| `white-grid` | Grid with 1px gaps and border (used for fact cards, metadata grids) |
| `ordered` + `.up`/`.down` | Mobile-first reordering |

### 2.3 Spacing

Classes auto-generated from `$space-scale` map for each value {0, 4, 8, 16, 24, 32, 48, 64, 80, 104, 128}:

| Pattern | Effect |
|---|---|
| `p{value}` | Padding all sides |
| `px{value}` | Padding left + right |
| `py{value}` | Padding top + bottom |
| `ptop{value}` | Padding top |
| `pbot{value}` | Padding bottom |
| `mleft{value}` etc. | Margin directional |
| `rgap{value}` | Row gap |
| `cgap{value}` | Column gap |
| `gap{value}` | Gap all |

All available with responsive prefixes: `md\:p32`, `lg\:rgap16`, `sm\:p16`, etc.

### 2.4 Sizing

| Class | Effect |
|---|---|
| `width{50,60,70,80,90,100}` | Width percentage (collapses to 100% on mobile ≤1024px) |
| `widthmax` | `width: max-content` |
| `img.fitted` | `width: 100%; object-fit: cover; display: block` |
| `img.fitted.landscape` | aspect-ratio: 16/9 |
| `img.fitted.herocard` | aspect-ratio: 3/2 |
| `img.fitted.port` | aspect-ratio: 3/4 |
| `img.fitted.squared` | aspect-ratio: 1/1 |
| `img.fitted.contain` | object-fit: contain |

### 2.5 Typography Utilities

| Pattern | Effect |
|---|---|
| `txt-{size}` | Font size (see token table above) |
| `w{weight}` | Font weight |
| `lh{value}` | Line height (1.0–1.8) |
| `ls{value}p` / `ls{value}m` | Positive/negative letter-spacing |
| `tt-u` / `tt-l` / `tt-c` | Text transform |
| `ta-c` / `ta-l` / `ta-r` / `ta-j` | Text align |
| `italic` | Font style italic |
| `source-serif` | Font family Source Serif 4 |
| `stix-two` | Font family STIX Two Text |

Color classes: `theme`, `theme-dark`, `theme-light`, `grey0`–`grey3`, `white`, `anveshi-o`, `theme-alt`, `desb`, `desb2`.

### 2.6 Surfaces

| Class | Effect |
|---|---|
| `blank` | No text decoration, inherit color (for `<a>` wrappers) |
| `whitestone` | White background, subtle hover to `--color-stone-0` |
| `whitecard` | Background `--color-back` |
| `stonecard` | Background `--color-stone-1` |
| `b-main` | Border `--border-main` |
| `bordertop` / `borderbot` | Single-direction borders |
| `paper-1` | Subtle card shadow, removes on hover |
| `h-paper-1` | Adds shadow on hover |
| `glass-1` / `glass-2` / `glass-3` | Progressive glassmorphism surfaces |
| `radius` / `radius4` / `radius8` | Border-radius 5px / 4px / 8px |

### 2.7 Buttons & Links

| Class | Use |
|---|---|
| `primary` | Filled button with dark hover sweep effect |
| `primary.themed` | Theme-colored primary button |
| `primary.anveshi` | Anveshi-colored primary button |
| `primary.desb` | Design-build primary button |
| `primary.grey` | Grey variant of primary button |
| `small-button` | Small uppercase pill button |
| `small-button.hollow` | Borderless inline button |
| `selection-button` | Tab-style button for filters/sections |
| `selection-button-2` | Smaller tab-style button |
| `filter-button` | Small filter/tag toggle |
| `hollow-link` | Text link with right-arrow hover |
| `standard-pill` | Tag/chip display |
| `linked` | Underlined link with theme underline color |
| `linkedlight` | Theme-colored link |
| `linkonhover` | Link that colors on hover only |
| `themed` | Theme-colored text, no decoration |
| `toggler-std` | Toggle switch component |
| `main-btn` | Standard button style |

### 2.8 Sections & Shells

| Class | Effect |
|---|---|
| `wrapper-std` | Standard page section: padding-top 3rem (5rem desktop), row-gap 2rem (3rem desktop), flex column |
| `wrapper-std.tight-stack` | row-gap: 0 |
| `wrapper-std.min100vh` | min-height: 100vh, justify-content: center |
| `wrapper-std.growingline` | Adds scroll-triggered top border line animation |
| `std-pad` | Standard padding: 1rem → 1.5rem → 2rem |
| `tight-pad` | Tight padding: 1rem → 1.5rem |
| `min100vh` | min-height: 100vh |
| `growingline` | Section with animated top line on scroll |
| `growingline.alternate` | Reversed line draw direction |
| `padding-wrapper` | Full-width padded section with centered `.inside-section` |

### 2.9 Document Layouts

**`doc-header-grid`**: Sidebar + main content grid for document pages.

```sass
.doc-header-grid
  grid-template-columns: 1fr          // mobile: main above aside
  grid-template-areas: "mainarea" "aside"
  @media (min-width: 1025px)
    grid-template-columns: 360px 1fr // desktop: aside left, main right
    grid-template-areas: "aside mainarea"
  &.inverted                          // aside still left on desktop
    grid-template-areas: "aside mainarea"
  &.wide-aside                        // wider sidebar: 480px
    grid-template-columns: 480px 1fr
```

**`docgrid`**: Alternative sidebar document layout with named areas.

---

## Part 3: Svelte Components

All components live in `src/lib/comps/`. Each component is a standalone Svelte 5 runes component with TypeScript.

### 3.1 Layout Components

| Component | Props | Description |
|---|---|---|
| `Container` (wrapper.svelte) | children (slot) | Page-level wrapper. Applied by every page. |
| `Crumb` (breadcrumb.svelte) | showT, title, showD, desc, showRow, children, onblog, noBorder, isSolo, thinBot, fullP | Page breadcrumb/header with title, description, optional children. Multiple variants by feature flags. |
| `Crumb2` (crumb-2.svelte) | showT, title, showD, desc, showRow, children | Alternative crumb with slightly different layout (`wiki/[domain]`). |

### 3.2 Navigation Components

| Component | Props | Description |
|---|---|---|
| `ResponsiveMenu` | label, ariaLabel, children | Menu that collapses to dropdown on mobile |
| `ResponsiveMenu2` | children | Alternative responsive menu for blog |
| `Menudrop` | label, ariaLabel, children | Dropdown menu for tab controls |

### 3.3 Content Display Components

| Component | Props | Description |
|---|---|---|
| `Title` (page-title.svelte) | text, sizeType | Section heading with growing line underline |
| `PageHead` (page-header-one.svelte) | title | Section page header for blog |
| `Card` (blog-card.svelte) | image, title, desc, author, words, link, shutAuth, children | Blog post card |
| `HubRelatedLinks` | title, items | Related links section for domain pages |
| `VideoPlayer` | videoId, title, loop | Embedded YouTube video |
| `WikiGraph` | nodes, edges | Interactive D3-style graph |
| `Social` (socialshare.svelte) | urlToShare | Social share buttons |
| `Head` (headcomponent.svelte) | title, metaDescription, metaUrl, metaImage, ogType, jsonld, imWidth, imHeight | Sets HTML head SEO tags |

### 3.4 Animation Wrapper Components

| Component | Description |
|---|---|
| `Slide` / `Slide2` | Scroll-triggered slide-in animation with stagger support |
| `Reveal` | Scroll-triggered reveal (fade + translate) |
| `Blur` | Scroll-triggered blur reveal |
| `Cut` | Scroll-triggered cut/wipe animation |
| `Parallax` (parallaxhalf.svelte) | Parallax scrolling hero with optional wipe |

### 3.5 Proposed Components (Not Yet Extracted)

These are patterns repeated inline across pages that should be extracted as reusable Svelte components.

#### `CardGrid.svelte`

Generic card grid for listing content items. Consolidates the ~6+ inline card patterns.

```svelte
<script lang="ts">
  interface CardItem {
    id: string;
    title: string;
    description?: string;
    type?: string;
    href?: string;
    tags?: string[];
    authors?: string[];
    lens?: string;
    meta?: Record<string, unknown>;
  }

  let { items, columns = 4, compact = false }: {
    items: CardItem[];
    columns?: number;
    compact?: boolean;
  } = $props();
</script>

<!-- renders a grid of whitestone cards -->
```

**Usage**: `wiki/[domain]/[item]`, `concepts/[slug]`, `wiki/tags`, `wiki/[domain]`, `big-questions/[item]`.

#### `TagList.svelte`

Standardized tag/chip display with consistent styling and dash-to-space conversion.

```svelte
<script lang="ts">
  let { tags, color = 'theme', linkable = false, basePath = '' }: {
    tags: string[];
    color?: 'theme' | 'grey0' | 'grey1' | 'theme-dark';
    linkable?: boolean;
    basePath?: string;
  } = $props();
</script>
```

#### `Tabs.svelte`

Consolidate the three tab implementations (wiki domain, academy course, concepts slug).

```svelte
<script lang="ts">
  import Menudrop from '$lib/comps/responsive-menu.svelte';

  let { tabs, active, onTabChange, label = 'Sections' }: {
    tabs: string[];
    active: number;
    onTabChange: (index: number) => void;
    label?: string;
  } = $props();
</script>
```

#### `FactGrid.svelte`

Key-value grid with the `white-grid` visual style.

```svelte
<script lang="ts">
  interface Fact {
    label: string;
    value: string;
  }

  let { items, columns = 4 }: {
    items: Fact[];
    columns?: number;
  } = $props();
</script>

<!-- renders grid-cols-{columns} white-grid with label/value cards -->
```

**Usage**: temple pages (state, deity, category, coords), course pages (calendar, sessions, timings, price).

#### `SectionShell.svelte`

Standardized section wrapper for the `.wrapper-std.growingline` + `<Title>` + animated content pattern.

```svelte
<script lang="ts">
  let { title, alternate = false, animation = 'slide' }: {
    title: string;
    alternate?: boolean;
    animation?: 'slide' | 'reveal' | 'blur';
  } = $props();
</script>

<section class="wrapper-std growingline" class:alternate>
  <Title {title} />
  {#if animation === 'slide'}
    <Slide targetSelector=".section-content">{@render children?.()}</Slide>
  {:else if animation === 'reveal'}
    <Reveal>{@render children?.()}</Reveal>
  {:else if animation === 'blur'}
    <Blur>{@render children?.()}</Blur>
  {/if}
</section>
```

---

## Part 4: Page Layout Patterns

### 4.1 Page Shell

Every page follows:

```svelte
<Head {title} {metaDescription} {metaUrl} {metaImage} ... />
<Container>
  <Crumb showT={true} title="..." showD={true} desc="..." />
  
  <section class="wrapper-std">
    <!-- intro content -->
  </section>
  
  <section class="wrapper-std growingline">
    <Title text="..." />
    <Slide ...>
      <!-- card grid, list, etc. -->
    </Slide>
  </section>
</Container>
```

### 4.2 Sidebar + Main Layout

Two competing implementations exist:

| Pattern | File | When to use |
|---|---|---|
| `doc-header-grid` | `_sections.sass` | Page-level sidebar with sticky scroll. Used in wiki tags, concepts slug. |
| `docgrid` | `_document-layout.sass` | Document page with left sidebar and right prose content. Used in wiki domain items. |
| `triple-grid` | `big-questions/[item]/+page.svelte` | Three-column: left nav, middle content, right related. |

**Recommendation**: Standardize on `doc-header-grid` for general sidebar use, keep `triple-grid` as an ad-hoc pattern for the Big Questions detail page only.

### 4.3 Hero Patterns

| Pattern | Used In |
|---|---|
| `Parallax` + `Crumb` | Academy, Research, Big Questions, Aryavarta, Wiki home |
| Parallax with wipe animation | Research, Academy, Aryavarta, Wiki home |
| WaterRipple hero image | Blog post pages |
| Featured essay overlay hero | Blog index |
| No hero, just Crumb | Concepts, wiki domain, wiki tags, contact |

### 4.4 Card Grid Patterns

| Columns | Breakpoint | Used In |
|---|---|---|
| `grid-cols-1 lg:grid-cols-4` | 1→4 | wiki domain section, wiki domain item, concepts, wiki home |
| `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` | 1→2→3 | wiki domain item (referencedBy, related), big questions list |
| `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` | 1→2→4 | Blog index articles, writers list |
| `grid-cols-1 lg:grid-cols-2 cgap64` | 1→2 | Intro/split text sections |

**Recommendation**: Default card grid should be `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` for content listing, `grid-cols-1 lg:grid-cols-2` for text splits, `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` for medium-density lists.

---

## Part 5: Usage Guidelines

### Layer Stack

When building a page, apply in order:

1. **Tokens** — color, spacing, type scale (in `_tokens.sass`)
2. **Primitives** — layout, grid, spacing utilities (in SASS partials)
3. **Surface classes** — `.whitestone`, `.paper-1`, `.b-main` etc.
4. **Components** — `Container`, `Crumb`, `Title`, `Card`, etc.
5. **Page-level styles** — component styles in `<style lang="sass">` block (only for one-off patterns)

### When to Use SASS Classes vs. Component Props

| Scenario | Use |
|---|---|
| One-off positioning | Utility classes (`p16`, `mtop8`, `gap16`) |
| Repeated visual pattern | Component (`Card`, `TagList`, `CardGrid`) |
| Section structure | `SectionShell` + `Title` |
| Page metadata | `Head` component |
| Long-form text | `.classic-document` or `.blog-article` class on wrapper |

### Theme Support

Always support both `.light` and `.dark` themes:
- Use CSS custom properties from `_tokens.sass` (never hardcoded colors)
- Test both themes before shipping any new UI
- The `.temp` class in `_tokens.sass` is for India map colors — do not use for UI

---

## Part 6: Gaps & Recommendations

### Missing Primitives

- **No loading/spinner state** — not currently used but should be defined before needed
- **No modal/dialog pattern** — scroll-locked modals are absent from the codebase
- **No toast/notification pattern** — add if/when needed

### Consolidation Opportunities

1. **Merge `Crumb` and `Crumb2`** — they differ only slightly. Either unify into one component or document when to use each.
2. **Merge `ResponsiveMenu` and `ResponsiveMenu2`** — same story, small differences.
3. **Replace inline card patterns with `CardGrid`** across all affected pages.
4. **Replace inline tag displays with `TagList`**.
5. **Replace tab implementations with `Tabs`**.

### Deprecation Candidates

- `.library-book`, `.library-search` in `_surfaces.sass` — specific to library feature, not general.
- `.popup-temple-name`, `.popup-state`, `.popup-coords`, `.maplibregl-ctrl-group` in `_modifiers.sass` — temple map-specific.
- `.ripple-motion`, `.ripple-image-box` in `_modifiers.sass` — WaterRipple component-specific.
