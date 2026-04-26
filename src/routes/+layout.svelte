<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state'
	import { dev } from '$app/environment';
	import { registerSwiper } from '$lib/utils/swiper';
	import { fly } from 'svelte/transition'
	import { quintIn, quintOut } from 'svelte/easing'  
	import favicon from '$lib/assets/favicon.svg';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import '$lib/styles/vars.sass';
	import '$lib/styles/fontimports.sass';
	import '$lib/styles/measures.sass';
	import '$lib/styles/globals.sass';
	import '$lib/styles/components.sass';
	import '$lib/styles/typography.sass';
	import '$lib/styles/glass.sass'
	import '$lib/styles/icons.css';
	import { darkTheme, iW, searchState } from '$lib/utils/globalstores';
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
	injectAnalytics({ mode: dev ? 'development' : 'production' });

  function handleKeydown(e: KeyboardEvent) {
    // Cmd+K (Mac) or Ctrl+K (Windows/Linux)
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      $searchState = !$searchState;
    }
  }

	onMount(registerSwiper);
</script>

<svelte:window bind:scrollY={sY} bind:innerWidth={width} onkeydown={handleKeydown}/>

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
	{#key page.url.pathname}
	<main style="--scroll-y: {sY * 0.2}px" out:fly={{ duration: 350, y: -120, easing: quintIn}} in:fly={{ duration: 300, delay: 280, y: 120, easing: quintOut }}>
		{@render children?.()}
	</main>
	{/key}
	<footer class="column">
		<Bottom />
	</footer>
	<SearchModal />
</div>

<style lang="sass">

main
	background-image: linear-gradient(rgba(0,0,0,0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.01) 1px, transparent 1px), linear-gradient(rgba(0,0,0,0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.01) 1px, transparent 1px)
	transition: background-size 0.5s ease
	background-position: center var(--scroll-y)
	will-change: transform, opacity
	@media screen and (max-width: 1024px)
		background-size: 3rem 3rem, 3rem 3rem
		background-image: linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
	@media screen and (min-width: 1025px)
		transition: background-position 0.1s linear
		background-size: 5rem 5rem, 5rem 5rem, 2.5rem 2.5rem, 2.5rem 2.5rem

@keyframes breathers
	from
		background-size: 5rem 5rem, 5rem 5rem, 1rem 1rem, 1rem 1rem
	to
		background-size: 4rem 4rem, 4rem 4rem, 1rem 1rem, 1rem 1rem

header
	width: 100%
	position: sticky
	background: #FFFFFE
	top: 0
	z-index: 999
	border-bottom: var(--border-dark)
	justify-content: center
	box-shadow: 0 1px 0 rgba(0,0,0,0.03), 0 8px 20px rgba(0,0,0,0.08), 0 4px 4px rgba(0,0,0,0.07)
	transition: box-shadow 100ms cubic-bezier(0.665, 0.010, 0.795, 0.655)
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
