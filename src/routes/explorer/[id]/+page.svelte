<script lang="ts">
	import type { PageData } from './$types';
	import Container from '$lib/comps/container.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Title from '$lib/comps/page-title.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Heading from '$lib/comps/page-header-one.svelte';
	import { absoluteImage, absoluteUrl, webPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';

	let { data }: { data: PageData } = $props();

	function nodeHref(node: { id: string }) {
		return `/explorer/${encodeURIComponent(node.id)}`;
	}
	function conceptHref(node: { slug: string }) {
		return `/concepts/${node.slug}`;
	}

	let title = $derived(data.node.title + ' | Bodha');
	let metaDescription = $derived(data.node.description ?? 'Explore this node in the Bodha knowledge graph.');
	let metaUrl = $derived(absoluteUrl('/explorer/' + encodeURIComponent(data.node.id)));
	const metaImage = absoluteImage('/images/bodhacover.png');

	let jsonld = $derived(
		stringifyJsonLd(
			webPageJsonLd({
				name: title,
				description: metaDescription,
				url: metaUrl,
				image: metaImage
			})
		)
	);
</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="2560" imHeight="1440" {jsonld} />

<Container narrow={true} scaled={true}>
	<Heading title={data.node.title} />
	<div class="stdbox padded-ontop">
		<div class="grid two left">
			<div class="labelbox sidebox">
				<Crumb item1="Bodha" item1Link="/" show2={true} item2linked={true} item2="Explorer" item2Link="/explorer" />
				<h2 class="card-title source-serif">{data.node.title}</h2>
				<p class="tight rem1 grey">{data.node.description}</p>
				{#if data.node.meta.author?.length}
					<p class="grey">By {data.node.meta.author.join(', ')}</p>
				{/if}
				{#if data.node.tags}
					<div class="row ycenter wrap cgap8 rgap8 ptop8">
						{#each data.node.tags as tag}
							<a class="tag-pill accented tt-u" href="/tags/{tag}">{tag.replaceAll('-',' ')}</a>
						{/each}
					</div>
				{/if}
			</div>
			<div class="box mainbox padded">
				{#if data.concepts.length}
					<div class="grid three stay2 white-grid">
						{#each data.concepts as concept (concept.id)}
							<a class="blank card-padded whitestone" href={conceptHref(concept)}>
								<p class="w500">{concept.title}</p>
							</a>
						{/each}
					</div>
				{/if}
{#if data.akVargas.length}
  <p class="descriptor-text">Amarakosha Categories</p>
  <div class="grid three tight">
    {#each data.akVargas as node (node.id)}
      <p><a href={nodeHref(node)}>{node.title}</a></p>
    {/each}
  </div>
{/if}
				{#if data.related.length}
					<div class="grid three tight">
						{#each data.related as node (node.id)}
							<p>
								<a href={nodeHref(node)}>{node.title}</a>
								{#if node.type === 'ak-varga'}
									<span class="descriptor-text grey">(Amarakosha)</span>
								{/if}
							</p>
						{/each}
					</div>
				{/if}
				{#if data.referencedBy.length}
					<div class="grid three tight">
						{#each data.referencedBy as node (node.id)}
							<p><a href={nodeHref(node)}>{node.title}</a></p>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
</Container>
