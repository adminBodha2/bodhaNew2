<script lang="ts">
	import type { PageData } from './$types';
	import Container from '$lib/comps/container.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Parallax from '$lib/comps/parallaxfull.svelte';
	import { absoluteImage, absoluteUrl, collectionPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';

	let { data }: { data: PageData } = $props();

	let questions = $derived(data.questions ?? []);

	const title = 'Bodha — Big Questions';
	const metaDescription = 'Hindu consciousness is awakening across the nation. Bodha aids this process by asking provocative questions about the most fundamental problems and open questions that Hindu society faces today — issues that are not settled, perennially asked by every Hindu generation, and novel dilemmas of our time.';
	const metaUrl = absoluteUrl('/big-questions');
	const metaImage = absoluteImage('/images/key-bigquestions.webp');

	let jsonld = $derived(
		stringifyJsonLd(
			collectionPageJsonLd({
				name: title,
				description: metaDescription,
				url: metaUrl,
				image: metaImage,
				items: questions.map((question) => ({
					name: question.meta.title,
					description: question.meta.description,
					url: question.linkpath
				}))
			})
		)
	);
</script>


<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="1536" imHeight="1024" {jsonld} />

<Parallax imageLink="/images/key-bigquestions.webp" isClass="is50" />
<Container narrow={true} scaled={true}>
	<div class="stdbox padded">
		<Crumb item1="Bodha" item1Link="/" showT={true} title="Big Questions" showD={true} desc={metaDescription} />
		<div class="grid two tightrows reading-block">
			<div class="textbox">
				<p class="highlight-text">Hindu society today sits at the cusp of great change. Hindu consciousness is awakening across the nation and awareness of civilizational issues is rising. Established mentalities about Hindu society, dharma, and culture are being challenged, status quos are being quashed, and new paradigms are coming into force. An intellectual renaissance is underway.</p>
				<p class="highlight-text">Bodha wants to aid the process by asking provocative questions about some of the most fundamental problems and open questions that Hindu society faces today. There are issues that are not settled, questions that are perennially asked by every Hindu generation, and novel dilemmas that we face today.</p>
			</div>
			<p class="highlight-text">
				In our Big Question series, we will ask one significant question every year at Bodha, and go to great scholars, activists, thinkers, leaders and stakeholders of Hindu cultural renaissance. Their answers will be compiled and published as a book with an introduction about the question, and the problem that it addresses. By this, at Bodha, we intend to initiate great intellectual churn in
				Hindu society, leading to narrative building which will aid the reestablishment of a correct Hindu worldview rooted in facts and history.
			</p>
		</div>
		{#if questions && questions.length > 0}
			<div class="grid two white-grid of-questions">
				{#each questions as item, i}
					<a class="blank labelbox q-item card-padded more whitestone popping" href={item.linkpath}>
						<div class="row ycenter width100 cgap8">
							<img class="icon" src={item.meta.image} alt={item.meta.title} />
							<p class="card-title w500">{i + 1} - {item.meta.title}</p>
						</div>
						<div class="onhover">
							<p class="grey small-text">{item.meta.description}</p>
						</div>
					</a>
				{/each}
			</div>
		{/if}
	</div>
</Container>

<style lang="sass">

.reading-block
	background: var(--color-white)
	border: var(--border-main)
	padding: 1.2rem
	@media screen and (min-width: 1025px)
		padding: 2rem

.q-item img
	width: 24px
	height: 24px
	object-fit: cover
	filter: saturate(0) opacity(0.6)
	@media screen and (max-width: 1024px)
		margin-right: auto

.q-item
	&:hover
		img
			filter: saturate(1) opacity(1)

</style>
