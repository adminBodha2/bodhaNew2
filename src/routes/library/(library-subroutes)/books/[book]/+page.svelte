<script lang="ts">
	import { page } from '$app/state';
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

<section class="box rgap32">
	<Crumb sidebarSoloPad2={true} showT={true} title={data.name} showD={true} desc="{data.author} | {data.summary}" showRow={true}>
		<div class="row cgap8 rgap8 mwrap">
			{#each data.tags as tag}
				<p class="txt-xs tt-u w500 theme">#{tag.replaceAll('-', ' ')}</p>
			{/each}
		</div>
	</Crumb>
	<div class="pdf-reader pbot32">
		<PDFReader src={data.linkcloud} title={data.name} height="82vh" />
	</div>
	{#if relatedBooks && relatedBooks.length > 0}
		<div class="box bordertop ptop64 rgap32">
			<Title text="Related Books" sizeType={true}/>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap16">
				{#each relatedBooks as item, i}
					<a class="blank box whitestone rgap8 tight-pad" href={item.linkfinal2}>
						<p class="txt-lg w500 a-hover">{item.name}</p>
						<p class="grey1">{item.short}</p>
					</a>
				{/each}
			</div>
		</div>
	{/if}
</section>
