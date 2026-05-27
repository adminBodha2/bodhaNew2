<script lang="ts">
	import { browser } from '$app/environment';
	import type { Snippet } from 'svelte';
	import {
		areMotionAnimationsDisabled,
		revealMotionElement,
		waitForMotionLayout
	} from '../motionPreference.svelte';
	import type { RevealDirection } from '../transitions/reveal.js';

	interface Props {
		/** Direction the cut reveal sweeps from. Default: 'up' */
		direction?: RevealDirection;
		/**
		 * For direction="diagonal" only.
		 * Controls how steep the leading edge is, as % of element width.
		 * Higher = shallower angle. Default: 18
		 */
		slant?: number;
		/** Fade opacity during the reveal. Default: true */
		opacity?: boolean;
		/** Animation duration in ms. Default: 550 */
		duration?: number;
		/** Delay before animation starts in ms. Default: 0 */
		delay?: number;
		/** Stagger between targets in ms. Default: 80 */
		stagger?: number;
		/** GSAP ease string. Default: 'power3.out' */
		ease?: string;
		/** ScrollTrigger start position. Default: 'top 88%' */
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
		direction = 'up',
		slant = 0,
		opacity = true,
		duration = 550,
		delay = 0,
		stagger = 140,
		ease = 'power3.out',
		start = 'top 88%',
		end = 'bottom 45%',
		scrub = 4,
		replay = true,
		targetSelector = ".cut-item",
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
			target.style.willChange = '';
		});
	}

	function hiddenClipPath(dir: RevealDirection, s: number): string {
		switch (dir) {
			case 'left':
				return 'inset(0 100% 0 0)';
			case 'right':
				return 'inset(0 0 0 100%)';
			case 'up':
				return 'inset(0 0 100% 0)';
			case 'down':
				return 'inset(100% 0 0 0)';
			case 'diagonal':
				return 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)';
		}
	}

	function revealedClipPath(dir: RevealDirection, s: number): string {
		switch (dir) {
			case 'left':
				return 'inset(0 0% 0 0)';
			case 'right':
				return 'inset(0 0 0 0%)';
			case 'up':
				return 'inset(0 0 0% 0)';
			case 'down':
				return 'inset(0% 0 0 0)';
			case 'diagonal':
				return `polygon(0% 0%, ${100 + s}% 0%, 100% 100%, 0% 100%)`;
		}
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

		const cutDirection = direction;
		const cutSlant = slant;
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
						clipPath: hiddenClipPath(cutDirection, cutSlant),
						willChange: 'clip-path, opacity'
					});

					tween = gsap.to(targets, {
						autoAlpha: fade ? 1 : undefined,
						clipPath: revealedClipPath(cutDirection, cutSlant),
						duration: animationDuration,
						delay: animationDelay,
						ease: animationEase,
						stagger: targetStagger,
						clearProps: 'clipPath,opacity,visibility,willChange',
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
