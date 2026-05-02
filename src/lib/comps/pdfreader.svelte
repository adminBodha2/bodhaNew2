<script lang="ts">
	import { usePdfiumEngine } from '@embedpdf/engines/svelte';
	import { EmbedPDF } from '@embedpdf/core/svelte';
	import { createPluginRegistration } from '@embedpdf/core';
	import { SpreadPluginPackage, useSpread, SpreadMode } from '@embedpdf/plugin-spread/svelte';
	import { RotatePluginPackage, useRotate, Rotate } from '@embedpdf/plugin-rotate/svelte';
	import { DocumentManagerPluginPackage, DocumentContent } from '@embedpdf/plugin-document-manager/svelte';
	import { ViewportPluginPackage, Viewport } from '@embedpdf/plugin-viewport/svelte';
	import { ScrollPluginPackage, Scroller, ScrollStrategy, useScroll, type RenderPageProps } from '@embedpdf/plugin-scroll/svelte';
	import { RenderPluginPackage, RenderLayer } from '@embedpdf/plugin-render/svelte';
	import { ZoomPluginPackage, useZoom, ZoomMode, ZoomGestureWrapper } from '@embedpdf/plugin-zoom/svelte';
	import Prev from '$lib/icons/pdf/prev.svelte'
	import Next from '$lib/icons/pdf/next.svelte'
	import Zoomin from '$lib/icons/pdf/zoomin.svelte'
	import Zoomout from '$lib/icons/pdf/zoomout.svelte'
	import Double from '$lib/icons/pdf/double.svelte'
	import External from '$lib/icons/pdf/external.svelte'
	import Focus from '$lib/icons/pdf/focus.svelte'
	import Full from '$lib/icons/pdf/full.svelte'
	import Horizontal from '$lib/icons/pdf/horizontal.svelte'
	import Single from '$lib/icons/pdf/single.svelte'
	import Vertical from '$lib/icons/pdf/vertical.svelte'

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

	let scrollStrategy = $state(ScrollStrategy.Vertical);

	function setStrategy(scroll: ReturnType<typeof useScroll>, strategy: ScrollStrategy) {
		scrollStrategy = strategy;
		scroll.provides?.setScrollStrategy(strategy);
	}

	const pdfUrl = $derived(src);

	const engine = usePdfiumEngine();

	const plugins = $derived([
		createPluginRegistration(DocumentManagerPluginPackage, {
			initialDocuments: [{ url: pdfUrl }]
		}),
		createPluginRegistration(ViewportPluginPackage),
		createPluginRegistration(ScrollPluginPackage, {
			defaultStrategy: ScrollStrategy.Vertical,
			defaultPageGap: 24
		}),
		createPluginRegistration(RenderPluginPackage),
		createPluginRegistration(ZoomPluginPackage, {
			defaultZoomLevel: ZoomMode.FitPage,
			minZoom: 0.4,
			maxZoom: 4
		}),
		createPluginRegistration(SpreadPluginPackage, {
			defaultSpreadMode: SpreadMode.None
		}),
		createPluginRegistration(RotatePluginPackage)
	]);

</script>

{#snippet Toolbar(docId: string)}
	{@const scroll = useScroll(() => docId)}
	{@const zoom = useZoom(() => docId)}
	{@const spread = useSpread(() => docId)}
	<div class="toolbar">
		<div class="row ycenter cgap4 tray1">
			<button class="pdf-btn" onclick={() => scroll.provides?.scrollToPreviousPage()}><Prev/></button>
			<p class="tag-text">{scroll.state.currentPage} / {scroll.state.totalPages}</p>
			<button class="pdf-btn" onclick={() => scroll.provides?.scrollToNextPage()}><Next/></button>
		</div>
		<div class="row ycenter cgap4 tray2">
			<button class="pdf-btn" onclick={() => zoom.provides?.zoomOut()}><Zoomout/></button>
			<p class="tag-text">{Math.round(zoom.state.currentZoomLevel * 100)}%</p>
			<button class="pdf-btn" onclick={() => zoom.provides?.zoomIn()}><Zoomin/></button>
		</div>
		<div class="row ycenter cgap8 tray3">
			<button class="pdf-btn" onclick={() => zoom.provides?.requestZoom(1)}><Focus/></button>
			<button class="pdf-btn" onclick={() => spread.provides?.setSpreadMode(SpreadMode.None)}><Single/></button>
			<button class="pdf-btn" onclick={() => spread.provides?.setSpreadMode(SpreadMode.Odd)}><Double/></button>
			<button class="pdf-btn" onclick={() => setStrategy(scroll, ScrollStrategy.Vertical)}><Vertical/></button>
			<button class="pdf-btn" onclick={() => setStrategy(scroll, ScrollStrategy.Horizontal)}><Horizontal/></button>
			<button class="pdf-btn" onclick={() => document.querySelector('.reader')?.requestFullscreen()}><Full/></button>
		<a class="pdf-btn" href={pdfUrl} target="_blank" rel="noreferrer"><External/></a>
		</div>
	</div>
{/snippet}
{#snippet SetInitialZoom(docId: string)}
	{@const zoom = useZoom(() => docId)}
	{#if zoom.provides}
		{@const _ = setTimeout(() => zoom.provides?.requestZoom(1), 0)}
	{/if}
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
								{@render SetInitialZoom(docId)}
								<!-- 👈 ADD HERE -->
								{@render Toolbar(docId)}
								<div class="viewer">
									{#snippet renderPage(page: RenderPageProps)}
										<div class="page" style:width="{page.width}px" style:height="{page.height}px">
											<RenderLayer documentId={docId} pageIndex={page.pageIndex} />
										</div>
									{/snippet}

									<Viewport documentId={docId} class="viewport">
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

.toolbar
	border-bottom: var(--border-dark)
	display: grid
	grid-template-columns: repeat(2, 1-fr)
	justify-content: space-evenly
	background: var(--color-back)
	.tray3
		grid-column: span 2
	@media screen and (min-width: 1025px)
		display: flex
		flex-direction: row
		align-items: center
		justify-content: center
		padding-top: 0.5rem
		padding-bottom: 0.5rem

.pdf-btn
	background: none
	border: none
	display: flex
	align-items: center
	justify-content: center
	padding: 8px
	transform-origin: center center
	&:hover
		transform: scale(0.95)

.reader
	width: 100%
	height: 82vh
	min-height: 600px
	display: flex
	flex-direction: column
	border: 1px solid rgba(0,0,0,0.1)
	border-radius: 4px
	overflow: hidden

.viewer
	flex: 1
	min-height: 0
	width: 100%
	background: var(--color-stone)

:global(.viewport)
	width: 100%
	height: 100%
	overflow: auto

.page
	position: relative
	margin: 0 auto
	background: white
	box-shadow: 0 2px 4px rgba(0,0,0,0.2)

.loading
	height: 100%
	display: grid
	place-items: center
	color: #666

</style>
