<script lang="ts">

  import { onMount } from 'svelte'
  import { allResearch } from '$lib/utils/supabaseClient';
	import { page } from '$app/stores';
  import Container from '$lib/comps/container.svelte'
  import Head from '$lib/comps/headcomponent.svelte'
  export let data

  let projects: any

  onMount(() => {
    (async() => {
      projects = await allResearch();
    })();
  })

</script>

<Head title={data.research} metaDescription='Explore our research projects at Bodha.' metaImage='/images/bodhacover.png' metaUrl={'https://www.bodharesearch.in' + $page.url.pathname}/>

<Container>
  <div class="box100 column rgap32 top-pad solo">
    <div class="row ycenter xbetween borderbot pbot16">
      <div class="row ycenter cgap8">
        <small class="blue"><a class="blank" href="/research">RESEARCH</a></small>
        <small class="lgrey">></small>
        <small class="tt-u lgrey">{data.research}</small>
      </div>
    </div>
    <div class="grid two right rgap64">
      <div class="column rgap16">
        <h2 class="steady">{data.research}</h2>
        <img class="key pbot16" src={data.image} alt={data.research}/>
        <pre class="big">{data.detail}</pre>
      </div>
      <div class="column rgap16 sider">
        <div class="column rgap16">
        <p class="sm16 lgrey">All Projects</p>
        {#if projects && projects.length > 0}
          <div class="column">
            {#each projects as item}
              <p class="thin tight borderbot pbot8 ptop8 forstyle"><a class="blank color" href="/research/{item.slug}">{item.research}</a></p>
            {/each}
          </div>
        {/if}
        </div>
      </div>
    </div>
  </div>
</Container>

<style lang="sass">

p.forstyle
  transition: padding 0.2s ease
  @media screen and (min-width: 1025px)
    &:hover
      padding-left: 12px

pre
  font-family: var(--font-sans)

.sider
  @media screen and (min-width: 1025px)
    padding-left: 64px
  @media screen and (max-width: 1024px)
    border-top: 1px solid #e7e7e7
    padding-top: 32px

img.key
  object-fit: cover
  object-position: center center
  width: 100%
  @media screen and (min-width: 1025px)
    height: 480px

</style>