<script lang="ts">
	import type { Snippet } from "svelte";
	import { cn } from "../utils/cn";

	interface ComponentProps {
		/**
		 * The content that will scramble on hover.
		 */
		children?: Snippet;
		/**
		 * Additional CSS classes for the container.
		 */
		class?: string;
		/**
		 * An optional external element that triggers the hover effect.
		 * @default null
		 */
		hoverTarget?: HTMLElement | null;
		/**
		 * Total duration of the scramble animation (in seconds).
		 * @default 0.6
		 */
		scrambleDuration?: number;
		/**
		 * Delay between each character's animation start (in seconds).
		 * @default 0.03
		 */
		stagger?: number;
		/**
		 * Number of scramble steps each character goes through before settling.
		 * @default 12
		 */
		cycles?: number;
		/**
		 * Characters used while scrambling. Defaults to a mix of letters, numbers, and symbols.
		 */
		characters?: string;
		[prop: string]: unknown;
	}

	let {
		children,
		class: className = "",
		hoverTarget = null,
		scrambleDuration = 0.6,
		stagger = 0.03,
		cycles = 12,
		characters = "BODHAISACULTURALTHINKTANKANDRESEARCHGROUP",
		...restProps
	}: ComponentProps = $props();

	let wrapperRef: HTMLSpanElement | undefined;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let splitInstance: any = null;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let hoverTimeline: any = null;

	const attachWrapperRef = (node: HTMLSpanElement) => {
		wrapperRef = node;
		return () => {
			if (wrapperRef === node) {
				wrapperRef = undefined;
			}
		};
	};

	const getRandomChar = (pool: string) => {
		if (!pool.length) return "";
		const index = Math.floor(Math.random() * pool.length);
		return pool[index] ?? "";
	};

	$effect(() => {
		if (typeof window === "undefined") return;
		if (!wrapperRef) return;
		const node = wrapperRef;
		const target = hoverTarget ?? node;
		if (!target) return;

		// Capture reactive props before the async gap
		const capturedDuration = scrambleDuration;
		const capturedStagger = stagger;
		const capturedCycles = cycles;
		const capturedCharacters = characters;

		hoverTimeline?.kill();
		hoverTimeline = null;
		splitInstance?.revert();

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let ctx: any = null;

		const init = async () => {
			const { gsap } = await import("gsap");
			const { SplitText } = await import("gsap/SplitText");
			gsap.registerPlugin(SplitText);

			const createScrambleTimeline = (nodes: HTMLElement[]) => {
				if (!nodes.length) return null;

				const pool = capturedCharacters.length
					? capturedCharacters
					: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
				const timeline = gsap.timeline({ paused: true });
				const totalDuration = Math.max(0.1, capturedDuration);
				const stepCount = Math.max(1, Math.floor(capturedCycles));
				const stepDuration = totalDuration / stepCount;

				nodes.forEach((charNode, index) => {
					const finalChar = charNode.dataset.originalChar ?? charNode.textContent ?? "";
					const charTimeline = gsap.timeline();

					if (finalChar.trim().length === 0) {
						charTimeline.call(() => {
							charNode.textContent = finalChar;
						});
					} else {
						for (let i = 0; i < stepCount; i += 1) {
							charTimeline.call(() => {
								charNode.textContent = getRandomChar(pool);
							});
							charTimeline.to({}, { duration: stepDuration });
						}
						charTimeline.call(() => {
							charNode.textContent = finalChar;
						});
					}

					timeline.add(charTimeline, index * capturedStagger);
				});

				return timeline;
			};

			ctx = gsap.context(() => {
				splitInstance = SplitText.create(node, {
					type: "chars",
					reduceWhiteSpace: false,
					charsClass: "inline-block",
				});

				const charNodes = (splitInstance.chars ?? []) as HTMLElement[];

				charNodes.forEach((charNode) => {
					charNode.style.display = "inline-block";
					charNode.dataset.originalChar = charNode.textContent ?? "";

					if (!charNode.textContent?.trim()) {
						charNode.style.whiteSpace = "pre";
						charNode.style.pointerEvents = "none";
					}
				});

				hoverTimeline = createScrambleTimeline(charNodes);

				const handleEnter = () => {
					if (!hoverTimeline) {
						hoverTimeline = createScrambleTimeline(charNodes);
					}
					hoverTimeline?.restart();
				};

				const handleLeave = () => {
					hoverTimeline?.progress(1);
				};

				target.addEventListener("mouseenter", handleEnter);
				target.addEventListener("mouseleave", handleLeave);

				return () => {
					target.removeEventListener("mouseenter", handleEnter);
					target.removeEventListener("mouseleave", handleLeave);
				};
			}, node);
		};

		void init();

		return () => {
			ctx?.revert();
			hoverTimeline = null;
			splitInstance?.revert();
			splitInstance = null;
		};
	});
</script>

<span
	{...restProps}
	class={cn(className)}
	{@attach attachWrapperRef}
>
	{@render children?.()}
</span>
