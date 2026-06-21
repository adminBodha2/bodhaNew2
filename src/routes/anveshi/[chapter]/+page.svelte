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
	import Slide from '$lib/svelteanim/components/Slide2.svelte';
	import { absoluteImage, absoluteUrl, stringifyJsonLd, touristTripJsonLd } from '$lib/utils/seo';

	let { data } = $props();

	let templeStatus = $state(0);
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
	<Crumb showT={true} title="{data.slug} Chapter" showD={true} desc={data.description} showRow={data.isOpen}>
		{#if data.isOpen}
			<p class="anveshi-pill">REGISTER NOW!</p>
		{/if}
	</Crumb>
	<!--------------introduction with details like date, pricing etc.------------------>
	<section class="wrapper-std">
		<Slide targetSelector=".slide-item">
			<div class="grid grid-cols-1 lg:grid-cols-2 cgap64 rgap16 content-highlights slide-item">
				<data.content />
			</div>
		</Slide>
		{#if data.quote}
			<Reveal>
				<p class="txt-xl md:txt-2xl lg:txt-3xl lh15 italic source-serif width80 anveshi-o slide-item">{data.quote}</p>
			</Reveal>
		{/if}
	</section>
	<section class="wrapper-std growingline alternate">
		<div class="box rgap16">
		<Slide targetSelector=".icon-box">
				<div class="grid grid-cols-2 lg:grid-cols-6 gap16">
					<div class="icon-box box dates std-pad b-main">
						<Calendar fill="var(--color-anveshi)" />
						<p class="txt-bs w500 ptop16 pbot4">{data.dates}</p>
						<p class="txt-xs grey1 tt-u">Dates</p>
					</div>
					<div class="icon-box box price std-pad b-main">
						<Rupee fill="var(--color-anveshi)" />
						<p class="txt-bs w500 ptop16 pbot4">{data.price}</p>
						<p class="txt-xs grey1 tt-u">Price</p>
					</div>
					<div class="icon-box box duration std-pad b-main">
						<Session fill="var(--color-anveshi)" />
						<p class="txt-bs w500 ptop16 pbot4">{data.duration}</p>
						<p class="txt-xs grey1 tt-u">Duration</p>
					</div>
					<div class="icon-box box temples std-pad b-main">
						<Location fill="var(--color-anveshi)" />
						<p class="txt-bs w500 ptop16 pbot4">{data.temples}</p>
						<p class="txt-xs grey1 tt-u">Temples</p>
					</div>
					{#if data.isOpen}
					<div class="anveshi-color-box box std-pad b-main ycenter xcenter ta-c">
							<a class="txt-lg tt-u w600" href={data.registerLink} target="_blank" rel="noreferrer"><span>Register Now</span></a>
					</div>
						{/if}
					{#if data.brochureLink}
					<div class="anveshi-color-box box std-pad b-main ycenter xcenter ta-c">
						<a class="txt-lg tt-u w600" href={data.brochureLink} target="_blank" rel="noreferrer"><span>Brochure</span></a>
					</div>
					{/if}
				</div>
		</Slide>
		{#if itins && itins.length > 0}
		<Slide targetSelector=".itin-item">
			<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap16">
				{#each itins as item, i}
						<div class="box b-main itin-item">
							<div class="box p16 borderbot">
								<p class="txt-sm anveshi-o tt-u w600">{item.daylabel}</p>
								<p class="txt-lg w500">{item.label}</p>
							</div>
							<div class="box p16">
								<pre class="txt-lg">{item.itinerary}</pre>
							</div>
						</div>
				{/each}
			</div>
		</Slide>
		{/if}
		</div>
	</section>
	<!--------------temples------------------>
	<section class="wrapper-std growingline">
		<Title text="Temples" anveshi={true} />
		{#if temples && temples.length > 0}
			<Swipes slidesPerView={templeStatus} spaceBetween={16} pagination={false} breakpoints={{ 0: { slidesPerView: 1, spaceBetween: 8 }, 1024: { slidesPerView: 2, templeStatus, spaceBetween: 16 } }}>
				{#each temples as item}
					<swiper-slide>
						{#if data.templetext}
							<div class="box p8 b-main">
								<div class="up">
									<img class="fitted landscape" src={item.image} alt={item.temple} />
								</div>
								<div class="box rgap16 p8 md:p24 lg:p32">
									<p class="txt-2xl w600">{item.temple}</p>
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

.anveshi-pill
	background: var(--color-anveshi)
	width: max-content
	color: #FFFFFF
	font-size: 14px
	padding: 4px 8px

:global(.anveshi-tabs .tab)
	--tab-active-color: var(--color-anveshi)
	--tab-hover-color: var(--color-anveshi)

:global(.anveshi-tabs .tab)
	--tab-color: var(--color-grey-2)
	--tab-active-color: var(--color-anveshi)
	--tab-hover-color: var(--color-anveshi)	

.singular
	img.temple-image
		object-fit: cover
		width: 100%
		height: 280px
		@media screen and (min-width: 1025px)
			height: 240px

.dates, .price, .duration
	border-right: var(--border-main)

.dates, .price
	@media screen and (max-width: 1024px)
		border-bottom: var(--border-main)

</style>
