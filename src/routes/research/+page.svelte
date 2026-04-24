<script lang="ts">
	import Container from '$lib/comps/container.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Parallax from '$lib/comps/parallaxfull.svelte'
	import Title from '$lib/comps/page-title.svelte'
	import Crumb from '$lib/comps/breadcrumb.svelte'
	import { metaTitle, metaDescription, metaUrl, metaImage } from '$lib/utils/metastores';

	$metaTitle = 'Bodha Research';
	$metaDescription = 'Field research in culture studies, ethnography, anthropology and sociology — aimed at grounding India\'s policy in Hindu cultural sensibilities.';
	$metaUrl = 'https://www.bodharesearch.in/research';
	$metaImage = '/images/key-research.webp';

	const areas = [
		{
			title: 'Institutional Design',
			image: '/images/research-1.webp',
			items: [
				{ label: 'Hindu Models of Temple Management', href: '/research/hindu-models-of-temple-management' },
				{ label: 'Structure of Hindu Charity', href: '/research/structure-of-hindu-charity' },
				{ label: 'Hindu Frameworks of Education', href: '/research/hindu-frameworks-of-education' },
				{ label: 'Interchanging Dynamics of Hindu Family', href: '/research/interchanging-dynamics-of-hindu-family' },
				{ label: 'Temples of Madhya Pradesh', href: '/research/temples-of-madhya-pradesh' },
			]
		},
		{
			title: 'Policy and Strategic Affairs',
			image: '/images/research-2.webp',
			items: [
				{ label: 'Battle of Dharma in North East', href: '/research/battle-for-dharma-north-east' },
				{ label: 'A Year in a Hajong Village', href: '/research/year-in-hajong-village' },
				{ label: 'Dangs: Anatomy of Religious Terror', href: '/research/dangs-anatomy-of-religious-terror' },
				{ label: 'The Dharma-Dhamma Axis', href: null },
				{ label: 'Kekadia: Impact of Conversion on Tribal Society', href: null },
			]
		},
		{
			title: 'Purva Paksha Project',
			image: '/images/research-3.webp',
			items: [
				{ label: 'A Hindu View of the Enlightenment', href: '/research/hindu-response-to-enlightenment' },
				{ label: 'Artist in the Art: Hindu View of Western Art', href: '/research/artist-in-art' },
				{ label: 'India That Was: Glimpses of a Disappearing World', href: null },
				{ label: 'Alternate Consciousness: Pagan Cultures', href: null },
			]
		},
	];
</script>

<Head title={$metaTitle} metaDescription={$metaDescription} metaUrl={$metaUrl} metaImage={$metaImage} />

<Parallax imageLink="/images/key-research.webp" isClass="is50"/>
<Container narrow={true} scaled={true}>
<div class="stdbox padded">
	<Crumb item1="Bodha" item1Link="/" showT={true} title="Research" showD={true} desc="Field research in culture studies, ethnography, anthropology and sociology — aimed at grounding India's policy in Hindu cultural sensibilities."/>
	<div class="stdbox">
		<Title text="Research Pillars"/>
		<div class="grid three areas-grid standard-grid">
			{#each areas as area, i}
			<div class="box pillar number item{i}">
				<div class="area-image">
					<img src={area.image} alt={area.title} />
				</div>
				<div class="area-body">
					<h2 class="card-title">{area.title}</h2>
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
</div>
</Container>

<style lang="sass">

.areas-grid
	border: var(--border-dark)
	border-radius: 4px
	background: #FFF

.box.pillar
	transition: all 0.4s cubic-bezier(0.175, 0.885, 0.320, 1.275)
	overflow: hidden
	&:hover
		background: var(--color-white)
		box-shadow: var(--shadow11)

.item0, .item1
	@media screen and (min-width: 1025px)
		border-right: var(--border-dark)

.area-image
	img
		width: 100%
		aspect-ratio: 16 / 9
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
	border-bottom: var(--stroke-subtle)
	transition: color 0.12s ease, transform 0.12s ease
	&:hover
		p
			color: var(--theme)
		.area-arrow
			transform: translateX(2px)
	&:last-child
		border-bottom: none

.area-arrow
	color: var(--grey-std)
	transition: transform 0.12s ease, color 0.12s ease
	p
		color: var(--grey-std)

.area-link-dim
	line-height: 1.45
	color: var(--grey-std)
	padding: 0.72rem 0
	border-bottom: var(--stroke-subtle)
	&:last-child
		border-bottom: none

</style>
