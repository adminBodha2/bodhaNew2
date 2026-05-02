<script lang="ts">
	import { page } from '$app/state';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import { absoluteImage, absoluteUrl } from '$lib/utils/seo';

	let { data } = $props();

	let title = $derived(data.title);
	let metaDescription = $derived(data.description);
	let metaUrl = $derived(absoluteUrl(page.url.pathname));
	const metaImage = absoluteImage('/images/bodhacover.png');
</script>


<Head
	{title}
	{metaDescription}
	{metaUrl}
	{metaImage}
	imWidth="2560"
	imHeight="1440"
/>

<Container>
	<div class="stdbox">
		<Crumb item1="Bodha" item1Link="/" showT={true} title={data.title} showD={true} desc={data.description}/>
		<article class="core-item">
			<data.content/>
		</article>
	</div>
</Container>
