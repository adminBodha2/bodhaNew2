<script lang="ts">

	import { page } from '$app/state';
	import type { PageData } from './$types';
	import '$lib/styles/lab2.sass'
	import Container from '$lib/comps/container.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import { absoluteImage, absoluteUrl, articleJsonLd, stringifyJsonLd } from '$lib/utils/seo';
	import { WaterRipple } from "$lib/motion-core";
	import Liner from '$lib/icons/anim-line.svelte'

	interface Props {
	    data: PageData;
	    brushSize?: number;
	}
	
let { 
    data, 
    brushSize = 100, 
}: Props = $props();

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
<section class="key-image">
	<WaterRipple src={data.image} class="ripple-motion" {brushSize}/>
</section>
<Container narrow={true} scaled={true}>
	<section class="documents-grid">
		<div class="box sidearea">
				<div class="labelbox all-items">
				{#if data.research && data.research.length > 0}
					{#each data.research as item}
					<a class="blank project-link whitestone" href={item.linkpath}>
						<p class="tight grey rem1">{item.meta.title}</p>
					</a>
					{/each}
				{/if}
				</div>
		</div>
		<div class="box mainarea">
			<div class="textbox borderbot">
				<Crumb rgap={16} item1="Research" item1Link="/research"/>
				<h1 class="doc-title source-serif">{data.title}</h1>
				<p class="rem1 grey">{data.description}</p>
				{#if data.tags && data.tags.length > 0}
					<div class="row wrap">
						{#each data.tags as tag}
							<a class="tag-pill tt-u blank" href="/concepts/{tag}">{tag.replaceAll("-"," ")}</a>
						{/each}
					</div>
				{/if}
			</div>
			<div class="classic-document ptop32 pbot32">
				<data.content />
				<Liner/>
			</div>
			{#if data.linkedNodes?.length > 0}
				<section class="stdbox padded bordertop">
					<h2 class="source-serif">Related Readings</h2>
					<div class="grid two white-grid">
						{#each data.linkedNodes as item (item.nodeId)}
							<a
								class="blank labelbox whitestone card-padded"
								href={item.href}
								target={item.isExternal ? '_blank' : undefined}
								rel={item.isExternal ? 'noreferrer' : undefined}
							>
							<div class="labelbox">
								<p class="w500 tight">{item.node.title}</p>
								{#if item.node.description}
									<p class="small-text grey tight">{item.node.description}</p>
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
