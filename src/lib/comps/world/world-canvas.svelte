<svelte:options runes={true} />

<script lang="ts">
	import type { Biome, Pickup } from '$lib/utils/dhatu-forge-world';
	import type { Dhatu, Prefix } from '$lib/utils/dhatu-forge';
	import Avatar from './avatar.svelte';
	import PickupItem from './pickup.svelte';
	import Gate from './gate.svelte';
	import ForgeMarker from './forge-marker.svelte';

	type Props = {
		worldWidth: number;
		worldHeight: number;
		biomes: Biome[];
		dhatus: Dhatu[];
		prefixes: Prefix[];
		pickups: Pickup[];
		avatarX: number;
		avatarY: number;
		playerLevel: number;
		cameraX: number;
		cameraY: number;
		viewportWidth: number;
		viewportHeight: number;
		nearbyForge: number | null;
		targetX: number | null;
		targetY: number | null;
		onClickWorld: (x: number, y: number) => void;
	};

	let {
		worldWidth,
		worldHeight,
		biomes,
		dhatus,
		prefixes,
		pickups,
		avatarX,
		avatarY,
		playerLevel,
		cameraX,
		cameraY,
		viewportWidth,
		viewportHeight,
		nearbyForge,
		targetX,
		targetY,
		onClickWorld,
	}: Props = $props();

	function dhatuLabel(id: string): string {
		return dhatus.find((d) => d.id === id)?.root ?? id;
	}

	function prefixLabel(id: string): string {
		return prefixes.find((p) => p.id === id)?.label ?? id;
	}

	function isBiomeUnlocked(biome: Biome): boolean {
		// biome 1 is always unlocked; biomes 2-5 need playerLevel >= biome.level
		if (biome.id === 1) return true;
		return playerLevel >= biome.level;
	}

	function isGateOpen(biome: Biome): boolean {
		// Gate out of biome N is open when next biome's level requirement is met
		if (!biome.gate) return true;
		const nextBiome = biomes.find((b) => b.id === biome.id + 1);
		if (!nextBiome) return true;
		return playerLevel >= nextBiome.level;
	}

	function handleClick(e: MouseEvent): void {
		// Convert viewport coords to world coords
		const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
		const localX = e.clientX - rect.left;
		const localY = e.clientY - rect.top;
		const worldX = localX + cameraX;
		const worldY = localY + cameraY;
		onClickWorld(worldX, worldY);
	}
</script>

<div
	class="viewport"
	style="width: {viewportWidth}px; height: {viewportHeight}px;"
	role="presentation"
>
	<div
		class="world"
		style="width: {worldWidth}px; height: {worldHeight}px; transform: translate({-cameraX}px, {-cameraY}px);"
		onclick={handleClick}
		role="application"
	>
		<!-- Biome backgrounds -->
		{#each biomes as biome}
			<div
				class="biome"
				class:locked={!isBiomeUnlocked(biome)}
				style="left: {biome.x}px; width: {biome.width}px; height: {worldHeight}px; background: {biome.color};"
			>
				<div class="biome-name">{biome.name}</div>
				<div class="biome-level">Level {biome.level}</div>
				{#if !isBiomeUnlocked(biome)}
					<div class="biome-locked">LOCKED</div>
				{/if}
			</div>
		{/each}

		<!-- Gates -->
		{#each biomes as biome}
			{#if biome.gate}
				{@const nextBiome = biomes.find((b) => b.id === biome.id + 1)}
				{#if nextBiome}
					<Gate
						x={biome.gate.x}
						height={worldHeight}
						open={isGateOpen(biome)}
						label={biome.gate.label}
						requiredLevel={nextBiome.level}
						currentLevel={playerLevel}
					/>
				{/if}
			{/if}
		{/each}

		<!-- Forge markers -->
		{#each biomes as biome}
			{#if biome.forge}
				<ForgeMarker
					x={biome.forge.x}
					y={biome.forge.y}
					nearby={nearbyForge === biome.id}
				/>
			{/if}
		{/each}

		<!-- Pickups -->
		{#each pickups as pickup}
			{#if pickup.type === 'dhatu'}
				<PickupItem {pickup} label={dhatuLabel(pickup.refId)} collected={pickup.collected} />
			{:else}
				<PickupItem {pickup} label={prefixLabel(pickup.refId)} collected={pickup.collected} />
			{/if}
		{/each}

		<!-- Click-to-move target indicator -->
		{#if targetX !== null && targetY !== null}
			<div class="target-marker" style="left: {targetX - 8}px; top: {targetY - 8}px;"></div>
		{/if}

		<!-- Avatar -->
		<Avatar x={avatarX} y={avatarY} />
	</div>
</div>

<style lang="sass">
	.viewport
		position: relative
		overflow: hidden
		background: #1a1a1a
		border-radius: 4px

	.world
		position: absolute
		top: 0
		left: 0
		will-change: transform
		cursor: crosshair

	.biome
		position: absolute
		top: 0
		display: flex
		flex-direction: column
		align-items: center
		justify-content: flex-start
		padding-top: 16px
		border-right: 1px dashed rgba(0, 0, 0, 0.15)
		&.locked
			filter: brightness(0.45) saturate(0.5)
			&::after
				content: ''
				position: absolute
				inset: 0
				background: rgba(0, 0, 0, 0.3)

	.biome-name
		font-family: var(--fontface-sans)
		font-size: 1.1rem
		font-weight: 700
		letter-spacing: 0.05em
		color: rgba(0, 0, 0, 0.75)
		text-transform: uppercase

	.biome-level
		font-family: var(--fontface-sans)
		font-size: 0.7rem
		color: rgba(0, 0, 0, 0.55)
		margin-top: 2px
		letter-spacing: 0.05em

	.biome-locked
		position: absolute
		top: 50%
		left: 50%
		transform: translate(-50%, -50%)
		font-family: var(--fontface-sans)
		font-size: 2rem
		font-weight: 800
		letter-spacing: 0.1em
		color: rgba(255, 255, 255, 0.85)
		text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5)

	.target-marker
		position: absolute
		width: 16px
		height: 16px
		border: 2px solid var(--color-theme, #7a4a2a)
		border-radius: 50%
		background: rgba(122, 74, 42, 0.2)
		pointer-events: none
		z-index: 8
		animation: target-pulse 1.2s infinite

	@keyframes target-pulse
		0%
			transform: scale(1)
			opacity: 1
		100%
			transform: scale(1.6)
			opacity: 0
</style>
