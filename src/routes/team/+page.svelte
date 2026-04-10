<script lang="ts">

  import Container from '$lib/comps/container.svelte'
  import Head from '$lib/comps/headcomponent.svelte'
  import { metaTitle, metaDescription, metaUrl, metaImage } from '$lib/utils/metastores'

  $metaTitle = 'Bodha - Team'
  $metaDescription = 'Meet our team.'
  $metaUrl = 'https://www.bodharesearch.in/team'
  $metaImage = '/images/bodhacover.png'

</script>

<Head title={$metaTitle} metaDescription={$metaDescription} metaUrl={$metaUrl} metaImage={$metaImage}></Head>

<Container>
  <div class="box100 column top-pad rgap32">
    <div class="row ycenter xbetween borderbot pbot16">
      <small class="tt-u blue">THE TEAM</small>
    </div>
    <div class="column rgap16">
      <div class="grid three stacked-2">
        <div class="column rgap8">
          <img class="phot" src="/images/team/PS.webp" alt="pankaj saxena"/>
          <h6 class="ptop8">Pankaj Saxena - Founder</h6>
          <p class="tight">Pankaj is an author on Hindu temples, arts, literature, history and culture. His writing explains the beauty of Sanātana Dharma through stories about traditions, communities and culture. He has a deep interest in cultural anthropology, evolutionary biology and ecology, and has visited more than 1600 Hindu temples. He is the author of 'Svayambodha and Shatrubodha'.</p>
          <p class="sm grey"><a class="blank bold900 linked" target="_blank" rel="noreferrer" href="https://x.com/PankajSaxena84">Twitter</a> | <a class="blank bold900 linked" target="_blank" rel="noreferrer" href="https://www.facebook.com/PankajSaxena84">Facebook</a> | <a class="blank bold900 linked" target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/pankajsaxena84/">LinkedIn</a></p>
        </div>
        <div class="column rgap8">
          <img class="phot" src="/images/team/AP.webp" alt="amritanshu pandey"/>
          <h6 class="bold ptop8">Amritanshu Pandey - Co-founder</h6>
          <p class="tight">Amrit combines 14 years of professional experience rooted in product development and business leadership, with a lifetime of engagement with ancient Indian history. He writes on history, civilizational thinking and design, and is a research fellow at Sir Jadunath Sarkar Fellowship for Indian History (2025–26) at FIHCR. He is the author of 'Fractal Maṇḍala - A History of Ancient India'.</p>
          <p class="sm grey"><a class="blank bold900 linked" target="_blank" rel="noreferrer" href="https://x.com/saamaanyafreaky">Twitter</a> | <a class="blank bold900 linked" target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/amritanshu-pandey/">LinkedIn</a></p>
        </div>
        <div class="column rgap8">
          <img class="phot" src="/images/team/AJ.webp" alt="akshay jha"/>
          <h6 class="bold ptop8">Akshay Jha - Co-founder</h6>
          <p class="tight">Akshay Jha is a researcher of Hindu institutions and philosophy, with a current focus on Hindu temple management. His interests lie in Hindu knowledge tradition, ethnographic approaches to temple management, and the intersection of tradition with contemporary society.</p>
          <p class="sm grey"><a class="blank bold900 linked" target="_blank" rel="noreferrer" href="https://x.com/akshaystates">Twitter</a> | <a class="blank bold900 linked" target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/akshaykrjha/">LinkedIn</a></p>
        </div>
        <div class="column rgap8">
          <img class="phot" src="/images/team/PM.webp" alt="padmavathy mana"/>
          <h6 class="bold ptop8 tight">Padmavathy Manavazhahan - Manager, Content</h6>
          <p class="tight">Padmavathy comes from a background of Advaita Vedānta, with professional experience in software entrepreneurship. Her work in this field is driven by a life-long reverence for Bhārata.</p>
        </div>
        <div class="column rgap8">
          <img class="phot" src="/images/team/AM.webp" alt="ankit mishra"/>
          <h6 class="bold ptop8">Ankit Mishra - Manager, Ops</h6>
          <p class="tight">Ankit transitioned from engineering to development sector after his interests in public policy. He has worked as political consultant to several political parties and renowned leaders. He aims to integrate Indian Knowledge Systems in development sector and politics to rekindle the dharma and civilizational flame.</p>
        </div>
      </div>
    </div>
  </div>
</Container>

<style lang="sass">

img.phot
  border-radius: 50%
  @media screen and (min-width: 1025px)
    height: 144px
    width: 144px
  @media screen and (max-width: 1024px)
    height: 144px
    width: 144px

</style>