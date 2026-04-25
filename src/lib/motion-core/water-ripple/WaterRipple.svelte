<script lang="ts">
	import Scene from "./WaterRippleScene.svelte";
	import { cn } from "../utils/cn";
	import type { ComponentProps } from "svelte";

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
</script>

<div class={cn("ripple-inner", className)} {...rest}>
	<div class="carrier">
		<Scene image={src} {brushSize} />
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

</style>