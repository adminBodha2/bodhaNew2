<script lang="ts">
	import { page } from '$app/state';
	import type { PageData } from './$types';
	import '$lib/styles/system/document-layout.sass';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import HubRelatedLinks from '$lib/comps/hub-related-links.svelte';
	import Parallax from '$lib/comps/parallaxhalf-new.svelte';
	import { absoluteImage, absoluteUrl, articleJsonLd, stringifyJsonLd } from '$lib/utils/seo';
	import seoTopicLinks from '$lib/generated/seo-topic-links.json';
	import Slide from '$lib/svelteanim/components/Slide2.svelte';

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

<Parallax src={data.icon} alt={data.title} />
<Container>
	<div class="doc-wrapper">
		<Crumb showT={true} title={data.title} showD={true} desc={data.description} fullP={true} showRow={true}>
			{#if data.tags && data.tags.length > 0}
				<div class="row wrap cgap4 rgap4">
					{#each data.tags as tag (tag)}
						<p class="standard-pill">#{tag.replaceAll('-', ' ')}</p>
					{/each}
				</div>
			{/if}
		</Crumb>
		<div class="triple-grid">
			<div class="triple-left">
				<Slide targetSelector=".doclink">
					<nav class="box rgap16">
						{#if data.questions?.length > 0}
							{#each data.questions as item (item.linkpath)}
								{#if item.meta.title !== data.title}
									<a class="box doclink" href={item.linkpath}>
										<p class="w600 a-hover">{item.meta.title}</p>
										<p class="txt-sm grey1">{item.meta.description}</p>
									</a>
								{/if}
							{/each}
						{/if}
					</nav>
				</Slide>
			</div>
			<div class="triple-mid">
				<div class="doctext classic-document">
					<data.content />
				</div>
				<div class="triple-right">
					<Slide targetSelector=".related-item">
						<div class="grid grid-cols-1 lg:grid-cols-3 gap16">
							{#each data.linkedNodes as item (item.nodeId)}
								<a class="blank box related-item tight-pad b-main whitestone" href={item.href} target={item.isExternal ? '_blank' : undefined} rel={item.isExternal ? 'noreferrer' : undefined}>
									<div class="box rgap16">
										<p class="txt-00 theme w500 tt-u">{item.node.type.replaceAll('-', ' ')}</p>
										<p class="txt-lg a-hover w600">{item.node.title}</p>
										{#if item.node.description}
											<p class="grey1 lh14">{item.node.description}</p>
										{/if}
									</div>
									<div class="row wrap cgap4 rgap4 self-bottom ptop32">
										{#each item.node.tags as tag (tag)}
											<p class="txt-xs tt-u w500 grey2">{tag.replaceAll('-', ' ')}</p>
										{/each}
									</div>
								</a>
							{/each}
						</div>
					</Slide>
					{#if data.item === 'core-of-sanatana-dharma'}
						<HubRelatedLinks title="Further Readings" items={relatedDharmaPages} />
					{/if}
				</div>
			</div>
		</div>
	</div>
</Container>

<style lang="sass">

.triple-grid
	display: grid
	grid-auto-flow: row
	.triple-left
		grid-area: triple-left
	.triple-mid
		grid-area: triple-mid
	grid-temple-columns: 1fr
	grid-template-areas: "triple-mid" "triple-left"
	.triple-right
		padding-top: 1rem
		padding-bottom: 2rem
	.triple-left
		padding-top: 2rem
		border-top: var(--border-main)
	@media (min-width: 1025px)
		grid-template-columns: 400px 1fr
		grid-template-areas: "triple-left triple-mid"
		column-gap: 4rem
		.classic-document
			max-width: 58rem
		.triple-left, .triple-mid
			padding-top: 4rem
		.triple-left
			height: 100%
		.triple-right
			padding-top: 2rem


</style>
