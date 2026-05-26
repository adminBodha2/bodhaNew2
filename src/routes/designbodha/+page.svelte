<script lang="ts">
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Parallax from '$lib/comps/parallaxhalf-new.svelte';
	import Revealing from '$lib/motion-core/stacking-words/RevealingLines.svelte'
	import Title from '$lib/comps/page-title.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Reveal from '$lib/svelteanim/components/Reveal.svelte';
	import { absoluteImage, absoluteUrl, stringifyJsonLd, webPageJsonLd } from '$lib/utils/seo';

	let iW = $state(0);
	let sY = $state(0);

	let imageLink = $state('/images/heroes/key-designbodha.webp');

	const title = 'designBodha | Dharmic Design, Regenerative Creation, and Hindu Ethics';
	const metaDescription = 'designBodha is an initiative for dharmic design - ethical, harmonious, and regenerative creation across disciplines.';
	const metaUrl = absoluteUrl('/designbodha');
	const metaImage = absoluteImage('/images/heroes/key-designbodha.webp');

	const jsonld = stringifyJsonLd(
		webPageJsonLd({
			name: title,
			description: metaDescription,
			url: metaUrl,
			image: metaImage,
			type: 'AboutPage'
		})
	);

	$effect(() => {
		if (iW < 1025) {
			imageLink = '/images/heroes/key-designbodha.webp';
		} else if (iW > 1024) {
			imageLink = '/images/heroes/key-designbodha.webp';
		}
	});
</script>

<svelte:window bind:innerWidth={iW} bind:scrollY={sY} />

<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="2560" imHeight="1440" {jsonld} />

<Parallax {imageLink} wipe={true} />
<Container>
	<Crumb showT={true} title="designBodha" showD={true} desc="designBodha is an initiative for dharmic design - ethical, harmonious, and regenerative creation across disciplines." />
	<section class="wrapper-std">
		<img class="motif anim-flyin-right" style="margin-left: 200px;transform: translateX(-{sY / 7}px) rotate({sY / 2}deg)" src="/images/designbodha/desbodha-motif.webp" alt="designBodha motif" />
		<div class="grid grid-cols-1 lg:grid-cols-2 cgap64 rgap16">
				<div class="box rgap16">
					<div>
					<Revealing>
					<p class="highlight-text">
						In an era defined by rapid technological acceleration, environmental degradation, and social fragmentations, the traditional design paradigms - rooted in utilitarianism, consumerism, and market-bound efficiency - are proving insufficient. Despite seeing an unprecedented explosion in the opportunities and avenues for humans to create, we are, as Frances Moore Lappe says -
					</p>
					</Revealing>
					</div>
					<div>
					<Revealing>
					<p class="highlight-text">
						<i>"together creating a world that as individuals none of us would choose."</i>
					</p>
					</Revealing>
					</div>
				</div>
				<div class="box rgap16">
					<Reveal>
						<p class="highlight-text">The boom in creatorship has given us the power of the gods, without the requisite wisdom of the gods. In turn, disruptive innovation, accelerationism, and values-agnostic design have put us in confrontation with the meta-crises.</p>
					</Reveal>
					<Reveal>
						<p class="highlight-text pbot8"><span class="desb">design</span>Bodha is a think-tank initiative to embed dharmic design in creatorship. Our whitepaper and this document is a call to designers, creators, product developers, and more.</p>
					</Reveal>
				</div>
		</div>
	</section>
	<section class="wrapper-std growingline">
		<Title text="explore designbodha" />
		<div class="grid grid-cols-1 lg:grid-cols-3 cgap64 rgap32">
			<div class="box rgap16">
					<p class="txt-xl lg:txt-2xl w600">
						Dharmic design, that is - <span class="desb">design-by-ṛta</span>, is creatorship grounded in Hindu metaphysics. It redefines <span class="desb">design as a sacred act</span> of aligning human creation with the cosmic order.
					</p>
					<a class="txt-xl desb" href="/designbodha/monograph-on-dharmic-design">Read our Monograph on Dharmic Design</a>
			</div>
			<div class="box rgap16">
				<p class="txt-xl lg:txt-2xl w600">The Pramana Library</p>
			<p class="txt-lg">The Pramana Library is a set of cognitive and communicative concepts from the Sanskrit intellectual traditions, for designers, researchers, and people building and leading with AI.</p>
			<p class="txt-lg">Each card here names a move you can make in your work - a question you can ask, a discrimination you can draw - that the available English vocabulary does not give you a clean way to name.</p>
			<a class="txt-lg desb w500" href="/designbodha/pramana-library">Explore</a>
			</div>
			<div class="box rgap16">
				<p class="txt-xl lg:txt-2xl w600">Design by Dharma Roadmap</p>
				<div class="box">
					<p class="txt-lg w500">Phase 1 - Foundation and Taxonomy</p>
					<p class="txt-lg">Establish a common language - the dharmic design lexicon mapping modern design terms. Publish second whitepaper - defining the core terminology and philosophical boundaries.</p>
				</div>
				<div class="box">
					<p class="txt-lg w500">Phase 2 - Framework Toolkits</p>
					<p class="txt-lg">Build practical design tools - the dharmic design canvas - visual tool(s) that orient decision-making, brainstorming, and creativty to intended tethers.</p>
				</div>
			</div>
		</div>
	</section>
</Container>

<style lang="sass">

img.motif
	object-fit: contain
	width: 128px
	height: 128px
	transform-origin: center center
	@media (max-width: 1024px)
		width: 88px
		height: 88px

</style>
