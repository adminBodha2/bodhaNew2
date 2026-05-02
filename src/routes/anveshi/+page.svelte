<script lang="ts">
	import type { PageData } from './$types';
	import autoAnimate from '@formkit/auto-animate';
	import Container from '$lib/comps/container.svelte';
	import Swipes from '$lib/comps/swipercomp.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import FAQ from '$lib/comps/anveshifaqs.svelte';
	import Title from '$lib/comps/page-title.svelte';
	import Anveshilogo from '$lib/assets/anveshilogo.svelte';
	import { absoluteImage, absoluteUrl, stringifyJsonLd, touristTripJsonLd, webPageJsonLd } from '$lib/utils/seo';
	import Quote from '$lib/icons/quote.svelte'

	let { data }: { data: PageData } = $props();

	const title = 'Anveshi | Bodha';
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
	let goTime = $derived(sY >= 0);
	let screenerY = $derived(sY / 2);
	let isRegion = $state([false, false, false, false, false, false, false, true]);
	let showText = $state(false);

	let regionAnveshi = $derived(
		futureproj.filter((item: any) => item.region?.toLowerCase() === region)
	);
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

<div class="column screener-wrap scaledTypo">
	<div class="screener" style:transform={`translateY(${screenerY}px)`}>
		<div class="column rgap24 inscreen xcenter ycenter">
			<Anveshilogo {goTime} />
			<p class="tight white ta-c pbot16">
				Sacred journeys to unexplored kshetras of India.<br />Where, every outer journey becomes an inner journey.
			</p>
			<a class="primary anveshi" href="/anveshi/badami"><span>OPEN NOW - BADAMI CHAPTER</span></a>
		</div>
	</div>
