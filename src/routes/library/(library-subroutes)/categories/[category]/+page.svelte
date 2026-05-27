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

<section class="box rgap32">
<Crumb showT={true} title={category.label} showD={true} desc={category.desc} fullP={true} sidebarSoloPad2={true}/>
	{#if books && books.length > 0}
		<div class="grid grid-cols-1 lg:grid-cols-3 gap16">
			{#each books as item, i}
				{#if item.type === 'aryan-issue'}
					<a class="blank box rgap8 tight-pad whitestone" href={item.linkreal} target="_blank" rel="noreferrer">
						{#if item.tags && item.tags.length > 0}
							<div class="row wrap">
								{#each item.tags as tag}
									<p class="txt-00 tt-u theme w500">{tag.replaceAll('-', ' ')}</p>
								{/each}
							</div>
						{/if}
						<p class="txt-lg w500">{item.name}</p>
						<p class="grey1">{item.summary}</p>
						<p class="txt-sm tt-u w500 grey2">{item.author}</p>
					</a>
				{:else}
					<a class="blank box rgap8 tight-pad whitestone" href={item.linkfinal}>
						{#if item.tags && item.tags.length > 0}
							<div class="row wrap">
								{#each item.tags as tag}
									<p class="txt-00 tt-u theme w500">{tag.replaceAll('-', ' ')}</p>
								{/each}
							</div>
						{/if}
						<p class="txt-lg w500">{item.name}</p>
						<p class="grey1">{item.summary}</p>
						<p class="txt-sm tt-u w500 grey2">{item.author}</p>
					</a>
				{/if}
			{/each}
		</div>
	{/if}
</section>
