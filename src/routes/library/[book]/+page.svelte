<script lang="ts">

	import { page } from '$app/stores';
  import Head from '$lib/comps/headcomponent.svelte'
  export let data

</script>

<Head title={data.name} metaDescription={'Read' + data.name + ' at Bodha library.'} metaImage='/images/bodhacover.png' metaUrl={'https://www.bodharesearch.in' + $page.url.pathname}/>

<div class="column">
  <h3>{data.name}</h3>
  <div class="row ycenter cgap8 ptop8">
    <p class="sm16 blue">{data.author}</p>
    <p class="sm16 lgrey">| #{data.type}</p>
  </div>
  <div class="pdf-box ptop32">
    <iframe title={data.name} src={data.linkreal} allow="autoplay"></iframe>
  </div>
</div>

<style lang="sass">

.pdf-box
  iframe
    width: 100%
    @media screen and (min-width: 1025px)
      height: 640px
    @media screen and (max-width: 1024px)
      height: 720px

</style>