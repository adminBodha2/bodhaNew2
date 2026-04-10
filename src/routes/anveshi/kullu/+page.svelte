<script lang="ts">

  import { onMount, tick } from 'svelte'
	import Container from '$lib/comps/container.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Parallax from '$lib/comps/parallaxhalf.svelte';
  import FAQ from '$lib/comps/anveshifaqs.svelte'
  import Title from '$lib/comps/pageheader.svelte'
	import { metaTitle, metaDescription, metaUrl, metaImage } from '$lib/utils/metastores';
  import { kulluTemples } from '$lib/utils/supabaseClient'
  import useEmblaCarousel from 'embla-carousel-svelte'
  import type { EmblaCarouselType } from 'embla-carousel'

  let temps:any
  let emblaApi: EmblaCarouselType | undefined
  let options = { loop: true }
  let plugins: never[] = []
  let ready = false
  let selectedIndex = 0
  let slideCount = 0

  $metaTitle = 'Bodha Anveshi - Kullu'
  $metaDescription = 'Details on the Kullu chapter of Bodha Anveshi culture travels program.'
  $metaUrl = 'https://www.bodharesearch.in/anveshi/kullu'
  $metaImage = 'https://sddlbohniijgegvypkfk.supabase.co/storage/v1/object/public/bodhasite/anveshi/kullu/12.webp'

  function onInit(event: CustomEvent<EmblaCarouselType>) {
    emblaApi = event.detail
    slideCount = emblaApi.scrollSnapList().length
    selectedIndex = emblaApi.selectedScrollSnap()
    emblaApi.on('select', () => {
      selectedIndex = emblaApi!.selectedScrollSnap()
    })
  }

  onMount(() => {
    (async () => {
      temps = await kulluTemples();
      await tick();
      ready = true
    })();
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') emblaApi?.scrollPrev()
      if (e.key === 'ArrowRight') emblaApi?.scrollNext()
    }

    document.addEventListener('keydown', handleKeydown)

    return () => {
      document.removeEventListener('keydown', handleKeydown)
    }
  })

</script>

<Head title={$metaTitle} metaDescription={$metaDescription} metaUrl={$metaUrl} metaImage={$metaImage}></Head>

<Container>
	<div class="column top-pad rgap32 pbot32">
		<div class="row ycenter xbetween borderbot pbot16">
      <div class="row ycenter cgap8">
        <small class="blue"><a class="blank" href="/anveshi">ANVESHI</a></small>
        <small class="lgrey">></small>
        <small class="lgrey">KULLU CHAPTER</small>
      </div>
		</div>
		<Parallax imageLink="https://sddlbohniijgegvypkfk.supabase.co/storage/v1/object/public/bodhasite/anveshi/kullu/12.webp"/>
	</div>
  <div class="grid two right cgap32 rgap24 pbot64">
    <h4>Come explore the sacred kshetras of the <span class="blue">Kullu valley in Himachal Pradesh</span>. Come to experience the divine here, and the festivals organized to celebrate that divine. Come to Bodha Anveshi - Kullu Chapter to experience Himachal in a way you have never before.</h4>
    <div class="column rgap8 ycenter borderbot bordertop ptop16 pbot16">
      <h6>18 - 23 April 2026 | ₹45,999</h6>
      <div class="row cgap8 ycenter">
        <a class="button-main" href="https://docs.google.com/forms/d/e/1FAIpQLSdGOxxUH32klulnlGriEQUI6uK2tiJLFmH98K04tAbaAU4sUw/viewform" target="_blank" rel="noreferrer">REGISTER NOW</a>
        <a class="button-main" href="https://drive.google.com/file/d/1BH2N3UKiWYuZCcyUXlcYoYgIReDJnnxW/view?usp=drive_link" target="_blank" rel="noreferrer">BROCHURE</a>
      </div>
    </div>
  </div>
  <div class="grid two cgap32 rgap16 ptop64 pbot64">
    <div class="column rgap16">
      <h6 class="thin">
        Himachalis claim that their deities “talk to them”. When they say this, it isn’t metaphors or symbols - they mean it, literally. And one needs to visit the kshetras of Himachal to well and truly understand this. Located in quaint little villages in some of the most beautiful mountain valleys with snow-capped peaks and ancient deodar forests as the backdrop, these sacred kshetras have a divine presence which is so palpable it can be felt by almost everyone who visits. From temples dedicated to the classical Hindu pantheon, to ones built to worship Nagas and local deities, those of rarely worshipped deities like Lord Brahma, or ones consecrated to honor kind-hearted asuras - these temples display breathtaking diversity.
      </h6>
    </div>
    <div class="column rgap16">
      <h6 class="thin">
        Another special aspect of Himachal is that it has many sacred kshetras dedicated to some of the greatest rishis of Hindu history, like Rishi Shringa, Manu, Vashishtha etc. The sages are as worshipped here as deities. And one can find even the rarest of rare temples here - a temple dedicated collectively to crores of Hindu deities. Its architecture is as breathtaking and diverse, as are its legends and setting. From classical stone temples to temples built in wooden pent roof style to the pagoda style, and to the temples built in a local and extremely unique kath-kuni style of architecture, Himachal has it all. It is not in a light vein that it is called Devbhoomi, and it quite literally is. 
      </h6>
    </div>
  </div>
