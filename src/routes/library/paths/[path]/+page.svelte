<script lang="ts">
	import { page } from '$app/state';
	import Container from '$lib/comps/container.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';

	let { data } = $props();

	let title = $derived('Library Path | ' + data.title);
	let metaDescription = $derived(data.description);
	let metaImage = 'https://www.bodharesearch.in/images/key-bol.webp';
	let metaUrl = $derived('https://www.bodharesearch.in' + page.url.pathname);

	let jsonld = $derived(JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		name: data.title,
		description: data.description,
		url: metaUrl,
		image: metaImage,
		isPartOf: {
			'@type': 'WebSite',
			name: 'Bodha',
			url: 'https://www.bodharesearch.in'
		}
	}));
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
			<data.content />
		</div>
	</div>
</Container>