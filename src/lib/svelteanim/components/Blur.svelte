<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { EasingFunction } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { blurIn } from '../transitions/blur.js';

	interface Props {
		visible?: boolean;
		/** Starting blur radius in px. Default: 10 */
		radius?: number;
		/**
		 * Starting scale. Default: 1.06 (mimics real optical defocus bloom).
		 * Set to 1 to disable.
		 */
		initialScale?: number;
		/** Fade opacity. Default: true */
		opacity?: boolean;
		duration?: number;
		delay?: number;
		easing?: EasingFunction;
		children: Snippet;
		[key: string]: unknown;
	}

	let {
		visible = true,
		radius = 10,
		initialScale = 1.06,
		opacity = true,
		duration = 500,
		delay = 0,
		easing = cubicOut,
		children,
		...rest
	}: Props = $props();

	const params = $derived({ radius, initialScale, opacity, duration, delay, easing });
</script>

{#if visible}
	<div {...rest} style:display="contents" in:blurIn={params} out:blurIn={params}>
		{@render children()}
	</div>
{/if}
