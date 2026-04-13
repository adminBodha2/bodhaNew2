<script lang="ts">

  import { page } from '$app/stores'
  import Menu from '$lib/icons/menu.svelte'
  import Search from '$lib/icons/search.svelte'
  import Close from '$lib/icons/close.svelte'
  import Mobilemenu from '$lib/comps/mobilemenu.svelte'
  import Drop1 from '$lib/comps/menudropdown.svelte'
  import Drop2 from '$lib/comps/menudropdown.svelte'
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

<div class="row width100 ycenter xbetween stdpad sans">
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
  <div class="row ycenter cgap16">
	<p class="navitem sm tt-u"><a class="blank" href="/research">Research</a></p>
	<p class="navitem sm tt-u"><a class="blank" href="/big-questions">Big Questions</a></p>
	<p class="navitem sm tt-u"><a class="blank" href="/academy">Academy</a></p>
	<p class="navitem sm tt-u"><a class="blank" href="/library">Library</a></p>
	<p class="navitem sm tt-u"><a class="blank" href="/anveshi">Anveshi</a></p>
	<p class="navitem sm tt-u"><a class="blank" href="/blog">Blog</a></p>
	<p class="navitem sm tt-u"><a class="blank" href="/inspiration">Inspiration</a></p>
	<p class="navitem sm tt-u"><a class="blank" href="/lab">Lab</a></p>
	<p class="navitem sm tt-u"><a class="blank" href="/team">Team</a></p>
	<button class="blank" on:click={toggleSearch}>
		<Search/>
	</button>
  </div>
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

p.navitem
	font-weight: 500
	letter-spacing: -0.5px
	a.blank
		&:hover
			color: var(--theme)

p.navinitem
	font-weight: 500
	&:hover
		a
			color: var(--theme)

</style>