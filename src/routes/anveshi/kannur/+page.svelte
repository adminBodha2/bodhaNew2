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
	import { kannurTemples } from '$lib/utils/supabaseClient';

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

	$metaTitle = 'Bodha Anveshi - Kannur';
	$metaDescription = 'Details on the Kannur chapter of Bodha Anveshi culture travels program.';
	$metaUrl = 'https://www.bodharesearch.in/anveshi/kannur';
	$metaImage = 'https://sddlbohniijgegvypkfk.supabase.co/storage/v1/object/public/bodhasite/anveshi/kannur/kannurhero.webp';

	onMount(() => {
		(async () => {
			temps = await kannurTemples();
			await tick();
			ready = true;
		})();
	});
</script>

<Head title={$metaTitle} metaDescription={$metaDescription} metaUrl={$metaUrl} metaImage={$metaImage} />

<Parallax isClass="is50" imageLink="https://sddlbohniijgegvypkfk.supabase.co/storage/v1/object/public/bodhasite/anveshi/kannur/kannurhero.webp" />

<Container narrow={true} scaled={true}>
	<!-- ── HERO ───────────────────────────────────────────── -->
	<div class="box std padded">
		<div class="box column xcenter mleft">
			<div class="box labelbox borderbot pbot32 xcenter ta-c column mleft">
				<p class="eyebrow tt-u"><a class="blank" href="/anveshi">anveshi</a></p>
				<h1 class="page-title source-serif">Kannur Chapter</h1>
				<p class="subtitle grey width60">In the northern corner of Kerala, hidden in a sea of Muslim majority neighborhoods, is the district of Kannur — an ancient Hindu town with a cluster of Hindu temples that are a continuing, centuries old tradition, even now.</p>
			</div>
			<div class="grid two tightrows ptop32 pbot32">
				<p>
					The Kannur cluster of Hindu temples is as diverse as it gets, with temples dedicated to Shiva, Vishnu, Shakti, Ganpati, Murugan and many other deities, covering a diverse range of sects. In architecture, while some display the typical Kerala style architecture, others rival the great temples built on the other side of the Western ghats. Contrary to what the leftists would have us
					believe, Kerala has always been foremost in worshiping Shri Rama. Temples dedicated to Shri Rama and other characters of Ramayana are as alive today as they were in ancient times.
				</p>
				<p>
					Along with carrying the Vedic, Sanatana core, these temples in Kerala incorporate many local deities, traditions, and rituals; and many of these temples with their festivals and seasonal rhythms reflect that. Kerala is a kshetra that is blessed with rains, and Kerala temple architecture is not complete without huge and beautiful water tanks that are attached to the temples, some of them
					being world famous for their pristine and uplifting atmosphere. Many of these temples conduct festivals which incorporate many art forms including Theyyam, Bharatanatyam and Chendam.
				</p>
			</div>
			<h6 class="source-serif width80 ta-c mleft">
				In this Kerala Kannur chapter of <span class="anveshi-o italic">Bodha Anveshi</span>, we will expose you to all of this and a lot more. Join us for an uplifting adventure through one of the lesser known but pristine Hindu temple clusters of Kerala.
			</h6>
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
						<p class="eyebrow tt-u bold anveshi-o">Day 1 — 25 Feb</p>
						<p>Arrive in Kannur and stay the night in Kannur.</p>
					</div>
				{:else if selectedDay[1]}
					<div class="box labelbox day-card xcenter ta-c mleft">
						<p class="eyebrow tt-u bold anveshi-o">Day 2 — 26 Feb</p>
						<p>
							Cherukunnu — Sree Annapoorneswary Temple<br />
							Madayi Kavu — Sree Thiruvarkkaattu Kaavu Bhagavati Temple<br />
							Vadukunda — Shiva Temple<br />
							Cheruthazham — Hanumanambalam Sree Raghava Puram Temple<br />
							Payyanur — Sree Subrahmanya Swami Temple
						</p>
					</div>
				{:else if selectedDay[2]}
					<div class="box labelbox day-card xcenter ta-c mleft">
						<p class="eyebrow tt-u bold anveshi-o">Day 3 — 27 Feb</p>
						<p>
							Kanhirangad — Sree Vaidyanatha Temple<br />
							Taliparamba — Sree Rajarajeswara Temple<br />
							Trichambaram — Sree Krishna Temple<br />
							Parassinikadavu — Sree Muthappan (Harihara) Temple
						</p>
					</div>
				{:else if selectedDay[3]}
					<div class="box labelbox day-card xcenter ta-c mleft">
						<p class="eyebrow tt-u bold anveshi-o">Day 4 — 28 Feb</p>
						<p>
							Akkare Kottiyoor — Maha Shiva Temple<br />
							Ikkare Kottiyoor — Sree Mahadeva Temple<br />
							Kottiyoor Sree — Maha Ganapathi Temple<br />
							Muzhakkunnu — Sree Mridanga Saileswari Temple<br />
							Thodikkalam — Shiva Temple
						</p>
					</div>
				{:else if selectedDay[4]}
					<div class="box labelbox day-card xcenter ta-c mleft">
						<p class="eyebrow tt-u bold anveshi-o">Day 5 — 01 Mar</p>
						<p>
							Thiruvangad — Sree Rama Swami Temple<br />
							Thrikkaikunnu — Mahadeva Temple<br />
							Peralassery — Sree Subramanya Temple<br />
							Trip ends after lunch.
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
							<div class="grid two midgaps fitted">
								<div class="column box textbox down">
									<p class="small-text anveshi-o">{item.temple}</p>
									<p>{item.description}</p>
								</div>
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

.ch-section
	display: flex
	flex-direction: column
	gap: var(--gap-std)
	&.ch-hero-section
		border-top: none
		padding-top: 0

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

.ch-day-nav
	display: flex
	gap: 8px
	flex-wrap: wrap

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

.ch-day-date
	color: var(--anveshi-color)

.ch-day-text
	font-size: 0.9rem
	line-height: 1.75
	color: var(--text-sub)
	margin: 0

</style>
