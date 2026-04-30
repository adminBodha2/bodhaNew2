<script lang="ts">
	import { onMount } from 'svelte';

	type Props = {
		imageLink?: string;
		isClass?: string;
		alt?: string;
	};

	let imageElement = $state<HTMLImageElement>();
	let inRange = false;
	let frameId = 0;
	let reduceMotion = false;

	let {
		imageLink = '',
		isClass = 'is100',
		alt = 'Page hero image'
	}: Props = $props();

	function renderParallax() {
		frameId = 0;
		if (!imageElement || reduceMotion || !inRange) return;

		imageElement.style.transform = `translateY(${window.scrollY / 2}px)`;
	}

	function scheduleParallax() {
		if (frameId || reduceMotion || !inRange) return;
		frameId = requestAnimationFrame(renderParallax);
	}

	onMount(() => {
		if (!imageElement) return;

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

		const observer = new IntersectionObserver(
			(entries) => {
				inRange = entries.some((entry) => entry.isIntersecting);
				if (inRange) scheduleParallax();
			},
			{ rootMargin: '120% 0px' }
		);

		observer.observe(image);
		updateMotionPreference();
		window.addEventListener('scroll', scheduleParallax, { passive: true });
		window.addEventListener('resize', scheduleParallax);
		mediaQuery.addEventListener('change', updateMotionPreference);

		return () => {
			observer.disconnect();
			window.removeEventListener('scroll', scheduleParallax);
			window.removeEventListener('resize', scheduleParallax);
			mediaQuery.removeEventListener('change', updateMotionPreference);
			if (frameId) cancelAnimationFrame(frameId);
		};
	});
</script>

<div class="imager {isClass}">
  <img bind:this={imageElement} src={imageLink} {alt}/>
</div>

<style lang="sass">

.imager
	overflow: hidden
	img
		display: block
		will-change: transform
		backface-visibility: hidden
	@media screen and (min-width: 1025px)
		height: 100vh
		&.is100
			height: 100vh
		&.is70
			height: 70vh
		&.is50
			height: 70vh
			margin-top: 80px
		img
			object-fit: cover
			object-position: center center
			height: 100%
			width: 100%
	@media screen and (max-width: 1024px)
		&.is100, &.is50
			height: 32vh
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
