<script lang="ts">

  let scroY:number
  export let imageLink:string = ''

</script>

<svelte:window bind:scrollY={scroY}/>

<div class="imager">
  <img src={imageLink} alt="parallax header" style="transform: translateY({scroY/2}px)"/>
</div>

<style lang="sass">

.imager
	overflow: hidden
	img
		object-fit: cover
		object-position: center center
		@media screen and (min-width: 1025px)
			width: 100%
			height: 60vh
		@media screen and (max-width: 1024px)
			width: 100%
			height: 100%
			margin-top: 64px

</style>