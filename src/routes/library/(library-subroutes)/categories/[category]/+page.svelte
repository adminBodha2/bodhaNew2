<script lang="ts">
	import { page } from '$app/state';
	import Head from '$lib/comps/headcomponent.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import { absoluteImage, absoluteUrl, collectionPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';

	let { data } = $props();

	let category = $derived(data.category);
	let books = $derived(data.books ?? []);
	let title = $derived(category.label + ' | Bodha Open Library');
	let metaDescription = $derived(category.desc);
	let metaUrl = $derived(absoluteUrl(page.url.pathname));
	const metaImage = absoluteImage('/images/key-bol.webp');

	let jsonld = $derived(
		stringifyJsonLd(
			collectionPageJsonLd({
				name: title,
				description: metaDescription,
				url: metaUrl,
				image: metaImage,
				items: books.map((book: any) => ({
					name: book.name,
					url: book.linkfinal2 ?? book.linkfinal
				}))
			})
		)
	);
</script>

<Head {title} {metaDescription} {metaImage} {metaUrl} imWidth="1536" imHeight="1024" {jsonld} />

<section class="box library-book rgap32">
	<Crumb showT={true} title={category.label} showD={true} desc={category.desc} fullP={true}/>
	{#if books && books.length > 0}
		<div class="grid grid-cols-2 lg:grid-cols-3 rgap4 cgap4">
			{#each books as item, i}
				{#if item.type === 'aryan-issue'}
					<a class="blank box rgap8 whitestone p16 lg:p24 b-main radius" href={item.linkreal} target="_blank" rel="noreferrer">
						<p class="paragraph-text w600 tight">{item.name}</p>
						<p class="grey tight">{item.summary}</p>
						<p class="citation tt-u altprim w500">{item.author}</p>
						{#if item.tags && item.tags.length > 0}
							<div class="row wrap self-bottom cgap4 rgap4">
								{#each item.tags as tag}
									<p class="tag-pill tt-u themed hollow dead">{tag.replaceAll('-', ' ')}</p>
								{/each}
							</div>
						{/if}
					</a>
				{:else}
					<a class="blank box rgap8 whitestone p16 lg:p24 b-main radius" href={item.linkfinal}>
						<p class="paragraph-text w600 tight">{item.name}</p>
						<p class="descriptor-text grey tight">{item.summary}</p>
						<p class="grey tight">{item.author}</p>
						{#if item.tags && item.tags.length > 0}
							<div class="row wrap self-bottom cgap4 rgap4">
								{#each item.tags as tag}
									<p class="tag-pill tt-u hollow themed dead">{tag.replaceAll('-', ' ')}</p>
								{/each}
							</div>
						{/if}
					</a>
				{/if}
			{/each}
		</div>
	{/if}
</section>
