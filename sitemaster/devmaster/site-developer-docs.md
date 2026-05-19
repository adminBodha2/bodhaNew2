---
title: Site Developer Docs
---

# Site Developer Docs

This document is the starting developer map for the Bodha SvelteKit site. It begins with the core config files and the root route files, because these define how the app is compiled, typed, themed, rendered, and populated on the home page.

Current stack assumptions:

- SvelteKit 2 with Svelte 5 runes mode.
- TypeScript for new application code.
- Indented `.sass` for styles.
- mdsvex for Markdown-backed pages.
- Vercel as the deployment adapter.

## Core Config Files

### `svelte.config.js`

This is the main SvelteKit configuration file.

```js
import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md']
		})
	],
	extensions: ['.svelte', '.md', '.svx'],
	kit: {
		adapter: adapter()
	}
};
```

The important parts:

- `adapter-vercel` makes the project deploy as a Vercel SvelteKit app.
- `vitePreprocess()` enables normal Vite/Svelte preprocessing. This matters for TypeScript, Sass, and other language features used inside Svelte files.
- `mdsvex({ extensions: ['.md'] })` lets Markdown files be compiled as Svelte components.
- `extensions: ['.svelte', '.md', '.svx']` tells SvelteKit to treat these extensions as component-like route files.

Developer notes:

- Because `.md` is compiled by mdsvex, Markdown pages can contain Svelte syntax, frontmatter, components, and normal Markdown.
- Keep fenced code blocks fenced. Unfenced Svelte syntax in Markdown may be parsed as live component code.
- Broken frontmatter or invalid mdsvex syntax can break route rendering at build time or during SSR.
- If adding Markdown documentation pages, prefer simple frontmatter:

```md
---
title: Page Title
---
```

### `tsconfig.json`

The TypeScript config extends SvelteKit's generated config.

```json
{
	"extends": "./.svelte-kit/tsconfig.json",
	"compilerOptions": {
		"rewriteRelativeImportExtensions": true,
		"allowJs": true,
		"checkJs": true,
		"esModuleInterop": true,
		"forceConsistentCasingInFileNames": true,
		"resolveJsonModule": true,
		"skipLibCheck": true,
		"sourceMap": true,
		"strict": true,
		"moduleResolution": "bundler"
	}
}
```

The important parts:

- `extends: "./.svelte-kit/tsconfig.json"` means route types, `$lib`, generated `$types`, and SvelteKit internals come from SvelteKit's generated config.
- `strict: true` keeps TypeScript strict across the project.
- `moduleResolution: "bundler"` matches Vite's module resolution behavior.
- `resolveJsonModule: true` allows typed-ish imports from JSON data files.
- `allowJs: true` and `checkJs: true` allow JavaScript files to remain in the repo while still being checked.
- `rewriteRelativeImportExtensions: true` supports modern TypeScript import-extension rewriting.

Developer notes:

- New code should still be TypeScript, even though JavaScript is allowed.
- Route data types should usually come from generated SvelteKit types, for example:

```ts
import type { PageData } from './$types';
```

- JSON imports are expected in this codebase, especially in data-heavy areas under `src/lib/data`, `src/lib/serving`, and related utilities.
- If route or app types seem stale, restart the dev server or rerun SvelteKit type generation through `npm run check`.

### `vite.config.ts`

The Vite config is intentionally minimal.

```ts
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()]
});
```

The important parts:

- The app currently uses only the SvelteKit Vite plugin.
- There are no custom aliases, Rollup options, test configuration, or extra Vite plugins here.

Developer notes:

- Prefer SvelteKit-native configuration before adding Vite-level custom behavior.
- `$lib` is handled by SvelteKit, not by a custom alias in this file.
- If a new plugin is added here, document why it belongs at the Vite layer and what build/runtime behavior it changes.

## Root Layout

### `src/routes/+layout.svelte`

The root layout wraps every page of the site. It owns global styles, app shell structure, analytics injection, theme classes, viewport state, keyboard search, and page transition behavior.

High-level structure:

```svelte
<div class="app-box" class:light={!$darkTheme} class:dark={$darkTheme} class:mobile={$iW} class:desk={!$iW}>
	<header class="row ycenter" class:reader-hidden={$readerChromeHidden}>
		<Header />
	</header>
	<main>
		{@render children?.()}
	</main>
	<footer class="column">
		<Bottom />
	</footer>
	<SearchModal />
</div>
```

The root layout imports the global style stack:

