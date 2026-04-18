<script lang="ts">

	import favicon from '$lib/assets/favicon.svg';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import '$lib/styles/vars.sass';
	import '$lib/styles/fontimports.sass'
	import '$lib/styles/measures.sass';
	import '$lib/styles/globals.sass';
	import '$lib/styles/components.sass'
	import '$lib/styles/typography.sass';
	import '$lib/styles/icons.css';
	import { darkTheme, iW } from '$lib/utils/globalstores'
	import Header from '$lib/comps/header.svelte';
	import Bottom from '$lib/comps/pagebottom.svelte';
	import SearchModal from '$lib/comps/searchmodal.svelte'


	let { children } = $props();
	let sY = $state(0);
	let width = $state(0)
	$effect(() => { $iW = width < 1025 })

	injectSpeedInsights();
	injectAnalytics();

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

<div class:light={!$darkTheme} class:dark={$darkTheme} class:mobile={$iW} class:desk={!$iW}>
<header class="row ycenter">
	<Header />
</header>
  <main>
    {@render children?.()}
  </main>
<footer class="column">
	<Bottom />
</footer>
<SearchModal/>
</div>

<style lang="sass">

main
	background: var(--background)

header
	width: 100%
	position: sticky
	background: #FFFFFE
	top: 0
	z-index: 999
	border-bottom: 1px solid rgba(0,0,0,0.06)
	justify-content: center
	@media screen and (min-width: 1025px)
		height: 80px
		margin-bottom: -80px
	@media screen and (max-width: 1024px)
		height: 64px
		margin-bottom: -64px

footer
	width: 100%
	border-top: 1px solid var(--grey-sm)

</style>
