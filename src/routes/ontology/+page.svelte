<script lang="ts">
	import type { PageData } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
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
	<section class="box wrapper-std rgap32 header-margin">
		<div class="ontology-head">
			<Crumb showT={true} title="Ontology" showD={true} desc={metaDescription} />
			<div class="stats-grid">
				<div class="box stonecard p16">
					<p class="citation grey tt-u">Vargas</p>
					<p class="tight">{data.ontology.length}</p>
				</div>
				<div class="box stonecard p16">s
					<p class="citation grey tt-u">Classified Links</p>
					<p class="tight">{totalNodes}</p>
				</div>
			</div>
		</div>
		<div class="varga-grid grid cgap4 rgap4">
			{#each data.ontology as item (item.varga.id)}
				<a class="blank box rgap8 ncolor-inv b-main p16 lg:p24 radius" href={`/ontology/${item.varga.slug}`}>
					<p class="paragraph-text w600 a-hover tight">{item.varga.title}</p>
					<p class="grey tight">{item.varga.description}</p>
					{#if item.concepts.length > 0}
						<p class="tag-text altprim tt-u tight">
							{item.concepts.slice(0, 4).map((concept) => concept.title).join(', ')}
						</p>
					{/if}
					<div class="row wrap ycenter cgap8 rgap8 self-bottom">
						<p class="tag-pill tt-u hollow themed dead">{item.varga.tags.length} concepts</p>
						<p class="tag-pill tt-u hollow themed dead">{item.content.length} nodes</p>
					</div>
				</a>
			{/each}
		</div>
	</section>
</Container>

<style lang="sass">

	.ontology-head
		display: grid
		grid-template-columns: 1fr
		gap: 1.5rem
		@media screen and (min-width: 900px)
			grid-template-columns: minmax(0, 1fr) 320px
			align-items: start

	.stats-grid
		display: grid
		grid-template-columns: 1fr 1fr
		gap: 1px
		background: var(--color-grey-0)

	.varga-grid
		display: grid
		grid-template-columns: 1fr 1fr
		@media screen and (min-width: 721px)
			grid-template-columns: repeat(2, minmax(0, 1fr))
		@media screen and (min-width: 1024px)
			grid-template-columns: repeat(3, minmax(0, 1fr))
		@media screen and (min-width: 1201px)
			grid-template-columns: repeat(4, minmax(0, 1fr))


</style>
