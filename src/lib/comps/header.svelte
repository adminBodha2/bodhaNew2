<script lang="ts">
	import { page } from '$app/state';
	import Menu from '$lib/icons/menu.svelte';
	import Search from '$lib/icons/search.svelte';
	import Close from '$lib/icons/close.svelte';
	import Mobilemenu from '$lib/comps/mobilemenu.svelte';
	import { clickOutsideAction } from '$lib/utils/clickoutside';
	import { autoAnimate } from '@formkit/auto-animate';
	import { menuState, toggleMenuState, toggleSearch, darkTheme, iW } from '$lib/utils/globalstores';
	import { navLinks } from '$lib/utils/localsends';

	let scro = $state(0);
	let dropvis = $state(false);

	function toggleDrop(){
		dropvis = !dropvis
	}

	function handleClickOutside (){
		if (dropvis === true) {
			dropvis = false
		}
	}

	let firstSubroute = $derived.by(() => {
		const parts = page.url.pathname.split('/').filter(Boolean);
		return parts.length > 0 ? '/' + parts[0] : '/';
	});

	$effect(() => {
		if ($menuState && $iW) {
			document.body.style.overflow = 'hidden';
		} else {
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

		<!-- Desktop nav — hidden on mobile via CSS, never causes a JS flash -->
		<nav class="row ycenter tray" aria-label="Main navigation">
			{#each navLinks as link}
				<a class="navbar-link" class:active={firstSubroute === link.link} href={link.link}>{link.title}</a>
			{/each}
				<div class="header-dropdown" use:clickOutsideAction onclickoutside={handleClickOutside}>
					<button class="navbar-link" onclick={toggleDrop}>More</button>
					<button class="blank dropdown-inside" class:visible={dropvis} onclick={handleClickOutside}>
						<a class="in-navbar-link" href="/newsletter">Newsletter</a>
						<a class="in-navbar-link" href="/aryavarta">Aryavarta</a>
						<a class="in-navbar-link" href="/designbodha">designbodha</a>
						<a class="in-navbar-link" href="/wiki">Wiki</a>
						<a class="in-navbar-link" href="/lab">Lab</a>
					</button>
				</div>
				<button class="blank" onclick={toggleSearch}>
					<Search size={20}/>
				</button>
		</nav>

		<!-- Mobile tray — hidden on desktop via CSS -->
		<div class="row ycenter cgap16 mobile-tray">
			{#if !$menuState}
				<button class="blank" onclick={toggleSearch}>
					<Search size={27}/>
				</button>
			{/if}
			<button class="blank" onclick={toggleMenuState}>
				{#if $menuState}
					<Close />
				{:else}
					<Menu />
				{/if}
			</button>
		</div>
	</div>

	{#if $menuState}
		<Mobilemenu />
	{/if}
</section>

<style lang="sass">

.header-dropdown
	position: relative	

.dropdown-inside
	display: none
	position: absolute
	min-width: 200px
	background: var(--color-back)
	border: var(--border-main)
	right: -16px
	text-align: right
	box-shadow: 2px 3px 6px rgba(0,0,0,0.1)
	border-radius: 4px
	padding: 8px
	transition: all 110ms ease
	a
		display: block
		padding: 16px
		text-transform: uppercase
		font-size: 16px
		font-weight: 500
		letter-spacing: -0.02rem
		&:hover
			background: var(--color-stone-3)
	&.visible
		display: block

.navbar-link
	text-transform: uppercase
	font-size: 16px
	font-weight: 500
	letter-spacing: -0.02rem
	position: relative
	transition: all 110ms ease
	background: none
	color: var(--color-primary)
	border: none
	padding: 0
	&:after
		content: " "
		position: absolute
		bottom: 0
		right: 0
		height: 2px
		background: var(--color-theme)
		width: 0
		transition: all 110ms ease
	&:hover
		color: var(--color-theme)
		&:after
			width: 100%
			left: 0

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
		padding-left: 2rem
		padding-right: 2rem
		.header-content
			width: 1536px

.header-content
	margin-left: auto
	margin-right: auto

// CSS controls which nav is shown — no JS, no flash
.tray
	display: none
	column-gap: 4px
	@media (min-width: 1025px)
		display: flex
	@media (min-width: 1201px)
		column-gap: 12px

.mobile-tray
	display: flex
	@media (min-width: 1025px)
		display: none

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
