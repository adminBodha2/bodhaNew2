<script lang="ts">
	import { browser } from '$app/environment';
	import type { Snippet } from 'svelte';
	import {
		areMotionAnimationsDisabled,
		revealMotionElement,
		waitForMotionLayout
	} from '../motionPreference.svelte';

	interface Props {
		/** Starting blur radius in px. Default: 10 */
		radius?: number;
		/** Starting scale (mimics optical defocus bloom). Default: 1.06 */
		initialScale?: number;
		/** Fade opacity during blur. Default: true */
		opacity?: boolean;
		/** Animation duration in ms. Default: 500 */
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
		radius = 10,
		initialScale = 1.06,
		opacity = true,
		duration = 500,
		delay = 0,
		stagger = 120,
		ease = 'power3.out',
		start = 'top 90%',
		end = 'bottom 50%',
		scrub = 3,
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
			target.style.filter = '';
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

		const blurRadius = radius;
		const blurScale = initialScale;
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
						filter: `blur(${blurRadius}px)`,
						scale: blurScale,
						willChange: 'transform, opacity, filter'
					});

					tween = gsap.to(targets, {
						autoAlpha: fade ? 1 : undefined,
						filter: 'blur(0px)',
						scale: 1,
						duration: animationDuration,
						delay: animationDelay,
						ease: animationEase,
						stagger: targetStagger,
						clearProps: 'transform,opacity,visibility,willChange,filter',
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
