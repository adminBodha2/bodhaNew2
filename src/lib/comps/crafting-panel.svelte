<svelte:options runes={true} />

<script lang="ts">
	import { browser } from '$app/environment';
	import { forgeStore, findRecipe } from '$lib/utils/forge-store.svelte';
	import type { ForgeConfig, Recipe } from '$lib/utils/dhatu-forge';
	import type { Snippet } from 'svelte';

	type Props = {
		forgeConfig: ForgeConfig;
		asModal?: boolean;
		onClose?: () => void;
		header?: Snippet;
	};

	let { forgeConfig, asModal = false, onClose, header }: Props = $props();

	let activeDhatu = $state<string | null>(null);
	let activePrefix = $state<string | null>(null);
	let lastResult = $state<{ recipe: Recipe | null }>({ recipe: null });
	let showLevelUp = $state(false);
	let showResetDialog = $state(false);
	let detailEntry = $state<(typeof forgeStore.forgedLog)[number] | null>(null);

	const thresholds = $derived(forgeConfig.levels.thresholds);
	const nextThreshold = $derived(thresholds[Math.min(forgeStore.playerLevel, thresholds.length - 1)]);
	const progressPct = $derived(Math.min(100, (forgeStore.forgedLog.length / nextThreshold) * 100));
	const craftedKeys = $derived(new Set(forgeStore.forgedLog.map((e) => e.key)));
	const totalCrafted = $derived(forgeStore.forgedLog.length);

	function isLocked(dhatuLevel: number): boolean {
		return dhatuLevel > forgeStore.playerLevel;
	}

	function selectDhatu(dhatuId: string): void {
		const dhatu = forgeConfig.dhatus.find((d) => d.id === dhatuId);
		if (!dhatu || isLocked(dhatu.level)) return;
		activeDhatu = dhatuId;
		activePrefix = null;
		lastResult = { recipe: null };
	}

	function selectPrefix(prefixId: string): void {
		if (
			forgeConfig.prefixes.some((p) => p.id === prefixId) &&
			(!activeDhatu || prefixHasRecipe(prefixId))
		) {
			activePrefix = prefixId;
			lastResult = { recipe: null };
		}
	}

	const availablePrefixIds = $derived(
		activeDhatu
			? new Set(
					Object.keys(forgeConfig.recipes)
						.filter((k) => k.startsWith(activeDhatu + '+'))
						.map((k) => k.split('+')[1])
				)
			: new Set<string>()
	);

	function prefixHasRecipe(prefixId: string): boolean {
		return availablePrefixIds.has(prefixId);
	}

	function craft(): void {
		if (!activeDhatu || !activePrefix) return;
		const found = findRecipe(forgeConfig, activeDhatu, activePrefix);
		lastResult = { recipe: found?.recipe ?? null };
		if (!found) return;
		if (craftedKeys.has(found.key)) return;
		const { leveledUp } = forgeStore.addForged(activeDhatu, activePrefix, found.recipe, thresholds);
		if (leveledUp) {
			showLevelUp = true;
			setTimeout(() => (showLevelUp = false), 2000);
		}
	}

	function resetProgress(): void {
		if (!browser) return;
		forgeStore.reset();
		activeDhatu = null;
		activePrefix = null;
		lastResult = { recipe: null };
		showResetDialog = false;
	}

	function dismiss(): void {
		onClose?.();
	}

	function onOverlayKey(e: KeyboardEvent): void {
		if (e.key === 'Escape') dismiss();
	}
</script>

