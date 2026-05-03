<script lang="ts">
	import type { PageData } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Title from '$lib/comps/page-title.svelte'
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
<Container>
	<div class="stdbox stdpad is-first">
		<Crumb showT={true} title="Big Questions" showD={true} desc={metaDescription} />
		<div class="grid two tightrows reading-block">
			<div class="textbox">
				<p class="paragraph-text">Hindu society today sits at the cusp of great change. Hindu consciousness is awakening across the nation and awareness of civilizational issues is rising. Established mentalities about Hindu society, dharma, and culture are being challenged, status quos are being quashed, and new paradigms are coming into force. An intellectual renaissance is underway.</p>
				<p class="paragraph-text">Bodha wants to aid the process by asking provocative questions about some of the most fundamental problems and open questions that Hindu society faces today. There are issues that are not settled, questions that are perennially asked by every Hindu generation, and novel dilemmas that we face today.</p>
			</div>
			<p class="paragraph-text">
				In our Big Question series, we will ask one significant question every year at Bodha, and go to great scholars, activists, thinkers, leaders and stakeholders of Hindu cultural renaissance. Their answers will be compiled and published as a book with an introduction about the question, and the problem that it addresses. By this, at Bodha, we intend to initiate great intellectual churn in
				Hindu society, leading to narrative building which will aid the reestablishment of a correct Hindu worldview rooted in facts and history.
			</p>
		</div>
	</div>
	<!--
	<div class="stdbox stdpad bordertop">
			<div class="labelbox card-padded and-bordered">
			<p class="bold badger">The Big Question in 2026</p>
			<div class="questionbox row mcol rgap8 cgap8">
				<img class="icon" src="/images/bgicons/diversity.png" alt="big-question icon"/>
				<p class="headline">Is Hindu Unity Compatible With Indian Diversity?</p>
			</div>
			<p class="paragraph-text ptop8">For 2026, the Big Question we are tackling is, in a sense, the question of India vs. Bharata. Can Hindus unite without flattening the diversity that defines India? Are unity and diversity complementary, or in fundamental tension?</p>
			</div>
	</div>
	-->
	<div class="stdbox stdpad bordertop is-last">
		<Title text="All Big Questions"/>
		{#if questions && questions.length > 0}
			<div class="grid  three tight of-questions">
				{#each questions as item, i}
					<div class="blank labelbox q-item glass-inset">
						<a class="q-imager blank" href={item.linkpath}>
							<img src={item.meta.icon} alt={item.meta.title}/>
						</a>
						<a class="onhover labelbox blank" href={item.linkpath}>
							<h2 class="source-serif">{item.meta.title}</h2>
							<p class="grey descriptor-text">{item.meta.description}</p>
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

img.icon
	object-fit: contain
	width: 32px
	height: 32px

.badger
	background: var(--color-know-2)
	width: max-content
	padding: 0.5rem 1rem
	border: var(--border-dark)

.questionbox
	background: var(--color-know)
	padding: 1rem
	border: 1px solid #d7d7d7
	p
		font-weight: bold
		font-size: 1.33rem

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
