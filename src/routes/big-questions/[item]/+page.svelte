<script lang="ts">
	import { page } from '$app/state';
	import type { PageData } from './$types';
	import '$lib/styles/system/document-layout.sass';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import HubRelatedLinks from '$lib/comps/hub-related-links.svelte';
	import Parallax from '$lib/comps/parallaxhalf.svelte';
	import { absoluteImage, absoluteUrl, articleJsonLd, stringifyJsonLd } from '$lib/utils/seo';
	import seoTopicLinks from '$lib/generated/seo-topic-links.json';
	import Title from '$lib/comps/page-title.svelte';

	interface Props {
		data: PageData;
		brushSize?: number;
	}

	let { data, brushSize = 100 }: Props = $props();

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
	const dharmaTopic = seoTopicLinks.topics.dharma;
	const relatedDharmaPages = $derived(dharmaTopic?.supportingPages ?? []);
</script>

<svelte:window bind:scrollY={sY} />

<Head {title} {metaDescription} {metaUrl} {metaImage} ogType="article" {jsonld} imWidth="1024" imHeight="683" />
	<Parallax imageLink={data.icon} wipe={true} />
<Container>
	<section class="docgrid">
		<div class="box docside">
			<nav class="doclist">
				{#if data.questions?.length > 0}
					<p class="txt-sm tt-u w500 grey0 pbot16">Other Big Questions</p>
					<div class="box rgap16">
						{#each data.questions as item (item.linkpath)}
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
			<Crumb showT={true} title={data.title} showD={true} desc={data.description} fullP={true} showRow={true} onblog={true}>
				{#if data.tags && data.tags.length > 0}
					<div class="row wrap cgap4 rgap4">
						{#each data.tags as tag (tag)}
							<a class="standard-pill" href="/concepts/{tag}">#{tag.replaceAll('-', ' ')}</a>
						{/each}
					</div>
				{/if}
			</Crumb>
			<div class="doctext classic-document">
				<data.content />
			</div>
			{#if data.linkedNodes?.length > 0}
				<section class="box rgap32 bordertop ptop64">
					<Title text="Related Readings" sizeType={true}/>
					<div class="grid grid-cols-1 lg:grid-cols-2 white-grid">
						{#each data.linkedNodes as item (item.nodeId)}
							<a class="blank box rgap16 lg:rgap24 p24 lg:p32 whitestone" href={item.href} target={item.isExternal ? '_blank' : undefined} rel={item.isExternal ? 'noreferrer' : undefined}>
								<div class="box rgap16">
									<p class="txt-xs theme w500 tt-u">{item.node.type.replaceAll('-',' ')}</p>
									<p class="a-hover txt-xl w600">{item.node.title}</p>
									{#if item.node.description}
										<p class="grey1 lh14">{item.node.description}</p>
									{/if}
								</div>
								<div class="row wrap cgap8 rgap4 self-bottom ptop32">
									{#each item.node.tags as tag (tag)}
										<p class="txt-00 tt-u w500 grey0">{tag.replaceAll('-', ' ')}</p>
									{/each}
								</div>
							</a>
						{/each}
					</div>
				</section>
			{/if}
		</div>
	</section>
	{#if data.item === 'core-of-sanatana-dharma'}
		<HubRelatedLinks title="Further Readings" items={relatedDharmaPages} />
	{/if}
</Container>
