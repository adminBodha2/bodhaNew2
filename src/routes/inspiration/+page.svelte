<script lang="ts">
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Parallax from '$lib/comps/parallaxhalf.svelte';
	import Title from '$lib/comps/page-title.svelte';
	import { absoluteImage, absoluteUrl, collectionPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';
	import Reveal from '$lib/svelteanim/components/Reveal.svelte'
	import Blur from '$lib/svelteanim/components/Blur.svelte'
	import { useInView } from '$lib/svelteanim';

	let { data } = $props();

	let schools = $derived(data.schools ?? []);
	let thinkers = $derived(data.thinkers ?? []);
	let ref = $state<HTMLElement | null>(null);
	let visref = useInView(() => ref, { threshold: 0.6, once: true})
	let ref2 = $state<HTMLElement | null>(null);
	let ref3 = $state<HTMLElement | null>(null);
	let visref2 = useInView(() => ref2, { threshold: 0.6, once: true})
	let visref3 = useInView(() => ref3, { threshold: 0.6, once: true})

	const title = 'Bodha Inspiration | Hindu Thinkers, IKS, Ecology, and Civilizational Thought';
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

<Parallax imageLink="/images/key-inspiration.webp" wipe={true} />
<Container>
	<Crumb showT={true} title="Inspiration" showD={true} desc="Thinkers and schools of thought that continue to shape our method, our questions, and the intellectual company we keep." />
	<section class="wrapper-std" bind:this={ref}>
		<Reveal visible={visref.visible} direction="left" duration={800}>
		<div class="box rgap4">
			<p class="txt-2xl theme source-serif italic">"The human mind, in its progress, marches knowledge to knowledge, renews and enlarges previous knowledge."</p>
			<p class="grey0">Sri Aurobindo</p>
		</div>
		</Reveal>
		<div class="grid grid-cols-1 lg:grid-cols-2 cgap32 rgap16">
			<Reveal visible={visref.visible} delay={800}>
				<p class="highlight-text">No work emerges in isolation. Every idea, method, and conviction is shaped by a longer continuum of thought, by thinkers who asked difficult questions, and by traditions that refined ways of seeing the world.</p>
			</Reveal>
			<Reveal visible={visref.visible} delay={1000}>
			<p class="highlight-text">We do not treat these figures and schools as authorities to be followed uncritically, but as companions in inquiry. Some agree, some sharply disagree, and that tension is part of what keeps the page alive.</p>
			</Reveal>
		</div>
	</section>
	<section class="box wrapper-std rgap64 growingline">
		<Title text="Schools of Thought" />
		{#if schools.length > 0}
			<div class="grid grid-cols-2 lg:grid-cols-4 gap4" bind:this={ref2}>
				{#each schools as item, i}
					<Blur visible={visref2.visible} delay={100 * i}>
					<a class="inspiration-card blank" href={item.linkpath}>
						<img class="card-image" src={item.meta.image} alt={item.meta.title} />
						<div class="card-overlay">
							<p class="txt-xl white">{item.meta.title}</p>
						</div>
					</a>
					</Blur>
				{/each}
			</div>
		{/if}
	</section>
	<section class="box wrapper-std rgap64 growingline alternate">
		<Title text="Thinkers" />
		{#if thinkers.length > 0}
			<div class="grid grid-cols-2 lg:grid-cols-4 gap4" bind:this={ref3}>
				{#each thinkers as item, i}
					<Blur visible={visref3.visible} delay={100 * i}>
					<a class="inspiration-card blank" href={item.linkpath}>
						<img class="card-image" src={item.meta.image} alt={item.meta.title} />
						<div class="card-overlay">
							<p class="txt-xl white">{item.meta.title}</p>
						</div>
					</a>
					</Blur>
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
