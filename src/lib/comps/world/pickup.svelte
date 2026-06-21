<svelte:options runes={true} />

<script lang="ts">
	import type { Pickup } from '$lib/utils/dhatu-forge-world';

	type Props = {
		pickup: Pickup;
		label: string;
		collected: boolean;
	};

	let { pickup, label, collected }: Props = $props();
</script>

{#if !collected}
	<div
		class="pickup"
		class:dhatu={pickup.type === 'dhatu'}
		class:prefix={pickup.type === 'prefix'}
		style="left: {pickup.x - 24}px; top: {pickup.y - 24}px;"
	>
		<div class="pickup-sprite">
			<span class="pickup-type">{pickup.type === 'dhatu' ? 'DH' : 'PR'}</span>
			<span class="pickup-label">{label}</span>
		</div>
	</div>
{/if}

<style lang="sass">
	.pickup
		position: absolute
		width: 48px
		height: 48px
		display: flex
		align-items: center
		justify-content: center
		z-index: 5
		pointer-events: none

	.pickup-sprite
		width: 100%
		height: 100%
		display: flex
		flex-direction: column
		align-items: center
		justify-content: center
		border-radius: 6px
		border: 2px solid #fff
		font-family: var(--fontface-sans)
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2)
		padding: 2px

	.dhatu .pickup-sprite
		background: #d4a373
		color: #fff

	.prefix .pickup-sprite
		background: #6b9080
		color: #fff

	.pickup-type
		font-size: 0.55rem
		letter-spacing: 0.05em
		opacity: 0.8

	.pickup-label
		font-size: 0.6rem
		font-weight: 600
		text-align: center
		line-height: 1.05
		max-width: 44px
		overflow: hidden
		text-overflow: ellipsis
</style>
