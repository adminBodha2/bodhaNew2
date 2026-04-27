<script lang="ts">
	import type { PageData } from './$types';
	import Container from '$lib/comps/container.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import { absoluteImage, absoluteUrl, collectionPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';

	let { data }: { data: PageData } = $props();

	function conceptHref(slug: string) {
		return `/concepts/${slug}`;
	}

	const title = 'Concepts and Ideas | Bodha';
	const metaDescription = 'Entry point for Bodha’s knowledge base and wiki.';
	const metaUrl = absoluteUrl('/concepts');
	const metaImage = absoluteImage('/images/bodhacover.png');

	let allConcepts = $derived([...data.topLevelConcepts, ...Object.values(data.conceptChildren).flat()]);

	let query = $state('');
	function matches(concept: any, q: string) {
  		const s = q.toLowerCase();
  		return (
    		concept.title.toLowerCase().includes(s) ||
    		concept.slug.toLowerCase().includes(s)
  		);
	}

	let filteredTopLevel = $derived(
  		data.topLevelConcepts.filter((c) => matches(c, query))
	);

	let filteredAll = $derived(
	  data.allConcepts.filter((c) => matches(c, query))
	);

let openIndex = $state<number | null>(null)

function toggleItem(index: number) {
	openIndex = openIndex === index ? null : index
}
	let jsonld = $derived(
		stringifyJsonLd(
			collectionPageJsonLd({
				name: title,
				description: metaDescription,
				url: metaUrl,
				image: metaImage,
				items: allConcepts.map((concept: any) => ({
					name: concept.title,
					url: `/concepts/${concept.slug}`
				}))
			})
		)
	);
</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="2560" imHeight="1440" {jsonld} />

<Container narrow={true} scaled={true}>
	<div class="stdbox padded-ontop">
		<Crumb item1="Bodha" item1Link="/" showT={true} title="Concepts" showD={true} desc="Concepts - Domains of thought across the knowledge base. Each concept connects texts, thinkers, and ideas." />
		<div class="sea">
			<input bind:value={query} placeholder="Search concepts..."/>
		</div>
		<div class="box">
			{#each filteredTopLevel as concept, i (concept.id)}
				{@const children = data.conceptChildren[concept.id] || []}
				{#if concept.title !== "Tags"}
				<button class="blank box xleft" onclick={() => toggleItem(i)}><p class="highlight-text">{concept.title}</p></button>
				{/if}
				{#if children.length && openIndex === i}
					<div class="row wrap cgap8 rgap8">
						{#each children as child (child.id)}
							<p><a href={conceptHref(child.slug)}>{child.title}</a></p>
						{/each}
					</div>
				{/if}
			{/each}
		</div>
		<div class="row wrap cgap8 rgap8">
			{#each filteredAll as concept (concept.id)}
				<a class="blank row" href={`/concepts/${concept.slug}`}>
					<p>{concept.title}</p>
					<p>({concept.count})</p>
				</a>
			{/each}
		</div>
	</div>
</Container>
