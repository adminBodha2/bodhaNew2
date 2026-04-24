<script lang="ts">
	import { onMount } from 'svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import { fullLab } from '$lib/utils/localpulls';
	import Container from '$lib/comps/container.svelte'
	import Crumb from '$lib/comps/breadcrumb.svelte'

	const title = 'Bodha Lab';
	const metaDescription = 'Working notes, ongoing inquiries, opinions, and deep research — published as they develop.';
	const metaUrl = 'https://www.bodharesearch.in/lab';
	const metaImage = '/images/bodhacover.png';

	let labItems: any[] = [];

	onMount(async () => {
		labItems = await fullLab();
	});
</script>

<Head {title} {metaDescription} {metaImage} {metaUrl}/>

<Container narrow={true} scaled={true}>
<div class="stdbox padded-ontop">
	<Crumb item1="Bodha" item1Link="/" showT={true} title="Bodha Lab" showD={true} desc={metaDescription}/>
	{#if labItems.length > 0}
		<div class="white-grid grid four stay2">
			{#each labItems as item, i}
			<a class="labelbox box-of-items blank whitestone card-padded" href={item.linkpath}>
				<div class="item-meta row ycenter cgap8 xbetween">
					<p class="tag-pill tt-u">{item.meta.category}</p>
					<p class="citation-big lgrey tt-u">{item.formattedDate}</p>
				</div>
				<p class="tight w500">{item.meta.title}</p>
				<p class="small-text grey tight">{item.meta.excerpt}</p>
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
