<script lang="ts">

  import Arrow from '$lib/icons/arrow-right.svelte'
  export let text = 'Title'
  export let anveshi = false

</script>

<div class="row ycenter xleft">
<Arrow color={anveshi ? "#D3633A" : undefined} />
  <h2 class="source-serif tight">{text}</h2>
</div>

<style lang="sass">

h2
	letter-spacing: -1px
	@media screen and (max-width: 1024px)
		letter-spacing: -0.5px

.row
	margin-left: -8px

</style>