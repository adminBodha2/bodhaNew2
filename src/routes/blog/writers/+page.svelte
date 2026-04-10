<script lang="ts">

  import { onMount } from 'svelte'
  import { writersWithCountsAlphabetical } from '$lib/utils/localpulls'
  import Container from '$lib/comps/container.svelte'

  let writers:any

  onMount(() => {
    (async() => {
      writers = await writersWithCountsAlphabetical();
    })();
  })

</script>

<Container>
  <div class="box100 ytop column top-pad solo">
    <div class="row ycenter xbetween borderbot pbot16">
      <div class="row ycenter cgap8">
        <small class="blue"><a class="blank" href="/blog">BLOG</a></small>
        <small class="lgrey">></small>
        <small><b>WRITERS</b></small>
      </div>
      <div class="row ycenter cgap8">
        <a class="buttonheading" href="/blog">BLOG</a>
        <a class="buttonheading" href="/blog/tags">TAGS</a>
      </div>
    </div>
    {#if writers && writers.length > 0}
      <div class="column ptop32 pbot32">
        {#each writers as item}
          <h6><a class="heading" href="/blog/writers/{item.writer}">{item.writer}</a></h6>
        {/each}
      </div>
    {/if}
  </div>
</Container>