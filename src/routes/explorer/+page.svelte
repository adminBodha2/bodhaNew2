<script lang="ts">

	import type { PageData } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Responsive from '$lib/comps/responsive-menu.svelte';
	import autoAnimate from '@formkit/auto-animate';
	import { staggerAnimatePlugin } from '$lib/svelteanim/utils/staggerPlugin';
	import { absoluteImage, absoluteUrl, collectionPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';
	import { nodeHref } from '$lib/wiki-graph';

	let { data }: { data: PageData } = $props();

	const title = 'Knowledge Explorer | Bodha';
	const metaDescription = 'Explore articles, texts, thinkers, schools, and questions across the Bodha knowledge base.';
	const metaUrl = absoluteUrl('/explorer');
	const metaImage = absoluteImage('/images/bodhacover.png');

	const tabs = ['Blog', 'Books', 'Questions', 'Research', 'Thinkers', 'Schools', 'Lab'];
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

<Container>
	<section class="wrapper-std">
		<Crumb showT={true} title="Explorer" showD={true} desc="One-stop explorer for all content and ideas on our website - essays, research projects, books - everything.">
		</Crumb>
		<div class="thisbox box rgap32">
		<Responsive>
				{#each tabs as tab, i}
					<button class="selection-button" class:active={active === i} onclick={() => (active = i)}>{tab}</button>
				{/each}
		</Responsive>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap16" use:autoAnimate={staggerAnimatePlugin({ stagger: 160, duration: 300 })}>
		{#if active === 0}
	 	{#each data.grouped.blogs as node, i (node.id)}
		<a class="box p16 whitestone blank rgap8 b-main" href={nodeHref(node)}>
    		<p class="txt-xl w600 a-hover">{node.title}</p>
			<p class="txt-sm grey2">{node.description}</p>
			{#if node.tags && node.tags.length > 0}
				<div class="row wrap cgap4 self-bottom">
						{#each node.tags as tag}
							<p class="txt-xs tt-u w500 theme">{tag.replaceAll('-',' ')}</p>
						{/each}
				</div>
			{/if}
		</a>
  		{/each}	
		{:else if active === 1}
	 	{#each data.grouped.books as node (node.id)}
		<a class="box p16 whitestone blank rgap8 b-main" href="/library">
    	<p class="txt-xl w600 a-hover">{node.title}</p>
		<p class="txt-sm grey2">{node.description}</p>
		{#if node.tags && node.tags.length > 0}
			<div class="row wrap cgap4 self-bottom">
					{#each node.tags as tag}
						<p class="txt-xs tt-u w500 theme">{tag.replaceAll('-',' ')}</p>
					{/each}
			</div>
		{/if}
		</a>
  		{/each}
		{:else if active === 2}
	 	{#each data.grouped.questions as node (node.id)}
		<a class="box p16 whitestone blank rgap8 b-main" href={nodeHref(node)}>
    	<p class="txt-xl w600 a-hover">{node.title}</p>
		<p class="txt-sm grey2">{node.description}</p>
		</a>
  		{/each}
		{:else if active === 3}
	 	{#each data.grouped.projects as node (node.id)}
		<a class="box p16 whitestone blank rgap8 b-main" href={nodeHref(node)}>
    	<p class="txt-xl w600 a-hover">{node.title}</p>
		<p class="txt-sm grey2">{node.description}</p>
		</a>
  		{/each}
		{:else if active === 4}
	 	{#each data.grouped.thinkers as node (node.id)}
		<a class="box p16 whitestone blank rgap8 b-main" href={nodeHref(node)}>
    	<p class="txt-xl w600 a-hover">{node.title}</p>
		<p class="txt-sm grey2">{node.description}</p>
		</a>
  		{/each}
		{:else if active === 5}
	 	{#each data.grouped.schools as node (node.id)}
		<a class="box p16 whitestone blank rgap8 b-main" href={nodeHref(node)}>
    	<p class="txt-xl w600 a-hover">{node.title}</p>
		<p class="txt-sm grey2">{node.description}</p>
		</a>
  		{/each}
		{:else if active === 6}
	 	{#each data.grouped.labs as node (node.id)}
		<a class="box p16 whitestone blank rgap8 b-main" href={nodeHref(node)}>
    	<p class="txt-xl w600 a-hover">{node.title}</p>
		<p class="txt-sm grey2">{node.description}</p>
		{#if node.tags && node.tags.length > 0}
			<div class="row wrap cgap4 self-bottom">
					{#each node.tags as tag}
						<p class="txt-xs tt-u w500 theme">{tag.replaceAll('-',' ')}</p>
					{/each}
			</div>
		{/if}
		</a>
  		{/each}

		{/if}
		</div>
		</div>
	</section>
</Container>


<style lang="sass">

.thisbox
	min-height: 80vh
	align-items: start
	align-content: start

</style>
