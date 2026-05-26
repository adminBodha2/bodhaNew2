<script lang="ts">
	import { cn } from "../utils/cn";

	import type { Snippet } from "svelte";

	interface Props {
		/**
		 * Snippet to render the grid items.
		 */
		children?: Snippet;
		/**
		 * Additional CSS classes for the container.
		 */
		class?: string;
		/**
		 * Animation duration in seconds.
		 * @default 0.5
		 */
		duration?: number;
		/**
		 * Animation easing function.
		 * @default "power2.inOut"
		 */
		ease?: string;
		/**
		 * Stagger delay between items in seconds.
		 * @default 0
		 */
		stagger?: number;
		/**
		 * Number of columns for the grid.
		 */
		columns?: number | string;
		/**
		 * Additional inline styles.
		 */
		style?: string;
		[key: string]: unknown;
	}

	let {
		children,
		class: className = undefined,
		duration = 0.5,
		ease = "power2.inOut",
		stagger = 0,
		columns = undefined,
		style = undefined,
		...props
	}: Props = $props();

	let container = $state<HTMLElement | undefined>();
	let flipState = $state<unknown>(null);
	let gsapInstance = $state<any>(null);
	let flipPlugin = $state<any>(null);

	const attachContainer = (node: HTMLElement) => {
		container = node;
		return () => {
			if (container === node) {
				container = undefined;
			}
		};
	};

	let computedStyle = $derived.by(() => {
		const baseStyle = style || "";
		if (columns) {
			const colStyle = `grid-template-columns: repeat(${columns}, minmax(0, 1fr))`;
			return baseStyle ? `${baseStyle}; ${colStyle}` : colStyle;
		}
		return baseStyle;
	});

	$effect(() => {
		let cancelled = false;

		const init = async () => {
			const { gsap } = await import("gsap");
			const { Flip } = await import("gsap/Flip");
			gsap.registerPlugin(Flip);

			if (cancelled) return;

			gsapInstance = gsap;
			flipPlugin = Flip;
		};

		void init();

		return () => {
			cancelled = true;
		};
	});

	$effect.pre(() => {
		void className;
		void computedStyle;

		if (container && flipPlugin) {
			const items = container.querySelectorAll(".flip-grid-item");
			if (items.length > 0) {
				flipState = flipPlugin.getState([...items, container] as Element[]);
			}
		}
	});

	$effect(() => {
		void className;
		void computedStyle;

		if (flipState && container && flipPlugin && gsapInstance) {
			const currentState = flipState;
			const currentContainer = container;
			const currentGsap = gsapInstance;
			const currentFlip = flipPlugin;
			const items = currentContainer.querySelectorAll(".flip-grid-item");

			currentFlip.from(currentState, {
				targets: [...items, currentContainer] as Element[],
				duration,
				ease,
				stagger,
				absolute: ".flip-grid-item",
				onEnter: (elements: Element[]) => {
					currentGsap.fromTo(
						elements,
						{ opacity: 0, scale: 0 },
						{ opacity: 1, scale: 1, duration, ease },
					);
				},
				onLeave: (elements: Element[]) => {
					currentGsap.to(elements, { opacity: 0, scale: 0, duration, ease });
				},
			});

			flipState = null;
		}
	});
</script>

<div
	{@attach attachContainer}
	class={cn("relative grid", className)}
	style={computedStyle}
	{...props}
>
	{@render children?.()}
</div>
