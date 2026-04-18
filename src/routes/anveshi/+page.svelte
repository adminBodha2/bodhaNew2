<script lang="ts">
	import { onMount, tick } from 'svelte';
	import autoAnimate from '@formkit/auto-animate';
	import { anveshiCurrent, anveshiFuture, selectedAnveshiFuture, anveshiPast } from '$lib/utils/supabaseClient';
	import Container from '$lib/comps/container.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Card from '$lib/comps/card-comp.svelte';
	import FAQ from '$lib/comps/anveshifaqs.svelte';
	import Title from '$lib/comps/page-title.svelte';
	import { metaTitle, metaDescription, metaUrl, metaImage } from '$lib/utils/metastores';
	import Anveshilogo from '$lib/assets/anveshilogo.svelte';
	import Close from '$lib/assets/close.svelte';
	$metaTitle = 'Bodha - Anveshi';
	$metaDescription = 'Anveshi features guided tours to beautiful and hitherto unexplored temples and kshetras of Bharatavarsha.';
	$metaUrl = 'https://www.bodharesearch.in/anveshi';
	$metaImage = '/images/key-anveshi.webp';

	let currproj: any;
	let futureproj: any;
	let pastproj: any;
	let sY: number;
	let regionAnveshi: any;
	let region: string = 'northern india';
	let goTime: boolean;
	$: goTime = sY >= 0;
	let isRegion = Array(8).fill(false);
	isRegion[0] = true;
	let showText = false;

	function setRegion(newRegion: string) {
		region = newRegion;
		(async () => {
			regionAnveshi = await selectedAnveshiFuture(region);
		})();
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

	onMount(() => {
		(async () => {
			currproj = await anveshiCurrent();
			futureproj = await anveshiFuture();
			regionAnveshi = await selectedAnveshiFuture(region);
			pastproj = await anveshiPast();
		})();
	});
</script>

<svelte:window bind:scrollY={sY} />

<Head title={$metaTitle} metaDescription={$metaDescription} metaUrl={$metaUrl} metaImage={$metaImage}></Head>

<div class="column screener-wrap scaledTypo">
	<div class="screener" style="transform: translateY({sY / 2}px)">
		<div class="column rgap24 inscreen xcenter ycenter">
			<Anveshilogo {goTime} />
			<p class="tight white ta-c pbot16">
				Sacred journeys to unexplored kshetras of India.<br />Where, every outer journey becomes an inner journey.
			</p>
			<a class="primary anveshi" href="/anveshi/kullu"><span>OPEN NOW - KULLU CHAPTER</span></a>
		</div>
	</div>
</div>
<Container narrow={true} scaled={true}>
	<!-- ── INTRO ─────────────────────────────────────────── -->
	<div class="box std padded">
		<p class="eyebrow tt-u"><a class="linkonhover" href="/">Bodha</a></p>
		<div class="column box xleft textbox" use:autoAnimate>
			<p class="card-text">
				Man is born to search: for truth; for beauty and meaning in life; for Anveṣaṇa. The word anveṣaṇa means discovery, and the one who searches is called – anveṣī – the discoverer. Kaśmīr Śaiva darśana tells us that, vimarṣa - Śiva reflecting upon himself – is one of the highest goals of existence itself. According to another school of thought, nature nudged evolution to a point where a
				species would emerge capable of reflecting upon itself and the mysteries of the cosmos, life and existence.
			</p>
			<p class="card-text">We are born <em class="anv-orange">anveshi</em> — seekers by nature.</p>
			{#if !showText}
				<button class="blank anv-readmore" on:click={toggleText}>
					<span>Read more</span>
					<span class="anv-readmore-arrow">→</span>
				</button>
			{/if}
			{#if showText}
				<div class="box column rgap16 xleft">
					<div class="grid two tightrows">
						<div class="box textbox">
							<p class="card-text">A favorite theme of literature is wanderlust—fernweh—the innate urge to go out and discover the world. This desire for discovery is fundamental to human nature: to seek the new, to unravel the hidden, to find joy in the very act of anveṣaṇa. Human history is shaped by such courageous journeys—taken by individuals and communities—that have transformed the course of civilizations.</p>
							<p class="card-text">This urge is biological; most species possess the instinct to chart new waters and explore unknown territories. Yet, there is a deeper, inner dimension to this impulse. In discovering the world, we also seek to discover the self. In our pursuit of the new, we yearn for the eternal. In our search for change, we long for what is unchanging. In essence, every outer journey becomes an inner anvekṣaṇa.</p>
						</div>
						<div class="box textbox">
							<p class="card-text">In Bhāratavarṣa and the Hindu dhārmic tradition, these two seemingly opposing impulses are beautifully harmonized through the tradition of yātrā to sacred kṣetrās—a journey where both the inner and outer quests are fulfilled in ways that are joyful, meaningful, and spiritually elevating.</p>
							<p class="card-text">Anveṣī seeks to contemporize the ancient Indian tradition of yātrā by taking modern seekers to sacred kṣetrās of India - places that are largely unexplored by most of us, yet are rich in architectural, sculptural, and cultural splendor. These are not just historical sites, but living systems that have sustained vibrant cultural traditions for thousands of years.</p>
						</div>
					</div>
				</div>
					<button class="blank anv-readmore anv-readless" on:click={toggleText}>
						<span>Collapse</span>
						<span class="anv-readmore-arrow">↑</span>
					</button>
			{/if}
		</div>
	</div>

	<!-- ── CURRENT CHAPTERS ──────────────────────────────── -->
	{#if currproj && currproj.length > 0}
		<div class="box std padded bordertop" id="current-chapters">
			<Title text="current chapters"/>
			<div class="standard-grid grid two">
				{#each currproj as item, i}
					<a class="box blank hover-card anveshi number{i}" href="/anveshi{item.link}">
						<div class="anv-current-image">
							<img src={item.image} alt="{item.chapter} Chapter" />
							{#if item.regopen}
								<span class="anv-open-badge tt-u">Open Now</span>
							{/if}
						</div>
						<div class="anv-current-body">
							<span class="anv-accent-line"></span>
							<h3 class="item-title source-serif">{item.chapter} Chapter</h3>
							<p class="anv-chapter-desc">{item.desc}</p>
							<span class="course-link anveshi-o">View Chapter →</span>
							<p class="tag-pill anveshi tt-u" style="width: max-content">{item.fromto}</p>
						</div>
					</a>
				{/each}
			</div>
		</div>
	{/if}

	<!-- ── FUTURE CHAPTERS ───────────────────────────────── -->
	<div class="box std padded bordertop" id="future-chapters">
		<Title text="future chapters"/>
		<div class="row cgap8 rgap8 wrap">
			<button class="anv-region-btn" class:active={isRegion[7]} on:click={() => toggleRegion(7)}>All</button>
			<button
				class="anv-region-btn"
				class:active={isRegion[0]}
				on:click={() => {
					toggleRegion(0);
					setRegion('northern india');
				}}>North</button>
			<button
				class="anv-region-btn"
				class:active={isRegion[1]}
				on:click={() => {
					toggleRegion(1);
					setRegion('eastern india');
				}}>East</button>
			<button
				class="anv-region-btn"
				class:active={isRegion[2]}
				on:click={() => {
					toggleRegion(2);
					setRegion('western india');
				}}>West</button>
			<button
				class="anv-region-btn"
				class:active={isRegion[3]}
				on:click={() => {
					toggleRegion(3);
					setRegion('southern india');
				}}>South</button>
			<button
				class="anv-region-btn"
				class:active={isRegion[4]}
				on:click={() => {
					toggleRegion(4);
					setRegion('central india');
				}}>Centre</button>
			<button
				class="anv-region-btn"
				class:active={isRegion[5]}
				on:click={() => {
					toggleRegion(5);
					setRegion('himalayas');
				}}>Himalayas</button>
			<button
				class="anv-region-btn"
				class:active={isRegion[6]}
				on:click={() => {
					toggleRegion(6);
					setRegion('international');
				}}>International</button>
		</div>
		{#if futureproj && futureproj.length > 0 && isRegion[7]}
			<div class="standard-grid grid stay2 four" use:autoAnimate>
				{#each futureproj as item, i}
					<div class="box labelbox number{i}">
						<img class="anv-future-image" src={item.gallery} alt={item.chapter} />
						<div class="anv-future-body">
							<h3 class="anv-future-title">{item.chapter}</h3>
							<p class="anv-future-desc">{item.shortdesc}</p>
							{#if item.region}<span class="anv-region-tag tt-u">{item.region}</span>{/if}
						</div>
					</div>
				{/each}
			</div>
		{:else if !isRegion[7] && regionAnveshi && regionAnveshi.length > 0}
			<div class="standard-grid grid stay2 four" use:autoAnimate>
				{#each regionAnveshi as item, i}
					<div class="box labelbox number{i}">
						<img class="anv-future-image" src={item.gallery} alt={item.chapter} />
						<div class="anv-future-body">
							<h3 class="anv-future-title">{item.chapter}</h3>
							<p class="anv-future-desc">{item.shortdesc}</p>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>

	<!-- ── PAST CHAPTERS ─────────────────────────────────── -->
	{#if pastproj && pastproj.length > 0}
		<div class="anv-section" id="past-chapters">
			<div class="row mcol xbetween-mleft mleft ycenter rgap8">
				<Title text="past chapters"/>
				<p class="eyebrow">Cohort photos from previous journeys</p>
			</div>
			<div class="standard-grid grid four stay2">
				{#each pastproj as item, i}
					<div class="box labelbox number{i} past-grid-items">
						<div class="anv-past-image-wrap">
							<img class="anv-past-image" src={item.gallery} alt={item.chapter} />
						</div>
						<p class="grey small-text">{item.chapter}</p>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<!-- ── FAQS ──────────────────────────────────────────── -->
	<div class="box std padded bordertop" id="faqs">
		<FAQ />
	</div>
</Container>

<style lang="sass">

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

// ── SECTION WRAPPER ───────────────────────────────────────

.anv-section
	display: flex
	flex-direction: column
	gap: var(--gap-std)
	padding: var(--pad-std) 0
	border-top: 1px solid rgba(0,0,0,0.06)
	&:first-child
		border-top: none

// ── INTRO ─────────────────────────────────────────────────

.anv-intro-section
	border-top: none

.anv-intro-panel
	background: #FFFFFF
	border: 1px solid rgba(0,0,0,0.07)
	border-radius: 14px
	padding: 2.5rem
	box-shadow: 0 2px 8px rgba(0,0,0,0.03), 0 8px 24px rgba(0,0,0,0.04)
	@media screen and (max-width: 1024px)
		padding: 1.5rem

.anv-intro-text
	display: flex
	flex-direction: column
	gap: 1rem
	max-width: 72ch

.anv-accent-line
	display: block
	width: 32px
	height: 2px
	background: var(--anveshi-color)
	border-radius: 1px
	margin-bottom: 0.25rem

.anv-orange
	color: var(--anveshi-color)
	font-style: italic

.anv-intro-body
	font-size: clamp(1rem, 1.8vw, 1.15rem)
	line-height: 1.75
	color: var(--text-main)
	margin: 0

.anv-intro-pull
	font-size: clamp(1.1rem, 2vw, 1.3rem)
	line-height: 1.5
	color: var(--text-main)
	margin: 0

.anv-readmore
	display: inline-flex
	align-items: center
	gap: 6px
	font-size: 0.85rem
	font-weight: 600
	color: var(--anveshi-color)
	transition: gap 0.15s ease
	&:hover
		gap: 10px

.anv-readmore-arrow
	font-size: 1rem
	line-height: 1

.anv-expanded-grid
	display: flex
	flex-direction: column
	gap: 1rem

.anv-expanded-text
	font-size: 0.92rem
	line-height: 1.75
	color: var(--text-sub)
	margin: 0

.anv-readless
	margin-top: 0.25rem

// ── CURRENT CHAPTERS ──────────────────────────────────────

.anv-current-grid
	display: grid
	gap: var(--gap-std)
	@media screen and (min-width: 1025px)
		grid-template-columns: repeat(2, 1fr)
	@media screen and (max-width: 1024px)
		grid-template-columns: 1fr

.anv-current-card
	background: #FFFFFF
	overflow: hidden
	box-shadow: 0 2px 8px rgba(0,0,0,0.03), 0 8px 24px rgba(0,0,0,0.04)
	transition: box-shadow 0.18s ease, transform 0.18s ease
	&:hover
		box-shadow: 0 4px 16px rgba(0,0,0,0.06), 0 16px 40px rgba(0,0,0,0.07)
		transform: translateY(-2px)

.anv-current-image
	position: relative
	overflow: hidden
	height: 260px
	@media screen and (max-width: 1024px)
		height: 200px
	img
		width: 100%
		height: 100%
		object-fit: cover
		transition: transform 0.4s ease
	&:hover img
		transform: scale(1.03)

.anv-open-badge
	position: absolute
	top: 12px
	left: 12px
	background: var(--anveshi-color)
	color: #FFFFFF
	font-size: 9px
	font-weight: 700
	letter-spacing: 0.1em
	padding: 4px 10px
	border-radius: 4px

.anv-current-body
	display: flex
	flex-direction: column
	gap: 0.6rem
	padding: 1.5rem
	flex: 1

.anv-chapter-kicker
	font-size: 9px
	font-weight: 700
	letter-spacing: 0.12em
	color: var(--text-ghost)

.anv-chapter-title
	font-size: clamp(1.2rem, 2vw, 1.5rem)
	font-weight: 400
	line-height: 1.25
	color: var(--text-main)
	margin: 0

.anv-chapter-desc
	font-size: 0.88rem
	line-height: 1.65
	color: var(--text-sub)
	margin: 0
	flex: 1

.anv-date-pill
	display: inline-block
	align-self: flex-start
	font-size: 9px
	font-weight: 700
	letter-spacing: 0.1em
	color: var(--text-ghost)
	background: rgba(0,0,0,0.04)
	border: 1px solid rgba(0,0,0,0.06)
	border-radius: 4px
	padding: 4px 10px
	margin-top: 0.25rem

// ── FUTURE CHAPTERS ───────────────────────────────────────

.anv-region-nav
	display: flex
	flex-wrap: wrap
	gap: 6px

.anv-region-btn
	font-size: 10px
	font-weight: 700
	letter-spacing: 0.08em
	text-transform: uppercase
	color: var(--text-sub)
	background: transparent
	border: 1px solid rgba(0,0,0,0.1)
	border-radius: 6px
	padding: 6px 14px
	cursor: pointer
	transition: all 0.15s ease
	&:hover
		border-color: var(--anveshi-color)
		color: var(--anveshi-color)
	&.active
		background: var(--anveshi-color)
		border-color: var(--anveshi-color)
		color: #FFFFFF

.anv-future-grid
	display: grid
	gap: var(--gap-std)
	@media screen and (min-width: 1025px)
		grid-template-columns: repeat(4, 1fr)
	@media screen and (min-width: 768px) and (max-width: 1024px)
		grid-template-columns: repeat(2, 1fr)
	@media screen and (max-width: 767px)
		grid-template-columns: repeat(2, 1fr)

.anv-future-card
	display: flex
	flex-direction: column
	background: #F5F4F2
	border: 1px solid rgba(0,0,0,0.06)
	border-radius: 10px
	overflow: hidden

.anv-future-image
	width: 100%
	height: 130px
	object-fit: cover

.anv-future-body
	display: flex
	flex-direction: column
	gap: 0.4rem
	padding: 0.9rem

.anv-future-title
	font-size: 0.88rem
	font-weight: 600
	color: var(--text-main)
	margin: 0
	line-height: 1.3

.anv-future-desc
	font-size: 0.78rem
	line-height: 1.55
	color: var(--text-sub)
	margin: 0

.anv-region-tag
	font-size: 8px
	font-weight: 700
	letter-spacing: 0.1em
	color: var(--anveshi-color)
	margin-top: 0.25rem

// ── PAST CHAPTERS ─────────────────────────────────────────

.anv-past-grid
	display: grid
	gap: var(--gap-std)
	@media screen and (min-width: 1025px)
		grid-template-columns: repeat(4, 1fr)
	@media screen and (min-width: 768px) and (max-width: 1024px)
		grid-template-columns: repeat(3, 1fr)
	@media screen and (max-width: 767px)
		grid-template-columns: repeat(2, 1fr)

.anv-past-card
	display: flex
	flex-direction: column
	gap: 0.6rem

.anv-past-image-wrap
	overflow: hidden
	aspect-ratio: 4 / 3

.anv-past-image
	width: 100%
	height: 100%
	object-fit: cover
	transition: transform 0.3s ease
	&:hover
		transform: scale(1.04)

.anv-past-title
	font-size: 0.82rem
	font-weight: 600
	color: var(--text-sub)
	margin: 0
	text-align: center

.past-grid-items
	padding-bottom: 0.5rem
	p
		padding-left: 0.5rem

</style>
