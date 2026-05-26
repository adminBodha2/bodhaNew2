<script lang="ts">
	import { browser } from '$app/environment';
	import type { Snippet } from 'svelte';
	import {
		areMotionAnimationsDisabled,
		waitForMotionLayout
	} from '$lib/svelteanim/motionPreference.svelte';
	import WaterRipple from '$lib/motion-core/water-ripple/WaterRipple.svelte';

	interface Props {
		/** Image URL */
		src?: string;
		/** Image alt text */
		alt?: string;
		/** Use WaterRipple interactive effect instead of plain image */
		wipe?: boolean;
		/** Extra class on the inner frame */
		isClass?: string;
		/**
		 * Parallax intensity as a percentage of the element height.
		 * The image travels this far in each direction (total range = 2×speed).
		 * Default: 20
		 */
		speed?: number;
		children?: Snippet;
		[key: string]: unknown;
	}

	let {
		src = '',
		alt = 'Page hero image',
		wipe = true,
		isClass = 'is100',
		speed = 40,
		children,
		...rest
	}: Props = $props();

	let shellRef = $state<HTMLElement | null>(null);
	let imageRef = $state<HTMLElement | null>(null);
	let ctx: any = null;

	const attachShell = (node: HTMLElement) => {
		shellRef = node;
		return () => { if (shellRef === node) shellRef = null; };
	};

	const attachImage = (node: HTMLElement) => {
		imageRef = node;
		return () => { if (imageRef === node) imageRef = null; };
	};

	$effect(() => {
		if (!browser) return;
		const shell = shellRef;
		const image = imageRef;
		if (!shell || !image) return;

		ctx?.revert();
		ctx = null;

		// Disable parallax if user prefers reduced motion — image stays centred
		if (areMotionAnimationsDisabled()) return;

		const parallaxSpeed = speed;
		let cancelled = false;

		const init = async () => {
			try {
				const { gsap } = await import('gsap');
				const { ScrollTrigger } = await import('gsap/ScrollTrigger');
				gsap.registerPlugin(ScrollTrigger);

				await waitForMotionLayout();
				if (cancelled) return;

				ctx = gsap.context(() => {
					// Image starts pulled up, ends pulled down — container clips the overflow.
					gsap.fromTo(
						image,
						{ yPercent: -parallaxSpeed },
						{
							yPercent: parallaxSpeed,
							ease: 'none',
							scrollTrigger: {
								trigger: shell,
								start: 'top bottom',
								end: 'bottom top',
								scrub: true,
								invalidateOnRefresh: true
							}
						}
					);
				}, shell);
			} catch {
				if (cancelled) return;
				ctx?.revert();
				ctx = null;
			}
		};

		void init();

		return () => {
			cancelled = true;
			ctx?.revert();
			ctx = null;
		};
	});
</script>

<div class="shell-wrap" {@attach attachShell} {...rest}>
	<div class="imager {isClass}">
		<div class="parallax-inner" {@attach attachImage} style="height:{100 + 2 * speed}%;margin-top:-{speed}%">
			{#if wipe}
				<WaterRipple {src} class="ripple-fill" brushSize={100} />
			{:else}
				<img {src} {alt} />
			{/if}
		</div>
	</div>
	{#if children}
		{@render children()}
	{/if}
</div>

<style lang="sass">

.shell-wrap
	width: 100%
	padding-inline: 1rem
	aspect-ratio: 16/12
	.imager
		width: 100%
		margin-inline: auto
	@media (min-width: 1025px)
		aspect-ratio: 16/8
		height: 100vh
		.imager
			width: 992px
	@media (min-width: 1201px)
		aspect-ratio: 16/7
		.imager
			width: 1168px
	@media (min-width: 1441px)
		aspect-ratio: 16/6
		.imager
			width: 1408px
	@media (min-width: 1601px)
		padding-inline: 2rem
		.imager
			width: 1536px

.imager
	overflow: hidden
	height: 100%

.parallax-inner
	width: 100%
	will-change: transform
	backface-visibility: hidden
	img,
	:global(.ripple-fill)
		display: block
		width: 100%
		height: 100%
		object-fit: cover
		object-position: center center

@media (prefers-reduced-motion: reduce)
	.parallax-inner
		transform: none !important

</style>
