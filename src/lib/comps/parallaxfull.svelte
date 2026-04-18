<script lang="ts">

  let scroY:number
  export let imageLink:string = ''
  export let isClass:string = 'is100'

</script>

<svelte:window bind:scrollY={scroY}/>

<div class="imager {isClass}">
  <img src={imageLink} alt="parallax header" style="transform: translateY({scroY/2}px)"/>
</div>

<style lang="sass">

.imager
	overflow: hidden
	@media screen and (min-width: 1025px)
		height: 100vh
		&.is100
			height: 100vh
		&.is70
			height: 70vh
		&.is50
			height: 70vh
		img
			object-fit: cover
			object-position: center center
			height: 100%
			width: 100%
	@media screen and (max-width: 1024px)
		&.is100, &.is50
			height: 40vh
			margin-top: 64px
		img
			object-fit: cover
			object-position: center center
			width: 100%
			height: 100%

</style>