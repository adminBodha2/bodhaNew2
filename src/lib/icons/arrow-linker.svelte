<script lang="ts">

	import Arrow from '$lib/icons/shoot-arrow.svelte'
	export let isTime = false

	let color = 'var(--themealtold)'

	function handleHoverInOut(newColor:string){
		color = newColor;
		isTime = !isTime
	}

	function toggleTime (){
			isTime = !isTime
	}

</script>

<button class="row cgap8 ycenter" on:mouseenter={() => handleHoverInOut('var(--theme)')} on:mouseleave={() => handleHoverInOut('var(--themealtold)')}> 
	<Arrow color={color} goTime={isTime}/><slot></slot>
</button>

<style lang="sass">

button
	background: none
	border: none
	padding: 0
	transition: all 0.089s ease
	&:hover
		transform: translateX(-5px)

</style>