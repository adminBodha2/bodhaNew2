<script lang="ts">
	import type { PageData } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Heading from '$lib/comps/page-header-one.svelte';
	import { absoluteImage, absoluteUrl, webPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';

	let { data }: { data: PageData } = $props();

	function nodeHref(node: { id: string }) {
		return `/explorer/${encodeURIComponent(node.id)}`;
	}
	function conceptHref(node: { slug: string }) {
		return `/concepts/${node.slug}`;
	}

	let title = $derived(data.node.title + ' | Bodha');
	let metaDescription = $derived(data.node.description ?? 'Explore this node in the Bodha knowledge graph.');
	let metaUrl = $derived(absoluteUrl('/explorer/' + encodeURIComponent(data.node.id)));
	const metaImage = absoluteImage('/images/bodhacover.png');

	let jsonld = $derived(
		stringifyJsonLd(
			webPageJsonLd({
				name: title,
				description: metaDescription,
				url: metaUrl,
				image: metaImage
			})
		)
	);
</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="2560" imHeight="1440" {jsonld} />

<Container>
	<section class="wrapper-std">
		<Crumb showT={true} title={data.node.title} showD={true} desc={data.node.description} />
		<div class="box rgap16">
		<p class="highlight-text">WIP - under construction.</p>
		<a class="theme txt-lg" href="/explorer">← Back to Explorer</a>
		</div>
	</section>
</Container>

<!--
	<div class="box">
		{#if data.node.meta?.author?.length}
			<p class="grey">By {data.node.meta.author.join(', ')}</p>
		{/if}
		{#if data.node.tags}
			<div class="row ycenter wrap cgap8 rgap8 ptop8">
				{#each data.node.tags as tag}
					<a class="tag-pill accented tt-u" href="/tags/{tag}">{tag.replaceAll('-',' ')}</a>
				{/each}
			</div>
		{/if}
	</div>
	<div class="box mainbox">
		{#if data.concepts.length}
			<h4>Concepts</h4>
			<div class="grid grid-cols-2 lg:grid-cols-3 white-grid">
				{#each data.concepts as concept (concept.id)}
					<a class="blank card-padded whitestone" href={conceptHref(concept)}>
						<p class="w500">{concept.title}</p>
					</a>
				{/each}
			</div>
		{/if}
		{#if data.akVargas.length}
			<h4>Ama</h4>
			<div class="grid grid-cols-1 lg:grid-cols-3 cgap16 rgap16">
				{#each data.akVargas as node (node.id)}
					<p><a href={nodeHref(node)}>{node.title}</a></p>
				{/each}
			</div>
		{/if}
		{#if data.related.length}
			<h4>Related</h4>
			<div class="grid grid-cols-1 lg:grid-cols-3 cgap16 rgap16">
				{#each data.related as node (node.id)}
					<p>
						<a href={nodeHref(node)}>{node.title}</a>
					</p>
				{/each}
			</div>
		{/if}
		{#if data.referencedBy.length}
						<h4>Referenced</h4>
			<div class="grid grid-cols-1 lg:grid-cols-3 cgap16 rgap16">
				{#each data.referencedBy as node (node.id)}
					<p><a href={nodeHref(node)}>{node.title}</a></p>
				{/each}
			</div>
		{/if}
	</div>
-->
