<script lang="ts">

  import { onMount } from 'svelte'
  import { allVideos } from '$lib/utils/supabaseClient'
  import Head from '$lib/comps/headcomponent.svelte'
  import Youtuber from '$lib/comps/youtuber.svelte'
  import { metaTitle, metaDescription, metaUrl, metaImage } from '$lib/utils/metastores'
	import Container from '$lib/comps/container.svelte';

  let vids:any

  onMount(() => {
    (async() => {
      vids = await allVideos()
    })();
  })

</script>

<Container>
  <div class="box100 column ytop rgap32 top-pad">
    <div class="row ycenter xbetween borderbot pbot16">
      <small class="tt-u blue">VIDEOS</small>
    </div>
    {#if vids && vids.length > 0}
      <div class="grid three stacked-2">
        {#each vids as item}
          <div class="column rgap16">
            <Youtuber youTubeId={item.videoid}/>
            <div class="column rgap8">
              <p class="bold tight"><a class="blank linker" href={item.link} target="_blank" rel="noreferrer">{item.name}</a></p>
              <p class="sm blue">{item.channel}</p>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</Container>