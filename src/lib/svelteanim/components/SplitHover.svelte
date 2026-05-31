<script lang="ts">
	import type { Snippet } from "svelte";
	import {
		areMotionAnimationsDisabled,
	} from "$lib/svelteanim/motionPreference.svelte";
	import { cn } from "../utils/cn";

	interface Props {
		/**
		 * The content to duplicate and animate on hover.
		 */
		children?: Snippet;
		/**
		 * Additional CSS classes for the container.
		 */
		class?: string;
		/**
		 * An optional external element that triggers the hover effect.
		 * If null, the component's wrapper triggers the effect.
		 * @default null
		 */
		hoverTarget?: HTMLElement | null;
		[prop: string]: unknown;
	}

	let {
		children,
		class: className = "",
		hoverTarget = null,
		...restProps
	}: Props = $props();

	let wrapperRef = $state<HTMLSpanElement | undefined>();
	let originalSpan = $state<HTMLSpanElement | undefined>();
	let cloneSpan = $state<HTMLSpanElement | undefined>();
	let originalSplit: any = null;
	let cloneSplit: any = null;
	let hoverTimeline: any = null;

	const attachWrapperRef = (node: HTMLSpanElement) => {
		wrapperRef = node;
		return () => {
			if (wrapperRef === node) {
				wrapperRef = undefined;
			}
		};
	};

	const attachOriginalSpan = (node: HTMLSpanElement) => {
		originalSpan = node;
		return () => {
			if (originalSpan === node) {
				originalSpan = undefined;
			}
		};
	};

	const attachCloneSpan = (node: HTMLSpanElement) => {
		cloneSpan = node;
		return () => {
			if (cloneSpan === node) {
				cloneSpan = undefined;
			}
		};
	};

	$effect(() => {
		if (typeof window === "undefined") return;

		const currentWrapper = wrapperRef;
		const currentOriginal = originalSpan;
		const currentClone = cloneSpan;
		const target = hoverTarget ?? currentWrapper;

		if (!target || !currentOriginal || !currentClone) return;

		if (areMotionAnimationsDisabled()) {
			hoverTimeline?.kill();
			hoverTimeline = null;
			originalSplit?.revert();
			originalSplit = null;
			cloneSplit?.revert();
			cloneSplit = null;
			currentClone.style.visibility = "hidden";
			return;
		}

		// Ensure clone is visible when motion is enabled
		currentClone.style.visibility = "";

		let cancelled = false;
		let ctx: any = null;
		let cleanupListeners: (() => void) | null = null;

		const init = async () => {
			try {
				const { gsap } = await import("gsap");
				const { SplitText } = await import("gsap/SplitText");
				const { CustomEase } = await import("gsap/dist/CustomEase");

				gsap.registerPlugin(SplitText, CustomEase);
				CustomEase.create("motion-core-ease", "0.625, 0.05, 0, 1");

				if (cancelled) return;

				ctx?.revert();
				ctx = null;
				originalSplit?.revert();
				cloneSplit?.revert();
				hoverTimeline?.kill();
				hoverTimeline = null;

				ctx = gsap.context(() => {
					originalSplit = SplitText.create(currentOriginal, {
						type: "chars",
						charsClass: "inline-block",
						onSplit: (self: any) => {
							if (!currentClone) return;

							cloneSplit?.revert();
							cloneSplit = SplitText.create(currentClone, {
								type: "chars",
								charsClass: "inline-block",
							});

							gsap.set(self.chars, { yPercent: 0 });
							gsap.set(cloneSplit.chars, { yPercent: 100 });

							hoverTimeline?.kill();
							hoverTimeline = gsap
								.timeline({ paused: true })
								.to(
									self.chars,
									{
										yPercent: -100,
										stagger: 0.02,
										duration: 0.35,
										ease: "motion-core-ease",
									},
									0,
								)
								.to(
									cloneSplit.chars,
									{
										yPercent: 0,
										stagger: 0.02,
										duration: 0.35,
										ease: "motion-core-ease",
									},
									0,
								);
						},
					});

					const handleEnter = () => hoverTimeline?.play();
					const handleLeave = () => hoverTimeline?.reverse();

					target.addEventListener("mouseenter", handleEnter);
					target.addEventListener("mouseleave", handleLeave);

					cleanupListeners = () => {
						target.removeEventListener("mouseenter", handleEnter);
						target.removeEventListener("mouseleave", handleLeave);
					};
				}, currentOriginal);
			} catch {
				if (cancelled) return;
				cleanupListeners?.();
				cleanupListeners = null;
				ctx?.revert();
				ctx = null;
				hoverTimeline?.kill();
				hoverTimeline = null;
				originalSplit?.revert();
				originalSplit = null;
				cloneSplit?.revert();
				cloneSplit = null;
			}
		};

		void init();

		return () => {
			cancelled = true;
			cleanupListeners?.();
			cleanupListeners = null;
			ctx?.revert();
			ctx = null;
			hoverTimeline?.kill();
			hoverTimeline = null;
			originalSplit?.revert();
			originalSplit = null;
			cloneSplit?.revert();
			cloneSplit = null;
		};
	});
</script>

<span
	{...restProps}
	class={cn(
		"main-item",
		className,
	)}
	{@attach attachWrapperRef}
>
	<span {@attach attachOriginalSpan}>
		{@render children?.()}
	</span>
	<span
		{@attach attachCloneSpan}
		class="inside-item"
		aria-hidden="true"
	>
		{@render children?.()}
	</span>
</span>

<style lang="sass">

.main-item
	font-family: inherit
	position: relative
	display: inline-flex
	overflow: hidden
	vertical-align: baseline
	line-height: 1.2
	color: inherit

.inside-item
	pointer-events: none
	position: absolute
	top: 0
	right: 0
	bottom: 0
	left: 0

</style>