<script lang="ts">

  import { onMount } from 'svelte'
  import { fullBlog } from '$lib/utils/localpulls'
  import { otherArticles } from '$lib/utils/supabaseClient'
  import Container from '$lib/comps/container.svelte'
  import Head from '$lib/comps/headcomponent.svelte'
  import { metaTitle, metaDescription, metaUrl, metaImage } from '$lib/utils/metastores'

  let posts:any
  let showEx = false
  let exArt:any

  $metaTitle = 'Bodha - Blog'
  $metaDescription = 'Our blog featuring essays on Hindu culture, history, festivals, and more.'
  $metaUrl = 'https://www.bodharesearch.in/blog'
  $metaImage = '/images/bodhacover.png'

  function toggleExternal(){
    showEx = !showEx
  }

  onMount(() => {
    (async() => {
      posts = await fullBlog();
      exArt = await otherArticles();
    })();
  })

</script>

<Head title={$metaTitle} metaDescription={$metaDescription} metaUrl={$metaUrl} metaImage={$metaImage}></Head>

<Container>
	<div class="box-t">
		<div class="row ycenter cgap8">
			<button class="ftnbtn" on:click={toggleExternal} class:selected={showEx}>{#if showEx}MAIN{:else}EXTERNAL{/if}</button>
			<a class="ftnbtn" href="/blog/writers">WRITERS</a>
			<a class="ftnbtn" href="/blog/tags">TAGS</a>
		  </div>
		  {#if !showEx && posts && posts.length > 0}
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
					<p class="sm bold"><a class="blank linker" href="/blog/writers/{item.meta.author}">{item.meta.author}</a></p>
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
		{:else if showEx && exArt && exArt.length > 0}
		  <div class="column rgap16">
			<p class="sm">A compilation of our writings on other platforms.</p>
			<div class="grid three stacked-2">
			  {#each exArt as item}
				<div class="column">
				  <h5 class="source-serif tight"><a class="blank linker" href={item.link} target="_blank" rel="noreferrer">{item.title}</a></h5>
				  <p class="sm grey">{item.author} | <span class="blue">{item.blog}</span></p>
				</div>
			  {/each}
			</div>
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