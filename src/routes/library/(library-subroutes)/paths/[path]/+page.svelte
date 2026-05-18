<script lang="ts">
	import { page } from '$app/state';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import { absoluteImage, absoluteUrl, stringifyJsonLd, webPageJsonLd } from '$lib/utils/seo';

	let { data } = $props();
	let bookItems = $derived(data.books ?? []);

	let title = $derived('Library Path | ' + data.title);
	let metaDescription = $derived(data.description);
	let metaImage = absoluteImage('/images/key-bol.webp');
	let metaUrl = $derived(absoluteUrl(page.url.pathname));

	let jsonld = $derived(
		stringifyJsonLd(
			webPageJsonLd({
				name: data.title,
				description: data.description,
				url: metaUrl,
				image: metaImage,
				type: 'CollectionPage'
			})
		)
	);
</script>

<Head {title} {metaDescription} {metaImage} {metaUrl} imWidth="1536" imHeight="1024" {jsonld} />

<section class="box library-book rgap32">
	<Crumb showT={true} title={data.title} showD={true} desc={data.description} />
	<div class="grid grid-cols-1 lg:grid-cols-3 white-grid">
		{#each bookItems as item}
			<a class="blank box rgap16 p24 lg:p32 whitestone" href={item.link}>
				<p class="txt-xl w500">{item.text}</p>
				<p class="grey1">{item.description}</p>
				{#if item.author && item.author !== ''}
					<p class="txt-sm tt-u w500 grey2">{item.author}</p>
				{/if}
			</a>
		{/each}
	</div>
</section>
