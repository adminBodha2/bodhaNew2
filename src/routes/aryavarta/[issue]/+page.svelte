<script lang="ts">
	import { page } from '$app/state';
	import type { PageData } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Parallax from '$lib/comps/parallaxhalf.svelte';
	import PDFReader from '$lib/comps/pdfreader.svelte';
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
	);
</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} ogType="article" {jsonld} />

<Container>
	<Parallax imageLink={data.image} wipe={true} />
	<section class="box wrapper-std first-box rgap32">
		<Crumb showT={true} title={data.title} showD={true} desc={data.description} showRow={true}>
			<div class="box">
				<p class="grey">Vol. {data.volume}, Issue {data.issue} | {data.date}</p>
			</div>
		</Crumb>
		<div class="width70 content-highlights">
			<data.content />
		</div>
		<div class="box rgap8">
			<p class="txt-lg theme">To receive the fortnightly issues in your email inbox, please <a href="/members" class="linked">subscribe.</a></p>
		</div>
		<div class="pdf-reader">
			<PDFReader src={data.pdflink} title={data.title} height="82vh" />
		</div>
	</section>
</Container>
