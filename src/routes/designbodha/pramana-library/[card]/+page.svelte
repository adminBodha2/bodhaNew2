<script lang="ts">
	import { page } from '$app/state';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import { absoluteImage, absoluteUrl, stringifyJsonLd, webPageJsonLd } from '$lib/utils/seo';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const title = $derived(`${data.title} | Pramana Library | Bodha`);
	const metaDescription = $derived(data.gist);
	const metaUrl = $derived(absoluteUrl(page.url.pathname));
	const metaImage = absoluteImage('/images/designbodha/pramana-library.webp');
	const jsonld = $derived(
		stringifyJsonLd(
			webPageJsonLd({
				name: title,
				description: metaDescription,
				url: metaUrl,
				image: metaImage,
				type: 'WebPage'
			})
		)
	);
</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} ogType="article" {jsonld} />

<Container>
	<section class="wrapper-std tight-stack">
		<Crumb showT={true} title={data.title} showD={true} desc={data.gist} showRow={true}>
			<div class="row mwrap cgap16">
				{#if data.sanskrit?.transliteration && data.sanskrit.devanagari}
					<p class="txt-sm w500 tt-u grey2">{data.sanskrit.transliteration} | {data.sanskrit.devanagari}</p>
				{/if}
				{#if data.register?.tradition}
					<p class="txt-sm w500 tt-u grey2">{data.register.tradition}</p>
				{/if}
				{#if data.applicability.length}
					{#each data.applicability as tag (tag)}
						<p class="txt-sm w500 tt-u grey2">{tag}</p>
					{/each}
				{/if}
			</div>
		</Crumb>
		<div class="card-shell">
			<aside class="box" aria-label="Card metadata">
				{#if data.allcards && data.allcards.length > 0}
					<div class="box stickybox">
					{#each data.allcards as item}
						<a class="sidebar-link grey3" href={item.linkpath}>{item.meta.title}</a>
					{/each}
					</div>
				{/if}
			</aside>
			<div class="main-area">
				<article class="classic-document">
					<data.content />
				</article>
			</div>
		</div>
	</section>
</Container>

<style lang="sass">

.sidebar-link
	transition: all 110ms ease
	padding: 6px 4px
	&:hover
		background: var(--color-grey-0)

.card-shell
	display: grid
	gap: 2rem
	border-bottom: var(--border-dark)
	height: 100%
	aside
		grid-area: aside
	.main-area
		grid-area: mainarea
		padding-top: 2rem
	grid-template-columns: 1fr
	grid-template-areas: "mainarea" "aside"
	@media (max-width: 1024px)
		padding-bottom: 2rem
		.main-area
			border-bottom: var(--border-main)
	@media (min-width: 1025px)
		grid-template-columns: 360px 1fr
		grid-template-areas: "aside mainarea"
		aside
			height: 100%
			.stickybox
				height: calc(100vh - 80px)
				overflow-y: scroll
				position: sticky
				top: 80px
				padding: 2rem 2rem 2rem 0
		.main-area
			padding: 2rem 4rem


</style>
