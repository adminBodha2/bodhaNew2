<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/state';
	import Container from '$lib/comps/container.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import NodeMiniCard from '$lib/nodeitems/NodeMiniCard.svelte';
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
				items: Object.values(data.grouped).flat().map((node) => ({
          			name: node.title,
          			url: node.slug ? `/${node.slug}` : metaUrl
        		}))
			})
		)
	);
</script>

<Head
	{title}
	{metaDescription}
	{metaUrl}
	{metaImage}
	imWidth="2560"
	imHeight="1440"
	{jsonld}
/>

<Container narrow={true} scaled={true}>
<div class="stdbox padded-ontop">
	<Crumb item1="Bodha" item1Link="/" show2={true} item2="Concepts" item2linked={true} item2Link="/concepts" showT={true} title={data.concept.title} showD={true} desc={description}/>
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
	<!--
	<div class="amarakosha">
		<div class="row ycenter cgap8">
			{#if isAK}
				<span class="ak-badge tt-u">Amarakośa Domain</span>
			{:else}
				<span class="concept-badge tt-u">Concept</span>
			{/if}
			{#if totalContent > 0}
				<span class="meta-hint">{totalContent} connected items</span>
			{/if}
		</div>
		{#if isAK && data.concept.meta?.devanagari}
			<div class="ak-meta row ycenter cgap12">
				<span class="ak-devanagari">{data.concept.meta.devanagari}</span>
				<span class="ak-divider">·</span>
				<span class="ak-iast">{data.concept.meta.iast}</span>
				{#if data.concept.meta?.wordCount}
					<span class="ak-wordcount">{data.concept.meta.wordCount} words in Amarakośa</span>
				{/if}
			</div>
		{/if}
	</div>
	{#if data.relatedConcepts && data.relatedConcepts.length > 0}
	<div class="section-block">
		<p class="eyebrow tt-u">Related Concepts — {data.relatedConcepts.length}</p>
		<div class="mini-grid">
			{#each data.relatedConcepts as node (node.id)}
				<NodeMiniCard {node} />
			{/each}
		</div>
	</div>
	{/if}
	-->
</div>
</Container>

<style lang="sass">

.ak-meta
	flex-wrap: wrap

.ak-devanagari
	font-size: 1rem
	font-family: var(--fontface-serif)
	color: #74C0FC

.ak-divider
	color: #DDD

.ak-iast
	font-size: 0.82rem
	color: #ACACAC
	font-style: italic

.ak-wordcount
	font-size: 0.72rem
	color: var(--text-ghost)
	padding: 2px 8px
	border-radius: 100px
	border: 1px solid rgba(0,0,0,0.07)
	background: #F9F8F6

// ── SECTIONS ───────────────────────────────────────────────

.empty-state
	padding-top: 3rem
	text-align: center

</style>
