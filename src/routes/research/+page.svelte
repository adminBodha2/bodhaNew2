<svelte:options runes={true} />
<script lang="ts">

	import type { PageData } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Parallax from '$lib/comps/parallaxfull.svelte'
	import Title from '$lib/comps/page-title.svelte'
	import Crumb from '$lib/comps/breadcrumb.svelte'
	import { absoluteImage, absoluteUrl, stringifyJsonLd, webPageJsonLd } from '$lib/utils/seo';

	let { data }: { data: PageData } = $props();
	let researchAreas = $derived(data.researchAreas ?? []);

	const title = 'Research | Bodha';
	const metaDescription = 'Field research in culture studies, ethnography, anthropology and sociology — aimed at grounding India\'s policy in Hindu cultural sensibilities.';
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

<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="1536" imHeight="1024" {jsonld}/>

<Parallax imageLink="/images/key-research.webp" isClass="is50"/>
<Container>
<div class="stdbox stdpad is-first">
	<Crumb showT={true} title="Research" showD={true} desc="Field research in culture studies, ethnography, anthropology and sociology — aimed at grounding India's policy in Hindu cultural sensibilities."/>
	<div class="grid two widecol tightrows">
		<p class="paragraph-text">A standing complaint of Hindu society is that India’s policy does not take into account Hindu cultural sensibilities. Research at Bodha looks to provide policy inputs gleaned from extensive multidisciplinary research in culture studies, particularly in ethnography, anthropology, and sociology. India is a living civilization whose soul resides in its practices and not just in principles. Shying away from dogmas, it has always coupled theories with practices and experiences. Any recommendation which seeks to push India’s policy closer to Hindu culture has to come from wisdom gleaned with authenticity, based upon extremely rigorous but culture sensitive research methodology.</p>
		<p class="paragraph-text">Our goal is to make experimental methodology central to policy recommendations so that policy in future India is conducive to India’s culture and also practical and capable of competing with global forces. A key component of this is cultural furtherance in education and education policy, giving us a clear mandate to develop work in service of the Indian Knowledge Systems, through case-studies, curriculum development, and more.</p>
	</div>
</div>
	<div class="stdbox stdpad is-last bordertop">
		<Title text="Research Pillars"/>
		<div class="grid three areas-grid standard-grid">
			{#each researchAreas as area, i}
			<div class="box pillar item{i}">
				<div class="area-image">
					<img src={area.image} alt={area.title} />
				</div>
				<div class="area-body">
					<p class="card-title">{area.title}</p>
					<div class="area-links">
						{#each area.items as item}
						{#if item.href}
							<a class="area-link blank row xbetween width100" href={item.href}><p class="rem">
								{item.label}</p>
								<div class="area-arrow"><p class="rem1">↗</p></div>
							</a>
						{:else}
							<p class="area-link-dim">{item.label}</p>
						{/if}
						{/each}
					</div>
				</div>
			</div>
			{/each}
		</div>
	</div>
</Container>

<style lang="sass">

.reading-block
	background: var(--color-back)

.box.pillar
	transition: all 0.13s cubic-bezier(0.175, 0.885, 0.320, 1.275)
	overflow: hidden
	background: var(--color-back)
	&:hover
		background: var(--color-stone)
		box-shadow: var(--shadow11)

.item0, .item1
	@media screen and (min-width: 1025px)
		border-right: var(--border-dark)

.area-image
	height: 240px
	img
		width: 100%
		aspect-ratio: 16 / 9
		height: 100%
		object-fit: cover
		display: block

.area-body
	display: flex
	flex-direction: column
	gap: 0.7rem
	padding: 1rem

.area-link
	display: flex
	align-items: center
	justify-content: space-between
	gap: 0.75rem
	padding: 0.72rem 0
	border-bottom: var(--border-main)
	transition: color 0.12s ease, transform 0.12s ease
	&:hover
		p
			color: var(--color-theme)
		.area-arrow
			transform: translateX(2px)
	&:last-child
		border-bottom: none

.area-arrow
	color: var(--color-grey-3)
	transition: transform 0.12s ease, color 0.12s ease
	p
		color: var(--color-grey-3)

.area-link-dim
	line-height: 1.45
	color: var(--color-grey-3)
	padding: 0.72rem 0
	border-bottom: var(--border-main)
	&:last-child
		border-bottom: none

</style>