<div class="box50 column rgap32 bordertop ptop32 pbot32">
  <h3 class="blue">Itinerary</h3>
  <div class="grid two stacked-2">
    <div class="column rgap16">
      <h6>Day 0 - Arrival in Chandigarh</h6>
      <p class="tight grey">Stay the night in Chandigarh.</p>
    </div>
    <div class="column rgap16">
      <h6>Day 1 - Chandigarh to Jibih</h6>
      <p class="tight grey">
        1. Mansa Devi<br>
        2. Naina Devi<br>
        3. Submerged Temples<br>
      </p>
    </div>
    <div class="column rgap16">
      <h6>Day 2 - Jibih</h6>
      <p class="tight grey">
        1. Shringa Rishi Temple<br>
        2. Chehni Kothi<br>
        3. Shesha Naga Temple<br>
        Experience  Saatha Jachh local festival of Jibih
      </p>
    </div>
    <div class="column rgap16">
      <h6>Day 3 - Jibih to Manali</h6>
      <p class="tight grey">
        1. Baseshwar Mahadeva Temple<br>
        2. Adi Brahma Temple<br>
        3. Gaurishankar Temple<br>
        4. Gayatri Temple<br>
        5. Shri Vashishtha Temple, Shri Rama Temple, Lord Shiva Temple
      </p>
    </div>
    <div class="column rgap16">
      <h6>Day 4 - North - Naggar, Dashal</h6>
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
    <div class="column rgap16">
      <h6>Day 5 - Yatra ends</h6>
      <p class="tight grey">We leave very early in the morning to Chandigarh airport and from there, to our destinations.</p>
    </div>
  </div>
</div>
<div class="column rgap32 ptop32 pbot32">
  <Title text="Temples"/>
  {#if temps && temps.length > 0 && ready}
    <div class="embla column ytop rgap24">
      <div class="embla__viewport column ytop" use:useEmblaCarousel={{ options, plugins }} on:emblaInit={onInit}>
        <div class="embla__container">
          {#each temps as item}
            <div class="embla__slide grid two left cgap24 rgap24" style="align-items: start; align-content: start">
              <div class="image-box">
                <img class="temple" src={item.image} alt={item.temple}/>
              </div>
              <div class="column ytop">
                <h5>{item.temple}</h5>
                <h6 class="thin tight">{item.description}</h6>
              </div>
            </div>
          {/each}
        </div>
      </div>
      <div class="row ycenter cgap8 xbetween mwrap">
        <div class="row ycenter cgap8">
          <button on:click={() => emblaApi?.scrollPrev()} class="embla__prev button-main">PREV</button>
          <button on:click={() => emblaApi?.scrollNext()} class="embla__next button-main">NEXT</button>
        </div>
        <div class="row cgap8 rgap8 ycenter mwrap xcenter">
          {#each Array(slideCount) as _, i}
            <button
              title="nav"
              class="slide-dot"
              class:active={i === selectedIndex}
              on:click={() => emblaApi?.scrollTo(i)}
            >
            </button>
          {/each}
        </div>
      </div>
    </div>
  {/if}
</div>
<FAQ/>
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

.embla__slide
  flex: 0 0 100%
  min-width: 0
  height: auto  // not stretch

.slide-dot
  background: var(--light-ink)
  border: none
  height: 8px
  width: 8px
  padding: 0
  border-radius: 4px
  &.active
    background: var(--blue-dark)

img.temple
  object-fit: cover
  width: 100%
  height: 100%

.image-box
  @media screen and (min-width: 1025px)
    height: 100%
  @media screen and (max-width: 1024px)
    height: 240px
    img
      height: 240px

</style>