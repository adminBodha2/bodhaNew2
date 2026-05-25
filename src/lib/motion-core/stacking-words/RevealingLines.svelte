<script lang="ts">
	import type { Snippet } from "svelte";
	import { cn } from "../utils/cn";

	interface Props {
		children?: Snippet;
		class?: string;
		start?: string;
		end?: string;
		scrub?: boolean | number;
		ease?: string;
		fromOpacity?: number;
		scrollElement?: string | HTMLElement | null;
		[prop: string]: unknown;
	}

	let {
		children,
		class: className = "",
		start = "top 90%",
		end = "top 30%",
		scrub = 3,
		ease = "power3.out",
		fromOpacity = 0,
		scrollElement,
		...restProps
	}: Props = $props();

	let wrapperRef: HTMLElement | null = null;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let splitInstance: any = null;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

	async function waitForLayout() {
		await document.fonts.ready;
		await new Promise<void>((resolve) =>
			requestAnimationFrame(() => resolve()),
		);
		await new Promise<void>((resolve) =>
			requestAnimationFrame(() => resolve()),
		);
	}

	$effect(() => {
		if (typeof window === "undefined") return;
		const node = wrapperRef;
		if (!node) return;
		const triggerStart = start;
		const triggerEnd = end;
		const triggerScrub = scrub;
		const lineEase = ease;
		const lineFromOpacity = fromOpacity;
		const resolvedScroller =
			typeof scrollElement === "string"
				? document.querySelector<HTMLElement>(scrollElement)
				: scrollElement instanceof HTMLElement
					? scrollElement
					: null;
		const triggerScroller =
			resolvedScroller instanceof HTMLElement ? resolvedScroller : window;

		let cancelled = false;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let ctx: any = null;

		const init = async () => {
			const { gsap } = await import("gsap");
			const { ScrollTrigger } = await import("gsap/ScrollTrigger");
			const { SplitText } = await import("gsap/SplitText");
			gsap.registerPlugin(ScrollTrigger, SplitText);

			await waitForLayout();
			if (cancelled || !wrapperRef) return;

			ctx?.revert();
			ctx = null;
			splitInstance?.revert();
			killLineTweens();

			ctx = gsap.context(() => {
				splitInstance = SplitText.create(wrapperRef, {
					aria: "hidden",
					autoSplit: true,
					linesClass: "revealing-lines-line",
					onSplit: (self: any) => {
						killLineTweens();

						(self.lines ?? []).forEach((line: HTMLElement) => {
							gsap.set(line, { opacity: lineFromOpacity });
							const tween = gsap.to(line, {
								ease: lineEase,
								opacity: 1,
								scrollTrigger: {
									trigger: line,
									start: triggerStart,
									end: triggerEnd,
									scrub: triggerScrub,
									scroller: triggerScroller,
									invalidateOnRefresh: true,
								},
							});
							lineTweens.push(tween);
						});

						ScrollTrigger.refresh();
					},
					tag: "span",
					type: "lines",
				});

				gsap.set(wrapperRef, { autoAlpha: 1 });
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
