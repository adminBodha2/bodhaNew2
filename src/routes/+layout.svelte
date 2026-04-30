<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { dev } from '$app/environment';
	import favicon from '$lib/assets/favicon.svg';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import '$lib/styles/vars.sass';
	import '$lib/styles/fontimports.sass';
	import '$lib/styles/measures.sass';
	import '$lib/styles/globals.sass';
	import '$lib/styles/components.sass';
	import '$lib/styles/typography.sass';
	import '$lib/styles/animations.sass'
	import '$lib/styles/glass.sass';
	import '$lib/styles/icons.css';
	import { darkTheme, iW, searchState, readerChromeHidden } from '$lib/utils/globalstores';
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

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		if (navigation.from?.url.pathname === navigation.to?.url.pathname) return;
		if (window.scrollY > 120) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve(undefined);
				await navigation.complete;
			});
		});
	});
</script>

<svelte:window bind:scrollY={sY} bind:innerWidth={width} onkeydown={handleKeydown} />

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
	<header class="row ycenter" class:reader-hidden={$readerChromeHidden}>
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
	transition: background-size 0.5s ease
	view-transition-name: page
	background: var(--color-back)

:global(::view-transition-old(page))
	animation: page-out 300ms var(--cz-easeInQuad) both

:global(::view-transition-new(page))
	animation: page-in 500ms var(--cz-easeOutQuad) 270ms both

@media (prefers-reduced-motion: reduce)
	:global(::view-transition-old(page)),
	:global(::view-transition-new(page))
		animation: none

@keyframes page-out
	from
		opacity: 1
		transform: translateY(0) scale(1)
	to
		opacity: 0
		transform: translateY(-50px) scale(0.995)

@keyframes page-in
	from
		opacity: 0
		transform: translateY(50px) scale(0.995)
	to
		opacity: 1
		transform: translateY(0) scale(1)

@keyframes breathers
	from
		background-size: 5rem 5rem, 5rem 5rem, 1rem 1rem, 1rem 1rem
	to
		background-size: 4rem 4rem, 4rem 4rem, 1rem 1rem, 1rem 1rem

header
	width: 100%
	position: sticky
	background: var(--header-back)
	backdrop-filter: blur(15px) saturate(1.25)
	--webkit-backdrop-filter: blur(15px) saturate(1.25)
	top: 0
	z-index: 999
	border-bottom: var(--header-border)
	justify-content: center
	box-shadow: 0 1px 0 rgba(0,0,0,0.03), 0 2px 20px rgba(0,0,0,0.08), 0 4px 4px rgba(0,0,0,0.07)
	transition: box-shadow 100ms cubic-bezier(0.665, 0.010, 0.795, 0.655), top 310ms cubic-bezier(0.000, 0.000, 0.580, 1.000)
	view-transition-name: header
	&:hover
		box-shadow: 0 1px 0 rgba(0,0,0,0), 0 8px 20px rgba(0,0,0,0), 0 4px 4px rgba(0,0,0,0)
	@media screen and (min-width: 1025px)
		height: 80px
		margin-bottom: -80px
		&.reader-hidden
			top: -80px
	@media screen and (max-width: 1024px)
		height: 64px
		margin-bottom: -64px
		&.reader-hidden
			top: -64px

footer
	width: 100%
	border-top: 1px solid var(--color-grey-1)

</style>
