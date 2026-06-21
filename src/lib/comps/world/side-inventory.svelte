<svelte:options runes={true} />

<script lang="ts">
	import type { Pickup } from '$lib/utils/dhatu-forge-world';
	import type { Dhatu, Prefix, ForgeConfig } from '$lib/utils/dhatu-forge';
	import { forgeStore } from '$lib/utils/forge-store.svelte';

	type Props = {
		pickups: Pickup[];
		dhatus: Dhatu[];
		prefixes: Prefix[];
		forgeConfig: ForgeConfig;
	};

	let { pickups, dhatus, prefixes, forgeConfig }: Props = $props();

	const thresholds = $derived(forgeConfig.levels.thresholds);
	const nextThreshold = $derived(
		thresholds[Math.min(forgeStore.playerLevel, thresholds.length - 1)]
	);
	const progressPct = $derived(
		Math.min(100, (forgeStore.forgedLog.length / nextThreshold) * 100)
	);

	const collectedDhatuIds = $derived(
		Array.from(
			new Set(
				pickups.filter((p) => p.type === 'dhatu' && p.collected).map((p) => p.refId)
			)
		)
	);

	const collectedPrefixIds = $derived(
		Array.from(
			new Set(
				pickups.filter((p) => p.type === 'prefix' && p.collected).map((p) => p.refId)
			)
		)
	);

	function dhatuLabel(id: string): string {
		return dhatus.find((d) => d.id === id)?.root ?? id;
	}
	function prefixLabel(id: string): string {
		return prefixes.find((p) => p.id === id)?.label ?? id;
	}
</script>

<aside class="side-inventory">
	<div class="si-section">
		<p class="tt-u w500">Progress</p>
		<p class="txt-bs w600">Level {forgeStore.playerLevel}</p>
		<p class="txt-bs grey1">
			{forgeStore.forgedLog.length} / {nextThreshold} crafted
		</p>
		<div class="si-bar">
			<div class="si-bar-fill" style="width: {progressPct}%"></div>
		</div>
	</div>

	<div class="si-section">
		<p class="tt-u w500">Dhātus ({collectedDhatuIds.length})</p>
		{#if collectedDhatuIds.length === 0}
			<p class="txt-sm grey1">Walk over a dhātu to collect.</p>
		{:else}
			<div class="si-list">
				{#each collectedDhatuIds as id}
					<span class="si-chip dhatu">{dhatuLabel(id)}</span>
				{/each}
			</div>
		{/if}
	</div>

	<div class="si-section">
		<p class="tt-u w500">Prefixes ({collectedPrefixIds.length})</p>
		{#if collectedPrefixIds.length === 0}
			<p class="txt-sm grey1">Walk over a prefix to collect.</p>
		{:else}
			<div class="si-list">
				{#each collectedPrefixIds as id}
					<span class="si-chip prefix">{prefixLabel(id)}</span>
				{/each}
			</div>
		{/if}
	</div>

	<div class="si-section">
		<p class="tt-u w500">Forged ({forgeStore.forgedLog.length})</p>
		{#if forgeStore.forgedLog.length === 0}
			<p class="txt-sm grey1">No recipes forged yet.</p>
		{:else}
			<div class="si-forged">
				{#each forgeStore.forgedLog as entry}
					<p class="si-forged-row">{entry.name}</p>
				{/each}
			</div>
		{/if}
	</div>
</aside>

<style lang="sass">
	.side-inventory
		position: relative
		width: 240px
		min-width: 240px
		background: var(--color-stone-0, #f4efe4)
		border: 1px solid var(--color-border-dark, #b6a98a)
		padding: 1rem
		display: flex
		flex-direction: column
		gap: 1rem
		overflow-y: auto
		max-height: 1000px
		font-family: var(--fontface-sans)
		@media (max-width: 899px)
			width: 100%
			min-width: 0
			max-height: 1060px
			flex-direction: row
			flex-wrap: wrap
			gap: 0.75rem 1.25rem
			padding: 0.75rem 1rem

	.si-section
		display: flex
		flex-direction: column
		gap: 0.25rem
		@media (max-width: 899px)
			flex: 1 1 140px
			min-width: 140px

	.si-bar
		height: 4px
		background: var(--color-grey-0, #ddd)
		overflow: hidden
		margin-top: 4px

	.si-bar-fill
		height: 100%
		background: var(--color-theme, #7a4a2a)
		transition: width 0.3s var(--es-smooth)

	.si-list
		display: flex
		flex-wrap: wrap
		gap: 4px
		margin-top: 4px

	.si-chip
		font-size: 0.7rem
		font-weight: 600
		padding: 2px 8px
		border-radius: 3px
		letter-spacing: 0.02em
		&.dhatu
			background: #d4a373
			color: #fff
		&.prefix
			background: #6b9080
			color: #fff

	.si-forged
		display: flex
		flex-direction: column
		gap: 2px
		max-height: 200px
		overflow-y: auto
		margin-top: 4px

	.si-forged-row
		font-size: 0.75rem
		color: var(--color-primary, #2a1a0a)
		padding: 2px 4px
		border-bottom: 1px solid rgba(0, 0, 0, 0.06)
</style>
