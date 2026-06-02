<script lang="ts" generics="T = string">
	// Requires: npm install @floating-ui/dom   (same as the builder version)
	import { tick, type Snippet } from 'svelte';
	import { fade } from 'svelte/transition';
	import { autoUpdate, computePosition, flip, shift, size, offset } from '@floating-ui/dom';
	import { type Option, type Group } from '$lib/comps/standalone-select/types'

	type Props = {
		/** Flat list of options */
		options?: Option<T>[];
		/** Grouped options (renders with group labels) */
		groups?: Group<T>[];

		/** Controlled selected value (single-select) */
		selected?: Option<T> | null;
		/** Change handler */
		onSelect?: (opt: Option<T> | null) => void;

		/** Placeholder when nothing is selected */
		placeholder?: string;

		/** Positioning config (matches the builder API) */
		positioning?: {
			placement?: 'top' | 'bottom' | 'top-start' | 'bottom-start' | any;
			sameWidth?: boolean;
			fitViewport?: boolean;
			gutter?: number;
		};

		// Individual positioning props (also supported for convenience)
		placement?: 'top' | 'bottom' | 'top-start' | 'bottom-start' | any;
		sameWidth?: boolean;
		fitViewport?: boolean;
		gutter?: number;

		/** Visual */
		class?: string;
		menuClass?: string;
		itemClass?: string;

		/** Advanced */
		disabled?: boolean;
		forceVisible?: boolean;
		preventScroll?: boolean;
	};

	let {
		options = [],
		groups = [],
		selected = $bindable(null),
		onSelect,
		placeholder = 'Select...',
		positioning,
		placement = positioning?.placement ?? 'bottom',
		sameWidth = positioning?.sameWidth ?? true,
		fitViewport = positioning?.fitViewport ?? true,
		gutter = positioning?.gutter,
		class: rootClass = '',
		menuClass = '',
		itemClass = '',
		disabled = false,
		forceVisible = false,
		preventScroll = true,
	}: Props = $props();

	// Internal state
	let open = $state(false);
	let triggerEl = $state<HTMLButtonElement | null>(null);
	let menuEl = $state<HTMLDivElement | null>(null);
	let highlightedEl = $state<HTMLElement | null>(null);
	let floatingCleanup: (() => void) | null = null;

	// Derived list (flattened for keyboard nav)
	const allOptions = $derived.by(() => {
		if (groups.length) return groups.flatMap((g) => g.options);
		return options;
	});

	const selectedLabel = $derived(selected?.label ?? selected?.value ?? '');

	// Helpers
	function isSelected(opt: Option<T>): boolean {
		return selected ? deepEqual(selected.value, opt.value) : false;
	}

	function deepEqual(a: unknown, b: unknown): boolean {
		if (a === b) return true;
		if (a == null || b == null) return false;
		if (typeof a !== 'object' || typeof b !== 'object') return a === b;
		const ka = Object.keys(a as object);
		const kb = Object.keys(b as object);
		return ka.length === kb.length && ka.every((k) => deepEqual((a as any)[k], (b as any)[k]));
	}

	function selectOption(opt: Option<T>) {
		if (opt.disabled) return;
		selected = opt;
		onSelect?.(opt);
		open = false;
		highlightedEl = null;
		triggerEl?.focus();
	}

	function toggleOpen() {
		if (disabled) return;
		open = !open;
		if (open) {
			tick().then(() => {
				// Highlight currently selected or first item
				const current = menuEl?.querySelector('[aria-selected="true"]') as HTMLElement | null;
				highlightedEl = current || (menuEl?.querySelector('[role="option"]:not([data-disabled])') as HTMLElement | null);
			});
		} else {
			highlightedEl = null;
		}
	}

	// Keyboard navigation
	const kbd = {
		ARROW_DOWN: 'ArrowDown',
		ARROW_UP: 'ArrowUp',
		ENTER: 'Enter',
		SPACE: ' ',
		ESCAPE: 'Escape',
		HOME: 'Home',
		END: 'End',
	} as const;

	function getNavigableItems(): HTMLElement[] {
		if (!menuEl) return [];
		return Array.from(menuEl.querySelectorAll('[role="option"]:not([data-disabled])')) as HTMLElement[];
	}

	function onTriggerKeydown(e: KeyboardEvent) {
		if (disabled) return;

		if (!open) {
			if (['ArrowDown', 'ArrowUp', ' ', 'Enter'].includes(e.key)) {
				e.preventDefault();
				open = true;
				tick().then(() => {
					const items = getNavigableItems();
					highlightedEl = e.key === 'ArrowUp' ? items[items.length - 1] : items[0];
				});
			}
			return;
		}

		if (e.key === 'Escape') {
			e.preventDefault();
			open = false;
			triggerEl?.focus();
		}
	}

	function onMenuKeydown(e: KeyboardEvent) {
		const items = getNavigableItems();
		if (!items.length) return;

		const currentIdx = highlightedEl ? items.indexOf(highlightedEl) : -1;

		switch (e.key) {
			case kbd.ARROW_DOWN:
				e.preventDefault();
				highlightedEl = items[(currentIdx + 1) % items.length];
				highlightedEl.scrollIntoView({ block: 'nearest' });
				break;
			case kbd.ARROW_UP:
				e.preventDefault();
				highlightedEl = items[(currentIdx - 1 + items.length) % items.length];
				highlightedEl.scrollIntoView({ block: 'nearest' });
				break;
			case kbd.HOME:
				e.preventDefault();
				highlightedEl = items[0];
				highlightedEl.scrollIntoView({ block: 'nearest' });
				break;
			case kbd.END:
				e.preventDefault();
				highlightedEl = items[items.length - 1];
				highlightedEl.scrollIntoView({ block: 'nearest' });
				break;
			case kbd.ENTER:
			case kbd.SPACE:
				e.preventDefault();
				if (highlightedEl) {
					const val = highlightedEl.getAttribute('data-value');
					const label = highlightedEl.getAttribute('data-label') || highlightedEl.textContent || '';
					let parsed: any = val;
					try { parsed = JSON.parse(val || 'null'); } catch {}
					const opt = allOptions.find((o) => deepEqual(o.value, parsed)) || { value: parsed, label };
					selectOption(opt as Option<T>);
				}
				break;
			default:
				// Typeahead
				if (e.key.length === 1 && /^[a-z0-9]$/i.test(e.key)) {
					handleTypeahead(e.key, items);
				}
		}
	}

	// Simple typeahead
	let typeBuffer = '';
	let typeTimer: any;

	function handleTypeahead(char: string, items: HTMLElement[]) {
		clearTimeout(typeTimer);
		typeBuffer += char.toLowerCase();

		const match = items.find((el) =>
			(el.textContent || '').toLowerCase().startsWith(typeBuffer)
		);

		if (match) {
			highlightedEl = match;
			match.scrollIntoView({ block: 'nearest' });
		}

		typeTimer = setTimeout(() => (typeBuffer = ''), 400);
	}

	// Floating UI positioning
	function positionMenu() {
		if (!triggerEl || !menuEl) return;

		const middleware = [
			flip({ padding: 8 }),
			shift({ padding: 8 }),
			size({
				padding: 8,
				apply({ rects, availableHeight, availableWidth }) {
					if (sameWidth) {
						Object.assign(menuEl!.style, { width: `${Math.round(rects.reference.width)}px`, minWidth: 'unset' });
					}
					if (fitViewport) {
						Object.assign(menuEl!.style, { maxHeight: `${availableHeight}px`, maxWidth: `${availableWidth}px` });
					}
				},
			}),
		];

		if (gutter != null) {
			middleware.unshift(offset({ mainAxis: gutter }));
		}

		computePosition(triggerEl, menuEl, { placement, middleware }).then(({ x, y }) => {
			Object.assign(menuEl!.style, {
				position: 'absolute',
				left: `${Math.round(x)}px`,
				top: `${Math.round(y)}px`,
			});
		});
	}

	// Effects
	$effect(() => {
		if (open && triggerEl && menuEl) {
			tick().then(() => {
				floatingCleanup?.();
				floatingCleanup = autoUpdate(triggerEl!, menuEl!, positionMenu);
			});
		} else {
			floatingCleanup?.();
			floatingCleanup = null;
		}
	});

	// Scroll lock
	$effect(() => {
		if (!preventScroll || !open) return;
		const original = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = original;
		};
	});

	// Click outside + Escape (global)
	$effect(() => {
		if (!open) return;

		const onPointer = (e: PointerEvent) => {
			const t = e.target as Node;
			if (menuEl?.contains(t) || triggerEl?.contains(t)) return;
			open = false;
		};
		const onEscape = (e: KeyboardEvent) => {
			if (e.key !== 'Escape') return;
			e.preventDefault();
			open = false;
			triggerEl?.focus();
		};

		document.addEventListener('pointerdown', onPointer, true);
		document.addEventListener('keydown', onEscape);

		return () => {
			document.removeEventListener('pointerdown', onPointer, true);
			document.removeEventListener('keydown', onEscape);
		};
	});

	// Sync highlighted data attribute
	$effect(() => {
		if (!menuEl) return;
		menuEl.querySelectorAll('[role="option"]').forEach((el) => {
			if (el === highlightedEl) el.setAttribute('data-highlighted', '');
			else el.removeAttribute('data-highlighted');
		});
	});

	// Public API
	export function isSelectedValue(val: T) {
		return selected ? deepEqual(selected.value, val) : false;
	}
