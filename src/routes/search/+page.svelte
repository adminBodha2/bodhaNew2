<script lang="ts">
  import { onMount } from 'svelte'
  import Container from '$lib/comps/container.svelte'
  import Head from '$lib/comps/headcomponent.svelte'
  import { createPostsIndex, searchPostsIndex, type SearchResult } from '$lib/utils/search'
  import { metaTitle, metaDescription, metaUrl, metaImage } from '$lib/utils/metastores'
  import type { SearchItem } from '$lib/utils/search'

  let search: 'loading' | 'ready' = 'loading'
  let searchTerm = ''
  let results: SearchResult[] = []      // <-- explicit type

  $metaTitle = 'Bodha'
  $metaDescription = 'Bodha is a think tank and research group focused on contemporary issues of cultural concern, to inform core areas of policy with wisdom derived from Hindu traditions.'
  $metaUrl = 'https://www.bodharesearch.in/search'
  $metaImage = '/images/bodhacover.png'

  onMount(async () => {
    const posts = await fetch('/api/search.json').then((res) => res.json())
    const items: SearchItem[] = posts.map((entry: any) => ({
      title: entry.meta.title,
      slug: entry.linkpath,
      content: entry.meta.excerpt ?? "",
      category: entry.meta.category,
      tags: entry.meta.tags
    }))
    createPostsIndex(items)
    search = 'ready'
  })

  // run each time `searchTerm` updates, but await the async search
  $: if (search === 'ready') {
    ;(async () => {
      // if searchTerm is empty, clear results quickly (optional)
      if (!searchTerm.trim()) {
        results = []
        return
      }
      results = await searchPostsIndex(searchTerm)
    })()
  }
</script>

<Head title={$metaTitle} metaDescription={$metaDescription} metaUrl={$metaUrl} metaImage={$metaImage}></Head>

<Container>
  <div class="box100 column ytop rgap32 top-pad solo">
    <div class="row ycenter xbetween borderbot pbot16">
      <small class="tt-u blue">SEARCH</small>
    </div>
    {#if search === 'ready'}
      <div class="column rgap16">
        <input
          bind:value={searchTerm}
          placeholder="Search"
          autocomplete="off"
          spellcheck="false"
          type="search"
          class="search-input"
        />
        <div class="column search">
      <div class="results">
        {#if results.length}
          {#each results as result}
            <div class="column borderbot pbot16 ptop16">
              <!-- use result.slug/title/content (no .meta) -->
              <h6 class="thin"><a class="blank linker" href={result.slug}>{@html result.title}</a></h6>
              <p class="sm grey">{@html result.content}</p>
            </div>
          {/each}
        {:else if searchTerm.trim()}
          <p>No results</p>
        {/if}
      </div>
        </div>
      </div>
    {/if}
  </div>
</Container>

<style lang="sass">

input.search-input
  padding: 16px
  border: 1px solid #474747
  background: #FFFFFF
  border-radius: 4px
  font-size: 16px
  @media screen and (min-width: 1025px)
    width: 400px

</style>
