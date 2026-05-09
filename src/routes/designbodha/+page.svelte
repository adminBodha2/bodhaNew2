<script lang="ts">
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import WaterRipple from '$lib/motion-core/water-ripple/WaterRipple.svelte';
	import Title from '$lib/comps/page-title.svelte'
	import Head from '$lib/comps/headcomponent.svelte';
	import { absoluteImage, absoluteUrl, stringifyJsonLd, webPageJsonLd } from '$lib/utils/seo';

	let iW = $state(0);
	let sY = $state(0);

	let imageLink = $state('/images/designbodha/key-desbodha.webp');

	const title = 'designBodha | Bodha';
	const metaDescription = 'designBodha is an initiative for dharmic design - ethical, harmonious, and regenerative creation across disciplines.';
	const metaUrl = absoluteUrl('/designbodha');
	const metaImage = absoluteImage('/images/designbodha/key-desbodha.webp');

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
			imageLink = '/images/designbodha/key-desbodha-mb.webp';
		} else if (iW > 1024) {
			imageLink = '/images/designbodha/key-desbodha.webp';
		}
	});
</script>

<svelte:window bind:innerWidth={iW} bind:scrollY={sY} />

<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="2560" imHeight="1440" {jsonld} />

<Container graphing={true}>
	<section class="key-image desbodha">
		<WaterRipple src={imageLink} class="ripple-motion" brushSize={70} />
	</section>
	<section class="box wrapper-std rgap64 first-box">
			<Crumb showT={false} showD={false} />
		<h1 class="ptop32 anim-flyup"><span class="desb">design</span>Bodha</h1>
		<h1 class="design-bodha-head">an initiative for <span class="desb2">dharmic design</span> - ethical, harmonious and regenerative creation across disciplines.</h1>
		<img class="motif anim-flyin-right" style="margin-left: 200px;transform: translateX(-{sY / 7}px) rotate({sY / 2}deg)" src="/images/designbodha/desbodha-motif.webp" alt="designBodha motif" />
	</section>
	<section class="box wrapper-std rgap64 growingline" id="image-panel">
		<div class="grid grid-cols-1 lg:grid-cols-2 has-background rgap16">
			<div class="box rgap16 up anim-fadeIn card-padded">
				<p class="paragraph-text">In an era defined by rapid technological acceleration, environmental degradation, and social fragmentations, the traditional design paradigms - rooted in utilitarianism, consumerism, and market-bound efficiency - are proving insufficient. Despite seeing an unprecedented explosion in the opportunities and avenues for humans to create, we are, as Frances Moore Lappe says -</p>
				<p class="paragraph-text">
					<i>"together creating a world that as individuals none of us would choose."</i>
				</p>
				<p class="paragraph-text">The boom in creatorship has given us the power of the gods, without the requisite wisdom of the gods. In turn, disruptive innovation, accelerationism, and values-agnostic design have put us in confrontation with the meta-crises.</p>
				<p class="paragraph-text pbot8"><span class="desb">design</span>Bodha is a think-tank and initiative to embed dharmic design in creatorship. Our whitepaper and this document is a call to designers, creators, product developers, and more.</p>
				<a class="primary desb" href="/designbodha/whitepaper-on-dharmic-design"><span>Whitepaper on Dharmic Design</span></a>
			</div>
			<div class="box down">
				<img class="square-image" src="/images/designbodha/db20.webp" alt="yagya" />
			</div>
		</div>
	</section>
	<section class="box wrapper-std rgap64 growingline alternate" id="image-panel-2">
			<h2 class="thin-heading anim-flyup">Dharmic design, that is - <span class="desb">design-by-ṛta</span>,<br>
				is creatorship grounded in Hindu metaphysics.<br>
				It redefines <span class="desb">design as a sacred act</span><br>
				of aligning human creation with the cosmic order.
			</h2>
			<div class="width60">
			<p class="paragraph-text">It is the conscious practice of shaping material and digital realities in alignment with cosmic rhythms; the intentional harmonization of human creativity with natural order - ensuring that every created artifact contributes to balance, truth, and the long-term well-being of the interconnected web of life.</p>
			</div>
	</section>
	<section class="box wrapper-std rgap64 growingline">
		<Title text="project objectives"/>
	<div class="grid grid-cols-1 lg:grid-cols-2 cgap32 rgap32">
			<div class="box rgap16">
				<img class="motif2" src="/images/designbodha/desb-motif2.webp" alt="motif2"/>
				<p class="card-title">Phase 1 - Foundation and Taxonomy</p>
				<p class="rem1">
					Establish a common language - the dharmic design lexicon mapping modern design terms. Publish second whitepaper - defining the core terminology and philosophical boundaries.
				</p>
			</div>
			<div class="box rgap16">
				<img class="motif2" src="/images/designbodha/desb-motif2.webp" alt="motif2"/>
				<p class="card-title">Phase 2 - Framework Toolkits</p>
				<p class="rem1">
					Build practical design tools - the dharmic design canvas - visual tool(s) that orient decision-making, brainstorming, and creativty to intended tethers.
				</p>
			</div>
		</div>
	</section>

</Container>

<style lang="sass">

img.motif2
	object-fit: contain
	height: 80px
	width: 80px
	box-shadow: 3px 2px 5px rgba(0,0,0,0.2)
	border-radius: 40px
	transform-origin: center center
	transition: box-shadow 900ms ease
	&:hover
		box-shadow: 0 0 0 rgba(0,0,0,0)
		animation: theRotate 900ms infinite alternate

@keyframes theRotate
	0%
		transform: rotate(0deg)
	100%
		transform: rotate(360deg)

img.square-image
	object-fit: cover
	object-position: center center
	width: 100%
	height: 320px
	@media screen and (min-width: 1025px)
		height: 360px
		width: 360px
		margin-left: 64px
		margin-top: 64px
	@media screen and (min-width: 1201px)
		height: 640px
		width: 640px

h2.thin-heading
	@media screen and (min-width: 1025px)
		padding-bottom: 3rem

#image-panel-2
	position: relative

#image-panel
	align-items: center
	justify-content: center
	@media screen and (min-width: 1025px)
		height: 100vh
		padding: 3rem

.anim-fadeIn
	@media screen and (min-width: 1025px)
		animation: fadeIn 400s
		animation-timeline: view()

@keyframes lateMover
	0%
		opacity: 0
		transform: translateX(200px) translateY(-100px)
	100%
		opacity: 1
		transform: translateX(0) translateY(0)

@keyframes delayIn
	0%
		opacity: 0
		transform: translateX(0)
	100%
		opacity: 1
		transform: translateX(200px)

@keyframes fadeIn
	0%
		opacity: 0
		transform: translateY(250px) translateX(-100px)
	100%
		opacity: 1
		transform: translateY(50px) translateX(-24px)

@keyframes flyInRight
	0%
		opacity: 0
		transform: translateX(-200px)
	60%
		opacity: 1
		transform: translateX(200px)
	100%
		opacity: 0
		transform: translateX(400px)

img.motif
	object-fit: contain
	width: 128px
	height: 128px
	transform-origin: center center

.anim-flyup
	@media screen and (min-width: 1025px)
		animation: headFlyUp 800ms
		animation-timeline: view()

@keyframes headFlyUp
	0%
		opacity: 0
		transform: translateY(160px)
	90%
		opacity: 1
		transform: translateY(30px)
	100%
		opacity: 1
		transform: translateY(0)

.key-image
	height: 440px
	margin-top: 80px
	@media screen and (min-width: 1025px)
		height: 720px
		margin-top: 128px

</style>
