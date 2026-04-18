<script lang="ts">
	import { page } from '$app/state';
	import Head from '$lib/comps/headcomponent.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte'
	import { metaTitle, metaDescription, metaImage, metaUrl } from '$lib/utils/metastores';
	export let data;

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
</script>

<svelte:window bind:scrollY={sY} />

<Head title={$metaTitle} metaDescription={$metaDescription} metaImage={$metaImage} metaUrl={$metaUrl} {jsonld} />
<Crumb item1="Research" item1Link="/research" showT={true} title={data.title} desc={data.description} showD={true}/>
<div class="grid two midgaps">
			<div class="classic-document box textbox down">
				<data.content />
			</div>
			<div class="box imagebox up">
				<img src={data.image} alt={data.title}/>
			</div>
</div>


<style lang="sass">

.imagebox img
	object-fit: cover
	width: 100%
	height: 100%
	@media screen and (min-width: 1025px)
		height: 400px

.imagebox
	overflow: hidden


</style>
