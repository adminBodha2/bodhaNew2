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
	import { arunachalDays, type ArunachalPlate } from '$lib/data/arunachal-itinerary';
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

	// Each plate's column spans are chosen from the length of its narration, so a
	// one-line caption never gets a sliver of a column and a long paragraph never
	// gets squeezed. Sides alternate to give the day a left-right rhythm.
	function plateKind(narration?: string) {
		const length = (narration ?? '').trim().length;
		if (length === 0) return 'p-full';
		if (length <= 110) return 'p-brief';
		if (length <= 260) return 'p-even';
		return 'p-long';
	}

	function layoutPlates(plates: ArunachalPlate[]) {
		let sided = 0;
		return plates.map((plate, i) => {
			const kind = plateKind(plate.narration);
			return {
				...plate,
				kind,
				flip: kind !== 'p-full' && sided++ % 2 === 1,
				seq: i + 1,
				total: plates.length
			};
		});
	}

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
			<a class="anveshi-pill" href={data.registerLink} target="_blank" rel="noreferrer">REGISTER NOW!</a>
		{/if}
	</Crumb>
	<!--------------introduction with details like date, pricing etc.------------------>
	<section class="wrapper-std first-box">
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
	{#if data.slug === "arunachal"}
	<section class="arunachal wrapper-std growingline">
		{#each arunachalDays as day (day.n)}
			<div class="aru-day">
				<aside class="aru-aside">
					<div class="aru-sticky box rgap16">
						<div class="box ytop rgap16">
							<p class="aru-date txt-xs tt-u w600 ls008p anveshi-bright">{day.date}</p>
							<h2 class="aru-title w600 lh12">Day {day.n} - {day.place}</h2>
						</div>
						<p class="aru-exp txt-sm lh16 grey1">{day.experience}</p>
						<div class="aru-label row ycenter cgap8 ptop16">
							<p class="txt-sm tt-u w600 anveshi-bright-text ls010p">Itinerary</p>
						</div>
						<pre class="aru-itin txt-bs grey">{day.itinerary}</pre>
					</div>
				</aside>
				<div class="aru-plates">
					{#each layoutPlates(day.plates) as plate (plate.image)}
						<div class="aru-plate {plate.kind}" class:flip={plate.flip}>
							<div class="aru-shot">
								<img src={plate.image} alt={plate.narration ?? `Day ${day.n} — ${day.place}`} loading="lazy" />
							</div>
							{#if plate.narration}
								<div class="aru-note box rgap8">
									<span class="aru-rule"></span>
									<p class="lh15 grey3">{plate.narration}</p>
									<span class="aru-seq txt-00 w600 grey0 ls010p">
										{String(plate.seq).padStart(2, '0')} / {String(plate.total).padStart(2, '0')}
									</span>
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</section>
	{:else}
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
	{/if}
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

// ── arunachal day-wise narrative ─────────────────────────────

.arunachal
	row-gap: 4rem
	@media screen and (min-width: 1025px)
		row-gap: 6.5rem

.aru-day
	display: grid
	grid-template-columns: minmax(0, 1fr)
	row-gap: 2rem
	@media screen and (min-width: 1025px)
		grid-template-columns: 360px minmax(0, 1fr)
		column-gap: 4rem
	@media screen and (min-width: 1441px)
		grid-template-columns: 400px minmax(0, 1fr)
		column-gap: 5rem

.aru-aside
	// the aside has to fill the row, otherwise the sticky child has no
	// travel room — same pattern as .doc-header-grid aside .stickybox
	@media screen and (min-width: 1025px)
		height: 100%

.aru-sticky
	// 80px clears the sticky site header, as .doc-header-grid .stickybox does
	@media screen and (min-width: 1025px)
		position: sticky
		top: calc(80px + 1.5rem)
		max-height: calc(100vh - 80px - 3rem)
		overflow-y: auto
		padding-bottom: 1.5rem
		scrollbar-width: thin
		border-right: var(--border-main)
		&::-webkit-scrollbar
			width: 2px
		&::-webkit-scrollbar-thumb
			background: var(--color-border)

.aru-title
	font-size: var(--txt-2xl)
	letter-spacing: -0.02rem
	flex: 1 1 auto
	min-width: 0
	@media screen and (min-width: 1281px)
		font-size: var(--txt-3xl)

.aru-date
	flex: 0 0 auto
	white-space: nowrap

.aru-exp
	letter-spacing: 0.02rem

.aru-label
	&::after
		content: ''
		flex: 1
		height: 1px
		background: var(--color-border-dark)
		opacity: 0.45

.aru-itin
	line-height: 1.8
	@media screen and (min-width: 1025px)
		font-size: var(--txt-lg)
		line-height: 1.75

.aru-plates
	display: flex
	flex-direction: column
	row-gap: 4rem
	@media screen and (min-width: 1025px)
		row-gap: 6.5rem

.aru-plate
	display: grid
	grid-template-columns: minmax(0, 1fr)
	row-gap: 1rem
	img
		width: 100%
		display: block
	@media screen and (min-width: 1025px)
		grid-template-columns: repeat(6, minmax(0, 1fr))
		column-gap: 1rem
		row-gap: 1.5rem
		align-items: center
		&.p-full .aru-shot
			grid-column: span 6
		&.p-brief
			.aru-shot
				grid-column: span 3
			.aru-note
				grid-column: span 3
		&.p-even
			.aru-shot
				grid-column: span 3
			.aru-note
				grid-column: span 3
		&.p-long
			.aru-shot
				grid-column: span 6
			.aru-note
				grid-column: 2 / 6
				justify-self: center
				text-align: center
		&.flip
			.aru-shot
				order: 2
			.aru-note
				order: 1
		&.p-long.flip
			.aru-shot
				order: 1
			.aru-note
				order: 2

.aru-rule
	width: 2rem
	height: 2px
	background: var(--color-anveshi2)

.aru-plate.p-long .aru-rule
	@media screen and (min-width: 1025px)
		align-self: center

.aru-note
	p
		font-size: var(--txt-lg)
	@media screen and (min-width: 1025px)
		p
			font-size: var(--txt-xl)

.aru-plate.p-brief .aru-note
	@media screen and (min-width: 1025px)
		p
			font-size: var(--txt-xl)
			line-height: 1.45

.aru-plate.p-long .aru-note
	@media screen and (min-width: 1025px)
		p
			font-size: var(--txt-2xl)
			line-height: 1.45
			color: var(--color-primary)

</style>
