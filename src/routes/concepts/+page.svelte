<script lang="ts">
	import type { PageData } from './$types';
	import Container from '$lib/comps/container.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
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

<Container narrow={true} scaled={true}>
	<div class="stdbox padded-ontop">
		<Crumb item1="Bodha" item1Link="/" showT={true} title="Concepts" showD={true} desc="Concepts are the main domains of thought across the knowledge base. Each one leads to the essays, books, thinkers, questions, and research nodes gathered under that domain."/>
			<div class="grid three white-grid">
					{#each data.topLevelConcepts as concept (concept.id)}
						<a class="blank labelbox whitestone card-padded" href={`/concepts/${concept.slug}`}>
							<p class="highlight-text w500 tight">{concept.title}</p>
							<div class="row wrap ycenter">
								<p class="tag-pill tt-u">{concept.count} nodes</p>
								{#if concept.childCount > 0}
									<p class="tag-pill tt-u">{concept.childCount} subdomains</p>
								{/if}
							</div>
	
						</a>
					{/each}
				</div>
	</div>
</Container>

