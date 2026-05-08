<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { EasingFunction } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { scaleIn } from '../transitions/scale.js';

	interface Props {
		visible?: boolean;
		/** Starting scale factor. Default: 0.85 */
		initialScale?: number;
		/** CSS transform-origin. Default: 'center' */
		origin?: string;
		/** Starting rotation in degrees. Default: 0 */
		rotate?: number;
		/** Fade opacity during scale. Default: true */
		opacity?: boolean;
		duration?: number;
		delay?: number;
		easing?: EasingFunction;
		children: Snippet;
		[key: string]: unknown;
	}

	let {
		visible = true,
		initialScale = 0.85,
		origin = 'center',
		rotate = 0,
		opacity = true,
		duration = 400,
		delay = 0,
		easing = cubicOut,
		children,
		...rest
	}: Props = $props();

	const params = $derived({ initialScale, origin, rotate, opacity, duration, delay, easing });
</script>

{#if visible}
	<div {...rest} style:display="contents" in:scaleIn={params} out:scaleIn={params}>
		{@render children()}
	</div>
{/if}
