import { browser } from '$app/environment';
import { areScrollAnimationsDisabled } from '../motionPreference.svelte';

export interface UseInViewOptions {
	/**
	 * How much of the element must be visible before it counts as "in view".
	 * 0 = any pixel, 1 = fully visible. Also accepts an array of thresholds.
	 * Default: 0
	 */
	threshold?: number | number[];
	/**
	 * Margin around the root (same syntax as CSS margin).
	 * Positive values grow the detection area; negative values shrink it.
	 * Useful for triggering slightly before the element reaches the edge.
	 * Default: '0px'
	 */
	rootMargin?: string;
	/**
	 * The scrolling ancestor to observe relative to.
	 * Default: null (the browser viewport)
	 */
	root?: Element | null;
	/**
	 * When true, visible flips to true once and stays there.
	 * The element stays "revealed" even after scrolling back past it.
	 * Default: false
	 */
	once?: boolean;
}

/**
 * Tracks whether a DOM element is inside the viewport (or a scroll container).
 * Returns reactive `visible` state — no manual toggling needed.
 *
 * Pass a getter function that returns the element to observe. The getter is
 * re-evaluated reactively, so you can bind it to a `$state` ref.
 *
 * SSR-safe: `IntersectionObserver` only runs in the browser. On the server
 * `visible` stays false and the Slide component renders nothing, which is the
 * correct default for a "reveal on scroll" pattern.
 *
 * @example
 * ```svelte
 * <script>
 *   import { Slide, useInView } from 'svelte-anim';
 *
 *   let section = $state<HTMLElement | null>(null);
 *   const { visible } = useInView(() => section, { threshold: 0.2, once: true });
 * </script>
 *
 * <section bind:this={section}>
 *   <Slide {visible} direction="up" distance={60}>
 *     <h2>Reveals once when 20% of the section is visible</h2>
 *   </Slide>
 * </section>
 * ```
 */
export function useInView(
	getElement: () => Element | null,
	{
		threshold = 0,
		rootMargin = '0px',
		root = null,
		once = true
	}: UseInViewOptions = {}
) {
	let visible = $state(false);

	$effect(() => {
		if (areScrollAnimationsDisabled()) {
			visible = true;
			return;
		}

		// Bail on the server — IntersectionObserver doesn't exist there.
		if (!browser) return;

		const element = getElement();
		if (!element) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const isIntersecting = entries[0].isIntersecting;

				if (isIntersecting) {
					visible = true;
					// Stop observing once revealed — the element stays visible permanently.
					if (once) observer.disconnect();
				} else if (!once) {
					// Only toggle back to false when not in `once` mode.
					visible = false;
				}
			},
			{ threshold, rootMargin, root }
		);

		observer.observe(element);

		// Cleanup: disconnect when the tracked element changes or the component unmounts.
		return () => observer.disconnect();
	});

	return {
		get visible() {
			return visible;
		}
	};
}
