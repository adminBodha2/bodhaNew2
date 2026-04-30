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
			<div class="grid  three tight of-questions">
				{#each questions as item, i}
					<div class="blank labelbox q-item glass-inset">
						<a class="q-imager blank" href={item.linkpath}>
							<img src={item.meta.icon} alt={item.meta.title}/>
						</a>
						<a class="onhover labelbox blank" href={item.linkpath}>
							<h2 class="source-serif">{item.meta.title}</h2>
							<p class="grey small-text">{item.meta.description}</p>
						</a>
							{#if item.meta.tags}
								<div class="row wrap meta">
									{#each item.meta.tags as tag}
										<a class="tag-pill tt-u blank" href="/concepts/{tag}">{tag.replaceAll("-"," ")}</a>
									{/each}
								</div>
							{/if}
					</div>
				{/each}
			</div>
		{/if}
	</div>
</Container>

<style lang="sass">

.reading-block
	background: var(--color-back)

.q-item
	border-radius: 4px
	&:hover
		.q-imager
			img
				filter: grayscale(0.4)
	.q-imager
		height: 240px
		padding: 0.5rem
		img
			filter: grayscale(1)
			object-fit: cover
			width: 100%
			height: 100%
			transition: all 400ms cubic-bezier(0.16, 1, 0.3, 1)
	.onhover
		padding: 0 1rem 0.25rem 1rem
	.meta
		padding: 0.25rem 1rem 1rem 1rem
	@media screen and (min-width: 1025px)
		.q-imager
			padding: 1rem
			height: 320px
		.onhover
			padding: 0 1.5rem 0.25rem 1.5rem
		.meta
			padding: 0.25rem 1.5rem 1.5rem 1.5rem

</style>
