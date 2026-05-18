<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { dev } from '$app/environment';
	import favicon from '$lib/assets/favicon.svg';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import '$lib/styles/system/index.sass';
	import '$lib/styles/icons.css';
	import { darkTheme, iW, openSiteTourSelector, searchState, readerChromeHidden, toggleTheme } from '$lib/utils/globalstores';
	import Header from '$lib/comps/header.svelte';
	import Bottom from '$lib/comps/pagebottom.svelte';
	import SearchModal from '$lib/comps/searchmodal.svelte';

	const pageTransitionClass = 'page-transition';

	let { children } = $props();
	let width = $state(0);
	let count = $state(0);
	$effect(() => {
		$iW = width < 1025;
	});

	injectSpeedInsights();
	injectAnalytics({ mode: dev ? 'development' : 'production' });

	function handleKeydown(e: KeyboardEvent) {
		const isMod = e.metaKey || e.ctrlKey;

		// Cmd+Control+T -> Site Tour
		if (e.metaKey && e.ctrlKey && e.key.toLowerCase() === 't') {
			e.preventDefault();
			openSiteTourSelector();
		}

		// Cmd+K -> Search
		if (isMod && e.key === 'k') {
			e.preventDefault();
			$searchState = !$searchState;
		}
	}

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		if (navigation.from?.url.pathname === navigation.to?.url.pathname) return;

		return new Promise((resolve) => {
			document.documentElement.classList.add(pageTransitionClass);
			document
				.startViewTransition(async () => {
					resolve(undefined);
					await navigation.complete;
				})
				.finished.finally(() => {
					document.documentElement.classList.remove(pageTransitionClass);
				});
		});
	});
</script>

<svelte:window bind:innerWidth={width} onkeydown={handleKeydown} />

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
	<footer class="box">
		<Bottom />
	</footer>
	<SearchModal />
</div>

<style lang="sass">

.app-box
	background: var(--color-back)

main
	transition: background-size 0.35s ease
	view-transition-name: page
	background: var(--color-back)

:global(::view-transition-old(page))
	z-index: 1

:global(::view-transition-new(page))
	z-index: 2
	animation: page-vertical-wipe 560ms cubic-bezier(0.76, 0, 0.24, 1) both

@media (prefers-reduced-motion: reduce)
	:global(::view-transition-old(page)),
	:global(::view-transition-new(page))
		animation: none
		mix-blend-mode: normal

::view-transition-group(*)
	animation: none

@keyframes page-vertical-wipe
	from
		clip-path: inset(0 0 100% 0)
		opacity: 0.92
	to
		clip-path: inset(0 0 0 0)
		opacity: 1

@keyframes breathers
	from
		background-size: 5rem 5rem, 5rem 5rem, 1rem 1rem, 1rem 1rem
	to
		background-size: 4rem 4rem, 4rem 4rem, 1rem 1rem, 1rem 1rem

header
	width: 100%
	position: sticky
	background: var(--color-stone-2)
	top: 0
	z-index: 999
	border-bottom: var(--border-main)
	justify-content: center
	transition: top 310ms cubic-bezier(0.000, 0.000, 0.580, 1.000)
	view-transition-name: header
	@media screen and (min-width: 1025px)
		height: 80px
		margin-bottom: -80px
		&.reader-hidden
			top: -80px
	@media screen and (max-width: 1024px)
		height: 64px
		margin-bottom: -64px
		&.reader-hidden
			top: 0

footer
	width: 100%
	border-top: 1px solid var(--color-grey-0)
	z-index: 999

</style>
