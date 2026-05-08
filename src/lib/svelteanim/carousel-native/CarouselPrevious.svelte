<script lang="ts">
	import { getCarouselContext } from './state.svelte.js'

	let { class: className = '' }: { class?: string } = $props()

	const ctx = getCarouselContext('<Carousel.Previous>')
</script>

<button
	type="button"
	class="cr-btn cr-btn-prev {className}"
	data-orientation={ctx.orientation}
	aria-label="Previous slide"
	disabled={!ctx.canScrollPrev}
	onclick={ctx.scrollPrev}
	onkeydown={ctx.handleKeyDown}
>
	<svg viewBox="0 0 24 24" aria-hidden="true">
		<path
			d="M15 6l-6 6 6 6"
			stroke="currentColor"
			stroke-width="2"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
</button>
