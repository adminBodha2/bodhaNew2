<script lang="ts">
	import { onMount } from 'svelte';
	import autoAnimate from '@formkit/auto-animate';
	import { anveshiCurrent, anveshiFuture, selectedAnveshiFuture } from '$lib/utils/supabaseClient';
	import Container from '$lib/comps/container.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Headerpage from '$lib/comps/pageheader.svelte';
	import FAQ from '$lib/comps/anveshifaqs.svelte';
	import Title from '$lib/comps/page-title.svelte'
	import { metaTitle, metaDescription, metaUrl, metaImage } from '$lib/utils/metastores';

	$metaTitle = 'Bodha - Anveshi';
	$metaDescription =
		'Anveshi features guided tours to beautiful and hitherto unexplored temples and kshetras of Bharatavarsha.';
	$metaUrl = 'https://www.bodharesearch.in/anveshi';
	$metaImage = '/images/bodhacover.png';

	let currproj: any;
	let futureproj: any;
	let sY: number;
	let regionAnveshi: any;
	let region: string = 'northern india';

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
		<div class="column inscreen xcenter ycenter">
			<small class="white">BODHA ANVESHI</small>
			<h1 class="ptop8 pbot16 source-serif white tight ta-c">
				We are born <i>anveshi -</i><br />seekers by nature.
			</h1>
			<p class="tight white ta-c pbot16">
				Sacred journeys to unexplored kshetras of India.<br />Where, every outer journey becomes an
				inner journey.
			</p>
			<a class="primary" href="/anveshi/kullu"><span>OPEN NOW - KULLU CHAPTER</span></a>
		</div>
	</div>
</div>
<Container>
	<div class="box-2">
		<div class="grid two stacked">
			<div class="column rgap16">
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
				<h6 class="source-serif">We are born anveṣī - seekers by nature.</h6>
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
	<div class="box-2">
		<Title text="Current Chapters"/>
		{#if currproj && currproj.length > 0}
		<div class="grid two stacked-2">
			{#each currproj as item}
				{#if item.pageactive === true}
					<a class="blank linkbox column rgap16 blogbox2" href="/anveshi{item.link}">
						<div class="image-container radius" style="overflow: hidden">
							<img class="vert" src={item.image} alt={item.chapter} />
						</div>
						{#if item.regopen === true}
							<div class="row ycenter cgap8">
								<div class="label2"><small class="white">OPEN NOW!</small></div>
								<h4 class="tight source-serif">{item.chapter} Chapter</h4>
							</div>
						{:else}
							<h4 class="tight source-serif">{item.chapter} Chapter</h4>
						{/if}
						<div class="column rgap16">
							<h6 class="thin">{item.desc}</h6>
							<div class="row ycenter cgap8 rgap8 mwrap">
								<div class="label"><p class="sm grey">{item.fromto}</p></div>
							</div>
						</div>
					</a>
				{:else}
					<div class="column container-a rgap16 blogbox2">
						<div class="image-container radius" style="overflow: hidden">
							<img class="vert" src={item.image} alt={item.chapter} />
						</div>
						{#if item.regopen === true}
							<div class="row ycenter cgap8">
								<div class="label2"><small class="white">OPEN NOW!</small></div>
								<h4 class="tight source-serif">{item.chapter} Chapter</h4>
							</div>
						{:else}
							<h4 class="tight source-serif">{item.chapter} Chapter</h4>
						{/if}
						<div class="column rgap16">
							<h6 class="thin">{item.desc}</h6>
							<div class="label"><p class="sm grey">{item.fromto}</p></div>
						</div>
					</div>
				{/if}
			{/each}
		</div>
	{/if}
	</div>
	<div class="box-2">
		<Title text="Future Chapters"/>
		<div class="row ycenter cgap8 mwrap rgap8">
			<button
				class="ftnbtn"
				class:active={isRegion[0]}
				on:click={() => {
					toggleRegion(0);
					setRegion('northern india');
				}}>North</button
			>
			<button
				class="ftnbtn"
				class:active={isRegion[1]}
				on:click={() => {
					toggleRegion(1);
					setRegion('eastern india');
				}}>East</button
			>
			<button
				class="ftnbtn"
				class:active={isRegion[2]}
				on:click={() => {
					toggleRegion(2);
					setRegion('western india');
				}}>West</button
			>
			<button
				class="ftnbtn"
				class:active={isRegion[3]}
				on:click={() => {
					toggleRegion(3);
					setRegion('southern india');
				}}>South</button
			>
			<button
				class="ftnbtn"
				class:active={isRegion[4]}
				on:click={() => {
					toggleRegion(4);
					setRegion('central india');
				}}>Center</button
			>
			<button
				class="ftnbtn"
				class:active={isRegion[5]}
				on:click={() => {
					toggleRegion(5);
					setRegion('himalayas');
				}}>Himalayas</button
			>
			<button
				class="ftnbtn"
				class:active={isRegion[6]}
				on:click={() => {
					toggleRegion(6);
					setRegion('international');
				}}>International</button
			>
			<button
				class="ftnbtn"
				class:active={isRegion[7]}
				on:click={() => {
					toggleRegion(7);
				}}>All</button
			>
		</div>
		{#if futureproj && futureproj.length > 0 && isRegion[7]}
		<div class="grid four stacked-2" use:autoAnimate>
			{#each futureproj as item}
				<div class="column rgap16">
					<img class="smallerimage" src={item.gallery} alt={item.chapter} />
					<h6 class="tight source-serif">{item.chapter}</h6>
					<p class="sm grey">{item.shortdesc}</p>
					<small class="blue tt-u">{item.region}</small>
				</div>
			{/each}
		</div>
	{:else if !isRegion[7] && regionAnveshi && regionAnveshi.length > 0}
		<div class="grid four stacked-2" use:autoAnimate>
			{#each regionAnveshi as item}
				<div class="column rgap16">
					<img class="smallerimage" src={item.gallery} alt={item.chapter} />
					<h6 class="tight source-serif">{item.chapter}</h6>
					<p class="sm grey">{item.shortdesc}</p>
				</div>
			{/each}
		</div>
	{/if}
	</div>
	<div class="box-2">
		<FAQ />
	</div>
</Container>

<style lang="sass">

img.smallerimage
  object-fit: cover
  width: 100%
  height: 160px

.screener-wrap
  width: 100%
  overflow: hidden
  @media screen and (min-width: 1025px)
    height: 100vh
  @media screen and (max-width: 1024px)
    height: calc(50vh + 64px)

.screener
  background-image: url('/images/cover-anveshi.webp')
  background-position: center center
  background-size: cover
  width: 100%
  height: 100%
  .inscreen
    width: 100%
    height: 100%
    background: rgba(0,0,0,0.7)

.linkbox
  img
    transition: transform 0.45s ease
  &:hover
    h4
      color: var(--blue-main)
    img
      transform: scale(110%)

img.vert
  object-fit: cover
  object-position: center center
  @media screen and (min-width: 1025px)
    width: 100%
    height: 320px
  @media screen and (max-width: 1024px)
    width: 100%
    height: 240px

</style>
