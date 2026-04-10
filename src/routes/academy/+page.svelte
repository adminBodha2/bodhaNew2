<script lang="ts">

  import Container from '$lib/comps/container.svelte'
  import Head from '$lib/comps/headcomponent.svelte'
  import FB from '$lib/icons/facebook.svelte'
  import Twitter from '$lib/icons/twitter.svelte'
  import Insta from '$lib/icons/instagram.svelte'
  import Linkedin from '$lib/icons/linkedin.svelte'
  import { metaTitle, metaDescription, metaUrl, metaImage } from '$lib/utils/metastores'

  $metaTitle = 'Bodha Academy'
  $metaDescription = 'Bodha is a think tank and research group focused on contemporary issues of cultural concern, to inform core areas of policy with wisdom derived from Hindu traditions.'
  $metaUrl = 'https://www.bodharesearch.in/academy'
  $metaImage = '/images/bodhacover.png'

</script>

<Head title={$metaTitle} metaDescription={$metaDescription} metaUrl={$metaUrl} metaImage={$metaImage}></Head>

<Container>
  <div class="box100 column ytop rgap32 top-pad is-solo">
    <div class="row ycenter xbetween borderbot pbot16">
      <small class="tt-u blue">Academy</small>
    </div>
    <h6 class="thin width80">Modern fault lines in Hindu society stem from a clash of identities which were created, and made more prominent, during the colonial era through academia and allied institutions. We want to correct this by our field studies program. In conducting these studies, we aim  to decolonize research methodology and arrive upon an Indic lens of research. This is not possible without creating a line of scholars who are capable of carrying this work forward, to next decade and then beyond to the next generation. This is the purpose of Bodha Academy. We aim to train scholars every year in anthropology and sociology from an Indic point of view.</h6>
    <h6 class="thin width80">Our second goal at Bodha Academy is to reach Hindu learners, scholars, aspiring activists and others of allied concerns, through a series of online courses in some of the most important and fundamental Indian thinkers and schools of thought. The goal is to introduce the highest Hindu ideas and traditions to the next generation. The first course in that series is on Shri Ram Swarup.</h6>
    <div class="column bordertop ptop16">
      <h6 class="thin width80 pbot16">Please explore our <a class="linked" href="/academy/courses">online courses</a>:</h6>
      <h6 class="tight pbot8"><span class="thin"><a class="linked" href="/academy/courses/introduction-to-shri-ram-swarup">Introduction to Shri Ram Swarup</a></span></h6>
      <h6 class="tight">Upcoming - <span class="thin">Ancient Indian History</span></h6>
    </div>
  </div>
</Container>