<script lang="ts">
	import type { PageData } from './$types';
	import Container from '$lib/comps/container.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Title from '$lib/comps/page-title.svelte'
	import { absoluteImage, absoluteUrl, collectionPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';
	import { slide } from 'svelte/transition'

	let { data }: { data: PageData } = $props();

	function conceptHref(slug: string) {
		return `/concepts/${slug}`;
	}

	const title = 'Concepts and Ideas | Bodha';
	const metaDescription = 'Entry point for Bodha’s knowledge base and wiki.';
	const metaUrl = absoluteUrl('/concepts');
	const metaImage = absoluteImage('/images/bodhacover.png');

	let allConcepts = $derived([...data.topLevelConcepts, ...Object.values(data.conceptChildren).flat()]);

	let query = $state('');
	function matches(concept: any, q: string) {
  		const s = q.toLowerCase();
  		return (
    		concept.title.toLowerCase().includes(s) ||
    		concept.slug.toLowerCase().includes(s)
  		);
	}

	let filteredAll = $derived(
	  data.allConcepts.filter((c) => matches(c, query))
	);

let openIndex = $state<number | null>(null)

function toggleItem(index: number) {
	openIndex = openIndex === index ? null : index
}
	let jsonld = $derived(
		stringifyJsonLd(
			collectionPageJsonLd({
				name: title,
				description: metaDescription,
				url: metaUrl,
				image: metaImage,
				items: allConcepts.map((concept: any) => ({
					name: concept.title,
					url: `/concepts/${concept.slug}`
				}))
			})
		)
	);
</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="2560" imHeight="1440" {jsonld} />

<Container narrow={true} scaled={true}>
	<div class="stdbox padded-ontop">
		<div class="knowledge-grid">
			<div class="sidebar">
				<div class="labelbox heading-here">
				<Crumb item1="Bodha" item1Link="/" showT={true} title="Concepts"/>
				<p class="small-text grey">
					Concepts - Domains of thought across the knowledge base. Each concept connects texts, thinkers, and ideas. Think of them as tags, v2! At the top here are the most connected concepts - those with several exploratory paths nested under them - click to reveal. Below those are all the concepts in the site - some connect to multiple nodes, others to just one book or essay - for now.
				</p>
				</div>
			</div>
			<div class="mainarea">
		<div class="box">
			{#each data.topLevelConcepts as concept, i (concept.id)}
				{@const children = data.conceptChildren[concept.id] || []}
				{#if concept.title !== "Tags"}
				<div class="high-concept borderbot pbot16 ptop16">
				<button class="blank box xleft" class:active={openIndex === i} onclick={() => toggleItem(i)}><p class="highlight-text">{concept.title}</p></button>
					<div class="row wrap cgap8 rgap8">
					{#if openIndex === i}
						{#each children as child, j (child.id)}
							<div class="box child-box" in:slide|global={{ delay: j * 10 }} out:slide|global={{ delay: j*5 }}>
								<p class="go-small"><a href={conceptHref(child.slug)}>{child.title}</a></p>
							</div>
						{/each}
					{/if}
					</div>
				</div>
				{/if}
			{/each}
		</div>
			</div>
		</div>
	</div>
	<div class="stdbox padded bordertop">
		<Title text="All Concepts"/>
		<div class="box">
		<form class="form">
			<button aria-label="form button"><svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search"><path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>
			<input class="input" placeholder="Search all concepts..." required type="text" bind:value={query}/>
			<button aria-label="form button" class="reset" type="reset"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg></button>
		</form>
		<div class="row wrap cgap8 rgap8 ptop16">
			{#each filteredAll as concept (concept.id)}
				<a class="blank smaller-concept" href={`/concepts/${concept.slug}`}>
					<p class="this">{concept.title}</p>
				</a>
			{/each}
		</div>
		</div>
</div>
</Container>

<style lang="sass">

.knowledge-grid
	display: grid
	grid-template-columns: 1fr
	grid-template-areas: "sidebar" "mainarea"
	row-gap: 1rem
	.sidebar
		grid-area: sidebar
	.mainarea
		grid-area: mainarea
	@media screen and (min-width: 1025px)
		grid-template-columns: 420px 1fr
		grid-template-areas: "sidebar mainarea"
		column-gap: 4rem
		.heading-here
			position: sticky
			top: 128px

button.blank.box.xleft.active
	margin-bottom: 1rem

.child-box
	border-bottom: var(--border-main)
	background: var(--color-know)
	box-shadow: 1px 1px 2px rgba(0,0,0,0.1)
	padding: 8px 16px
	cursor: pointer
	transition: box-shadow 190ms cubic-bezier(0.075, 0.820, 0.165, 1.000)
	p.go-small
		font-size: 0.85rem
		font-weight: 400
		text-transform: uppercase
	&:hover
		box-shadow: 4px 4px 8px rgba(0,0,0,0.15)

.form
	position: relative
	width: 320px
	height: 40px
	display: flex
	align-items: center
	padding-inline: 0.8em
	border-radius: 4px
	transition: border-radius 0.5s ease
	background: var(--color-alt-2)
	button
		border: none
		background: none
		color: #090908
	&:before
		content: ""
		position: absolute
		background: var(--color-theme)
		transform: scaleX(0)
		transform-origin: center
		width: 100%
		height: 2px
		left: 0
		bottom: 0
		border-radius: 1px
		transition: transform 0.3s ease
	&:focus-within
		border-radius: 3px
		background: #FFF
		&:before
			transform: scale(1)
	svg
		width: 17px
		margin-top: 3px
.input
	font-size: 1.33rem
	background-color: transparent
	width: 100%
	height: 100%
	padding-inline: 0.5em
	padding-block: 0.7em
	border: none
input
	&:focus
		outline: none
	&:not(:placeholder-shown) ~ .reset
		opacity: 1
		visibility: visible
.reset
	border: none
	background: none
	opacity: 0
	visibility: hidden

.smaller-concept
	background: var(--color-know-2)
	padding: 5px 8px
	border: 1px solid var(--color-grey-1)
	border-radius: 2px
	box-shadow: 2px 2px 3px rgba(0,0,0,0.05)
	transform-origin: center center
	transition: all 220ms cubic-bezier(0.000, 1.100, 0.380, 0.995)
	p.this
		font-size: 0.8rem
		text-transform: uppercase
		font-weight: 450
		letter-spacing: 0.01rem
	&:hover
		transform: scale(1.04)
		background: var(--color-know)

</style>
