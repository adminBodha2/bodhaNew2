<script lang="ts">
	import { tick } from 'svelte';
	import type { Snippet } from 'svelte';
	import BlogMenu from '$lib/icons/blog-menu.svelte';
	import { iW } from '$lib/utils/globalstores';
	import { clickOutsideAction } from '$lib/utils/clickoutside';
	let mobileMenuOpen = $state(false);
	let firstMenuItem: HTMLButtonElement | undefined = $state();

	type Props = {
		button1text?: string;
		label?: string;
		ariaLabel?: string;
		children?: Snippet;
	};

	let { button1text, label = 'Browse', ariaLabel = 'Responsive menu', children }: Props = $props();

	function closeMobileMenu() {
		if (iW && mobileMenuOpen) {
			mobileMenuOpen = false;
		}
	}

	function onWindowKeydown(event: KeyboardEvent) {
		if (iW && event.key === 'Escape') {
			closeMobileMenu();
		}
	}

	$effect(() => {
		if (!mobileMenuOpen) return;
		tick().then(() => {
			firstMenuItem?.focus();
		});
	});

	function closeOnMenuItemClick(node: HTMLElement) {
		node.addEventListener('click', handleMenuClick);

		return {
			destroy() {
				node.removeEventListener('click', handleMenuClick);
			}
		};
	}

</script>

<svelte:window onkeydown={onWindowKeydown} />

<div class="mobile-selection-menu" use:clickOutsideAction={closeMobileMenu}>
	{#if iW}
		<button class="mobile-menu-trigger" type="button" aria-haspopup="menu" aria-expanded={mobileMenuOpen} aria-controls="test-anveshi-selection-menu" onclick={() => (mobileMenuOpen = !mobileMenuOpen)}>
			<span class="row ycenter cgap8">
				<BlogMenu size="20" color="currentColor" />
				<span>{button1text}</span>
			</span>
			<span class="menu-state" aria-hidden="true">{mobileMenuOpen ? 'Close' : 'Menu'}</span>
		</button>
	{/if}
	{#if mobileMenuOpen || !iW}
		<button class="mobile-menu-scrim" type="button" aria-label="Close menu" onclick={closeMobileMenu}></button>
		<div id="selection-menu" class="mobile-menu-content" role="menu" aria-label="Blog navigation">
			{@render children?.()}
		</div>
	{/if}
</div>

<style lang="sass">

.mobile-selection-menu
	@media (max-width: 1024px)
		width: 100%

</style>