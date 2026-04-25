<script lang="ts">
	import { onMount } from 'svelte';
	import { registerSwiper } from '$lib/utils/swiper';
	import favicon from '$lib/assets/favicon.svg';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import '$lib/styles/vars.sass';
	import '$lib/styles/fontimports.sass';
	import '$lib/styles/measures.sass';
	import '$lib/styles/globals.sass';
	import '$lib/styles/components.sass';
	import '$lib/styles/typography.sass';
	import '$lib/styles/icons.css';
	import { darkTheme, iW } from '$lib/utils/globalstores';
	import Header from '$lib/comps/header.svelte';
	import Bottom from '$lib/comps/pagebottom.svelte';
	import SearchModal from '$lib/comps/searchmodal.svelte';

	let { children } = $props();
	let sY = $state(0);
	let width = $state(0);
	$effect(() => {
		$iW = width < 1025;
	});

	injectSpeedInsights();
	injectAnalytics();

	onMount(registerSwiper);
</script>

<svelte:window bind:scrollY={sY} bind:innerWidth={width} />

<svelte:head>
	<link rel="icon" href={favicon} />
	<!-- Google tag (gtag.js) -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-F1XN2X1V5S"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());

		gtag('config', 'G-F1XN2X1V5S');
	</script>
</svelte:head>

<div class="app-box" class:light={!$darkTheme} class:dark={$darkTheme} class:mobile={$iW} class:desk={!$iW}>
	<header class="row ycenter">
		<Header />
	</header>
	<main>
		{@render children?.()}
	</main>
	<footer class="column">
		<Bottom />
	</footer>
	<SearchModal />
</div>

<style lang="sass">

main
	background-image: linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)
	background-size: 6rem 6rem
	@media screen and (max-width: 1024px)
		background-size: 2rem 2rem

header
	width: 100%
	position: sticky
	background: #FFFFFE
	top: 0
	z-index: 999
	border-bottom: 1px solid rgba(0,0,0,0.06)
	justify-content: center
	box-shadow: 0 1px 0 rgba(0,0,0,0.03), 0 8px 20px rgba(0,0,0,0.08), 0 4px 4px rgba(0,0,0,0.12)
	transition: box-shadow 160ms cubic-bezier(0.205, 1.000, 0.355, 1.030)
	&:hover
		box-shadow: 0 1px 0 rgba(0,0,0,0), 0 8px 20px rgba(0,0,0,0), 0 4px 4px rgba(0,0,0,0)
	@media screen and (min-width: 1025px)
		height: 80px
		margin-bottom: -80px
	@media screen and (max-width: 1024px)
		height: 64px
		margin-bottom: -64px

footer
	width: 100%
	border-top: 1px solid var(--color-grey-1)

</style>
