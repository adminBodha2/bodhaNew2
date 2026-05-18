<script lang="ts">
	import { page } from '$app/state';
	import type { PageData } from './$types';
	import '$lib/styles/system/document-layout.sass';
	import Container from '$lib/comps/wrapper.svelte';
	import Parallax from '$lib/comps/parallaxhalf.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import { absoluteImage, absoluteUrl, articleJsonLd, stringifyJsonLd } from '$lib/utils/seo';
	import WaterRipple from '$lib/motion-core/water-ripple/WaterRipple.svelte';
	import Title from '$lib/comps/page-title.svelte';

	interface Props {
		data: PageData;
		brushSize?: number;
	}

	let { data, brushSize = 100 }: Props = $props();

	let sY = $state(0);

	let title = $derived(data.title + ' | Research Project at Bodha');
	let metaDescription = $derived(data.description);
	let metaUrl = $derived(absoluteUrl(page.url.pathname));
	let metaImage = $derived(absoluteImage(data.image));

	let jsonld = $derived(
		stringifyJsonLd(
			articleJsonLd({
				headline: title,
				description: data.description,
				image: metaImage,
				url: metaUrl
			})
		)
	);
</script>

<svelte:window bind:scrollY={sY} />

<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="1536" imHeight="1024" ogType="article" {jsonld} />
<Container>
	<Parallax imageLink={data.image} wipe={true} />
	<section class="docgrid">
		<div class="box docside">
			<nav class="doclist">
				{#if data.research && data.research.length > 0}
					<p class="tt-u grey0 pbot16">Other Projects</p>
					{#each data.research as item}
						{#if item.meta.title !== data.title}
							<a class="doclink sidebar-text" href={item.linkpath}>
								{item.meta.title}
							</a>
						{/if}
					{/each}
				{/if}
			</nav>
		</div>
		<div class="docmain rgap32 box pbot32">
			<Crumb showT={true} showD={true} showRow={true} title={data.title} desc={data.description} fullP={true}>
				{#if data.tags && data.tags.length > 0}
					<div class="row cgap8 rgap4 wrap">
						{#each data.tags as tag}
							<a class="txt-sm w500 theme tt-u blank" href="/concepts/{tag}">#{tag.replaceAll('-', ' ')}</a>
						{/each}
					</div>
				{/if}
			</Crumb>
			<article class="doctext classic-document sm:p8">
				<data.content />
			</article>
			{#if data.linkedNodes?.length > 0}
				<div class="box rgap32 bordertop ptop32">
					<h2 class="txt-2xl ls000p w600">Related Readings</h2>
					<div class="grid grid-cols-1 lg:grid-cols-3 gap16">
						{#each data.linkedNodes as item (item.nodeId)}
							<a class="blank box rgap16 b-main p16 lg:p24 radius whitestone" href={item.href} target={item.isExternal ? '_blank' : undefined} rel={item.isExternal ? 'noreferrer' : undefined}>
								<div class="box rgap16">
									<p class="txt-xs grey0 tt-u">{item.node.type}</p>
									<p class="a-hover txt-xl w600">{item.node.title}</p>
									{#if item.node.description}
										<p class="grey0">{item.node.description}</p>
									{/if}
								</div>
								<div class="row wrap cgap8 rgap4 self-bottom">
									{#each item.node.tags as tag}
										<p class="txt-xs w500 tt-u">#{tag.replaceAll('-', ' ')}</p>
									{/each}
								</div>
							</a>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</section>
</Container>
