<script lang="ts">
	import type { Snippet } from 'svelte'
	import { getDrawerContext } from './state.svelte.js'
	import { portal } from './portal.js'
	import DrawerOverlay from './DrawerOverlay.svelte'

	type Props = {
		class?: string
		children?: Snippet
		showHandle?: boolean
	}

	let { class: className = '', children, showHandle = true }: Props = $props()
	const ctx = getDrawerContext('<Drawer.Content>')

	let sheetEl: HTMLDivElement | undefined = $state()
	let dragStart = 0
	let lastTime = 0
	let lastPos = 0
	let velocity = 0

	const isVerticalAxis = $derived(ctx.direction === 'bottom' || ctx.direction === 'top')

	const transform = $derived.by(() => {
		if (!ctx.open) return ''
		if (ctx.dragOffset === 0) return ''
		if (ctx.direction === 'bottom') return `translate3d(0, ${ctx.dragOffset}px, 0)`
		if (ctx.direction === 'top') return `translate3d(0, ${ctx.dragOffset}px, 0)`
		if (ctx.direction === 'right') return `translate3d(${ctx.dragOffset}px, 0, 0)`
		if (ctx.direction === 'left') return `translate3d(${ctx.dragOffset}px, 0, 0)`
		return ''
	})

	function clampDelta(delta: number) {
		if (ctx.direction === 'bottom') return Math.max(0, delta)
		if (ctx.direction === 'top') return Math.min(0, delta)
		if (ctx.direction === 'right') return Math.max(0, delta)
		if (ctx.direction === 'left') return Math.min(0, delta)
		return delta
	}

	function pointerdown(e: PointerEvent) {
		if (!ctx.dismissible) return
		const target = e.target as HTMLElement
		if (target.closest('input, textarea, select, button, [contenteditable="true"]')) {
			if (!target.closest('[data-drawer-handle]')) return
		}
		ctx.dragging = true
		dragStart = isVerticalAxis ? e.clientY : e.clientX
		lastPos = dragStart
		lastTime = e.timeStamp
		velocity = 0
		;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
	}

	function pointermove(e: PointerEvent) {
		if (!ctx.dragging) return
		const cur = isVerticalAxis ? e.clientY : e.clientX
		const dt = Math.max(1, e.timeStamp - lastTime)
		velocity = (cur - lastPos) / dt
		lastPos = cur
		lastTime = e.timeStamp
		ctx.dragOffset = clampDelta(cur - dragStart)
	}

	function pointerup() {
		if (!ctx.dragging) return
		ctx.dragging = false
		if (!sheetEl) {
			ctx.dragOffset = 0
			return
		}
		const size = isVerticalAxis ? sheetEl.offsetHeight : sheetEl.offsetWidth
		const distanceFraction = Math.abs(ctx.dragOffset) / size
		const flickThreshold = 0.5

		const flickClose =
			(ctx.direction === 'bottom' && velocity > flickThreshold) ||
			(ctx.direction === 'top' && velocity < -flickThreshold) ||
			(ctx.direction === 'right' && velocity > flickThreshold) ||
			(ctx.direction === 'left' && velocity < -flickThreshold)

		if (flickClose || distanceFraction > ctx.closeThreshold) {
			ctx.closeDrawer()
		} else {
			ctx.dragOffset = 0
		}
	}
</script>

{#if ctx.open}
	<div class="dr-portal" use:portal>
		<DrawerOverlay />
		<div
			class="dr-content {className}"
			data-direction={ctx.direction}
			data-state={ctx.open ? 'open' : 'closed'}
			data-dragging={ctx.dragging ? 'true' : undefined}
			role="dialog"
			aria-modal="true"
			bind:this={sheetEl}
			style:transform={transform}
			onpointerdown={pointerdown}
			onpointermove={pointermove}
			onpointerup={pointerup}
			onpointercancel={pointerup}
		>
			{#if showHandle && ctx.direction === 'bottom'}
				<div class="dr-handle" data-drawer-handle></div>
			{/if}
			{@render children?.()}
		</div>
	</div>
{/if}
