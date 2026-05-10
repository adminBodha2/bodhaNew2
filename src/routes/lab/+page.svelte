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

<Head {title} {metaDescription} {metaImage} {metaUrl} imWidth="2560" imHeight="1440" {jsonld} />

<Container>
	<section class="box wrapper-std header-margin rgap32">
		<Crumb showT={true} title="Bodha Lab" showD={true} desc={metaDescription} />
		{#if labItems.length > 0}
			<div class="grid grid-cols-2 lg:grid-cols-4 white-grid">
				{#each labItems as item, i}
					<a class="box box-of-items blank whitestone p16 rgap8" href={item.linkpath}>
						<div class="item-meta row ycenter cgap8 xbetween">
							<p class="citation lgrey tt-u">{item.formattedDate}</p>
						</div>
						<p class="body-text tight w600">{item.meta.title}</p>
						<p class="grey tight">{item.meta.excerpt}</p>
						<p class="cite tt-u dead hollow themed">{item.meta.category}</p>
					</a>
				{/each}
			</div>
		{/if}
	</section>
</Container>

<style lang="sass">

.item-meta
	flex-wrap: wrap

</style>
