<script lang="ts">

  import { onMount, tick } from 'svelte'
  import autoAnimate from '@formkit/auto-animate';
	import Container from '$lib/comps/container.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Parallax from '$lib/comps/parallaxhalf.svelte';
  import FAQ from '$lib/comps/anveshifaqs.svelte'
  import Title from '$lib/comps/page-title.svelte'
	import { metaTitle, metaDescription, metaUrl, metaImage } from '$lib/utils/metastores';
  import { kulluTemples } from '$lib/utils/supabaseClient'

  let temps:any
  let ready = false
  let activeIndex: number | null = null; // null = show all

  function showItem(index: number | null) {
	activeIndex = index;
}

  $metaTitle = 'Bodha Anveshi - Kullu'
  $metaDescription = 'Details on the Kullu chapter of Bodha Anveshi culture travels program.'
  $metaUrl = 'https://www.bodharesearch.in/anveshi/kullu'
  $metaImage = 'https://sddlbohniijgegvypkfk.supabase.co/storage/v1/object/public/bodhasite/anveshi/kullu/12.webp'

  onMount(() => {
    (async () => {
      	temps = await kulluTemples();
		  activeIndex = 0; // ensure first item after data loads
      await tick();
      ready = true
    })();
  })

</script>

<Head title={$metaTitle} metaDescription={$metaDescription} metaUrl={$metaUrl} metaImage={$metaImage}></Head>

