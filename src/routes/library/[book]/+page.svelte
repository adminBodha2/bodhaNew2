<script lang="ts">

	import { page } from '$app/stores';
  import Head from '$lib/comps/headcomponent.svelte'
  export let data

</script>

<Head title={data.name} metaDescription={'Read' + data.name + ' at Bodha library.'} metaImage='/images/bodhacover.png' metaUrl={'https://www.bodharesearch.in' + $page.url.pathname}/>

<div class="column pbot32">
	<div class="pbot8">
		<small class="blue"><a class="blank" href="/library">BODHA OPEN LIBRARY</a></small>
	</div>
  <h2 class="source-serif tight pbot16">{data.name}</h2>
  	<div class="bordering width70 column">
		<p class="sm grey">{data.short}</p>
		<p class="bold pbot16">{data.author}</p>
		<a class="label" href="/library/{data.type}"><small class="tt-u">{data.type}</small></a>
	</div>
</div>
<div class="pdf-box ptop32 pbot32">
    <iframe title={data.name} src={data.linkreal} allow="autoplay"></iframe>
  </div>

<style lang="sass">

.bordering
	border-radius: 8px

.pdf-box
	iframe
		border-radius: 16px
		border: 1px solid var(--grey-sm)
		@media screen and (min-width: 1025px)
			height: 800px
			width: 85%
			padding: 2rem
		@media screen and (max-width: 1024px)
			height: 720px
			width: 100%
			padding: 1rem

</style>