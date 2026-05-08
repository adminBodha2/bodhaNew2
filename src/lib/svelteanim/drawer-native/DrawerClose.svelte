<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { HTMLButtonAttributes } from 'svelte/elements'
	import { getDrawerContext } from './state.svelte.js'

	type Props = HTMLButtonAttributes & {
		class?: string
		children?: Snippet
	}

	let { class: className = '', children, ...rest }: Props = $props()
	const state = getDrawerContext('<Drawer.Close>')

	function onclick() {
		state.closeDrawer()
	}
</script>

<button type="button" class="dr-close {className}" {onclick} {...rest}>
	{@render children?.()}
</button>
