<script lang="ts">

	import type { Snippet } from 'svelte';
	type Props = {
		graphing?: boolean;
		children?: Snippet;
	};
	let {
		graphing = false,
		children
	}: Props = $props();

</script>

<div class="page-wrapper" class:graphed={graphing}>
	<div class="content-wrapper">
		  {@render children?.()}
	</div>
</div>

<style lang="sass">

.page-wrapper.graphed
	z-index: 0
	background-image: linear-gradient(rgba(0,0,0,0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.01) 1px, transparent 1px), linear-gradient(rgba(0,0,0,0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.01) 1px, transparent 1px)
	background-position: center center
	@media screen and (max-width: 1024px)
		background-size: 3rem 3rem, 3rem 3rem
		background-image: linear-gradient(rgba(0,0,0,0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.01) 1px, transparent 1px)
	@media screen and (min-width: 1025px)
		transition: background-position 0.1s linear
		background-size: 5rem 5rem, 5rem 5rem, 1rem 1rem, 1rem 1rem

.page-wrapper
	min-height: 100vh
	height: 100%
	padding-bottom: 2rem
	padding-left: 12px
	padding-right: 12px
	.content-wrapper
		width: 100%
		margin-left: auto
		margin-right: auto
	@media screen and (min-width: 1025px)
		padding-bottom: 4rem
		padding-left: 1rem
		padding-right: 1rem
		.content-wrapper
			width: 992px
	@media screen and (min-width: 1201px)
		padding-left: 1rem
		padding-right: 1rem
		.content-wrapper
			width: 1168px
	@media screen and (min-width: 1441px)
		padding-left: 1rem
		padding-right: 1rem
		.content-wrapper
			width: 1408px
	@media screen and (min-width: 1601px)
		padding-left: 4rem
		padding-right: 4rem
		.content-wrapper
			width: 1472px


</style>