<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { browser } from '$app/environment';
	import autoAnimate from '@formkit/auto-animate';
	import Container from '$lib/comps/container.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Parallax from '$lib/comps/parallaxfull.svelte';
	import FAQ from '$lib/comps/anveshifaqs.svelte';
	import Title from '$lib/comps/page-title.svelte';
	import { metaTitle, metaDescription, metaUrl, metaImage } from '$lib/utils/metastores';
	import { badamiTemples } from '$lib/utils/supabaseClient';

	let temps: any;
	let ready = false;
	let selectedDay: boolean[] = Array(5).fill(false);
	selectedDay[0] = true;
	let activeIndex: number | null = null; // null = show all
	activeIndex = 30;

	function toggleDay(index: number) {
		if (selectedDay[index]) return;
		for (let i = 0; i < selectedDay.length; i++) {
			selectedDay[i] = i === index;
		}
	}

	function showItem(index: number | null) {
		activeIndex = index;
	}

function handleItemClick() {
    if (browser) {
      const element = document.getElementById('temple-top');
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start' // Ensures it aligns to the top of the viewport
        });
      }
    }
  }

	$metaTitle = 'Bodha Anveshi - Badami';
	$metaDescription = 'Details on the Badami chapter of Bodha Anveshi culture travels program.';
	$metaUrl = 'https://www.bodharesearch.in/anveshi/badami';
	$metaImage = '/images/anveshi/badamihero.webp';

	onMount(() => {
		(async () => {
			temps = await badamiTemples();
			await tick();
			ready = true;
		})();
	});
</script>

<Head title={$metaTitle} metaDescription={$metaDescription} metaUrl={$metaUrl} metaImage={$metaImage} />

<Parallax isClass="is50" imageLink="/images/anveshi/badamihero.webp" />

