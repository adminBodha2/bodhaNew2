<script lang="ts">
	import type { PageProps } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Slide from '$lib/svelteanim/components/Slide2.svelte';
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
		<Crumb showT={true} title="Domains" showD={true} desc="Domains are the primary classification structure of the wiki. They are the hub nodes in the knowledge graph - the conceptual clusters around which all content organises itself." />
		<Slide targetSelector=".slide-item">
			<div class="grid grid-cols-1 lg:grid-cols-4 gap16">
				{#each data.domains as domain}
					<a class="box rgap16 blank b-main std-pad whitestone slide-item" href="/concepts/{domain.slug}">
						<p class="txt-00 w500 tt-u grey1">{domain.count} connections</p>
						<p class="txt-xl w600 a-hover">{domain.title}</p>
						<p class="grey1">{domain.description}</p>
						<div class="row wrap">
							{#each domain.tags as tag}<p class="txt-xs w500 tt-u theme-dark">{tag.replaceAll('-', ' ')}</p>{/each}
						</div>
					</a>
				{/each}
			</div>
		</Slide>
	</div>
</Container>
