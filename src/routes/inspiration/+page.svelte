<script lang="ts">
	import Container from '$lib/comps/container.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Parallax from '$lib/comps/parallaxfull.svelte';
	import Title from '$lib/comps/page-title.svelte';

	let { data } = $props();

	let schools = $derived(data.schools ?? []);
	let thinkers = $derived(data.thinkers ?? []);

	const title = 'Inspiration | Bodha';
	const metaDescription = 'The thinkers and schools of thought that shape our method, questions, and the longer continuum of inquiry we work within.';
	const metaUrl = 'https://www.bodharesearch.in/inspiration';
	const metaImage = 'https://www.bodharesearch.in/images/key-inspiration.webp';

	let jsonld = $derived(JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		name: title,
		description: metaDescription,
		url: metaUrl,
		image: metaImage,
		mainEntity: {
			'@type': 'ItemList',
			itemListElement: [...schools, ...thinkers].map((item: any, index: number) => ({
				'@type': 'ListItem',
				position: index + 1,
				name: item.meta.title,
				url: 'https://www.bodharesearch.in' + item.linkpath
			}))
		}
	}));
</script>

<Head
	{title}
	{metaDescription}
	{metaImage}
	{metaUrl}
	imWidth="1920"
	imHeight="1080"
	{jsonld}
/>

<Parallax imageLink="/images/key-inspiration.webp" isClass="is50" />
<Container narrow={true} scaled={true}>
	<div class="stdbox padded">
		<Crumb item1="Bodha" item1Link="/" showT={true} title="Inspiration" showD={true} desc="Thinkers and schools of thought that continue to shape our method, our questions, and the intellectual company we keep."/>
		<div class="box">
			<p class="highlight-text source-serif italic">"The human mind, in its progress, marches knowledge to knowledge, renews and enlarges previous knowledge."</p>
			<p class="small-text lgrey tt-u" style="margin-top: 4px">Sri Aurobindo</p>
			<div class="grid two tightrows ptop32">
				<p class="highlight-text">No work emerges in isolation. Every idea, method, and conviction is shaped by a longer continuum of thought, by thinkers who asked difficult questions, and by traditions that refined ways of seeing the world.</p>
				<p class="highlight-text">We do not treat these figures and schools as authorities to be followed uncritically, but as companions in inquiry. Some agree, some sharply disagree, and that tension is part of what keeps the page alive.</p>
			</div>
		</div>
	</div>
	<div class="stdbox padded bordertop">
		{#if schools.length > 0}
		<Title text="Schools of Thought"/>
		<div class="grid four ultra stay2">
					{#each schools as item}
						<a class="inspiration-card blank" href={item.linkpath}>
							<img class="card-image" src={item.meta.image} alt={item.meta.title} />
							<div class="card-overlay">
								<p class="white w500">{item.meta.title}</p>
							</div>
						</a>
					{/each}
				</div>
		{/if}
	</div>
		{#if thinkers.length > 0}
			<div class="stdbox padded bordertop">
			<Title text="Thinkers"/>
				<div class="grid four ultra stay2">
					{#each thinkers as item}
						<a class="inspiration-card blank" href={item.linkpath}>
							<img class="card-image" src={item.meta.image} alt={item.meta.title} />
							<div class="card-overlay">
								<p class="white w500">{item.meta.title}</p>
							</div>
						</a>
					{/each}
				</div>
			</div>
		{/if}
</Container>

<style lang="sass">

.inspiration-card
	position: relative
	display: block
	min-height: 250px
	background: #111
	overflow: hidden
	@media screen and (min-width: 1025px)
		min-height: 300px
	&:hover
		.card-image
			transform: scale(1.04)

.card-image
	position: absolute
	inset: 0
	width: 100%
	height: 100%
	object-fit: cover
	transition: transform 0.25s ease

.card-overlay
	position: relative
	z-index: 1
	display: flex
	flex-direction: column
	justify-content: flex-end
	gap: 0.45rem
	height: 100%
	padding: 1rem
	background: linear-gradient(180deg, rgba(18, 18, 18, 0.02) 28%, rgba(18, 18, 18, 0.9) 100%)
	transition: background 0.2s ease
	&:hover
		background: none

</style>
