<script lang="ts">

	import { page } from '$app/state';
	import type { PageData } from './$types';
	import '$lib/styles/system/document-layout.sass';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import { absoluteImage, absoluteUrl, articleJsonLd, stringifyJsonLd } from '$lib/utils/seo';
	import WaterRipple from '$lib/motion-core/water-ripple/WaterRipple.svelte';

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
	<section class="dohero">
		<WaterRipple src={data.icon} class="ripple-motion" {brushSize}/>
	</section>
	<section class="docgrid">
		<div class="box docside">
			{#if data.questions?.length > 0}
				<div class="doclist">
					{#each data.questions as item}
						{#if item.meta.title !== data.title}
							<a class="doclink sidebar-text" href={item.linkpath}>
								{item.meta.title}
							</a>
						{/if}
					{/each}
				</div>
			{/if}
		</div>
		<div class="docmain box rgap32">
			<div class="box title-area">
				<Crumb showT={true} title={data.title} showD={true} desc={data.description} fullP={true} showRow={true}>
				{#if data.tags && data.tags.length > 0}
					<div class="row wrap cgap4 rgap4">
						{#each data.tags as tag}
							<a class="tag-pill tt-u blank" href="/concepts/{tag}">{tag.replaceAll("-"," ")}</a>
						{/each}
					</div>
				{/if}
				</Crumb>
			</div>
			<div class="doctext classic-document">
				<data.content />
			</div>
			{#if data.linkedNodes?.length > 0}
				<section class="box rgap32 bordertop ptop32">
					<p class="card-title">Related Readings</p>
					<div class="grid grid-cols-1 lg:grid-cols-2 white-grid">
						{#each data.linkedNodes as item (item.nodeId)}
							<a
								class="blank textbox whitestone p16 lg:p32"
								href={item.href}
								target={item.isExternal ? '_blank' : undefined}
								rel={item.isExternal ? 'noreferrer' : undefined}
							>
							<div class="box rgap16">
								<p class="tag-text lgrey tt-u">{item.node.type}</p>
								<p class="paragraph-text w500 tight">{item.node.title}</p>
								{#if item.node.description}
									<p class="descriptor-text grey tight">{item.node.description}</p>
								{/if}
							</div>
							<div class="row wrap cgap8 rgap4 self-bottom ptop32">
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
