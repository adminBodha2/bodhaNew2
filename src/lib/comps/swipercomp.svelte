<script lang="ts">
	import { onMount } from 'svelte';
	import { registerSwiper } from '$lib/utils/swiper';

	type SwiperOptionObject = Record<string, unknown>;

	type Props = {
		children?: import('svelte').Snippet;
		slidesPerView?: number;
		spaceBetween?: number;
		pagination?: boolean | SwiperOptionObject;
		autoplay?: boolean;
		speed?: number;
		marquee?: boolean;
		breakpoints?: Record<number, SwiperOptionObject>;
	};

	let {
		children,
		slidesPerView = 4,
		spaceBetween = 8,
		pagination = true,
		autoplay = false,
		speed = 300,
		marquee = false,
		breakpoints = {
			0: {
				slidesPerView: 1,
				spaceBetween: 8
			},
			1024: {
				slidesPerView: 4,
				spaceBetween: 8
			}
		}
	}: Props = $props();

	let swiperEl = $state<any>(); // acceptable, but you can tighten later
	let iW = $state(0);
	let initialized = $state(false);

	function swiperOptions() {
		return {
			slidesPerView,
			spaceBetween,
			pagination,
			autoplay: marquee
				? {
						delay: 1,
						disableOnInteraction: false,
						waitForTransition: false
					}
				: autoplay,
			speed,
			freeMode: marquee ? { enabled: true, momentum: false } : false,
			breakpoints,
			loop: true,
			centeredSlides: false,
			watchOverflow: true,
			keyboard: {
				enabled: true,
				onlyInViewport: true
			}
		};
	}

	function pauseMarquee(e: PointerEvent) {
		if (!marquee || e.pointerType !== 'mouse') return;

		const swiper = swiperEl?.swiper;
		if (!swiper?.autoplay) return;

		const currentTranslate = swiper.getTranslate();
		swiper.setTransition(0);
		swiper.setTranslate(currentTranslate);
		swiper.autoplay.stop();
	}

	function resumeMarquee(e: PointerEvent) {
		if (!marquee || e.pointerType !== 'mouse') return;

		const swiper = swiperEl?.swiper;
		if (!swiper?.autoplay) return;

		swiper.params.speed = speed;
		swiper.setTransition(speed);
		swiper.autoplay.start();
		swiper.slideNext(speed, true, true);
	}

	onMount(() => {
		let cancelled = false;

		async function initSwiper() {
			registerSwiper();
			await customElements.whenDefined('swiper-container');

			if (cancelled || !swiperEl || initialized) return;

			Object.assign(swiperEl, swiperOptions());
			swiperEl.initialize();
			initialized = true;
		}

		initSwiper();

		return () => {
			cancelled = true;
		};
	});
</script>

<svelte:window bind:innerWidth={iW} />

<div class="swiper-row" class:marquee>
	<div class="xleft column width100 mobile-rule">
	<p class="mleft ta-l">Swipe left/right to navigate</p>
	</div>
	<div class="swiper-frame" role="region" onpointerenter={pauseMarquee} onpointerleave={resumeMarquee}>
		<swiper-container bind:this={swiperEl} init="false">
			{@render children?.()}
		</swiper-container>
	</div>
	<div class="buttons-and-rule box xleft rgap8">
		<div class="nav-buttons row ycenter xcenter cgap8 mleft">
			<button class="selection-button prev" onclick={() => swiperEl?.swiper?.slidePrev()} title="swiper previous button">
				<svg viewBox="0 0 24 24" height="32" width="32" fill="var(--color-anveshi-2)" stroke="var(--color-anveshi-2)" xmlns="http://www.w3.org/2000/svg"><path d="M8 12L14 6V18L8 12Z" /></svg>
			</button>
			<button class="selection-button next" onclick={() => swiperEl?.swiper?.slideNext()} title="swiper next button">
				<svg viewBox="0 0 24 24" height="32" width="32" fill="var(--color-anveshi-2)" stroke="var(--color-anveshi-2)" xmlns="http://www.w3.org/2000/svg"><path d="M16 12L10 18V6L16 12Z" /></svg>
			</button>
		</div>
		{#if iW <= 1024}
			<p class="tag-text anveshi-o">Use buttons to navigate, or swipe left/right.</p>
		{:else}
			<p class="tag-text grey">Use buttons or arrow keys to navigate, or drag left/right.</p>
		{/if}
	</div>
</div>

<style lang="sass">

.selection-button
	border: 1px solid #d7d7d7
	background: var(--color-stone)
	font-size: 0.85rem
	font-weight: 500
	letter-spacing: 0.01rem
	padding:  0.6em 1em 0.3em 1em
	border-radius: 4px
	box-shadow: 1px 2px 3px rgba(0,0,0,0.2)
	transition: background 80ms cubic-bezier(0.390, 0.575, 0.565, 1.000), color 80ms cubic-bezier(0.390, 0.575, 0.565, 1.000), border 80ms cubic-bezier(0.390, 0.575, 0.565, 1.000), box-shadow 80ms cubic-bezier(0.390, 0.575, 0.565, 1.000)
	transform-origin: center center
	&:hover
		background: var(--color-grey-4)
		color: #FFF
		border: 1px solid var(--color-primary)
		box-shadow: 1px 2px 5px rgba(0,0,0,0)
	&:active
		transform: scale(1.1)

.buttons-and-rule
	width: 100%
	@media (max-width: 1024px)
		display: none

.nav-buttons
	@media screen and (max-width: 1024px)
		width: 100%

.mobile-rule
	@media screen and (min-width: 1025px)
		display: none

.swiper-row
	width: 100%
	display: flex
	flex-direction: column
	align-items: center
	justify-content: center
	row-gap: 1rem

.swiper-frame
	width: min(100%, 1660px)
	margin: 0 auto
	overflow: hidden
	padding-top: 1rem
	padding-bottom: 1rem !important

swiper-container
	width: 100%
	display: block

.marquee
	swiper-container::part(wrapper)
		transition-timing-function: linear !important

</style>
