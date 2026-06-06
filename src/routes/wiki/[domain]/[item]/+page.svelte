<script lang="ts">
	import type { PageData } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import CardGrid from '$lib/comps/card-grid.svelte';
	import TagList from '$lib/comps/tag-list.svelte';
	import { absoluteImage, absoluteUrl } from '$lib/utils/seo';
	import { nodeHref } from '$lib/wiki-graph';

	let { data }: { data: PageData } = $props();

	const title = $derived(`${data.node.title} | ${data.domain.title} | Bodha Wiki`);
	const metaDescription = $derived(data.node.description || 'Synthesized knowledge page in the Bodha wiki graph.');
	const metaUrl = $derived(absoluteUrl(`/wiki/${data.domain.slug}/${data.node.slug}`));
	const metaImage = absoluteImage('/images/bodhacover.png');

	const authors = $derived(data.node.meta?.author ?? []);
	const lens = $derived(data.node.meta?.lens || null);
	const cleanTags = $derived((data.node.tags ?? []).filter((t) => t && t.trim().length > 0));

	const referencedByCards = $derived(
		data.referencedBy.map((item) => ({
			id: item.id,
			title: item.title,
			description: item.description,
			type: item.type.replaceAll('-', ' '),
			href: nodeHref(item)
		}))
	);

	const relatedCards = $derived(
		data.related.map((item) => ({
			id: item.id,
			title: item.title,
			description: item.description,
			type: item.type.replaceAll('-', ' '),
			href: nodeHref(item)
		}))
	);
</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="2560" imHeight="1440" />

<Container>
	<section class="wrapper-std">
		<Crumb showT={true} title={data.node.title} showD={true} desc={data.node.description} showRow={true}>
			<div class="box rgap4">
				<a class="txt-xs tt-u w500 theme" href="/wiki/{data.domain.slug}">← {data.domain.title}</a>
				{#if lens}
					<p class="txt-xs tt-u w500 theme">Lens: {lens}</p>
				{/if}
			</div>
		</Crumb>

		{#if authors.length}
			<div class="box rgap4 ptop8">
				<p class="txt-sm w500 grey2">Synthesized from works by {authors.join(', ')}</p>
			</div>
		{/if}

		{#if cleanTags.length}
			<div class="ptop8">
				<TagList tags={cleanTags} color="grey0" compact={true} />
			</div>
		{/if}
	</section>

	<section class="wrapper-std min100vh" style="justify-content: start">
		<div class="box rgap40">
			{#if data.referencedBy.length > 0}
				<div class="box rgap16">
					<p class="txt-00 tt-u w600 grey0">Referenced by</p>
					<CardGrid items={referencedByCards} columns={3} compact={true} />
				</div>
			{/if}

			{#if data.related.length > 0}
				<div class="box rgap16">
					<p class="txt-00 tt-u w600 grey0">Draws on &amp; addresses</p>
					<CardGrid items={relatedCards} columns={3} compact={true} />
				</div>
			{/if}

			{#if data.referencedBy.length === 0 && data.related.length === 0}
				<p class="grey1">This wiki entry has no additional mapped connections yet.</p>
			{/if}
		</div>
	</section>
</Container>
