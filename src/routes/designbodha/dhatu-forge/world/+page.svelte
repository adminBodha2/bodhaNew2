<svelte:options runes={true} />

<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import WorldCanvas from '$lib/comps/world/world-canvas.svelte';
	import SideInventory from '$lib/comps/world/side-inventory.svelte';
	import CraftingPanel from '$lib/comps/crafting-panel.svelte';
	import { forgeStore } from '$lib/utils/forge-store.svelte';
	import { loadWorldSave, saveWorldSave } from '$lib/utils/world-save';
	import type { PageProps } from './$types';
	import type { Pickup, MovementMode } from '$lib/utils/dhatu-forge-world';
	import type { Dhatu, Prefix } from '$lib/utils/dhatu-forge';

	let { data }: PageProps = $props();

	// ── World state ───────────────────────────────
	// svelte-ignore state_referenced_locally
	let avatarX = $state(data.worldConfig.startPosition.x);
	// svelte-ignore state_referenced_locally
	let avatarY = $state(data.worldConfig.startPosition.y);
	let targetX = $state<number | null>(null);
	let targetY = $state<number | null>(null);
	let movementMode = $state<MovementMode>('free');
	let pickups = $state<Pickup[]>([]);
	let modalOpen = $state(false);
	let viewportWidth = $state(960);
	let viewportHeight = $state(600);
	let isMobile = $state(false);
	let helpPillDismissed = $state(false);
	let helpPopoverOpen = $state(false);
	let helpAutoHideTimer: ReturnType<typeof setTimeout> | null = null;
	let hasMoved = $state(false);

	const AVATAR_HALF = 28;
	const PICKUP_RADIUS = 36;
	const FORGE_RADIUS = 70;
	const FREE_SPEED = 220; // px / second
	const GRID_STEP = 32;
	const GRID_SPEED = 12; // tiles per second
	const WORLD_WIDTH = $derived(data.worldConfig.width);
	const WORLD_HEIGHT = $derived(data.worldConfig.height);

	const cameraX = $derived(
		Math.max(0, Math.min(WORLD_WIDTH - viewportWidth, avatarX - viewportWidth / 2))
	);
	const cameraY = $derived(
		Math.max(0, Math.min(WORLD_HEIGHT - viewportHeight, avatarY - viewportHeight / 2))
	);

	const keysHeld = new Set<string>();
	let lastFrame = 0;
	let rafId: number | null = null;

	// ── Seeded RNG for procedural pickup layout ───
	function seededRandom(seed: number): () => number {
		let s = seed >>> 0;
		return () => {
			s = (s * 1664525 + 1013904223) >>> 0;
			return s / 0x100000000;
		};
	}

	function generatePickupsForBiome(
		biome: (typeof data.worldConfig.biomes)[number],
		dhatus: Dhatu[]
	): Pickup[] {
		const rng = seededRandom(biome.id * 9301 + 49297);
		const result: Pickup[] = [];
		const minX = biome.x + 60;
		const maxX = biome.x + biome.width - 60;
		const minY = 80;
		const maxY = WORLD_HEIGHT - 80;

		// Avoid the forge region
		const forgePadding = 90;

		function pickPos(): { x: number; y: number } {
			// Try a few times; fall back to center
			for (let i = 0; i < 12; i++) {
				const x = minX + rng() * (maxX - minX);
				const y = minY + rng() * (maxY - minY);
				if (biome.forge) {
					const dx = x - biome.forge.x;
					const dy = y - biome.forge.y;
					if (dx * dx + dy * dy < forgePadding * forgePadding) continue;
				}
				return { x, y };
			}
			return { x: (minX + maxX) / 2, y: (minY + maxY) / 2 };
		}

		for (const dhatuId of biome.dhatuIds) {
			const { x, y } = pickPos();
			result.push({
				id: `b${biome.id}-dhatu-${dhatuId}`,
				biomeId: biome.id,
				type: 'dhatu',
				refId: dhatuId,
				x,
				y,
				collected: false,
			});
		}
		for (const prefixId of biome.prefixIds) {
			const { x, y } = pickPos();
			result.push({
				id: `b${biome.id}-prefix-${prefixId}`,
				biomeId: biome.id,
				type: 'prefix',
				refId: prefixId,
				x,
				y,
				collected: false,
			});
		}
		return result;
	}

	function initPickups(loadedPickups: Pickup[] | undefined): void {
		if (loadedPickups && loadedPickups.length > 0) {
			pickups = loadedPickups;
			return;
		}
		const all: Pickup[] = [];
		for (const biome of data.worldConfig.biomes) {
			all.push(...generatePickupsForBiome(biome, data.forgeConfig.dhatus));
		}
		pickups = all;
	}

	function persist(): void {
		saveWorldSave({
			avatarX,
			avatarY,
			pickups,
			movementMode,
		});
	}

	// ── Movement helpers ──────────────────────────
	function isGateClosedAt(x: number): boolean {
		// For each biome with a gate, check if the next biome is locked
		for (const biome of data.worldConfig.biomes) {
			if (!biome.gate) continue;
			if (Math.abs(x - biome.gate.x) < 6) {
				const nextBiome = data.worldConfig.biomes.find((b) => b.id === biome.id + 1);
				if (!nextBiome) continue;
				if (forgeStore.playerLevel < nextBiome.level) return true;
			}
		}
		return false;
	}

	function nearestBiomeAt(x: number, y: number): number | null {
		let best: { id: number; dist: number } | null = null;
		for (const biome of data.worldConfig.biomes) {
			const cx = biome.x + biome.width / 2;
			const cy = WORLD_HEIGHT / 2;
			const dx = x - cx;
			const dy = y - cy;
			const d = dx * dx + dy * dy;
			if (!best || d < best.dist) best = { id: biome.id, dist: d };
		}
		return best?.id ?? null;
	}

	function nearestForge(forgeList: { x: number; y: number; id: number }[]): number | null {
		for (const f of forgeList) {
			const dx = avatarX - f.x;
			const dy = avatarY - f.y;
			if (dx * dx + dy * dy <= FORGE_RADIUS * FORGE_RADIUS) return f.id;
		}
		return null;
	}

	const nearbyForgeId = $derived(
		nearestForge(
			data.worldConfig.biomes
				.filter((b) => b.forge)
				.map((b) => ({ x: b.forge.x, y: b.forge.y, id: b.id }))
		)
	);

	// ── Frame update ──────────────────────────────
	function update(now: number): void {
		if (!lastFrame) lastFrame = now;
		const dt = (now - lastFrame) / 1000;
		lastFrame = now;
		if (dt > 0.1) {
			rafId = requestAnimationFrame(update);
			return;
		}

		const speed = FREE_SPEED;
		let dx = 0;
		let dy = 0;

		if (movementMode === 'free') {
			if (keysHeld.has('arrowleft') || keysHeld.has('a')) dx -= 1;
			if (keysHeld.has('arrowright') || keysHeld.has('d')) dx += 1;
			if (keysHeld.has('arrowup') || keysHeld.has('w')) dy -= 1;
			if (keysHeld.has('arrowdown') || keysHeld.has('s')) dy += 1;

			// Click-to-move target
			if (
				(dx === 0 && dy === 0) &&
				targetX !== null &&
				targetY !== null
			) {
				const tdx = targetX - avatarX;
				const tdy = targetY - avatarY;
				const dist = Math.hypot(tdx, tdy);
				if (dist < 4) {
					targetX = null;
					targetY = null;
				} else {
					dx = tdx / dist;
					dy = tdy / dist;
				}
			}

			if (dx !== 0 || dy !== 0) {
				const len = Math.hypot(dx, dy) || 1;
				dx = (dx / len) * speed * dt;
				dy = (dy / len) * speed * dt;
				attemptMove(dx, dy);
			}
		} else {
			// Grid mode: discrete steps
			if (keysHeld.has('arrowleft') || keysHeld.has('a')) attemptMove(-GRID_STEP, 0);
			if (keysHeld.has('arrowright') || keysHeld.has('d')) attemptMove(GRID_STEP, 0);
			if (keysHeld.has('arrowup') || keysHeld.has('w')) attemptMove(0, -GRID_STEP);
			if (keysHeld.has('arrowdown') || keysHeld.has('s')) attemptMove(0, GRID_STEP);
		}

		checkPickupCollection();

		rafId = requestAnimationFrame(update);
	}

	function attemptMove(dx: number, dy: number): void {
		if (modalOpen) return;
		let nx = avatarX + dx;
		let ny = avatarY + dy;
		nx = Math.max(AVATAR_HALF, Math.min(WORLD_WIDTH - AVATAR_HALF, nx));
		ny = Math.max(AVATAR_HALF, Math.min(WORLD_HEIGHT - AVATAR_HALF, ny));

		// Gate blocking: if we would cross a closed gate, clamp at the gate
		if (dx > 0 && isGateClosedAt(avatarX + AVATAR_HALF) && nx > avatarX) {
			nx = avatarX;
		}
		if (dx < 0 && isGateClosedAt(avatarX - AVATAR_HALF) && nx < avatarX) {
			nx = avatarX;
		}
		avatarX = nx;
		avatarY = ny;
	}

	function checkPickupCollection(): void {
		let changed = false;
		const next = pickups.map((p) => {
			if (p.collected) return p;
			const dx = avatarX - p.x;
			const dy = avatarY - p.y;
			if (dx * dx + dy * dy < PICKUP_RADIUS * PICKUP_RADIUS) {
				changed = true;
				return { ...p, collected: true };
			}
			return p;
		});
		if (changed) {
			pickups = next;
		}
	}

	// ── Input ─────────────────────────────────────
	function onKeyDown(e: KeyboardEvent): void {
		if (modalOpen) {
			if (e.key === 'Escape') {
				modalOpen = false;
				e.preventDefault();
			}
			return;
		}
		const key = e.key.toLowerCase();
		keysHeld.add(key);
		if (e.key === 'e' || e.key === 'E') {
			if (nearbyForgeId !== null) {
				modalOpen = true;
				e.preventDefault();
			}
		}
		if (e.key === 'm' || e.key === 'M') {
			movementMode = movementMode === 'free' ? 'grid' : 'free';
			e.preventDefault();
		}
		if (e.key === '?' || e.key === '/') {
			helpPopoverOpen = !helpPopoverOpen;
			e.preventDefault();
		}
	}

	function onKeyUp(e: KeyboardEvent): void {
		keysHeld.delete(e.key.toLowerCase());
	}

	function onClickWorld(wx: number, wy: number): void {
		if (modalOpen) return;
		if (movementMode === 'grid') return;
		targetX = wx;
		targetY = wy;
	}

	function onResize(): void {
		if (!browser) return;
		const el = document.querySelector('.world-stage') as HTMLElement | null;
		if (!el) return;
		viewportWidth = el.clientWidth;
		viewportHeight = el.clientHeight;
		isMobile = window.innerWidth < 900;
	}

	function startHelpAutoHide(): void {
		if (helpAutoHideTimer) clearTimeout(helpAutoHideTimer);
		helpAutoHideTimer = setTimeout(() => {
			helpPillDismissed = true;
		}, 8000);
	}

	function dismissHelpPill(): void {
		helpPillDismissed = true;
		if (helpAutoHideTimer) {
			clearTimeout(helpAutoHideTimer);
			helpAutoHideTimer = null;
		}
	}

	function openForge(): void {
		if (nearbyForgeId !== null) modalOpen = true;
	}

	// ── Lifecycle ─────────────────────────────────
	onMount(() => {
		if (!browser) return;
		forgeStore.load();
		const saved = loadWorldSave();
		if (saved) {
			if (typeof saved.avatarX === 'number') avatarX = saved.avatarX;
			if (typeof saved.avatarY === 'number') avatarY = saved.avatarY;
			if (saved.movementMode === 'grid' || saved.movementMode === 'free') {
				movementMode = saved.movementMode;
			}
		}
		initPickups(saved?.pickups as Pickup[] | undefined);

		isMobile = window.innerWidth < 900;
		if (isMobile) {
			viewportWidth = Math.min(WORLD_WIDTH, window.innerWidth - 32);
			viewportHeight = Math.min(
				WORLD_HEIGHT,
				Math.max(360, Math.floor(window.innerHeight * 0.55))
			);
		} else {
			viewportWidth = Math.min(WORLD_WIDTH, window.innerWidth - 320);
			viewportHeight = Math.min(WORLD_HEIGHT, 600);
		}
		onResize();

		window.addEventListener('keydown', onKeyDown);
		window.addEventListener('keyup', onKeyUp);
		window.addEventListener('resize', onResize);
		rafId = requestAnimationFrame(update);

		startHelpAutoHide();
	});

	onDestroy(() => {
		if (!browser) return;
		window.removeEventListener('keydown', onKeyDown);
		window.removeEventListener('keyup', onKeyUp);
		window.removeEventListener('resize', onResize);
		if (rafId !== null) cancelAnimationFrame(rafId);
		if (helpAutoHideTimer) clearTimeout(helpAutoHideTimer);
	});

	$effect(() => {
		// Subscribe to relevant state
		void avatarX;
		void avatarY;
		void pickups;
		void movementMode;
		if (browser) persist();
	});
