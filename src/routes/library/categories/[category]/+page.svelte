<script lang="ts">
	import { page } from '$app/state';
	import Head from '$lib/comps/headcomponent.svelte';
	import Container from '$lib/comps/container.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import { libCategories } from '$lib/utils/localsends';
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


<Head
	{title}
	{metaDescription}
	{metaImage}
	{metaUrl}
	imWidth="1536"
	imHeight="1024"
	{jsonld}
/>


<Container narrow={true} scaled={true}>
	<div class="box std padded-ontop">
		<Crumb item1="Library" item1Link="/library" show2={true} item2="Categories" showT={true} title={category.label} showD={true} desc={category.desc} showRow={true}>
			<div class="row cgap8 rgap8 mwrap ptop8">
				{#each libCategories as cat (cat.type)}
					{#if cat.type !== category.type}
						<a class="nav-btn" href={cat.href}>
							{cat.label}
						</a>
					{/if}
				{/each}
			</div>
		</Crumb>
		{#if books && books.length > 0}
			<div class="grid four white-grid">
				{#each books as item, i}
					{#if item.type === 'aryanissue'}
						<a class="blank labelbox whitestone card-padded" href={item.linkfinal} target="_blank" rel="noreferrer">
							<p class="w500 tight">{item.name}</p>
							<p class="citation-big tt-u lgrey">{item.author}</p>
						</a>
					{:else}
						<a class="blank labelbox whitestone card-padded" href={item.linkfinal2}>
							<p class="w500 tight">{item.name}</p>
							<p class="descriptor-text grey tight">{item.short}</p>
							<p class="citation-big tt-u lgrey self-bottom">{item.author}</p>
						</a>
					{/if}
				{/each}
			</div>
		{/if}
	</div>
</Container>
