<script lang="ts">
	import { onMount, tick } from 'svelte';
	import autoAnimate from '@formkit/auto-animate';
	import { anveshiCurrent, anveshiFuture, selectedAnveshiFuture, anveshiPast } from '$lib/utils/supabaseClient';
	import Container from '$lib/comps/container.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Card from '$lib/comps/card-comp.svelte'
	import FAQ from '$lib/comps/anveshifaqs.svelte';
	import Title from '$lib/comps/page-title.svelte'
	import { metaTitle, metaDescription, metaUrl, metaImage } from '$lib/utils/metastores';
	import Anveshilogo from '$lib/assets/anveshilogo.svelte'

	$metaTitle = 'Bodha - Anveshi';
	$metaDescription =
		'Anveshi features guided tours to beautiful and hitherto unexplored temples and kshetras of Bharatavarsha.';
	$metaUrl = 'https://www.bodharesearch.in/anveshi';
	$metaImage = '/images/key-anveshi.webp';

	let currproj: any;
	let futureproj: any;
	let pastproj:any;
	let sY: number;
	let regionAnveshi: any;
	let region: string = 'northern india';
	let goTime:boolean
	$: goTime = sY >= 0;
	let isRegion = Array(8).fill(false);
	isRegion[0] = true;

	function setRegion(newRegion: string) {
		region = newRegion;
		(async () => {
			regionAnveshi = await selectedAnveshiFuture(region);
		})();
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

<Head
	title={$metaTitle}
	metaDescription={$metaDescription}
	metaUrl={$metaUrl}
	metaImage={$metaImage}
></Head>

<div class="column screener-wrap">
	<div class="screener" style="transform: translateY({sY / 2}px)">
		<div class="column rgap24 inscreen xcenter ycenter">
			<small class="white">BODHA ANVESHI</small>
			<Anveshilogo goTime={goTime}/>
			<p class="tight white ta-c pbot16">
				Sacred journeys to unexplored kshetras of India.<br />Where, every outer journey becomes an
				inner journey.
			</p>
			<a class="primary anveshi" href="/anveshi/kullu"><span>OPEN NOW - KULLU CHAPTER</span></a>
		</div>
	</div>
</div>
<Container narrow={true}>
	<div class="box-2">
		<div class="grid two stacked">
			<div class="column rgap16">
				<h4 class="source-serif tight">We are born <span style="color: #D3633A"><i>anveshi</i></span> - seekers by nature.</h4>
				<h6 class="thin source-serif">
					Man is born to search: for truth; for beauty and meaning in life; for Anveṣaṇa. The word
					anveṣaṇa means discovery, and the one who searches is called – anveṣī – the discoverer.
					Kaśmīr Śaiva darśana tells us that, vimarṣa - Śiva reflecting upon himself – is one of the
					highest goals of existence itself. According to another school of thought, nature nudged
					evolution to a point where a species would emerge capable of reflecting upon itself and
					the mysteries of the cosmos, life and existence.
				</h6>
				<h6 class="source-serif">
					This element of discovery has mainly two dimensions – inner and outer. And the two are
					connected.
				</h6>
				<h6 class="thin source-serif">
					A favorite theme of literature is wanderlust—fernweh—the innate urge to go out and
					discover the world. This desire for discovery is fundamental to human nature: to seek the
					new, to unravel the hidden, to find joy in the very act of anveṣaṇa. Human history is
					shaped by such courageous journeys—taken by individuals and communities—that have
					transformed the course of civilizations.
				</h6>
			</div>
			<div class="column rgap16">
				<h6 class="thin source-serif">
					This urge is biological; most species possess the instinct to chart new waters and explore
					unknown territories. Yet, there is a deeper, inner dimension to this impulse. In
					discovering the world, we also seek to discover the self. In our pursuit of the new, we
					yearn for the eternal. In our search for change, we long for what is unchanging. In
					essence, every outer journey becomes an inner anvekṣaṇa.
				</h6>
				<h6 class="thin source-serif">
					In Bhāratavarṣa and the Hindu dhārmic tradition, these two seemingly opposing impulses are
					beautifully harmonized through the tradition of yātrā to sacred kṣetrās—a journey where
					both the inner and outer quests are fulfilled in ways that are joyful, meaningful, and
					spiritually elevating.
				</h6>
				<h6 class="thin source-serif">
					Anveṣī seeks to contemporize the ancient Indian tradition of yātrā by taking modern
					seekers to sacred kṣetrās of India - places that are largely unexplored by most of us, yet
					are rich in architectural, sculptural, and cultural splendor. These are not just
					historical sites, but living systems that have sustained vibrant cultural traditions for
					thousands of years.
				</h6>
				<!--<a class="button-main" href="/anveshi/kullu">OPEN - Kullu Chapter</a>-->
			</div>
		</div>
	</div>
	<div class="box-2" id="current-chapters">
		<Title anveshi={true} text="Current Chapters"/>
		{#if currproj && currproj.length > 0}
		<div class="grid two stacked-2">
			{#each currproj as item}
					<Card link="/anveshi{item.link}" imageLink={item.image}>
						{#if item.regopen === true}
						<div class="row ycenter cgap8">
							<small class="label anveshi white">OPEN NOW!</small>
							<h4 class="tight source-serif">{item.chapter} Chapter</h4>
						</div>
					{:else}
						<h4 class="tight source-serif">{item.chapter} Chapter</h4>
					{/if}
					<div class="column rgap24">
						<p class="big">{item.desc}</p>
						<div class="row ycenter cgap8 rgap8 mwrap">
							<p class="label anveshi white sm">{item.fromto}</p>
						</div>
					</div>
					</Card>
			{/each}
		</div>
	{/if}
	</div>
	<div class="box-2" id="future-chapters">
		<Title anveshi={true} text="Future Chapters"/>
		<div class="row ycenter cgap8 mwrap rgap8">
			<button
				class="ftnbtn anveshi"
				class:active={isRegion[0]}
				on:click={() => {
					toggleRegion(0);
					setRegion('northern india');
				}}>North</button
			>
			<button
				class="ftnbtn anveshi"
				class:active={isRegion[1]}
				on:click={() => {
					toggleRegion(1);
					setRegion('eastern india');
				}}>East</button
			>
			<button
				class="ftnbtn anveshi"
				class:active={isRegion[2]}
				on:click={() => {
					toggleRegion(2);
					setRegion('western india');
				}}>West</button
			>
			<button
				class="ftnbtn anveshi"
				class:active={isRegion[3]}
				on:click={() => {
					toggleRegion(3);
					setRegion('southern india');
				}}>South</button
			>
			<button
				class="ftnbtn anveshi"
				class:active={isRegion[4]}
				on:click={() => {
					toggleRegion(4);
					setRegion('central india');
				}}>Center</button
			>
			<button
				class="ftnbtn anveshi"
				class:active={isRegion[5]}
				on:click={() => {
					toggleRegion(5);
					setRegion('himalayas');
				}}>Himalayas</button
			>
			<button
				class="ftnbtn anveshi"
				class:active={isRegion[6]}
				on:click={() => {
					toggleRegion(6);
					setRegion('international');
				}}>International</button
			>
			<button
				class="ftnbtn anveshi"
				class:active={isRegion[7]}
				on:click={() => {
					toggleRegion(7);
				}}>All</button
			>
		</div>
		{#if futureproj && futureproj.length > 0 && isRegion[7]}
		<div class="grid four stacked-2" use:autoAnimate>
			{#each futureproj as item}
				<div class="column rgap24 futurechapter">
					<img class="smallerimage" src={item.gallery} alt={item.chapter} />
					<div class="inside column rgap16">
						<h6 class="tight">{item.chapter}</h6>
						<p class="sm grey">{item.shortdesc}</p>
						<small class="label anveshi white tt-u">{item.region}</small>
					</div>
				</div>
			{/each}
		</div>
	{:else if !isRegion[7] && regionAnveshi && regionAnveshi.length > 0}
		<div class="grid four stacked-2" use:autoAnimate>
			{#each regionAnveshi as item}
				<div class="column rgap24 futurechapter">
					<img class="smallerimage" src={item.gallery} alt={item.chapter} />
					<div class="inside column rgap16">
						<h6 class="tight">{item.chapter}</h6>
						<p class="sm grey">{item.shortdesc}</p>
					</div>
				</div>
			{/each}
		</div>
	{/if}
	</div>
	<div class="box-2" id="past-chapters">
		<div class="column rgap8">
			<Title anveshi={true} text="Past Chapters"/>
			<p class="gm grey">Cohort photos from the previous chapters of Anveshi.</p>
		</div>
		{#if pastproj && pastproj.length > 0}
			<div class="grid three stacked-2">
				{#each pastproj as item}
					<div class="column rgap8">
						<img class="pastproj" src={item.gallery} alt={item.chapter}/>
						<p class="big bold">{item.chapter}</p>
					</div>
				{/each}
			</div>
		{/if}
	</div>
	<div class="box-2" id="faqs">
		<FAQ />
	</div>
</Container>

<style lang="sass">

img.pastproj
	object-fit: cover
	width: 100%
	height: 240px
	border-radius: 8px
	transform-origin: center center
	transition: all 0.34s ease
	@media screen and (min-width: 1025px)
		&:hover
			transform: scale(1.1) translateY(-8px)

.inside
	padding: 0 1.5rem 1.5rem 1.5rem

img.smallerimage
	object-fit: cover
	width: 100%
	height: 200px

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

.futurechapter
	border: 1px solid var(--grey-sm)
	border-radius: 8px
	overflow: hidden

</style>
