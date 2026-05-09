<script lang="ts">
	import { page } from '$app/state';
	import type { PageData } from './$types';
	import '$lib/styles/system/document-layout.sass';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import { absoluteImage, absoluteUrl, articleJsonLd, stringifyJsonLd } from '$lib/utils/seo';
	import WaterRipple from '$lib/motion-core/water-ripple/WaterRipple.svelte';
	import Title from '$lib/comps/page-title.svelte'

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
	<section class="dohero">
		<WaterRipple src={data.image} class="ripple-motion" {brushSize} />
	</section>
	<section class="docgrid">
		<div class="box docside">
			<div class="doclist">
				{#if data.research && data.research.length > 0}
					{#each data.research as item}
						<a class="doclink sidebar-text" href={item.linkpath}>
							{item.meta.title}
						</a>
					{/each}
				{/if}
			</div>
		</div>
		<div class="docmain rgap32 box pbot32">
			<div class="labelbox title-area">
				<Crumb showT={true} showD={true} showRow={true} title={data.title} desc={data.description}>
				{#if data.tags && data.tags.length > 0}
					<div class="row cgap4 rgap4 wrap">
						{#each data.tags as tag}
							<a class="tag-pill tt-u blank" href="/concepts/{tag}">{tag.replaceAll('-', ' ')}</a>
						{/each}
					</div>
				{/if}
				</Crumb>
			</div>
			<div class="doctext classic-document">
				<data.content />
			</div>
			{#if data.linkedNodes?.length > 0}
				<div class="box rgap32 bordertop ptop32">
					<p class="card-title w600">Related Readings</p>
					<div class="grid grid-cols-2 lg:grid-cols-3 cgap4 rgap4">
						{#each data.linkedNodes as item (item.nodeId)}
							<a class="blank box rgap8 b-main p16 lg:p24 radius ncolor-inv" href={item.href} target={item.isExternal ? '_blank' : undefined} rel={item.isExternal ? 'noreferrer' : undefined}>
								<div class="box rgap8">
									<p class="tag-text lgrey tt-u">{item.node.type}</p>
									<p class="paragraph-text w600 a-hover tight">{item.node.title}</p>
									{#if item.node.description}
										<p class="grey tight">{item.node.description}</p>
									{/if}
								</div>
								<div class="row wrap cgap4 rgap4 self-bottom">
									{#each item.node.tags as tag}
										<p class="tag-pill hollow tt-u themed dead">{tag.replaceAll('-', ' ')}</p>
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
