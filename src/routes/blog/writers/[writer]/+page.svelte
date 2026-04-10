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
  <div class="box100 ytop column top-pad solo">
    <div class="row ycenter xbetween borderbot pbot16">
      <div class="row ycenter cgap8">
        <small class="blue"><a class="blank" href="/blog">BLOG</a></small>
        <small class="lgrey">></small>
        <small class="blue"><a class="blank" href="/blog/writers">WRITERS</a></small>
        <small class="lgrey">></small>
        <small class="tt-u"><b>{writerName}</b></small>
      </div>
      <div class="row ycenter cgap8">
        <a class="buttonheading" href="/blog/writers">WRITERS</a>
        <a class="buttonheading" href="/blog/tags">TAGS</a>
        <a class="buttonheading" href="/blog">BLOG</a>
      </div>
    </div>
    {#if posts && posts.length > 0}
      <div class="grid three stacked ptop32 pbot32">
        {#each posts as item}
          <div class="column">
            <a class="blank" href={item.linkpath}><img class="blog-image" src={item.meta.image} alt={item.meta.title}/></a>
            <h6 class="ptop16 tight"><a class="heading" href={item.linkpath}>{item.meta.title}</a></h6>
            <p class="sm grey pbot16 ptop8">{item.meta.excerpt}</p>
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