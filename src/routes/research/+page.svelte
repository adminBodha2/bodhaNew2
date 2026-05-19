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
	let revealRef = $state<HTMLElement | null>(null);
	let revealVis = useInView(() => revealRef, { threshold: 0.4, once: true });
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

<Container>
	<Parallax imageLink="/images/key-research.webp" wipe={true} />
	<section class="wrapper-std tight-stack first-box">
		<Crumb showT={true} title="Research" showD={true} desc="Field research in culture studies, ethnography, anthropology and sociology — aimed at grounding India's policy in Hindu cultural sensibilities." />
		<div class="grid grid-cols-1 lg:grid-cols-2 rgap16 cgap64 ptop16" bind:this={revealRef}>
			<Reveal visible={revealVis.visible}>
				<p class="highlight-text">
					A standing complaint of Hindu society is that India’s policy does not take into account Hindu cultural sensibilities. Research at Bodha looks to provide policy inputs gleaned from extensive multidisciplinary research in culture studies, particularly in ethnography, anthropology, and sociology. India is a living civilization whose soul resides in its practices and not just in principles.
					Shying away from dogmas, it has always coupled theories with practices and experiences. Any recommendation which seeks to push India’s policy closer to Hindu culture has to come from wisdom gleaned with authenticity, based upon extremely rigorous but culture sensitive research methodology.
				</p>
			</Reveal>
			<Reveal visible={revealVis.visible}>
				<p class="highlight-text">
					Our goal is to make experimental methodology central to policy recommendations so that policy in future India is conducive to India’s culture and also practical and capable of competing with global forces. A key component of this is cultural furtherance in education and education policy, giving us a clear mandate to develop work in service of the Indian Knowledge Systems, through
					case-studies, curriculum development, and more.
				</p>
			</Reveal>
		</div>
	</section>
	<section class="wrapper-std growingline">
		<Title text="Research Pillars" />
		<div class="grid grid-cols-1 gap32" bind:this={reveal2}>
			{#each researchAreas as area, i}
				<Slider visible={vis2.visible} delay={i * 200} direction="down">
					<div class="row mcol area-wrapper">
						<div class="area-inner-image">
							<img class="fitted herocard radius4" src={area.image} alt={area.title} />
						</div>
						<div class="area-inner-body box p16 lg:p32 rgap16">
							<h2 class="txt-3xl lg:txt-4xl w600">{area.title}</h2>
							<div class="area-inner-body-links box rgap16">
								{#each area.items as item}
									{#if item.href}
										<a class="txt-lg lg:txt-xl area-link row xbetween" href={item.href}>
											{item.label}
											<span class="area-arrow">↗</span>
										</a>
									{:else}
										<p class="area-link-dim">{item.label}</p>
									{/if}
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
	@media (min-width: 1025px)
		.area-inner-image
			width: 30%
		.area-inner-body
			width: 70%
	@media (min-width: 1201px)
		.area-inner-image
			width: 36%
		.area-inner-body
			width: 64%

.area-link
	display: flex
	align-items: center
	justify-content: space-between
	color: var(--color-primary)
	transition: all 220ms cubic-bezier(0.22, 1, 0.36, 1)
	&:hover
		background: var(--color-back)
		padding-left: 8px
		color: var(--color-theme)
		.area-arrow
			color: var(--color-theme)
	&:last-child
		border-bottom: none

.area-arrow
	color: var(--color-grey-1)
	transition: transform 0.12s ease, color 0.12s ease

.area-link-dim
	line-height: 1.45
	color: var(--color-grey-1)
	&:last-child
		border-bottom: none

</style>
