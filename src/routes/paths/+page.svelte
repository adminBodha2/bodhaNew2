<script lang="ts">

	import Container from '$lib/comps/container.svelte'
	import Crumb from '$lib/comps/breadcrumb.svelte'
	import Head from '$lib/comps/headcomponent.svelte'
	import paths from '$lib/data/paths.json'
	import { metaDescription, metaImage, metaTitle, metaUrl } from '$lib/utils/metastores'

	$metaTitle = "Reading Paths at Bodha"
	$metaDescription = "Curation ways to explore the Indian civilizational consciousness."
	$metaUrl = 'https://www.bodharesearch.in/paths';
	$metaImage = '/images/key-research.webp'

</script>

<Head title={$metaTitle} metaDescription={$metaDescription} metaUrl={$metaUrl} metaImage={$metaImage} />

<Container narrow={true} scaled={true}>
	<div class="box std padded-ontop">
		<Crumb item1="Bodha" item1Link="/" showT={true} title="Reading Paths"/>
		<div class="standard-grid grid three">
			{#each paths as path, i}
				<a class="blank box rgap16 column a-box ncolor{i}" href="/paths/{path.id}">
					<p class="citation tt-u self-top ptop8 pbot8 borderbot lgrey">{path.subtitle}</p>
					<div class="box column rgap16 inside-a-box">
					<p class="citation-big blue tt-u">Level - {path.level}</p>
					<h2 class="header-type-p">{path.title}</h2>
					<p class="small-text grey tight">{path.description}</p>
					</div>
				</a>
			{/each}
		</div>
	</div>
</Container>

<style lang="sass">

.a-box
	padding: 0 0 1.5rem 0
	height: 100%
	.inside-a-box
		height: 100%
	.box.column
		padding: 0 1.5rem
	.self-top
		padding-left: 1.5rem
		padding-right: 1.5rem
		background: #FFF
	&:hover
		.self-top
			background: var(--stone)

</style>