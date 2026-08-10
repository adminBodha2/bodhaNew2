# AGENTS.md

This repo is a SvelteKit 2 / Svelte 5 site for Bodha. Prefer small, verified changes that fit the existing application style.

## Core Workflow

- Stay tightly scoped to the user's request.
- Inspect the relevant route/component/data files before editing.
- Do not refactor adjacent code unless the request requires it.
- Preserve user changes and unrelated dirty worktree state.
- Explain non-obvious moves before making broad edits.
- For debugging requests, compare working and failing cases before assuming the whole system is broken.

## SvelteKit Defaults

- Use TypeScript, not JavaScript, for new source files and component scripts.
- Use Svelte 5 runes mode for new Svelte code.
- Prefer `$props`, `$state`, `$derived`, and `$effect` over legacy Svelte patterns.
- Do not introduce legacy `$:` reactive statements in new components.
- When touching browser-only APIs, guard SSR explicitly.
- Use `import { browser } from '$app/environment'` where code may run during SSR.
- Never access `window`, `document`, `localStorage`, `matchMedia`, `IntersectionObserver`, `ResizeObserver`, fullscreen APIs, or DOM constructors during SSR.
- Browser-only setup should normally happen inside `onMount`.
- Browser-only teardown in `onDestroy` must also be guarded with `browser` if it touches browser globals.

## Styling Rules

- Use Sass, not CSS or SCSS, for component styles and style files.
- Use old indented `.sass` syntax.
- Use tabs for Sass indentation.
- Match the existing project classes and design vocabulary before adding new styling systems.
- Do not add Tailwind as an assumption. If imported code uses Tailwind-style classes, translate the needed styles into local Sass or existing project utilities.

## Routes And Shell Gotchas

- Quote bracketed SvelteKit route paths in shell commands, for example `'src/routes/blog/[post]/+page.ts'`.
- Dynamic content routes commonly load local Markdown with `import.meta.glob` or dynamic `import`.
- Supabase-backed pages should be treated differently from local Markdown/JSON pages; prerendering them freezes database data until redeploy.

## Data And Content Patterns

- Blog, lab, research, inspiration, big-questions, docs, core, and journal-archaeology content is mostly local Markdown.
- Open Library and graph/ontology data often comes from `src/lib/serving`, `src/lib/data`, `src/lib/graph`, and `src/lib/noder`.
- The archaeology journal related-article map lives at `src/lib/data/arch-parent.json`.
- Avoid duplicating generated JSON beside routes when a canonical data file already exists.

## Verification

- Run `npm run check` after Svelte/TypeScript changes when feasible.
- Run `npm run build` when SSR/prerender/browser-boundary behavior is touched.
- Existing warnings may appear; report them separately from new errors.
- If validating UI behavior, use the actual dev server port in the session rather than assuming Vite's default.
- For visual/browser behavior, prefer browser verification when available.

## Code Quality Bias

- Keep implementations simple and readable.
- Avoid adding broad configurability before there is a real caller need.
- Remove imports/variables/functions made unused by your own changes.
- Do not delete pre-existing unused code unless explicitly asked.
- If a change could affect SSR, hydration, or build output, verify mechanically.
