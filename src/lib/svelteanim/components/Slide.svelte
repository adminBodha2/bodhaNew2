<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { EasingFunction } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { slide } from '../transitions/slide';
	import type { SlideDirection } from '../types';

	interface Props {
		/** Controls whether the element is in the DOM and triggers in/out transitions. */
		visible?: boolean;
		/** Direction the element slides from on enter. Default: 'left' */
		direction?: SlideDirection;
		/**
		 * Override the exit direction. When omitted the element exits back
		 * the same way it entered. Useful for page-transition-style effects.
		 */
		outDirection?: SlideDirection;
		/** Distance in pixels to slide. Default: 100 */
		distance?: number;
		/** Transition duration in ms. Default: 300 */
		duration?: number;
		/** Delay before the transition starts, in ms. Default: 0 */
		delay?: number;
		/** Svelte easing function. Default: cubicOut */
		easing?: EasingFunction;
		/** Whether to also fade opacity during the slide. Default: true */
		opacity?: boolean;
		children: Snippet;
		/** Extra attributes forwarded to the wrapper element (class, id, aria-*, data-*, …) */
		[key: string]: unknown;
	}

	let {
		visible = true,
		direction = 'left',
		outDirection,
		distance = 100,
		duration = 300,
		delay = 0,
		easing = quintOut,
		opacity = true,
		children,
		...rest
	}: Props = $props();

	const inParams  = $derived({ direction, distance, duration, delay, easing, opacity });
	const outParams = $derived({ direction: outDirection ?? direction, distance, duration, delay, easing, opacity });
</script>

<!--
  The wrapper uses display:contents so it is invisible to the parent layout.
  Flex/grid parents treat the slotted children as direct children.
  The transition detects display:contents and animates the first child element.

  Note: if you need to animate multiple sibling elements as one unit, wrap them
  in a single element inside <Slide> or use `in:slide` / `out:slide` directly.
-->
{#if visible}
	<div {...rest} style:display="contents" in:slide={inParams} out:slide={outParams}>
		{@render children()}
	</div>
{/if}
