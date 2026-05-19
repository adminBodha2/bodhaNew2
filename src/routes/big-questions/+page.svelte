<script lang="ts">
	import type { PageData } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Title from '$lib/comps/page-title.svelte';
	import Parallax from '$lib/comps/parallaxhalf.svelte';
	import { absoluteImage, absoluteUrl, collectionPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';

	let { data }: { data: PageData } = $props();

	let questions = $derived(data.questions ?? []);

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

<Container>
	<Parallax imageLink="/images/key-bigquestions.webp" wipe={true} />
	<section class="box wrapper-std first-box rgap32">
		<Crumb showT={true} title="Big Questions" showD={true} desc={metaDescription} />
		<div class="grid grid-cols-1 lg:grid-cols-2 rgap16 cgap32">
			<div class="box rgap16">
				<p class="highlight-text">Hindu society today sits at the cusp of great change. Hindu consciousness is awakening across the nation and awareness of civilizational issues is rising. Established mentalities about Hindu society, dharma, and culture are being challenged, status quos are being quashed, and new paradigms are coming into force. An intellectual renaissance is underway.</p>
				<p class="highlight-text">Bodha wants to aid the process by asking provocative questions about some of the most fundamental problems and open questions that Hindu society faces today. There are issues that are not settled, questions that are perennially asked by every Hindu generation, and novel dilemmas that we face today.</p>
			</div>
			<p class="highlight-text">
				In our Big Question series, we will ask one significant question every year at Bodha, and go to great scholars, activists, thinkers, leaders and stakeholders of Hindu cultural renaissance. Their answers will be compiled and published as a book with an introduction about the question, and the problem that it addresses. By this, at Bodha, we intend to initiate great intellectual churn in
				Hindu society, leading to narrative building which will aid the reestablishment of a correct Hindu worldview rooted in facts and history.
			</p>
		</div>
	</section>
	<section class="box wrapper-std growingline rgap32 md:rgap64">
		<Title text="Big Question 2026" />
		<div class="grid grid-cols-1 lg:grid-cols-2 rgap16 cgap16 bq26box sm:p24 radius lg:ptop32 lg:pbot32">
			<div class="box down rgap32">
				<div class="mid-shelf rgap16 box">
					<h2 class="txt-3xl lg:txt-4xl source-serif lh11 ls004m">Is Hindu Unity Compatible With Indian Diversity?</h2>
					<p class="highlight-text pbot8">For 2026, the Big Question we are tackling is, in a sense, the question of India vs. Bharata. Can Hindus unite without flattening the diversity that defines India? Are unity and diversity complementary, or in fundamental tension?</p>
					<a class="primary black" href="/big-questions/hindu-unity-and-diversity">
						<span>Read More →</span>
					</a>
				</div>
				<div class="bot-shelf box rgap16">
					<p class="txt-lg lh14 grey2">This Big Question 2026 is made possible by the generous support of Shri Hari Kiran Vadlamani, the founder of <a class="linked" target="_blank" rel="noreferrer" href="https://cohari.org/">coHari</a>. We are grateful to him for his patronage.</p>
					<img class="shri-hari-kiran-vadlamani" src="/images/shri-hari-kiran-vadlamani.webp" alt="shri-hari-kiran-vadlamani" />
				</div>
			</div>
			<a class="blank box up" href="/big-questions/hindu-unity-and-diversity">
				<img class="fitted herocard radius4" src="/images/questions/current-big-question.webp" alt="Is Hindu Unity Compatible With Indian Diversity" />
			</a>
		</div>
	</section>

	<section class="box wrapper-std growingline alternate rgap48 md:rgap64">
		<Title text="All Big Questions" />
		{#if questions && questions.length > 0}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap16">
				{#each questions as item, i}
					<div class="box glass-1 p8">
						<a class="p8 blank" href={item.linkpath}>
							<img class="fitted landscape radius4" src={item.meta.icon} alt={item.meta.title} />
						</a>
						<a class="onhover box rgap16 p16 blank" href={item.linkpath}>
							<p class="txt-xl lg:txt-2xl w600 a-hover">{item.meta.title}</p>
							<p class="grey1 txt-lg">{item.meta.description}</p>
						</a>
						{#if item.meta.tags}
							<div class="row wrap cgap4 rgap4 p16 bordertop self-bottom">
								{#each item.meta.tags as tag}
									<a class="txt-xs w500 tt-u theme" href="/concepts/{tag}">#{tag.replaceAll('-', ' ')}</a>
								{/each}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	</section>
</Container>

<style lang="sass">

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
