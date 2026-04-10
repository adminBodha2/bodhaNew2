<script lang="ts">

  import { onMount } from 'svelte'
	import Container from '$lib/comps/container.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Parallax from '$lib/comps/parallaxhalf.svelte';
  import Title from '$lib/comps/page-title.svelte'
	import { metaTitle, metaDescription, metaUrl, metaImage } from '$lib/utils/metastores';
  import { kannurTemples } from '$lib/utils/supabaseClient'

  let temps:any

  $metaTitle = 'Bodha Anveshi - Kannur'
  $metaDescription = 'Details on the Kannur chapter of Bodha Anveshi culture travels program.'
  $metaUrl = 'https://www.bodharesearch.in/anveshi/kannur'
  $metaImage = 'https://sddlbohniijgegvypkfk.supabase.co/storage/v1/object/public/bodhasite/anveshi/kannur/kannurhero.webp'

  onMount(() => {
    (async() => {
      temps = await kannurTemples();
    })();
  })

</script>

<Head title={$metaTitle} metaDescription={$metaDescription} metaUrl={$metaUrl} metaImage={$metaImage}></Head>

<Container>
<div class="box100 column rgap32 top-pad">
	<div class="column">
		<div class="row ycenter xbetween borderbot pbot16">
      <div class="row ycenter cgap8">
        <small class="blue"><a class="blank" href="/anveshi">ANVESHI</a></small>
        <small class="lgrey">></small>
        <small class="lgrey">KANNUR CHAPTER</small>
      </div>
		</div>
		<Parallax imageLink="https://sddlbohniijgegvypkfk.supabase.co/storage/v1/object/public/bodhasite/anveshi/kannur/kannurhero.webp"/>
	</div>
  <div class="grid two stacked-2">
    <div class="column rgap16">
      <h6 class="thin">
        In the northern corner of Kerala, hidden in a sea of Muslim majority neighborhoods, is the district of Kannur, an ancient Hindu town with a cluster of Hindu temples that are a continuing, centuries old tradition, even now.
      </h6>
      <h6 class="thin">
        The Kannur cluster of Hindu temples is as diverse as it gets, with temples dedicated to Shiva, Vishnu, Shakti, Ganpati, Murugan and many other deities, covering a diverse range of sects. In architecture, while some display the typical Kerala style architecture, others rival the great temples built on the other side of the Western ghats. Contrary to what the leftists would have us believe, Kerala has always been foremost in worshiping Shri Rama. Temples dedicated to Shri Rama and other characters of Ramayana are as alive today as they were in ancient times.
      </h6>
    </div>
    <div class="column rgap16">
      <h6 class="thin">
        Along with carrying the Vedic, Sanatana core, these temples in Kerala incorporate many local deities, traditions, and rituals; and many of these temples with their festivals and seasonal rhythms reflect that. Kerala is a kshetra that is blessed with rains, and Kerala temple architecture is not complete without huge and beautiful water tanks that are attached to the temples, some of them being world famous for their pristine and uplifting atmosphere.
      </h6>
      <h6 class="thin pbot8">
        Many of these temples conduct festivals which incorporate many art forms including Theyyam, Bharatanatyam and Chendam. <b>In this Kerala Kannur chapter of Bodha Anveshi we will expose you to all of this and a lot more. Join us for an uplifting adventure through one of the lesser known but pristine Hindu temple clusters of Kerala.</b>
      </h6>
    </div>
  </div>
</div>
<div class="box50 column rgap32 bordertop ptop32 pbot32">
  <h3 class="blue">Itinerary</h3>
  <div class="grid two stacked-2">
    <div class="column rgap16">
      <h6>Day 1 - 25 Feb</h6>
      <p class="tight grey">Arrive in Kannur and stay the night in Kannur.</p>
    </div>
    <div class="column rgap16">
      <h6>Day 2 - 26 Feb</h6>
      <p class="tight grey">
        Cherukunnu - Sree Annapoorneswary Temple<br>
        Madayi Kavu - Sree Thiruvarkkaattu Kaavu Bhagavati Temple<br>
        Vadukunda - Shiva Temple<br>
        Cheruthazham - Hanumanambalam Sree Raghava Puram Temple<br>
        Payyanur - Sree Subrahmanya Swami Temple 
      </p>
    </div>
    <div class="column rgap16">
      <h6>Day 3 - 27 Feb</h6>
      <p class="tight grey">
        Kanhirangad - Sree Vaidyanatha Temple<br>
        Taliparamba - Sree Rajarajeswara Temple (Ladies entry only after 7.30 PM)<br> 
        Trichambaram - Sree Krishna Temple<br>
        Parassinikadavu - Sree Muthappan (Harihara) Temple
      </p>
    </div>
    <div class="column rgap16">
      <h6>Day 4 - 28 Feb</h6>
      <p class="tight grey">
        Akkare Kottiyoor - Maha Shiva Temple<br>
        Ikkare Kottiyoor - Sree Mahadeva Temple<br>
        Kottiyoor Sree - Maha Ganapathi Temple<br>
        Muzhakkunnu - Sree Mridanga Saileswari Temple<br>
        Thodikkalam - Shiva Temple
      </p>
    </div>
    <div class="column rgap16">
      <h6>Day 5 - 01 Mar</h6>
      <p class="tight grey">
        Thiruvangad - Sree Rama Swami Temple<br>
        Thrikkaikunnu - Mahadeva Temple<br>
        Peralassery - Sree Subramanya Temple<br>
        Trip ends after lunch
      </p>
    </div>
  </div>
</div>
<div class="box100 column rgap32 bordertop ptop32 pbot32">
  <h3 class="blue">Temples</h3>
  {#if temps && temps.length > 0}
    <div class="grid two stacked-2">
      {#each temps as item}
        <div class="column rgap16">
          <img class="temple" src={item.image} alt={item.temple}/>
          <p class="big bold">{item.temple}</p>
          <p class="grey tight">{item.description}</p>
        </div>
      {/each}
    </div>
  {/if}
</div>
</Container>

<style lang='sass'>

img.temple
  object-fit: contain
  width: 100%

</style>