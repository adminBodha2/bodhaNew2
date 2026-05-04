<script lang="ts">
	import { page } from '$app/state';
	import type { PageData } from './$types';
	import '$lib/styles/lab2.sass';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import { absoluteImage, absoluteUrl, articleJsonLd, stringifyJsonLd } from '$lib/utils/seo';
	import { WaterRipple } from '$lib/motion-core';
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
	<section class="key-image">
		<WaterRipple src={data.image} class="ripple-motion" {brushSize} />
	</section>
	<section class="documents-grid">
		<div class="box sidearea">
			<div class="all-items">
				{#if data.research && data.research.length > 0}
					{#each data.research as item}
						<a class="project-link sidebar-text" href={item.linkpath}>
							{item.meta.title}
						</a>
					{/each}
				{/if}
			</div>
		</div>
		<div class="stdbox mainarea stdpad is-first is-last">
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
			<div class="classic-document">
				<data.content />
			</div>
			{#if data.linkedNodes?.length > 0}
				<section class="box rgap32">
					<p class="card-title">Related Readings</p>
					<div class="grid two white-grid">
						{#each data.linkedNodes as item (item.nodeId)}
							<a class="blank textbox whitestone card-padded" href={item.href} target={item.isExternal ? '_blank' : undefined} rel={item.isExternal ? 'noreferrer' : undefined}>
								<div class="labelbox">
									<p class="tag-text lgrey tt-u">{item.node.type}</p>
									<p class="paragraph-text w500 tight">{item.node.title}</p>
									{#if item.node.description}
										<p class="descriptor-text grey tight">{item.node.description}</p>
									{/if}
								</div>
								<div class="row wrap cgap8 rgap4 self-bottom">
									{#each item.node.tags as tag}
										<p class="tag-pill hollow tt-u themed">{tag.replaceAll('-', ' ')}</p>
									{/each}
								</div>
							</a>
						{/each}
					</div>
				</section>
			{/if}
		</div>
	</section>
</Container>
