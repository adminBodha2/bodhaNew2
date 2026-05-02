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
	import { WaterRipple } from '$lib/motion-core';
	import { absoluteImage, absoluteUrl, stringifyJsonLd, touristTripJsonLd } from '$lib/utils/seo';

	let { data } = $props();

	let selectedDay = $state(0);
	let templeStatus = $state(0);
	let iW = $state(0);

	function selectDay(index: number) {
		selectedDay = index;
	}

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
					name: item.label,
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
<section class="ripple-image-box">
	<WaterRipple src={data.image} class="ripple-motion" brushSize={100} />
</section>
	<div class="stdbox stdpad is-first">
		<Crumb showT={true} title={data.title} showD={true} desc={data.description} showRow={data.isOpen}>
			{#if data.isOpen}
			<p class="tag-pill anveshi">OPEN NOW!</p>
			{/if}
		</Crumb>
		<div class="text-container elembox">
			<div class="grid two tightrows">
			<data.content/>
			</div>
		</div>
		{#if data.quote}
			<p class="card-title italic source-serif thin width80 loose">{data.quote}</p>
		{/if}
		<div class="textbox">
		<div class="grid four stay2 widthmax info-row">
			<div class="box dates card-padded">
				<Calendar fill="var(--color-anveshi)"/>
				<p class="descriptor-text w500 ptop8">{data.dates}</p>
				<p class="tag-text grey tt-u">Dates</p>
			</div>
			<div class="box price card-padded">
				<Rupee fill="var(--color-anveshi)"/>
				<p class="descriptor-text w500 ptop8">{data.price}</p>
				<p class="tag-text grey tt-u">Price</p>
			</div>
			<div class="box duration card-padded">
				<Session fill="var(--color-anveshi)"/>
				<p class="descriptor-text w500 ptop8">{data.duration}</p>
				<p class="tag-text grey tt-u">Duration</p>
			</div>
			<div class="box temples card-padded">
				<Location fill="var(--color-anveshi)"/>
				<p class="descriptor-text w500 ptop8">{data.temples}</p>
				<p class="tag-text grey tt-u">Temples</p>
			</div>
		</div>
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
	<div class="stdbox stdpad bordertop">
		<Title text="Itinerary" anveshi={true}/>
		{#if itins && itins.length > 0}
			{#if iW > 1024}
			<div class="itin-grid">
				<div class="box itin-nav">
					{#each itins as item, i}
					<button class="box xleft ta-l itin-button" onclick={() => selectDay(i)} class:active={selectedDay === i}>
						<p class="citation-big tt-u lgrey">{item.daylabel}</p>
						<p class="rem1 w500">{item.label}</p>
					</button>
					{/each}
				</div>
				<div class="box itin-item card-padded">
					{#each itins as item, i}
					{#if selectedDay === i}
					<img src="https://www.bodharesearch.in/images/anveshi/day-{i+1}.png" alt="icon" class="icon"/>
					<pre class="hi">{item.itinerary}</pre>
					{/if}
					{/each}
				</div>
			</div>
			{:else}
			<div class="box">
			{#each itins as item, i}
				<button class="itin-button" onclick={() => selectDay(i)} class:active={selectedDay === i}>
					<p class="citation-big tt-u lgrey">{item.daylabel}</p>
					<p class="rem1 w500">{item.label}</p>
					{#if selectedDay === i}
					<pre class="paragraph-text ptop8">{item.itinerary}</pre>
					{/if}
				</button>
			{/each}
			</div>
			{/if}
		{/if}
	</div>
	<div class="stdbox stdpad bordertop">
		<Title text="Temples" anveshi={true}/>
		{#if temples && temples.length > 0}
		<Swipes slidesPerView={templeStatus} spaceBetween={8}	pagination={false} breakpoints={{0: { slidesPerView: 1, spaceBetween: 8}, 1024: {slidesPerView: templeStatus,spaceBetween: 8}}}>
			{#each temples as item}
				<swiper-slide>
					{#if data.templetext}
						<div class="grid two tight temple-descriptions">
							<div class="up tight-padded">
								<img class="temple-image" src={item.image} alt={item.temple}/>
							</div>
							<div class="textbox down card-padded">
								<p class="paragraph-text w500">{item.temple}</p>
								<p>{item.description}</p>
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
	</div>
	<div class="stdbox stdpad is-last bordertop">
		<FAQ/>
	</div>
</Container>

<style lang="sass">

img.icon
	object-fit: contain
	width: 32px
	height: 32px
	margin-bottom: 1rem

.temple-descriptions
	.card-padded, .tight-padded
		border: var(--border-main)

.up
	img.temple-image
		object-fit: cover
		width: 100%
		@media screen and (min-width: 1025px)
			height: 100%

.singular
	img.temple-image
		object-fit: cover
		width: 100%
		height: 280px
		@media screen and (min-width: 1025px)
			height: 240px

.itin-grid
	@media screen and (min-width: 1025px)
		display: grid
		grid-template-columns: 360px 1fr
		border: var(--border-dark)
		.itin-nav
			padding-right: 1rem
			padding-left: 1rem
			border-right: var(--border-main)
		.itin-item
			background: var(--color-alt-1)

.itin-button
	background: none
	border-top: none
	border-left: none
	border-right: none
	border-bottom: var(--border-main)
	padding-bottom: 1rem
	padding-top: 1rem
	&:hover
		p
			color: var(--color-anveshi)
	&.active
		p
			color: var(--color-anveshi)
	&:last-child
		border-bottom: none
	@media screen and (max-width: 1024px)
		display: flex
		flex-direction: column
		align-items: flex-start
		text-align: left

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
