<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/state';
	import Container from '$lib/comps/container.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import { absoluteImage, absoluteUrl, collectionPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';

	let { data }: { data: PageData } = $props();

	function nodeHref(node: { id: string }) {
		return `/explorer/${encodeURIComponent(node.id)}`;
	}

	let grouped = $derived(data.grouped);
	let description = $derived(data.concept.description || `Texts, thinkers, and ideas connected to ${data.concept.title}.`);
	let isAK = $derived(data.concept.slug.startsWith('ak-'));

	let title = $derived(data.concept.title + ' | Bodha Concepts');
	let metaDescription = $derived(description);
	let metaUrl = $derived(absoluteUrl(page.url.pathname));
	const metaImage = absoluteImage('/images/bodhacover.png');

	let jsonld = $derived(
		stringifyJsonLd(
			collectionPageJsonLd({
				name: title,
				description: metaDescription,
				url: metaUrl,
				image: metaImage,
				items: Object.values(data.grouped)
					.flat()
					.map((node) => ({
						name: node.title,
						url: node.slug ? `/${node.slug}` : metaUrl
					}))
			})
		)
	);
</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="2560" imHeight="1440" {jsonld} />
<Container narrow={true} scaled={true}>
	<div class="stdbox padded-ontop">
		<Crumb item1="Bodha" item1Link="/" show2={true} item2="Concepts" item2linked={true} item2Link="/concepts" showT={true} title={data.concept.title} showD={true} desc={description} />
		{#if data.parents.length}
			<p class="small-text">Part of</p>
			<div class="grid three">
				{#each data.parents as parent (parent.id)}
					<p><a href={`/concepts/${parent.slug}`}>{parent.title}</a></p>
				{/each}
			</div>
		{/if}
		{#if data.children.length}
			<p class="small-text">Subconcepts</p>
			<div class="grid three">
				{#each data.children as child (child.id)}
					<p><a href={`/concepts/${child.slug}`}>{child.title}</a></p>
				{/each}
			</div>
		{/if}
		{#if data.relatedConcepts.length}
			<div class="grid three tight bordertop">
				{#each data.relatedConcepts as concept (concept.id)}
					<p><a href={`/concepts/${concept.slug}`}>{concept.title}</a></p>
				{/each}
			</div>
		{/if}
		{#if data.akVargas.length}
			<div class="grid three tight">
				{#each data.akVargas as varga (varga.id)}
					<p>
						<a href={`/explorer/${encodeURIComponent(varga.id)}`}>
							{varga.title}
						</a>
					</p>
				{/each}
			</div>
		{/if}
		{#if data.grouped.blogs.length}
			<div class="grid three white-grid">
				{#each data.grouped.blogs as node (node.id)}
					<p><a href={nodeHref(node)}>{node.title}</a></p>
				{/each}
			</div>
		{/if}
		{#if data.grouped.books.length}
			<div class="grid three white-grid">
				{#each data.grouped.books as node (node.id)}
					<p><a href={nodeHref(node)}>{node.title}</a></p>
				{/each}
			</div>
		{/if}
		{#if data.grouped.questions.length}
			<div class="grid three white-grid">
				{#each data.grouped.questions as node (node.id)}
					<p><a href={nodeHref(node)}>{node.title}</a></p>
				{/each}
			</div>
		{/if}
		{#if data.grouped.projects.length}
			<div class="grid three white-grid">
				{#each data.grouped.projects as node (node.id)}
					<p><a href={nodeHref(node)}>{node.title}</a></p>
				{/each}
			</div>
		{/if}
		{#if data.grouped.thinkers.length}
			<div class="grid three white-grid">
				{#each data.grouped.thinkers as node (node.id)}
					<p><a href={nodeHref(node)}>{node.title}</a></p>
				{/each}
			</div>
		{/if}
		{#if data.grouped.schools.length}
			<div class="grid three white-grid">
				{#each data.grouped.schools as node (node.id)}
					<p><a href={nodeHref(node)}>{node.title}</a></p>
				{/each}
			</div>
		{/if}
		{#if data.grouped.labs.length}
			<div class="grid three white-grid">
				{#each data.grouped.labs as node (node.id)}
					<p><a href={nodeHref(node)}>{node.title}</a></p>
				{/each}
			</div>
		{/if}
		{#if data.grouped.externalArticles.length}
			<div class="grid three white-grid">
				{#each data.grouped.externalArticles as node (node.id)}
					<p><a href={nodeHref(node)}>{node.title}</a></p>
				{/each}
			</div>
		{/if}
	</div>
</Container>
