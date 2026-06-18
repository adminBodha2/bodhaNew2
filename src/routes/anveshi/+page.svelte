<script lang="ts">
	import type { PageData } from './$types';
	import autoAnimate from '@formkit/auto-animate';
	import { staggerAnimatePlugin } from '$lib/svelteanim/utils/staggerPlugin';
	import Container from '$lib/comps/wrapper.svelte';
	import Swipes from '$lib/comps/swipercomp.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import FAQ from '$lib/comps/anveshifaqs.svelte';
	import Title from '$lib/comps/page-title.svelte';
	import Mark from '$lib/comps/marquee.svelte';
	import Anveshilogo from '$lib/assets/anveshilogo.svelte';
	import ResponsiveMenu from '$lib/comps/responsive-menu.svelte';
	import { absoluteImage, absoluteUrl, stringifyJsonLd, touristTripJsonLd, webPageJsonLd } from '$lib/utils/seo';
	import Quote from '$lib/icons/quote.svelte';
	import Slider from '$lib/svelteanim/components/Slide2.svelte';
	import Reveal from '$lib/svelteanim/components/Reveal.svelte';
	import Blur from '$lib/svelteanim/components/Blur.svelte';
	import { Lightbox, LightboxGallery, GalleryImage, GalleryThumbnail } from 'svelte-lightbox';

	let { data }: { data: PageData } = $props();

	const title = 'Bodha Anveshi | Sacred Hindu Temple Journeys and Kshetra Tours';
	const metaDescription = 'Anveshi features guided tours to beautiful and hitherto unexplored temples and kshetras of Bharatavarsha.';
	const metaUrl = absoluteUrl('/anveshi');
	const metaImage = absoluteImage('/images/key-anveshi.webp');

	const jsonld = stringifyJsonLd([
		{
			...webPageJsonLd({
				name: title,
				description: metaDescription,
				url: metaUrl,
				image: metaImage
			}),
			about: {
				'@type': 'TouristTrip',
				name: 'Anveshi',
				description: metaDescription
			}
		},
		touristTripJsonLd({
			name: 'Anveshi',
			description: metaDescription,
			url: metaUrl,
			image: metaImage
		})
	]);

	let currproj = $derived(data.currproj ?? []);
	let futureproj = $derived(data.futureproj ?? []);
	let pastproj = $derived(data.pastproj ?? []);
	let testis = $derived(data.testis ?? []);

	let sY = $state(0);
	let iW = $state(0);
	let region = $state('northern india');
	let goTime = $derived(sY >= 400);
	let screenerY = $derived(sY / 2);
	let isRegion = $state([false, false, false, false, false, false, false, true]);
	let showText = $state(false);

	let regionAnveshi = $derived(futureproj.filter((item: any) => item.region?.toLowerCase() === region));
	function setRegion(newRegion: string) {
		region = newRegion;
	}
	function toggleText() {
		showText = !showText;
	}
	function toggleRegion(index: number) {
		isRegion[index] = !isRegion[index];
		for (let i = 0; i < isRegion.length; i++) {
			if (i !== index && isRegion[i] === true) {
				isRegion[i] = false;
			}
		}
	}
</script>

<svelte:window bind:scrollY={sY} bind:innerWidth={iW} />

<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="1536" imHeight="1024" {jsonld} />

<div class="box screener-wrap">
	<h1 class="visually-hidden">{title}</h1>
	<div class="screener" style:transform={`translateY(${screenerY}px)`}>
		<div class="box rgap24 inscreen xcenter ybottom">
			<div class="even-in box rgap24 xcenter" style:margin-bottom={`calc(${screenerY / 10}rem + 2rem)`}>
				<Reveal>
					<p class="txt-2xl lg:txt-3xl white ta-c pbot16 ptop16">
						Sacred journeys to unexplored kshetras of India.<br />Where, every outer journey becomes an inner journey.
					</p>
				</Reveal>
				<Slider>
					<div class="row gap8 mwrap">
						<a class="primary anveshi" href="/anveshi/badami"><span>OPEN - BADAMI</span></a>
						<a class="primary anveshi" href="/anveshi/odisha"><span>OPEN - ODISHA</span></a>
					</div>
				</Slider>
			</div>
		</div>
	</div>
