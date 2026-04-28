<script lang="ts">
	import { page } from '$app/state';
	import { fly, fade } from 'svelte/transition';
	import { cubicOut, expoOut, expoIn } from 'svelte/easing';
	import { toggleMenuState, menuState } from '$lib/utils/globalstores';

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

	const links = [
		{ href: '/research', label: 'Research' },
		{ href: '/big-questions', label: 'Big Questions' },
		{ href: '/academy', label: 'Academy' },
		{ href: '/anveshi', label: 'Anveshi' },
		{ href: '/library', label: 'Library' },
		{ href: '/blog', label: 'Blog' },
		{ href: '/inspiration', label: 'Inspiration' },
		{ href: '/lab', label: 'Lab' },
		{ href: '/team', label: 'Team' }
	];
</script>

<dialog bind:this={dialogRef} onclose={toggleMenuState} class="mm-dialog">
	{#if $menuState}
		<div class="mm-backdrop" transition:fade={{ duration: 200 }} onclick={toggleMenuState} aria-hidden="true"></div>
	{/if}
	<nav class="mm-content" in:fly={{ x: 54, duration: 220, easing: cubicOut, opacity: 1 }} out:fly={{ x: 54, duration: 180, easing: expoIn }} aria-label="Mobile navigation">
		<div class="mm-inner box xright ta-r">
			{#each links as link}
				<a class="mm-link blank tt-u" class:active={firstSubroute === link.href} href={link.href} onclick={toggleMenuState}>{link.label}</a>
			{/each}
		</div>
	</nav>
</dialog>
<nav class="mm-wrap" in:fly={{ x: 54, duration: 220, easing: cubicOut, opacity: 1 }} out:fly={{ x: 54, duration: 180, easing: expoOut }} aria-label="Mobile navigation">
	<div class="mm-inner box xright ta-r">
		{#each links as link}
			<a class="mm-link blank tt-u" class:active={firstSubroute === link.href} href={link.href} onclick={toggleMenuState}>
				{link.label}
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
	background: rgba(255, 255, 255, 0.95)
	backdrop-filter: blur(20px)
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
	color: var(--text-sub)
	padding: 0.95rem 0.75rem
	border-radius: 8px
	transition: background 0.12s ease, color 0.12s ease
	&:hover
		background: rgba(0,0,0,0.04)
		color: var(--text-main)
	&.active
		color: var(--color-theme)
		background: rgba(0,0,0,0.03)

</style>
