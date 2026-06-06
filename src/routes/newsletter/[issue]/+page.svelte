<script lang="ts">
	import { page } from '$app/state';
	import type { PageData } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import PDF2 from '$lib/comps/pdf-lean.svelte';
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
	<section class="box wrapper-std header-margin rgap32">
		<Crumb isSolo={true} showT={true} title={data.title}/>
		<div class="pdf-reader box rgap16">
			<p class="highlight-text">Accompanying <a class="linkedlight" href="/aryavarta/v1-i{data.id}"> Scrolls of Aryavarta digital comic</a>.</p>
			<PDF2 src={data.pdflink} title={data.title} height="82vh" />
		</div>
	</section>
</Container>
