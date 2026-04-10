<script lang="ts">

  import { onMount } from 'svelte'
  import { selectedOpenLibrary } from '$lib/utils/supabaseClient'
  import Container from '$lib/comps/container.svelte'
  import Head from '$lib/comps/headcomponent.svelte'
  import { metaTitle, metaDescription, metaUrl, metaImage } from '$lib/utils/metastores'

  let books:any
  $metaTitle = 'Bodha - Library | Aryan Issue'
  $metaDescription = 'Readings on the Aryan issue.'
  $metaUrl = 'https://www.bodharesearch.in/library/aryan-issue'
  $metaImage = '/images/bodhacover.png'

  onMount(() => {
    (async() => {
      books = await selectedOpenLibrary('aryanissue');
    })();
  })

</script>

<Head title={$metaTitle} metaDescription={$metaDescription} metaUrl={$metaUrl} metaImage={$metaImage}></Head>

<Container>
  <div class="box100 ytop column top-pad solo">
    <div class="row ycenter xbetween cgap16 borderbot pbot16">
      <div class="row ycenter cgap8">
        <small class="blue"><a class="blank" href="/library">LIBRARY</a></small>
        <small class="lgrey">></small>
        <small><b>THE ARYAN ISSUE</b></small>
      </div>
      <div class="row ycenter cgap8 mwrap rgap8">
        <a class="buttonheading" href="/library/darshanas">DARSHANAS</a>
        <a class="buttonheading" href="/library/essentials">ESSENTIALS</a>
        <a class="buttonheading" href="/library/indian-knowledge-systems">IKS</a>
        <a class="buttonheading" href="/library/scriptural">SCRIPTURAL</a>
        <a class="buttonheading" href="/library/svayambodha">SVAYAMBODHA</a>
        <a class="buttonheading" href="/library/shatrubodha">SHATRUBODHA</a>
        <a class="buttonheading" href="/library/general">GENERAL</a>
      </div>
    </div>
    {#if books && books.length > 0}
      <div class="grid three stacked16 ptop32 pbot32">
        {#each books as item}
          <div class="column borderbot pbot16">
            <small class="lgrey italic">{item.type}</small>
              {#if item.type === "aryanissue"}
                <p class="bold tight"><a class="heading" href={item.linkfinal} target="_blank" rel="noreferrer">{item.name}</a></p>
              {:else}
                <p class="bold tight"><a class="heading" href="/library/{item.slug}">{item.name}</a></p>
              {/if}
            <div class="row xbetween ycenter">
              <p class="sm grey">{item.author}</p>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</Container>