</script>

<div class="select-root {rootClass}">
	<!-- Trigger -->
	<button
		bind:this={triggerEl}
		class="select-trigger {rootClass}"
		aria-haspopup="listbox"
		aria-expanded={open}
		{disabled}
		onclick={toggleOpen}
		onkeydown={onTriggerKeydown}
	>
		<span class="select-value">{selectedLabel || placeholder}</span>
		<span class="select-chevron">⌄</span>
	</button>

	<!-- Menu -->
	{#if open || forceVisible}
		<div
			bind:this={menuEl}
			class="select-menu {menuClass}"
			role="listbox"
			tabindex="-1"
			onkeydown={onMenuKeydown}
			transition:fade|local={{ duration: 120 }}
		>
			<!-- Flat options -->
			{#if options.length}
				{#each options as opt}
					<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
					<div
						role="option"
						tabindex="-1"
						data-value={JSON.stringify(opt.value)}
						data-label={opt.label}
						data-disabled={opt.disabled ? '' : undefined}
						aria-selected={isSelected(opt)}
						aria-disabled={opt.disabled ? 'true' : undefined}
						class="select-item {itemClass} {isSelected(opt) ? 'selected' : ''}"
						onclick={() => selectOption(opt)}
						onmouseenter={() => {
							if (!opt.disabled) highlightedEl = event?.currentTarget as HTMLElement;
						}}
					>
						{#if isSelected(opt)}
							<span class="select-check">✓</span>
						{/if}
						{opt.label ?? String(opt.value)}
					</div>
				{/each}
			{/if}

			<!-- Grouped options -->
			{#if groups.length}
				{#each groups as group}
					<div class="select-group" role="group" aria-labelledby="group-{group.label}">
						<div class="select-group-label" id="group-{group.label}">
							{group.label}
						</div>
						{#each group.options as opt}
							<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
							<div
								role="option"
								tabindex="-1"
								data-value={JSON.stringify(opt.value)}
								data-label={opt.label}
								data-disabled={opt.disabled ? '' : undefined}
								aria-selected={isSelected(opt)}
								aria-disabled={opt.disabled ? 'true' : undefined}
								class="select-item {itemClass} {isSelected(opt) ? 'selected' : ''}"
								onclick={() => selectOption(opt)}
								onmouseenter={() => {
									if (!opt.disabled) highlightedEl = event?.currentTarget as HTMLElement;
								}}
							>
								{#if isSelected(opt)}
									<span class="select-check">✓</span>
								{/if}
								{opt.label ?? String(opt.value)}
							</div>
						{/each}
					</div>
				{/each}
			{/if}
		</div>
	{/if}
</div>

<style>
	.select-root {
		position: relative;
		display: inline-block;
	}

	.select-trigger {
		display: flex;
		align-items: center;
		justify-content: space-between;
		min-width: 220px;
		height: 40px;
		padding: 0 12px;
		border-radius: 8px;
		background: white;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		color: #b45309;
		font-size: 14px;
		cursor: pointer;
		transition: opacity 0.1s;
	}

	.select-trigger:hover {
		opacity: 0.9;
	}

	.select-trigger:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.select-value {
		flex: 1;
		text-align: left;
	}

	.select-chevron {
		font-size: 14px;
		opacity: 0.7;
	}

	.select-menu {
		z-index: 50;
		display: flex;
		flex-direction: column;
		max-height: 300px;
		overflow-y: auto;
		margin-top: 4px;
		padding: 4px;
		background: white;
		border-radius: 8px;
		box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
	}

	.select-group {
		padding-top: 4px;
	}

	.select-group-label {
		padding: 4px 16px;
		font-size: 12px;
		font-weight: 600;
		text-transform: capitalize;
		color: #374151;
	}

	.select-item {
		position: relative;
		display: flex;
		align-items: center;
		padding: 6px 16px 6px 32px;
		border-radius: 6px;
		color: #374151;
		cursor: pointer;
		user-select: none;
	}

	.select-item:hover,
	.select-item[data-highlighted] {
		background: #fef3c7;
		color: #92400e;
	}

	.select-item.selected {
		color: #92400e;
	}

	.select-item[data-disabled] {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.select-check {
		position: absolute;
		left: 10px;
		top: 50%;
		transform: translateY(-50%);
		color: #d97706;
		font-size: 12px;
	}
</style>

