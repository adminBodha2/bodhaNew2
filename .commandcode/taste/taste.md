# Taste (Continuously Learned by [CommandCode][cmd])

[cmd]: https://commandcode.ai/

## Svelte 5 Patterns
- Uses runes exclusively `($props, $state, $derived, $effect)` - no legacy $: statements
- Component props use destructuring: `let { class: className = "" } = $props()`
- TypeScript interfaces with JSDoc comments for props
- Browser-only code guarded with onMount or if(browser)

## TypeScript Patterns
- Explicit return types on functions
- import type { ... } for type-only imports
- @ts-expect-error with comments for known issues
- Type guards: post is NonNullable<typeofpost>

## Styling (Sass)
- Indented .sass syntax (not SCSS), tabs for indentation
- custom properties for theming (--color-theme, --txt-4xl)
- Mobile-first: @media (min-width: 721px), breakpoints at 1025px, 1201px, 1441px
- Utility classes: box, row, ycenter, xbetween, gap16, p16, px24

## Code Organization
- Barrel exports with section headers (// ──Components ─────────────)
- $lib/ path aliases
- Markdown content loaded via import.meta.glob()
- Utilities in src/lib/utils/, components in src/lib/comps/