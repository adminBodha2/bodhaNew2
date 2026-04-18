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
<div class="box std padded">
	<Crumb item1="Bodha" item1Link="/" showT={true} title="Research" showD={true} desc="Field research in culture studies, ethnography, anthropology and sociology — aimed at grounding India's policy in Hindu cultural sensibilities."/>
	<div class="box std">
		<Title text="Research Pillars"/>
		<div class="grid three tight">
			{#each areas as area}
			<div class="area-card">
				<div class="area-image">
					<img src={area.image} alt={area.title} />
				</div>
				<div class="area-body">
					<p class="card-title w500">{area.title}</p>
					<div class="area-links">
						{#each area.items as item}
						{#if item.href}
							<a class="area-link blank" href={item.href}>
								<span>{item.label}</span>
								<span class="area-arrow">↗</span>
							</a>
						{:else}
							<span class="area-link-dim">{item.label}</span>
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
	display: grid
	gap: var(--gap-elem)
	@media screen and (min-width: 1025px)
		grid-template-columns: repeat(3, 1fr)
	@media screen and (min-width: 631px) and (max-width: 1024px)
		grid-template-columns: repeat(2, 1fr)

.area-card
	display: flex
	flex-direction: column
	border: 1px solid rgba(0,0,0,0.06)
	border-radius: 12px
	overflow: hidden
	background: #FFFFFF
	position: relative
	transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease
	&::before
		content: ''
		position: absolute
		top: 0
		left: 1.35rem
		right: 1.35rem
		height: 2px
		background: linear-gradient(90deg, transparent, rgba(25,113,194,0.65), transparent)
		opacity: 0.7
	&:hover
		transform: translateY(-2px)
		border-color: rgba(25,113,194,0.18)
		box-shadow: 0 12px 26px rgba(0,0,0,0.05), 0 3px 10px rgba(0,0,0,0.03)
		.area-title
			color: var(--theme)

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

.area-head
	display: flex
	align-items: center
	justify-content: space-between
	gap: 0.75rem
	flex-wrap: wrap

.area-kicker
	font-size: 0.68rem
	letter-spacing: 0.12em
	color: #5bb98c

.area-count
	font-size: 0.74rem
	color: var(--text-ghost)

.area-title
	font-size: clamp(1.02rem, 1.6vw, 1.22rem)
	font-weight: 400
	letter-spacing: -0.02em
	line-height: 1.2
	color: #111
	margin: 0
	transition: color 0.15s ease

.area-links
	display: flex
	flex-direction: column
	gap: 0
	padding-top: 0.2rem
	border-top: 1px solid rgba(0,0,0,0.05)

.area-link
	display: flex
	align-items: center
	justify-content: space-between
	gap: 0.75rem
	font-size: 1rem
	line-height: 1.45
	color: #444
	padding: 0.72rem 0
	border-bottom: 1px solid rgba(0,0,0,0.05)
	transition: color 0.12s ease, transform 0.12s ease
	&:hover
		color: var(--theme)
		.area-arrow
			transform: translateX(2px)

.area-arrow
	font-size: 0.8rem
	color: var(--text-ghost)
	transition: transform 0.12s ease, color 0.12s ease

.area-link-dim
	font-size: 1rem
	line-height: 1.45
	color: var(--text-ghost)
	padding: 0.72rem 0
	border-bottom: 1px solid rgba(0,0,0,0.05)

</style>
