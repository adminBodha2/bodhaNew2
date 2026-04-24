<script lang="ts">
	import { usePdfiumEngine } from '@embedpdf/engines/svelte';
	import { EmbedPDF } from '@embedpdf/core/svelte';
	import { createPluginRegistration } from '@embedpdf/core';

	import {
		DocumentManagerPluginPackage,
		DocumentContent
	} from '@embedpdf/plugin-document-manager/svelte';

	import {
		ViewportPluginPackage,
		Viewport
	} from '@embedpdf/plugin-viewport/svelte';

	import {
		ScrollPluginPackage,
		Scroller,
		ScrollStrategy,
		useScroll,
		type RenderPageProps
	} from '@embedpdf/plugin-scroll/svelte';

	import {
		RenderPluginPackage,
		RenderLayer
	} from '@embedpdf/plugin-render/svelte';

	import {
		ZoomPluginPackage,
		useZoom,
		ZoomMode,
		ZoomGestureWrapper
	} from '@embedpdf/plugin-zoom/svelte';

	// props
	let {
		src,
		title = 'PDF Reader',
		height = '82vh'
	}: {
		src: string;
		title?: string;
		height?: string;
	} = $props();

	// convert Google Drive → direct PDF
function driveToPdfUrl(url: string) {
	const fileMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
	const idMatch = url.match(/[?&]id=([^&]+)/);

	const id = fileMatch?.[1] || idMatch?.[1];

	if (!id) return url;

	return `https://drive.google.com/uc?export=media&id=${id}`;
}

	const finalSrc = $derived(driveToPdfUrl(src));

	const engine = usePdfiumEngine();

	const plugins = $derived([
		createPluginRegistration(DocumentManagerPluginPackage, {
			initialDocuments: [{ url: finalSrc }]
		}),
		createPluginRegistration(ViewportPluginPackage),
		createPluginRegistration(ScrollPluginPackage, {
			defaultStrategy: ScrollStrategy.Vertical,
			defaultPageGap: 24
		}),
		createPluginRegistration(RenderPluginPackage),
		createPluginRegistration(ZoomPluginPackage, {
			defaultZoomLevel: ZoomMode.FitWidth,
			minZoom: 0.4,
			maxZoom: 4
		})
	]);

$effect(() => {
	console.log('PDF finalSrc:', finalSrc);
});
</script>

{#snippet Toolbar(docId: string)}
	{@const scroll = useScroll(() => docId)}
	{@const zoom = useZoom(() => docId)}

	<div class="toolbar">
		<button onclick={() => scroll.provides?.scrollToPreviousPage()}>
			Prev
		</button>

		<span>
			{scroll.state.currentPage} / {scroll.state.totalPages}
		</span>

		<button onclick={() => scroll.provides?.scrollToNextPage()}>
			Next
		</button>

		<span class="divider"></span>

		<button onclick={() => zoom.provides?.zoomOut()}>−</button>

		<span>
			{Math.round(zoom.state.currentZoomLevel * 100)}%
		</span>

		<button onclick={() => zoom.provides?.zoomIn()}>+</button>

		<button onclick={() => zoom.provides?.requestZoom(ZoomMode.FitWidth)}>
			Fit Width
		</button>

		<button onclick={() => zoom.provides?.requestZoom(ZoomMode.FitPage)}>
			Fit Page
		</button>

		<a href={finalSrc} target="_blank">Open</a>
	</div>
{/snippet}

<section class="reader" style={`height:${height}`}>
	{#if engine.isLoading || !engine.engine}
		<div class="loading">Loading engine…</div>
	{:else if engine.error}
		<div class="loading">Error loading PDF</div>
	{:else}
		<EmbedPDF engine={engine.engine} {plugins}>
			{#snippet children({ activeDocumentId })}
				{#if activeDocumentId}
					{@const docId = activeDocumentId}

					<DocumentContent documentId={docId}>
						{#snippet children(content)}
							{#if content.isLoaded}
								{@render Toolbar(docId)}

								<div class="viewer">
									{#snippet renderPage(page: RenderPageProps)}
										<div
											class="page"
											style:width="{page.width}px"
											style:height="{page.height}px"
										>
											<RenderLayer
												documentId={docId}
												pageIndex={page.pageIndex}
											/>
										</div>
									{/snippet}

									<Viewport documentId={docId}>
										<ZoomGestureWrapper documentId={docId}>
											<Scroller documentId={docId} {renderPage} />
										</ZoomGestureWrapper>
									</Viewport>
								</div>
							{:else}
								<div class="loading">Loading PDF…</div>
							{/if}
						{/snippet}
					</DocumentContent>
				{/if}
			{/snippet}
		</EmbedPDF>
	{/if}
</section>

<style lang="sass">
	.reader
		display: flex
		flex-direction: column
		border: 1px solid rgba(0,0,0,0.1)
		border-radius: 16px
		overflow: hidden

	.toolbar
		display: flex
		gap: 0.5rem
		align-items: center
		padding: 0.6rem
		background: #fff
		border-bottom: 1px solid rgba(0,0,0,0.1)

		button, a
			padding: 0.35rem 0.6rem
			border: 1px solid rgba(0,0,0,0.15)
			border-radius: 999px
			background: #fff
			cursor: pointer
			text-decoration: none

	.divider
		width: 1px
		height: 1.2rem
		background: rgba(0,0,0,0.2)

	.viewer
		flex: 1
		background: #eee

	.page
		margin: 0 auto
		background: white
		box-shadow: 0 8px 24px rgba(0,0,0,0.2)

	.loading
		height: 100%
		display: grid
		place-items: center
		color: #666
</style>