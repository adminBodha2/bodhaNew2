import { cubicIn } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';
import { areMotionAnimationsDisabled } from '../motionPreference.svelte';

export interface SpringParams {
	/** Animation duration in ms. Default: 300 */
	duration?: number;
	/** Starting scale on enter (0–1). Default: 0.94 */
	initialScale?: number;
	/** Starting Y offset in px (negative = slide down into place). Default: -8 */
	enterY?: number;
	/**
	 * How much the scale overshoots past 1.0 before settling.
	 * 0 = no overshoot, 1 = noticeable bounce, ~0.4 is a natural spring.
	 * Default: 0.4
	 */
	overshoot?: number;
}

function backOut(overshoot: number) {
	const c1 = overshoot;
	const c3 = c1 + 1;
	return (t: number) => 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

export function springIn(
	_node: Element,
	{ duration = 300, initialScale = 0.94, enterY = -8, overshoot = 0.4 }: SpringParams = {}
): TransitionConfig {
	if (areMotionAnimationsDisabled()) return { duration: 0 };

	return {
		duration,
		easing: backOut(overshoot),
		css: (t) =>
			[
				`transform: scale(${initialScale + (1 - initialScale) * t}) translateY(${enterY * (1 - t)}px)`,
				`opacity: ${Math.min(1, t * 1.5)}` // opacity resolves faster than scale
			].join(';')
	};
}

export function springOut(
	_node: Element,
	{ duration = 300, initialScale = 0.94, enterY = -8 }: SpringParams = {}
): TransitionConfig {
	if (areMotionAnimationsDisabled()) return { duration: 0 };

	return {
		duration: Math.round(duration * 0.55),
		easing: cubicIn,
		css: (t) =>
			[
				`transform: scale(${initialScale + (1 - initialScale) * t}) translateY(${enterY * (1 - t)}px)`,
				`opacity: ${t}`
			].join(';')
	};
}
