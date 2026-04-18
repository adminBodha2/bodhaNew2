<script lang="ts">

  export let color = 'var(--theme)'
  export let size = 32

</script>

<div class="row xcenter ycenter">
	<svg class="small" width={size} height={size} viewBox="0 0 6 9" fill=none xmlns="http://www.w3.org/2000/svg">
		<path d="M2.82844 4.24269L0 1.41422L1.41424 0L5.65684 4.24269L1.41424 8.48529L0 7.07109L2.82844 4.24269Z" fill={color} />
		</svg>
</div>

<style lang="sass">

svg
	@media screen and (max-width: 1024px)
		transform: scale(0.8)

</style>