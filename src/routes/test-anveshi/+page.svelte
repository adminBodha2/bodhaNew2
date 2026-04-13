<script lang="ts">

	import { onMount } from 'svelte';
	import Container from '$lib/comps/container.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Parallax from '$lib/comps/parallaxfull.svelte';
	import Title from '$lib/comps/page-title.svelte'
	import Card from '$lib/comps/card-comp.svelte'
	import { allSchools, allThinkers } from '$lib/utils/localpulls'
	import { metaTitle, metaDescription, metaUrl, metaImage } from '$lib/utils/metastores';

	let schools:any
	let thinkers:any

	$metaTitle = 'Bodha - Inspiration';
	$metaDescription =
		'The primary thinkers and schools of thought we are inspired by.';
	$metaUrl = 'https://www.bodharesearch.in/inspiration';
	$metaImage = '/images/key-inspiration.webp';

	onMount(() => {
		(async() => {
			schools = await allSchools();
			thinkers = await allThinkers();
		})();
	})
</script>

<Head
	title={$metaTitle}
	metaDescription={$metaDescription}
	metaUrl={$metaUrl}
	metaImage={$metaImage}
></Head>

<Parallax imageLink="/images/key-inspiration.webp" />
<Container narrow={true}>
	<div class="box-2" id="first">
		<div class="column rgap8">
		<h4 class="source-serif thin"><i>"The human mind, in its progress, marches knowledge to knowledge, renews and enlarges previous knowledge- often obscured or overlaid, seizes on old imperfect clues and is led by them to new discoveries."</i></h4>
		<p class="sm grey"> - Sri Aurobindo</p>
		</div>
		<div class="grid two stacked-4816">
			<h6 class="thin source-serif">
				No work emerges in isolation. Every idea, method, and conviction is shaped by a longer continuum of thought—by thinkers who asked difficult questions, and by traditions that refined ways of seeing the world. Here we gather the thinkers and schools of thought that have informed our approach. Some are ancient, some modern; some are philosophical, others scientific or cultural. Not all of them agree with each other. That is part of the point.
			</h6>
			<h6 class="thin source-serif">
				We do not treat these as authorities to be followed uncritically, but as companions in inquiry - each offering tools, perspectives, and provocations that continue to shape how we think and build. You are invited to explore it the same way we do - by tracing connections, noticing tensions, and forming your own understanding of what endures, what evolves, and what remains unresolved.
			</h6>
		</div>
	</div>
	{#if schools && schools.length > 0}
	<div class="box-2">
		<Title text="Schools of Thought"/>
		<div class="grid four stay2 stacked16">
			{#each schools as item}
				<a class="blank screen" href={item.linkpath} style="background-image: url({item.meta.image})">
					<div class="column rgap16 in-screen xcenter ta-c mleft">
							<p class="white tight big bold">{item.meta.title}</p>
					</div>
				</a>
			{/each}
		</div>
	</div>
	{/if}
	{#if thinkers && thinkers.length > 0}
	<div class="box-2">
		<Title text="Thinkers"/>
		<div class="grid four stay2 stacked16">
			{#each thinkers as item}
				<a class="blank screen" href={item.linkpath} style="background-image: url({item.meta.image})">
					<div class="column rgap16 in-screen xcenter ta-c mleft">
							<p class="white tight big bold">{item.meta.title}</p>
					</div>
				</a>
			{/each}
		</div>
	</div>
	{/if}
</Container>

<style lang="sass">

.screen
	background-position: center center
	background-size: cover
	border-radius: 8px
	overflow: hidden
	height: 240px
	width: 100%
	.in-screen
		height: 100%
		width: 100%
		background: linear-gradient(180deg,rgba(18, 18, 18, 0) 29%, rgba(18, 18, 18, 0.91) 100%)
		justify-content: flex-end
		padding: 1rem
		transition: all 0.2s ease
	&:hover
		.in-screen
			background: linear-gradient(180deg,rgba(18, 18, 18, 0) 29%, rgba(18, 18, 18, 0.41) 100%)
			padding: 1rem 1rem 2rem 1rem
			backdrop-filter: saturate(150%)
			-webkit-backdrop-filter: saturate(150%)
	@media screen and (min-width: 1025px)
		height: 280px
			

#first
	min-height: 50vh
	justify-content: center

</style>
