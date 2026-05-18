<script lang="ts">
	import type { Snippet } from 'svelte';
	import { onMount } from 'svelte';
	import WaterRipple from '$lib/motion-core/water-ripple/WaterRipple.svelte';

	type Props = {
		imageLink?: string;
		isClass?: string;
		alt?: string;
		wipe?: boolean;
		children?: Snippet;
	};

	let wrapperElement = $state<HTMLDivElement>();
	let parallaxElement = $state<HTMLDivElement>();
	let frameId = 0;
	let reduceMotion = false;

	let { imageLink = '', isClass = 'is100', alt = 'Page hero image', wipe = false, children }: Props = $props();

	function isWrapperNearViewport() {
		if (!wrapperElement) return false;

		const rect = wrapperElement.getBoundingClientRect();
		const margin = window.innerHeight * 1.2;
		return rect.bottom >= -margin && rect.top <= window.innerHeight + margin;
	}

	function renderParallax() {
		frameId = 0;
		if (!parallaxElement || reduceMotion || !isWrapperNearViewport()) return;

		parallaxElement.style.transform = `translateY(${window.scrollY / 2}px)`;
	}

	function scheduleParallax() {
		if (frameId || reduceMotion) return;
		frameId = requestAnimationFrame(renderParallax);
	}

	onMount(() => {
		if (!wrapperElement || !parallaxElement) return;

		const parallaxTarget = parallaxElement;
		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		const updateMotionPreference = () => {
			reduceMotion = mediaQuery.matches;
			if (reduceMotion) {
				if (frameId) {
					cancelAnimationFrame(frameId);
					frameId = 0;
				}
				parallaxTarget.style.transform = '';
				return;
			}
			scheduleParallax();
		};

		updateMotionPreference();
		window.addEventListener('scroll', scheduleParallax, { passive: true });
		window.addEventListener('resize', scheduleParallax);
		mediaQuery.addEventListener('change', updateMotionPreference);

		return () => {
			window.removeEventListener('scroll', scheduleParallax);
			window.removeEventListener('resize', scheduleParallax);
			mediaQuery.removeEventListener('change', updateMotionPreference);
			if (frameId) cancelAnimationFrame(frameId);
		};
	});
</script>

<div bind:this={wrapperElement} class="imager {isClass}">
	<div bind:this={parallaxElement} class="parallax-target">
		{#if wipe}
			<WaterRipple src={imageLink} class="ripple-motion" brushSize={100} />
		{:else}
			<img src={imageLink} {alt} />
		{/if}
	</div>
</div>

<style lang="sass">

.imager
	overflow: hidden
	margin-top: 80px
	border-radius: 4px
	.parallax-target
		height: 100%
		width: 100%
		will-change: transform
		backface-visibility: hidden
		img
			display: block
	@media screen and (min-width: 1025px)
		height: 100vh
		margin-top: 88px
		border-radius: 4px
		&.is100
			height: calc(100vh - 144px)
		.parallax-target
			img,
			:global(.ripple-motion)
				object-fit: cover
				object-position: center center
				height: 100%
				width: 100%
	@media screen and (max-width: 1024px)
		&.is100, &.is50
			height: 32vh
			margin-top: 80px
		.parallax-target
			img,
			:global(.ripple-motion)
				object-fit: cover
				object-position: center center
				width: 100%
				height: 100%
	@media (prefers-reduced-motion: reduce)
		.parallax-target
			transform: none !important

</style>
