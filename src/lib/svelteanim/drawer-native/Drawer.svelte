<script lang="ts">
	import type { Snippet } from 'svelte'
	import { DrawerState, setDrawerContext, type DrawerDirection } from './state.svelte.js'
	import './drawer.sass'

	type Props = {
		open?: boolean
		direction?: DrawerDirection
		dismissible?: boolean
		closeThreshold?: number
		onOpenChange?: (open: boolean) => void
		children?: Snippet
	}

	let {
		open = $bindable(false),
		direction = 'bottom',
		dismissible = true,
		closeThreshold = 0.4,
		onOpenChange,
		children
	}: Props = $props()

	const state = new DrawerState({ direction, dismissible, closeThreshold })
	setDrawerContext(state)

	$effect(() => {
		state.open = open
	})

	$effect(() => {
		open = state.open
		onOpenChange?.(state.open)
	})

	$effect(() => {
		if (typeof document === 'undefined') return
		if (state.open) {
			const prev = document.body.style.overflow
			document.body.style.overflow = 'hidden'
			return () => {
				document.body.style.overflow = prev
			}
		}
	})
</script>

{@render children?.()}
