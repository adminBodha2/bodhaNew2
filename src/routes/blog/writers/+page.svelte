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
	<div class="box-t">
		<div class="row ycenter cgap8">
			<a class="ftnbtn" href="/blog">BLOG</a>
			<a class="ftnbtn" href="/blog/writers">WRITERS</a>
			<a class="ftnbtn" href="/blog/tags">TAGS</a>
		  </div>
		  {#if writers && writers.length > 0}
		  <div class="column">
			{#each writers as item}
			  <h6 class="source-serif thin"><a class="heading" href="/blog/writers/{item.writer}">{item.writer}</a></h6>
			{/each}
		  </div>
		{/if}
	</div>
</Container>