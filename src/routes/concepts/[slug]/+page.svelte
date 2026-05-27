<script lang="ts">
	import type { PageProps } from './$types';
	import { page } from '$app/state';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Container from '$lib/comps/wrapper.svelte';
	import Slide from '$lib/svelteanim/components/Slide2.svelte';
	import { absoluteImage, absoluteUrl, collectionPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';

	let { data }: PageProps = $props();

	const groups = $derived(
		[
			{ label: 'Essays', items: data.grouped.blogs },
			{ label: 'Books', items: data.grouped.books },
			{ label: 'Big Questions', items: data.grouped.questions },
			{ label: 'Research', items: data.grouped.projects },
			{ label: 'Thinkers', items: data.grouped.thinkers },
			{ label: 'Schools', items: data.grouped.schools },
			{ label: 'Labs', items: data.grouped.labs },
			{ label: 'Essays Outside', items: data.grouped.externalArticles }
		].filter((group) => group.items.length > 0)
	);

	let isItem = $state(0);

	function toggleIsItem(newIndex: number) {
		isItem = newIndex;
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
					name: item.title,
					description: item.description,
					url: item.meta?.route ?? metaUrl
				}))
			})
		)
	);
</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="2560" imHeight="1440" {jsonld} />

<Container>
	<section class="wrapper-std tight-stack">
		<Crumb showT={true} title={data.concept.title} showD={true} desc={data.concept.description} showRow={true}>
			<div class="row gap4 wrap">
				<p class="standard-pill">{data.count} connected nodes</p>
				{#each data.concept.tags as tag}
					<p class="standard-pill">{tag.replaceAll('-', ' ')}</p>
				{/each}
			</div>
		</Crumb>
		<div class="doc-header-grid">
			<aside class="box" aria-label="Card metadata">
				<nav class="box rgap16 ptop32 stickybox">
					{#each data.domains as domain (domain.id)}
						<a class="doclink blank box rgap4 p12 linkonhover" href={`/concepts/${domain.slug}`}>
							{domain.title}
						</a>
					{/each}
				</nav>
			</aside>
			<div class="main-area">
				<Slide>
				<div class="box containing-graph">
					{#each groups as group, i (group.label)}
						{#if i === isItem}
							<div class="grid grid-cols-1 lg:grid-cols-3 gap16" id="node-grid">
								{#each group.items as item, j (item.id)}
									<a class="blank box rgap8 tight-pad b-main whitestone slide-item" href={item.href} target={item.isExternal ? '_blank' : undefined} rel={item.isExternal ? 'noreferrer' : undefined}>
										<p class="txt-00 tt-u w500 grey1">{item.type}</p>
										<p class="txt-lg w600 a-hover">{item.title}</p>
										{#if item.description}
											<p class="grey1">
												{item.description}
											</p>
										{/if}
										<div class="row wrap ycenter self-bottom bordertop ptop8">
											{#each item.tags as tag}
												<p class="txt-00 theme-dark w500 tt-u">{tag.replaceAll('-', ' ')}</p>
											{/each}
										</div>
									</a>
								{/each}
							</div>
						{/if}
					{/each}
				</div>
				</Slide>
			</div>
		</div>
	</section>
</Container>
