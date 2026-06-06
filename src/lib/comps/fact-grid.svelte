<script lang="ts">
	export type Fact = {
		label: string;
		value: string;
	};

	type Props = {
		items: Fact[];
		columns?: 2 | 3 | 4;
		compact?: boolean;
	};

	let {
		items,
		columns = 4,
		compact = false
	}: Props = $props();

	const colClass = $derived(
		columns === 2 ? 'lg:grid-cols-2' : columns === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
	);
</script>

<div class="grid grid-cols-2 {colClass} white-grid">
	{#each items as item}
		<div class="box whitestone {compact ? 'p16' : 'p16 lg:p24'} rgap4">
			<p class="txt-xs tt-u w500 theme">{item.label}</p>
			<p class="paragraph-text tight">{item.value}</p>
		</div>
	{/each}
</div>
