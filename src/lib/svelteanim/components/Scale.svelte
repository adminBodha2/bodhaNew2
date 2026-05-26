<script lang="ts">
	import { browser } from '$app/environment';
	import type { Snippet } from 'svelte';
	import {
		areMotionAnimationsDisabled,
		revealMotionElement,
		waitForMotionLayout
	} from '../motionPreference.svelte';

	interface Props {
		/** Starting scale factor. Default: 0.85 */
		initialScale?: number;
		/** CSS transform-origin. Default: 'center' */
		origin?: string;
		/** Starting rotation in degrees. Default: 0 */
		rotate?: number;
		/** Fade opacity during scale. Default: true */
		opacity?: boolean;
		/** Animation duration in ms. Default: 400 */
		duration?: number;
		/** Delay before animation starts in ms. Default: 0 */
		delay?: number;
		/** Stagger between targets in ms. Default: 120 */
		stagger?: number;
		/** GSAP ease string. Default: 'power3.out' */
		ease?: string;
		/** ScrollTrigger start position. Default: 'top 90%' */
		start?: string;
		/** ScrollTrigger end position. Used only when scrub is enabled. */
		end?: string;
		/** ScrollTrigger scrub value. Default: false */
		scrub?: boolean | number;
		/** When true, reverse when scrolling back. Default: false */
		replay?: boolean;
		/** Optional targets inside the wrapper. Defaults to direct children. */
		targetSelector?: string;
		/** Optional scroll container selector or element. Defaults to window. */
		scrollElement?: string | HTMLElement | null;
		/** Wrapper display mode. Default: 'block' */
		display?: string;
		children: Snippet;
		[key: string]: unknown;
	}

	let {
		initialScale = 0,
		origin = 'center',
		rotate = 0,
		opacity = true,
		duration = 400,
		delay = 0,
		stagger = 120,
		ease = 'power3.out',
		start = 'top 80%',
		end = 'bottom 40%',
		scrub = 1,
		replay = true,
		targetSelector,
		scrollElement,
		display = 'block',
		children,
		...rest
	}: Props = $props();

	let wrapperRef = $state<HTMLElement | null>(null);
	let tween: any = null;
	let ctx: any = null;

	const attachWrapperRef = (node: HTMLElement) => {
		wrapperRef = node;
		return () => {
			if (wrapperRef === node) wrapperRef = null;
		};
	};

	function getTargets(node: HTMLElement): HTMLElement[] {
		const selected = targetSelector
			? Array.from(node.querySelectorAll<HTMLElement>(targetSelector))
			: Array.from(node.children).filter(
					(child): child is HTMLElement => child instanceof HTMLElement
				);
		if (selected.length > 0) return selected;
		const fallback = node.firstElementChild;
		return fallback instanceof HTMLElement ? [fallback] : [node];
	}

	function clearTargets(targets: HTMLElement[]) {
		targets.forEach((target) => {
			revealMotionElement(target);
			target.style.transform = '';
			target.style.willChange = '';
		});
	}

	$effect(() => {
		if (!browser) return;
		const node = wrapperRef;
		if (!node) return;

		const targets = getTargets(node);

		tween?.kill();
		tween = null;
		ctx?.revert();
		ctx = null;

		if (areMotionAnimationsDisabled()) {
			clearTargets(targets);
			return;
		}

		const scaleFrom = initialScale;
		const transformOrigin = origin;
		const rotateFrom = rotate;
		const fade = opacity;
		const animationDuration = duration / 1000;
		const animationDelay = delay / 1000;
		const targetStagger = stagger / 1000;
		const animationEase = ease;
		const triggerStart = start;
		const triggerEnd = end;
		const triggerScrub = scrub;
		const toggleActions = replay ? 'play reverse play reverse' : 'play none none none';
		const resolvedScroller =
			typeof scrollElement === 'string'
				? document.querySelector<HTMLElement>(scrollElement)
				: scrollElement instanceof HTMLElement
					? scrollElement
					: null;
		const triggerScroller =
			resolvedScroller instanceof HTMLElement ? resolvedScroller : window;

		let cancelled = false;

		const init = async () => {
			try {
				const { gsap } = await import('gsap');
				const { ScrollTrigger } = await import('gsap/ScrollTrigger');
				gsap.registerPlugin(ScrollTrigger);

				await waitForMotionLayout();
				if (cancelled) return;

				ctx = gsap.context(() => {
					gsap.set(targets, {
						autoAlpha: fade ? 0 : 1,
						scale: scaleFrom,
						rotation: rotateFrom,
						transformOrigin,
						willChange: 'transform, opacity'
					});

					tween = gsap.to(targets, {
						autoAlpha: fade ? 1 : undefined,
						scale: 1,
						rotation: 0,
						duration: animationDuration,
						delay: animationDelay,
						ease: animationEase,
						stagger: targetStagger,
						clearProps: 'transform,opacity,visibility,willChange',
						scrollTrigger: {
							trigger: node,
							start: triggerStart,
							end: triggerEnd,
							scrub: triggerScrub,
							scroller: triggerScroller,
							toggleActions,
							once: !replay && !triggerScrub,
							invalidateOnRefresh: true
						}
					});
				}, node);
			} catch {
				if (cancelled) return;
				ctx?.revert();
				ctx = null;
				tween?.kill();
				tween = null;
				clearTargets(targets);
			}
		};

		void init();

		return () => {
			cancelled = true;
			ctx?.revert();
			ctx = null;
			tween?.kill();
			tween = null;
			clearTargets(targets);
		};
	});
</script>

<div {...rest} style:display={display} {@attach attachWrapperRef}>
	{@render children()}
</div>
