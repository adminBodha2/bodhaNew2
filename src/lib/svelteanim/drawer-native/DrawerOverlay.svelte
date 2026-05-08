<script lang="ts">
	import { getDrawerContext } from './state.svelte.js'

	let { class: className = '' }: { class?: string } = $props()
	const state = getDrawerContext('<Drawer.Overlay>')

	function onclick() {
		if (state.dismissible) state.closeDrawer()
	}
</script>

<div class="dr-overlay {className}" data-state={state.open ? 'open' : 'closed'} {onclick}></div>
