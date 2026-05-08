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
	import '$lib/styles/designbodha-system.sass'
	import '$lib/styles/components.sass';
	import '$lib/styles/typography.sass';
	import '$lib/styles/animations.sass'
	import '$lib/styles/system/index.sass';
	import '$lib/styles/icons.css';
	import { darkTheme, iW, openSiteTourSelector, searchState, readerChromeHidden, toggleTheme } from '$lib/utils/globalstores';
	import { elementVisibilityStore } from '$lib/utils/elementVisibility';
	import Header from '$lib/comps/header.svelte';
	import Bottom from '$lib/comps/pagebottom.svelte';
	import SearchModal from '$lib/comps/searchmodal.svelte';
	import SiteTour from '$lib/comps/sitetour.svelte';

	const pageTransitionTopClass = 'page-transition-top';
	const pageTransitionDeepClass = 'page-transition-deep';
	const pageTransitionDeepScrollY = 240;

	let { children } = $props();
	let width = $state(0);
	let footerRef = $state<HTMLElement | null>(null);
	let isFooterVisible = $state(false);
	let count = $state(0)
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

	$effect(() => {
		if (!footerRef) {
			isFooterVisible = false;
			return;
		}
		const visibility = elementVisibilityStore(footerRef);
		const unsubscribe = visibility.isVisible.subscribe((value: boolean) => {
			isFooterVisible = value;
		});
		return () => {
			unsubscribe();
			visibility.stop();
		};
	});

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		if (navigation.from?.url.pathname === navigation.to?.url.pathname) return;
		const isDeepScroll = window.scrollY > pageTransitionDeepScrollY;
		const transitionClass = isDeepScroll ? pageTransitionDeepClass : pageTransitionTopClass;

		return new Promise((resolve) => {
			document.documentElement.classList.add(transitionClass);
			const transition = document.startViewTransition(async () => {
				resolve(undefined);
				await navigation.complete;
				if (isDeepScroll) {
					window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
				}
			});
			transition.finished.finally(() => {
				document.documentElement.classList.remove(transitionClass);
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
	<footer class="column" bind:this={footerRef}>
		<Bottom />
	</footer>
	<SearchModal />
</div>

<style lang="sass">

main
	transition: background-size 0.35s ease
	view-transition-name: page
	background: var(--color-back)

:global(html.page-transition-top::view-transition-old(page)),
:global(html.page-transition-top::view-transition-new(page)),
:global(html.page-transition-deep::view-transition-old(page)),
:global(html.page-transition-deep::view-transition-new(page))
	animation: none
	mix-blend-mode: normal

:global(html.page-transition-top::view-transition-old(page)),
:global(html.page-transition-deep::view-transition-old(page))
	z-index: 1

:global(html.page-transition-top::view-transition-new(page)),
:global(html.page-transition-deep::view-transition-new(page))
	z-index: 2

:global(html.page-transition-top::view-transition-new(page))
	animation: page-vertical-wipe 560ms cubic-bezier(0.76, 0, 0.24, 1) both

:global(html.page-transition-deep::view-transition-new(page))
	animation: page-deep-scroll-reveal 460ms cubic-bezier(0.76, 0, 0.24, 1) both

@media (prefers-reduced-motion: reduce)
	:global(html.page-transition-top::view-transition-old(page)),
	:global(html.page-transition-top::view-transition-new(page)),
	:global(html.page-transition-deep::view-transition-old(page)),
	:global(html.page-transition-deep::view-transition-new(page))
		animation: none
		mix-blend-mode: normal

@keyframes page-vertical-wipe
	from
		clip-path: inset(0 100% 0 0)
	to
		clip-path: inset(0 0 0 0)

@keyframes page-deep-scroll-reveal
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
	background: var(--color-back)
	top: 0
	z-index: 999
	border-bottom: var(--border-main)
	justify-content: center
	transition: top 310ms cubic-bezier(0.000, 0.000, 0.580, 1.000)
	view-transition-name: header
	@media screen and (min-width: 1025px)
		height: 72px
		margin-bottom: -72px
		&.reader-hidden
			top: -72px
	@media screen and (max-width: 1024px)
		height: 64px
		margin-bottom: -64px
		&.reader-hidden
			top: 0

footer
	width: 100%
	border-top: 1px solid var(--color-grey-1)
	z-index: 999

</style>
