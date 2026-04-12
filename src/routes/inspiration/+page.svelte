<script lang="ts">

  import { metaTitle, metaDescription, metaUrl, metaImage } from '$lib/utils/metastores'
  import Head from '$lib/comps/headcomponent.svelte'

  $metaTitle = 'Bodha - Inspiration'
  $metaDescription = 'The primary thinkers and schools of thought we are inspired by.'
  $metaUrl = 'https://www.bodharesearch.in/inspiration'
  $metaImage = '/images/bodhacover.png'

</script>

<Head title={$metaTitle} metaDescription={$metaDescription} metaUrl={$metaUrl} metaImage={$metaImage}></Head>

<section class="content-area">
<h2 class="source-serif pbot16">Our Inspiration</h2>
<div class="pbot32">
	<h5 class="source-serif thin pbot8">
		<i>"The human mind, in its progress, marches knowledge to knowledge, renews and enlarges previous knowledge- often obscured or overlaid, seizes on old imperfect clues and is led by them to new discoveries."</i>
	</h5>
	<cite class="lgrey">- Sri Aurobindo</cite>
</div>
<div class="box-2">
	<img src="/images/key-inspiration.webp" alt="inspiration"/>
	<div class="column rgap24">
		<p class="big">
			No work emerges in isolation. Every idea, method, and conviction is shaped by a longer continuum of thought—by thinkers who asked difficult questions, and by traditions that refined ways of seeing the world.
			Here we gather the thinkers and schools of thought that have informed our approach. Some are ancient, some modern; some are philosophical, others scientific or cultural. Not all of them agree with each other. That is part of the point.
		</p>
		<p class="big">
			We do not treat these as authorities to be followed uncritically, but as companions in inquiry - each offering tools, perspectives, and provocations that continue to shape how we think and build. You are invited to explore it the same way we do - by tracing connections, noticing tensions, and forming your own understanding of what endures, what evolves, and what remains unresolved.
		</p>
	</div>
</div>
</section>

<style lang="sass">

cite
	font-style: normal

img
	object-fit: cover
	width: 100%
	border-radius: 8px

</style>