{#if asModal}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class="modal-overlay"
		onclick={(e) => {
			if (e.target === e.currentTarget) dismiss();
		}}
		onkeydown={onOverlayKey}
		role="presentation"
	>
		<div class="modal-dialog modal-dialog-forge glass-1 radius8 box rgap16" role="dialog" aria-modal="true" aria-label="Forge" tabindex="-1">
			<div class="row ycenter xbetween forge-modal-head">
				<p class="txt-xl w600">Forge</p>
				<button class="small-button plain" onclick={dismiss}>Close</button>
			</div>
			<div class="forge-modal-body">
				{@render panelBody()}
			</div>
		</div>
	</div>
{:else}
	{@render panelBody()}
{/if}

{#snippet panelBody()}
	{#if header}
		{@render header()}
	{/if}

	<!-- ── Player progress ─────────────────────── -->
	<div class="box gap8">
		<div class="row ycenter xbetween mwrap rgap8">
			<div class="row ycenter gap16">
				<p class="txt-bs w600">Level {forgeStore.playerLevel}</p>
				<p class="txt-bs w600">{totalCrafted} / {nextThreshold} crafted</p>
				<p class="txt-bs grey1">Craft new dhātu combinations to level up and unlock higher-level dhātus.</p>
			</div>
			<div id="reset-button">
				<button class="filter-button" onclick={() => (showResetDialog = true)}>Reset Progress</button>
			</div>
		</div>
		<div class="progress-bar">
			<div class="progress-fill" style="width: {progressPct}%"></div>
		</div>
		{#if showLevelUp}
			<p class="txt-sm w600 theme">Level Up!</p>
		{/if}
	</div>

	<div class="box forging">
		<div class="forge-grid">
			<div class="box rgap16">
				<p class="tt-u w500">Inventory</p>
				<div class="grid grid-cols-3 lg:grid-cols-4 white-grid">
					{#each forgeConfig.dhatus as dhatu}
						<button
							id="dhatu-{dhatu.id}"
							class="dhatu-card whitecard"
							class:active={activeDhatu === dhatu.id}
							class:locked={isLocked(dhatu.level)}
							disabled={isLocked(dhatu.level)}
							onclick={() => selectDhatu(dhatu.id)}
						>
							<p class="txt-lg w600">{dhatu.root}</p>
							<p class="txt-sm grey2">{dhatu.meaning}</p>
							<p class="txt-xs tt-u grey0 ptop8">
								{#if isLocked(dhatu.level)}
									Locked · Level {dhatu.level}
								{:else}
									Level {dhatu.level}
								{/if}
							</p>
						</button>
					{/each}
				</div>
			</div>
			<div class="box rgap16">
				<div class="box rgap8">
					<p class="tt-u w500">FORGE</p>
					<p class="txt-sm grey2">Select an unlocked dhātu and a prefix, then tap the forge to craft.</p>
				</div>
				<button
					class="forge-area radius8 box xcenter ta-c width100"
					disabled={!activeDhatu || !activePrefix}
					onclick={craft}
				>
					{#if activeDhatu && activePrefix && lastResult.recipe}
						<div class="box rgap12 ta-l width100">
							<p class="txt-2xl w600 theme">{lastResult.recipe.name}</p>
							<p class="txt-sm grey1 italic">{lastResult.recipe.derivation}</p>
							<p class="txt-bs lh15">{lastResult.recipe.meaning}</p>
							<div class="glass-3 p12 radius4">
								<p class="txt-sm lh14 grey2">{lastResult.recipe.civ}</p>
							</div>
						</div>
					{:else if activeDhatu && activePrefix}
						<div class="box xcenter rgap8">
							<p class="txt-lg w500 theme">Ready to craft</p>
							<p class="txt-sm grey1">Tap to forge {activeDhatu} + {activePrefix}</p>
						</div>
					{:else}
						<div class="box xcenter rgap8">
							<p class="txt-lg grey2">Select a dhātu and prefix</p>
							<p class="txt-sm grey0">Then tap here to forge</p>
						</div>
					{/if}
				</button>

				<div class="box rgap8">
					<p class="tt-u w500">Prefixes</p>
					<div class="row wrap cgap8 rgap8">
						{#each forgeConfig.prefixes as prefix}
							<button
								class="prefix-btn"
								class:active={activePrefix === prefix.id}
								class:norecipe={!!activeDhatu && !prefixHasRecipe(prefix.id)}
								disabled={!activeDhatu || !prefixHasRecipe(prefix.id)}
								onclick={() => selectPrefix(prefix.id)}
							>
								{prefix.label}
							</button>
						{/each}
					</div>
				</div>
				<div class="box rgap8">
					<p class="tt-u w500">FORGED ({forgeStore.forgedLog.length})</p>
					{#if forgeStore.forgedLog.length === 0}
						<p class="txt-sm grey1">Nothing forged yet. Select a dhātu and prefix, then tap the forge.</p>
					{:else}
						<div class="forged-grid" id="forged-items">
							{#each forgeStore.forgedLog as entry}
								<button
									class="glass-3 p12 radius4 box rgap4 forged-item"
									onclick={() => (detailEntry = entry)}
								>
									<p class="txt-sm w600 theme">{entry.name}</p>
									<p class="txt-xs grey1 italic">{entry.derivation}</p>
								</button>
							{/each}
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
{/snippet}

{#if showResetDialog}
	<div
		class="modal-overlay"
		onclick={() => (showResetDialog = false)}
		onkeydown={(e) => e.key === 'Escape' && (showResetDialog = false)}
		role="presentation"
	>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class="modal-dialog glass-1 p32 radius8 box xcenter rgap16"
			onclick={(e) => e.stopPropagation()}
			role="dialog"
			aria-modal="true"
			aria-label="Confirm reset"
			tabindex="-1"
		>
			<p class="txt-xl w500 ta-c">Are you sure you want to reset your progress?</p>
			<p class="txt-bs grey1 ta-c">This will return you to Level 1!</p>
			<div class="row xcenter gap16">
				<button class="main-btn" onclick={() => (showResetDialog = false)}>Cancel</button>
				<button class="main-btn active" onclick={resetProgress}>Reset</button>
			</div>
		</div>
	</div>
{/if}

{#if detailEntry}
	<div
		class="modal-overlay"
		onclick={() => (detailEntry = null)}
		onkeydown={(e) => e.key === 'Escape' && (detailEntry = null)}
		role="presentation"
	>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class="modal-dialog modal-dialog-wide glass-1 p32 radius8 box rgap16"
			onclick={(e) => e.stopPropagation()}
			role="dialog"
			aria-modal="true"
			aria-label={detailEntry.name}
			tabindex="-1"
		>
			<div class="row ycenter xbetween">
				<p class="txt-2xl w600 theme">{detailEntry.name}</p>
				<button class="small-button plain" onclick={() => (detailEntry = null)}>Close</button>
			</div>
			<p class="txt-sm grey1 italic">{detailEntry.derivation}</p>
			<p class="txt-bs lh15">{detailEntry.meaning}</p>
			<div class="glass-3 p16 radius4">
				<p class="txt-sm lh14 grey2">{detailEntry.civ}</p>
			</div>
		</div>
	</div>
{/if}

<style lang="sass">
	.progress-bar
		height: 6px
		background: var(--color-grey-0)
		overflow: hidden

	.progress-fill
		height: 100%
		background: var(--color-theme)
		transition: width 0.3s var(--es-smooth)

	.dhatu-card
		font-family: var(--fontface-sans)
		cursor: grab
		user-select: none
		border: none
		color: var(--color-primary)
		padding: 16px 8px
		text-align: center
		transition: transform 0.15s var(--es-back), border-color 0.15s, box-shadow 0.15s, opacity 0.15s
		&:hover:not(:disabled)
			background: var(--color-stone-0)
		&:active:not(:disabled)
			cursor: grabbing
		&.active
			background: var(--color-stone-3)
			border: var(--border-darker)
		&.locked
			opacity: 0.4
			cursor: default
			background: var(--color-stone-1)

	.prefix-btn
		font-family: var(--fontface-sans)
		font-size: 0.8rem
		text-transform: uppercase
		letter-spacing: 0.02rem
		padding: 0.4rem 0.9rem
		border-radius: 4px
		border: var(--border-main)
		background: var(--color-back)
		color: var(--color-primary)
		cursor: pointer
		transition: all 0.12s var(--es-smooth)
		&:hover:not(:disabled)
			background: var(--color-theme)
			color: #fff
			border-color: var(--color-theme)
		&.active
			background: var(--color-theme-dark)
			color: #fff
			border-color: var(--color-theme-dark)
		&:disabled
			opacity: 0.4
			cursor: default
		&.norecipe
			opacity: 0.3
			cursor: default

	.forge-area
		font-family: var(--fontface-sans)
		border: 2px dashed var(--color-border-dark)
		cursor: pointer
		transition: border-color 0.15s, background 0.15s
		&:hover:not(:disabled)
			border-color: var(--color-theme)
			background: var(--color-stone-2)
		&:disabled
			opacity: 0.5
			cursor: default

	.forged-item
		cursor: pointer
		border: none
		font-family: var(--fontface-sans)
		color: var(--color-primary)
		text-align: left
		transition: transform 0.12s var(--es-smooth)
		&:hover
			transform: translateY(-1px)

	.modal-overlay
		position: fixed
		inset: 0
		z-index: 1000
		background: rgba(0, 0, 0, 0.5)
		display: flex
		align-items: center
		justify-content: center
		padding: 1rem

	.modal-dialog
		width: 100%
		background: var(--color-back)
		&.modal-dialog-forge
			width: 100%
			height: max-content
			max-height: calc(100vh - 2rem)
			padding: 1.25rem
			display: flex
			flex-direction: column
			gap: 1rem

	.forge-modal-head
		flex-shrink: 0

	.forge-modal-body
		overflow-y: auto
		overscroll-behavior: contain
		display: flex
		flex-direction: column
		gap: 1rem

	.forge-grid
		display: grid
		grid-template-columns: 1fr
		gap: 1rem
		@media (min-width: 900px)
			grid-template-columns: 1.1fr 1fr
			gap: 1.5rem

	.forged-grid
		display: grid
		grid-template-columns: 1fr
		gap: 8px
		@media (min-width: 700px)
			grid-template-columns: repeat(2, 1fr)
		@media (min-width: 1000px)
			grid-template-columns: repeat(3, 1fr)
</style>
