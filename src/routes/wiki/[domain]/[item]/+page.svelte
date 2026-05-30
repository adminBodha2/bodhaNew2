<script lang="ts">
	import type { PageData } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
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
			<div class="tag-list ptop8">
				{#each cleanTags as tag}
					<span class="txt-xs tt-u w500 grey0">{tag.replaceAll('-', ' ')}</span>
				{/each}
			</div>
		{/if}
	</section>

	<section class="wrapper-std min100vh" style="justify-content: start">
		<div class="box rgap40">
			{#if data.referencedBy.length > 0}
				<div class="box rgap16">
					<p class="txt-00 tt-u w600 grey0">Referenced by</p>
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap16">
						{#each data.referencedBy as item (item.id)}
							<a class="box whitestone tight-pad paper-1" href={nodeHref(item)}>
								<p class="txt-xs tt-u w500 theme">{item.type.replaceAll('-', ' ')}</p>
								<p class="txt-lg w600 a-hover ptop12 pbot4">{item.title}</p>
								{#if item.description}
									<p class="grey1 lh14 txt-sm">{item.description}</p>
								{/if}
							</a>
						{/each}
					</div>
				</div>
			{/if}

			{#if data.related.length > 0}
				<div class="box rgap16">
					<p class="txt-00 tt-u w600 grey0">Draws on &amp; addresses</p>
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap16">
						{#each data.related as item (item.id)}
							<a class="box whitestone tight-pad paper-1" href={nodeHref(item)}>
								<p class="txt-xs tt-u w500 theme">{item.type.replaceAll('-', ' ')}</p>
								<p class="txt-lg w600 a-hover ptop12 pbot4">{item.title}</p>
								{#if item.description}
									<p class="grey1 lh14 txt-sm">{item.description}</p>
								{/if}
							</a>
						{/each}
					</div>
				</div>
			{/if}

			{#if data.referencedBy.length === 0 && data.related.length === 0}
				<p class="grey1">This wiki entry has no additional mapped connections yet.</p>
			{/if}
		</div>
	</section>
</Container>

<style lang="sass">

.tag-list
	display: flex
	flex-wrap: wrap
	gap: 7px

	a, span
		padding: 2px 8px
		border-radius: 3px
		background: rgba(0, 0, 0, 0.03)

	a:hover
		background: rgba(211, 99, 58, 0.1)
		color: var(--theme)

</style>
