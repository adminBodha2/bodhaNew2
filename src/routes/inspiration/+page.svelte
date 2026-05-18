<script lang="ts">
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Parallax from '$lib/comps/parallaxhalf.svelte';
	import Title from '$lib/comps/page-title.svelte';
	import { absoluteImage, absoluteUrl, collectionPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';

	let { data } = $props();

	let schools = $derived(data.schools ?? []);
	let thinkers = $derived(data.thinkers ?? []);

	const title = 'Inspiration | Bodha';
	const metaDescription = 'The thinkers and schools of thought that shape our method, questions, and the longer continuum of inquiry we work within.';
	const metaUrl = absoluteUrl('/inspiration');
	const metaImage = absoluteImage('/images/key-inspiration.webp');

	let jsonld = $derived(
		stringifyJsonLd(
			collectionPageJsonLd({
				name: title,
				description: metaDescription,
				url: metaUrl,
				image: metaImage,
				items: [...schools, ...thinkers].map((item: any) => ({
					name: item.meta.title,
					url: item.linkpath
				}))
			})
		)
	);
</script>

<Head {title} {metaDescription} {metaImage} {metaUrl} imWidth="1920" imHeight="1080" {jsonld} />

<Container>
	<Parallax imageLink="/images/key-inspiration.webp" wipe={true} />
	<section class="box wrapper-std rgap32 first-box">
		<Crumb showT={true} title="Inspiration" showD={true} desc="Thinkers and schools of thought that continue to shape our method, our questions, and the intellectual company we keep." />
		<div class="box rgap4">
			<p class="txt-2xl theme source-serif italic">"The human mind, in its progress, marches knowledge to knowledge, renews and enlarges previous knowledge."</p>
			<p class="grey0">Sri Aurobindo</p>
		</div>
		<div class="grid grid-cols-1 lg:grid-cols-2 cgap32 rgap16">
			<p class="highlight-text">No work emerges in isolation. Every idea, method, and conviction is shaped by a longer continuum of thought, by thinkers who asked difficult questions, and by traditions that refined ways of seeing the world.</p>
			<p class="highlight-text">We do not treat these figures and schools as authorities to be followed uncritically, but as companions in inquiry. Some agree, some sharply disagree, and that tension is part of what keeps the page alive.</p>
		</div>
	</section>
	<section class="box wrapper-std rgap64 growingline">
		<Title text="Schools of Thought" />
		{#if schools.length > 0}
			<div class="grid grid-cols-2 lg:grid-cols-4 gap4">
				{#each schools as item}
					<a class="inspiration-card blank" href={item.linkpath}>
						<img class="card-image" src={item.meta.image} alt={item.meta.title} />
						<div class="card-overlay">
							<p class="txt-xl white">{item.meta.title}</p>
						</div>
					</a>
				{/each}
			</div>
		{/if}
	</section>
	<section class="box wrapper-std rgap64 growingline alternate">
		<Title text="Thinkers" />
		{#if thinkers.length > 0}
			<div class="grid grid-cols-2 lg:grid-cols-4 gap4">
				{#each thinkers as item}
					<a class="inspiration-card blank" href={item.linkpath}>
						<img class="card-image" src={item.meta.image} alt={item.meta.title} />
						<div class="card-overlay">
							<p class="txt-xl white">{item.meta.title}</p>
						</div>
					</a>
				{/each}
			</div>
		{/if}
	</section>
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
