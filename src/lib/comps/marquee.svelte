<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Direction = 'left' | 'up';

	type Props = HTMLAttributes<HTMLDivElement> & {
		children?: Snippet;
		direction?: Direction;
		reverse?: boolean;
		fade?: boolean;
		pauseOnHover?: boolean;
		copies?: number;
		duration?: string;
		gap?: string;
	};

	let {
		children,
		direction = 'left',
		reverse = false,
		fade = false,
		pauseOnHover = false,
		copies = 4,
		duration = '20s',
		gap = '1rem',
		class: className = '',
		...rest
	}: Props = $props();

	let tracks = $derived(Array.from({ length: copies }));
</script>

<div
	{...rest}
	class={[
		'marquee',
		direction === 'up' && 'marquee--vertical',
		fade && 'marquee--fade',
		pauseOnHover && 'marquee--pause',
		className
	]
		.filter(Boolean)
		.join(' ')}
	style:--duration={duration}
	style:--gap={gap}
>
	{#each tracks as _, i (i)}
		<div
			class="marquee__track"
			style:animation-direction={reverse ? 'reverse' : 'normal'}
		>
			{@render children?.()}
		</div>
	{/each}
</div>

<style>
	.marquee {
		display: flex;
		gap: var(--gap);
		overflow: hidden;
	}

	.marquee--vertical {
		flex-direction: column;
	}

	.marquee--fade {
		mask-image: linear-gradient(
			to right,
			transparent 0%,
			black 10%,
			black 90%,
			transparent 100%
		);
	}

	.marquee--vertical.marquee--fade {
		mask-image: linear-gradient(
			to bottom,
			transparent 0%,
			black 10%,
			black 90%,
			transparent 100%
		);
	}

	.marquee__track {
		display: flex;
		flex-shrink: 0;
		justify-content: space-around;
		gap: 1px;
		background: var(--color-border);
		border: var(--border-main);
		min-width: 100%;
		animation: marquee-left var(--duration) linear infinite;
	}

	.marquee--vertical .marquee__track {
		flex-direction: column;
		min-width: auto;
		min-height: 100%;
		animation-name: marquee-up;
	}

	.marquee--pause:hover .marquee__track {
		animation-play-state: paused;
	}

	@keyframes marquee-left {
		from {
			transform: translateX(0);
		}

		to {
			transform: translateX(calc(-100% - var(--gap)));
		}
	}

	@keyframes marquee-up {
		from {
			transform: translateY(0);
		}

		to {
			transform: translateY(calc(-100% - var(--gap)));
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.marquee {
			overflow: auto;
		}

		.marquee__track {
			animation: none;
		}

		.marquee__track:not(:first-child) {
			display: none;
		}
	}
</style>
