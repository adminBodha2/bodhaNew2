<script module lang="ts">
	import type { Snippet } from 'svelte';

	export type TabItem = {
		value?: string;
		label?: string;
		title?: string;
		name?: string;
		slug?: string;
		id?: string | number;
		disabled?: boolean;
		content?: Snippet;
	};

	export type TabsActivationMode = 'automatic' | 'manual';
	export type TabsOrientation = 'horizontal' | 'vertical';
	export type TabsVariant = 'line' | 'box';
</script>

<script lang="ts" generics="Item extends TabItem = TabItem">
	import { Tabs as BitsTabs } from 'bits-ui';
	import { clickOutsideAction } from '$lib/utils/clickoutside';

	type Props = {
		items: Item[];
		value?: string;
		getValue?: (item: Item, index: number) => string;
		getLabel?: (item: Item, index: number) => string;
		isDisabled?: (item: Item, index: number) => boolean;
		activationMode?: TabsActivationMode;
		orientation?: TabsOrientation;
		loop?: boolean;
		disabled?: boolean;
		ariaLabel?: string;
		variant?: TabsVariant;
		class?: string;
		menuLabel?: string;
		children?: Snippet<[Item, number]>;
	};

	let { items, value = $bindable(''), getValue, getLabel, isDisabled, activationMode = 'automatic', orientation = 'horizontal', loop = true, disabled = false, ariaLabel = 'Tabs', variant = 'line', class: className = '', menuLabel = 'Open Itinerary', children }: Props = $props();

	let menuOpen = $state(false);
	let touchStartX = $state<number | null>(null);
	let touchStartY = $state<number | null>(null);

	function itemValue(item: Item, index: number) {
		return getValue?.(item, index) ?? item.value ?? item.slug ?? item.id?.toString() ?? String(index);
	}

	function itemLabel(item: Item, index: number) {
		return getLabel?.(item, index) ?? item.label ?? item.title ?? item.name ?? itemValue(item, index);
	}

	function itemDisabled(item: Item, index: number) {
		return isDisabled?.(item, index) ?? item.disabled ?? false;
	}

	function closeMenu() {
		menuOpen = false;
	}

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	function tabValues() {
		return items
			.map((item, index) => ({
				value: itemValue(item, index),
				disabled: itemDisabled(item, index)
			}))
			.filter((item) => !item.disabled)
			.map((item) => item.value);
	}

	function switchTab(direction: 1 | -1) {
		const values = tabValues();
		if (values.length < 2) return;

		const currentIndex = Math.max(0, values.indexOf(value));
		const nextIndex = currentIndex + direction;

		if (nextIndex < 0) {
			if (loop) value = values[values.length - 1];
			return;
		}

		if (nextIndex >= values.length) {
			if (loop) value = values[0];
			return;
		}

		value = values[nextIndex];
	}

	function handleTouchStart(event: TouchEvent) {
		if (window.innerWidth >= 1025 || menuOpen) return;

		const touch = event.touches[0];
		touchStartX = touch.clientX;
		touchStartY = touch.clientY;
	}

	function handleTouchEnd(event: TouchEvent) {
		if (window.innerWidth >= 1025 || touchStartX === null || touchStartY === null) return;

		const touch = event.changedTouches[0];
		const deltaX = touch.clientX - touchStartX;
		const deltaY = touch.clientY - touchStartY;
		touchStartX = null;
		touchStartY = null;

		if (Math.abs(deltaX) < 48) return;
		if (Math.abs(deltaY) > Math.abs(deltaX) * 0.8) return;

		if (deltaX < 0) {
			switchTab(1);
		} else {
			switchTab(-1);
		}
	}

	$effect(() => {
		const values = items.map(itemValue);
		if (values.length === 0) {
			value = '';
			return;
		}
		if (!value || !values.includes(value)) {
			value = values[0];
		}
	});
</script>

