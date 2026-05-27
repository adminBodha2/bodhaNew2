<script lang="ts">
	import type { PageData } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Cut from '$lib/svelteanim/components/Cut.svelte';
	import { absoluteImage, absoluteUrl, collectionPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';

	let { data }: { data: PageData } = $props();

	const title = 'Bodha Ontology | Amarakosha Varga Map for IKS and Dharma Research';
	const metaDescription = 'An Amarakosha-based ontology for Bodha nodes, arranged by varga and linked to essays, books, thinkers, schools, and questions.';
	const metaUrl = absoluteUrl('/ontology');
	const metaImage = absoluteImage('/images/bodhacover.png');

	const totalNodes = $derived(data.ontology.reduce((total, item) => total + item.content.length, 0));

	let jsonld = $derived(
		stringifyJsonLd(
			collectionPageJsonLd({
				name: title,
				description: metaDescription,
				url: metaUrl,
				image: metaImage,
				items: data.ontology.map((item) => ({
					name: item.varga.title,
					description: item.varga.description,
					url: `/ontology/${item.varga.slug}`
				}))
			})
		)
	);
</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="2560" imHeight="1440" {jsonld} />

<Container>
	<section class="wrapper-std">
		<Crumb showT={true} title="Ontology" showD={true} desc={metaDescription} showRow={true}>
		<div class="row gap4">
					<p class="standard-pill">{data.ontology.length} Vargas</p>
					<p class="standard-pill">{totalNodes} Links</p>
			</div>
		</Crumb>
		<p class="txt-xl">Work in progress, incomplete page.</p>
		<Cut targetSelector=".cut-item">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap16">
			{#each data.ontology as item (item.varga.id)}
				<div class="blank box rgap16 b-main std-pad cut-item">
					<p class="txt-xl w600 a-hover">{item.varga.title}</p>
					<p class="grey1">{item.varga.description}</p>
<p class="txt-xs tt-u w500 theme-dark">{item.content.length} nodes</p>
				</div>
			{/each}
		</div>
		</Cut>
	</section>
</Container>