</div>
<Container narrow={true} scaled={true}>
	<!-- ── INTRO ─────────────────────────────────────────── -->
	<div class="stdbox padded">
		<Crumb item1="Bodha" item1Link="/" />
		<div class="xleft textbox" use:autoAnimate>
			<p class="paragraph-text">Man is born to search: for truth; for beauty and meaning in life; for Anveṣaṇa.</p>
			<p class="paragraph-text width80">
				The word anveṣaṇa means discovery, and the one who searches is called – anveṣī – the discoverer. Kaśmīr Śaiva darśana tells us that, vimarṣa - Śiva reflecting upon himself – is one of the highest goals of existence itself. According to another school of thought, nature nudged evolution to a point where a species would emerge capable of reflecting upon itself and the mysteries of the
				cosmos, life and existence.
			</p>
			<p class="paragraph-text bold">We are born <em class="anv-orange">anveshi</em> — seekers by nature.</p>
			{#if !showText}
				<button class="blank anv-readmore" onclick={toggleText}>
					<span>Read more</span>
					<span class="anv-readmore-arrow">→</span>
				</button>
			{/if}
			{#if showText}
				<div class="box column rgap16 xleft">
					<div class="grid two tightrows">
						<div class="box textbox">
							<p class="paragraph-text">
								A favorite theme of literature is wanderlust—fernweh—the innate urge to go out and discover the world. This desire for discovery is fundamental to human nature: to seek the new, to unravel the hidden, to find joy in the very act of anveṣaṇa. Human history is shaped by such courageous journeys—taken by individuals and communities—that have transformed the course of civilizations.
							</p>
							<p class="paragraph-text">
								This urge is biological; most species possess the instinct to chart new waters and explore unknown territories. Yet, there is a deeper, inner dimension to this impulse. In discovering the world, we also seek to discover the self. In our pursuit of the new, we yearn for the eternal. In our search for change, we long for what is unchanging. In essence, every outer journey becomes an
								inner anvekṣaṇa.
							</p>
						</div>
						<div class="box textbox">
							<p class="paragraph-text">In Bhāratavarṣa and the Hindu dhārmic tradition, these two seemingly opposing impulses are beautifully harmonized through the tradition of yātrā to sacred kṣetrās—a journey where both the inner and outer quests are fulfilled in ways that are joyful, meaningful, and spiritually elevating.</p>
							<p class="paragraph-text">
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
	</div>

	<!-- ── CURRENT CHAPTERS ──────────────────────────────── -->
	{#if currproj && currproj.length > 0}
		<div class="stdbox padded bordertop" id="current-chapter">
			<Title text="current chapter" />
			{#each currproj as item, i}
				<a class="blank grid two anveshi" href="/anveshi{item.link}">
					<div class="anv-current-image">
						<img src={item.image} alt="{item.chapter} Chapter" />
					</div>
					<div class="textbox current-item">
						<p class="descriptor-text w500 tt-u" style="width: max-content">{item.fromto}</p>
						<h2 class="card-title source-serif">{item.chapter} Chapter</h2>
						<p class="grey pbot8">{item.desc}</p>
						<div class="self-bottom foot row ycenter xbetween mwrap cgap8 rgap8">
							<p class="anveshi-o descriptor-text bold">OPEN NOW</p>
							<p class="anveshi-o descriptor-text bold">→</p>
						</div>
					</div>
				</a>
			{/each}
		</div>
	{/if}

	{#if testis && testis.length > 0}
		<div class="stdbox padded bordertop" id="testimonials">
			<Title text="Testimonials" />
			<div class="testi-grid">
				<Swipes
					slidesPerView={3}
					spaceBetween={8}
					pagination={false}
					breakpoints={{ 0: { slidesPerView: 1, spaceBetween: 8 }, 1024: { slidesPerView: 3, spaceBetween: 8 } }}
				>
					{#each testis as item}
						<swiper-slide>
							<div class="box labelbox card-padded testi">
								<Quote />
								<p class="source-serif thin italic paragraph-text">{item.content}</p>
								<p class="grey rem1 ptop8">{item.person} | {item.chapter}</p>
							</div>
						</swiper-slide>
					{/each}
				</Swipes>
			</div>
		</div>
	{/if}

	<div class="stdbox padded bordertop" id="future-chapters">
		<Title text="future chapters" />
		<div class="row cgap8 rgap8 wrap">
			<button class="nav-btn anveshi" class:active={isRegion[7]} onclick={() => toggleRegion(7)}>All</button>
			<button
				class="nav-btn anveshi"
				class:active={isRegion[0]}
				onclick={() => {
					toggleRegion(0);
					setRegion('northern india');
				}}>North</button>
			<button
				class="nav-btn anveshi"
				class:active={isRegion[1]}
				onclick={() => {
					toggleRegion(1);
					setRegion('eastern india');
				}}>East</button>
			<button
				class="nav-btn anveshi"
				class:active={isRegion[2]}
				onclick={() => {
					toggleRegion(2);
					setRegion('western india');
				}}>West</button>
			<button
				class="nav-btn anveshi"
				class:active={isRegion[3]}
				onclick={() => {
					toggleRegion(3);
					setRegion('southern india');
				}}>South</button>
			<button
				class="nav-btn anveshi"
				class:active={isRegion[4]}
				onclick={() => {
					toggleRegion(4);
					setRegion('central india');
				}}>Centre</button>
			<button
				class="nav-btn anveshi"
				class:active={isRegion[5]}
				onclick={() => {
					toggleRegion(5);
					setRegion('himalayas');
				}}>Himalayas</button>
			<button
				class="nav-btn anveshi"
				class:active={isRegion[6]}
				onclick={() => {
					toggleRegion(6);
					setRegion('international');
				}}>International</button>
		</div>
		{#if futureproj && futureproj.length > 0 && isRegion[7]}
			<Swipes slidesPerView={4} spaceBetween={8} pagination={false} breakpoints={{ 0: { slidesPerView: 1, spaceBetween: 8 }, 1024: { slidesPerView: 4, spaceBetween: 8 } }}>
				{#each futureproj as item}
					<swiper-slide>
						<div class="box labelbox all-item">
							<img class="anv-future-image" src={item.gallery} alt={item.chapter} />
							<div class="labelbox card-future">
								<p class="paragraph-text bold">{item.chapter}</p>
								<p class="descriptor-text grey">{item.shortdesc}</p>
								{#if item.region}<p class="citation-big anveshi-o tt-u">{item.region}</p>{/if}
							</div>
							{#if item.regopen === true}
								<a class="blank open-link" href="/anveshi{item.link}">OPEN NOW →</a>
							{/if}
						</div>
					</swiper-slide>
				{/each}
			</Swipes>
			<!--
			<div class="white-grid grid stay2 four" use:autoAnimate>
				{#each futureproj as item, i}
					<div class="box labelbox all-item">
						<img class="anv-future-image" src={item.gallery} alt={item.chapter} />
						<div class="labelbox card-future">
							<p class="w500">{item.chapter}</p>
							<p class="descriptor-text grey">{item.shortdesc}</p>
							{#if item.region}<p class="citation-big anveshi-o tt-u">{item.region}</p>{/if}
						</div>
					</div>
				{/each}
			</div>
			-->
		{:else if !isRegion[7] && regionAnveshi && regionAnveshi.length > 0}
			<div class="white-grid grid stay2 four" use:autoAnimate>
				{#each regionAnveshi as item, i}
					<div class="box labelbox sub-item">
						<img class="anv-future-image" src={item.gallery} alt={item.chapter} />
						<div class="labelbox card-future">
							<p class="bold paragraph-text">{item.chapter}</p>
							<p class="descriptor-text grey">{item.shortdesc}</p>
						</div>
						{#if item.regopen === true}
							<a class="blank open-link" href="/anveshi{item.link}">OPEN NOW →</a>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	</div>

	{#if pastproj && pastproj.length > 0}
		<div class="stdbox padded bordertop" id="past-chapters">
			<Title text="past chapters" />
			<div class="white-grid grid four stay2">
				{#each pastproj as item, i}
					{#if item.pageactive === true}
					<div class="box labelbox past-grid-items blank whitestone">
						<a class="anv-past-image-wrap blank" href="/anveshi{item.link}">
							<img class="anv-past-image" src={item.gallery} alt={item.chapter}/>
						</a>
						<div class="box tight-padded" style="row-gap: 4px">
							<p class="rem1 w500">{item.chapter}</p>
							<a class="small-button row ycenter cgap8 themed" href="/anveshi{item.link}">SEE CHAPTER<div class="button-text">→</div></a>
						</div>
					</div>
					{:else}
					<div class="box labelbox past-grid-items">
						<div class="anv-past-image-wrap">
							<img class="anv-past-image" src={item.gallery} alt={item.chapter} />
						</div>
						<div class="tight-padded">
							<p class="rem1 w500">{item.chapter}</p>
						</div>
					</div>
					{/if}
				{/each}
			</div>
		</div>
	{/if}
	<div class="stdbox padded bordertop" id="faqs">
		<FAQ />
	</div>
</Container>

<style lang="sass">

#testimonials
	min-height: 80vh

.testi
	border: var(--border-main)
	height: 100%

.grid.two.anveshi
	padding: 1.25rem
	border: var(--border-dark)
	border-radius: 4px
	box-shadow: 0 6px 18px rgba(15,23,42,0.05)
	@media screen and (max-width: 1024px)
		padding: 0.5rem

.current-item
	padding: 1.25rem
	@media screen and (max-width: 1024px)
		padding: 1rem 0.5rem

.all-item, .sub-item
	background: var(--color-back)
	.open-link
		font-size: 0.875rem
		font-weight: 600
		padding: 1rem
		border-top: var(--border-main)
		color: var(--color-primary)
		background: var(--color-alt-3)
		&:hover
			color: var(--color-anveshi)
			font-wieght: 400

.sub-item
		width: %
		height: %

swiper-slide
	height: auto
	display: flex

swiper-slide > *
	width: 100%

.all-item
	border: var(--border-main)
	height: 100%

.card-future
	padding: 0.5rem 1rem 1rem 1rem

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

// ── CURRENT CHAPTERS ──────────────────────────────────────

.anv-current-image
	position: relative
	overflow: hidden
	height: 400px
	@media screen and (max-width: 1024px)
		height: 280px
	img
		width: 100%
		height: 100%
		object-fit: cover
		transition: transform 0.4s ease
	&:hover img
		transform: scale(1.03)

.current-item
	.self-bottom
		border-top: var(--border-main)
		padding-top: 1rem


// ── FUTURE CHAPTERS ───────────────────────────────────────

.anv-future-image
	width: 100%
	height: 200px
	object-fit: cover

// ── PAST CHAPTERS ─────────────────────────────────────────

.anv-past-image-wrap
	overflow: hidden
	height: 160px
	@media screen and (min-width: 1025px)
		height: 240px

.anv-past-image
	width: 100%
	height: 100%
	object-fit: cover
	transition: transform 0.3s ease
	&:hover
		transform: scale(1.04)

.past-grid-items
	padding-bottom: 1rem

</style>