<Parallax imageLink="https://sddlbohniijgegvypkfk.supabase.co/storage/v1/object/public/bodhasite/anveshi/kullu/12.webp" />
<Container>
	<div class="box-1" id="first">
		<div class="grid two right stacked">
			<div class="column rgap8">
				<small class="blue"><a class="blank" href="/anveshi">BACK TO ANVESHI</a></small>
				<h4 class="source-serif">Come explore the sacred kshetras of the <span class="blue">Kullu valley in Himachal Pradesh</span>. Come to experience the divine here, and the festivals organized to celebrate that divine. Come to Bodha Anveshi - Kullu Chapter to experience Himachal in a way you have never before.</h4>
			</div>
			<div class="column rgap16">
				<h6>18 - 23 April 2026 | ₹45,999</h6>
				<div class="row cgap8 ycenter">
				  <a class="primary" href="https://docs.google.com/forms/d/e/1FAIpQLSdGOxxUH32klulnlGriEQUI6uK2tiJLFmH98K04tAbaAU4sUw/viewform" target="_blank" rel="noreferrer"><span>REGISTER NOW</span></a>
				  <a class="primary" href="https://drive.google.com/file/d/1BH2N3UKiWYuZCcyUXlcYoYgIReDJnnxW/view?usp=drive_link" target="_blank" rel="noreferrer"><span>BROCHURE</span></a>
				</div>
			</div>
		</div>
	</div>
	<div class="box-1">
		<div class="grid two stacked">
			<h6 class="source-serif thin">Himachalis claim that their deities “talk to them”. When they say this, it isn’t metaphors or symbols - they mean it, literally. And one needs to visit the kshetras of Himachal to well and truly understand this. Located in quaint little villages in some of the most beautiful mountain valleys with snow-capped peaks and ancient deodar forests as the backdrop, these sacred kshetras have a divine presence which is so palpable it can be felt by almost everyone who visits. From temples dedicated to the classical Hindu pantheon, to ones built to worship Nagas and local deities, those of rarely worshipped deities like Lord Brahma, or ones consecrated to honor kind-hearted asuras - these temples display breathtaking diversity.</h6>
			<h6 class="source-serif thin">Another special aspect of Himachal is that it has many sacred kshetras dedicated to some of the greatest rishis of Hindu history, like Rishi Shringa, Manu, Vashishtha etc. The sages are as worshipped here as deities. And one can find even the rarest of rare temples here - a temple dedicated collectively to crores of Hindu deities. Its architecture is as breathtaking and diverse, as are its legends and setting. From classical stone temples to temples built in wooden pent roof style to the pagoda style, and to the temples built in a local and extremely unique kath-kuni style of architecture, Himachal has it all. It is not in a light vein that it is called Devbhoomi, and it quite literally is. </h6>
		</div>
	</div>
	<div class="box-1 itinbox">
		<Title text="Itinerary"/>
		<div class="grid three stacked-2">
			<div class="column rgap8 daybox">
				<img src="/images/anveshi/day-0.png" alt="day 0"/>
			  	<p class="big bold">Day 0 - Arrival in Chandigarh</p>
			  	<p class="tight grey">Stay the night in Chandigarh.</p>
			</div>
			<div class="column rgap8 daybox">
				<img src="/images/anveshi/day-1.png" alt="day 1"/>
			  <p class="big bold">Day 1 - Chandigarh to Jibih</p>
			  <p class="tight grey">
				1. Mansa Devi<br>
				2. Naina Devi<br>
				3. Submerged Temples<br>
			  </p>
			</div>
			<div class="column rgap8 daybox">
				<img src="/images/anveshi/day-2.png" alt="day 2"/>
			  <p class="big bold">Day 2 - Jibih</p>
			  <p class="tight grey">
				1. Shringa Rishi Temple<br>
				2. Chehni Kothi<br>
				3. Shesha Naga Temple<br>
				Experience  Saatha Jachh local festival of Jibih
			  </p>
			</div>
			<div class="column rgap8 daybox">
				<img src="/images/anveshi/day-3.png" alt="day 3"/>
			  <p class="big bold">Day 3 - Jibih to Manali</p>
			  <p class="tight grey">
				1. Baseshwar Mahadeva Temple<br>
				2. Adi Brahma Temple<br>
				3. Gaurishankar Temple<br>
				4. Gayatri Temple<br>
				5. Shri Vashishtha Temple, Shri Rama Temple, Lord Shiva Temple
			  </p>
			</div>
			<div class="column rgap8 daybox">
				<img src="/images/anveshi/day-4.png" alt="day 4"/>
			  <p class="big bold">Day 4 - North - Naggar, Dashal</p>
			  <p class="tight grey">
				1. Hadimba Temple<br>
				2. Jagatipatt Temple<br>
				3. Vishnu Temple<br>
				4. Gauri Shankar Temple<br>
				5. Muralidhar Temple<br>
				6. Tripura Sundari Temple<br>
				7. Mahadeva Temple
			  </p>
			</div>
			<div class="column rgap8 daybox">
				<img src="/images/anveshi/day-5.png" alt="day 5"/>
			  <p class="big bold">Day 5 - Yatra Ends</p>
			  <p class="tight grey">We leave very early in the morning to Chandigarh airport and from there, to our destinations.</p>
			</div>
		  </div>
	</div>
	<div class="box-1 temps">
		<Title text="Temples"/>
		{#if temps && temps.length > 0 && ready}
		<div class="row wrap cgap8 rgap8">
			{#each temps as _, i}
			<button class="ftnbtn" on:click={() => showItem(i)} class:active={activeIndex === i}>
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
			  <div class="column ytop texter">
				<h4 class="source-serif">{item.temple}</h4>
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
	</div>
	<a class="primary" href="/anveshi"><span>ANVESHI HOME</span></a>
</Container>

<!--
    <div class="grid two stacked-2">
      {#each temps as item}
        <div class="column rgap16">
          <img class="temple" src={item.image} alt={item.temple}/>
          <p class="big bold">{item.temple}</p>
          <p class="grey tight">{item.description}</p>
        </div>
      {/each}
    </div>
-->

<style lang='sass'>

.templar
	border: 1px solid var(--grey-sm)
	@media screen and (min-width: 1025px)
		border-radius: 0 8px 8px 0
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

#first
	justify-content: center

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