<script lang="ts">

  import { onMount } from 'svelte'
  import { allSchools, allThinkers } from '$lib/utils/supabaseClient'
  import { metaTitle, metaDescription, metaUrl, metaImage } from '$lib/utils/metastores'
  import Head from '$lib/comps/headcomponent.svelte'

  let schools:any
  let thinkers:any

  $metaTitle = 'Bodha - Inspiration'
  $metaDescription = 'The primary thinkers and schools of thought we are inspired by.'
  $metaUrl = 'https://www.bodharesearch.in/inspiration'
  $metaImage = '/images/bodhacover.png'

  onMount(() => {
    (async() => {
      schools = await allSchools();
      thinkers = await allThinkers();
    })();
  })

</script>

<Head title={$metaTitle} metaDescription={$metaDescription} metaUrl={$metaUrl} metaImage={$metaImage}></Head>

<div class="column">
  <h6 class="thin">The primary thinkers and schools of thought we follow.</h6>
</div>