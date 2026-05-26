<script lang="ts">
	import { page } from '$app/state';
	import { fly, fade } from 'svelte/transition';
	import { cubicOut, expoOut, cubicIn } from 'svelte/easing';
	import { toggleMenuState, menuState } from '$lib/utils/globalstores';
	import { navLinks } from '$lib/utils/localsends'

	let dialogRef = $state<HTMLDialogElement>();

	$effect(() => {
		// Adding the 'if (dialogRef)' check prevents the "used before assigned" error
		if (dialogRef) {
			if ($menuState) {
				dialogRef.showModal();
				document.body.style.overflow = 'hidden';
			} else {
				dialogRef.close();
				document.body.style.overflow = '';
			}
		}
	});
 
	let firstSubroute = $derived.by(() => {
		const parts = page.url.pathname.split('/').filter(Boolean);
		return parts.length > 0 ? '/' + parts[0] : '/';
	});
</script>

<nav class="mm-wrap" in:fly={{ x: 54, duration: 280, easing: cubicOut, opacity: 1 }} out:fly={{ x: 54, duration: 180, easing: cubicIn }} aria-label="Mobile navigation">
	<div class="mm-inner box xright ta-r">
		{#each navLinks as link}
			<a class="mm-link blank tt-u" class:active={firstSubroute === link.link} href={link.link} onclick={toggleMenuState}>
				{link.title}
			</a>
		{/each}
	</div>
</nav>

<style lang="sass">

.mm-wrap
	position: fixed
	top: 64px
	left: 0
	width: 100vw
	height: calc(100dvh - 64px)
	background: var(--color-back)
	z-index: 1000
	overflow-y: hidden
	transition: all 220ms ease

.mm-inner
	display: flex
	flex-direction: column
	padding: 1rem
	gap: 0

.mm-link
	display: block
	font-size: 2rem
	letter-spacing: -0.01em
	color: var(--color-primary)
	padding: 0.95rem 0.75rem
	border-radius: 8px
	transition: background 0.12s ease, color 0.12s ease
	&:hover
		background: rgba(0,0,0,0.04)
	&.active
		color: var(--color-theme)
		background: rgba(0,0,0,0.03)

</style>
