<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/state';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import { absoluteImage, absoluteUrl, stringifyJsonLd, webPageJsonLd } from '$lib/utils/seo';

	let { data }: { data: PageData } = $props();

	const descriptions: Record<string, string> = {
		'privacy-policy': 'Privacy Policy for Bodha Research, covering data collection, cookies, embedded content, and user information.',
		'refunds-policy': 'Refunds Policy for Bodha Research courses, programs, and Anveshi chapters.',
		'terms-and-conditions': 'Terms and Conditions for using Bodha Research, its website, programs, payments, and services.'
	};

	let title = $derived(data.title + ' | Bodha');
let metaDescription = $derived(descriptions[data.item] ?? `${data.title} at Bodha Research.`);
	let metaUrl = $derived(absoluteUrl(page.url.pathname));
	const metaImage = absoluteImage('/images/bodhacover.png');

	let jsonld = $derived(
		stringifyJsonLd(
			webPageJsonLd({
				name: title,
				description: metaDescription,
				url: metaUrl,
				image: metaImage
			})
		)
	);
</script>


<Head
	{title}
	{metaDescription}
	{metaUrl}
	{metaImage}
	imWidth="2560"
	imHeight="1440"
	{jsonld}
/>

<Container>
	<div class="header-margin is-last">
	<Crumb showT={true} title={data.title}/>
	<article class="site-docs width70">
		<data.content/>
	</article>
	</div>
</Container>