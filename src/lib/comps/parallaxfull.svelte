<script lang="ts">
	import { onMount } from 'svelte';

	type Props = {
		imageLink?: string;
		isClass?: string;
		alt?: string;
	};

	let wrapperElement = $state<HTMLDivElement>();
	let imageElement = $state<HTMLImageElement>();
	let frameId = 0;
	let reduceMotion = false;

	let {
		imageLink = '',
		isClass = 'is100',
		alt = 'Page hero image'
	}: Props = $props();

	function isWrapperNearViewport() {
		if (!wrapperElement) return false;

		const rect = wrapperElement.getBoundingClientRect();
		const margin = window.innerHeight * 1.2;
		return rect.bottom >= -margin && rect.top <= window.innerHeight + margin;
	}

	function renderParallax() {
		frameId = 0;
		if (!imageElement || reduceMotion || !isWrapperNearViewport()) return;

		imageElement.style.transform = `translateY(${window.scrollY / 2}px)`;
	}

	function scheduleParallax() {
		if (frameId || reduceMotion) return;
		frameId = requestAnimationFrame(renderParallax);
	}

	onMount(() => {
		if (!wrapperElement || !imageElement) return;

		const image = imageElement;
		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		const updateMotionPreference = () => {
			reduceMotion = mediaQuery.matches;
			if (reduceMotion) {
				if (frameId) {
					cancelAnimationFrame(frameId);
					frameId = 0;
				}
				image.style.transform = '';
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

<div class="shell-wrap">
<div bind:this={wrapperElement} class="imager {isClass}">
  <img bind:this={imageElement} src={imageLink} {alt}/>
</div>
</div>

<style lang="sass">

.shell-wrap
	width: 100%
	padding-left: 1rem
	padding-right: 1rem
	.imager
		width: 100%
		margin-left: auto
		margin-right: auto
	@media (min-width: 1025px)
		padding-left: 1rem
		padding-right: 1rem
		.imager
			width: 992px
	@media (min-width: 1201px)
		.imager
			width: 1168px
	@media (min-width: 1441px)
		.imager
			width: 1408px
	@media (min-width: 1601px)
		padding-left: 2rem
		padding-right: 2rem
		.imager
			width: 1536px

.imager
	overflow: hidden
	img
		display: block
		will-change: transform
		backface-visibility: hidden
	@media screen and (min-width: 1025px)
		height: calc(100vh - 160px)
		margin-top: 80px
		border-radius: 8px
		img
			object-fit: cover
			object-position: center center
			height: 100%
			width: 100%
	@media screen and (max-width: 1024px)
		margin-top: 64px
		img
			object-fit: cover
			object-position: center center
			width: 100%
			height: 100%
	@media (prefers-reduced-motion: reduce)
		img
			transform: none !important

</style>
