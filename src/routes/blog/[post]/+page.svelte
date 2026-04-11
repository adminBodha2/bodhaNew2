<script lang="ts">

  import { onMount } from 'svelte'
	import { page } from '$app/stores';
  import { categoryPosts } from '$lib/utils/localpulls'
  import Container from '$lib/comps/container.svelte'
  import Parallax from '$lib/comps/parallaxfull.svelte'
  import Head from '$lib/comps/headcomponent.svelte'
  import Social from '$lib/comps/socialshare.svelte'
  
  let posts:any
  export let data

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
<Container>
  <div class="column ycenter rgap16 titleholder">
    <div class="row ycenter cgap16 ptop32">
      {#each data.tags as tag}
        <p class="sm16 blue italic"><a class="blank linker" href="/blog/tags/{tag}">#{tag}</a></p>
      {/each}
    </div>
    <h1 class="playfair blogtitle tight">{data.title}</h1>
    <p class="grey">{data.excerpt}</p>
    <div class="column">
      <p class="bold"><a class="blank linker" href="/blog/writers/{data.author}">{data.author}</a></p>
      <p class="sm lgrey italic">{data.words} words</p>
    </div>
  </div>
  <div class="grid blog-grid bordertop">
    <div class="column blog-main ptop32 pbot64 rgap32">
      <article class="blog-container">
        <svelte:component this={data.content}/>
      </article>
      <div class="row ycenter cgap16">
        <Social urlToShare={$page.url.href}/>
        <a class="button-main" href="/blog">Return to Blog</a>
      </div>
    </div>
    <div class="column blog-side pbot16">
      {#if posts && posts.length > 0}
        <h6 class="lgrey">More Like This:</h6>
        <div class="column posts rgap16 ptop16">
          {#each posts as item}
            <div class="column borderbot pbot16">
              <p class="tight pbot8"><b><a class="heading" href={item.linkpath}>{item.meta.title}</a></b></p>
              <p class="sm grey">{item.meta.excerpt}</p>
              <div class="row ycenter wrap cgap8 rgap8 ptop8">
                {#each item.meta.tags as tag}
                  <small class="blue italic">{tag}</small>
                {/each}
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</Container>

<style lang="sass">

.titleholder
  @media screen and (min-width: 1025px)
    padding-top: 64px
    padding-bottom: 64px
  @media screen and (max-width: 1024px)
    padding-top: 32px
    padding-bottom: 32px

.blog-grid
  .blog-main
    grid-area: blog-main
  .blog-side
    grid-area: blog-side
  @media screen and (min-width: 1025px)
    grid-template-columns: 1fr 36%
    grid-template-areas: "blog-main blog-side"
    height: 100%
    .blog-side
      border-left: 1px solid #d7d7d7
      padding: 32px 32px 32px 64px
      position: sticky
      top: 72px
      height: calc(100vh - 72px)
      overflow-y: scroll
      &::-webkit-scrollbar
        width: 4px
      &::-webkit-scrollbar-track
        background: #FFFFFF
      &::-webkit-scrollbar-thumb
        background: var(--color-alt)
        border-bottom: 200px solid #FFFFFF
    .blog-main
      padding-right: 80px
  @media screen and (max-width: 1024px)
    grid-template-columns: 1fr
    grid-template-areas: "blog-main" "blog-side"
    .blog-main
      padding-top: 48px
    .blog-side
      border-top: 1px solid #e7e7e7
      padding-top: 32px


</style>

