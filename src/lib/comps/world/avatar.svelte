<svelte:options runes={true} />

<script lang="ts">
	type Props = {
		x: number;
		y: number;
		size?: number;
	};

	let { x, y, size = 56 }: Props = $props();
</script>

<div
	class="avatar"
	style="left: {x - size / 2}px; top: {y - size / 2}px; width: {size}px; height: {size}px;"
>
	<div class="avatar-sprite">AVATAR</div>
</div>

<style lang="sass">
	.avatar
		position: absolute
		pointer-events: none
		z-index: 10
		display: flex
		align-items: center
		justify-content: center

	.avatar-sprite
		width: 100%
		height: 100%
		background: var(--color-theme, #7a4a2a)
		color: #fff
		font-family: var(--fontface-sans)
		font-size: 0.65rem
		font-weight: 700
		letter-spacing: 0.05em
		border-radius: 50%
		display: flex
		align-items: center
		justify-content: center
		border: 2px solid #fff
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25)
</style>
