<svelte:options runes={true} />

<script lang="ts">
	import Title from '$lib/comps/page-title.svelte';

	type HubRelatedLink = {
		href?: string;
		urlPath?: string;
		title: string;
		description?: string | null;
		routeFamily: string;
	};

	type Props = {
		title?: string;
		items?: HubRelatedLink[];
		maxItems?: number;
		anveshi?: boolean;
	};

	let { title = 'Related Paths', items = [], maxItems = 8, anveshi = false }: Props = $props();

	const visibleItems = $derived(items.filter((item) => item.href || item.urlPath).slice(0, maxItems));

	function itemHref(item: HubRelatedLink) {
		return item.href || item.urlPath || '#';
	}
</script>

{#if visibleItems.length}
	<section class="wrapper-std growingline" aria-label={title}>
		<Title text={title} {anveshi} />
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 white-grid related-links">
			{#each visibleItems as page (itemHref(page))}
				<a class="box rgap16 blank whitestone p24 lg:p32" href={itemHref(page)}>
					<p class="txt-lg w500">{page.title}</p>
					{#if page.description}
						<p class="grey1 lh14">{page.description}</p>
					{/if}
					<p class="txt-xs w500 tt-u theme self-bottom ptop8 bordertop">{page.routeFamily}</p>
				</a>
			{/each}
		</div>
	</section>
{/if}
