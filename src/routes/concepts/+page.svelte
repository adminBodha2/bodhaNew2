<script lang="ts">
	import type { PageData } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import KnowledgeGraph from '$lib/comps/knowledgegraph.svelte';
	import Title from '$lib/comps/page-title.svelte';
	import { absoluteImage, absoluteUrl, collectionPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';

	let { data }: { data: PageData } = $props();

	const title = 'Concepts and Ideas | Bodha';
	const metaDescription = 'Top-level domains of thought across the Bodha knowledge base, each leading to essays, books, thinkers, questions, and research nodes.';
	const metaUrl = absoluteUrl('/concepts');
	const metaImage = absoluteImage('/images/bodhacover.png');

	let jsonld = $derived(
		stringifyJsonLd(
			collectionPageJsonLd({
				name: title,
				description: metaDescription,
				url: metaUrl,
				image: metaImage,
				items: data.topLevelConcepts.map((concept) => ({
					name: concept.title,
					url: `/concepts/${concept.slug}`
				}))
			})
		)
	);
</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="2560" imHeight="1440" {jsonld} />

<Container graphing={true}>
	<section class="box wrapper-std rgap32 header-margin">
		<Crumb showT={true} title="Concepts" showD={true} desc="Concepts are the main domains of thought across the knowledge base. Each one leads to the essays, books, thinkers, questions, and research nodes gathered under that domain." />
		<KnowledgeGraph nodes={data.conceptGraph.nodes} edges={data.conceptGraph.edges} featuredNodeIds={data.topLevelConcepts.map((concept) => concept.id)} maxNodes={520} maxLinks={900} />
	</section>
	<section class="box wrapper-std lg:rgap64 rgap32 growingline">
		<Title text="Explore Concepts" />
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 rgap8 lg:rgap16 cgap16">
			{#each data.topLevelConcepts as concept (concept.id)}
				<a class="blank box rgap8 p16 b-main radius" href={`/concepts/${concept.slug}`}>
					<p class="body-text w600 tight">{concept.title}</p>
					<div class="row cgap4 rgap4 wrap ycenter">
						<span class="cite hollow tt-u green">{concept.count} Nodes</span>
						{#if concept.childCount > 0}
							<span class="cite hollow tt-u">{concept.childCount} | Subdomains</span>
						{/if}
					</div>
				</a>
			{/each}
		</div>
	</section>
</Container>
