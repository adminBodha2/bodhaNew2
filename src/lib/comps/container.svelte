<script lang="ts">

	export let narrow = false

</script>

<div class="pbot64 column" class:narrow={narrow}>
  <slot></slot>
</div>

<style lang="sass">

.pbot64.column
	min-height: calc(100vh - 72px)
	padding-left: 16px
	padding-right: 16px
	&.narrow
		width: 100%
		place-self: center
	@media screen and (min-width: 1025px)
		padding-left: 32px
		padding-right: 32px
		&.narrow
			width: 928px
			padding-left: 0
			padding-right: 0
	@media screen and (min-width: 1201px)
		padding-left: 64px
		padding-right: 64px
		&.narrow
			width: 1136px
			padding-left: 0
			padding-right: 0
	@media screen and (min-width: 1441px)
		padding-left: 80px
		padding-right: 80px
		&.narrow
			width: 1280px
			padding-left: 0
			padding-right: 0

</style>