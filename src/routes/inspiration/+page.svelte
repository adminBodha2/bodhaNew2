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

<div class="pbot32">
	<h5 class="source-serif thin width70 pbot8">
		<i>"The human mind, in its progress, marches knowledge to knowledge, renews and enlarges previous knowledge- often obscured or overlaid, seizes on old imperfect clues and is led by them to new discoveries."</i>
	</h5>
	<cite class="lgrey">- Sri Aurobindo</cite>
</div>
<div class="box-2">
	<div class="grid two stacked">
		<h6 class="source-serif thin">
			No work emerges in isolation. Every idea, method, and conviction is shaped by a longer continuum of thought—by thinkers who asked difficult questions, and by traditions that refined ways of seeing the world.
			Here we gather the thinkers and schools of thought that have informed our approach. Some are ancient, some modern; some are philosophical, others scientific or cultural. Not all of them agree with each other. That is part of the point.
		</h6>
		<h6 class="source-serif thin">
			We do not treat these as authorities to be followed uncritically, but as companions in inquiry - each offering tools, perspectives, and provocations that continue to shape how we think and build. You are invited to explore it the same way we do - by tracing connections, noticing tensions, and forming your own understanding of what endures, what evolves, and what remains unresolved.
		</h6>
	</div>
</div>

<style lang="sass">

cite
	font-style: normal

</style>