</div>
<Container>
	<!-- ── INTRO ─────────────────────────────────────────── -->
	<section class="wrapper-std" id="first-box-of-text">
		<div class="box rgap16" use:autoAnimate>
			<div class="grid grid-cols-1 lg:grid-cols-3 cgap32 rgap32">
				<div class="box rgap16 col-span-2">
					<Reveal><p class="highlight-text">Man is born to search: for truth; for beauty and meaning in life; for Anveṣaṇa.</p></Reveal>
					<Reveal>
						<p class="highlight-text">
							The word anveṣaṇa means discovery, and the one who searches is called – anveṣī – the discoverer. Kaśmīr Śaiva darśana tells us that, vimarṣa - Śiva reflecting upon himself – is one of the highest goals of existence itself. According to another school of thought, nature nudged evolution to a point where a species would emerge capable of reflecting upon itself and the mysteries of the
							cosmos, life and existence.
						</p>
					</Reveal>
					<Reveal><p class="highlight-text bold">We are born <em class="anv-orange">anveshi</em> — seekers by nature.</p></Reveal>
					{#if !showText}
						<button class="hollow-link anveshi" onclick={toggleText}>
							Read More
							<span class="button-text">→</span>
						</button>
					{/if}
				</div>
				<Anveshilogo {goTime} />
			</div>
			{#if showText}
				<div class="grid col-span-full">
					<div class="grid grid-cols-1 lg:grid-cols-2 col-span-full rgap16 cgap32">
						<div class="box textbox">
							<p class="highlight-text">
								A favorite theme of literature is wanderlust—fernweh—the innate urge to go out and discover the world. This desire for discovery is fundamental to human nature: to seek the new, to unravel the hidden, to find joy in the very act of anveṣaṇa. Human history is shaped by such courageous journeys—taken by individuals and communities—that have transformed the course of civilizations.
							</p>
							<p class="highlight-text">
								This urge is biological; most species possess the instinct to chart new waters and explore unknown territories. Yet, there is a deeper, inner dimension to this impulse. In discovering the world, we also seek to discover the self. In our pursuit of the new, we yearn for the eternal. In our search for change, we long for what is unchanging. In essence, every outer journey becomes an
								inner anvekṣaṇa.
							</p>
						</div>
						<div class="box">
							<p class="highlight-text">In Bhāratavarṣa and the Hindu dhārmic tradition, these two seemingly opposing impulses are beautifully harmonized through the tradition of yātrā to sacred kṣetrās—a journey where both the inner and outer quests are fulfilled in ways that are joyful, meaningful, and spiritually elevating.</p>
							<p class="highlight-text">
								Anveṣī seeks to contemporize the ancient Indian tradition of yātrā by taking modern seekers to sacred kṣetrās of India - places that are largely unexplored by most of us, yet are rich in architectural, sculptural, and cultural splendor. These are not just historical sites, but living systems that have sustained vibrant cultural traditions for thousands of years.
							</p>
						</div>
					</div>
				</div>
				<button class="blank anv-readmore anv-readless" onclick={toggleText}>
					<span>Collapse</span>
					<span class="anv-readmore-arrow">↑</span>
				</button>
			{/if}
		</div>
	</section>
	<!-- ── CURRENT CHAPTERS ──────────────────────────────── -->
	{#if currproj && currproj.length > 0}
		<section class="wrapper-std growingline alternate" id="current-chapter">
			<Title text="current chapter" anveshi={true} />
			{#each currproj as item, i}
					<a class="grid grid-cols-1 lg:grid-cols-3 ordered" href="/anveshi{item.link}">
						<div class="box up col-span-1">
							<Blur>
								<img class="fitted h-also" src={item.gallery} alt={item.chapter} />
							</Blur>
						</div>
						<div class="box down col-span-2 std-pad">
							<Reveal>
								<p class="txt-sm tt-u anveshi-o w600">OPEN NOW</p>
							</Reveal>
							<div class="box rgap16">
								<Reveal>
								<p class="txt-lg tt-u w500" style="width: max-content">{item.fromto}</p>
								</Reveal>
								<Reveal>
								<h2 class="txt-3xl lg:txt-4xl w600">{item.chapter} Chapter</h2>
								</Reveal>
								<Reveal>
								<p class="highlight-text lh12 width80">{item.desc}</p>
								</Reveal>
								<Reveal>
								<p class="anveshi-o descriptor-text bold">→</p>
								</Reveal>
							</div>
						</div>
					</a>
			{/each}
		</section>
	{/if}

	<!----testimonials--──────────────────────--->
	{#if testis && testis.length > 0}
		<section class="wrapper-std growingline" id="testimonials">
			<Title text="testimonials" anveshi={true} />
			<div class="box rgap16">
				<Mark fade pauseOnHover duration="200s" gap="16px">
					{#each testis as item}
						<div class="testimonial box rgap8 std-pad b-main">
							<Quote />
							<p class="lh14 italic">{item.content}</p>
							<p class="txt-sm anveshi-o tt-u self-bottom bordertop ptop16">{item.person} | {item.chapter}</p>
						</div>
					{/each}
				</Mark>
				<Mark fade pauseOnHover reverse={true} duration="200s" gap="16px">
					{#each testis as item, i}
						{#if i > 3}
							<div class="testimonial box rgap8 std-pad b-main">
								<Quote />
								<p class="lh14 italic">{item.content}</p>
								<p class="txt-sm anveshi-o tt-u self-bottom bordertop ptop16">{item.person} | {item.chapter}</p>
							</div>
						{/if}
					{/each}
				</Mark>
			</div>
		</section>
	{/if}

	<!----future chapters--──────────────────────--->
	<section class="wrapper-std growingline alternate" id="future-chapters">
		<Title text="future chapters" anveshi={true} />
		<Blur end="bottom 75%">
		<div class="area-of-display" use:autoAnimate={staggerAnimatePlugin({ stagger: 80, duration: 300 })}>
			<div class="selection-menu">
				<ResponsiveMenu label="Menu" ariaLabel="Future chapters regions">
					<button class="selection-button" class:active={isRegion[7]} onclick={() => toggleRegion(7)}>All</button>
					<button
						class="selection-button"
						class:active={isRegion[0]}
						onclick={() => {
							toggleRegion(0);
							setRegion('northern india');
						}}>North</button>
					<button
						class="selection-button"
						class:active={isRegion[1]}
						onclick={() => {
							toggleRegion(1);
							setRegion('eastern india');
						}}>East</button>
					<button
						class="selection-button"
						class:active={isRegion[2]}
						onclick={() => {
							toggleRegion(2);
							setRegion('western india');
						}}>West</button>
					<button
						class="selection-button"
						class:active={isRegion[3]}
						onclick={() => {
							toggleRegion(3);
							setRegion('southern india');
						}}>South</button>
					<button
						class="selection-button"
						class:active={isRegion[4]}
						onclick={() => {
							toggleRegion(4);
							setRegion('central india');
						}}>Centre</button>
					<button
						class="selection-button"
						class:active={isRegion[5]}
						onclick={() => {
							toggleRegion(5);
							setRegion('himalayas');
						}}>Himalayas</button>
					<button
						class="selection-button"
						class:active={isRegion[6]}
						onclick={() => {
							toggleRegion(6);
							setRegion('international');
						}}>International</button>
				</ResponsiveMenu>
			</div>
			{#if futureproj && futureproj.length > 0 && isRegion[7]}
				<Swipes slidesPerView={4} spaceBetween={16} pagination={false} breakpoints={{ 0: { slidesPerView: 1, spaceBetween: 0 }, 1024: { slidesPerView: 4, spaceBetween: 16 } }}>
					{#each futureproj as item}
						<swiper-slide>
							<div class="sub-item box swiper-sub overflow-hidden b-main">
								<div class="p8"><img class="fitted landscape" src={item.gallery} alt={item.chapter} /></div>
								<div class="box rgap8 p16">
									<div class="box ycenter">
										<p class="txt-xl w600 tt-c">{item.chapter}</p>
										{#if item.regopen === true}
											<a class="hollow-link anveshi" href="/anveshi{item.link}">Open Now <span class="button-text">→</span></a>
										{/if}
									</div>
									<p class="txt-lg lh14 grey2 pbot8">{item.shortdesc}</p>
								</div>
								<p class="txt-xs w500 anveshi-o tt-u px16 pbot16 self-bottom">{item.region}</p>
							</div>
						</swiper-slide>
					{/each}
				</Swipes>
			{:else if !isRegion[7] && regionAnveshi && regionAnveshi.length > 0}
				<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap16" use:autoAnimate={staggerAnimatePlugin({ stagger: 80, duration: 300 })}>
					{#each regionAnveshi as item, i}
						<div class="box whitecard p8 b-main">
							<div class="p8"><img class="fitted landscape" src={item.gallery} alt={item.chapter} /></div>
							<div class="box rgap8 p16">
								<div class="row ycenter cgap16">
									<p class="txt-xl w650 tt-c">{item.chapter}</p>
									{#if item.regopen === true}
										<a class="hollow-link anveshi" href="/anveshi{item.link}">Open Now <span class="button-text">→</span></a>
									{/if}
								</div>
								<p class="txt-lg lh14 grey2 pbot8">{item.shortdesc}</p>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>
		</Blur>
	</section>

	<!----past chapters--──────────────────────--->
	{#if pastproj && pastproj.length > 0}
		<section class="wrapper-std growingline" id="past-chapters">
			<Title text="past chapters" anveshi={true} />
			<Slider targetSelector=".past-grid-items">
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap16">
				{#each pastproj as item, i}
						{#if item.pageactive === true}
							<div class="box past-grid-items blank whitestone">
								<Lightbox><img class="fitted herocard" src={item.gallery} alt={item.chapter} /></Lightbox>
								<a class="box p16 rgap8" href="/anveshi{item.link}">
									<p class="txt-xl w500">{item.chapter}</p>
									<span class="hollow-link anveshi-o">Explore <span class="button-text">→</span></span>
								</a>
							</div>
						{:else}
							<div class="box past-grid-items blank whitestone">
								<Lightbox><img class="fitted herocard" src={item.gallery} alt={item.chapter} /></Lightbox>
								<div class="box p16">
									<p class="txt-lg w500">{item.chapter}</p>
								</div>
							</div>
						{/if}
				{/each}
			</div>
			</Slider>
		</section>
	{/if}

	<!----faq section--──────────────────────--->
	<section class="wrapper-std growingline" id="faqs">
		<FAQ />
	</section>
</Container>

<style lang="sass">

#first-box-of-text
	@media (min-width: 1025px)
		min-height: 100vh
		justify-content: center

#current-chapter
	@media (min-width: 1025px)
		height: 72vh
		justify-content: center

.area-of-display
	min-height: 80vh
	display: flex
	flex-direction: column
	justify-content: flex-start
	row-gap: 2rem
	@media (min-width: 1025px)
		min-height: 80vh
		row-gap: 2rem

#testimonials
	@media (min-width: 1025px)
		min-height: 100vh

.testimonial
	background: var(--color-back)
	height: 100%
	width: 400px
	transition: all 120ms ease
	&:hover
		background: var(--color-stone-0)


swiper-slide
	height: auto
	display: flex

swiper-slide > *
	width: 100%

// ── PARALLAX (untouched) ──────────────────────────────────

.screener-wrap
	width: 100%
	overflow: hidden
	@media screen and (min-width: 1025px)
		height: 100vh
	@media screen and (max-width: 1024px)
		height: calc(50vh + 64px)

.screener
	background-image: url('/images/key-anveshi.webp')
	background-position: center center
	background-size: cover
	width: 100%
	height: 100%
	.inscreen
		width: 100%
		height: 100%
		background: rgba(0,0,0,0.7)

// ── INTRO ─────────────────────────────────────────────────

.anv-orange
	color: var(--color-anveshi)
	font-style: italic

.anv-readmore
	display: inline-flex
	align-items: center
	gap: 6px
	font-size: 0.85rem
	font-weight: 600
	color: var(--color-anveshi)
	transition: gap 0.15s ease
	&:hover
		gap: 10px

.anv-readmore-arrow
	font-size: 1rem
	line-height: 1

.anv-readless
	margin-top: 0.25rem

</style>
