<script lang="ts">
	import { tick } from 'svelte';
	import type { Snippet } from 'svelte';
	import BlogMenu from '$lib/icons/blog-menu.svelte';
	import autoAnimate from '@formkit/auto-animate';
	import { slide } from 'svelte/transition';
	import { clickOutsideAction } from '$lib/utils/clickoutside';

	type Props = {
		button1text?: string;
		label?: string;
		ariaLabel?: string;
		children?: Snippet;
	};

	let { button1text, label = 'Browse', ariaLabel = 'Responsive menu', children }: Props = $props();

	let open = $state(false);
	let menuElement = $state<HTMLElement>();
	let buttonText = $derived(button1text ?? label);

	function closeMenu() {
		open = false;
	}

	function toggleMenu() {
		open = !open;
	}

	function handleMenuClick(event: MouseEvent) {
		const target = event.target;

		if (!(target instanceof Element)) return;

		if (target.closest('button, a, [role="menuitem"]')) {
			closeMenu();
		}
	}

	function closeOnMenuItemClick(node: HTMLElement) {
		node.addEventListener('click', handleMenuClick);

		return {
			destroy() {
				node.removeEventListener('click', handleMenuClick);
			}
		};
	}

	function handleWindowKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeMenu();
		}
	}

	$effect(() => {
		if (!open) return;

		tick().then(() => {
			const firstItem = menuElement?.querySelector<HTMLElement>('button, a, [role="menuitem"]');
			firstItem?.focus();
		});
	});
</script>

<svelte:window onkeydown={handleWindowKeydown} />

<div class:open class="responsive-wrapper">
	<div class="responsive-menu" use:clickOutsideAction={closeMenu}>
		<button class="responsive-menu__trigger cgap16" type="button" aria-haspopup="menu" aria-expanded={open} aria-controls="responsive-menu-items" onclick={toggleMenu}>
			<BlogMenu size="32" color="var(--color-grey-2)" />
			<span>{buttonText}</span>
		</button>
		<nav id="responsive-menu-items" class="responsive-menu__items" class:open aria-label={ariaLabel} bind:this={menuElement} use:closeOnMenuItemClick>
			{@render children?.()}
		</nav>
	</div>
</div>

<style lang="sass">

.responsive-menu
	position: relative
	z-index: 20
	width: 100%

.responsive-menu__trigger
	width: 100%
	display: flex
	align-items: center
	background: var(--color-back)
	border: 1px solid #e1e1e1
	padding: 0.75em 1em
	box-shadow: 2px 1px 2px rgba(0,0,0,0)
	border-radius: 4px
	cursor: pointer
	&:active
		background: var(--color-grey-0)
	span
		font-size: 1rem
		text-transform: uppercase
		font-weight: 600
	@media (min-width: 1025px)
		display: none

.responsive-menu__items
	display: none
	transition: all 250ms ease
	&.open
		position: absolute
		top: calc(100% + 0.45rem)
		left: 0
		right: 0
		z-index: 21
		display: flex
		flex-direction: column
		gap: 0
		padding: 1rem 0.5rem
		border-radius: 4px
		background: var(--color-back)
		border: var(--border-darker)
		box-shadow: 2px 4px 8px rgba(0,0,0,0.2)
		transition: all 250ms ease
	@media (min-width: 1025px)
		position: static
		display: flex
		flex-direction: row
		align-items: center
		gap: 0.5rem
		padding: 0
		&:open
			position: static
			display: flex
			flex-direction: row
			align-items: center
			gap: 0.5rem
			padding: 0

.responsive-menu__items :global(button), .responsive-menu__items :global(a), .responsive-menu__items :global([role='menuitem'])
	width: 100%
	display: flex
	align-items: center
	justify-content: flex-start
	text-align: left
	text-decoration: none
	cursor: pointer
	@media (min-width: 1025px)
		width: auto
		justify-content: center
		text-align: center

</style>
