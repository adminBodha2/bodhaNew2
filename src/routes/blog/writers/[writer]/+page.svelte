<script lang="ts">

  import { onMount } from 'svelte'
  import { page } from '$app/stores';
  import { selectedWriter } from '$lib/utils/localpulls'
  import Container from '$lib/comps/container.svelte'

  let posts:any
  $: writerName = $page.params.writer

  onMount(() => {
    (async() => {
      posts = await selectedWriter(writerName,50);
    })()
  })

</script>

<Container>
	<div class="box-t">
		<div class="row ycenter cgap8">
			<a class="ftnbtn" href="/blog">BLOG</a>
			<a class="ftnbtn" href="/blog/writers">WRITERS</a>
			<a class="ftnbtn" href="/blog/tags">TAGS</a>
		  </div>
		  {#if posts && posts.length > 0}
		  <div class="grid three stacked-2">
			{#each posts as item}
			  <div class="column rgap16 carrier">
				<div class="column rgap16">
					<a class="blank" href={item.linkpath}><img class="blog-image" src={item.meta.image} alt={item.meta.title}/></a>
					<h5 class="source-serif tight"><a class="heading" href={item.linkpath}>{item.meta.title}</a></h5>
					<p class="sm grey">{item.meta.excerpt}</p>
				</div>
				<div class="row ytop xbetween bordertop ptop16">
				  <div class="column">
					<p class="sm bold">{item.meta.author}</p>
					<small class="lgrey italic">{item.meta.words} words</small>
				  </div>
				  <div class="row ycenter cgap16 mwrap">
					{#each item.meta.tags as tag}
					  <p class="sm blue italic"><a class="blank linker" href="/blog/tags/{tag}">{tag}</a></p>
					{/each}
				  </div>
				</div>
			  </div>
			{/each}
		  </div>
		{/if}
	</div>
</Container>

<style lang="sass">

.grid.three.stacked-2
	align-items: stretch
	.carrier
		height: 100%
		justify-content: space-between

img.blog-image
	border-radius: 8px

</style>