<script lang="ts">

  import { onMount, tick } from 'svelte'
  import autoAnimate from '@formkit/auto-animate';
	import Container from '$lib/comps/container.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Parallax from '$lib/comps/parallaxhalf.svelte';
	import Title from '$lib/comps/page-title.svelte'
	import FAQ from '$lib/comps/anveshifaqs.svelte'
	import { metaTitle, metaDescription, metaUrl, metaImage } from '$lib/utils/metastores';
  import { kannurTemples } from '$lib/utils/supabaseClient'

  let temps:any
  let ready = false
  let activeIndex: number | null = null; // null = show all

  function showItem(index: number | null) {
	activeIndex = index;
}

  $metaTitle = 'Bodha Anveshi - Kannur'
  $metaDescription = 'Details on the Kannur chapter of Bodha Anveshi culture travels program.'
  $metaUrl = 'https://www.bodharesearch.in/anveshi/kannur'
  $metaImage = 'https://sddlbohniijgegvypkfk.supabase.co/storage/v1/object/public/bodhasite/anveshi/kannur/kannurhero.webp'

  onMount(() => {
    (async() => {
      temps = await kannurTemples();
	  activeIndex = 0; // ensure first item after data loads
      await tick();
      ready = true
    })();
  })

</script>

<Head title={$metaTitle} metaDescription={$metaDescription} metaUrl={$metaUrl} metaImage={$metaImage}></Head>

