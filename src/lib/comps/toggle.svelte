<script lang="ts">

  export let isToggled = false

</script>

<div class="togglebox row small" class:toggled={isToggled}>
  <div class="togglecircle"></div>
</div>

<style lang="sass">

.togglebox
	position: relative
	width: 40px
	height: 20px
	border-radius: 20px
	background: var(--color-grey-2)
	border: 2px solid var(--color-grey-2)
	align-items: center
	padding-left: 2px
	padding-right: 6px
	justify-content: space-between
	transition: all 0.12s cubic-bezier(0.455, 0.890, 0.260, 0.965)
	.togglecircle
		width: 13px
		height: 13px
		border-radius: 6px
		background: var(--color-back)
		transition: background 0.12s cubic-bezier(0.455, 0.890, 0.260, 0.965), transform 0.12s cubic-bezier(0.455, 0.890, 0.260, 0.965)
	&:hover
		background: var(--color-theme)
		border: 2px solid var(--color-theme)

.togglebox.toggled
	background: var(--color-back)
	padding-left: 6px
	padding-right: 2px
	border: 2px solid var(--color-grey-1)
	.togglecircle
		background: var(--color-primary)
		transform: translateX(16px)
	.togglecircle
		background:  var(--color-grey-1)

</style>