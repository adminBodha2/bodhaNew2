<svelte:options runes={true} />

<script lang="ts">
	type Props = {
		x: number;
		y: number;
		nearby: boolean;
	};

	let { x, y, nearby }: Props = $props();
</script>

<div class="forge-marker" class:nearby style="left: {x - 40}px; top: {y - 40}px;">
	<div class="forge-sprite">FORGE</div>
	{#if nearby}
		<div class="forge-hint">Press E to craft</div>
	{/if}
</div>

<style lang="sass">
	.forge-marker
		position: absolute
		width: 80px
		height: 80px
		display: flex
		align-items: center
		justify-content: center
		z-index: 6
		pointer-events: none
		transition: transform 0.2s var(--es-smooth)

	.forge-sprite
		width: 80px
		height: 80px
		background: #4a2a1a
		color: #fc4
		font-family: var(--fontface-sans)
		font-size: 0.75rem
		font-weight: 800
		letter-spacing: 0.05em
		display: flex
		align-items: center
		justify-content: center
		border: 3px solid #fc4
		border-radius: 4px
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3)

	.forge-marker.nearby
		transform: scale(1.05)
		.forge-sprite
			background: #6a3a1a
			box-shadow: 0 0 24px rgba(252, 204, 0, 0.6)

	.forge-hint
		position: absolute
		bottom: -28px
		left: 50%
		transform: translateX(-50%)
		background: var(--color-theme, #7a4a2a)
		color: #fff
		padding: 4px 10px
		font-size: 0.7rem
		font-weight: 600
		border-radius: 3px
		white-space: nowrap
</style>
