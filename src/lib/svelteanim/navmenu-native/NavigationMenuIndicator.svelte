<script lang="ts">
	import { getNavMenuContext } from './state.svelte.js'

	let { class: className = '' }: { class?: string } = $props()

	const state = getNavMenuContext()
	const visible = $derived(state.value !== null)
</script>

<div class="nm-indicator {className}" data-state={visible ? 'visible' : 'hidden'}>
	<div class="nm-indicator-arrow"></div>
</div>
