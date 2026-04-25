<script lang="ts">
	import { page } from '$app/state';
	import { formatYear, formatDOM, formatMonth } from '$lib/utils/localpulls.js';
	import Container from '$lib/comps/container.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import '$lib/styles/lab.sass';
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

<Container narrow={true} scaled={true}>
	<section class="stdbox padded-ontop">
		<Crumb item1="Bodha" item1Link="/" showT={true} title={data.title} desc={data.excerpt} showD={true}/>
	</section>
	<section class="content-section">
		<div class="classic-document">
{#key page.url.pathname}
	<data.content />
{/key}
		</div>
		<div class="box sidebar">
			{#if labitems && labitems.length > 0}
				<div class="projects projects-t">
					{#each labitems as item}
						<a class="blank project-link" href={item.linkpath}>
							<p class="rem1 grey tight">{item.meta.title}</p>
						</a>
					{/each}
				</div>
			{/if}
		</div>
	</section>
</Container>


<style lang="sass">

.projects.projects-t
	@media screen and (min-width: 1025px)
		position: sticky
		top: 80px

</style>
