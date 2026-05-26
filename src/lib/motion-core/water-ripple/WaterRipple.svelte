<script lang="ts">
	import { cn } from "../utils/cn";
	import type Scene from "./WaterRippleScene.svelte";
	import type { ComponentProps } from "svelte";
	import { areMotionAnimationsDisabled } from "$lib/svelteanim/motionPreference.svelte";

	type SceneProps = ComponentProps<typeof Scene>;

	interface Props {
		/**
		 * The image source URL.
		 */
		src: SceneProps["image"];
		/**
		 * Additional CSS classes for the container.
		 */
		class?: string;
		/**
		 * Size of the ripple brush.
		 * @default 100
		 */
		brushSize?: SceneProps["brushSize"];
		[key: string]: unknown;
	}

	let {
		src,
		class: className = "",
		brushSize = 20,
		...rest
	}: Props = $props();

	let SceneComponent = $state<typeof Scene | null>(null);
	const motionDisabled = $derived(areMotionAnimationsDisabled());

	$effect(() => {
		if (motionDisabled) {
			SceneComponent = null;
			return;
		}

		let cancelled = false;

		const init = async () => {
			try {
				const module = await import("./WaterRippleScene.svelte");
				if (!cancelled) SceneComponent = module.default;
			} catch {
				if (!cancelled) SceneComponent = null;
			}
		};

		void init();

		return () => {
			cancelled = true;
		};
	});
</script>

<div class={cn("ripple-inner", className)} {...rest}>
	<div class="carrier">
		<img class="ripple-fallback" {src} alt="" aria-hidden="true" />
		{#if SceneComponent}
			<SceneComponent image={src} {brushSize} />
		{/if}
	</div>
</div>

<style lang="sass">

.carrier
	position: absolute
	top: 0
	left: 0
	right: 0
	bottom: 0
	z-index: 0

.ripple-inner
	position: relative
	height: 100%
	width: 100%
	overflow: hidden

.ripple-fallback
	position: absolute
	inset: 0
	height: 100%
	width: 100%
	object-fit: cover
	z-index: 0

</style>
