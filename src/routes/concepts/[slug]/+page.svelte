<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/state';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Responsive from '$lib/comps/responsive-menu.svelte'
	import { absoluteImage, absoluteUrl, collectionPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';
	import { slide } from 'svelte/transition'
	import { quartInOut, quintOut } from 'svelte/easing'

	let { data }: { data: PageData } = $props();

	const groups = $derived([
		{ label: 'Essays', items: data.grouped.blogs },
		{ label: 'Books', items: data.grouped.books },
		{ label: 'Big Questions', items: data.grouped.questions },
		{ label: 'Research', items: data.grouped.projects },
		{ label: 'Thinkers', items: data.grouped.thinkers },
		{ label: 'Schools', items: data.grouped.schools },
		{ label: 'Labs', items: data.grouped.labs },
		{ label: 'Essays Outside', items: data.grouped.externalArticles }
	].filter((group) => group.items.length > 0));

	let isItem = $state(0)

	function toggleIsItem(newIndex:number){
		isItem = newIndex
	}

	let description = $derived(data.concept.description || `${data.count} nodes connected to ${data.concept.title}.`);
	let title = $derived(data.concept.title + ' | Bodha Concepts');
	let metaDescription = $derived(description);
	let metaUrl = $derived(absoluteUrl(page.url.pathname));
	const metaImage = absoluteImage('/images/bodhacover.png');

	let jsonld = $derived(
		stringifyJsonLd(
			collectionPageJsonLd({
				name: title,
				description: metaDescription,
				url: metaUrl,
				image: metaImage,
				items: data.relatedNodes.map((item) => ({
					name: item.node.title,
					description: item.node.description,
					url: item.href
				}))
			})
		)
	);
</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="2560" imHeight="1440" {jsonld} />

<Container graphing={true}>
	<section class="box wrapper-std header-margin rgap32">
		<Crumb showT={true} title={data.concept.title} showRow={true}>
		<p class="grey">{data.conceptTree.length} subdomains nested under this concept, connecting to {data.count} nodes.  All concept items in knowledge base here.</p>
		</Crumb>
		<Responsive>
			{#each groups as group, i}
				<button class="selection-button" class:active={isItem=== i} onclick={() => toggleIsItem(i)}>{group.label}</button>
			{/each}
		</Responsive>
		<div class="box containing-graph">
				{#each groups as group, i (group.label)}
					{#if i === isItem}
						<div class="grid lg:grid-cols-3 xl:grid-cols-4 b-main radius" id="node-grid">
							{#each group.items as item, j (item.node.id)}
								<div class="number box">
								<a
									class="blank box p16 lg:p32 rgap8"
									href={item.href}
									target={item.isExternal ? '_blank' : undefined}
									rel={item.isExternal ? 'noreferrer' : undefined}
									in:slide|global={{ delay: j * 30, easing: quintOut }} out:slide={{ easing: quartInOut }}
								>
									<p class="paragraph-text w600 tight">{item.node.title}</p>
									{#if item.node.description}
										<p class="grey tight">{item.node.description}</p>
									{/if}
								</a>
									<div class="row cgap4 rgap4 wrap ycenter self-bottom bordertop pleft16 lg:pleft32 ptop16 pbot16 tags">
										{#each item.node.tags as tag}
											<a class="tag-pill hollow tt-u" href="/concepts/{tag}">{tag.replaceAll('-',' ')}</a>
										{/each}
									</div>
								</div>
							{/each}
						</div>
					{/if}
				{/each}
			</div>
	</section>
</Container>

<style lang="sass">

.tags
	background: var(--color-grey-2)

#node-grid
	overflow: hidden
	gap: 8px

</style>
