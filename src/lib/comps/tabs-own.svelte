<script module lang="ts">
	import type { Snippet } from 'svelte';

	export type TabItem = {
		label: string;
		content: Snippet;
		disabled?: boolean;
	};
</script>

<script lang="ts">
	import { clickOutsideAction } from '$lib/utils/clickoutside';

	type Props = {
		items: TabItem[];
		active?: number;
		ariaLabel?: string;
		class?: string;
	};

	let {
		items,
		active = $bindable(0),
		ariaLabel = 'Tabs',
		class: className = ''
	}: Props = $props();

	let menuOpen = $state(false);

	function select(i: number) {
		if (items[i]?.disabled) return;
		active = i;
		menuOpen = false;
	}
</script>

<div class="tabs {className}" use:clickOutsideAction={() => (menuOpen = false)}>
	<div class="tabnav" class:open={menuOpen}>
		<button
			class="tabmenu"
			type="button"
			aria-expanded={menuOpen}
			aria-controls="tablist"
			onclick={() => (menuOpen = !menuOpen)}
		>
			{items[active]?.label ?? 'Menu'}
		</button>

		<div id="tablist" class="tablist" role="tablist" aria-label={ariaLabel}>
			{#each items as item, i}
				<button
					class="tab"
					role="tab"
					type="button"
					aria-selected={active === i}
					data-state={active === i ? 'active' : 'inactive'}
					disabled={item.disabled}
					onclick={() => select(i)}
				>
					{item.label}
				</button>
			{/each}
		</div>
	</div>

	{#if items[active]}
		<div class="tabbody" role="tabpanel">
			{@render items[active].content()}
		</div>
	{/if}
</div>

<style lang="sass">
.tabs
	width: 100%
	--tab-color: var(--color-grey-2)
	--tab-hover-color: var(--color-theme-dark)
	--tab-hover-back: var(--color-stone-1)
	--tab-active-color: var(--color-theme)
	--tab-focus-color: var(--color-theme-light)
.tabnav
	position: relative
.tabmenu
	width: 100%
	display: flex
	align-items: center
	justify-content: space-between
	border: var(--border-main)
	border-radius: 6px
	background: var(--color-back)
	color: var(--tab-color)
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
.tabnav.open .tabmenu:after
	content: '-'
.tablist
	position: absolute
	top: calc(100% + 0.35rem)
	left: 0
	right: 0
	z-index: 20
	display: none
	flex-direction: column
	border: var(--border-main)
	border-radius: 6px
	background: var(--color-back)
	box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12)
	overflow: hidden
.tabnav.open .tablist
	display: flex
@media (min-width: 1025px)
	.tablist
		position: static
		display: flex
		flex-direction: row
		flex-wrap: wrap
		gap: 0.25rem
		border: 0
		border-bottom: var(--border-main)
		border-radius: 0
		background: transparent
		box-shadow: none
		overflow: visible
.tab
	display: inline-flex
	align-items: center
	justify-content: flex-start
	width: 100%
	border: 0
	border-bottom: var(--border-main)
	background: transparent
	color: var(--tab-color)
	font-family: var(--fontface-sans)
	font-size: 0.85rem
	font-weight: 500
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
	&:disabled
		opacity: 0.45
		cursor: not-allowed
	&[data-state='active']
		color: var(--tab-active-color)
	@media (min-width: 1025px)
		justify-content: center
		width: auto
		border-bottom: 2px solid transparent
		text-align: center
		&:last-child
			border-bottom: 2px solid transparent
		&[data-state='active']
			border-bottom-color: var(--tab-active-color)
.tabbody
	padding-top: 1.5rem
	&:focus-visible
		outline: 2px solid var(--tab-focus-color)
		outline-offset: 4px
</style>