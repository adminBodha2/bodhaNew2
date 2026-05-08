<script lang="ts">
	import Head from '$lib/comps/headcomponent.svelte';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import { absoluteImage, absoluteUrl, collectionPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';

	let { data } = $props();

	let labItems = $derived(data.labItems ?? []);

	const title = 'Lab | Bodha';
	const metaDescription = 'Working notes, ongoing inquiries, opinions, and deep research published as they develop.';
	const metaUrl = absoluteUrl('/lab');
	const metaImage = absoluteImage('/images/bodhacover.png');

	let jsonld = $derived(
		stringifyJsonLd(
			collectionPageJsonLd({
				name: title,
				description: metaDescription,
				url: metaUrl,
				image: metaImage,
				items: labItems.map((item: any) => ({
					name: item.meta.title,
					url: item.linkpath
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
	imWidth="2560"
	imHeight="1440"
	{jsonld}
/>

<Container>
<div class="header-margin is-last">
	<Crumb showT={true} title="Bodha Lab" showD={true} desc={metaDescription}/>
	{#if labItems.length > 0}
		<div class="grid grid-cols-2 lg:grid-cols-4 white-grid">
			{#each labItems as item, i}
			<a class="labelbox box-of-items blank whitestone card-padded" href={item.linkpath}>
				<div class="item-meta row ycenter cgap8 xbetween">
					<p class="citation-big lgrey tt-u">{item.formattedDate}</p>
				</div>
				<p class="tight w500">{item.meta.title}</p>
				<p class="descriptor-text grey tight">{item.meta.excerpt}</p>
					<p class="tag-pill tt-u">{item.meta.category}</p>
			</a>
			{/each}
		</div>
	{/if}

</div>
</Container>

<style lang="sass">

.item-meta
	flex-wrap: wrap

</style>
