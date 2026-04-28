<script lang="ts">

	import type { PageData } from './$types';
	import Container from '$lib/comps/container.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import KnowledgeGraph from '$lib/comps/knowledgegraph.svelte';
	import { fly } from 'svelte/transition'
	import { absoluteImage, absoluteUrl, collectionPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';

	let { data }: { data: PageData } = $props();

	const title = 'Knowledge Explorer | Bodha';
	const metaDescription = 'Explore articles, texts, thinkers, schools, and questions across the Bodha knowledge base.';
	const metaUrl = absoluteUrl('/explorer');
	const metaImage = absoluteImage('/images/bodhacover.png');

</script>

<Head
	{title}
	{metaDescription}
	{metaUrl}
	{metaImage}
	imWidth="2560"
	imHeight="1440"
/>

<div id="intro">
<Container narrow={true} scaled={true}>
<div class="stdbox padded-ontop thisbox">
	<Crumb item1="Bodha" item1Link="/" showT={true} title="Graph Explore" showD={true} desc="Trace how essays, questions, thinkers, schools, books, and concepts pull on each other. Select a node to follow its nearby constellation."/>
	<KnowledgeGraph nodes={data.graph.nodes} edges={data.graph.edges} />
</div>
</Container>
</div>

<style lang="sass">

#intro
	min-height: 100vh
	z-index: 0
	background-image: linear-gradient(rgba(0,0,0,0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(rgba(0,0,0,0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.01) 1px, transparent 1px)
	background-position: center center
	@media screen and (max-width: 1024px)
		background-size: 3rem 3rem, 3rem 3rem
		background-image: linear-gradient(rgba(0,0,0,0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.01) 1px, transparent 1px)
	@media screen and (min-width: 1025px)
		transition: background-position 0.1s linear
		background-size: 5rem 5rem, 5rem 5rem, 1rem 1rem, 1rem 1rem

</style>
