import { browser } from '$app/environment';
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig, EasingFunction } from 'svelte/transition';

export interface BlurParams {
	/**
	 * Starting blur radius in pixels. Default: 10
	 */
	radius?: number;
	/**
	 * Starting scale at t=0, settling to 1 at t=1.
	 *
	 * The default (1.06) mimics real optics: out-of-focus objects appear
	 * slightly larger due to their point-spread function bleeding outward.
	 * This grounds the effect physically and gives it a "lens coming into
	 * focus" quality rather than a generic blur fade.
	 *
	 * Set to 1 to disable the scale component entirely.
	 */
	initialScale?: number;
	/** Fade opacity. Default: true */
	opacity?: boolean;
	duration?: number;
	delay?: number;
	easing?: EasingFunction;
}

function buildFilter(radius: number): string {
	return radius > 0 ? `blur(${radius}px)` : 'none';
}

function applyBlur(
	target: HTMLElement,
	t: number,
	u: number,
	radius: number,
	initialScale: number,
	opacity: boolean
): void {
	const currentRadius = radius * u;        // radius → 0
	const currentScale = 1 + (initialScale - 1) * u; // initialScale → 1

	target.style.filter = buildFilter(currentRadius);

	// Only write transform if scale is active — avoids overwriting
	// user-set transforms when initialScale === 1.
	if (initialScale !== 1) {
		target.style.transform = `scale(${currentScale})`;
	}

	if (opacity) target.style.opacity = String(t);
}

function cleanupBlur(target: HTMLElement, initialScale: number, opacity: boolean): void {
	target.style.filter = '';
	if (initialScale !== 1) target.style.transform = '';
	if (opacity) target.style.opacity = '';
}

/**
 * A blur-in transition. The element resolves from blurred to sharp,
 * optionally contracting from a slightly oversized starting state.
 *
 * The `initialScale` default (1.06) is deliberate: in real optics,
 * defocused objects appear larger because their light spreads outward.
 * Matching this makes the effect read as a lens pulling focus rather
 * than a flat filter animation. The difference is subtle but noticed.
 *
 * Best used for: hero text, portrait images, content that should feel
 * like it's "appearing" rather than "arriving" — when motion would
 * be too directional for the context.
 *
 * SSR-safe. Respects `prefers-reduced-motion`.
 *
 * @example
 * ```svelte
 * {#if visible}
 *   <h1 in:blurIn={{ radius: 12, duration: 600 }}>Sharp on arrival</h1>
 * {/if}
 * ```
 */
export function blurIn(
	node: Element,
	{
		radius = 10,
		initialScale = 1.06,
		opacity = true,
		duration = 500,
		delay = 0,
		easing = cubicOut
	}: BlurParams = {}
): TransitionConfig {
	const prefersReducedMotion =
		browser && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	if (prefersReducedMotion) {
		return { duration: 0, delay };
	}

	const isContents =
		browser && (node as HTMLElement).style?.display === 'contents';

	if (isContents) {
		const target = node.firstElementChild as HTMLElement | null;
		if (!target) return { duration: 0, delay };

		return {
			duration,
			delay,
			easing,
			tick: (t) => {
				const u = 1 - t;
				applyBlur(target, t, u, radius, initialScale, opacity);
				if (t >= 1) cleanupBlur(target, initialScale, opacity);
			}
		};
	}

	return {
		duration,
		delay,
		easing,
		css: (t, u) => {
			const currentRadius = radius * u;
			const currentScale = 1 + (initialScale - 1) * u;
			const parts: string[] = [`filter: ${buildFilter(currentRadius)}`];
			if (initialScale !== 1) parts.push(`transform: scale(${currentScale})`);
			if (opacity) parts.push(`opacity: ${t}`);
			return parts.join('; ');
		}
	};
}