```ts
import '$lib/styles/vars.sass';
import '$lib/styles/fontimports.sass';
import '$lib/styles/measures.sass';
import '$lib/styles/globals.sass';
import '$lib/styles/components.sass';
import '$lib/styles/typography.sass';
import '$lib/styles/animations.sass';
import '$lib/styles/glass.sass';
import '$lib/styles/icons.css';
```

These files establish the global CSS variables, fonts, layout utilities, component classes, typography, animations, glass styles, and icon styling used throughout the app.

The layout imports these global stores:

```ts
import { darkTheme, iW, searchState, readerChromeHidden } from '$lib/utils/globalstores';
```

Store responsibilities:

- `darkTheme`: controls whether the root `.app-box` gets `light` or `dark`.
- `iW`: stores whether the viewport is currently mobile/tablet width.
- `searchState`: controls global search modal visibility.
- `readerChromeHidden`: controls whether the header is hidden in clean reading contexts, such as long blog posts.

Viewport state is updated from the root layout:

```svelte
<svelte:window bind:scrollY={sY} bind:innerWidth={width} onkeydown={handleKeydown} />
```

```ts
let sY = $state(0);
let width = $state(0);

$effect(() => {
	$iW = width < 1025;
});
```

Developer notes:

- `iW` is derived from a `1025px` breakpoint. Layout code elsewhere should treat this as the site's current mobile/desktop split unless the design system changes.
- `sY` is currently used by the layout for page transition decisions and may also be relevant when coordinating chrome behavior.
- Because `svelte:window` only exists in the browser, this pattern avoids direct SSR access to `window` during initial render.

The global search shortcut lives here:

```ts
function handleKeydown(e: KeyboardEvent) {
	if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
		e.preventDefault();
		$searchState = !$searchState;
	}
}
```

This makes `Cmd+K` on macOS and `Ctrl+K` on Windows/Linux toggle the global search modal.

Analytics are injected globally:

```ts
injectSpeedInsights();
injectAnalytics({ mode: dev ? 'development' : 'production' });
```

The layout also sets the favicon and Google tag script in `svelte:head`.

Page transitions are handled through SvelteKit's `onNavigate` hook and the browser View Transitions API:

```ts
onNavigate((navigation) => {
	if (!document.startViewTransition) return;
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
	if (navigation.from?.url.pathname === navigation.to?.url.pathname) return;

	return new Promise((resolve) => {
		document.startViewTransition(async () => {
			resolve(undefined);
			await navigation.complete;
		});
	});
});
```

Behavior:

- Skips transitions if the browser does not support `document.startViewTransition`.
- Respects `prefers-reduced-motion`.
- Skips same-path navigation.
- Lets route changes transition consistently regardless of scroll position. Global view-transition styling in the root layout controls the motion.

SSR note:

- `onNavigate` is a client-side navigation hook, so the direct `document` and `window` access here is acceptable in this context.
- In normal component setup code, do not access `document` or `window` without a browser guard. Use:

```ts
import { browser } from '$app/environment';
```

The header is sticky and overlays the top of the page:

```sass
header
	position: sticky
	top: 0
	z-index: 999
	transition: box-shadow 100ms cubic-bezier(0.665, 0.010, 0.795, 0.655), top 310ms cubic-bezier(0.000, 0.000, 0.580, 1.000)
	@media screen and (min-width: 1025px)
		height: 80px
		margin-bottom: -80px
		&.reader-hidden
			top: -80px
	@media screen and (max-width: 1024px)
		height: 64px
		margin-bottom: -64px
		&.reader-hidden
			top: -64px
```

Developer notes:

- Desktop header height is `80px`.
- Mobile/tablet header height is `64px`.
- Negative `margin-bottom` lets page content sit visually behind/under the header.
- `reader-hidden` moves the sticky header out of view without unmounting it.
- If another fixed element needs to align with the header, it should account for these two header heights and the `readerChromeHidden` state.

## Root Home Page Loader

### `src/routes/+page.ts`

The root page load function fetches the data needed by the home page.

```ts
import { limitBlog } from '$lib/utils/localpulls';
import { sixVideos } from '$lib/utils/supabaseClient';

export async function load() {
	const [blogs, vids] = await Promise.all([
		limitBlog(),
		sixVideos()
	]);

	return {
		blogs,
		vids
	};
}
```

Data sources:

- `limitBlog()` pulls the limited set of recent blog entries for the home page.
- `sixVideos()` pulls recent videos from Supabase.

Behavior:

- Both calls run in parallel with `Promise.all`.
- The returned `blogs` and `vids` become `data.blogs` and `data.vids` in `+page.svelte`.

Developer notes:

