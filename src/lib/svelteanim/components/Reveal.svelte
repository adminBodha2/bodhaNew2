<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { RevealDirection } from '../transitions/reveal.js';

	interface Props {
		visible?: boolean;
		direction?: RevealDirection;
		/** Diagonal slant depth as % of element width. Default: 20 */
		slant?: number;
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
		slant = 20,
		start = 'top 90%',
		end = 'top 40%',
		scrub = 1,
		stagger = 0.15,
		scrollElement,
		children,
		...rest
	}: Props = $props();

	let wrapperRef: HTMLElement | null = null;

	function hiddenClipPath(dir: RevealDirection): string {
		switch (dir) {
			case 'left': return 'inset(0 100% 0 0)';
			case 'right': return 'inset(0 0 0 100%)';
			case 'up': return 'inset(0 0 100% 0)';
			case 'down': return 'inset(100% 0 0 0)';
			case 'diagonal': return 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)';
		}
	}

	function revealedClipPath(dir: RevealDirection, s: number): string {
		switch (dir) {
			case 'left': return 'inset(0 0% 0 0)';
			case 'right': return 'inset(0 0 0 0%)';
			case 'up': return 'inset(0 0 0% 0)';
			case 'down': return 'inset(0% 0 0 0)';
			case 'diagonal': return `polygon(0% 0%, ${100 + s}% 0%, 100% 100%, 0% 100%)`;
		}
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

		const dir = direction;
		const s = slant;
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
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let ctx: any = null;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let splitInstance: any = null;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let lineTweens: any[] = [];

		function killLineTweens() {
			lineTweens.forEach((t) => t.kill());
			lineTweens = [];
		}

		const init = async () => {
			const { gsap } = await import('gsap');
			const { ScrollTrigger } = await import('gsap/ScrollTrigger');
			const { SplitText } = await import('gsap/SplitText');
			gsap.registerPlugin(ScrollTrigger, SplitText);

			await document.fonts.ready;
			await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
			await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

			if (cancelled) return;

			ctx?.revert();
			ctx = null;
			splitInstance?.revert();
			killLineTweens();

			ctx = gsap.context(() => {
				splitInstance = SplitText.create(target, {
					aria: 'hidden',
					autoSplit: true,
					linesClass: 'reveal-comp-line',
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					onSplit: (self: any) => {
						killLineTweens();

						const lines = (self.lines ?? []) as HTMLElement[];
						gsap.set(lines, { clipPath: hiddenClipPath(dir) });

						const tween = gsap.to(lines, {
							clipPath: revealedClipPath(dir, s),
							ease: 'none',
							stagger: lineStagger,
							scrollTrigger: {
								trigger: target,
								start: triggerStart,
								end: triggerEnd,
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
		};

		void init();

		return () => {
			cancelled = true;
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

<style>
	:global(.reveal-comp-line) {
		display: block;
	}
</style>
