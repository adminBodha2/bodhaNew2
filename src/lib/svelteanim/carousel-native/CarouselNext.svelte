<script lang="ts">
	import { getCarouselContext } from './state.svelte.js'

	let { class: className = '' }: { class?: string } = $props()

	const ctx = getCarouselContext('<Carousel.Next>')
</script>

<button
	type="button"
	class="cr-btn cr-btn-next {className}"
	data-orientation={ctx.orientation}
	aria-label="Next slide"
	disabled={!ctx.canScrollNext}
	onclick={ctx.scrollNext}
	onkeydown={ctx.handleKeyDown}
>
	<svg viewBox="0 0 24 24" aria-hidden="true">
		<path
			d="M9 6l6 6-6 6"
			stroke="currentColor"
			stroke-width="2"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
</button>
