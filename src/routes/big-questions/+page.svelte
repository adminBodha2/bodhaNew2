<script lang="ts">

  import { onMount, tick } from 'svelte'
  import { bigQuestions } from '$lib/utils/supabaseClient'
  import Container from '$lib/comps/container.svelte'
  import Head from '$lib/comps/headcomponent.svelte'
  import Parallax from '$lib/comps/parallaxhalf.svelte'
  import { metaTitle, metaDescription, metaUrl, metaImage } from '$lib/utils/metastores'
  import useEmblaCarousel from 'embla-carousel-svelte'
  import type { EmblaCarouselType } from 'embla-carousel'

  $metaTitle = 'Bodha - Big Questions'
  $metaDescription = 'Big questions that capture core concerns in the contemporary journey of Hindu society.'
  $metaUrl = 'https://www.bodharesearch.in/big-questions'
  $metaImage = '/images/bodhacover.png'

  let projects:any
  let emblaApi: EmblaCarouselType | undefined
  let options = { loop: true }
  let plugins: never[] = []
  let ready = false

  function onInit(event: CustomEvent<EmblaCarouselType>) {
    emblaApi = event.detail
  }

  onMount(() => {
    (async () => {
      projects = await bigQuestions();
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
  <div class="box100 column rgap32 top-pad">
    <div class="row ycenter xbetween borderbot pbot16">
      <small class="tt-u blue">BIG QUESTIONS</small>
    </div>
    <Parallax imageLink="/images/cover-bigq.webp"/>
    <div class="grid two cgap64 rgap16">
      <div class="column rgap16">
        <h6 class="thin">
          Hindu society today sits at the cusp of great change. Hindu consciousness is awakening across the nation and awareness of civilizational issues is rising. Established mentalities about Hindu society, dharma, and culture are being challenged, status quos are being quashed, and new paradigms are coming into force. An intellectual renaissance is underway.
        </h6>
        <h6 class="thin">
          Bodha wants to aid the process by asking provocative questions about some of the most fundamental problems and open questions that Hindu society faces today. There are issues that are not settled, questions that are perennially asked by every Hindu generation, and novel dilemmas that we face today.
        </h6>
      </div>
      <div class="column rgap16">
        <h6 class="thin">
          In our Big Question series, we will ask one significant question every year at Bodha, and go to great scholars, activists, thinkers, leaders and stakeholders of Hindu cultural renaissance.
        </h6>
        <h6>
          Their answers will be compiled and published as a book with an introduction about the question, and the problem that it addresses. By this, at Bodha, we intend to initiate great intellectual churn in Hindu society, leading to narrative building which will aid the reestablishment of a correct Hindu worldview rooted in facts and history.
        </h6>
      </div>
    </div>
    <div class="column rgap8 pbot32">
      <h6 class="blue">Explore all Big Questions below.</h6>
      <p class="sm grey notice">Swipe left/right to explore</p>
    </div>
  </div>
  {#if projects && projects.length > 0 && ready}
    <div class="box50 column rgap32">
      <div class="embla">
        <div class="embla__viewport" use:useEmblaCarousel={{ options, plugins }} on:emblaInit={onInit}>
          <div class="embla__container">
            {#each projects as item}
              <div class="embla__slide blogbox2">
                <div class="grid two cgap64 emblagrid rgap24">
                  <div class="column down pbot16">
                    <div class="row ycenter cgap16 mwrap rgap16">                
                      <img class="icon" src={item.icon} alt={item.question}/>
                      <h4>{item.id}. {item.question}</h4>
                    </div>
                    <pre class="big ptop16">{item.description}</pre>
                  </div>
                  <div class="column up">
                    <img class="image-fit" src={item.image} alt={item.question}/>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
        <div class="row ycenter cgap16 ptop32 bordertop">
          <button on:click={() => emblaApi?.scrollPrev()} class="embla__prev button-main">PREV</button>
          <button on:click={() => emblaApi?.scrollNext()} class="embla__next button-main">NEXT</button>
        </div>
      </div>
    </div>
  {/if}
</Container>

<style lang="sass">

img.image-fit
  object-fit: cover
  object-position: center center
  @media screen and (min-width: 1025px)
    width: 100%
    height: 100%
  @media screen and (max-width: 1024px)
    width: 100%
    height: 240px

.grid.two.emblagrid
  @media screen and (max-width: 1024px)
    grid-template-areas: "up" "down"
    .up
      grid-area: up
    .down
      grid-area: down

p.notice
  @media screen and (min-width: 1025px)
    display: none

img.icon
  object-fit: contain
  object-position: center center
  @media screen and (min-width: 1025px)
    height: 40px
    width: 40px
  @media screen and (max-width: 1024px)
    height: 32px
    width: 32px


</style>