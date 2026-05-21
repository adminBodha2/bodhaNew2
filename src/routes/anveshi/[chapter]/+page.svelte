<script lang="ts">
	import Head from '$lib/comps/headcomponent.svelte';
	import Swipes from '$lib/comps/swipercomp.svelte';
	import Container from '$lib/comps/wrapper.svelte';
	import FAQ from '$lib/comps/anveshifaqs.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Title from '$lib/comps/page-title.svelte';
	import Calendar from '$lib/icons/calendar.svelte';
	import Session from '$lib/icons/sessions.svelte';
	import Rupee from '$lib/icons/rupee.svelte';
	import Location from '$lib/icons/location.svelte';
	import Parallax from '$lib/comps/parallaxhalf.svelte';
	import Reveal from '$lib/svelteanim/components/Reveal.svelte';
	import Slide from '$lib/svelteanim/components/Slide.svelte';
	import { useInView } from '$lib/svelteanim/utils/useInView.svelte';
	import Tabs from '$lib/comps/Tabs.svelte';
	import { absoluteImage, absoluteUrl, stringifyJsonLd, touristTripJsonLd } from '$lib/utils/seo';
	import { Lightbox } from 'svelte-lightbox';

	let { data } = $props();

	let templeStatus = $state(0);
	let ref = $state<HTMLElement | null>(null);
	let slref = $state<HTMLElement | null>(null);
	let vis = useInView(() => ref, { threshold: 0.5, once: true });
	let slvis = useInView(() => ref, { threshold: 0.9, once: true});
	let iW = $state(0);

	let itins = $derived(data.itins ?? []);
	let temples = $derived(data.templesList ?? []);

	let title = $derived(data.title + ' | Bodha Anveshi');
	let metaDescription = $derived(data.description);
	let metaUrl = $derived(absoluteUrl('/anveshi/' + data.slug));
	let metaImage = $derived(absoluteImage(data.image));

	$effect(() => {
		templeStatus = data.templetext === false ? 4 : 1;
	});

	let jsonld = $derived(
		stringifyJsonLd(
			touristTripJsonLd({
				name: data.title,
				description: data.description,
				image: metaImage,
				url: metaUrl,
				itinerary: itins.map((item: any) => ({
					name: item.daylabel,
					description: item.itinerary
				}))
			})
		)
	);
</script>

<svelte:window bind:innerWidth={iW} />

<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="1920" imHeight="1080" {jsonld} />

