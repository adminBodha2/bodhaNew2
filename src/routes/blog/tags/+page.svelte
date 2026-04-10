<script lang="ts">

  import { onMount } from 'svelte'
  import { tagsWithCounts, tagsWithCountsAlphabetical } from '$lib/utils/localpulls'
  import Container from '$lib/comps/container.svelte'
  import Toggler from '$lib/comps/toggle.svelte'

  let tags:any
  let tagsC:any
  let showCount = false

  function toggleCount(){
    showCount = !showCount
  }

  onMount(() => {
    (async() => {
      tags = await tagsWithCountsAlphabetical();
      tagsC = await tagsWithCounts();
    })();
  })

</script>

<Container>
  <div class="box100 ytop column top-pad solo">
    <div class="row ycenter xbetween borderbot pbot16">
      <div class="row ycenter cgap8">
        <small class="blue"><a class="blank" href="/blog">BLOG</a></small>
        <small class="lgrey">></small>
        <small><b>TAGS</b></small>
      </div>
      <div class="row ycenter cgap8">
        {#if showCount}
        <small class="lgrey">Sort Alphabetically</small>
         {:else}
        <small class="lgrey">Sort by No. of Posts</small>
        {/if}
        <button class="blank" on:click={toggleCount}>
          <Toggler isToggled={showCount}/>
        </button>
        <a class="buttonheading" href="/blog">BLOG</a>
        <a class="buttonheading" href="/blog/writers">WRITERS</a>
      </div>
    </div>
    {#if showCount}
      {#if tagsC && tagsC.length > 0}
        <div class="row wrapper xcenter mleft ptop32 pbot32 cgap16 rgap16">
          {#each tagsC as tag}
            <a class="blank" href="/blog/tags/{tag.tag}"><button class="taglabel tt-u">{tag.tag} ({tag.count})</button></a>
          {/each}
        </div>
      {/if}
    {:else}
      {#if tags && tags.length > 0}
        <div class="row wrapper xcenter mleft ptop32 pbot32 cgap16 rgap16">
          {#each tags as tag}
          <a class="blank" href="/blog/tags/{tag.tag}"><button class="taglabel tt-u">{tag.tag}</button></a>
          {/each}
        </div>
      {/if}
    {/if}
  </div>
</Container>