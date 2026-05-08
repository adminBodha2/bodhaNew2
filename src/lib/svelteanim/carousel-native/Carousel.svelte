<script lang="ts">
	import type { Snippet } from 'svelte'
	import { CarouselState, setCarouselContext, type Orientation } from './state.svelte.js'
	import './carousel.sass'

	type Props = {
		orientation?: Orientation
		loop?: boolean
		class?: string
		children?: Snippet
		setApi?: (api: CarouselState) => void
	}

	let {
		orientation = 'horizontal',
		loop = false,
		class: className = '',
		children,
		setApi
	}: Props = $props()

	const ctx = new CarouselState()
	setCarouselContext(ctx)

	$effect(() => {
		ctx.orientation = orientation
	})

	$effect(() => {
		ctx.loop = loop
	})

	$effect(() => {
		setApi?.(ctx)
	})
</script>

<section
	class="cr-root {className}"
	data-orientation={orientation}
	aria-roledescription="carousel"
>
	{@render children?.()}
</section>
