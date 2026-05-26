<script lang="ts">
	import type { PageData } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Title from '$lib/comps/page-title.svelte';
	import Parallax from '$lib/comps/parallaxhalf.svelte';
	import { absoluteImage, absoluteUrl, collectionPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';
	import Reveal from '$lib/svelteanim/components/Reveal.svelte'
	import Blur from '$lib/svelteanim/components/Blur.svelte'
	import { useInView } from '$lib/svelteanim';

	let { data }: { data: PageData } = $props();

	let questions = $derived(data.questions ?? []);
	let ref = $state<HTMLElement | null>(null);
	let ref2 = $state<HTMLElement | null>(null);
	let vis = useInView (() => ref, {threshold: 0.5, once: true});
	let vis2 = useInView (() => ref2, {threshold: 0.9, once: true});

	const title = 'Bodha — Big Questions';
	const metaDescription = "Bodha asks foundational questions facing Hindu society today, from civilizational renewal to Dharma, institutions, culture, and modernity.";
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

	<Parallax imageLink="/images/key-bigquestions.webp" wipe={true} />
<Container>
<Crumb showT={true} title="Big Questions" showD={true} desc={metaDescription} />
	<section class="wrapper-std">
		<div class="grid grid-cols-1 lg:grid-cols-2 rgap16 cgap64" bind:this={ref}>
			<Reveal>
			<div class="box">
				<p class="highlight-text">Hindu society today sits at the cusp of great change. Hindu consciousness is awakening across the nation and awareness of civilizational issues is rising. Established mentalities about Hindu society, dharma, and culture are being challenged, status quos are being quashed, and new paradigms are coming into force. An intellectual renaissance is underway.</p>
				<p class="highlight-text">Bodha wants to aid the process by asking provocative questions about some of the most fundamental problems and open questions that Hindu society faces today. There are issues that are not settled, questions that are perennially asked by every Hindu generation, and novel dilemmas that we face today.</p>
			</div>
			</Reveal>
			<Reveal>
			<p class="highlight-text">
				In our Big Question series, we will ask one significant question every year at Bodha, and go to great scholars, activists, thinkers, leaders and stakeholders of Hindu cultural renaissance. Their answers will be compiled and published as a book with an introduction about the question, and the problem that it addresses. By this, at Bodha, we intend to initiate great intellectual churn in
				Hindu society, leading to narrative building which will aid the reestablishment of a correct Hindu worldview rooted in facts and history.
			</p>
			</Reveal>
		</div>
	</section>
	<section class="wrapper-std growingline">
		<Title text="Big Question 2026" />
		<div class="grid grid-cols-1 lg:grid-cols-2 rgap16 cgap16 bq26box lg:ptop32 lg:pbot32" bind:this={ref2}>
			<Blur visible={vis2.visible}>
			<div class="box down lg:rgap32">
				<div class="mid-shelf rgap16 box sm:p16">
					<h2 class="txt-3xl lg:txt-4xl source-serif lh11 ls004m">Is Hindu Unity Compatible With Indian Diversity?</h2>
					<p class="highlight-text pbot8">For 2026, the Big Question we are tackling is, in a sense, the question of India vs. Bharata. Can Hindus unite without flattening the diversity that defines India? Are unity and diversity complementary, or in fundamental tension?</p>
					<a class="primary black" href="/big-questions/hindu-unity-and-diversity">
						<span>Read More →</span>
					</a>
				</div>
				<div class="bot-shelf box rgap16 sm:p16">
					<p class="txt-lg lh14 grey2">This Big Question 2026 is made possible by the generous support of Shri Hari Kiran Vadlamani, the founder of <a class="linked" target="_blank" rel="noreferrer" href="https://cohari.org/">coHari</a>. We are grateful to him for his patronage.</p>
					<img class="shri-hari-kiran-vadlamani" src="/images/shri-hari-kiran-vadlamani.webp" alt="shri-hari-kiran-vadlamani" />
				</div>
			</div>
			</Blur>
			<Blur visible={vis2.visible} delay={300}>
			<a class="blank box up" href="/big-questions/hindu-unity-and-diversity">
				<img class="fitted herocard" src="/images/questions/current-big-question.webp" alt="Is Hindu Unity Compatible With Indian Diversity" />
			</a>
			</Blur>
		</div>
	</section>
	<section class="wrapper-std growingline alternate">
		<Title text="All Big Questions" />
		{#if questions && questions.length > 0}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 white-grid">
				{#each questions as item, i}
					<div class="box whitecard rgap24 question-holder">
						<a class="blank p8" href={item.linkpath}>
							<img class="question-image fitted landscape" src={item.meta.icon} alt={item.meta.title} />
						</a>
						<a class="onhover box rgap16 px16 pbot32 lg:px32 lg:pbot32 blank" href={item.linkpath}>
							<p class="txt-2xl lg:txt-2xl w600 lh12 a-hover">{item.meta.title}</p>
							<p class="grey2 txt-lg lh14">{item.meta.description}</p>
						</a>
					</div>
				{/each}
			</div>
		{/if}
	</section>
</Container>

<style lang="sass">

.question-holder
	.question-image
		filter: saturate(1%)
		transition: all 280ms ease-in
	&:hover
		.question-image
			filter: saturate(100%)

.bq26box
	@media (min-width: 1025px)
		border-top: var(--border-main)
		border-bottom: var(--border-main)
	@media (max-width: 1024px)
		border: var(--border-main)
		background: var(--color-stone-1)
		.up
			order: 1
		.down
			order: 2

img.shri-hari-kiran-vadlamani
	object-fit: cover
	height: 104px
	width: 104px
	border-radius: 64px

.mid-shelf
	padding-right: 2rem

.bot-shelf
	border-top: var(--border-dark)
	padding-top: 1rem
	padding-right: 1rem

</style>
