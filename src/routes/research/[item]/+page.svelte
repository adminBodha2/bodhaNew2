<script lang="ts">
	import { page } from '$app/state';
	import type { PageData } from './$types';
	import '$lib/styles/system/document-layout.sass';
	import Container from '$lib/comps/wrapper.svelte';
	import Parallax from '$lib/comps/parallaxhalf.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Slide from '$lib/svelteanim/components/Slide2.svelte';
	import { absoluteImage, absoluteUrl, articleJsonLd, stringifyJsonLd } from '$lib/utils/seo';
	import Title from '$lib/comps/page-title.svelte';

	let { data } = $props();

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
<Parallax imageLink={data.image} wipe={true} />
<Container>
	<section class="docgrid">
		<div class="box docside">
			<nav class="doclist">
				{#if data.research && data.research.length > 0}
					<p class="txt-sm tt-u w500 grey0 pbot16">Other Projects</p>
					<div class="box rgap16">
						{#each data.research as item}
							{#if item.meta.title !== data.title}
							<a class="doclink txt-bs sm:txt-lg grey2" href={item.linkpath}>
							{item.meta.title}
							</a>
						{/if}
					{/each}
					</div>
				{/if}
			</nav>
		</div>
		<div class="docmain rgap32 box pbot32">
			<Crumb showT={true} showD={true} showRow={true} title={data.title} desc={data.description} fullP={true} isSolo={true}>
				{#if data.tags && data.tags.length > 0}
					<div class="row cgap8 rgap4 wrap">
						{#each data.tags as tag}
							<a class="standard-pill" href="/concepts/{tag}">#{tag.replaceAll('-', ' ')}</a>
						{/each}
					</div>
				{/if}
			</Crumb>
			<article class="doctext classic-document">
				<data.content />
			</article>
			{#if data.matrixItems && data.matrixItems.length > 0}
				<div class="box bordertop ptop64 rgap32">
					<Title text="Also See" sizeType={true}/>
					<Slide targetSelector=".slide-item">
					<div class="grid grid-cols-1 lg:grid-cols-2 gap16">
						{#each data.matrixItems as item}
							<a class="rgap8 box tight-pad slide-item b-main h-paper-1 whitestone" href={item.linkpath}>
								<p class="txt-00 tt-u w500 grey1">{item.type}</p>
								<p class="txt-lg a-hover w500">{item.title}</p>
								<p class="grey2">{item.description}</p>
							</a>
						{/each}
					</div>
					</Slide>
				</div>
			{/if}
		</div>
	</section>
</Container>
