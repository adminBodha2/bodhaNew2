<script lang="ts">

	import { page } from '$app/stores';
  import Head from '$lib/comps/headcomponent.svelte'
  export let data

</script>

<Head title={data.name} metaDescription={'Read' + data.name + ' at Bodha library.'} metaImage='/images/bodhacover.png' metaUrl={'https://www.bodharesearch.in' + $page.url.pathname}/>

<div class="column borderbot pbot32">
	<div class="pbot8">
		<small class="blue"><a class="blank" href="/library">BODHA OPEN LIBRARY</a></small>
	</div>
  <h2 class="source-serif tight">{data.name}</h2>
  <div class="row ycenter cgap8 ptop8">
    <div class="label"><small class="tt-u">{data.type}</small></div>
	<p class="big">{data.author}</p>
  </div>
</div>
<div class="pdf-box ptop32 pbot32">
    <iframe title={data.name} src={data.linkreal} allow="autoplay"></iframe>
  </div>

<style lang="sass">

.pdf-box
	iframe
		border-radius: 16px
		border: 1px solid var(--color-border)
		@media screen and (min-width: 1025px)
			height: 800px
			width: 85%
			padding: 2rem
		@media screen and (max-width: 1024px)
			height: 720px
			width: 100%
			padding: 1rem

</style>