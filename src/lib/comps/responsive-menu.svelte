<script lang="ts">
	import { tick } from 'svelte';
	import type { Snippet } from 'svelte';
	import BlogMenu from '$lib/icons/blog-menu.svelte';
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
		<button class="responsive-menu__trigger cgap8" type="button" aria-haspopup="menu" aria-expanded={open} aria-controls="responsive-menu-items" onclick={toggleMenu}>
			<BlogMenu size="32" color="var(--color-grey-2)" />
			<p class="txt-bs tt-u w500">{buttonText}</p>
		</button>
		<nav id="responsive-menu-items" class="responsive-menu__items" class:open aria-label={ariaLabel} bind:this={menuElement} use:closeOnMenuItemClick>
			{@render children?.()}
		</nav>
	</div>
</div>

<style lang="sass">

.responsive-wrapper
	@media (max-width: 1024px)
		width: 100%

.responsive-menu
	border: var(--border-main)
	position: relative
	z-index: 20
	border-radius: 4px
	@media (max-width: 1024px)
		width: 100%
		border: none
		border-radius: 0
	@media (min-width: 1025px)
		overflow: hidden
		width: max-content

.responsive-menu__trigger
	width: 100%
	display: flex
	flex-direction: row
	align-items: center
	justify-content: flex-start
	background: var(--color-back)
	border: 1px solid #e1e1e1
	padding: 0.75em 1em
	border-radius: 2px
	cursor: pointer
	&:active
		background: var(--color-grey-0)
	@media (min-width: 1025px)
		display: none

.responsive-menu__items
	position: absolute
	top: calc(100% + 0.45rem)
	left: 0
	right: 0
	z-index: 24
	display: flex
	flex-direction: column
	gap: 0.5rem
	padding: 1rem 0.5rem
	border-radius: 2px
	background: var(--color-back)
	border: var(--border-dark)
	box-shadow: 2px 4px 8px rgba(0,0,0,0.2)
	opacity: 0
	visibility: hidden
	pointer-events: none
	transform: translateY(-0.35rem) scale(0.98)
	transform-origin: top center
	transition: opacity 180ms ease, transform 180ms ease, visibility 0s linear 180ms
	will-change: opacity, transform
	&.open
		opacity: 1
		visibility: visible
		pointer-events: auto
		transform: translateY(0) scale(1)
		transition-delay: 0s
	@media (min-width: 1025px)
		position: static
		display: flex
		flex-direction: row
		align-items: center
		gap: 1px
		padding: 0
		background: var(--color-border)
		border: none
		box-shadow: none
		opacity: 1
		visibility: visible
		pointer-events: auto
		transform: none
		transition: none
		&.open
			position: static
			display: flex
			flex-direction: row
			align-items: center
			gap: 1px
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