<Container narrow={true} scaled={true}>
	<!-- ── HERO ───────────────────────────────────────────── -->
	<div class="box std padded">
		<div class="box column xcenter mleft">
			<div class="box labelbox borderbot pbot32 xcenter ta-c column mleft">
				<p class="eyebrow tt-u"><a class="blank" href="/anveshi">anveshi</a></p>
				<h1 class="page-title source-serif">Badami Chapter</h1>
				<p class="subtitle grey width60">Karnataka is a world on its own. And Badami is a good representative of the rich diversity of its cultural heritage.</p>
			</div>
			<div class="grid two tightrows ptop32">
				<p>
				Badami has everything: from rock-cut temples and caves to sacred lakes and ancient temples; from the very laboratory of Hindu temple architecture <br>- Aihole - to one of the most marvelous gems of Hindu temple architecture <br>- Pattadakalu - which has the most breathtaking variety of temples in evolution on one platform... 
				</p>
				<p>...to temples dedicated to kshetriya gods deep in jungles, Badami has it all. Come to Bodha Anveshi Badami Chapter to experience this all.
				</p>
			</div>
            <div class="column xcenter rgap8 mleft ta-c ptop16">
				<p class="w500 para-text">14 – 18 August 2026 &nbsp;·&nbsp; ₹41,999</p>
				<div class="row xcenter mleft cgap16">
					<a class="primary anveshi" href="https://forms.gle/SuCA3Jc1PuFJthUV7" target="_blank" rel="noreferrer"><span>Register Now</span></a>
				</div>
		</div>
		<div class="ch-itin-panel width80">
			<h2 class="title-small ta-c mleft">Itinerary</h2>
			<div class="row ycenter cgap16 xcenter mleft">
				<button class="ch-day-btn" class:active={selectedDay[0]} on:click={() => toggleDay(0)}>
					<img src="/images/anveshi/day-1.png" alt="day 1" />
					<span>Day 1</span>
				</button>
				<button class="ch-day-btn" class:active={selectedDay[1]} on:click={() => toggleDay(1)}>
					<img src="/images/anveshi/day-2.png" alt="day 2" />
					<span>Day 2</span>
				</button>
				<button class="ch-day-btn" class:active={selectedDay[2]} on:click={() => toggleDay(2)}>
					<img src="/images/anveshi/day-3.png" alt="day 3" />
					<span>Day 3</span>
				</button>
				<button class="ch-day-btn" class:active={selectedDay[3]} on:click={() => toggleDay(3)}>
					<img src="/images/anveshi/day-4.png" alt="day 4" />
					<span>Day 4</span>
				</button>
				<button class="ch-day-btn" class:active={selectedDay[4]} on:click={() => toggleDay(4)}>
					<img src="/images/anveshi/day-5.png" alt="day 5" />
					<span>Day 5</span>
				</button>
			</div>
			<div use:autoAnimate>
				{#if selectedDay[0]}
					<div class="box labelbox day-card xcenter ta-c mleft">
						<p class="eyebrow tt-u bold anveshi-o">Day 0 (14 Aug 2026)</p>
						<p>Arrive at Badami and stay the night.</p>
					</div>
				{:else if selectedDay[1]}
					<div class="box labelbox day-card xcenter ta-c mleft">
						<p class="eyebrow tt-u bold anveshi-o">Day 1 (15 Aug 2026) - Badami</p>
						<p>
Badami Cave Temples<br>
Shri Vishnu Temple<br>
Bhutanatha Group of Temples<br>
Mallikarjuna Group of Temples<br>
Archaeological Museum Badami<br>
Badami Fort<br>
Lower Shivalaya<br>
Upper Shivalaya<br>
Yellama Gudi<br>
Dattatreya Temple
						</p>
					</div>
				{:else if selectedDay[2]}
					<div class="box labelbox day-card xcenter ta-c mleft">
						<p class="eyebrow tt-u bold anveshi-o">Day 2 (16 Aug 2026) - Pattadakallu
</p>
						<p>
Naganatha Temple Complex, Naganatha<br>
Mahakoota Temple Complex<br>
Pattadakallu Temple Complex<br>
- Galganatha Temple<br>
- Kadhasiddheshvara Temple<br>
- Jambulingeshvara Temple<br>
- Sangameshvara Temple<br>
- Kashi Vishvanatha Temple<br>
- Mallikarjuna Temple<br>
- Virupaksha Temple<br>
- Papanatha Temple
						</p>
					</div>
				{:else if selectedDay[3]}
					<div class="box labelbox day-card xcenter ta-c mleft">
						<p class="eyebrow tt-u bold anveshi-o">Day 3 (17 Aug 2026) - Aihole</p>
						<p>
Durga Temple<br>
Suryanarayana Temple<br>
Shiva Temple<br>
Ramalinga Temple Complex<br>
Ravan Phadi<br>
Huchiyappa Matha<br>
Huchiyappa Gudi<br>
Ambigergudi<br>
Jyotirlinga Complex<br>
Mallikarjuna Temple Complex
						</p>
					</div>
				{:else if selectedDay[4]}
					<div class="box labelbox day-card xcenter ta-c mleft">
						<p class="eyebrow tt-u bold anveshi-o">Day 4 (18 Aug 2026)</p>
						<p>
Shri Shakambhari Shakti Peetham, Banashankari<br>
We take our flights and go home.
						</p>
					</div>
				{/if}
			</div>
		</div>
	</div>
	<div class="box std padded bordertop temple-outer" id="temple-top">
		<Title text="temples" isCenter={true} anveshi={true} />
		{#if temps && temps.length > 0 && ready}
			<div class="row wrap cgap8 rgap8 xcenter mleft">
				<button class="anv-region-btn" on:click={() => showItem(30)} class:active={activeIndex === 30}> All </button>
				{#each temps as _, i}
					<button class="anv-region-btn" on:click={() => showItem(i)} class:active={activeIndex === i}>
						{i + 1}
					</button>
				{/each}
			</div>
			{#if activeIndex === 30}
				<div class="grid four stay2 standard-grid">
					{#each temps as item, i}
						<button class="blank temple-button" style="background-image: url({item.image})" on:click={() => {showItem(i); handleItemClick()}}>
							<div class="screen-in column ybottom">
								<p class="white tight small-text w500">{item.temple}</p>
							</div>
						</button>
					{/each}
				</div>
			{:else if activeIndex !== 30 && activeIndex !== null}
				<div class="box" use:autoAnimate>
					{#each temps as item, i}
						{#if i === activeIndex}
							<div class="column midgaps fitted">
								<div class="templebox up">
									<img src={item.image} alt={item.temple} />
								</div>
							</div>
						{/if}
					{/each}
				</div>
			{/if}
		{/if}
	</div>
	<!-- ── FAQS ───────────────────────────────────────────── -->
	<div class="box std padded bordertop">
		<FAQ isCenter={true}/>
		<div class="column xcenter">
			<a class="primary anveshi" href="/anveshi"><span>Anveshi Home</span></a>
		</div>
	</div>
</Container>

<style lang="sass">

.temple-outer
	min-height: 70vh

.temple-button
	background-position: center center
	background-size: cover
	.screen-in
		height: 100%
		width: 100%
		background: rgba(0,0,0,0.6)
		padding: 1rem
		transition: all 0.5s ease
	&:hover
		.screen-in
			opacity: 0
	@media screen and (min-width: 1025px)
		height: 200px
	@media screen and (max-width: 1024px)
		height: 200px

.templebox
	overflow: hidden
	border-radius: 8px
	img
		object-fit: cover
		width: 100%
		height: 100%
		height: 300px
		border-radius: 8px
		@media screen and (min-width: 1025px)
			height: 540px

.anv-region-btn
	font-size: 12px
	font-weight: 600
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

.ch-itin-panel
	background: #F5F4F2
	border-radius: 12px
	padding: 1.5rem
	display: flex
	flex-direction: column
	gap: 1.25rem
	justify-self: center
	align-self: center
	@media screen and (max-width: 1024px)
		padding: 1rem

button.ch-day-btn
	display: flex
	flex-direction: column
	align-items: center
	gap: 8px
	cursor: pointer
	border: none
	padding: 4px
	background: none
	transition: border-color 0.15s ease, background 0.15s ease
	img
		width: 40px
		height: auto
		object-fit: contain
		transition: transform 0.2s ease
	span
		font-size: 8px
		font-weight: 700
		letter-spacing: 0.1em
		text-transform: uppercase
		color: var(--text-ghost)
	&:hover
		border-color: var(--anveshi-color)
	&.active
		border-color: var(--anveshi-color)
		background: rgba(211,99,58,0.07)
		img
			transform: scale(1.15)
		span
			color: var(--anveshi-color)

.day-card
	background: #FFFFFF
	border: 1px solid rgba(0,0,0,0.06)
	border-radius: 8px
	padding: 1.25rem
	@media screen and (min-width: 1025px)
		width: 85%
		justify-self: center

</style>
