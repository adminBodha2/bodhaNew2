<svelte:options runes={true} />

<script lang="ts">
	type Props = {
		x: number;
		height: number;
		open: boolean;
		label: string;
		requiredLevel: number;
		currentLevel: number;
	};

	let { x, height, open, label, requiredLevel, currentLevel }: Props = $props();
</script>

<div
	class="gate"
	class:open
	style="left: {x - 4}px; height: {height}px;"
>
	<div class="gate-bar"></div>
	<div class="gate-label">
		{#if open}
			{label}
		{:else}
			LOCKED<br /><span class="gate-level">Needs Level {requiredLevel} · You: {currentLevel}</span>
		{/if}
	</div>
</div>

<style lang="sass">
	.gate
		position: absolute
		top: 0
		width: 8px
		display: flex
		align-items: center
		justify-content: center
		z-index: 4
		pointer-events: none

	.gate-bar
		position: absolute
		top: 0
		left: 0
		width: 8px
		height: 100%
		background: #3a2a1a
		opacity: 1
		transition: opacity 0.4s var(--es-smooth)

	.gate.open .gate-bar
		opacity: 0.08

	.gate-label
		position: relative
		background: rgba(0, 0, 0, 0.85)
		color: #fff
		font-family: var(--fontface-sans)
		font-size: 0.6rem
		font-weight: 700
		letter-spacing: 0.05em
		padding: 4px 8px
		text-align: center
		white-space: nowrap
		border-radius: 3px
		transform: rotate(-90deg)

	.gate.open .gate-label
		background: rgba(123, 158, 107, 0.95)

	.gate-level
		font-size: 0.5rem
		opacity: 0.85
		font-weight: 500
</style>
