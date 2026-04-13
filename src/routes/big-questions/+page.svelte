<script lang="ts">

	import { onMount, tick } from 'svelte';
	import autoAnimate from '@formkit/auto-animate';
	import { allQuestions } from '$lib/utils/localpulls';
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

	let questions:any
	let ready = false;
	let activeIndex:number | null = null

	function showItem(index:number | null) {
		activeIndex = index
	}

	onMount(() => {
		(async() => {
			questions = await allQuestions();
			await tick();
			ready = true;
		})();
	})

</script>

<Head
	title={$metaTitle}
	metaDescription={$metaDescription}
	metaUrl={$metaUrl}
	metaImage={$metaImage}
></Head>

<Parallax imageLink="/images/key-bigquestions.webp" />
<Container narrow={true}>
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
			<Title text="The Big Questions"/>
			<div class="row wrap cgap8 rgap8">
				<button class="ftnbtn" on:click={() => showItem(null)} class:active={activeIndex === null}>All</button>
				{#each questions as _, i}
					<button class="ftnbtn" on:click={() => showItem(i)} class:active={activeIndex === i}>{i + 1}</button>
				{/each}
			</div>
		</div>
		{#if questions && questions.length > 0}
			<div class="column rgap32 slider-box ptop32" use:autoAnimate>
				{#each questions as item, i}
				{#if activeIndex === null || activeIndex === i}
				<div class="grid two right stacked-4816 emgrid question">
					<div class="column rgap24 down pbot16">
						<div class="row mwrap ycenter cgap8 rgap16">
							<img class="icon" src={item.meta.image} alt={item.meta.title}/>
							<h4 class="source-serif tight">{item.meta.id} - {item.meta.title}</h4>
						</div>
						<article class="classic-document borderbot pbot16">
							<svelte:component this={item.content}/>
						</article>
					</div>
					<div class="column up back-screen" style="background-image: url({item.meta.icon})">
						<div class="in-screen column xleft rgap16">
							<p class="white sm">{item.meta.description}</p>
							<div class="row wrap rgap8 ycenter cgap8">
								{#each item.meta.tags as tag}
								<small class="label light white tt-u">{tag.replaceAll('-', ' ')}</small>
								{/each}
							</div>
						</div>
					</div>
				</div>
				{/if}
				{/each}
			</div>
		{/if}
	</div>
</Container>

<style lang="sass">

.back-screen
	background-position: center center
	background-size: cover
	border-radius: 8px
	height: 400px
	overflow: hidden
	&:hover
		.in-screen
			opacity: 0
	.in-screen
		transition: all 0.15s ease
		background: linear-gradient(360deg,rgba(18, 18, 18, 0) 1%, rgba(18, 18, 18, 0.5) 59%, rgba(18, 18, 18, 0.7) 81%, rgba(18, 18, 18, 0.95) 100%)
		height: 100%
		width: 100%
		position: relative
		top: 0
		left: 0
		padding: 1rem
		@media screen and (max-width: 1024px)
			justify-content: flex-end
			background: linear-gradient(180deg,rgba(18, 18, 18, 0) 1%, rgba(18, 18, 18, 0.6) 59%, rgba(18, 18, 18, 0.78) 81%, rgba(18, 18, 18, 0.89) 100%)
	@media screen and (min-width: 1025px)
		height: 100%

#first
	min-height: 50vh
	justify-content: center

.question
	border-radius: 8px
	overflow: hidden
	.down
		@media screen and (min-width: 1025px)
			padding: 0.2rem
		@media screen and (max-width: 1024px)
			padding: 1rem
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
		height: 36px
		width: 36px
	@media screen and (max-width: 1024px)
		height: 32px
		width: 32px

</style>
