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
		 * Text/content to split into lines and letters.
		 */
		children?: Snippet;
		/**
		 * Additional CSS classes for the wrapper.
		 */
		class?: string;
		/**
		 * ScrollTrigger start position.
		 * @default "top 100%"
		 */
		start?: string;
		/**
		 * ScrollTrigger end position.
		 * @default "top 50%"
		 */
		end?: string;
		/**
		 * ScrollTrigger scrub value.
		 * @default 4
		 */
		scrub?: boolean | number;
		/**
		 * Stagger applied across letters inside each line.
		 * @default 0.045
		 */
		stagger?: number;
		/**
		 * Easing used for letter translation.
		 * @default "expo.out"
		 */
		ease?: string;
		/**
		 * Direction letters slide in from.
		 * @default "right"
		 */
		direction?: "left" | "right";
		/**
		 * The element to use as the scroller. Defaults to window.
		 */
		scrollElement?: string | HTMLElement | null;
		[prop: string]: unknown;
	}

	let {
		children,
		class: className = "",
		start = "top 90%",
		end = "top 60%",
		scrub = 2,
		stagger = 0.045,
		ease = "power1.inOut",
		direction = "right",
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
		lineTweens.forEach((tl) => {
			tl.scrollTrigger?.kill();
			tl.kill();
		});
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
		const letterStagger = stagger;
		const letterEase = ease;
		const letterDirection = direction;
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
						charsClass: "stacking-letters-char",
						linesClass: "stacking-letters-line",
						onSplit: (self: any) => {
							killLineTweens();

							const chars = (self.chars ?? []) as HTMLElement[];
							chars.forEach((char) => {
								const rect = char.getBoundingClientRect();
								const startX =
									letterDirection === "left"
										? -(rect.right + OFFSCREEN_MARGIN_PX)
										: window.innerWidth - rect.left + rect.width + OFFSCREEN_MARGIN_PX;
								gsap.set(char, { x: startX, opacity: 0 });
							});

							(self.lines ?? []).forEach((line: HTMLElement) => {
								const chars = Array.from(
									line.querySelectorAll<HTMLElement>(".stacking-letters-char"),
								);
								const tl = gsap.timeline({
									scrollTrigger: {
										trigger: line,
										start: triggerStart,
										end: triggerEnd,
										scrub: triggerScrub,
										scroller: triggerScroller,
										invalidateOnRefresh: true,
									},
								});
								tl.to(chars, {
									x: 0,
									opacity: 1,
									ease: letterEase,
									stagger: letterStagger,
								});
								lineTweens.push(tl);
							});

							ScrollTrigger.refresh();
						},
						tag: "span",
						type: "lines, chars",
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
	class={cn("stacking-letters", className)}
	{@attach attachWrapperRef}
>
	{@render children?.()}
</div>

<style lang="sass">

.stacking-letters
	visibility: hidden
	overflow-x: visible

.stacking-letters :global(.stacking-letters-line), .stacking-letters :global(.stacking-letters-line-mask)
	display: block

.stacking-letters :global(.stacking-letters-char)
	display: inline-block
	will-change: transform

</style>
