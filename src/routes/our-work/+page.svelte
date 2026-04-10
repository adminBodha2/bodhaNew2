<script lang="ts">

  import Container from '$lib/comps/container.svelte'
  import Head from '$lib/comps/headcomponent.svelte'
  import { metaTitle, metaDescription, metaUrl, metaImage } from '$lib/utils/metastores'

  $metaTitle = 'Bodha - Our Work'
  $metaDescription = 'Bodha is a think tank and research group focused on contemporary issues of cultural concern, to inform core areas of policy with wisdom derived from Hindu traditions.'
  $metaUrl = 'https://www.bodharesearch.in/our-work'
  $metaImage = '/images/bodhacover.png'

</script>

<Head title={$metaTitle} metaDescription={$metaDescription} metaUrl={$metaUrl} metaImage={$metaImage}></Head>

<Container>
  <div class="box100 column rgap32 py128-m solo">
    <div class="row ycenter xbetween borderbot pbot16">
      <small class="tt-u blue">OUR WORK</small>
    </div>
    <div class="column rgap16">
      <h5>Current Priorities</h5>
      <h6 class="thin borderbot pbot32">
        1. Battle for Dharma in North East<br>
        2. Hindu Models of Temple Management<br>
        3. Documenting the temples of MP - Gujarat belt<br>
        4. Hindu View of Enlightenment
      </h6>
      <h5 class="ptop16">Next 10 Years</h5>
      <h6 class="thin">
        1. Setting up Hindu Institutional Core for Future<br>
        2. Completing 10 Research Projects in Frontier Areas<br>
        3. Writing Reports, Books and Articles on These Research Projects<br>
        4. Training 50 Scholars in Culture Studies<br>
        5. Leading Intellectual Churn in 10 Critical Hindu Concerns<br>
        6. Leading 30 Anveshi Chapters and Guiding 600 Cultural Ambassadors
      </h6>
    </div>
  </div>
</Container>