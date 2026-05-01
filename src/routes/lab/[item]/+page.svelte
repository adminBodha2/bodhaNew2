<script lang="ts">

	import { page } from '$app/state';
	import { formatYear, formatDOM, formatMonth } from '$lib/utils/localpulls.js';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import '$lib/styles/lab2.sass';
	import { absoluteImage, absoluteUrl, articleJsonLd, stringifyJsonLd } from '$lib/utils/seo';
	import Liner from '$lib/icons/anim-line.svelte'

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
	<section class="documents-grid">
		<div class="box sidearea">
			{#if labitems && labitems.length > 0}
				<div class="all-items">
					{#each labitems as item}
						{#if item.meta.title !== data.title}
						<a class="project-link sidebar-text" href={item.linkpath}>
							{item.meta.title}
						</a>
						{/if}
					{/each}
				</div>
			{/if}
		</div>
		<div class="box mainarea ptop64">
			<div class="labelbox borderbot title-area">
				<Crumb rgap={16} item1="Big Questions" item1Link="/big-questions"/>
				<h1 class="doc-title source-serif pbot8">{data.title}</h1>
				<p class="descriptor-text grey pbot8">{data.excerpt}</p>
			</div>
			<div class="classic-document ptop32 pbot32 thislab">
				<data.content />
			</div>
		</div>
	</section>
</Container>
