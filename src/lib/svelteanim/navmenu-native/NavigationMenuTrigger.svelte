<script lang="ts">
	import type { Snippet } from 'svelte'
	import { getNavItemContext, getNavMenuContext } from './state.svelte.js'

	type Props = {
		class?: string
		children?: Snippet
		disabled?: boolean
	}

	let { class: className = '', children, disabled = false }: Props = $props()

	const state = getNavMenuContext()
	const value = getNavItemContext()
	const isOpen = $derived(state.value === value)

	function onpointerenter() {
		if (disabled) return
		state.open(value)
	}

	function onclick() {
		if (disabled) return
		state.toggle(value)
	}

	function onfocus() {
		if (disabled) return
		state.open(value)
	}
</script>

<button
	type="button"
	class="nm-trigger {className}"
	data-state={isOpen ? 'open' : 'closed'}
	aria-expanded={isOpen}
	{disabled}
	{onpointerenter}
	{onclick}
	{onfocus}
>
	{@render children?.()}
	<svg class="nm-chevron" viewBox="0 0 24 24" aria-hidden="true">
		<path
			d="M6 9l6 6 6-6"
			stroke="currentColor"
			stroke-width="2"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
</button>
