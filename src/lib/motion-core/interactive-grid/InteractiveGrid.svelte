<script lang="ts">
	import Scene from "./InteractiveGridScene.svelte";
	import { areMotionAnimationsDisabled } from "$lib/svelteanim/motionPreference.svelte";
	import { cn } from "../utils/cn";

	interface Props {
		/**
		 * The image source URL.
		 */
		image: string;
		/**
		 * Additional CSS classes for the container.
		 */
		class?: string;
		/**
		 * Grid resolution (number of cells per row/column).
		 * @default 15
		 */
		grid?: number;
		/**
		 * Radius of mouse influence.
		 * @default 0.15
		 */
		mouseSize?: number;
		/**
		 * Strength of the distortion effect.
		 * @default 0.35
		 */
		strength?: number;
		/**
		 * Relaxation factor for returning to original state (0-1).
		 * @default 0.9
		 */
		relaxation?: number;
		[key: string]: unknown;
	}

	let {
		image,
		class: className = "",
		grid = 15,
		mouseSize = 0.15,
		strength = 0.35,
		relaxation = 0.9,
		...rest
	}: Props = $props();
	let container = $state<HTMLElement>();
	let mouseX = $state(0);
	let mouseY = $state(0);
	const motionDisabled = $derived(areMotionAnimationsDisabled());

	const attachContainer = (node: HTMLElement) => {
		container = node;
		return () => {
			if (container === node) {
				container = undefined;
			}
		};
	};

	function handleMouseMove(e: MouseEvent) {
		if (motionDisabled) return;
		if (!container) return;
		const rect = container.getBoundingClientRect();
		mouseX = (e.clientX - rect.left) / rect.width;
		mouseY = (e.clientY - rect.top) / rect.height;
	}
</script>

<div
	{@attach attachContainer}
	class={cn("intgrid", className)}
	onmousemove={handleMouseMove}
	{...rest}
>
	<div class="inside-intgrid">
		{#if motionDisabled}
			<img class="grid-fallback" src={image} alt="" aria-hidden="true" />
		{:else}
			<Scene
				{image}
				{grid}
				{mouseSize}
				{strength}
				{relaxation}
				{mouseX}
				{mouseY}
			/>
		{/if}
	</div>
</div>

<style lang="sass">

.intgrid
	position: relative
	height: 100%
	width: 100%
	overflow: hidden

.inside-intgrid
	position: absolute
	top: 0
	right: 0
	bottom: 0
	left: 0
	z-index: 0

.grid-fallback
	height: 100%
	width: 100%
	object-fit: cover

</style>
