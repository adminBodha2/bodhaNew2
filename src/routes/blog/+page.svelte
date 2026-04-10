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
  <div class="box100 ytop column top-pad">
    <div class="row ycenter xbetween borderbot pbot16">
      <div class="row ycenter cgap8">
        <small class="blue">BLOG</small>
      </div>
      <div class="row ycenter cgap8">
        <button class="buttonheading" on:click={toggleExternal} class:selected={showEx}>{#if showEx}MAIN{:else}EXTERNAL{/if}</button>
        <a class="buttonheading" href="/blog/writers">WRITERS</a>
        <a class="buttonheading" href="/blog/tags">TAGS</a>
      </div>
    </div>
    {#if !showEx && posts && posts.length > 0}
      <div class="grid three stacked ptop32 pbot32">
        {#each posts as item}
          <div class="column">
            <a class="blank" href={item.linkpath}><img class="blog-image" src={item.meta.image} alt={item.meta.title}/></a>
            <h6 class="ptop16 tight"><a class="heading" href={item.linkpath}>{item.meta.title}</a></h6>
            <p class="sm grey pbot16 ptop8">{item.meta.excerpt}</p>
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
      <div class="column rgap32 ptop32 pbot32">
        <h5 class="thin borderbot pbot32">A compilation of our writings on other platforms.</h5>
        <div class="grid three stacked-2">
          {#each exArt as item}
            <div class="column rgap4">
              <h6 class="bold tight"><a class="blank linker" href={item.link} target="_blank" rel="noreferrer">{item.title}</a></h6>
              <p class="sm grey">{item.author} | <span class="blue">{item.blog}</span></p>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</Container>