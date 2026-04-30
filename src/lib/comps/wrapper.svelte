<script lang="ts">

	let { children } = $props();

</script>

<div class="page-wrapper">
	<div class="content-wrapper">
		  {@render children?.()}
	</div>
</div>

<style lang="sass">

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