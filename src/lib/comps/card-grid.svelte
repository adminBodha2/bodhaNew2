<script lang="ts">
	import TagList from '$lib/comps/tag-list.svelte';

	export type CardItem = {
		id: string;
		title: string;
		description?: string;
		type?: string;
		href?: string;
		tags?: string[];
		authors?: string[];
		lens?: string;
		image?: string;
		external?: boolean;
	};

	type Props = {
		items: CardItem[];
		columns?: 2 | 3 | 4;
		compact?: boolean;
		animated?: boolean;
		linkable?: boolean;
	};

	let {
		items,
		columns = 4,
		compact = false,
		animated = true,
		linkable = true
	}: Props = $props();

	const colClass = $derived(
		columns === 2 ? 'lg:grid-cols-2' : columns === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
	);
</script>

{#if animated}
	<div class="grid grid-cols-1 md:grid-cols-2 {colClass} gap16">
		{#each items as item (item.id)}
			{#if linkable && item.href}
				<a
					class="box whitestone {compact ? 'tight-pad' : 'std-pad'} b-main {item.image ? 'rgap0' : 'rgap8'}"
					href={item.href}
					target={item.external ? '_blank' : undefined}
					rel={item.external ? 'noreferrer' : undefined}
				>
					{#if item.image}
						<div>
							<img class="fitted landscape" src={item.image} alt={item.title} />
						</div>
					{/if}
					<div class="box {item.image ? 'std-pad' : ''} rgap8">
						{#if item.lens}
							<p class="txt-00 tt-u w500 theme">{item.lens}</p>
						{/if}
						{#if item.type}
							<p class="txt-xs tt-u w500 theme">{item.type}</p>
						{/if}
						<p class="txt-lg w600 a-hover">{item.title}</p>
						{#if item.description}
							<p class="grey1 lh14 txt-sm">{item.description}</p>
						{/if}
						{#if item.authors && item.authors.length > 0}
							<p class="txt-sm tt-u w500 grey2">{item.authors.join(', ')}</p>
						{/if}
						{#if item.tags && item.tags.length > 0}
							<TagList tags={item.tags} color="theme" compact={true} />
						{/if}
					</div>
				</a>
			{:else}
				<div class="box whitestone {compact ? 'tight-pad' : 'std-pad'} b-main rgap8">
					{#if item.image}
						<div>
							<img class="fitted landscape" src={item.image} alt={item.title} />
						</div>
					{/if}
					<div class="box {item.image ? 'std-pad' : ''} rgap8">
						{#if item.lens}
							<p class="txt-00 tt-u w500 theme">{item.lens}</p>
						{/if}
						{#if item.type}
							<p class="txt-xs tt-u w500 theme">{item.type}</p>
						{/if}
						<p class="txt-lg w600">{item.title}</p>
						{#if item.description}
							<p class="grey1 lh14 txt-sm">{item.description}</p>
						{/if}
						{#if item.authors && item.authors.length > 0}
							<p class="txt-sm tt-u w500 grey2">{item.authors.join(', ')}</p>
						{/if}
						{#if item.tags && item.tags.length > 0}
							<TagList tags={item.tags} color="theme" compact={true} />
						{/if}
					</div>
				</div>
			{/if}
		{/each}
	</div>
{:else}
	<div class="grid grid-cols-1 md:grid-cols-2 {colClass} gap16">
		{#each items as item (item.id)}
			{#if linkable && item.href}
				<a
					class="box whitestone {compact ? 'tight-pad' : 'std-pad'} b-main {item.image ? 'rgap0' : 'rgap8'}"
					href={item.href}
					target={item.external ? '_blank' : undefined}
					rel={item.external ? 'noreferrer' : undefined}
				>
					{#if item.image}
						<img class="fitted landscape" src={item.image} alt={item.title} />
					{/if}
					<div class="box {item.image ? 'std-pad' : ''} rgap8">
						{#if item.type}
							<p class="txt-xs tt-u w500 theme">{item.type}</p>
						{/if}
						<p class="txt-lg w600 a-hover">{item.title}</p>
						{#if item.description}
							<p class="grey1 lh14 txt-sm">{item.description}</p>
						{/if}
						{#if item.tags && item.tags.length > 0}
							<TagList tags={item.tags} color="theme" compact={true} />
						{/if}
					</div>
				</a>
			{:else}
				<div class="box whitestone {compact ? 'tight-pad' : 'std-pad'} b-main rgap8">
					{#if item.image}
						<img class="fitted landscape" src={item.image} alt={item.title} />
					{/if}
					<div class="box {item.image ? 'std-pad' : ''} rgap8">
						{#if item.type}
							<p class="txt-xs tt-u w500 theme">{item.type}</p>
						{/if}
						<p class="txt-lg w600">{item.title}</p>
						{#if item.description}
							<p class="grey1 lh14 txt-sm">{item.description}</p>
						{/if}
						{#if item.tags && item.tags.length > 0}
							<TagList tags={item.tags} color="theme" compact={true} />
						{/if}
					</div>
				</div>
			{/if}
		{/each}
	</div>
{/if}
