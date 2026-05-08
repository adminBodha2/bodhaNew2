<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { HTMLButtonAttributes } from 'svelte/elements'
	import { getDrawerContext } from './state.svelte.js'

	type Props = HTMLButtonAttributes & {
		class?: string
		children?: Snippet
	}

	let { class: className = '', children, ...rest }: Props = $props()
	const state = getDrawerContext('<Drawer.Trigger>')

	function onclick() {
		state.openDrawer()
	}
</script>

<button
	type="button"
	class="dr-trigger {className}"
	aria-expanded={state.open}
	aria-haspopup="dialog"
	{onclick}
	{...rest}
>
	{@render children?.()}
</button>
