<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { EasingFunction } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { reveal } from '../transitions/reveal.js';
	import type { RevealDirection } from '../transitions/reveal.js';

	interface Props {
		visible?: boolean;
		direction?: RevealDirection;
		duration?: number;
		delay?: number;
		easing?: EasingFunction;
		/** Diagonal slant depth as % of element width. Default: 20 */
		slant?: number;
		children: Snippet;
		[key: string]: unknown;
	}

	let {
		visible = true,
		direction = 'up',
		duration = 600,
		delay = 50,
		easing = cubicInOut,
		slant = 20,
		children,
		...rest
	}: Props = $props();

	const params = $derived({ direction, duration, delay, easing, slant });
</script>

{#if visible}
	<div {...rest} style:display="contents" in:reveal={params} out:reveal={params}>
		{@render children()}
	</div>
{/if}
