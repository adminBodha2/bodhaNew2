<script lang="ts">
	import type { PageProps } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import WikiGraph from '$lib/comps/wikigraph.svelte';
	import { absoluteImage, absoluteUrl, collectionPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';

	let { data }: PageProps = $props();

	const title = 'Concepts and Ideas | Bodha';
	const metaDescription = 'Top-level domains of thought across the Bodha knowledge base, each leading to essays, books, thinkers, questions, and research nodes.';
	const metaUrl = absoluteUrl('/concepts');
	const metaImage = absoluteImage('/images/bodhacover.png');

	let jsonld = $derived(
		stringifyJsonLd(
			collectionPageJsonLd({
				name: title,
				description: metaDescription,
				url: metaUrl,
				image: metaImage,
				items: data.domains.map((domain) => ({
					name: domain.title,
					url: `/concepts/${domain.slug}`
				}))
			})
		)
	);
</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="2560" imHeight="1440" {jsonld} />

<Container>
	<div class="wrapper-std">
		<Crumb showT={true} title="Concepts" showD={true} desc="Concepts are the main domains of thought across the knowledge base. Each one leads to the essays, books, thinkers, questions, and research nodes gathered under that domain."/>
		<WikiGraph nodes={data.nodes} edges={data.edges} maxNodes={520} maxLinks={1400} layout="split"/>
	</div>
</Container>
