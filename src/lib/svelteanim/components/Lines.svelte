<script lang="ts">
	import type { Snippet } from "svelte";
	import type { RevealDirection } from "../transitions/reveal.js";
	import {
		areMotionAnimationsDisabled,
		revealMotionElement,
		waitForMotionLayout,
	} from "$lib/svelteanim/motionPreference.svelte";
	import { cn } from "../utils/cn";

	interface Props {
		children?: Snippet;
		class?: string;
		start?: string;
		end?: string;
		scrub?: boolean | number;
		ease?: string;
		direction?: RevealDirection;
		stagger?: number;
		scrollElement?: string | HTMLElement | null;
		[prop: string]: unknown;
	}

	let {
		children,
		class: className = "",
		start = "top 90%",
		end = "top 30%",
		scrub = true,
		ease = "expo.out",
		direction = "up",
		stagger = 0.1,
		scrollElement,
		...restProps
	}: Props = $props();

	let wrapperRef = $state<HTMLElement | null>(null);
	let splitInstance: any = null;
	let lineTweens: any[] = [];

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

	function hiddenClipPath(dir: RevealDirection): string {
		switch (dir) {
			case "left":
				return "inset(0 100% 0 0)";
			case "right":
				return "inset(0 0 0 100%)";
			case "up":
				return "inset(0 0 100% 0)";
			case "down":
				return "inset(100% 0 0 0)";
			case "diagonal":
				return "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)";
		}
	}

	function revealedClipPath(dir: RevealDirection): string {
		switch (dir) {
			case "left":
				return "inset(0 0% 0 0)";
			case "right":
				return "inset(0 0 0 0%)";
			case "up":
				return "inset(0 0 0% 0)";
			case "down":
				return "inset(0% 0 0 0)";
			case "diagonal":
				return "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
		}
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
		const lineEase = ease;
		const lineDirection = direction;
		const lineStagger = stagger;
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
						linesClass: "revealing-lines-line",
						onSplit: (self: any) => {
							killLineTweens();

							const lines = (self.lines ?? []) as HTMLElement[];
							gsap.set(lines, { clipPath: hiddenClipPath(lineDirection) });

							const tween = gsap.to(lines, {
								clipPath: revealedClipPath(lineDirection),
								ease: lineEase,
								stagger: lineStagger,
								scrollTrigger: {
									trigger: node,
									start: triggerStart,
									end: triggerEnd,
									scrub: triggerScrub,
									scroller: triggerScroller,
									invalidateOnRefresh: true,
								},
							});
							lineTweens.push(tween);

							ScrollTrigger.refresh();
						},
						tag: "span",
						type: "lines",
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
	class={cn("revealing-lines", className)}
	{@attach attachWrapperRef}
>
	{@render children?.()}
</div>

<style>
	.revealing-lines {
		visibility: hidden;
	}

	.revealing-lines :global(.revealing-lines-line) {
		display: block;
	}
</style>