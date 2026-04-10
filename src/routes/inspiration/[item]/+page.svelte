<script lang="ts">

	import { page } from '$app/stores';
  import Head from '$lib/comps/headcomponent.svelte'
  export let data

</script>

<Head title={data.name} metaDescription='The primary thinkers and schools of thought we follow.' metaImage='/images/bodhacover.png' metaUrl={'https://www.bodharesearch.in' + $page.url.pathname}/>

<div class="column rgap16 width90">
  <h5>{data.name}</h5>
  <img class={data.type} src={data.image} alt={data.name}/>
  <pre>{data.content}</pre>
</div>

<style lang="sass">

pre
  font-family: var(--font-sans)

img.thinker
  object-fit: contain
  border-radius: 4px
  margin-bottom: 16px
  @media screen and (min-width: 1025px)
    width: 600px
  @media screen and (max-width: 1024px)
    width: 100%

img.school
  object-fit: contain
  border-radius: 4px
  margin-bottom: 16px
  @media screen and (min-width: 1025px)
    width: 100%
  @media screen and (max-width: 1024px)
    width: 100%

</style>