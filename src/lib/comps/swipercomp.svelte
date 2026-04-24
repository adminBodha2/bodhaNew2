<script lang="ts">

	let {
		children,
		slidesPerView = 4,
		spaceBetween = 8,
		pagination = true,
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
	} = $props();

	let swiperEl = $state<any>(); // acceptable, but you can tighten later
	let iW = $state(0)

	$effect(() => {
		if (!swiperEl) return;

		Object.assign(swiperEl, {
			slidesPerView,
			spaceBetween,
			pagination,
			breakpoints,
			centeredSlides: false,
			watchOverflow: true,
			keyboard: {
				enabled: true,
				onlyInViewport: true
			}
		});

		swiperEl.initialize();
	});
</script>

<svelte:window bind:innerWidth={iW}/>

<div class="swiper-row">
	<div class="swiper-frame">
		<swiper-container bind:this={swiperEl} init="false">
			{@render children?.()}
		</swiper-container>
	</div>
	<div class="labelbox buttons-and-rule">
	<div class="nav-buttons row ycenter xcenter cgap8 mleft">
	<button class="nav prev" onclick={() => swiperEl?.swiper?.slidePrev()} title="swiper previous button">
		<svg viewBox="0 0 24 24" height=24 width=24 fill="var(--color-white)" xmlns="http://www.w3.org/2000/svg"><path d="M8 12L14 6V18L8 12Z"/></svg>
	</button>
	<button class="nav next" onclick={() => swiperEl?.swiper?.slideNext()} title="swiper next button">
		<svg viewBox="0 0 24 24" height=24 width=24 fill="var(--color-white)" xmlns="http://www.w3.org/2000/svg"><path d="M16 12L10 18V6L16 12Z"/></svg>
	</button>
	</div>
	{#if iW <= 1024}
	<p class="tag-text grey">Use buttons to navigate, or swipe left/right.</p>
	{:else}
	<p class="tag-text grey">Use buttons or arrow keys to navigate, or drag left/right.</p>
	{/if}
	</div>
</div>

<style lang="sass">

.nav-buttons, .buttons-and-rule
	@media screen and (max-width: 1024px)
		width: 100%

button.nav
	background: var(--color-grey-3)
	border: none
	display: flex
	place-items: center
	height: 28px
	width: 28px
	border-radius: 14px
	transform-origin: center center
	transition: var(--transition1)
	&:hover
		background: var(--color-grey-4)
		transform: scale(0.95)

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

swiper-container
	width: 100%
	display: block

</style>