<script lang="ts">
	import { page } from '$app/state';
	import type { PageData } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import PDFReader from '$lib/comps/pdfreader.svelte';
	import { DEFAULT_IMAGE, absoluteUrl, articleJsonLd, stringifyJsonLd } from '$lib/utils/seo';

	let { data }: { data: PageData } = $props();

	let title = $derived(`${data.title} | Bodha Newsletter`);
	let metaDescription = $derived(`${data.title} is a Bodha Newsletter issue from ${data.date}.`);
	let metaUrl = $derived(absoluteUrl(page.url.pathname));
	let metaImage = DEFAULT_IMAGE;
	let jsonld = $derived(
		stringifyJsonLd(
			articleJsonLd({
				headline: data.title,
				description: metaDescription,
				url: metaUrl,
				image: metaImage,
				datePublished: data.date,
				section: 'Bodha Newsletter'
			})
		)
	);

</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} ogType="article" {jsonld} />

<Container>
	<div class="stdbox stdpad header-margin is-last">
		<Crumb showT={true} title={data.title}/>
		<div class="pdf-reader">
			<PDFReader src={data.pdflink} title={data.title} height="82vh" />
		</div>
	</div>
</Container>
