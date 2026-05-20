<script lang="ts">
	import { page } from '$app/state';
	import Menu from '$lib/icons/menu.svelte';
	import Search from '$lib/icons/search.svelte';
	import Close from '$lib/icons/close.svelte';
	import Mobilemenu from '$lib/comps/mobilemenu.svelte';
	import { menuState, toggleMenuState, toggleSearch, darkTheme, iW } from '$lib/utils/globalstores';
	import { navLinks } from '$lib/utils/localsends'

	let scro = $state(0);

	let firstSubroute = $derived.by(() => {
		const parts = page.url.pathname.split('/').filter(Boolean);
		return parts.length > 0 ? '/' + parts[0] : '/';
	});

	$effect(() => {
		if ($menuState && $iW ) {
			document.body.style.overflow = 'hidden';
		} else  {
			document.body.style.overflow = '';
		}
	});
</script>

<svelte:window bind:scrollY={scro} />

<section class="header-wrapper">
<div class="row ycenter xbetween header-content">
		<a class="blank row ycenter logoholder" href="/">
			{#if $darkTheme}
				<img class="rotator dark" src="/images/rotator-d.png" alt="rotator" style="transform: rotate({scro / 8}deg)" />
				<img class="rest dark" src="/images/rest-d.png" alt="rest" />
			{:else}
				<img class="rotator" src="/images/rotator.png" alt="rotator" style="transform: rotate({scro / 8}deg)" />
				<img class="rest" src="/images/rest.png" alt="rest" />
			{/if}
		</a>
	{#if !$iW}
		<nav class="row ycenter tray">
			{#each navLinks as link}
				<a class="nav-link blank" class:active={firstSubroute === link.link} href={link.link}>{link.title}</a>
			{/each}
			<button class="blank nav-link" onclick={toggleSearch}>search</button>
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
{#if $menuState && $iW}
	<Mobilemenu />
{/if}
</section>

<style lang="sass">

.header-wrapper
	width: 100%
	padding-left: 1rem
	padding-right: 1rem
	.header-content
		width: 100%
	@media (min-width: 1025px)
		padding-left: 1rem
		padding-right: 1rem
		.header-content
			width: 992px
	@media (min-width: 1201px)
		.header-content
			width: 1168px
	@media (min-width: 1441px)
		.header-content
			width: 1408px
	@media (min-width: 1601px)
		padding-left: 4rem
		padding-right: 4rem
		.header-content
			width: 1472px

.header-content
	margin-left: auto
	margin-right: auto

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
	font-size: 18px
	font-family: 'Google Sans', sans-serif
	font-weight: 500
	letter-spacing: -0.02rem
	color: var(--color-primary)
	padding: 4px 6px
	border-radius: 2px
	transition: all 140ms cubic-bezier(0.2, 1.8, 0.4, 1)
	text-transform: lowercase
	font-variant: small-caps
	&:hover
		color: var(--color-back)
		background: var(--color-theme)
	&.active
		color: var(--color-theme)
		&:hover
			color: var(--color-back)

.logoholder
	transition: all 0.1s ease
	transform-origin: center left
	&:hover
		transform: scale(0.98)
	&:active
		transform: scale(1.02)

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
