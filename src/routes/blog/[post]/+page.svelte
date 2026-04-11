<script lang="ts">

  import { onMount } from 'svelte'
	import { page } from '$app/stores';
  import { categoryPosts } from '$lib/utils/localpulls'
  import Container from '$lib/comps/container.svelte'
  import Parallax from '$lib/comps/parallaxhalf.svelte'
  import Head from '$lib/comps/headcomponent.svelte'
  import Social from '$lib/comps/socialshare.svelte'
  import Pageprogress from '$lib/comps/pageprogress.svelte'
  
  let posts:any
  export let data
  let ref: HTMLElement | null = null;

  $: if (data?.category) {
    (async () => {
      posts = await categoryPosts(data.category);
    })();
  }

  onMount(() => {
    (async() => {
      posts = await categoryPosts(data.category)
    })();
  })

</script>

<Head title={data.title} metaDescription={data.excerpt} metaImage={data.image} metaUrl={'https://www.bodharesearch.in' + $page.url.pathname}/>

<Parallax imageLink={data.image}/>
<Pageprogress --thispagebackground="#fe4a49" --thispageheight="4px" {ref} />
<Container>
  <div class="column ycenter xcenter ta-c mleft rgap16 titleholder">
    <div class="row ycenter cgap16 ptop32">
      {#each data.tags as tag}
        <p class="sm16 blue italic"><a class="blank linker" href="/blog/tags/{tag}">#{tag}</a></p>
      {/each}
    </div>
    <h1 class="source-serif blogtitle tight">{data.title}</h1>
    <p class="grey width60">{data.excerpt}</p>
    <div class="column">
      <p class="bold"><a class="blank linker" href="/blog/writers/{data.author}">{data.author}</a></p>
      <p class="sm lgrey italic">{data.words} words</p>
    </div>
  </div>
  <div class="blog-outer column rgap16 bordertop borderbot pbot64 ptop64">
      <article class="blog-container column xcenter">
			<div class="blog-inner" bind:this={ref}>
				<svelte:component this={data.content}/>
			</div>
      </article>
	  <div class="column xcenter mleft rgap24 ptop32">
        <Social urlToShare={$page.url.href}/>
        <a class="primary" href="/blog"><span>Return to Blog</span></a>
      </div>
	</div>
    <div class="column ptop32 rgap32">
      {#if posts && posts.length > 0}
        <h4 class="source-serif">More Like This:</h4>
        <div class="grid three stacked-2">
          {#each posts as item}
            <div class="column rgap16">
              <h6 class="source-serif tight"><a class="heading" href={item.linkpath}>{item.meta.title}</a></h6>
              <p class="grey">{item.meta.excerpt}</p>
              <div class="row ycenter wrap cgap8 rgap8">
                {#each item.meta.tags as tag}
                  <p class="sm blue italic">{tag}</p>
                {/each}
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
</Container>

<style lang="sass">

.titleholder
	@media screen and (min-width: 1025px)
		padding-top: 4rem
		padding-bottom: 4rem
	@media screen and (max-width: 1024px)
		padding-top: 2rem
		padding-bottom: 2rem

.blog-inner
	@media screen and (min-width: 1025px)
		width: 840px

</style>