- The home page is not purely static data. It combines local blog content with remote Supabase video data.
- If this route is prerendered, the video list will be captured at build time and will not update until the next deploy.
- If `sixVideos()` depends on private environment variables or server-only logic, keep that logic inside server-safe utility boundaries.

## Root Home Page Component

### `src/routes/+page.svelte`

The root page component renders the public home page.

It uses generated route data types:

```ts
import type { PageData } from './$types';

let { data }: { data: PageData } = $props();

let blogs = $derived(data.blogs ?? []);
let vids = $derived(data.vids ?? []);
```

Svelte 5 notes:

- Props are read with `$props()`.
- Derived display data uses `$derived(...)`.
- New work in this project should follow this runes-mode style.

SEO is set near the top of the file:

```ts
const title = 'Bodha - Cultural Think Tank';
const metaDescription = 'Bodha is a think tank and research group focused on contemporary issues of cultural concern, to inform core areas of policy with wisdom derived from Hindu traditions.';
const metaUrl = SITE_URL;
const metaImage = DEFAULT_IMAGE;

const jsonld = stringifyJsonLd([organizationJsonLd(), websiteJsonLd()]);
```

The page renders SEO through:

```svelte
<Head {title} {metaDescription} {metaImage} {metaUrl} {jsonld} />
```

Main sections:

- Hero image through `Parallax`.
- Intro panel with Bodha positioning copy.
- Four vertical cards from `verticals`.
- Recent essays/articles from `blogs`.
- Publications from `publications`.
- Recent videos from `vids`.

Primary imports:

```ts
import Container from '$lib/comps/container.svelte';
import Head from '$lib/comps/headcomponent.svelte';
import Parallax from '$lib/comps/parallaxfull.svelte';
import Title from '$lib/comps/page-title.svelte';
import Navigator from '$lib/comps/navigator.svelte';
import VideoPlayer from '$lib/comps/custom-video-player.svelte';
import { verticals, publications } from '$lib/utils/localsends';
```

The hero image is:

```svelte
<Parallax imageLink="/images/heroimage2.webp" isClass="is100" />
```

The intro vertical cards come from `verticals`:

```svelte
{#each verticals as item}
	<a class="elembox blank verticals anim-flyIn" href={item.href}>
		<div class="imgbox"><img src={item.image} alt={item.title} /></div>
		<div class="labelbox">
			<h2 class="card-title source-serif">{item.title}</h2>
			<p class="small-text grey">{item.desc}</p>
		</div>
	</a>
{/each}
```

Blog cards render only when the loader returns at least one blog:

```svelte
{#if blogs.length > 0}
	<!-- recent essays/articles -->
{/if}
```

Each blog item is expected to provide:

- `item.linkpath`
- `item.formattedDate`
- `item.meta.title`
- `item.meta.excerpt`
- `item.meta.image`
- `item.meta.author`
- `item.meta.words`
- `item.meta.tags`

Publication cards come from the local `publications` export. Each publication is expected to provide:

- `pub.image`
- `pub.title`
- `pub.desc`
- `pub.links`

Video cards render only when videos exist:

```svelte
{#if vids.length > 0}
	<!-- recent videos -->
{/if}
```

Each video item is expected to provide:

- `item.videoid`
- `item.name`
- `item.link`
- `item.channel`

The video player receives the YouTube video id directly:

```svelte
<VideoPlayer videoId={item.videoid} title={item.name} loop />
```

Developer notes:

- `VideoPlayer` expects a YouTube video id, not a full YouTube URL.
- `title` should be meaningful for accessibility and iframe metadata.
- By default it renders a poster and creates the YouTube iframe only after play; use `lazy={false}` for eager loading or `loadOnVisible` to preload near the viewport.
- The surrounding footer link points to the original video URL in a new tab.
- The page intentionally avoids rendering empty sections by wrapping blog and video sections in length checks.

Styling:

- The page uses local `<style lang="sass">` with indented Sass syntax.
- It relies heavily on global utility classes such as `stdbox`, `padded`, `grid`, `box`, `row`, `ycenter`, `source-serif`, and color/text utility classes.
- Section-specific classes include `post-card`, `imgbox`, `home-panel`, `verticals`, `books`, `publication-image`, `video-grid`, `video-card`, and `video-footer`.

When editing this page:

- Keep Svelte 5 runes mode.
- Keep new styles in indented `.sass`.
- Avoid direct browser globals in setup code unless guarded with `browser`.
- Preserve the empty-section checks for data that can fail or return an empty array.
- Run `npm run check` after route, TypeScript, or mdsvex changes.

## current checklist
- fix SEO
- standard final styling
- playwright setup