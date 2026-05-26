<svelte:options runes={true} />

<script lang="ts">
	import type { PageData } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Parallax from '$lib/comps/parallaxhalf.svelte';
	import Title from '$lib/comps/page-title.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import { useInView } from '$lib/svelteanim/utils/useInView.svelte';
	import Reveal from '$lib/svelteanim/components/Reveal.svelte';
	import { absoluteImage, absoluteUrl, stringifyJsonLd, webPageJsonLd } from '$lib/utils/seo';
	import Slider from '$lib/svelteanim/components/Slide.svelte';

	let { data }: { data: PageData } = $props();
	let researchAreas = $derived(data.researchAreas ?? []);
	let researchItems = $derived(data.research ?? []);
	let reveal2 = $state<HTMLElement | null>(null);
	let vis2 = useInView(() => reveal2, { threshold: 0.5, once: true });

	const title = 'Bodha Research | Hindu Culture, IKS, Policy, and Ethnography';
	const metaDescription = "Field research in culture studies, ethnography, anthropology and sociology — aimed at grounding India's policy in Hindu cultural sensibilities.";
	const metaUrl = absoluteUrl('/research');
	const metaImage = absoluteImage('/images/key-research.webp');
	const jsonld = stringifyJsonLd(
		webPageJsonLd({
			name: title,
			description: metaDescription,
			url: metaUrl,
			image: metaImage
		})	
	);
</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="1536" imHeight="1024" {jsonld} />

<Parallax imageLink="/images/key-research.webp" wipe={true} />
<Container>
	<Crumb showT={true} title="Research" showD={true} desc="Field research in culture studies, ethnography, anthropology and sociology — aimed at grounding India's policy in Hindu cultural sensibilities." />
	<section class="wrapper-std">
		<div class="grid grid-cols-1 lg:grid-cols-2 rgap16 cgap64 ptop16">
			<Reveal>
				<p class="highlight-text">
					A standing complaint of Hindu society is that India’s policy does not take into account Hindu cultural sensibilities. Research at Bodha looks to provide policy inputs gleaned from extensive multidisciplinary research in culture studies, particularly in ethnography, anthropology, and sociology. India is a living civilization whose soul resides in its practices and not just in principles.
					Shying away from dogmas, it has always coupled theories with practices and experiences. Any recommendation which seeks to push India’s policy closer to Hindu culture has to come from wisdom gleaned with authenticity, based upon extremely rigorous but culture sensitive research methodology.
				</p>
			</Reveal>
			<Reveal start="top 60%">
				<p class="highlight-text">
					Our goal is to make experimental methodology central to policy recommendations so that policy in future India is conducive to India’s culture and also practical and capable of competing with global forces. A key component of this is cultural furtherance in education and education policy, giving us a clear mandate to develop work in service of the Indian Knowledge Systems, through
					case-studies, curriculum development, and more.
				</p>
			</Reveal>
		</div>
	</section>
	<section class="wrapper-std growingline">
		<Title text="Research Pillars" />
		<div class="grid grid-cols-1 white-grid" bind:this={reveal2}>
			{#each researchAreas as area, i}
				<Slider visible={vis2.visible} delay={i * 200} direction="down">
					<div class="row mcol area-wrapper whitecard">
						<div class="area-inner-image">
							<img class="fitted herocard" src={area.image} alt={area.title} />
						</div>
						<div class="area-inner-body box p16 lg:p32 rgap16">
							<h2 class="txt-3xl w690">{area.title}</h2>
							<div class="area-inner-body-links box">
								{#each area.items as item, i}
									<div class="project-holder">
									{#if item.href}
										<a class="txt-lg lg:txt-xl area-link row xbetween" href={item.href}>
											{item.label}
										</a>
									{:else}
										<p class="area-link-dim">{item.label}</p>
									{/if}
									</div>
								{/each}
							</div>
						</div>
					</div>
				</Slider>
			{/each}
		</div>
	</section>
</Container>

<style lang="sass">

.area-wrapper
	.project-holder
		padding-top: 0.5rem
		padding-bottom: 0.5rem
	@media (min-width: 1025px)
		column-gap: 1rem
		.area-inner-image
			width: 30%
			img
				filter: saturate(0%)
		&:hover
			img
				filter: saturate(100%)
		.area-inner-body
			width: calc(70% - 1rem)
	@media (min-width: 1201px)
		.area-inner-image
			width: 36%
		.area-inner-body
			width: calc(64% - 1rem)

.area-link
	display: flex
	align-items: center
	justify-content: space-between
	color: var(--color-primary)
	transition: all 220ms cubic-bezier(0.22, 1, 0.36, 1)
	border-bottom: var(--border-main)
	&:hover
		background: var(--color-back)
		padding-left: 8px
		color: var(--color-theme)
	&:last-child
		border-bottom: none

.area-link-dim
	line-height: 1.45
	color: var(--color-grey-1)
	&:last-child
		border-bottom: none

</style>
