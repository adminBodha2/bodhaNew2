<script lang="ts">
	import { page } from '$app/state';
	import Container from '$lib/comps/container.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Title from '$lib/comps/page-title.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import PDFReader from '$lib/comps/pdfreader.svelte';
	import { absoluteImage, absoluteUrl, bookJsonLd, stringifyJsonLd } from '$lib/utils/seo';

	let { data } = $props();
	let relatedBooks = $derived(data.relatedBooks ?? []);

	let title = $derived(data.name + ' | Bodha Open Library');
	let metaDescription = $derived(data.summary);
	let metaUrl = $derived(absoluteUrl(page.url.pathname));
	const metaImage = absoluteImage('/images/key-bol.webp');

	let jsonld = $derived(
		stringifyJsonLd(
			bookJsonLd({
				name: data.name,
				author: data.author,
				description: data.summary,
				url: metaUrl,
				image: metaImage,
				keywords: data.tags
			})
		)
	);
</script>

<Head {title} {metaDescription} {metaImage} {metaUrl} imWidth="1536" imHeight="1024" ogType="book" {jsonld} />

<Container narrow={true} scaled={true}>
	<div class="stdbox padded-ontop">
		<Crumb centered={true} item1="Library" item1Link="/library" show2={true} item2={data.type} showT={true} title={data.name} showD={true} desc="{data.author} | {data.summary}" showRow={true}>
			<div class="row cgap8 rgap8 mwrap">
				{#each data.tags as tag}
					<a class="tag-pill themed tt-u" href="/concepts/{tag}">{tag.replaceAll('-', ' ')}</a>
				{/each}
			</div>
		</Crumb>
		<div class="box std reader">
			<PDFReader src={data.linkcloud} title={data.name} height="82vh" />
		</div>
	</div>
	{#if relatedBooks && relatedBooks.length > 0}
		<div class="stdbox padded bordertop">
			<Title text="Related Books" />
			<div class="grid four white-grid stay2">
				{#each relatedBooks as item, i}
					<a class="blank labelbox card-padded whitestone" href={item.linkfinal2}>
						<p class="w500 tight">{item.name}</p>
						<p class="small-text grey tight">{item.short}</p>
					</a>
				{/each}
			</div>
		</div>
	{/if}
</Container>

<style lang="sass">

.reader
	align-items: center
	padding: 2rem
	@media screen and (max-width: 1024px)
		padding: 0

</style>
