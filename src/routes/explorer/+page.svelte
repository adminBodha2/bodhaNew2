<script lang="ts">
	import type { PageData } from './$types';
	import Container from '$lib/comps/container.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import { absoluteImage, absoluteUrl, collectionPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';

	let { data }: { data: PageData } = $props();

  function hrefFor(node: { id: string }) {
    return `/explorer/${encodeURIComponent(node.id)}`;
  }

	const title = 'Knowledge Explorer | Bodha';
	const metaDescription = 'Explore articles, texts, thinkers, schools, and questions across the Bodha knowledge base.';
	const metaUrl = absoluteUrl('/explorer');
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
	<Crumb item1="Bodha" item1Link="/" showT={true} title="Knowledge Explorer" showD={true} desc="Explore articles, texts, thinkers, schools, and questions across the Bodha knowledge base."/>
	{#if data.grouped.blogs.length}
	<div class="grid white-grid four">
	 	{#each data.grouped.blogs as node (node.id)}
    	<p><a href={hrefFor(node)}>{node.title}</a></p>
  		{/each}
	</div>
	{/if}
	{#if data.grouped.books.length}
	<div class="grid white-grid four">
	 	{#each data.grouped.books as node (node.id)}
    	<p><a href={hrefFor(node)}>{node.title}</a></p>
  		{/each}
	</div>
	{/if}
	{#if data.grouped.questions.length}
	<div class="grid white-grid four">
	 	{#each data.grouped.questions as node (node.id)}
    	<p><a href={hrefFor(node)}>{node.title}</a></p>
  		{/each}
	</div>
	{/if}
	{#if data.grouped.projects.length}
	<div class="grid white-grid four">
	 	{#each data.grouped.projects as node (node.id)}
    	<p><a href={hrefFor(node)}>{node.title}</a></p>
  		{/each}
	</div>
	{/if}
	{#if data.grouped.thinkers.length}
	<div class="grid white-grid four">
	 	{#each data.grouped.thinkers as node (node.id)}
    	<p><a href={hrefFor(node)}>{node.title}</a></p>
  		{/each}
	</div>
	{/if}
	{#if data.grouped.schools.length}
	<div class="grid white-grid four">
	 	{#each data.grouped.schools as node (node.id)}
    	<p><a href={hrefFor(node)}>{node.title}</a></p>
  		{/each}
	</div>
	{/if}
	{#if data.grouped.labs.length}
	<div class="grid white-grid four">
	 	{#each data.grouped.labs as node (node.id)}
    	<p><a href={hrefFor(node)}>{node.title}</a></p>
  		{/each}
	</div>
	{/if}
	{#if data.grouped.externalArticles.length}
	<div class="grid white-grid four">
	 	{#each data.grouped.externalArticles as node (node.id)}
    	<p><a href={hrefFor(node)}>{node.title}</a></p>
  		{/each}
	</div>
	{/if}
</div>
</Container>
