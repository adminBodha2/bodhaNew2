<script lang="ts">

	import { iW } from '$lib/utils/globalstores'
	import { clickOutsideAction } from '$lib/utils/clickoutside';
	import { fly } from 'svelte/transition'
	import { quintIn, quadOut } from 'svelte/easing'
	import BlogMenu from '$lib/icons/blog-menu.svelte';
	// 1. Updated Interface to accept your 'items' property
	interface Option {
		label: string;
		[key: string]: any; 
	}

	let { 
		options = [], 
		onSelect = (index: number) => {} 
	}: { 
		options: Option[], 
		onSelect: (index: number) => void 
	} = $props();

	let selectedIndex = $state(0);
	let mobileMenuOpen = $state(false);	
	// 2. Math for the grid layout
	let mobileCols = $derived(Math.ceil(options.length / 2));
	
	// 3. Coordinate system for the selection pill
	let desktopCol = $derived(selectedIndex);
	let mobileRow = $derived(Math.floor(selectedIndex / mobileCols));
	let mobileCol = $derived(selectedIndex % mobileCols);

	function handleSelect(index: number) {
		selectedIndex = index;
		onSelect(index);
		if ($iW && mobileMenuOpen) {
			mobileMenuOpen = false;
		}
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}

	function onWindowKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeMobileMenu();
		}
	}

	$effect(() => {
		if (mobileMenuOpen && $iW) {
			document.body.style.overflow = 'hidden';
		} else if (!mobileMenuOpen && $iW) {
			document.body.style.overflow = '';
		} else if (!$iW) {
			document.body.style.overflow = '';
		}
	});
</script>

<svelte:window onkeydown={onWindowKeydown} />

<div class="button-wrapper box " class:bordered={mobileMenuOpen}>
{#if $iW}
<button class="mobile-shelf row ycenter xleft cgap8" aria-haspopup="menu" aria-expanded={mobileMenuOpen} onclick={() => (mobileMenuOpen = !mobileMenuOpen)}>
	<BlogMenu size="32" color="currentColor" />
	<span class="mobile-shelf-text">Browse</span>
</button>
{/if}
{#if !$iW || mobileMenuOpen}
<div 
	class="button-tray"
	in:fly={{ duration: 120, easing: quadOut }}
	out:fly={{ duration: 120, easing: quintIn }}
	use:clickOutsideAction={closeMobileMenu}
	style:--d-col={desktopCol}
	style:--m-row={mobileRow}
	style:--m-col={mobileCol}
	style:--m-cols-count={mobileCols}
	style:--d-cols-count={options.length}
>
	{#each options as option, i}
		<button
			type="button"
			class:active={selectedIndex === i}
			onclick={() => handleSelect(i)}
		>
			{option.label}
		</button>
	{/each}
	<span class="selection"></span>
</div>
{/if}
</div>

<style lang="sass">

@media screen and (max-width: 1024px)
	.button-wrapper
		position: relative
		height: 100%
		background: var(--color-back)
		z-index: 1
		&.bordered
			background: var(--color-back)
		.button-tray
			position: absolute
			border: 1px solid #d7d7d7
			width: 100%
			left: 0
			top: 3rem
			background: var(--color-back)
			box-shadow: 2px 3px 7px rgba(0,0,0,0.2)

.mobile-shelf
	background: var(--color-theme-light2)
	border: 1px solid #d7d7d7
	padding: 0.4rem 0.5rem
	border-radius: 5px
	width: 100%
	.mobile-shelf-text
		font-size: 1.2rem
	@media (min-width: 1025px)
		display: none

.button-tray
	@media screen and (max-width: 1024px)
		display: flex
		flex-direction: column
		button
			font-size: 1.1rem
			padding: 1rem 0.75rem
			text-align: left
			font-weight: 450
			background: none
			border-top: none
			border-left: none
			border-right: none
			border-bottom: var(--border-main)
	@media (min-width: 1025px)
		--bg-color: #fff
		--accent-color: rgb(11, 117, 223)
		position: relative
		display: grid
		grid-template-columns: repeat(8, 1fr)
		background-color: var(--color-back)
		border-radius: 3px
		border: 1px solid rgba(0, 0, 0, 0.1)
		width: 100%
		overflow: hidden
		button
			all: unset
			padding: 15px 5px
			cursor: pointer
			text-align: center
			font-weight: 500
			font-size: 13.4px
			text-transform: uppercase
			transition: all 0.17s ease
			display: flex
			justify-content: center
			align-items: center
			&:hover
				background: var(--color-grey-1)
				color: #FFFFFF
			&.active
				background: var(--color-grey-2)
				color: #FFFFFF

</style>