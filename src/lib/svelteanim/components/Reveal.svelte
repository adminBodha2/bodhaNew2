<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { RevealDirection } from '../transitions/reveal.js';
	import {
		areMotionAnimationsDisabled,
		revealMotionElement,
		waitForMotionLayout
	} from '../motionPreference.svelte';

	interface Props {
		visible?: boolean;
		direction?: RevealDirection;
		/** GSAP ease for the reveal tween. Default: 'power3.out' */
		ease?: string;
		/** ScrollTrigger start. Default: 'top 90%' */
		start?: string;
		/** ScrollTrigger end. Default: 'top 40%' */
		end?: string;
		/** Scrub amount in seconds, or true/false. Default: 1 */
		scrub?: boolean | number;
		/** Stagger between each line reveal. Default: 0.15 */
		stagger?: number;
		/** Optional scroll container selector or element */
		scrollElement?: string | HTMLElement | null;
		children: Snippet;
		[key: string]: unknown;
	}

	let {
		visible = true,
		direction = 'up',
		ease = 'power4.out',
		start = 'top 90%',
		end = 'top 40%',
		scrub = 3,
		stagger = 0.15,
		scrollElement,
		children,
		...rest
	}: Props = $props();

	let wrapperRef = $state<HTMLElement | null>(null);

	function hiddenClipPath(dir: RevealDirection): string {
		switch (dir) {
			case 'left': return 'inset(0 100% 0 0)';
			case 'right': return 'inset(0 0 0 100%)';
			case 'up': return 'inset(0 0 100% 0)';
			case 'down': return 'inset(100% 0 0 0)';
			case 'diagonal': return 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)';
		}
	}

	function revealedClipPath(dir: RevealDirection): string {
		switch (dir) {
			case 'left': return 'inset(0 0% 0 0)';
			case 'right': return 'inset(0 0 0 0%)';
			case 'up': return 'inset(0 0 0% 0)';
			case 'down': return 'inset(0% 0 0 0)';
			case 'diagonal': return 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
		}
	}

	function clampScrollPosition(value: string): string {
		return value.startsWith('clamp(') || value.includes('max') ? value : `clamp(${value})`;
	}

	const attachWrapperRef = (node: HTMLElement) => {
		wrapperRef = node;
		return () => { if (wrapperRef === node) wrapperRef = null; };
	};

	$effect(() => {
		if (typeof window === 'undefined') return;
		const node = wrapperRef;
		if (!node || !visible) return;

		// display:contents means the clip-path must go on the first rendered child
		const target = (node.firstElementChild as HTMLElement | null) ?? node;

		if (areMotionAnimationsDisabled()) {
			revealMotionElement(target);
			return;
		}

		const dir = direction;
		const triggerEase = ease;
		const triggerStart = start;
		const triggerEnd = end;
		const triggerScrub = scrub;
		const lineStagger = stagger;
		const resolvedScroller =
			typeof scrollElement === 'string'
				? (document.querySelector<HTMLElement>(scrollElement) ?? window)
				: scrollElement instanceof HTMLElement
					? scrollElement
					: window;

		let cancelled = false;
		let ctx: any = null;
		let splitInstance: any = null;
		let lineTweens: any[] = [];
		let resizeObserver: ResizeObserver | null = null;
		let refreshFrame = 0;
		let refreshAfterLoad: (() => void) | null = null;

		function killLineTweens() {
			lineTweens.forEach((t) => t.kill());
			lineTweens = [];
		}

		const init = async () => {
			try {
				const { gsap } = await import('gsap');
				const { ScrollTrigger } = await import('gsap/ScrollTrigger');
				const { SplitText } = await import('gsap/SplitText');
				gsap.registerPlugin(ScrollTrigger, SplitText);

				await waitForMotionLayout();

				if (cancelled) return;

				ctx?.revert();
				ctx = null;
				splitInstance?.revert();
				killLineTweens();
				resizeObserver?.disconnect();
				resizeObserver = null;

				const refreshSoon = () => {
					cancelAnimationFrame(refreshFrame);
					refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
				};

				ctx = gsap.context(() => {
					splitInstance = SplitText.create(target, {
						aria: 'hidden',
						autoSplit: true,
						linesClass: 'reveal-comp-line',
						onSplit: (self: any) => {
							killLineTweens();

							const lines = (self.lines ?? []) as HTMLElement[];
							gsap.set(lines, { clipPath: hiddenClipPath(dir) });

							const tween = gsap.to(lines, {
								clipPath: revealedClipPath(dir),
								ease: triggerEase,
								stagger: lineStagger,
								scrollTrigger: {
									trigger: target,
									start: clampScrollPosition(triggerStart),
									end: clampScrollPosition(triggerEnd),
									scrub: triggerScrub,
									scroller: resolvedScroller,
									invalidateOnRefresh: true,
								}
							});
							lineTweens.push(tween);

							ScrollTrigger.refresh();
						},
						tag: 'span',
						type: 'lines',
					});

					gsap.set(target, { autoAlpha: 1 });
				}, node);

				refreshAfterLoad = refreshSoon;
				window.addEventListener('load', refreshAfterLoad, { once: true });

				if ('ResizeObserver' in window) {
					resizeObserver = new ResizeObserver(refreshSoon);
					resizeObserver.observe(document.body);
					resizeObserver.observe(document.documentElement);
					resizeObserver.observe(target);
				}

				refreshSoon();
			} catch {
				if (cancelled) return;
				ctx?.revert();
				ctx = null;
				killLineTweens();
				splitInstance?.revert();
				splitInstance = null;
				resizeObserver?.disconnect();
				resizeObserver = null;
				revealMotionElement(target);
			}
		};

		void init();

		return () => {
			cancelled = true;
			if (refreshAfterLoad) window.removeEventListener('load', refreshAfterLoad);
			cancelAnimationFrame(refreshFrame);
			resizeObserver?.disconnect();
			resizeObserver = null;
			ctx?.revert();
			ctx = null;
			killLineTweens();
			splitInstance?.revert();
			splitInstance = null;
		};
	});
</script>

{#if visible}
	<div {...rest} style:display="contents" {@attach attachWrapperRef}>
		{@render children()}
	</div>
{/if}

<style lang="sass">
	:global(.reveal-comp-line)
		display: block;
</style>
