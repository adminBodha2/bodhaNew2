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
	import { kulluTemples } from '$lib/utils/supabaseClient';
	import { createTempleNav } from '$lib/utils/templeNav';

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

	const { selectedTemple, toggleTemple, handleTouchStart, handleTouchEnd } = createTempleNav(
		() => temps,
		() => ready
	);

	$metaTitle = 'Bodha Anveshi - Kullu';
	$metaDescription = 'Details on the Kullu chapter of Bodha Anveshi culture travels program.';
	$metaUrl = 'https://www.bodharesearch.in/anveshi/kullu';
	$metaImage = 'https://sddlbohniijgegvypkfk.supabase.co/storage/v1/object/public/bodhasite/anveshi/kullu/12.webp';

	onMount(() => {
		(async () => {
			temps = await kulluTemples();
			await tick();
			ready = true;
		})();
	});
</script>

<Head title={$metaTitle} metaDescription={$metaDescription} metaUrl={$metaUrl} metaImage={$metaImage} />

<Parallax isClass="is50" imageLink="https://sddlbohniijgegvypkfk.supabase.co/storage/v1/object/public/bodhasite/anveshi/kullu/12.webp" />

<Container narrow={true} scaled={true}>
	<!-- ── HERO ───────────────────────────────────────────── -->
	<div class="box std padded">
		<div class="box column xcenter mleft">
			<div class="box labelbox borderbot pbot32 xcenter ta-c column mleft">
				<p class="eyebrow tt-u"><a class="blank" href="/anveshi">anveshi</a></p>
				<h1 class="page-title source-serif">Kullu Chapter</h1>
				<p class="subtitle grey width60">Come explore the sacred kshetras of the <em>Kullu valley in Himachal Pradesh</em>. Come to experience the divine here, and the festivals organized to celebrate that divine. Come to Bodha Anveshi — Kullu Chapter to experience Himachal in a way you have never before.</p>
			</div>
			<div class="grid two tightrows ptop32 pbot32">
				<p>
					Himachalis claim that their deities “talk to them”. When they say this, it isn’t metaphors or symbols - they mean it, literally. And one needs to visit the kshetras of Himachal to well and truly understand this. Located in quaint little villages in some of the most beautiful mountain valleys with snow-capped peaks and ancient deodar forests as the backdrop, these sacred kshetras have a
					divine presence which is so palpable it can be felt by almost everyone who visits. From temples dedicated to the classical Hindu pantheon, to ones built to worship Nagas and local deities, those of rarely worshipped deities like Lord Brahma, or ones consecrated to honor kind-hearted asuras - these temples display breathtaking diversity.
				</p>
				<p>
					Another special aspect of Himachal is that it has many sacred kshetras dedicated to some of the greatest rishis of Hindu history, like Rishi Shringa, Manu, Vashishtha etc. The sages are as worshipped here as deities. And one can find even the rarest of rare temples here - a temple dedicated collectively to crores of Hindu deities. Its architecture is as breathtaking and diverse, as are
					its legends and setting. From classical stone temples to temples built in wooden pent roof style to the pagoda style, and to the temples built in a local and extremely unique kath-kuni style of architecture, Himachal has it all. It is not in a light vein that it is called Devbhoomi, and it quite literally is.
				</p>
			</div>
			<h6 class="source-serif width80 ta-c mleft">
				Come explore the sacred kshetras of the <em>Kullu valley in Himachal Pradesh</em>. Come to experience the divine here, and the festivals organized to celebrate that divine. Come to Bodha Anveshi — Kullu Chapter to experience Himachal in a way you have never before.
			</h6>
			<div class="column xcenter rgap8 mleft ta-c ptop16">
				<p class="w500 para-text">18 – 23 April 2026 &nbsp;·&nbsp; ₹45,999</p>
				<div class="row xcenter mleft cgap16">
					<a class="primary anveshi" href="https://docs.google.com/forms/d/e/1FAIpQLSdGOxxUH32klulnlGriEQUI6uK2tiJLFmH98K04tAbaAU4sUw/viewform" target="_blank" rel="noreferrer"><span>Register Now</span></a>
					<a class="primary anveshi" href="https://drive.google.com/file/d/1BH2N3UKiWYuZCcyUXlcYoYgIReDJnnxW/view?usp=drive_link" target="_blank" rel="noreferrer"><span>Brochure</span></a>
				</div>
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
				<button class="ch-day-btn" class:active={selectedDay[5]} on:click={() => toggleDay(5)}>
					<img src="/images/anveshi/day-6.png" alt="day 6" />
					<span>Day 5</span>
				</button>
			</div>
			<div use:autoAnimate>
				{#if selectedDay[0]}
					<div class="box labelbox day-card xcenter ta-c mleft">
						<p class="eyebrow tt-u bold anveshi-o">Day 0 - Arrival in Chandigarh</p>
						<p>Stay the night in Chandigarh.</p>
					</div>
				{:else if selectedDay[1]}
					<div class="box labelbox day-card xcenter ta-c mleft">
						<p class="eyebrow tt-u bold anveshi-o">Day 1 - Chandigarh to Jibih</p>
						<p>
							1. Mansa Devi<br />
							2. Naina Devi<br />
							3. Submerged Temples
						</p>
					</div>
				{:else if selectedDay[2]}
					<div class="box labelbox day-card xcenter ta-c mleft">
						<p class="eyebrow tt-u bold anveshi-o">Day 2 - Jibih</p>
						<p>
							1. Shringa Rishi Temple<br />
							2. Chehni Kothi<br />
							3. Shesha Naga Temple<br />
							Experience Saatha Jachh local festival of Jibih
						</p>
					</div>
				{:else if selectedDay[3]}
					<div class="box labelbox day-card xcenter ta-c mleft">
						<p class="eyebrow tt-u bold anveshi-o">Day 3 - Jibih to Manali</p>
						<p>
							1. Baseshwar Mahadeva Temple<br />
							2. Adi Brahma Temple<br />
							3. Gaurishankar Temple<br />
							4. Gayatri Temple<br />
							5. Shri Vashishtha Temple, Shri Rama Temple, Lord Shiva Temple
						</p>
					</div>
				{:else if selectedDay[4]}
					<div class="box labelbox day-card xcenter ta-c mleft">
						<p class="eyebrow tt-u bold anveshi-o">Day 4 - North - Naggar, Dashal</p>
						<p>
							1. Hadimba Temple<br />
							2. Jagatipatt Temple<br />
							3. Vishnu Temple<br />
							4. Gauri Shankar Temple<br />
							5. Muralidhar Temple<br />
							6. Tripura Sundari Temple<br />
							7. Mahadeva Temple
						</p>
					</div>
				{:else if selectedDay[5]}
					<div class="box labelbox day-card xcenter ta-c mleft">
						<p class="eyebrow tt-u bold anveshi-o">Day 5 - Yatra Ends</p>
						<p>We leave very early in the morning to Chandigarh airport and from there, to our destinations.</p>
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- ── TEMPLES ────────────────────────────────────────── -->
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
