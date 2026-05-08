<script lang="ts">
	import type { Snippet } from 'svelte'
	import { getCarouselContext } from './state.svelte.js'

	let { class: className = '', children }: { class?: string; children?: Snippet } = $props()

	const ctx = getCarouselContext('<Carousel.Content>')

	let viewportEl: HTMLDivElement | undefined = $state()
	let dragging = false
	let dragMoved = false
	let startPos = 0
	let startScroll = 0
	let activePointer: number | null = null

	$effect(() => {
		if (!viewportEl) return
		ctx.containerEl = viewportEl
		ctx.measure()

		const ro = new ResizeObserver(() => ctx.measure())
		ro.observe(viewportEl)

		return () => {
			ro.disconnect()
			ctx.containerEl = null
		}
	})

	function onscroll() {
		ctx.measure()
	}

	function pointerdown(e: PointerEvent) {
		if (!viewportEl) return
		if (e.pointerType === 'touch') return
		const target = e.target as HTMLElement
		if (target.closest('button, a, input, textarea, select, [contenteditable="true"]')) return

		dragging = true
		dragMoved = false
		activePointer = e.pointerId
		startPos = ctx.orientation === 'horizontal' ? e.clientX : e.clientY
		startScroll =
			ctx.orientation === 'horizontal' ? viewportEl.scrollLeft : viewportEl.scrollTop
		viewportEl.setPointerCapture(e.pointerId)
		viewportEl.classList.add('cr-dragging')
	}

	function pointermove(e: PointerEvent) {
		if (!dragging || !viewportEl || e.pointerId !== activePointer) return
		const cur = ctx.orientation === 'horizontal' ? e.clientX : e.clientY
		const delta = cur - startPos
		if (Math.abs(delta) > 3) dragMoved = true
		if (ctx.orientation === 'horizontal') viewportEl.scrollLeft = startScroll - delta
		else viewportEl.scrollTop = startScroll - delta
	}

	function pointerup(e: PointerEvent) {
		if (!dragging || !viewportEl) return
		dragging = false
		if (activePointer !== null && viewportEl.hasPointerCapture(activePointer)) {
			viewportEl.releasePointerCapture(activePointer)
		}
		activePointer = null
		viewportEl.classList.remove('cr-dragging')
		ctx.measure()
		ctx.scrollTo(ctx.selectedIndex)
	}

	function onclickCapture(e: MouseEvent) {
		if (dragMoved) {
			e.preventDefault()
			e.stopPropagation()
			dragMoved = false
		}
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="cr-viewport"
	data-orientation={ctx.orientation}
	bind:this={viewportEl}
	{onscroll}
	onpointerdown={pointerdown}
	onpointermove={pointermove}
	onpointerup={pointerup}
	onpointercancel={pointerup}
	onclickcapture={onclickCapture}
>
	<div class="cr-track {className}" data-orientation={ctx.orientation}>
		{@render children?.()}
	</div>
</div>
