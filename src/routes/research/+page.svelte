<svelte:options runes={true} />
<script lang="ts">

	import { researchAreas } from '$lib/utils/localsends'
	import Container from '$lib/comps/container.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Parallax from '$lib/comps/parallaxfull.svelte'
	import Title from '$lib/comps/page-title.svelte'
	import Crumb from '$lib/comps/breadcrumb.svelte'

	const title = 'Research | Bodha';
	const metaDescription = 'Field research in culture studies, ethnography, anthropology and sociology — aimed at grounding India\'s policy in Hindu cultural sensibilities.';
	const metaUrl = 'https://www.bodharesearch.in/research';
	const metaImage = 'https://www.bodharesearch.in/images/key-research.webp';

</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="1536" imHeight="1024"/>

<Parallax imageLink="/images/key-research.webp" isClass="is50"/>
<Container narrow={true} scaled={true}>
<div class="stdbox padded whole-page">
	<Crumb item1="Bodha" item1Link="/" showT={true} title="Research" showD={true} desc="Field research in culture studies, ethnography, anthropology and sociology — aimed at grounding India's policy in Hindu cultural sensibilities."/>
	<div class="grid two reading-block tightrows">
		<p class="highlight-text">A standing complaint of Hindu society is that India’s policy does not take into account Hindu cultural sensibilities. Research at Bodha looks to provide policy inputs gleaned from extensive multidisciplinary research in culture studies, particularly in ethnography, anthropology, and sociology. India is a living civilization whose soul resides in its practices and not just in principles. Shying away from dogmas, it has always coupled theories with practices and experiences. Any recommendation which seeks to push India’s policy closer to Hindu culture has to come from wisdom gleaned with authenticity, based upon extremely rigorous but culture sensitive research methodology.</p>
		<p class="highlight-text">Our goal is to make experimental methodology central to policy recommendations so that policy in future India is conducive to India’s culture and also practical and capable of competing with global forces. A key component of this is cultural furtherance in education and education policy, giving us a clear mandate to develop work in service of the Indian Knowledge Systems, through case-studies, curriculum development, and more.</p>
	</div>
</div>
	<div class="stdbox padded bordertop">
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
							<a class="area-link blank row xbetween width100" href={item.href}><p class="rem1">
								{item.label}</p>
								<div class="area-arrow"><p class="rem1">↗</p></div>
							</a>
						{:else}
							<p class="area-link-dim rem1">{item.label}</p>
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
	background: var(--color-white)
	border: var(--border-main)
	padding: 1.2rem
	@media screen and (min-width: 1025px)
		padding: 2rem

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
	padding: 1.3rem 1.35rem


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
