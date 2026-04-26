<script lang="ts">
	import { page } from '$app/state';
	import Menu from '$lib/icons/menu.svelte';
	import Search from '$lib/icons/search.svelte';
	import Close from '$lib/icons/close.svelte';
	import Mobilemenu from '$lib/comps/mobilemenu.svelte';
	import { menuState, toggleMenuState, toggleSearch, darkTheme } from '$lib/utils/globalstores';

	let iW: number;
	let scro: number;
	let firstSubroute = '/';

	$: {
		const parts = page.url.pathname.split('/').filter(Boolean);
		firstSubroute = parts.length > 0 ? '/' + parts[0] : '/';
	}
</script>

<svelte:window bind:innerWidth={iW} bind:scrollY={scro} />

<div class="row width100 ycenter xbetween narrowbox">
		<a class="blank row ycenter logoholder" href="/">
			{#if $darkTheme}
				<img class="rotator dark" src="/images/rotator-d.png" alt="rotator" style="transform: rotate({scro / 8}deg)" />
				<img class="rest dark" src="/images/rest-d.png" alt="rest" />
			{:else}
				<img class="rotator" src="/images/rotator.png" alt="rotator" style="transform: rotate({scro / 8}deg)" />
				<img class="rest" src="/images/rest.png" alt="rest" />
			{/if}
		</a>
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
			<button class="blank" onclick={toggleSearch}><Search /></button>
		</nav>
	{:else}
		<div class="row ycenter cgap16">
			{#if !$menuState}
				<button class="blank" onclick={toggleSearch}>
					<Search />
				</button>
			{/if}
			<button class="blank" onclick={toggleMenuState}>
				{#if $menuState === true}
					<Close />
				{:else}
					<Menu />
				{/if}
			</button>
		</div>
	{/if}
</div>
{#if $menuState === true && iW < 1025}
	<Mobilemenu />
{/if}

<style lang="sass">

.tray
	column-gap: 4px
	@media screen and (min-width: 1201px)
		column-gap: 8px
		button.blank
			margin-left: 8px
	@media screen and (min-width: 1025px) and (max-width: 1200px)
		column-gap: 4px
		button.blank
			margin-left: 6px

.nav-link
	font-size: 15px
	font-family: 'Google Sans', sans-serif
	font-weight: 500
	letter-spacing: 0
	color: var(--color-primary)
	padding: 4px 6px
	border-radius: 2px
	transition: var(--transition2)
	&:hover
		color: var(--color-white)
		background: var(--color-theme)
	&.active
		color: var(--color-theme)
		&:hover
			color: var(--color-white)

.logoholder
	transition: all 0.1s ease
	transform-origin: center left
	&:hover
		transform: scale(0.98)
	&:active
		transform: scale(1.1)

.logoholder
	@media screen and (min-width: 1025px)
		img.rotator
			height: 56px
			width: 56px
		img.rest
			height: 38.5px
			width: 100%
			margin-left: -47px
	@media screen and (max-width: 1024px)
		img.rotator
			height: 40px
			width: 40px
		img.rest
			height: 27.5px
			width: 100%
			margin-left: -34px

</style>
