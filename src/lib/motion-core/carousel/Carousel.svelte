<script module lang="ts">
	import type { Snippet } from "svelte";

	export type CarouselItem = {
		title: string;
		description: string;
		id: number;
		icon?: Snippet;
	};
</script>

<script lang="ts">
	import { onDestroy, onMount, untrack } from "svelte";
	import { cn } from "../utils/cn";

	type Props = {
		items?: CarouselItem[];
		baseWidth?: number;
		autoplay?: boolean;
		autoplayDelay?: number;
		pauseOnHover?: boolean;
		loop?: boolean;
		round?: boolean;
		class?: string;
	};

	type GsapInstance = typeof import("gsap").gsap;
	type GsapTween = ReturnType<GsapInstance["to"]>;

	const DEFAULT_ITEMS: CarouselItem[] = [
		{ title: "Text Animations", description: "Cool text animations for your projects.", id: 1 },
		{ title: "Animations", description: "Smooth animations for your projects.", id: 2 },
		{ title: "Components", description: "Reusable components for your projects.", id: 3 },
		{ title: "Backgrounds", description: "Beautiful backgrounds and patterns.", id: 4 },
		{ title: "Common UI", description: "Common UI components are coming soon!", id: 5 },
	];

	let {
		items = DEFAULT_ITEMS,
		baseWidth = 300,
		autoplay = false,
		autoplayDelay = 3000,
		pauseOnHover = false,
		loop = false,
		round = false,
		class: className = "",
	}: Props = $props();

	const containerPadding = 16;
	const GAP = 16;
	const ANIMATION_OPTIONS = { duration: 0.5, ease: "power3.out" };
	const DRAG_BUFFER = 0;
	const VELOCITY_THRESHOLD = 500;

	const itemWidth = $derived(baseWidth - containerPadding * 2);
	const trackItemOffset = $derived(itemWidth + GAP);
	const itemsForRender = $derived(
		!loop ? items : items.length === 0 ? [] : [items[items.length - 1] as CarouselItem, ...items, items[0] as CarouselItem],
	);

	let position = $state(0);
	let isHovered = $state(false);
	let isJumping = $state(false);
	let isAnimating = $state(false);
	let dragging = $state(false);
	let xValue = $state(0);
	let gsapInstance = $state<GsapInstance | null>(null);

	const xProxy = { value: 0 };

	let containerRef: HTMLDivElement;
	let currentAnim: GsapTween | null = null;
	let dragStartX = 0;
	let dragStartT = 0;
	let dragOffset = 0;

	const startingPosition = $derived(loop && items.length > 0 ? 1 : 0);
	const activeIndex = $derived(
		items.length === 0
			? 0
			: loop
				? (position - 1 + items.length) % items.length
				: Math.min(position, items.length - 1),
	);

	function setX(value: number) {
		xProxy.value = value;
		xValue = value;
	}

	function animateTo(target: number, duration?: number) {
		currentAnim?.kill();
		currentAnim = null;

		if (duration === 0 || !gsapInstance) {
			setX(target);
			handleAnimationComplete();
			return;
		}

		isAnimating = true;
		currentAnim = gsapInstance.to(xProxy, {
			value: target,
			duration: duration ?? ANIMATION_OPTIONS.duration,
			ease: ANIMATION_OPTIONS.ease,
			overwrite: "auto",
			onUpdate: () => {
				xValue = xProxy.value;
			},
			onComplete: () => {
				currentAnim = null;
				handleAnimationComplete();
			},
		});
	}

	function handleAnimationComplete() {
		if (!loop || itemsForRender.length <= 1) {
			isAnimating = false;
			return;
		}

		const lastCloneIndex = itemsForRender.length - 1;

		if (position === lastCloneIndex) {
			isJumping = true;
			position = 1;
			setX(-trackItemOffset);
			requestAnimationFrame(() => {
				isJumping = false;
				isAnimating = false;
			});
			return;
		}

		if (position === 0) {
			isJumping = true;
			position = items.length;
			setX(-items.length * trackItemOffset);
			requestAnimationFrame(() => {
				isJumping = false;
				isAnimating = false;
			});
			return;
		}

		isAnimating = false;
	}

	function onPointerDown(event: PointerEvent) {
		if (isAnimating) return;

		dragging = true;
		dragStartX = event.clientX;
		dragStartT = performance.now();
		dragOffset = 0;
		currentAnim?.kill();
		currentAnim = null;
		(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
	}

	function onPointerMove(event: PointerEvent) {
		if (!dragging) return;

		dragOffset = event.clientX - dragStartX;
		setX(-position * trackItemOffset + dragOffset);
	}

	function onPointerUp(event: PointerEvent) {
		if (!dragging) return;

		dragging = false;
		const dt = Math.max(1, performance.now() - dragStartT);
		const velocity = (dragOffset / dt) * 1000;
		const direction =
			dragOffset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD
				? 1
				: dragOffset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD
					? -1
					: 0;

		(event.currentTarget as HTMLElement).releasePointerCapture(event.pointerId);

		if (direction === 0) {
			animateTo(-position * trackItemOffset);
			return;
		}

		const next = position + direction;
		const max = itemsForRender.length - 1;
		position = Math.max(0, Math.min(next, max));
	}

	function mapRange(inMin: number, inMax: number, outMin: number, outMax: number, value: number) {
		if (inMin === inMax) return outMin;
		return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);
	}

	function rotateForIndex(index: number): number {
		const left = -(index + 1) * trackItemOffset;
		const center = -index * trackItemOffset;
		const right = -(index - 1) * trackItemOffset;

		if (xValue <= center) {
			return mapRange(left, center, 90, 0, xValue);
		}

		return mapRange(center, right, 0, -90, xValue);
	}

	$effect(() => {
		const target = -position * trackItemOffset;

		if (isJumping) {
			setX(target);
			return;
		}

		untrack(() => animateTo(target));
	});

	$effect(() => {
		void items.length;
		void loop;
		void trackItemOffset;

		untrack(() => {
			position = startingPosition;
			setX(-startingPosition * trackItemOffset);
		});
	});

	$effect(() => {
		if (!autoplay || itemsForRender.length <= 1) return;
		if (pauseOnHover && isHovered) return;

		const id = setInterval(() => {
			position = Math.min(position + 1, itemsForRender.length - 1);
		}, autoplayDelay);

		return () => clearInterval(id);
	});

	onMount(() => {
		let cancelled = false;

		const init = async () => {
			const { gsap } = await import("gsap");
			if (!cancelled) {
				gsapInstance = gsap;
			}
		};

		void init();

		if (pauseOnHover && containerRef) {
			const enter = () => (isHovered = true);
			const leave = () => (isHovered = false);

			containerRef.addEventListener("mouseenter", enter);
			containerRef.addEventListener("mouseleave", leave);

			return () => {
				cancelled = true;
				containerRef.removeEventListener("mouseenter", enter);
				containerRef.removeEventListener("mouseleave", leave);
			};
		}

		return () => {
			cancelled = true;
		};
	});

	onDestroy(() => {
		currentAnim?.kill();
		currentAnim = null;
	});