<Parallax wipe={true} imageLink={data.image} />
<Container>
		<Crumb showT={true} title='{data.slug} Chapter' showD={true} desc={data.description} showRow={data.isOpen}>
			{#if data.isOpen}
				<p class="txt-xl w600 tt-u anveshi-o">OPEN NOW!</p>
			{/if}
		</Crumb>
	<!--------------introduction with details like date, pricing etc.------------------>
	<section class="wrapper-std">
		<div class="grid grid-cols-1 md:grid-cols-2 rgap16 md:cgap32 lg:cgap64 content-highlights" bind:this={ref}>
			<Reveal visible={vis.visible} duration={500}>
				<data.content />
			</Reveal>
		</div>
		{#if data.quote}
			<Reveal visible={vis.visible} delay={700}>
				<p class="txt-xl md:txt-2xl lg:txt-3xl lh15 italic source-serif width80 anveshi-o">{data.quote}</p>
			</Reveal>
		{/if}
	</section>
	<section class="wrapper-std growingline alternate">
		<div class="grid grid-cols-1 lg:grid-cols-3 gap32">
		<div class="grid grid-cols-2 xl:grid-cols-4 col-span-2 info-row" bind:this={slref}>
			<Slide visible={slvis.visible} duration={500} direction="down">
			<div class="box dates p16 lg:p32">
				<Calendar fill="var(--color-anveshi)" />
				<p class="txt-bs w500 ptop16 pbot4">{data.dates}</p>
				<p class="txt-xs grey1 tt-u">Dates</p>
			</div>
			</Slide>
			<Slide visible={slvis.visible} duration={400} delay={250} direction="down">
			<div class="box price p16 lg:p32">
				<Rupee fill="var(--color-anveshi)" />
				<p class="txt-bs w500 ptop16 pbot4">{data.price}</p>
				<p class="txt-xs grey1 tt-u">Price</p>
			</div>
			</Slide>
			<Slide visible={slvis.visible} duration={300} delay={400} direction="down">
			<div class="box duration p16 lg:p32">
				<Session fill="var(--color-anveshi)" />
				<p class="txt-bs w500 ptop16 pbot4">{data.duration}</p>
				<p class="txt-xs grey1 tt-u">Duration</p>
			</div>
			</Slide>
			<Slide visible={slvis.visible} duration={200} delay={650} direction="down">
			<div class="box temples p16 lg:p32">
				<Location fill="var(--color-anveshi)" />
				<p class="txt-bs w500 ptop16 pbot4">{data.temples}</p>
				<p class="txt-xs grey1 tt-u">Temples</p>
			</div>
			</Slide>
		</div>
		<div class="box col-span-1">
			<div class="row cgap16 ycenter">
				{#if data.isOpen}
					<a class="primary anveshi" href={data.registerLink} target="_blank" rel="noreferrer"><span>Register Now</span></a>
				{/if}
				{#if data.brochureLink}
					<a class="primary anveshi" href={data.brochureLink} target="_blank" rel="noreferrer"><span>Brochure</span></a>
				{/if}
			</div>
		</div>
		</div>
		<div class="box rgap32">
		{#if itins && itins.length > 0}
			<Tabs class="anveshi-tabs" items={itins} getValue={(item, index) => `${index}-${item.daylabel}`} getLabel={(item) => `${item.daylabel} - ${item.label}`}>
				{#snippet children(item, index)}
					<div class="itin-panel grid lg:grid-cols-2 gap16 lg:gap32">
						<div class="up sm:row lg:box cgap16">
							<img src={item.itinimage} class="fitted squared itinkey" alt={item.daylabel} />
							<img src="https://www.bodharesearch.in/images/anveshi/day-{index + 1}.png" alt={item.daylabel} class="icon onmob" />
						</div>
						<div class="down box">
							<img src="https://www.bodharesearch.in/images/anveshi/day-{index + 1}.png" alt={item.daylabel} class="icon ondesk" />
							<pre class="highlight-text">{item.itinerary}</pre>
						</div>
					</div>
				{/snippet}
			</Tabs>
		{/if}
		</div>
	</section>
	<!--------------temples------------------>
	<section class="wrapper-std growingline">
		<Title text="Temples" anveshi={true} />
		{#if temples && temples.length > 0}
			<Swipes slidesPerView={templeStatus} spaceBetween={8} pagination={false} breakpoints={{ 0: { slidesPerView: 1, spaceBetween: 8 }, 1024: { slidesPerView: templeStatus, spaceBetween: 8 } }}>
				{#each temples as item}
					<swiper-slide>
						{#if data.templetext}
							<div class="grid grid-cols-1 lg:grid-cols-2 cgap16 temple-descriptions b-main">
								<div class="up">
									<img class="fitted herocard h-also" src={item.image} alt={item.temple} />
								</div>
								<div class="box rgap16 down p24 lg:p32">
									<p class="source-serif txt-3xl w650">{item.temple}</p>
									<p class="txt-lg lh14 grey3">{item.description}</p>
								</div>
							</div>
						{:else}
							<div class="labelbox singular">
								<img class="temple-image" src={item.image} alt={item.temple} />
								<p class="rem1">{item.temple}</p>
							</div>
						{/if}
					</swiper-slide>
				{/each}
			</Swipes>
		{/if}
	</section>

	<!--------------faq section------------------>
	<section class="box wrapper-std growingline">
		<FAQ />
	</section>
</Container>

<style lang="sass">

:global(.anveshi-tabs .tab)
	--tab-active-color: var(--color-anveshi)
	--tab-hover-color: var(--color-anveshi)

:global(.anveshi-tabs .tab)
	--tab-color: var(--color-grey-2)
	--tab-active-color: var(--color-anveshi)
	--tab-hover-color: var(--color-anveshi)

img.icon
	object-fit: contain
	width: 48px
	height: 48px
	margin-bottom: 1rem
	&.onmob
		@media (min-width: 1025px)
			display: none
	&.ondesk
		@media (max-width: 1024px)
			display: none

img.itinkey
	@media (max-width: 1024px)
		object-fit: contain
		width: 48px
		height: 48px		

.itin-panel
	display: grid
	row-gap: 1rem
	pre
		white-space: pre-wrap
		margin: 0
	@media (min-width: 1025px)
		grid-template-columns: 200px 1fr

.temple-descriptions
	@media (min-width: 1025px)
		grid-template-columns: 600px 1fr

.singular
	img.temple-image
		object-fit: cover
		width: 100%
		height: 280px
		@media screen and (min-width: 1025px)
			height: 240px

.info-row
	border-radius: 5px
	overflow: hidden
	border: var(--border-main)

.dates, .price, .duration
	border-right: var(--border-main)

.dates, .price
	@media screen and (max-width: 1024px)
		border-bottom: var(--border-main)

</style>
