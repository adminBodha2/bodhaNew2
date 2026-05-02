<script lang="ts">

	import { tick } from 'svelte';
	import type { Snippet } from 'svelte';
	import BlogMenu from '$lib/icons/blog-menu.svelte';
	let mobileMenuOpen = $state(false);
	let firstMenuItem: HTMLButtonElement | undefined = $state();

	type Props = {
		button1text?:string;
		children?: Snippet;
	}

	let {
		button1text = 'Essays',
		children
	}: Props = $props();

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}

	function onWindowKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeMobileMenu();
		}
	}

	$effect(() => {
		if (!mobileMenuOpen) return;

		tick().then(() => {
			firstMenuItem?.focus();
		});
	});

</script>

<svelte:window onkeydown={onWindowKeydown} />

<div class="mobile-selection-menu">
	<button
		class="mobile-menu-trigger"
		type="button"
		aria-haspopup="menu"
		aria-expanded={mobileMenuOpen}
		aria-controls="test-anveshi-selection-menu"
		onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
	>
		<span class="row ycenter cgap8">
			<BlogMenu size="20" color="currentColor" />
			<span>Browse</span>
		</span>
		<span class="menu-state" aria-hidden="true">{mobileMenuOpen ? 'Close' : 'Menu'}</span>
	</button>
	{#if mobileMenuOpen}
		<button class="mobile-menu-scrim" type="button" aria-label="Close menu" onclick={closeMobileMenu}></button>
		<div id="test-anveshi-selection-menu" class="mobile-menu-content" role="menu" aria-label="Blog navigation">
			<div class="mobile-menu-arrow"></div>
			<button
				bind:this={firstMenuItem}
				class="mobile-menu-item active"
				type="button"
				role="menuitem"
				onclick={closeMobileMenu}
			>
				<span>{button1text}</span>
			</button>
			<button class="open-drawer box" onclick={closeMobileMenu}>
				{@render children?.()}
			</button>
		</div>
	{/if}
</div>

<style lang="sass">

.mobile-selection-menu
	display: none
	position: relative
	z-index: 20

.mobile-menu-trigger
	width: 100%
	display: flex
	align-items: center
	justify-content: space-between
	gap: 1rem
	padding: 0.8rem 0.9rem
	border: var(--border-dark)
	border-radius: 5px
	background: var(--color-stone)
	color: var(--color-primary)
	font-family: var(--fontface-sans)
	font-size: 0.78rem
	font-weight: 700
	letter-spacing: 0.02rem
	text-transform: uppercase
	box-shadow: var(--shadow11)
	&:hover
		background: var(--color-theme)
		color: var(--color-white)

.menu-state
	font-size: 0.66rem
	font-weight: 600
	opacity: 0.72

.mobile-menu-scrim
	position: fixed
	inset: 0
	z-index: 18
	border: none
	background: rgba(0,0,0,0.18)
	backdrop-filter: blur(2px)

.mobile-menu-content
	position: absolute
	top: calc(100% + 0.55rem)
	left: 0
	right: 0
	z-index: 21
	display: flex
	flex-direction: column
	padding: 0.45rem
	border: var(--border-dark)
	border-radius: 7px
	background: var(--color-back)
	box-shadow: 0 18px 45px rgba(0,0,0,0.18)
	transform-origin: top center
	animation: menuIn 0.24s cubic-bezier(0.190, 1.000, 0.220, 1.000)

.mobile-menu-arrow
	position: absolute
	top: -6px
	left: 22px
	width: 12px
	height: 12px
	border-left: var(--border-dark)
	border-top: var(--border-dark)
	background: var(--color-back)
	transform: rotate(45deg)

.mobile-menu-item
	display: flex
	align-items: center
	justify-content: space-between
	gap: 1rem
	padding: 0.78rem 0.85rem
	border: none
	border-radius: 4px
	background: transparent
	color: var(--color-primary)
	font-family: var(--fontface-sans)
	font-size: 0.82rem
	font-weight: 650
	line-height: 1.1
	text-align: left
	text-transform: uppercase
	transition: background 0.08s ease, color 0.08s ease
	&:hover, &:focus-visible
		outline: none
		background: var(--color-stone)
		color: var(--color-theme-2)
	&.active
		background: var(--color-theme-6)
		color: var(--color-theme-2)

@keyframes menuIn
	from
		opacity: 0
		transform: translateY(-4px) scale(0.98)
	to
		opacity: 1
		transform: translateY(0) scale(1)

@media screen and (max-width: 1024px)
	.mobile-selection-menu
		display: block

</style>