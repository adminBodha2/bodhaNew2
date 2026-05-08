<script lang="ts">
	import type { Snippet } from 'svelte'
	import { getCarouselContext } from './state.svelte.js'

	let { class: className = '', children }: { class?: string; children?: Snippet } = $props()

	const ctx = getCarouselContext('<Carousel.Item>')
</script>

<div
	class="cr-item {className}"
	data-orientation={ctx.orientation}
	role="group"
	aria-roledescription="slide"
>
	{@render children?.()}
</div>
