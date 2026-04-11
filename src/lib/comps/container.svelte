<div class="stdpad pbot64">
  <slot></slot>
</div>

<style lang="sass">

.stdpad.pbot64
	@media screen and (min-width: 1025px)
		min-height: calc(100vh - 72px)
	@media screen and (max-width: 1024px)
		min-height: calc(100vh - 72px)

</style>