<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/state';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import { absoluteImage, absoluteUrl, collectionPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';
	import Buttontray from '$lib/comps/buttontray.svelte'
	import Dropdown from '$lib/comps/responsive-menu.svelte'
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
	<div class="header-margin">
			<div class="labelbox">
				<Crumb showT={true} title={data.concept.title} showRow={true}>
				<p class="descriptor-text grey">{data.conceptTree.length} subdomains nested under this concept, connecting to {data.count} nodes. All subdomains listed here:</p>
				</Crumb>
			</div>
			<div class="elembox">
				<Buttontray 
					options={groups} 
					onSelect={toggleIsItem} 
				/>
				{#each groups as group, i (group.label)}
					{#if i === isItem}
						<div class="node-grid">
							{#each group.items as item, j (item.node.id)}
								<a
									class="blank labelbox whitestone card-padded node-card"
									href={item.href}
									target={item.isExternal ? '_blank' : undefined}
									rel={item.isExternal ? 'noreferrer' : undefined}
									in:slide|global={{ delay: j * 30, easing: quintOut }} out:slide={{ easing: quartInOut }}
								>
									<p class="paragraph-text w500 tight">{item.node.title}</p>
									{#if item.node.description}
										<p class="descriptor-text grey tight">{item.node.description}</p>
									{/if}
									<div class="row cgap4 rgap4 wrap ycenter self-bottom bordertop ptop8">
										{#each item.node.tags as tag}
											<span class="tag-pill dead tt-u">{tag.replaceAll('-',' ')}</span>
										{/each}
									</div>
								</a>
							{/each}
						</div>
					{/if}
				{/each}
			</div>
	</div>
</Container>

<style lang="sass">

.node-grid
	display: grid
	grid-template-columns: 1fr
	gap: 1px
	background: var(--color-grey-1)
	border: var(--border-main)
	@media screen and (min-width: 760px)
		grid-template-columns: repeat(2, minmax(0, 1fr))
	@media screen and (min-width: 1180px)
		grid-template-columns: repeat(3, minmax(0, 1fr))

.node-card
	min-height: 100%

</style>