<div class="tabs {className}" class:box={variant === 'box'} class:vert={orientation === 'vertical'}>
	<BitsTabs.Root bind:value {activationMode} {orientation} {loop} {disabled}>
		<div class="tabnav" class:open={menuOpen} use:clickOutsideAction={closeMenu}>
			<button class="tabmenu" type="button" aria-expanded={menuOpen} onclick={toggleMenu}>{menuLabel}</button>
			<BitsTabs.List class="tablist" aria-label={ariaLabel}>
				{#each items as item, index (itemValue(item, index))}
					<BitsTabs.Trigger class="tab" value={itemValue(item, index)} disabled={itemDisabled(item, index)} onclick={closeMenu}>
						{itemLabel(item, index)}
					</BitsTabs.Trigger>
				{/each}
			</BitsTabs.List>
		</div>
		<div class="tabpanels" role="group" aria-label="Tab panels" ontouchstart={handleTouchStart} ontouchend={handleTouchEnd}>
			{#each items as item, index (itemValue(item, index))}
				<BitsTabs.Content class="tabbody" value={itemValue(item, index)}>
					{#if children}
						{@render children(item, index)}
					{:else if item.content}
						{@render item.content()}
					{:else}
						<p class="tabempty">No content.</p>
					{/if}
				</BitsTabs.Content>
			{/each}
		</div>
	</BitsTabs.Root>
</div>

<style lang="sass">

.tabs
	width: 100%
	--tab-color: var(--color-grey-2)
	--tab-hover-color: var(--color-theme-dark)
	--tab-hover-back: var(--color-stone-1)
	--tab-active-color: var(--color-theme)
	--tab-focus-color: var(--color-theme-light)
	--tab-box-back: var(--color-stone-1)
	--tab-box-active-back: var(--color-back)
.tabnav
	position: relative
.tabmenu
	width: 100%
	display: flex
	align-items: center
	justify-content: space-between
	border: var(--border-dark)
	border-radius: 6px
	background: var(--color-grey-0)
	color: var(--color-grey-3)
	font-family: var(--fontface-sans)
	font-size: 0.95rem
	font-weight: 600
	padding: 0.75rem 1rem
	cursor: pointer
	&:after
		content: '+'
		color: var(--tab-active-color)
		font-size: 1.1rem
		line-height: 1
	&:focus-visible
		outline: 2px solid var(--tab-focus-color)
		outline-offset: 2px
	@media (min-width: 1025px)
		display: none
.tabnav.open
	.tabmenu
		&:after
			content: '-'
.tabs
	:global(.tablist)
		position: absolute
		top: calc(100% + 0.35rem)
		left: 0
		right: 0
		z-index: 20
		display: none
		flex-direction: column
		align-items: stretch
		gap: 0
		border: var(--border-main)
		border-radius: 6px
		background: var(--color-back)
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12)
		overflow: hidden
		@media (min-width: 1025px)
			position: static
			display: flex
			flex-direction: row
			flex-wrap: wrap
			align-items: center
			gap: 0.25rem
			border: 0
			border-bottom: var(--border-main)
			border-radius: 0
			background: transparent
			box-shadow: none
			overflow: visible
	.tabnav.open
		:global(.tablist)
			display: flex
	:global(.tab)
		display: inline-flex
		align-items: center
		justify-content: flex-start
		width: 100%
		border: 0
		border-bottom: var(--border-main)
		background: transparent
		color: var(--color-primary)
		font-family: var(--fontface-sans)
		font-size: 1rem
		line-height: 1
		padding: 0.75rem 1rem
		text-align: left
		cursor: pointer
		transition: color 140ms ease, border-color 140ms ease, background 140ms ease
		&:last-child
			border-bottom: 0
		&:hover
			background: var(--tab-hover-back)
			color: var(--tab-hover-color)
		&:focus-visible
			outline: 2px solid var(--tab-focus-color)
			outline-offset: 2px
		@media (min-width: 1025px)
			justify-content: center
			width: auto
			border-bottom: 2px solid transparent
			text-align: center
			&:last-child
				border-bottom: 2px solid transparent
	:global(.tab[data-state='active'])
		border-color: var(--tab-active-color)
		color: var(--tab-active-color)
	:global(.tab[data-disabled])
		opacity: 0.45
		pointer-events: none
	:global(.tabbody)
		padding-top: 1.5rem
		&:focus-visible
			outline: 2px solid var(--tab-focus-color)
			outline-offset: 4px
.tabempty
	color: var(--color-grey-1)
.tabs.box
	:global(.tablist)
		gap: 0.35rem
		border-bottom: 0
		border-radius: 8px
		background: var(--tab-box-back)
		padding: 0.35rem
	:global(.tab)
		border-bottom: 0
		border-radius: 6px
	:global(.tab[data-state='active'])
		background: var(--tab-box-active-back)
		color: var(--tab-active-color)
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12)
.tabs.vert
	@media (min-width: 1025px)
		display: grid
		gap: 1.5rem
		grid-template-columns: minmax(10rem, 14rem) 1fr
		:global(.tablist)
			align-items: stretch
			flex-direction: column
			border-bottom: 0
			border-right: var(--border-main)
			padding-right: 0.5rem
		:global(.tab)
			justify-content: flex-start
			border-bottom: 0
			border-right: 2px solid transparent
			text-align: left
		:global(.tab[data-state='active'])
			border-color: var(--tab-active-color)
		:global(.tabbody)
			padding-top: 0
</style>
