import type { AutoAnimationPlugin } from '@formkit/auto-animate';

interface StaggerPluginOptions {
	/** Duration of each item's animation in ms. Default: 280 */
	duration?: number;
	/** Delay between each child animating in, in ms. Default: 70 */
	stagger?: number;
	/** Y offset to slide up from on enter, in px. Default: 18 */
	enterY?: number;
	/** CSS easing for enter animations. Default: 'ease-out' */
	easing?: string;
	/**
	 * Minimum direct children required to trigger stagger mode.
	 * Elements with fewer children just fade-slide as a whole.
	 * Default: 2
	 */
	minChildren?: number;
}

/**
 * A drop-in replacement plugin for autoAnimate that staggers direct children
 * when a multi-child element enters. Pass it to use:autoAnimate:
 *
 *   <div use:autoAnimate={staggerAnimatePlugin({ stagger: 80 })}>
 */
export function staggerAnimatePlugin({
	duration = 280,
	stagger = 70,
	enterY = 18,
	easing = 'ease-out',
	minChildren = 2
}: StaggerPluginOptions = {}): AutoAnimationPlugin {
	return function plugin(el, action) {
		if (action === 'add') {
			const children = Array.from(el.children);

			if (children.length >= minChildren) {
				// Stagger each child — container appears instantly so children
				// aren't double-animated.
				children.forEach((child, i) => {
					child.animate(
						[
							{ opacity: 0, transform: `translateY(${enterY}px)` },
							{ opacity: 1, transform: 'translateY(0)' }
						],
						{
							duration,
							delay: i * stagger,
							easing,
							fill: 'backwards'
						}
					);
				});

				return new KeyframeEffect(el, [{ opacity: 1 }, { opacity: 1 }], { duration: 1 });
			}

			// Fewer than minChildren (e.g. a single paragraph block): fade-slide the whole thing.
			return new KeyframeEffect(
				el,
				[
					{ opacity: 0, transform: `translateY(${enterY}px)` },
					{ opacity: 1, transform: 'translateY(0)' }
				],
				{ duration, easing }
			);
		}

		if (action === 'remove') {
			return new KeyframeEffect(
				el,
				[
					{ opacity: 1, transform: 'translateY(0)' },
					{ opacity: 0, transform: `translateY(-${Math.round(enterY * 0.5)}px)` }
				],
				{ duration: Math.round(duration * 0.6), easing: 'ease-in' }
			);
		}

		// 'remain' — element stays in place (e.g. the nav strip); no movement needed.
		return new KeyframeEffect(el, [{ opacity: 1 }, { opacity: 1 }], { duration: 1 });
	} as AutoAnimationPlugin;
}
