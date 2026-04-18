<script lang="ts">

  import { page } from '$app/stores'
  import Menu from '$lib/icons/menu.svelte'
  import Search from '$lib/icons/search.svelte'
  import Close from '$lib/icons/close.svelte'
  import Mobilemenu from '$lib/comps/mobilemenu.svelte'
  import { menuState, toggleMenuState, toggleSearch, darkTheme } from '$lib/utils/globalstores'

  let iW:number
  let scro:number
  let firstSubroute = '/'

  $: {
	const parts = $page.url.pathname.split('/').filter(Boolean);
	firstSubroute = parts.length > 0 ? '/' + parts[0] : '/';
  }

</script>

<svelte:window bind:innerWidth={iW} bind:scrollY={scro}/>

<div class="row width100 ycenter xbetween narrowbox">
  <div class="row ycenter">
	<a class="blank row ycenter logoholder" href="/">
	{#if $darkTheme}
	<img class="rotator dark" src="/images/rotator-d.png" alt="rotator" style="transform: rotate({scro/8}deg)"/>
	<img class="rest dark" src="/images/rest-d.png" alt="rest"/>
	{:else}
	  <img class="rotator" src="/images/rotator.png" alt="rotator" style="transform: rotate({scro/8}deg)"/>
	  <img class="rest" src="/images/rest.png" alt="rest"/>
	  {/if}
	</a>
  </div>
  {#if iW >= 1025}
  <nav class="row ycenter tray">
	<a class="nav-link blank tt-u" class:active={firstSubroute === '/research'} href="/research">Research</a>
	<a class="nav-link blank tt-u" class:active={firstSubroute === '/big-questions'} href="/big-questions">Big Questions</a>
	<a class="nav-link blank tt-u" class:active={firstSubroute === '/academy'} href="/academy">Academy</a>
	<a class="nav-link blank tt-u" class:active={firstSubroute === '/library'} href="/library">Library</a>
	<a class="nav-link blank tt-u" class:active={firstSubroute === '/anveshi'} href="/anveshi">Anveshi</a>
	<a class="nav-link blank tt-u" class:active={firstSubroute === '/blog'} href="/blog">Blog</a>
	<a class="nav-link blank tt-u" class:active={firstSubroute === '/inspiration'} href="/inspiration">Inspiration</a>
	<a class="nav-link blank tt-u" class:active={firstSubroute === '/team'} href="/team">Team</a>
  </nav>
  {:else}
	<div class="row ycenter cgap16">
		{#if !$menuState}
		<button class="blank" on:click={toggleSearch}>
			<Search/>
		</button>
		{/if}
	  <button class="blank" on:click={toggleMenuState}>
		{#if $menuState === true}
		  <Close/>
		{:else}
		  <Menu/>
		{/if}
	  </button>
	</div>
  {/if}
</div>
{#if $menuState === true}
<Mobilemenu/>
{/if}

<style lang="sass">

.tray
	column-gap: 4px
	@media screen and (min-width: 1201px)
		column-gap: 6px

.nav-link
	font-size: 12px
	font-weight: 500
	letter-spacing: 0.04em
	color: var(--primary)
	padding: 5px 9px
	border-radius: 2px
	transition: color 0.12s ease, background 0.12s ease
	&:hover
		color: var(--whitefix)
		background: var(--theme)
	&.active
		color: var(--theme)
		&:hover
			color: var(--whitefix)

.logoholder
	transition: all 0.1s ease
	transform-origin: center left
	&:hover
		transform: scale(1.04)

.logoholder
	@media screen and (min-width: 1025px)
		img.rotator
			height: 48px
			width: 48px
		img.rest
			height: 33px
			width: 100%
			margin-left: -40.5px
	@media screen and (max-width: 1024px)
		img.rotator
			height: 40px
			width: 40px
		img.rest
			height: 27.5px
			width: 100%
			margin-left: -34px

</style>