<Parallax imageLink="https://sddlbohniijgegvypkfk.supabase.co/storage/v1/object/public/bodhasite/anveshi/kannur/kannurhero.webp" />
<Container narrow={true}>
	<div class="box-1" id="first">
		<div class="grid two stacked">
			<div class="column rgap8">
				<h6 class="source-serif thin">In the northern corner of Kerala, hidden in a sea of Muslim majority neighborhoods, is the district of Kannur, an ancient Hindu town with a cluster of Hindu temples that are a continuing, centuries old tradition, even now.</h6>
				<h6 class="source-serif thin">The Kannur cluster of Hindu temples is as diverse as it gets, with temples dedicated to Shiva, Vishnu, Shakti, Ganpati, Murugan and many other deities, covering a diverse range of sects. In architecture, while some display the typical Kerala style architecture, others rival the great temples built on the other side of the Western ghats. Contrary to what the leftists would have us believe, Kerala has always been foremost in worshiping Shri Rama. Temples dedicated to Shri Rama and other characters of Ramayana are as alive today as they were in ancient times.</h6>
			</div>
			<div class="column rgap16">
				<h6 class="source-serif thin">Along with carrying the Vedic, Sanatana core, these temples in Kerala incorporate many local deities, traditions, and rituals; and many of these temples with their festivals and seasonal rhythms reflect that. Kerala is a kshetra that is blessed with rains, and Kerala temple architecture is not complete without huge and beautiful water tanks that are attached to the temples, some of them being world famous for their pristine and uplifting atmosphere. Many of these temples conduct festivals which incorporate many art forms including Theyyam, Bharatanatyam and Chendam. </h6>
				<h6 class="source-serif"><span class="anveshi-o">In this Kerala Kannur chapter of Bodha Anveshi we will expose you to all of this and a lot more.</span> Join us for an uplifting adventure through one of the lesser known but pristine Hindu temple clusters of Kerala.</h6>
			</div>
		</div>
	</div>
	<div class="box-1 itinbox">
		<Title anveshi={true} text="Itinerary"/>
		<div class="grid three stacked-2">
			<div class="column rgap8">
				<img src="/images/anveshi/day-1.png" alt="day 1"/>
				<p class="big bold ptop8 anveshi-o">Day 1 - 25 Feb</p>
				<p class="tight">Arrive in Kannur and stay the night in Kannur.</p>
			  </div>
			  <div class="column rgap8">
				<img src="/images/anveshi/day-2.png" alt="day 2"/>
				<p class="big bold ptop8 anveshi-o">Day 2 - 26 Feb</p>
				<p class="tight">
				  Cherukunnu - Sree Annapoorneswary Temple<br>
				  Madayi Kavu - Sree Thiruvarkkaattu Kaavu Bhagavati Temple<br>
				  Vadukunda - Shiva Temple<br>
				  Cheruthazham - Hanumanambalam Sree Raghava Puram Temple<br>
				  Payyanur - Sree Subrahmanya Swami Temple 
				</p>
			  </div>
			  <div class="column rgap8">
				<img src="/images/anveshi/day-3.png" alt="day 3"/>
				<p class="big bold ptop8 anveshi-o">Day 3 - 27 Feb</p>
				<p class="tight">
				  Kanhirangad - Sree Vaidyanatha Temple<br>
				  Taliparamba - Sree Rajarajeswara Temple (Ladies entry only after 7.30 PM)<br> 
				  Trichambaram - Sree Krishna Temple<br>
				  Parassinikadavu - Sree Muthappan (Harihara) Temple
				</p>
			  </div>
			  <div class="column rgap8">
				<img src="/images/anveshi/day-4.png" alt="day 4"/>
				<p class="big bold ptop8 anveshi-o">Day 4 - 28 Feb</p>
				<p class="tight">
				  Akkare Kottiyoor - Maha Shiva Temple<br>
				  Ikkare Kottiyoor - Sree Mahadeva Temple<br>
				  Kottiyoor Sree - Maha Ganapathi Temple<br>
				  Muzhakkunnu - Sree Mridanga Saileswari Temple<br>
				  Thodikkalam - Shiva Temple
				</p>
			  </div>
			  <div class="column rgap8">
				<img src="/images/anveshi/day-5.png" alt="day 5"/>
				<p class="big bold ptop8 anveshi-o">Day 5 - 01 Mar</p>
				<p class="tight">
				  Thiruvangad - Sree Rama Swami Temple<br>
				  Thrikkaikunnu - Mahadeva Temple<br>
				  Peralassery - Sree Subramanya Temple<br>
				  Trip ends after lunch
				</p>
			  </div>
		</div>
	</div>
	<div class="box-1 temps">
		<Title anveshi={true} text="Temples"/>
		{#if temps && temps.length > 0 && ready}
		<div class="row wrap cgap8 rgap8">
			{#each temps as _, i}
			<button class="ftnbtn anveshi" on:click={() => showItem(i)} class:active={activeIndex === i}>
				{i + 1}
			</button>
		{/each}
		</div>
		<div class="column" use:autoAnimate>
			{#each temps as item, i}
			{#if activeIndex === null || activeIndex === i}
			<div class="grid two stacked left templar" style="align-items: start; align-content: start">
				<div class="image-box">
				  <img class="temple" src={item.image} alt={item.temple}/>
				</div>
				<div class="column ytop texter rgap16">
				  <h4>{item.temple}</h4>
				  <p>{item.description}</p>
				</div>
			  </div>
			{/if}
			{/each}
		</div>
		{/if}
	</div>
	<div class="box-nn">
		<FAQ/>
		<div class="bordertop ptop32"> 
		<a class="primary anveshi" href="/anveshi"><span>ANVESHI HOME</span></a>
		</div>
	</div>
</Container>

<style lang='sass'>

.templar
	border: 1px solid var(--grey-sm)
	overflow: hidden
	@media screen and (min-width: 1025px)
		border-radius: 8px
		.texter
			padding: 2rem 2rem 2rem 0
	@media screen and (max-width: 1024px)
		border-radius: 8px
		img
			border-radius: 8px 8px 0 0 !important
		.texter
			padding: 1rem

.itinbox
	img
		object-fit: contain
		width: 32px

img.temple
	object-fit: cover
	width: 100%
	height: 100%
	border-radius: 8px 0 0 8px
	transition: all 0.2s ease

.image-box
	@media screen and (min-width: 1025px)
		height: 100%
	@media screen and (max-width: 1024px)
		height: 240px
		img
			height: 240px

</style>