</script>

<svelte:head>
	<title>Dhatu Forge — World</title>
</svelte:head>

<Container>
	<section class="wrapper-std">
		<Crumb
			isSolo={true}
			showT={true}
			title="Dhatu Forge — World"
			showD={true}
			desc="Walk the five biomes. Collect roots and prefixes. Forge a civilization. Arrow keys / WASD to move · Click to glide · E to forge · M to toggle mode."
			showRow={true}
		>
			<a class="primary" href="/designbodha/dhatu-forge">
				<span>← BACK TO BENCH</span>
			</a>
		</Crumb>

		<div class="stage-row" class:mobile={isMobile}>
			<div class="world-stage">
				<WorldCanvas
					worldWidth={WORLD_WIDTH}
					worldHeight={WORLD_HEIGHT}
					biomes={data.worldConfig.biomes}
					dhatus={data.forgeConfig.dhatus}
					prefixes={data.forgeConfig.prefixes}
					{pickups}
					{avatarX}
					{avatarY}
					playerLevel={forgeStore.playerLevel}
					{cameraX}
					{cameraY}
					{viewportWidth}
					{viewportHeight}
					nearbyForge={nearbyForgeId}
					{targetX}
					{targetY}
					{onClickWorld}
				/>

				<div class="hud">
					<span class="hud-pill level-pill">Lvl {forgeStore.playerLevel}</span>
					<span class="hud-pill mode-pill">{movementMode === 'free' ? 'Free' : 'Grid'}</span>
					<button
						class="hud-pill help-pill"
						onclick={() => (helpPopoverOpen = !helpPopoverOpen)}
						aria-label="How to play"
					>
						?
					</button>
				</div>

				{#if !helpPillDismissed && !helpPopoverOpen}
					<div class="hint-pill" role="status">
						<span>← → move · click to glide · E to forge · M to toggle</span>
						<button class="hint-close" onclick={dismissHelpPill} aria-label="Dismiss hint">×</button>
					</div>
				{/if}

				{#if helpPopoverOpen}
					<div
						class="help-popover"
						role="dialog"
						aria-label="How to play"
					>
						<div class="help-popover-head">
							<p class="tt-u w500">How to play</p>
							<button class="hint-close" onclick={() => (helpPopoverOpen = false)} aria-label="Close help">×</button>
						</div>
						<ul>
							<li><b>Move:</b> Arrow keys / WASD, or tap to glide</li>
							<li><b>Collect:</b> Walk over orange (dhātu) or teal (prefix) tokens</li>
							<li><b>Forge:</b> Walk to a FORGE and press <b>E</b> (or tap the FORGE button)</li>
							<li><b>Unlock next biome:</b> Craft recipes; the gate opens when you level up</li>
							<li><b>Toggle mode:</b> Press <b>M</b> for grid snap</li>
						</ul>
					</div>
				{/if}

				{#if nearbyForgeId !== null && !modalOpen}
					<button class="interact-btn" onclick={openForge}>
						<span class="interact-key">E</span>
						<span>Forge</span>
					</button>
				{/if}
			</div>

			<SideInventory
				{pickups}
				dhatus={data.forgeConfig.dhatus}
				prefixes={data.forgeConfig.prefixes}
				forgeConfig={data.forgeConfig}
			/>
		</div>
	</section>
</Container>

{#if modalOpen}
	<CraftingPanel forgeConfig={data.forgeConfig} asModal onClose={() => (modalOpen = false)} />
{/if}

<style lang="sass">
	.wrapper-std
		display: flex
		flex-direction: column
		gap: 1rem

	.stage-row
		display: flex
		gap: 1rem
		align-items: flex-start
		flex-direction: row
		&.mobile
			flex-direction: column
			gap: 0.75rem

	.world-stage
		position: relative
		flex: 1
		min-width: 320px
		max-width: 100%
		width: 100%
		height: 600px
		.mobile &
			height: 55vh
			min-height: 360px
			max-height: 600px

	.hud
		position: absolute
		top: 10px
		left: 10px
		right: 10px
		display: flex
		gap: 6px
		z-index: 20
		pointer-events: auto
		justify-content: space-between

	.hud-pill
		background: rgba(0, 0, 0, 0.78)
		color: #fff
		padding: 5px 10px
		border-radius: 12px
		font-family: var(--fontface-sans)
		font-size: 0.72rem
		font-weight: 600
		letter-spacing: 0.04em
		border: none
		&.help-pill
			cursor: pointer
			width: 26px
			height: 26px
			padding: 0
			display: flex
			align-items: center
			justify-content: center
			font-size: 0.9rem
			border-radius: 50%

	.hint-pill
		position: absolute
		bottom: 14px
		left: 50%
		transform: translateX(-50%)
		display: flex
		align-items: center
		gap: 8px
		background: rgba(0, 0, 0, 0.78)
		color: #fff
		padding: 6px 10px 6px 14px
		border-radius: 14px
		font-family: var(--fontface-sans)
		font-size: 0.72rem
		font-weight: 500
		letter-spacing: 0.02em
		z-index: 20
		max-width: calc(100% - 24px)
		white-space: nowrap
		overflow: hidden
		text-overflow: ellipsis
		.mobile &
			font-size: 0.62rem
			padding: 4px 8px 4px 10px
			bottom: 8px
		span
			overflow: hidden
			text-overflow: ellipsis

	.hint-close
		background: transparent
		border: none
		color: #fff
		opacity: 0.7
		cursor: pointer
		padding: 0 2px
		font-size: 1.1rem
		line-height: 1
		&:hover
			opacity: 1

	.help-popover
		position: absolute
		top: 52px
		right: 10px
		background: rgba(20, 14, 8, 0.95)
		color: #fff
		padding: 12px 14px
		border-radius: 8px
		font-family: var(--fontface-sans)
		font-size: 0.78rem
		max-width: 280px
		width: calc(100% - 20px)
		z-index: 30
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4)
		ul
			margin: 8px 0 0
			padding-left: 1.1rem
		li
			margin-bottom: 4px
			line-height: 1.35
		b
			color: #fc4
		.mobile &
			top: 48px
			right: 8px
			font-size: 0.72rem
			max-width: 220px

	.help-popover-head
		display: flex
		justify-content: space-between
		align-items: center
		gap: 8px

	.interact-btn
		position: absolute
		bottom: 60px
		left: 50%
		transform: translateX(-50%)
		display: flex
		align-items: center
		gap: 8px
		background: var(--color-theme, #7a4a2a)
		color: #fff
		border: none
		padding: 10px 18px
		border-radius: 22px
		font-family: var(--fontface-sans)
		font-size: 0.85rem
		font-weight: 700
		letter-spacing: 0.05em
		text-transform: uppercase
		cursor: pointer
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4)
		z-index: 25
		animation: interact-pulse 1.4s infinite var(--es-smooth)
		.mobile &
			bottom: 80px
			padding: 12px 22px
			font-size: 0.95rem

	.interact-key
		display: inline-flex
		align-items: center
		justify-content: center
		width: 22px
		height: 22px
		background: #fff
		color: var(--color-theme, #7a4a2a)
		border-radius: 4px
		font-size: 0.78rem
		font-weight: 800

	@keyframes interact-pulse
		0%
			transform: translateX(-50%) scale(1)
		50%
			transform: translateX(-50%) scale(1.05)
		100%
			transform: translateX(-50%) scale(1)
</style>
