<script lang="ts">
	import Head from '$lib/comps/headcomponent.svelte';
	import Container from '$lib/comps/container.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';

	let { data } = $props();

	let labItems = $derived(data.labItems ?? []);

	const title = 'Lab | Bodha';
	const metaDescription = 'Working notes, ongoing inquiries, opinions, and deep research published as they develop.';
	const metaUrl = 'https://www.bodharesearch.in/lab';
	const metaImage = 'https://www.bodharesearch.in/images/bodhacover.png';

	let jsonld = $derived(JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		name: title,
		description: metaDescription,
		url: metaUrl,
		image: metaImage,
		mainEntity: {
			'@type': 'ItemList',
			itemListElement: labItems.map((item: any, index: number) => ({
				'@type': 'ListItem',
				position: index + 1,
				name: item.meta.title,
				url: 'https://www.bodharesearch.in' + item.linkpath
			}))
		}
	}));
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

<Container narrow={true} scaled={true}>
<div class="stdbox padded-ontop">
	<Crumb item1="Bodha" item1Link="/" showT={true} title="Bodha Lab" showD={true} desc={metaDescription}/>
	{#if labItems.length > 0}
		<div class="white-grid grid four stay2">
			{#each labItems as item, i}
			<a class="labelbox box-of-items blank whitestone card-padded" href={item.linkpath}>
				<div class="item-meta row ycenter cgap8 xbetween">
					<p class="citation-big lgrey tt-u">{item.formattedDate}</p>
				</div>
				<p class="tight w500">{item.meta.title}</p>
				<p class="small-text grey tight">{item.meta.excerpt}</p>
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
