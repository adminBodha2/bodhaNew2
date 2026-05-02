<script lang="ts">

	import { page } from '$app/state';
	import type { PageData } from './$types';
	import '$lib/styles/lab2.sass';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import { absoluteImage, absoluteUrl, articleJsonLd, stringifyJsonLd } from '$lib/utils/seo';
	import { WaterRipple } from "$lib/motion-core";

	interface Props {
	    data: PageData;
	    brushSize?: number;
	}

let { 
    data, 
    brushSize = 100, 
}: Props = $props();

	let sY = $state(0);

	let title = $derived(data.title + ' | Big Questions at Bodha');
	let metaDescription = $derived(data.description);
	let metaUrl = $derived(absoluteUrl(page.url.pathname));
	let metaImage = $derived(absoluteImage(data.icon));

	let jsonld = $derived(
		stringifyJsonLd(
			articleJsonLd({
				headline: data.title,
				description: data.description,
				image: metaImage,
				url: metaUrl
			})
		)
	);

</script>

<svelte:window bind:scrollY={sY} />

<Head {title} {metaDescription} {metaUrl} {metaImage} ogType="article" {jsonld} imWidth="1024" imHeight="683" />
<Container>
<section class="key-image">
	<WaterRipple src={data.icon} class="ripple-motion" {brushSize}/>
</section>
	<section class="documents-grid">
		<div class="box sidearea">
			{#if data.questions?.length > 0}
				<div class="all-items">
					{#each data.questions as item}
					{#if item.meta.title !== data.title}
						<a class="project-link sidebar-text" href={item.linkpath}>
							{item.meta.title}
						</a>
					{/if}
					{/each}
				</div>
			{/if}
		</div>
		<div class="stdbox mainarea">
			<div class="labelbox title-area stdpad is-first is-last">
				<Crumb showT={true} title={data.title} showD={true} desc={data.description} showRow={true}>
				{#if data.tags && data.tags.length > 0}
					<div class="row wrap">
						{#each data.tags as tag}
							<a class="tag-pill tt-u blank" href="/concepts/{tag}">{tag.replaceAll("-"," ")}</a>
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
							<a
								class="blank textbox whitestone card-padded"
								href={item.href}
								target={item.isExternal ? '_blank' : undefined}
								rel={item.isExternal ? 'noreferrer' : undefined}
							>
							<div class="labelbox">
								<p class="tag-text lgrey tt-u">{item.node.type}</p>
								<p class="paragraph-text w500 tight">{item.node.title}</p>
								{#if item.node.description}
									<p class="descriptor-text grey tight">{item.node.description}</p>
								{/if}
							</div>
							<div class="row wrap cgap8 rgap4 self-bottom">
									{#each item.node.tags as tag}
										<p class="tag-pill hollow tt-u themed">{tag.replaceAll('-',' ')}</p>
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
