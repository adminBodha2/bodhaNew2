<script lang="ts">
	type Props = {
		tags: string[];
		color?: 'theme' | 'grey0' | 'grey1' | 'theme-dark' | 'theme-light';
		linkable?: boolean;
		basePath?: string;
		compact?: boolean;
	};

	let {
		tags,
		color = 'theme',
		linkable = false,
		basePath = '',
		compact = false
	}: Props = $props();

	function displayTag(tag: string) {
		return tag.replaceAll('-', ' ');
	}
</script>

<div class="row wrap {compact ? 'cgap4 rgap4' : 'cgap8 rgap4'}">
	{#each tags as tag}
		{#if linkable && basePath}
			<a class="txt-xs tt-u w500 {color}" href="{basePath}/{tag}">
				{displayTag(tag)}
			</a>
		{:else}
			<span class="txt-xs tt-u w500 {color}">
				{displayTag(tag)}
			</span>
		{/if}
	{/each}
</div>
