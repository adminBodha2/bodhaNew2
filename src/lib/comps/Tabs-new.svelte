<script lang="ts">
	import ResponsiveMenu from '$lib/comps/responsive-menu.svelte';
	import Menudrop from '$lib/comps/responsive-menu.svelte';

	type Props = {
		tabs: string[];
		active: number;
		onTabChange: (index: number) => void;
		label?: string;
		variant?: 'selection-button' | 'selection-button-2';
		layout?: 'responsive' | 'menudrop' | 'inline';
	};

	let {
		tabs,
		active,
		onTabChange,
		label = 'Sections',
		variant = 'selection-button',
		layout = 'responsive'
	}: Props = $props();

	const btnClass = $derived(variant === 'selection-button-2' ? 'selection-button-2' : 'selection-button');
</script>

{#if layout === 'responsive'}
	<ResponsiveMenu {label}>
		{#each tabs as tab, i}
			<button
				class={btnClass}
				class:active={active === i}
				onclick={() => onTabChange(i)}
			>
				{tab}
			</button>
		{/each}
	</ResponsiveMenu>
{:else if layout === 'menudrop'}
	<Menudrop {label} ariaLabel={label}>
		{#each tabs as tab, i}
			<button
				class={btnClass}
				class:active={active === i}
				onclick={() => onTabChange(i)}
			>
				{tab}
			</button>
		{/each}
	</Menudrop>
{:else if layout === 'inline'}
	<div class="row wrap cgap8 rgap8">
		{#each tabs as tab, i}
			<button
				class={btnClass}
				class:active={active === i}
				onclick={() => onTabChange(i)}
			>
				{tab}
			</button>
		{/each}
	</div>
{/if}
