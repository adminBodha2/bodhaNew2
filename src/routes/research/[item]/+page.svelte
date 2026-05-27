<script lang="ts">
	import { page } from '$app/state';
	import type { PageData } from './$types';
	import '$lib/styles/system/document-layout.sass';
	import Container from '$lib/comps/wrapper.svelte';
	import Parallax from '$lib/comps/parallaxhalf.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
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
			{#if data.linkedNodes?.length > 0}
				<div class="box rgap32 bordertop ptop64">
					<Title text="Related Readings" sizeType={true}/>
					<div class="grid grid-cols-1 lg:grid-cols-2 white-grid">
						{#each data.linkedNodes as item (item.nodeId)}
							<a class="blank box rgap16 lg:rgap24 p24 lg:p32 whitestone" href={item.href} target={item.isExternal ? '_blank' : undefined} rel={item.isExternal ? 'noreferrer' : undefined}>
								<div class="box rgap4">
									<p class="txt-xs theme w500 tt-u">{item.node.type.replaceAll('-',' ')}</p>
								</div>
								<div class="box rgap16">
									<p class="a-hover txt-xl w600">{item.node.title}</p>
									{#if item.node.description}
										<p class="grey1 lh14">{item.node.description}</p>
									{/if}
								</div>
							</a>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</section>
</Container>
