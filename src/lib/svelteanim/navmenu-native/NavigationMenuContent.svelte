<script lang="ts">
	import type { Snippet } from 'svelte'
	import { getNavItemContext, getNavMenuContext } from './state.svelte.js'

	type Props = {
		class?: string
		children?: Snippet
	}

	let { class: className = '', children }: Props = $props()

	const state = getNavMenuContext()
	const value = getNavItemContext()
	const isOpen = $derived(state.value === value)
</script>

{#if isOpen}
	<div
		class="nm-content {className}"
		data-state="open"
		onpointerenter={() => state.cancelClose()}
	>
		{@render children?.()}
	</div>
{/if}
