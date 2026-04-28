<script lang="ts">
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
	
	// 2. Math for the grid layout
	let mobileCols = $derived(Math.ceil(options.length / 2));
	
	// 3. Coordinate system for the selection pill
	let desktopCol = $derived(selectedIndex);
	let mobileRow = $derived(Math.floor(selectedIndex / mobileCols));
	let mobileCol = $derived(selectedIndex % mobileCols);

	function handleSelect(index: number) {
		selectedIndex = index;
		onSelect(index);
	}
</script>

<div 
	class="button-tray" 
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

<style lang="sass">
.button-tray
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
	@media (max-width: 1024px)
		grid-template-columns: repeat(4, 1fr)
	button
		all: unset
		padding: 15px 5px
		cursor: pointer
		text-align: center
		z-index: 1
		font-weight: 500
		font-size: 13.4px
		text-transform: uppercase
		transition: color 0.2s ease
		display: flex
		justify-content: center
		align-items: center
		&.active
			color: #fff
	.selection
		position: absolute
		background-color: var(--color-grey-4)
		z-index: 0
		top: 0
		left: 0
		transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), width 0.2s, height 0.2s
		
		// Desktop defaults (1 row)
		// We use transform to move the pill. 100% = the width of the pill itself.
		width: calc(100% / 8)
		height: 100%
		transform: translateX(calc(100% * var(--d-col)))

		@media (max-width: 1024px)
			width: calc(100% / 4)
			height: 50%
			// Move X by column and Y by row
			transform: translate(calc(100% * var(--m-col)), calc(100% * var(--m-row)))
</style>