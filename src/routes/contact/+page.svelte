<script lang="ts">

  import Container from '$lib/comps/container.svelte'
  import Head from '$lib/comps/headcomponent.svelte'
  import FB from '$lib/icons/facebook.svelte'
  import Twitter from '$lib/icons/twitter.svelte'
  import Insta from '$lib/icons/instagram.svelte'
  import Linkedin from '$lib/icons/linkedin.svelte'
  import { metaTitle, metaDescription, metaUrl, metaImage } from '$lib/utils/metastores'

  $metaTitle = 'Bodha - Contact Us'
  $metaDescription = 'Bodha is a think tank and research group focused on contemporary issues of cultural concern, to inform core areas of policy with wisdom derived from Hindu traditions.'
  $metaUrl = 'https://www.bodharesearch.in/contact'
  $metaImage = '/images/bodhacover.png'

</script>

<Head title={$metaTitle} metaDescription={$metaDescription} metaUrl={$metaUrl} metaImage={$metaImage}></Head>

<Container narrow={true}>
	<div class="box-t mmVH">
		<p>Write to us at <span class="blue">contact@bodharesearch.in</span><br>
			or, reach out on social media-
		  </p>
		  <div class="row cgap16 ycenter">
			<a class="blank" href="https://x.com/BodhaResearch" rel="noreferrer" target="_blank">
			  <Twitter size=24 color={'var(--color-alt'}/>
			</a>
			<a class="blank" href="https://www.facebook.com/profile.php?id=61584291760187" rel="noreferrer" target="_blank">
			  <FB size=24 color={'var(--color-alt'}/>
			</a>
			<a class="blank" href="https://www.instagram.com/bodharesearch" rel="noreferrer" target="_blank">
			  <Insta size=24 color={'var(--color-alt'}/>
			</a>
			<a class="blank" href="https://www.linkedin.com/company/bodha-research/" rel="noreferrer" target="_blank">
			  <Linkedin size=24 color={'var(--color-alt'}/>
			</a>
		  </div> 
	</div>
</Container>