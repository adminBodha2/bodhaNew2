<script lang="ts">
	import { onMount, tick } from 'svelte';
	import autoAnimate from '@formkit/auto-animate';
	import { allQuestions } from '$lib/utils/localpulls';
	import Container from '$lib/comps/container.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Title from '$lib/comps/page-title.svelte'
	import Parallax from '$lib/comps/parallaxfull.svelte'
	import { metaTitle, metaDescription, metaUrl, metaImage } from '$lib/utils/metastores';
	import { createTempleNav } from '$lib/utils/templeNav';

	$metaTitle = 'Bodha — Big Questions';
	$metaDescription = 'Big questions that capture core concerns in the contemporary journey of Hindu society.';
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
<div class="box std padded">
	<div class="box textbox">
		<p class="eyebrow tt-u"><a class="linkonhover" href="/">Bodha</a></p>
		<h1 class="page-title source-serif">Big Questions</h1>
		<p class="small-text width60">Hindu consciousness is awakening across the nation. Bodha aids this process by asking provocative questions about the most fundamental problems and open questions that Hindu society faces today — issues that are not settled, perennially asked by every Hindu generation, and novel dilemmas of our time.</p>
	</div>
</div>
	{#if questions && questions.length > 0 && ready}
	<div
		class="box std padded bordertop"
		role="region"
		aria-label="Big Questions"
		on:touchstart={handleTouchStart}
		on:touchend={handleTouchEnd}
	>
		<Title text="Big Questions"/>

		<div class="row cgap8 rgap8 mwrap">
			<button class="filter-button" class:active={$selectedTemple[30]} on:click={() => toggleTemple(30)}>All</button>
			{#each questions as _, i}
			<button class="filter-button" class:active={$selectedTemple[i]} on:click={() => toggleTemple(i)}>{i + 1}</button>
			{/each}
		</div>

		<div class="box std" use:autoAnimate>
			{#each questions as item, i}
			{#if $selectedTemple[30] || $selectedTemple[i]}
			<div class="column question-card">
				<div class="row ytop question-head mcol">
					<img class="q-icon" class:blue={$selectedTemple[i]} src={item.meta.image} alt={item.meta.title} />
					<div class="column" style="gap: 4px">
						<h3 class="item-title source-serif">{item.meta.id} — {item.meta.title}</h3>
						<!--
						<a class="q-deeplink linkonhover" href="{item.linkpath}">Read in full →</a>
						-->
					</div>
				</div>
				<div class="grid two">
					<div class="box textbox question-left">
						<p class="small-text grey">{item.meta.description}</p>
						<div class="row wrap cgap8">
							{#each item.meta.tags as tag}
							<p class="tag-pill colored tt-u">{tag.replaceAll('-', ' ')}</p>
							{/each}
						</div>
						<div class="q-image">
							<img src={item.meta.icon} alt={item.meta.title} />
						</div>
					</div>
					<div class="box question-right classic-document">
						<svelte:component this={item.content} />
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
</Container>

<style lang="sass">

// ── NAVIGATION ─────────────────────────────────────────────

.q-nav
	display: flex
	flex-wrap: wrap
	gap: 6px

// ── QUESTION CARDS ─────────────────────────────────────────

.q-list
	display: flex
	flex-direction: column
	gap: var(--gap-std)

.question-card
	border: 1px solid rgba(0,0,0,0.06)
	border-radius: 10px
	overflow: hidden
	background: #fff

.question-head
	gap: 1rem
	padding: 1.2rem 1.4rem
	border-bottom: 1px solid rgba(0,0,0,0.06)
	background: #fafafa

.q-icon
	width: 40px
	height: 40px
	object-fit: contain
	flex-shrink: 0
	filter: saturate(0) opacity(0.6)
	&.blue
		filter: saturate(1) opacity(1)

.q-title
	font-size: clamp(1rem, 2vw, 1.3rem)
	font-weight: 400
	line-height: 1.2
	letter-spacing: -0.02em
	color: #111
	margin: 0

.q-deeplink
	font-size: 0.75rem
	color: var(--text-ghost)
	transition: color 0.12s ease
	&:hover
		color: var(--theme)

.q-card-body
	display: grid
	@media screen and (min-width: 1025px)
		grid-template-columns: 1fr 1fr
	@media screen and (max-width: 1024px)
		grid-template-columns: 1fr

.question-left
	display: flex
	flex-direction: column
	padding: 1.4rem
	border-right: 1px solid rgba(0,0,0,0.06)
	background: var(--stone)
	@media screen and (max-width: 1024px)
		border-right: none
		border-bottom: 1px solid rgba(0,0,0,0.06)

.q-desc
	font-size: 0.9rem
	line-height: 1.7
	color: #555
	margin: 0

.q-tag
	font-size: 8px
	font-weight: 700
	letter-spacing: 0.1em
	color: var(--text-ghost)
	padding: 2px 8px
	border-radius: 100px
	border: 1px solid rgba(0,0,0,0.08)
	background: #F5F5F4

.q-image
	margin-top: auto
	img
		width: 100%
		aspect-ratio: 16 / 9
		object-fit: cover
		border-radius: 6px
		display: block
		border: 1px solid rgba(0,0,0,0.06)

.question-right
	padding: 1.4rem

</style>
