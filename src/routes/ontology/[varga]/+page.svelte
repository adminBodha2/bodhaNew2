<script lang="ts">
	import type { PageData } from './$types';
	import '$lib/styles/system/document-layout.sass';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Debugger from '$lib/comps/debugger.svelte'
	import { absoluteImage, absoluteUrl, collectionPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';

	let { data }: { data: PageData } = $props();

	const title = $derived(data.ontology.varga.title + ' | Ontology | Bodha');
	const metaDescription = $derived(data.ontology.varga.description || 'Bodha ontology varga page.');
	const metaUrl = $derived(absoluteUrl(`/ontology/${data.ontology.varga.slug}`));
	const metaImage = absoluteImage('/images/bodhacover.png');

	let jsonld = $derived(
		stringifyJsonLd(
			collectionPageJsonLd({
				name: title,
				description: metaDescription,
				url: metaUrl,
				image: metaImage,
				items: data.ontology.content.map((item) => ({
					name: item.node.title,
					description: item.node.description,
					url: item.href
				}))
			})
		)
	);
</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="2560" imHeight="1440" {jsonld} />

<Container>
	<section class="docgrid scrollside">
		<div class="box docside">
			<div class="doclist">
				{#each data.allVargas as item}
					<a class="doclink sidebar-text" class:active={item.slug === data.ontology.varga.slug} href={`/ontology/${item.slug}`}>
						{item.title}
					</a>
				{/each}
			</div>
		</div>
		<div class="docmain rgap32 box no-image sm:pbot32">
			<div class="title-area">
				<Crumb showT={true} title={data.ontology.varga.title} showD={true} desc={data.ontology.varga.description} showRow={true}>
							{#if data.ontology.concepts && data.ontology.concepts.length > 0}
						<p class="grey pbot8 citation">Related Concepts:</p>
						<div class="row wrap cgap4 rgap4">
					{#each data.ontology.concepts as concept (concept.id)}
						<a class="small-button" href={`/concepts/${concept.slug}`}>{concept.title}</a>
					{/each}
				</div>
							{/if}
				</Crumb>
			</div>
				<div class="grid grid-cols-2 lg:grid-cols-3 cgap4 rgap4">
					{#each data.ontology.content as item (item.node.id)}
						<a
							class="blank box whitestone node-card b-main p16 lg:p24 radius rgap8"
							href={item.href}
							target={item.isExternal ? '_blank' : undefined}
							rel={item.isExternal ? 'noreferrer' : undefined}
						>
							<p class="tag-pill tt-u themed hollow dead">{item.node.type.replaceAll('-', ' ')}</p>
							<p class="paragraph-text w600 a-hover tight">{item.node.title}</p>
							<p class="citation blue tight"># {item.classification.reason}</p>
							{#if item.node.description}
								<p class="grey tight">{item.node.description}</p>
							{/if}
						</a>
					{/each}
				</div>
		</div>
	</section>
</Container>

<style lang="sass">

.node-card
	min-height: 100%

</style>
