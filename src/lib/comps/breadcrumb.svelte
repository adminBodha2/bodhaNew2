<svelte:options runes={true} />

<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		item1?: string;
		item1Link?: string;
		show2?: boolean;
		item2?: string;
		item2linked?: boolean;
		item2Link?: string;
		showT?: boolean;
		title?: string;
		rgap?: number;
		showRow?: boolean;
		showD?: boolean;
		desc?: string;
		centered?: boolean;
		children?: Snippet;
	};

	let {
		item1 = ' ',
		item1Link = ' ',
		show2 = false,
		item2 = ' ',
		item2linked = false,
		item2Link = ' ',
		showT = false,
		title = ' ',
		rgap = 0,
		showRow = false,
		showD = false,
		desc = ' ',
		centered = false,
		children
	}: Props = $props();
</script>

<div
	class="box labelbox mleft null{rgap}"
	class:xcenter={centered}
>
	<div class="row ycenter xleft cgap8 rgap8 forcrumb">
		<p class="tag-text w500 lgrey tt-u">
			<a class="blank linkonhover" href={item1Link}>← {item1}</a>
		</p>

		{#if show2 || item2linked}
			<p class="tag-text w500 lgrey">></p>

			{#if item2linked}
				<p class="tag-text w500 lgrey tt-u">
					<a class="blank linkonhover" href={item2Link}>{item2}</a>
				</p>
			{:else}
				<p class="tag-text w500 tt-u lgrey">{item2}</p>
			{/if}
		{/if}
	</div>

	<div class="labelbox pbot8 mleft" class:ta-c={centered}>
		{#if showT}
			<h1 class="page-title source-serif tt-c tight">{title}</h1>
		{/if}

		{#if showD}
			<p class="small-text grey" class:width50={!centered}>{desc}</p>
		{/if}
	</div>

	{#if showRow}
		{@render children?.()}
	{/if}
</div>
