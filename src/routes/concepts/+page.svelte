<script lang="ts">
	import type { PageData } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import KnowledgeGraph from '$lib/comps/knowledgegraph.svelte';
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
	<div class="header-margin is-last">
		<Crumb showT={true} title="Concepts" showD={true} desc="Concepts are the main domains of thought across the knowledge base. Each one leads to the essays, books, thinkers, questions, and research nodes gathered under that domain."/>
			<KnowledgeGraph
				nodes={data.conceptGraph.nodes}
				edges={data.conceptGraph.edges}
				featuredNodeIds={data.topLevelConcepts.map((concept) => concept.id)}
				maxNodes={520}
				maxLinks={900}
			/>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 white-grid">
					{#each data.topLevelConcepts as concept (concept.id)}
						<a class="blank labelbox whitestone sm-shadow card-padded more-mob" href={`/concepts/${concept.slug}`}>
							<p class="paragraph-text bold tight">{concept.title}</p>
							<div class="row cgap4 rgap4 wrap ycenter">
								<span class="tag-pill hollow tt-u green">{concept.count} Nodes</span>
								{#if concept.childCount > 0}
									<span class="tag-pill hollow tt-u">{concept.childCount} Subdomains</span>
								{/if}
							</div>
						</a>
					{/each}
				</div>
	</div>
</Container>
