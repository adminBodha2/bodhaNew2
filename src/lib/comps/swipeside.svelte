<script lang="ts">

	import { createEventDispatcher } from 'svelte'
	export let label = ' '
	export let active = false
	const dispatch = createEventDispatcher();
	import Concepts from '$lib/icons/icon-concepts.svelte'

</script>
<button class="filterbutton" class:active={active}
	on:click
	on:mouseenter
	on:mouseleave
>
<Concepts color="#e8e8e8"/>
<p>{label}</p>
</button>



<style lang="sass">

button.filterbutton
	display: flex
	flex-direction: row
	align-items: center
	border: unset
	border-radius: 8px
	color: #212121
	z-index: 1
	background: #e8e8e8
	position: relative
	font-weight: 700
	font-size: 17px
	box-shadow: 4px 4px 7px -3px rgba(0,0,0,0.27)
	transition: all 250ms
	overflow: hidden
	padding: 8px
	&::before
		content: ""
		position: absolute
		top: 0
		left: 0
		height: 100%
		width: 0
		border-radius: 15px
		background-color: #212121
		z-index: -1
		-webkit-box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27)
		box-shadow: 4px 8px 19px -3px rgba(0,0,0,0.27)
		transition: all 250ms
	&:hover
		color: #FFFFFF
		box-shadow: 4px 4px 7px -3px rgba(0,0,0,0)
		&::before
			width: 100%

</style>