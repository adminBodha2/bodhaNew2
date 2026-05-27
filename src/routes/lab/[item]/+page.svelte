<script lang="ts">

	import { page } from '$app/state';
	import { formatYear, formatDOM, formatMonth } from '$lib/utils/localpulls.js';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import '$lib/styles/system/document-layout.sass';
	import { absoluteImage, absoluteUrl, articleJsonLd, stringifyJsonLd } from '$lib/utils/seo';

	let { data } = $props();

	let labitems = $derived(data.labitems ?? []);

	let yOP = $derived(formatYear(data.date));
	let dOM = $derived(formatDOM(data.date));
	let mOD = $derived(formatMonth(data.date));

	let title = $derived(data.title);
	let metaDescription = $derived(data.excerpt);
	let metaUrl = $derived(absoluteUrl(page.url.pathname));
	const metaImage = absoluteImage('/images/key-research.webp');

	let jsonld = $derived(
		stringifyJsonLd(
			articleJsonLd({
				headline: data.title,
				description: data.excerpt,
				datePublished: data.date,
				section: data.category,
				url: metaUrl,
				image: metaImage
			})
		)
	);
</script>

<Head
	{title}
	{metaDescription}
	{metaImage}
	{metaUrl}
	imWidth="1536"
	imHeight="1024"
	ogType="article"
	{jsonld}
/>

<Container>
	<section class="docgrid">
		<div class="docside">
			{#if labitems && labitems.length > 0}
				<nav class="doclist lg:ptop16">
					<div class="box rgap16">
					{#each labitems as item}
						{#if item.meta.title !== data.title}
							<a class="doclink txt-bs sm:txt-lg grey2" href={item.linkpath}>
								{item.meta.title}
							</a>
						{/if}
					{/each}
					</div>
				</nav>
			{/if}
		</div>
		<div class="docmain">
			<Crumb showT={true} title={data.title} showD={true} desc={data.excerpt} thinTop={true}/>
			<div class="doctext classic-document">
				<data.content />
			</div>
		</div>
	</section>
</Container>
