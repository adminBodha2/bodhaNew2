<script lang="ts">
	import type { Snippet } from "svelte";
	import {
		areMotionAnimationsDisabled,
		revealMotionElement,
		waitForMotionLayout,
	} from "$lib/svelteanim/motionPreference.svelte";
	import { cn } from "../utils/cn";

	interface Props {
		/**
		 * Text/content to split into lines and words.
		 */
		children?: Snippet;
		/**
		 * Additional CSS classes for the wrapper.
		 */
		class?: string;
		/**
		 * ScrollTrigger start position.
		 * @default "top 90%"
		 */
		start?: string;
		/**
		 * ScrollTrigger end position.
		 * @default "top 30%"
		 */
		end?: string;
		/**
		 * ScrollTrigger scrub value.
		 * @default 1.234
		 */
		scrub?: boolean | number;
		/**
		 * Stagger applied across words inside each line.
		 * @default 0.21
		 */
		stagger?: number;
		/**
		 * Easing used for word translation.
		 * @default "power3.out"
		 */
		ease?: string;
		/**
		 * The element to use as the scroller. Defaults to window.
		 */
		scrollElement?: string | HTMLElement | null;
		[prop: string]: unknown;
	}

	let {
		children,
		class: className = "",
		start = "top 100%",
		end = "top 50%",
		scrub = 4,
		stagger = 0.21,
		ease = "expo.out",
		scrollElement,
		...restProps
	}: Props = $props();

	let wrapperRef = $state<HTMLElement | null>(null);
	let splitInstance: any = null;
	let lineTweens: any[] = [];
	const OFFSCREEN_MARGIN_PX = 8;

	const attachWrapperRef = (node: HTMLElement) => {
		wrapperRef = node;
		return () => {
			if (wrapperRef === node) {
				wrapperRef = null;
			}
		};
	};

	function killLineTweens() {
		lineTweens.forEach((tween) => tween.kill());
		lineTweens = [];
	}

	$effect(() => {
		if (typeof window === "undefined") return;
		const node = wrapperRef;
		if (!node) return;

		if (areMotionAnimationsDisabled()) {
			splitInstance?.revert();
			killLineTweens();
			revealMotionElement(node);
			return;
		}

		const triggerStart = start;
		const triggerEnd = end;
		const triggerScrub = scrub;
		const wordStagger = stagger;
		const wordEase = ease;
		const resolvedScroller =
			typeof scrollElement === "string"
				? document.querySelector<HTMLElement>(scrollElement)
				: scrollElement instanceof HTMLElement
					? scrollElement
					: null;
		const triggerScroller =
			resolvedScroller instanceof HTMLElement ? resolvedScroller : window;

		let cancelled = false;
		let ctx: any = null;

		const init = async () => {
			try {
				const { gsap } = await import("gsap");
				const { ScrollTrigger } = await import("gsap/ScrollTrigger");
				const { SplitText } = await import("gsap/SplitText");
				gsap.registerPlugin(ScrollTrigger, SplitText);

				await waitForMotionLayout();
				if (cancelled) return;

				ctx?.revert();
				ctx = null;
				splitInstance?.revert();
				killLineTweens();

				ctx = gsap.context(() => {
					splitInstance = SplitText.create(node, {
						aria: "hidden",
						autoSplit: true,
						linesClass: "stacking-words-line",
						onSplit: (self: any) => {
							killLineTweens();

							const words = (self.words ?? []) as HTMLElement[];
							words.forEach((word) => {
								const rect = word.getBoundingClientRect();
								gsap.set(word, {
									x:
										window.innerWidth -
										rect.left +
										rect.width +
										OFFSCREEN_MARGIN_PX,
								});
							});

							(self.lines ?? []).forEach((line: HTMLElement) => {
								const tween = gsap.to(
									line.querySelectorAll(".stacking-words-word"),
									{
										ease: wordEase,
										stagger: wordStagger,
										x: 0,
										scrollTrigger: {
											trigger: line,
											start: triggerStart,
											end: triggerEnd,
											scrub: triggerScrub,
											scroller: triggerScroller,
											invalidateOnRefresh: true,
										},
									},
								);
								lineTweens.push(tween);
							});

							ScrollTrigger.refresh();
						},
						tag: "span",
						type: "lines, words",
						wordsClass: "stacking-words-word",
					});

					gsap.set(node, { autoAlpha: 1 });
				}, node);
			} catch {
				if (cancelled) return;
				ctx?.revert();
				ctx = null;
				killLineTweens();
				splitInstance?.revert();
				splitInstance = null;
				revealMotionElement(node);
			}
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

<div
	{...restProps}
	class={cn("stacking-words", className)}
	{@attach attachWrapperRef}
>
	{@render children?.()}
</div>

<style lang="sass">

.stacking-words
	visibility: hidden
	overflow: hidden

.stacking-words :global(.stacking-words-line), .stacking-words :global(.stacking-words-line-mask)
	display: block

.stacking-words :global(.stacking-words-word)
	display: inline-block
	will-change: transform

</style>