</script>

<div
	bind:this={containerRef}
	class={cn(
		"relative overflow-hidden p-4",
		round ? "rounded-full border border-white" : "rounded-[24px] border border-[#222]",
		className,
	)}
	style="width:{baseWidth}px; {round ? `height:${baseWidth}px;` : ''}"
>
	<div
		class="flex"
		role="group"
		aria-label="Carousel slides"
		style="width:{itemWidth}px; gap:{GAP}px; perspective:1000px; perspective-origin:{position *
			trackItemOffset +
			itemWidth / 2}px 50%; transform:translate3d({xValue}px, 0, 0); cursor:{dragging
			? 'grabbing'
			: 'grab'};"
		onpointerdown={onPointerDown}
		onpointermove={onPointerMove}
		onpointerup={onPointerUp}
		onpointercancel={onPointerUp}
	>
		{#each itemsForRender as item, index (`${item.id}-${index}`)}
			<div
				class={cn(
					"relative flex shrink-0 flex-col overflow-hidden",
					round
						? "items-center justify-center border-0 bg-[#120F17] text-center"
						: "items-start justify-between rounded-[12px] border border-[#222] bg-[#222]",
				)}
				style="width:{itemWidth}px; height:{round
					? `${itemWidth}px`
					: '100%'}; transform: rotateY({rotateForIndex(index).toFixed(3)}deg); {round
					? 'border-radius:50%;'
					: ''}"
			>
				<div class={round ? "m-0 p-0" : "mb-4 p-5"}>
					<span class="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#120F17]">
						{#if item.icon}
							{@render item.icon()}
						{:else}
							<span class="block h-2 w-2 rounded-full bg-white"></span>
						{/if}
					</span>
				</div>
				<div class="p-5">
					<div class="mb-1 text-lg font-black text-white">{item.title}</div>
					<p class="text-sm text-white">{item.description}</p>
				</div>
			</div>
		{/each}
	</div>
	<div class={cn("flex w-full justify-center", round ? "absolute bottom-12 left-1/2 z-20 -translate-x-1/2" : "")}>
		<div class="mt-4 flex w-[150px] justify-between px-8">
			{#each items as _, index (index)}
				<button
					type="button"
					class={cn(
						"h-2 w-2 cursor-pointer rounded-full transition-colors duration-150",
						activeIndex === index
							? round
								? "bg-white"
								: "bg-[#333333]"
							: round
								? "bg-[#555]"
								: "bg-[rgba(51,51,51,0.4)]",
					)}
					style="transform:scale({activeIndex === index ? 1.2 : 1}); transition: transform 0.15s, background-color 0.15s; border:0;"
					onclick={() => (position = loop ? index + 1 : index)}
					aria-label="Go to slide {index + 1}"
				></button>
			{/each}
		</div>
	</div>
</div>
