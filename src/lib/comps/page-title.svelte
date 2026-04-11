<script lang="ts">

  import Arrow from '$lib/icons/arrow-right.svelte'
  export let text = 'Title'

</script>

<div class="row ycenter xleft">
  <Arrow/>
  <h2 class="source-serif">{text}</h2>
</div>

<style lang="sass">

h2
	letter-spacing: -2px
	@media screen and (max-width: 1024px)
		letter-spacing: -0.5px

.row
	margin-left: -8px

</style>