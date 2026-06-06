# Standalone Comic Reader Design

## Scope

Build a standalone SvelteKit/Svelte component for reading finished comic page images. It is not tied to any route, content loader, PDF source, panel metadata, or editor workflow.

## Component API

```ts
export type ComicReaderPage = {
	id: string;
	src: string;
	alt?: string;
	aspectRatio?: number;
};

export type ReadingDirection = 'ltr' | 'rtl';
```

```svelte
<ComicReader
	id="reader-id"
	title="Comic title"
	pages={pages}
	pageAspectRatio={2 / 3}
	readingDirection="rtl"
/>
```

## Behavior

- Render finished page images as full pages.
- Support single-page mode and optional two-page spread mode.
- Support RTL and LTR page navigation.
- Provide previous/next controls, keyboard arrows, touch swipe, progress slider, and page counter.
- Provide zoom in, zoom out, reset zoom, and drag-to-pan while zoomed.
- Provide a browser-expanded reader mode without depending on SvelteKit routes.
- Persist progress in `localStorage` when enabled, keyed by the component `id`.

## Non-Goals

- No polygon or rectangle panel layout metadata.
- No panel-by-panel guided reading.
- No in-browser page editor.
- No PDF support.
- No content fetching or route integration.
- No third-party carousel dependency.

## Styling Rules

All component styling must use pure indented Sass with single-tab indentation. Do not use SCSS braces, semicolons, or space-indented Sass.

