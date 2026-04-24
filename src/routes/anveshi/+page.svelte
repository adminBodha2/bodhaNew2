<script lang="ts">
	import { onMount, tick } from 'svelte';
	import autoAnimate from '@formkit/auto-animate';
	import { anveshiCurrent, anveshiFuture, selectedAnveshiFuture, anveshiPast } from '$lib/utils/supabaseClient';
	import Container from '$lib/comps/container.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte'
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
			<a class="primary anveshi" href="/anveshi/badami"><span>OPEN NOW - BADAMI CHAPTER</span></a>
		</div>
	</div>
</div>
<Container narrow={true} scaled={true}>
	<!-- ── INTRO ─────────────────────────────────────────── -->
	<div class="stdbox padded">
		<Crumb item1="Bodha" item1Link="/"/>
		<div class="xleft textbox" use:autoAnimate>
			<p class="highlight-text">
				Man is born to search: for truth; for beauty and meaning in life; for Anveṣaṇa.</p>
			<p class="highlight-text width80">
			The word anveṣaṇa means discovery, and the one who searches is called – anveṣī – the discoverer. Kaśmīr Śaiva darśana tells us that, vimarṣa - Śiva reflecting upon himself – is one of the highest goals of existence itself. According to another school of thought, nature nudged evolution to a point where a
				species would emerge capable of reflecting upon itself and the mysteries of the cosmos, life and existence.
			</p>
			<p class="highlight-text bold">We are born <em class="anv-orange">anveshi</em> — seekers by nature.</p>
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
							<p class="highlight-text">A favorite theme of literature is wanderlust—fernweh—the innate urge to go out and discover the world. This desire for discovery is fundamental to human nature: to seek the new, to unravel the hidden, to find joy in the very act of anveṣaṇa. Human history is shaped by such courageous journeys—taken by individuals and communities—that have transformed the course of civilizations.</p>
							<p class="highlight-text">This urge is biological; most species possess the instinct to chart new waters and explore unknown territories. Yet, there is a deeper, inner dimension to this impulse. In discovering the world, we also seek to discover the self. In our pursuit of the new, we yearn for the eternal. In our search for change, we long for what is unchanging. In essence, every outer journey becomes an inner anvekṣaṇa.</p>
						</div>
						<div class="box textbox">
							<p class="highlight-text">In Bhāratavarṣa and the Hindu dhārmic tradition, these two seemingly opposing impulses are beautifully harmonized through the tradition of yātrā to sacred kṣetrās—a journey where both the inner and outer quests are fulfilled in ways that are joyful, meaningful, and spiritually elevating.</p>
							<p class="highlight-text">Anveṣī seeks to contemporize the ancient Indian tradition of yātrā by taking modern seekers to sacred kṣetrās of India - places that are largely unexplored by most of us, yet are rich in architectural, sculptural, and cultural splendor. These are not just historical sites, but living systems that have sustained vibrant cultural traditions for thousands of years.</p>
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
		<div class="stdbox padded bordertop" id="current-chapter">
			<Title text="current chapter"/>
				{#each currproj as item, i}
					<a class="blank grid two anveshi" href="/anveshi{item.link}">
						<div class="anv-current-image">
							<img src={item.image} alt="{item.chapter} Chapter" />
							{#if item.regopen}
								<p class="tag-pill anveshi">OPEN NOW</p>
							{/if}
						</div>
						<div class="anv-current-body">
							<span class="anv-accent-line"></span>
							<p class="card-title">{item.chapter} Chapter</p>
							<div>
							<p class="grey">{item.desc}</p>
							<span class="course-link anveshi-o">View Chapter →</span>
							</div>
							<div class="self-bottom foot row ycenter mwrap cgap8 rgap8">
							<p class="anveshi-o small-text bold">OPEN NOW</p>
							<p class="tag-pill anveshi tt-u" style="width: max-content">{item.fromto}</p>
							</div>
						</div>
					</a>
				{/each}
		</div>
	{/if}

	<!-- ── FUTURE CHAPTERS ───────────────────────────────── -->
	<div class="stdbox padded bordertop" id="future-chapters">
		<Title text="future chapters"/>
		<div class="row cgap8 rgap8 wrap">
			<button class="nav-btn anveshi" class:active={isRegion[7]} on:click={() => toggleRegion(7)}>All</button>
			<button
				class="nav-btn anveshi"
				class:active={isRegion[0]}
				on:click={() => {
					toggleRegion(0);
					setRegion('northern india');
				}}>North</button>
			<button
				class="nav-btn anveshi"
				class:active={isRegion[1]}
				on:click={() => {
					toggleRegion(1);
					setRegion('eastern india');
				}}>East</button>
			<button
				class="nav-btn anveshi"
				class:active={isRegion[2]}
				on:click={() => {
					toggleRegion(2);
					setRegion('western india');
				}}>West</button>
			<button
				class="nav-btn anveshi"
				class:active={isRegion[3]}
				on:click={() => {
					toggleRegion(3);
					setRegion('southern india');
				}}>South</button>
			<button
				class="nav-btn anveshi"
				class:active={isRegion[4]}
				on:click={() => {
					toggleRegion(4);
					setRegion('central india');
				}}>Centre</button>
			<button
				class="nav-btn anveshi"
				class:active={isRegion[5]}
				on:click={() => {
					toggleRegion(5);
					setRegion('himalayas');
				}}>Himalayas</button>
			<button
				class="nav-btn anveshi"
				class:active={isRegion[6]}
				on:click={() => {
					toggleRegion(6);
					setRegion('international');
				}}>International</button>
		</div>
		{#if futureproj && futureproj.length > 0 && isRegion[7]}
			<div class="white-grid grid stay2 four" use:autoAnimate>
				{#each futureproj as item, i}
					<div class="box labelbox all-item">
						<img class="anv-future-image" src={item.gallery} alt={item.chapter} />
						<div class="labelbox card-future">
							<p class="w500">{item.chapter}</p>
							<p class="small-text grey">{item.shortdesc}</p>
							{#if item.region}<p class="citation-big anveshi-o tt-u">{item.region}</p>{/if}
						</div>
					</div>
				{/each}
			</div>
		{:else if !isRegion[7] && regionAnveshi && regionAnveshi.length > 0}
			<div class="white-grid grid stay2 four" use:autoAnimate>
				{#each regionAnveshi as item, i}
					<div class="box labelbox sub-item">
						<img class="anv-future-image" src={item.gallery} alt={item.chapter} />
						<div class="labelbox card-future">
							<p class="w500">{item.chapter}</p>
							<p class="small-text grey">{item.shortdesc}</p>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>

	<!-- ── PAST CHAPTERS ─────────────────────────────────── -->
	{#if pastproj && pastproj.length > 0}
		<div class="stdbox padded bordertop" id="past-chapters">
			<Title text="past chapters"/>
			<div class="white-grid grid four stay2">
				{#each pastproj as item, i}
					<div class="box labelbox past-grid-items">
						<div class="anv-past-image-wrap">
							<img class="anv-past-image" src={item.gallery} alt={item.chapter} />
						</div>
						<p class="rem1 w500">{item.chapter}</p>
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

.all-item, .sub-item
	background: var(--color-white)

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

.anv-readless
	margin-top: 0.25rem

// ── CURRENT CHAPTERS ──────────────────────────────────────

.grid.anveshi
	border: var(--border-dark)
	border-radius: 4px

.anv-current-image
	position: relative
	overflow: hidden
	height: 320px
	@media screen and (max-width: 1024px)
		height: 200px
	img
		width: 100%
		height: 100%
		object-fit: cover
		transition: transform 0.4s ease
	&:hover img
		transform: scale(1.03)
	.tag-pill.anveshi
		position: absolute
		top: 12px
		left: 12px

.anv-current-body
	display: flex
	flex-direction: column
	gap: 0.6rem
	padding: 1.5rem
	flex: 1


// ── FUTURE CHAPTERS ───────────────────────────────────────

.anv-future-image
	width: 100%
	height: 160px
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
	padding-bottom: 0.5rem
	background: var(--color-white)
	p
		padding-left: 0.5rem

</style>
