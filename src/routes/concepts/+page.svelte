<script lang="ts">
	import type { PageData } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
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

<Container graphing={true}>
	<div class="stdbox stdpad header-margin is-last">
		<Crumb showT={true} title="Concepts" showD={true} desc="Concepts are the main domains of thought across the knowledge base. Each one leads to the essays, books, thinkers, questions, and research nodes gathered under that domain."/>
			<div class="grid four white-grid">
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

<style lang="sass">

.meta-pill-2
	display: inline-flex
	align-items: stretch
	border: var(--border-darker)
	background: var(--color-alt-2)
	height: 1.5rem
	overflow: hidden
	font-size: 0.78rem
	font-weight: 800
	letter-spacing: 0.045em
	text-transform: uppercase
	line-height: 1
	border-radius: 0.35rem

.meta-pill-2 strong
	display: inline-flex
	align-items: center
	padding: 0 0.4rem
	background: var(--color-primary)
	color: var(--color-back)
	font-weight: 900

.meta-pill-2 span
	display: inline-flex
	align-items: center
	padding: 0 0.4rem
	color: rgba(0, 0, 0, 0.62)

.meta-pill
	display: flex
	flex-direction: row
	align-items: center
	border: var(--border-darker)
	background: linear-gradient(174deg,rgba(92, 92, 92, 0.65) 0%, rgba(26, 26, 26, 0.7) 59%, rgba(28, 28, 28, 0.65) 98%)
	padding: 3px 0.45rem
	font-size: 0.7rem
	line-height: 1.4
	font-weight: 500
	letter-spacing: 0.01rem
	text-transform: uppercase
	border-radius: 0.35rem
	color: #FFFFFF
	transition: all 0.12s var(--cz-easeOutQuint)
	box-shadow: 1px 1px 2px rgba(0,0,0,0.1)
	&:hover
		transform: scale(0.97)
		box-shadow: 1px 1px 2px rgba(0,0,0,0)
	@media screen and (max-width: 1024px)
		font-size: 0.76rem

.meta-pill strong
	font-weight: 850
	color: #000

.meta-pill span
	color: rgba(0, 0, 0, 0.58)

</style>
