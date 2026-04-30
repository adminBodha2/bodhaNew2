<script lang="ts">

	import type { PageData } from './$types';
	import autoAnimate from '@formkit/auto-animate';
	import Container from '$lib/comps/container.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import { absoluteImage, absoluteUrl, collectionPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';

	let { data }: { data: PageData } = $props();

function nodeHref(node: { id: string; meta?: { route?: string } }) {
  return node.meta?.route || `/explorer/${encodeURIComponent(node.id)}`;
}

	const title = 'Knowledge Explorer | Bodha';
	const metaDescription = 'Explore articles, texts, thinkers, schools, and questions across the Bodha knowledge base.';
	const metaUrl = absoluteUrl('/explorer');
	const metaImage = absoluteImage('/images/bodhacover.png');

	const tabs = ['Blog', 'External', 'Books', 'Questions', 'Research', 'Thinkers', 'Schools', 'Lab'];
	let active = $state(0);

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
<div class="stdbox padded-ontop thisbox">
	<div class="explorer-heading">
		<Crumb item1="Bodha" item1Link="/" showT={true} title="Explorer" showD={true} desc="One-stop explorer for all content and ideas on our website - essays, research projects, books - everything."/>
	</div>
		<div class="section-tray">
			{#each tabs as tab, i}
				<button class="tray-btn item" class:active={active === i} onclick={() => (active = i)}>{tab}</button>
			{/each}
				<a class="tray-btn item" href="/explorer/graph">View Graph</a>
		</div>
	<div class="grid white-grid four thisgrid" use:autoAnimate>
		{#if active === 0}
	 	{#each data.grouped.blogs as node, i (node.id)}
		<a class="labelbox whitestone tight-padded blank" href={nodeHref(node)}>
    	<p class="tight">{node.title}</p>
		<p class="small-text grey tight">{node.description}</p>
		{#if node.tags && node.tags.length > 0}
			<div class="row wrap cgap4 self-bottom">
					{#each node.tags as tag}
						<p class="tag-pill hollow themed tt-u">{tag.replaceAll('-',' ')}</p>
					{/each}
			</div>
		{/if}
		</a>
  		{/each}	
		{:else if active === 1}
	 	{#each data.grouped.externalArticles as node, i (node.id)}
		<a class="labelbox whitestone tight-padded blank" href={nodeHref(node)} target="_blank" rel="noreferrer">
    	<p class="tight">{node.title}</p>
		<p class="small-text grey tight">{node.description}</p>
		{#if node.tags && node.tags.length > 0}
			<div class="row wrap cgap4 self-bottom">
					{#each node.tags as tag}
						<p class="tag-pill hollow themed tt-u">{tag.replaceAll('-',' ')}</p>
					{/each}
			</div>
		{/if}
		</a>
  		{/each}
		{:else if active === 2}
	 	{#each data.grouped.books as node (node.id)}
		<a class="labelbox whitestone tight-padded blank" href={nodeHref(node)}>
    	<p class="tight">{node.title}</p>
		<p class="small-text grey tight">{node.description}</p>
		{#if node.tags && node.tags.length > 0}
			<div class="row wrap cgap4 self-bottom">
					{#each node.tags as tag}
						<p class="tag-pill hollow themed tt-u">{tag.replaceAll('-',' ')}</p>
					{/each}
			</div>
		{/if}
		</a>
  		{/each}
		{:else if active === 3}
	 	{#each data.grouped.questions as node (node.id)}
		<a class="labelbox whitestone tight-padded blank" href={nodeHref(node)}>
    	<p class="tight">{node.title}</p>
		<p class="small-text grey tight">{node.description}</p>
		{#if node.tags && node.tags.length > 0}
			<div class="row wrap cgap4 self-bottom">
					{#each node.tags as tag}
						<p class="tag-pill hollow themed tt-u">{tag.replaceAll('-',' ')}</p>
					{/each}
			</div>
		{/if}
		</a>
  		{/each}
		{:else if active === 4}
	 	{#each data.grouped.projects as node (node.id)}
		<a class="labelbox whitestone tight-padded blank" href={nodeHref(node)}>
    	<p class="tight">{node.title}</p>
		<p class="small-text grey tight">{node.description}</p>
		{#if node.tags && node.tags.length > 0}
			<div class="row wrap cgap4 self-bottom">
					{#each node.tags as tag}
						<p class="tag-pill hollow themed tt-u">{tag.replaceAll('-',' ')}</p>
					{/each}
			</div>
		{/if}
		</a>
  		{/each}
		{:else if active === 5}
	 	{#each data.grouped.thinkers as node (node.id)}
		<a class="labelbox whitestone tight-padded blank" href={nodeHref(node)}>
    	<p class="tight">{node.title}</p>
		<p class="small-text grey tight">{node.description}</p>
		{#if node.tags && node.tags.length > 0}
			<div class="row wrap cgap4 self-bottom">
					{#each node.tags as tag}
						<p class="tag-pill hollow themed tt-u">{tag.replaceAll('-',' ')}</p>
					{/each}
			</div>
		{/if}
		</a>
  		{/each}
		{:else if active === 6}
	 	{#each data.grouped.schools as node (node.id)}
		<a class="labelbox whitestone tight-padded blank" href={nodeHref(node)}>
    	<p class="tight">{node.title}</p>
		<p class="small-text grey tight">{node.description}</p>
		{#if node.tags && node.tags.length > 0}
			<div class="row wrap cgap4 self-bottom">
					{#each node.tags as tag}
						<p class="tag-pill hollow themed tt-u">{tag.replaceAll('-',' ')}</p>
					{/each}
			</div>
		{/if}
		</a>
  		{/each}
		{:else if active === 7}
	 	{#each data.grouped.labs as node (node.id)}
		<a class="labelbox whitestone tight-padded blank" href={nodeHref(node)}>
    	<p class="tight">{node.title}</p>
		<p class="small-text grey tight">{node.description}</p>
		{#if node.tags && node.tags.length > 0}
			<div class="row wrap cgap4 self-bottom">
					{#each node.tags as tag}
						<p class="tag-pill hollow themed tt-u">{tag.replaceAll('-',' ')}</p>
					{/each}
			</div>
		{/if}
		</a>
  		{/each}
		{/if}
	</div>
</div>
</Container>


<style lang="sass">

.thisbox
	min-height: 80vh

.section-tray
	display: grid
	grid-template-columns: 1fr 1fr
	border: var(--border-dark)
	background: var(--color-grey-1)
	gap: 1px
	border-radius: 5px
	overflow: visible
	.tray-btn
		grid-column: span 1
		background: #FFFFFF
		border: 1px solid var(--color-back)
		padding: 12px 20px
		font-size: 1rem
		box-shadow: 0 1px 0 rgba(0,0,0,0.03), 0 2px 10px rgba(0,0,0,0.04), 0 4px 4px rgba(0,0,0,0.06)
		&:first-child
			border-radius: 5px 5px 0 0
		&:last-child
			border-radius: 0 0 5px 0
		&:nth-last-child(2)
			border-radius: 0 0 0 5px
		&:hover
			background: var(--color-theme-5)
			border: 1px solid var(--color-theme-5)
			box-shadow: none
		&.active
			background: linear-gradient(158.19deg, #1971C2 10.95%, #0C365C 85.73%)
			border: 1px solid var(--color-theme)
			color: var(--color-back)
	@media screen and (min-width: 1025px)
		display: flex
		flex-direction: row
		width: max-content
		.tray-btn
			background: var(--color-back)
			border: 1px solid var(--color-back)
			padding: 12px 20px
			font-size: 1rem
			box-shadow: 0 1px 0 rgba(0,0,0,0.03), 0 2px 10px rgba(0,0,0,0.04), 0 4px 4px rgba(0,0,0,0.06)
			&:first-child
				border-radius: 5px 0 0 5px
			&:last-child
				border-radius: 0 5px 5px 0
			&:nth-last-child(2)
				border-radius: 0
			&:active
				transform: scale(1.05)

</style>
