<script lang="ts">

  import Container from '$lib/comps/container.svelte'
  import Head from '$lib/comps/headcomponent.svelte'
  import Arrow from '$lib/icons/chevron-rounded.svelte'
  import { metaTitle, metaDescription, metaUrl, metaImage } from '$lib/utils/metastores'

  $metaTitle = 'Bodha - Research'
  $metaDescription = 'Our research areas fall in 3 categories - Institutional Design, Policy and Strategic Affairs, Intellectual Output.'
  $metaUrl = 'https://www.bodharesearch.in/research'
  $metaImage = '/images/bodhacover.png'

</script>

<Head title={$metaTitle} metaDescription={$metaDescription} metaUrl={$metaUrl} metaImage={$metaImage}></Head>

<Container>
  <div class="box100 column rgap32 top-pad is-solo">
    <div class="row ycenter xbetween borderbot pbot16">
      <small class="tt-u blue">RESEARCH</small>
    </div>
    <div class="column rgap16">
      <div class="grid two stacked pbot32">
        <h6 class="thin">A standing complaint of Hindu society is that India’s policy does not take into account Hindu cultural sensibilities. At Bodha we seek to rectify this by providing policy inputs gleaned from extensive field research in culture studies, particularly in ethnography, anthropology and sociology. India is a living civilization whose soul resides in its practices and not just in principles. Shying away from dogmas, it has always coupled theories with practices and experiences. Any recommendation which seeks to push India’s policy closer to Hindu culture has to come from wisdom gleaned from field experiences and case studies, based upon extremely rigorous but culture sensitive research methodology.</h6>
        <h6 class="thin">Our goal is to make experimental methodology central to policy recommendations so that policy in future India is conducive to India’s culture and also practical and capable of competing with global forces. <b><span class="blue">Our research areas fall in 3 categories -</span> Institutional Design, Policy and Strategic Affairs, Purva Paksha of Western Humanities.</b></h6>
      </div>
      <div class="grid three stacked-2">
        <div class="column rgap16">
          <img class="vert pbot8" src="/images/research-1.webp" alt="institutional design"/>
          <h3 class="blue pbot8">Institutional Design</h3>
          <div class="column rgap8">
            <div class="row ycenter borderbot pbot8 cgap8">
              <Arrow/>
              <h6 class="thin"><a class="blank color" href="/research/hindu-models-temple-management">Hindu Models of Temple Management</a></h6>
            </div>
            <div class="row ycenter borderbot pbot8 cgap8">
              <Arrow/>
              <h6 class="thin"><a class="blank color" href="/research/structure-of-hindu-charity">Structure of Hindu Charity</a></h6>
            </div>
            <div class="row ycenter borderbot pbot8 cgap8">
              <Arrow/>
              <h6 class="thin"><a class="blank color" href="/research/hindu-frameworks-of-education">Hindu Frameworks of Education</a></h6>
            </div>
            <div class="row ycenter borderbot pbot8 cgap8">
              <Arrow/>
              <h6 class="thin"><a class="blank color" href="/research/dynamics-of-hindu-family">Interchanging Dynamics of Hindu Family</a></h6>
            </div>
            <div class="row ycenter borderbot pbot8 cgap8">
              <Arrow/>
              <h6 class="thin"><a class="blank color" href="/research/temples-of-madhya-pradesh">Temples of Madhya Pradesh</a></h6>
            </div>
          </div>
        </div>
        <div class="column rgap16">
          <img class="vert pbot8" src="/images/research-2.webp" alt="policy and strategic affairs"/>
          <h3 class="blue pbot8">Policy and Strategic Affairs</h3>
          <div class="column rgap8">
            <div class="row ycenter borderbot pbot8 cgap8">
              <Arrow/>
              <h6 class="thin"><a class="blank color" href="/research/battle-for-dharma-north-east">Battle of Dharma in North East</a></h6>
            </div>
            <div class="row ycenter borderbot pbot8 cgap8">
              <Arrow/>
              <h6 class="thin"><a class="blank color" href="/research/year-in-hajong-village">A Year in a Hajong Village</a></h6>
            </div>
            <div class="row ycenter borderbot pbot8 cgap8">
              <Arrow/>
              <h6 class="thin"><a class="blank color" href="/research/dangs-religious-terror">Dangs: Anatomy of Religious Terror</a></h6>
            </div>
            <div class="row ycenter borderbot pbot8 cgap8">
              <h6 class="thin">The Dharma-Dhamma Axis</h6>
            </div>
            <div class="row ycenter borderbot pbot8 cgap8">
              <h6 class="thin">Kekadia: Impact of Conversion on Tribal Society</h6>
            </div>
          </div>
        </div>
        <div class="column rgap16">
          <img class="vert pbot8" src="/images/research-3.webp" alt="purva paksha of western humanities"/>
          <h3 class="blue pbot8">Purva Paksha</h3>
          <div class="column rgap8">
            <div class="row ycenter borderbot pbot8 cgap8">
              <Arrow/>
              <h6 class="thin"><a class="blank color" href="/research/hindu-view-of-enlightenment">A Hindu View of the Enlightenment</a></h6>
            </div>
            <div class="row ycenter borderbot pbot8 cgap8">
              <Arrow/>
              <h6 class="thin"><a class="blank color" href="/research/artist-in-art">Artist in the Art: Hindu View of Western Art</a></h6>
            </div>
            <h6 class="thin borderbot pbot8">India That Was: Glimpses of a Disappearing World</h6>
            <h6 class="thin borderbot pbot8">Alternate Consciousness: Pagan Cultures</h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</Container>

<style lang="sass">

img.vert
  object-fit: cover
  object-position: center center
  @media screen and (min-width: 1025px)
    width: 100%
    height: 360px
  @media screen and (max-width: 1024px)
    width: 100%
    height: 240px

</style>