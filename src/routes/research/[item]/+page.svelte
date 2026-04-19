<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { allResearch } from '$lib/utils/localpulls';
	import Container from '$lib/comps/container.svelte';
	import Tithle from '$lib/comps/page-title.svelte'
	import Head from '$lib/comps/headcomponent.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte'
	import { metaTitle, metaDescription, metaImage, metaUrl } from '$lib/utils/metastores';
	export let data;

	let projects: any;
	let sY: number;

	$metaTitle = data.title;
	$metaDescription = data.description;
	$metaUrl = 'https://www.bodharesearch.in' + page.url.pathname;
	$metaImage = data.image;

	const jsonld = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: data.title,
		description: data.description,
		image: data.image,
		publisher: { '@type': 'Organization', name: 'Bodha Research', url: 'https://www.bodharesearch.in' },
		url: 'https://www.bodharesearch.in' + page.url.pathname,
	});

	onMount(async () => {
		projects = await allResearch();
	});
</script>

<svelte:window bind:scrollY={sY} />

<Head title={$metaTitle} metaDescription={$metaDescription} metaImage={$metaImage} metaUrl={$metaUrl} {jsonld} />

<Container narrow={true} scaled={true}>
<section class="box std padded-ontop">
<Crumb item1="Research" item1Link="/research" showT={true} title={data.title} desc={data.description} showD={true} showRow={true}>
	<div class="row wrap cgap8 rgap8">
			<p class="tag-pill tt-u">{data.type}</p>
		{#each data.tags as tag}
			<a class="tag-pill themed tt-u" href="/tags/{tag}">{tag}</a>
		{/each}
	</div>
</Crumb>
<section class="key-image">
	<img src={data.image} alt={data.title} style="transform: translateY(-{sY/4}px)"/>
</section>
<section class="content-section">
	<div class="classic-document">
	<data.content />
	</div>
	<div class="box sidebar">
		{#if projects && projects.length > 0}
			<h2 class="header-2 tt-u lgrey">All Research Projects</h2>
			<div class="projects">
				{#each projects as item}
				<a class="blank project-link" href={item.linkpath}>
					<p class="item-line grey">{item.meta.title}</p>
				</a>
				{/each}
			</div>
		{/if}
	</div>
</section>
</section>
</Container>

<style lang="sass">

.projects
	display: grid
	grid-template-columns: 1fr 1fr
	border: var(--stroke-subtle)
	.project-link
		padding: 1rem
		border-bottom: var(--stroke-subtle)
		transition: all 0.05s ease
		&:last-child
			border-bottom: none
		&:nth-child(odd)
			border-right: var(--stroke-subtle)
			background: #fcfcfc
		&:hover
			background: var(--stone)
			padding-right: 1.1rem
			p
				color: var(--theme)
	@media screen and (min-width: 1025px)
		display: flex
		flex-direction: column
		text-align: right
		border: none
		.project-link
			border-bottom: var(--stroke-subtle)
			padding-bottom: 1rem
			padding-top: 1rem
			padding-right: 1rem
			transition: all 0.05s ease
			&:last-child
				border-bottom: none
				padding-bottom: none
			&:hover
				background: #FFF
				padding-right: 1.1rem
				p
					color: var(--theme)
			&:nth-child(odd)
				border-right: none
				background: none
				&:hover
					background: #FFF

.sidebar
	@media screen and (min-width: 1025px)
		background: var(--stone)
		border-left: var(--stroke-subtle)
		text-align: right
		padding-top: 1rem
		gap: 1rem
		h2
			padding-right: 1rem
	@media screen and (max-width: 1024px)
		padding-top: 2rem
		gap: 2rem
		border-top: 1px solid var(--color-border)

.classic-document
	@media screen and (min-width: 1025px)
		padding: 2rem 4rem 2rem 2rem

.content-section
	display: grid
	grid-auto-flow: row
	@media screen and (min-width: 1025px)
		grid-template-columns: 1fr 420px
		grid-template-areas: ". ."
		border: var(--stroke-subtle)

.key-image
	overflow: hidden
	position: relative
	height: 300px
	@media screen and (min-width: 1025px)
		height: 540px

.key-image img
	object-fit: cover
	width: 100%
	height: 100%
	position: absolute
	left: 0
	height: 500px
	top: 0
	@media screen and (min-width: 1025px)
		height: 800px
		top: 0


</style>
