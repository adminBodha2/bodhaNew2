<script lang="ts">
	import type { Snippet } from 'svelte'
	import { NavMenuState, setNavMenuContext } from './state.svelte.js'
	import './navmenu.sass'

	type Props = {
		hoverDelay?: number
		class?: string
		children?: Snippet
		onValueChange?: (v: string | null) => void
	}

	let { hoverDelay = 200, class: className = '', children, onValueChange }: Props = $props()

	const state = new NavMenuState({ hoverDelay })
	setNavMenuContext(state)

	$effect(() => {
		onValueChange?.(state.value)
	})

	function onpointerleave() {
		state.scheduleClose()
	}

	function onpointerenter() {
		state.cancelClose()
	}

	function onkeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') state.close()
	}
</script>

<nav
	class="nm-root {className}"
	data-state={state.value ? 'open' : 'closed'}
	{onpointerleave}
	{onpointerenter}
	{onkeydown}
>
	{@render children?.()}
</nav>
