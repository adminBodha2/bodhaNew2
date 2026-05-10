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
	import Parallax from '$lib/comps/parallaxhalf.svelte'
	import WaterRipple from '$lib/motion-core/water-ripple/WaterRipple.svelte';
	import Reveal from '$lib/svelteanim/components/Reveal.svelte'
	import { useInView } from '$lib/svelteanim/utils/useInView.svelte';
	import Tabs from '$lib/comps/Tabs.svelte'
	import { absoluteImage, absoluteUrl, stringifyJsonLd, touristTripJsonLd } from '$lib/utils/seo';
	import { Lightbox } from 'svelte-lightbox';

	let { data } = $props();

	let templeStatus = $state(0);
	let ref = $state<HTMLElement | null>(null)
	let vis = useInView(() => ref, {threshold: 0.5, once: true})
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


<svelte:window bind:innerWidth={iW}/>

<Head
	{title}
	{metaDescription}
	{metaUrl}
	{metaImage}
	imWidth="1920"
	imHeight="1080"
	{jsonld}
/>

<Container>
<Parallax wipe={true}>
	<WaterRipple src={data.image} class="ripple-motion" brushSize={100} />
</Parallax>
	<section class="tight-stack wrapper-std first-box">
		<Crumb showT={true} title={data.title} showD={true} desc={data.description} showRow={data.isOpen}>
			{#if data.isOpen}
			<p class="tag-pill anveshi dead">OPEN NOW!</p>
			{/if}
		</Crumb>
		<div class="grid grid-cols-1 md:grid-cols-2 rgap16 md:cgap32 content-highlights" bind:this={ref}>
			<Reveal visible={vis.visible}>
				<data.content/>
			</Reveal>
		</div>
		{#if data.quote}
			<Reveal visible={vis.visible} delay={800}>
			<p class="card-title thin italic source-serif width60 quote-text" style="color: var(--color-anveshi-alt)">{data.quote}</p>
			</Reveal>
		{/if}
		<div class="grid grid-cols-2 xl:grid-cols-4 col-span-full info-row width60">
			<div class="box dates p16">
				<Calendar fill="var(--color-anveshi)"/>
				<p class="descriptor-text w500 ptop8">{data.dates}</p>
				<p class="tag-text grey tt-u">Dates</p>
			</div>
			<div class="box price p16">
				<Rupee fill="var(--color-anveshi)"/>
				<p class="descriptor-text w500 ptop8">{data.price}</p>
				<p class="tag-text grey tt-u">Price</p>
			</div>
			<div class="box duration p16">
				<Session fill="var(--color-anveshi)"/>
				<p class="descriptor-text w500 ptop8">{data.duration}</p>
				<p class="tag-text grey tt-u">Duration</p>
			</div>
			<div class="box temples p16">
				<Location fill="var(--color-anveshi)"/>
				<p class="descriptor-text w500 ptop8">{data.temples}</p>
				<p class="tag-text grey tt-u">Temples</p>
			</div>
		</div>
		<div class="box col-span-full">
			<div class="row cgap16 ycenter">
				{#if data.isOpen}
					<a class="primary anveshi" href={data.registerLink} target="_blank" rel="noreferrer"><span>Register Now</span></a>
				{/if}
				{#if data.brochureLink}
					<a class="primary anveshi" href={data.brochureLink} target="_blank" rel="noreferrer"><span>Brochure</span></a>
				{/if}
		</div>
		</div>
	</section>
	<section class="wrapper-std growingline">
		<Title text="Itinerary" anveshi={true}/>
		{#if itins && itins.length > 0}
			<Tabs class="anveshi-tabs" items={itins} getValue={(item, index) => `${index}-${item.daylabel}`} getLabel={(item) => `${item.daylabel} - ${item.label}`}>
				{#snippet children(item, index)}
					<div class="itin-panel b-main p16 lg:p24 radius8 grid lg:grid-cols-2 gap16 lg:gap32">
						<div class="up box">
							<img src={item.itinimage} class="itinimage radius8" alt={item.daylabel}/>
						</div>
						<div class="down box">
							<img src="https://www.bodharesearch.in/images/anveshi/day-{index + 1}.png" alt={item.daylabel} class="icon"/>
							<pre class="paragraph-text">{item.itinerary}</pre>
						</div>
					</div>
				{/snippet}
			</Tabs>
		{/if}


	</section>
	<section class="wrapper-std growingline alternate">
		<Title text="Temples" anveshi={true}/>
		{#if temples && temples.length > 0}
		<Swipes slidesPerView={templeStatus} spaceBetween={8}	pagination={false} breakpoints={{0: { slidesPerView: 1, spaceBetween: 8}, 1024: {slidesPerView: templeStatus,spaceBetween: 8}}}>
			{#each temples as item}
				<swiper-slide>
					{#if data.templetext}
						<div class="grid grid-cols-1 lg:grid-cols-2 cgap16 rgap16 temple-descriptions">
							<div class="up">
								<Lightbox><enhanced:img class="fit t2 radius8" src={item.image} alt={item.temple}/></Lightbox>	
							</div>
							<div class="box rgap16 down lg:pleft16">
								<p class="highlight-text w500">{item.temple}</p>
								<p class="paragraph-text grey">{item.description}</p>
							</div>
						</div>
					{:else}
					<div class="labelbox singular">
						<img class="temple-image" src={item.image} alt={item.temple}/>
						<p class="rem1">{item.temple}</p>
					</div>
					{/if}
				</swiper-slide>
			{/each}
		</Swipes>
		{/if}
	</section>
	<section class="box wrapper-std growingline">
		<FAQ/>
	</section>
</Container>

<style lang="sass">

.itinimage
	object-fit: cover
	height: 200px
	width: 200px

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
