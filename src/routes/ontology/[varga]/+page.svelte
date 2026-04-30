<script lang="ts">
	import type { PageData } from './$types';
	import '$lib/styles/lab2.sass';
	import Container from '$lib/comps/container.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import { absoluteImage, absoluteUrl, collectionPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';

	let { data }: { data: PageData } = $props();

	const title = $derived(data.ontology.varga.title + ' | Ontology | Bodha');
	const metaDescription = $derived(data.ontology.varga.description || 'Bodha ontology varga page.');
	const metaUrl = $derived(absoluteUrl(`/ontology/${data.ontology.varga.slug}`));
	const metaImage = absoluteImage('/images/bodhacover.png');

	const countEntries = $derived(Object.entries(data.ontology.counts).sort(([a], [b]) => a.localeCompare(b)));

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

<Container narrow={true} scaled={true}>
	<section class="documents-grid ontology-page">
		<div class="box sidearea nopad">
			<div class="labelbox all-items">
				{#each data.allVargas as item}
					<a class="blank project-link whitestone" class:active={item.slug === data.ontology.varga.slug} href={`/ontology/${item.slug}`}>
						<p class="tight grey rem1">{item.title}</p>
					</a>
				{/each}
			</div>
		</div>

		<div class="box mainarea">
			<div class="textbox borderbot">
				<Crumb rgap={16} item1="Ontology" item1Link="/ontology" showT={true} title={data.ontology.varga.title} showD={true} desc={data.ontology.varga.description} showRow={true}>
				<div class="row wrap cgap8 rgap8">
					{#each countEntries as [type, count]}
						<p class="tag-pill tt-u">{type.replaceAll('-', ' ')}: {count}</p>
					{/each}
				</div>
				</Crumb>
			</div>
				<div class="box ptop16">
					<p class="tag-text grey tt-u">Matched Concepts</p>
					<div class="row wrap cgap8 rgap8">
						{#each data.ontology.concepts as concept (concept.id)}
							<a class="tag-pill tt-u blank" href={`/concepts/${concept.slug}`}>{concept.title}</a>
						{/each}
					</div>
				</div>
			<div class="ontology-section">
				<div class="box">
					<p class="tag-text grey tt-u">Related Nodes</p>
				</div>
				<div class="node-grid">
					{#each data.ontology.content as item (item.node.id)}
						<a
							class="blank labelbox whitestone card-padded node-card"
							href={item.href}
							target={item.isExternal ? '_blank' : undefined}
							rel={item.isExternal ? 'noreferrer' : undefined}
						>
							<div class="row wrap ycenter cgap8 rgap8">
								<p class="tag-pill tt-u">{item.node.type.replaceAll('-', ' ')}</p>
								<p class="tag-pill tt-u">{Math.round(item.classification.confidence * 100)}%</p>
							</div>
							<p class="w500 tight">{item.node.title}</p>
							<p class="small-text blue tight">{item.classification.reason}</p>
							{#if item.node.description}
								<p class="small-text grey tight">{item.node.description}</p>
							{/if}
						</a>
					{/each}
				</div>
			</div>
		</div>
	</section>
</Container>

<style lang="sass">

	.all-items
		@media screen and (min-width: 1025px)
			overflow-y: scroll
			height: calc(100vh - 144px)

	.ontology-page
		margin-top: 80px

	a.project-link.active
		p
			color: var(--color-primary)

	.ontology-section
		border-bottom: var(--border-main)
		padding-top: 2rem
		padding-bottom: 2rem
		display: flex
		flex-direction: column
		row-gap: 1rem

	.node-grid
		display: grid
		grid-template-columns: 1fr
		gap: 1px
		background: var(--color-grey-1)
		border: var(--border-main)
		@media screen and (min-width: 760px)
			grid-template-columns: repeat(2, minmax(0, 1fr))

	.node-card
		min-height: 100%
</style>
