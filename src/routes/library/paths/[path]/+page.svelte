<script lang="ts">
	import { page } from '$app/state';
	import Container from '$lib/comps/container.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import { absoluteImage, absoluteUrl, stringifyJsonLd, webPageJsonLd } from '$lib/utils/seo';

	let { data } = $props();
	let bookItems = $derived(data.books??[]);

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
	<div class="stdbox padded-ontop">
		<Crumb item1="Bodha" item1Link="/" show2={true} item2linked={true} item2="Open Library" item2Link="/library" showT={true} title={data.title} showD={true} desc={data.description}/>
		<div class="grid four midgaps">
			{#each bookItems as item}
				<a class="blank box labelbox" href={item.link}>
					<p class="w500 a-hover tight">{item.text}</p>
					<p class="descriptor-text grey">{item.description}</p>
					{#if item.author && item.author !== ""}
					<div class="self-bottom bordertop ptop8">
						<p class="tag-text tt-u">{item.author}</p>
					</div>
					{/if}
				</a>
			{/each}
		</div>
	</div>
</Container>
