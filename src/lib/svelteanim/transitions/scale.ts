import { cubicOut } from 'svelte/easing';
import type { TransitionConfig, EasingFunction } from 'svelte/transition';
import { areMotionAnimationsDisabled } from '../motionPreference.svelte';

export interface ScaleParams {
	/**
	 * Scale factor at t=0. Must be > 0.
	 * Values < 1 shrink in (e.g. 0.85 = starts at 85% size).
	 * Values > 1 zoom in (e.g. 1.15 = starts oversized, contracts to natural size).
	 * Default: 0.85
	 */
	initialScale?: number;
	/**
	 * The point the scale originates from. Accepts any CSS transform-origin value:
	 * 'center', 'top', 'bottom', 'left', 'right',
	 * 'top left', 'top right', 'bottom left', 'bottom right',
	 * or arbitrary CSS e.g. '30% 70%'.
	 * Default: 'center'
	 */
	origin?: string;
	/**
	 * Starting rotation in degrees at t=0, returning to 0 at t=1.
	 * Positive = clockwise, negative = counter-clockwise.
	 * Even small values (1–4°) give a satisfying "tumbling card" feel.
	 * Default: 0 (no rotation)
	 */
	rotate?: number;
	/** Fade opacity during scale. Default: true */
	opacity?: boolean;
	duration?: number;
	delay?: number;
	easing?: EasingFunction;
}

function buildTransform(scale: number, rotation: number): string {
	const parts: string[] = [];
	if (scale !== 1) parts.push(`scale(${scale})`);
	if (rotation !== 0) parts.push(`rotate(${rotation}deg)`);
	return parts.length ? parts.join(' ') : 'none';
}

function applyScale(
	target: HTMLElement,
	t: number,
	u: number,
	initialScale: number,
	rotate: number,
	opacity: boolean,
	origin: string
): void {
	const s = initialScale + (1 - initialScale) * t; // initialScale → 1
	const r = rotate * u;                             // rotate → 0
	target.style.transformOrigin = origin;
	target.style.transform = buildTransform(s, r);
	if (opacity) target.style.opacity = String(t);
}

function cleanupScale(target: HTMLElement, opacity: boolean): void {
	target.style.transformOrigin = '';
	target.style.transform = '';
	if (opacity) target.style.opacity = '';
}

/**
 * A scale transition. The element grows (or shrinks) from `initialScale`
 * to its natural size, optionally rotating into position.
 *
 * The `rotate` param is the detail that separates this from a generic scale:
 * a 2–4° starting rotation makes the element feel like it's "settling" into
 * place rather than simply growing.
 *
 * The `origin` param controls which point stays fixed during the scale —
 * 'bottom' is ideal for elements that appear to grow up from the page,
 * 'top left' for cards in a grid that should expand from their corner.
 *
 * SSR-safe. Respects `prefers-reduced-motion`.
 *
 * @example
 * ```svelte
 * {#if visible}
 *   <div in:scaleIn={{ initialScale: 0.8, rotate: 3, origin: 'bottom' }}>
 *     content
 *   </div>
 * {/if}
 * ```
 */
export function scaleIn(
	node: Element,
	{
		initialScale = 0.85,
		origin = 'center',
		rotate = 0,
		opacity = true,
		duration = 400,
		delay = 0,
		easing = cubicOut
	}: ScaleParams = {}
): TransitionConfig {
	if (areMotionAnimationsDisabled()) {
		return { duration: 0, delay: 0 };
	}

	const isContents =
		(node as HTMLElement).style?.display === 'contents';

	if (isContents) {
		const target = node.firstElementChild as HTMLElement | null;
		if (!target) return { duration: 0, delay };

		return {
			duration,
			delay,
			easing,
			tick: (t) => {
				const u = 1 - t;
				applyScale(target, t, u, initialScale, rotate, opacity, origin);
				if (t >= 1) cleanupScale(target, opacity);
			}
		};
	}

	// CSS path: Svelte generates a keyframe from each css(t) call.
	// We inline transform-origin via the style attribute on the keyframe.
	return {
		duration,
		delay,
		easing,
		css: (t, u) => {
			const s = initialScale + (1 - initialScale) * t;
			const r = rotate * u;
			const parts: string[] = [
				`transform-origin: ${origin}`,
				`transform: ${buildTransform(s, r)}`
			];
			if (opacity) parts.push(`opacity: ${t}`);
			return parts.join('; ');
		}
	};
}
