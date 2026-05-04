<script lang="ts">
	import { page } from '$app/state';
	import Head from '$lib/comps/headcomponent.svelte';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Dropdowner from '$lib/comps/responsive-menu.svelte'
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


<Container>
	<div class="stdbox stdpad header-margin is-last">
		<Crumb showT={true} title={category.label} showD={true} desc={category.desc} showRow={true}>
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
		<Dropdowner button1text = {category.label}>
			{#each libCategories as cat (cat.type)}
				{#if cat.type !== category.type}
					<a class="dropped-link" href={cat.href}>
						{cat.label}
					</a>
				{/if}
			{/each}
		</Dropdowner>
		{#if books && books.length > 0}
			<div class="grid four white-grid">
				{#each books as item, i}
					{#if item.type === 'aryan-issue'}
						<a class="blank labelbox whitestone card-padded" href={item.linkreal} target="_blank" rel="noreferrer">
							<p class="w500 tight">{item.name}</p>
							<p class="descriptor-text grey tight">{item.summary}</p>
							<p class="citation-big tt-u lgrey">{item.author}</p>
							{#if item.tags && item.tags.length > 0}
								<div class="row wrap self-bottom cgap4 rgap4">
									{#each item.tags as tag}
										<p class="tag-pill tt-u">{tag.replaceAll('-',' ')}</p>
									{/each}
								</div>
							{/if}
						</a>
					{:else}
						<a class="blank labelbox whitestone card-padded" href={item.linkfinal}>
							<p class="w500 tight">{item.name}</p>
							<p class="descriptor-text grey tight">{item.summary}</p>
							<p class="citation-big tt-u lgrey self-bottom">{item.author}</p>
							{#if item.tags && item.tags.length > 0}
								<div class="row wrap self-bottom cgap4 rgap4">
									{#each item.tags as tag}
										<p class="tag-pill tt-u">{tag.replaceAll('-',' ')}</p>
									{/each}
								</div>
							{/if}
						</a>
					{/if}
				{/each}
			</div>
		{/if}
	</div>
</Container>
