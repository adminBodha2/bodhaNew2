<script lang="ts">

	import { page } from '$app/state'
	import type { PageData } from './$types'
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import PDFReader from '$lib/comps/pdfreader.svelte';
	import { WaterRipple } from '$lib/motion-core';
	import { absoluteUrl, absoluteImage, articleJsonLd, stringifyJsonLd } from '$lib/utils/seo';

	let { data }: { data: PageData } = $props();
	let title = $derived(`${data.title} | Scrolls of Aryavarta`);
	let metaDescription = $derived(data.description);
	let metaUrl = $derived(absoluteUrl(page.url.pathname));
	let metaImage = $derived(absoluteImage(data.image));
	let jsonld = $derived(
		stringifyJsonLd(
			articleJsonLd({
				headline: data.title,
				description: metaDescription,
				url: metaUrl,
				image: metaImage,
				datePublished: data.date,
				section: 'Scrolls of Aryavarta'
			})
		)
	)

</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} ogType="article" {jsonld} />

<Container>
<section class="key-image">
	<WaterRipple src={data.image} class="ripple-motion" brushSize={100} />
</section>
	<div class="box padded">
		<Crumb item1="Bodha" item1Link="/" show2={true} item2linked={true} item2="Scrolls of Aryavarta" item2Link="/aryavarta" showT={true} title={data.title} showD={true} desc={data.description} showRow={true}>
			<div class="box">
				<p class="descriptor-text grey">Vol. {data.volume}, Issue {data.issue} | {data.date}</p>
			</div>
		</Crumb>
		<div class="textbox aryavarta-content ptop32">
		<div class="width70">
			<data.content/>
		</div>
		<div class="pdf-reader">
			<PDFReader src={data.pdflink} title={data.title} height="82vh" />
		</div>
		</div>
	</div>
</Container>

<style lang="sass">

.key-image
	width: 100%
	height: 400px
	@media screen and (min-width: 1025px)
		height: calc(100vh - 144px)
		margin-top: 72px

</style>