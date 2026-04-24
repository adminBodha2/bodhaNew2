<script lang="ts">
	import { onMount, tick } from 'svelte';
	import autoAnimate from '@formkit/auto-animate';
	import { allQuestions } from '$lib/utils/localpulls';
	import Container from '$lib/comps/container.svelte';
	import Heading from '$lib/comps/page-header-one.svelte'
	import Crumb from '$lib/comps/breadcrumb.svelte'
	import Head from '$lib/comps/headcomponent.svelte';
	import Parallax from '$lib/comps/parallaxfull.svelte'
	import { metaTitle, metaDescription, metaUrl, metaImage } from '$lib/utils/metastores';
	import { createTempleNav } from '$lib/utils/templeNav';

	$metaTitle = 'Bodha — Big Questions';
	$metaDescription = 'Hindu consciousness is awakening across the nation. Bodha aids this process by asking provocative questions about the most fundamental problems and open questions that Hindu society faces today — issues that are not settled, perennially asked by every Hindu generation, and novel dilemmas of our time.';
	$metaUrl = 'https://www.bodharesearch.in/big-questions';
	$metaImage = '/images/key-bigquestions.webp';

	let questions: any;
	let ready = false;

	const { selectedTemple, toggleTemple, handleTouchStart, handleTouchEnd } = createTempleNav(
		() => questions,
		() => ready
	);

	onMount(async () => {
		questions = await allQuestions();
		await tick();
		ready = true;
	});
</script>

<Head title={$metaTitle} metaDescription={$metaDescription} metaUrl={$metaUrl} metaImage={$metaImage} />

<Parallax imageLink="/images/key-bigquestions.webp" isClass="is50"/>
<Container narrow={true} scaled={true}>
<Heading title="Big Questions"/>
<div class="stdbox padded">
	<Crumb item1="Bodha" item1Link="/" showT={true} title="Big Questions" showD={true} desc={$metaDescription}/>
	{#if questions && questions.length > 0 && ready}
		<div class="box std" role="region" aria-label="Big Questions" on:touchstart={handleTouchStart} on:touchend={handleTouchEnd}>
		<div class="filter-pagination cgap8 rgap8">
			<button class="filter-button" class:active={$selectedTemple[30]} on:click={() => toggleTemple(30)}>All</button>
			{#each questions as _, i}
			<button class="filter-button" class:active={$selectedTemple[i]} on:click={() => toggleTemple(i)}>{i + 1}</button>
			{/each}
		</div>
		<div class="box std" use:autoAnimate>
			{#each questions as item, i}
			{#if $selectedTemple[30] || $selectedTemple[i]}
			<div class="column question-card">
				<a class="blank row ytop question-head mcol" href={item.linkpath}>
					<img class="q-icon" class:blue={$selectedTemple[i]} src={item.meta.image} alt={item.meta.title} />
					<div class="column" style="gap: 4px">
						<h2 class="card-title">{item.meta.id} — {item.meta.title}</h2>
						<!--
						<a class="q-deeplink linkonhover" href="{item.linkpath}">Read in full →</a>
						-->
					</div>
				</a>
				<div class="grid two question-grid">
					<div class="box question-left">
						<div class="box q-left-text textbox">
						<div class="row wrap cgap8">
							{#each item.meta.tags as tag}
							<a class="tag-pill themed tt-u" href="/tags/{tag}">{tag.replaceAll('-', ' ')}</a>
							{/each}
						</div>
						<p class="small-text grey">{item.meta.description}</p>
						</div>
						<div class="q-image">
							<img src={item.meta.icon} alt={item.meta.title} />
						</div>
					</div>
					<div class="box question-right classic-document">
						<svelte:component this={item.content} />
						<a class="linkedlight" href={item.linkpath}>Explore →</a>
						<!--
						<a class="linkedlight" href="{item.linkpath}">Read in full →</a>
						-->
					</div>
				</div>
			</div>
			{/if}
			{/each}
		</div>
		</div>
	{/if}
</div>

</Container>

<style lang="sass">

.filter-pagination
	display: grid
	grid-template-columns: repeat(5, 1-fr)
	button
		&:first-child
			grid-column: span 5
	@media screen and (min-width: 1025px)
		display: flex
		flex-direction: row

.question-card
	overflow: hidden
	background: #fff
	border-radius: 4px

.question-head
	gap: 1rem
	padding: 1.5rem
	&:hover
		h2
			color: var(--theme)
	@media screen and (max-width: 1024px)
		padding: 0 1.5rem 1.5rem 1.5rem

.question-grid
	border: var(--stroke-subtle)

.q-icon
	width: 40px
	height: 40px
	object-fit: contain
	flex-shrink: 0
	filter: saturate(0) opacity(0.6)
	&.blue
		filter: saturate(1) opacity(1)

.question-left
	display: flex
	flex-direction: column

.q-left-text
	padding: 1.5rem
	border-bottom: var(--stroke-subtle)
	@media screen and (max-width: 1024px)
		padding: 1rem

.q-image
	img
		width: 100%
		object-fit: cover
		height: 100%

.question-right
	padding: 1.4rem
	background: var(--stone)
	@media screen and (min-width: 1025px)
		border-left: var(--stroke-subtle)
	@media screen and (max-width: 1024px)
		padding: 1rem

</style>
