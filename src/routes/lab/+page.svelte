<script lang="ts">
	import Head from '$lib/comps/headcomponent.svelte';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import { absoluteImage, absoluteUrl, collectionPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';

	let { data } = $props();

	let labItems = $derived(data.labItems ?? []);

	const title = 'Bodha Lab | Working Notes on Dharma, IKS, Modernity, and Culture';
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

<Head {title} {metaDescription} {metaImage} {metaUrl} imWidth="2560" imHeight="1440" {jsonld} />

<Container>
	<section class="wrapper-std">
		<Crumb showT={true} title="Bodha Lab" showD={true} desc={metaDescription} />
		{#if labItems.length > 0}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap16">
				{#each labItems as item, i}
					<a class="box blank whitestone std-pad b-main rgap16" href={item.linkpath}>
						<p class="txt-xs tt-u w500 grey1">{item.formattedDate}</p>
						<p class="txt-lg w600 a-hover">{item.meta.title}</p>
						<p class="grey1">{item.meta.excerpt}</p>
						<p class="txt-00 w500 tt-u theme-dark self-bottom">{item.meta.category}</p>
					</a>
				{/each}
			</div>
		{/if}
	</section>
</Container>