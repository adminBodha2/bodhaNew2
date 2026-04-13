<script lang="ts">
	import { onMount, tick } from 'svelte';
	import autoAnimate from '@formkit/auto-animate';
	import { bigQuestions } from '$lib/utils/supabaseClient';
	import Container from '$lib/comps/container.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Parallax from '$lib/comps/parallaxfull.svelte';
	import Title from '$lib/comps/page-title.svelte';
	import { metaTitle, metaDescription, metaUrl, metaImage } from '$lib/utils/metastores';

	$metaTitle = 'Bodha - Big Questions';
	$metaDescription =
		'Big questions that capture core concerns in the contemporary journey of Hindu society.';
	$metaUrl = 'https://www.bodharesearch.in/big-questions';
	$metaImage = '/images/key-bigquestions.webp';

	let projects: any;
	let ready = false;
	let activeIndex: number | null = null; // null = show all

	function showItem(index: number | null) {
	activeIndex = index;
}

	onMount(() => {
		(async () => {
			projects = await bigQuestions();
			await tick();
			ready = true;
		})();
	});
</script>

<Head
	title={$metaTitle}
	metaDescription={$metaDescription}
	metaUrl={$metaUrl}
	metaImage={$metaImage}
></Head>

<Parallax imageLink="/images/key-bigquestions.webp" />
<Container>
	<div class="box-3" id="first">
		<div class="grid two stacked-4816">
			<h6 class="source-serif thin">
				Hindu society today sits at the cusp of great change. Hindu consciousness is awakening
				across the nation and awareness of civilizational issues is rising. Established mentalities
				about Hindu society, dharma, and culture are being challenged, status quos are being
				quashed, and new paradigms are coming into force. An intellectual renaissance is underway.
			</h6>
			<h6 class="source-serif thin">
				Bodha will aid this process by asking provocative questions about some of the most
				fundamental problems and open questions that Hindu society faces today. There are issues
				that are not settled, questions that are perennially asked by every Hindu generation, and
				novel dilemmas that we face today.
			</h6>
		</div>
	</div>
	<div class="box-2">
		<div class="column rgap16">
			<Title text="The Big Questions" />
			<div class="row wrap cgap8 rgap8">
				<button class="ftnbtn" on:click={() => showItem(null)} class:active={activeIndex === null}>All</button>
				<div class="row wrap cgap8 rgap8">
				{#each projects as _, i}
				<button class="ftnbtn" on:click={() => showItem(i)} class:active={activeIndex === i}>
					{i + 1}
				</button>
			{/each}
			</div>
			</div>
		</div>
		{#if projects && projects.length > 0 && ready}
			<div class="column rgap32" use:autoAnimate>
				{#each projects as item, i}
				{#if activeIndex === null || activeIndex === i}
					<div class="grid two right cgap64 emgrid rgap24 question">
						<div class="column rgap16 down pbot16">
							<div class="column rgap16 borderbot pbot16">
								<img class="icon" src={item.icon} alt={item.question} />
								<h4 class="source-serif">{item.id}. {item.question}</h4>
							</div>
							<pre class="big">{item.description}</pre>
						</div>
						<div class="column up">
							<img class="image-fit" src={item.image} alt={item.question} />
						</div>
					</div>
				{/if}
				{/each}
			</div>
		{/if}
	</div>
</Container>

<style lang="sass">

#first
	min-height: 50vh
	justify-content: center

.question
	border: 1px solid var(--grey-sm)
	border-radius: 5px
	.down
		@media screen and (min-width: 1025px)
			padding: 2rem
		@media screen and (max-width: 1024px)
			padding: 1rem

img.image-fit
	object-fit: cover
	object-position: center center
	@media screen and (min-width: 1025px)
		width: 100%
		height: 100%
	@media screen and (max-width: 1024px)
		width: 100%
		height: 240px

.grid.two.emgrid
	@media screen and (max-width: 1024px)
		grid-template-areas: "up" "down"
		.up
			grid-area: up
		.down
			grid-area: down

img.icon
	object-fit: contain
	object-position: center center
	@media screen and (min-width: 1025px)
		height: 56px
		width: 56px
	@media screen and (max-width: 1024px)
		height: 42px
		width: 42px

</style>
