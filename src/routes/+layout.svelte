<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { dev } from '$app/environment';
	import favicon from '$lib/assets/favicon.svg';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import '$lib/styles/system/index.sass';
	import '$lib/styles/icons.css';
	import { darkTheme, iW, openSiteTourSelector, searchState, toggleTheme } from '$lib/utils/globalstores';
	import Header from '$lib/comps/header.svelte';
	import Bottom from '$lib/comps/pagebottom.svelte';
	import SearchModal from '$lib/comps/searchmodal.svelte';

	let { children } = $props();
	let width = $state(0);
	$effect(() => {
		$iW = width < 1025;
	});

	if (!dev) {
		injectSpeedInsights();
		injectAnalytics({ mode: 'production' });
	}

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

	return new Promise((resolve) => {
		document.startViewTransition(async () => {
			resolve();
			await navigation.complete;
		});
	});
});
</script>

<svelte:window bind:innerWidth={width} onkeydown={handleKeydown} />

<svelte:head>
	<link rel="icon" href={favicon} />
	{#if !dev}
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
	{/if}
</svelte:head>

<div class="app-box" class:light={!$darkTheme} class:dark={$darkTheme} class:mobile={$iW} class:desk={!$iW}>
	<header class="row ycenter">
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
	background: var(--color-back)

@keyframes slideFromTop
	from
		transform: translateY(400px)

@keyframes slideToBottom
	to
		transform: translateY(-400px)

:root::view-transition-old(root)
	animation: 300ms cubic-bezier(0.4, 0, 0.2, 1) both slideToBottom

:root::view-transition-new(root)
	animation: 300ms cubic-bezier(0.4, 0, 0.2, 1) both slideFromTop

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
		height: 80px
		margin-bottom: -80px
	@media screen and (max-width: 1024px)
		height: 64px
		margin-bottom: -64px

footer
	width: 100%
	border-top: 1px solid var(--color-grey-0)
	z-index: 999

</style>
