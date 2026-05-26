<script lang="ts">
	import type { Snippet } from 'svelte';
	import { springIn, springOut } from '../transitions/spring.js';
	import type { SpringParams } from '../transitions/spring.js';

	interface Props extends SpringParams {
		/** Whether to show the content. */
		visible: boolean;
		children: Snippet;
		[key: string]: unknown;
	}

	let { visible, duration, initialScale, enterY, overshoot, children, ...rest }: Props = $props();

	const params = $derived<SpringParams>({ duration, initialScale, enterY, overshoot });
</script>

{#if visible}
	<div {...rest} in:springIn={params} out:springOut={params}>
		{@render children()}
	</div>
{/if}
