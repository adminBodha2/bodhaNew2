<script lang="ts">

	import favicon from '$lib/assets/favicon.svg';
  import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
  import { injectAnalytics } from '@vercel/analytics/sveltekit'
  import '$lib/styles/globals.sass'
  import '$lib/styles/tokens.sass'
  import '$lib/styles/icons.css'
  import Header from '$lib/comps/header.svelte'
  import Bottom from '$lib/comps/pagebottom.svelte'

	let { children } = $props();
  let sY = $state(0)

  injectSpeedInsights();
  injectAnalytics();

</script>

<svelte:window bind:scrollY={sY}/>

<svelte:head>
	<link rel="icon" href={favicon} />
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-F1XN2X1V5S"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-F1XN2X1V5S');
  </script>
</svelte:head>

<header class="row ycenter">
  <Header/>
</header>
{@render children?.()}
<footer class="column">
  <Bottom/>
</footer>

<style lang="sass">

header
  width: 100%
  position: sticky
  top: 0
  background: #FFFFFF
  z-index: 999
  border-bottom: 1px solid var(--color-border)
  @media screen and (min-width: 1025px)
    height: 80px
    margin-bottom: -80px
  @media screen and (max-width: 1024px)
    height: 64px
    margin-bottom: -64px

footer
  width: 100%
  border-top: 1px solid var(--color-border)

</style>
