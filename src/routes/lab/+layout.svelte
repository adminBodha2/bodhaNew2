<script lang="ts">
	import '$lib/styles/lab.sass';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { fullLab } from '$lib/utils/localpulls';

	let labItems: any[] = [];

	// Group items by category, preserving date-sort within each group
	$: grouped = labItems.reduce((acc: Record<string, any[]>, item: any) => {
		const cat = item.meta.category;
		if (!acc[cat]) acc[cat] = [];
		acc[cat].push(item);
		return acc;
	}, {});

	onMount(() => {
		(async () => {
			labItems = await fullLab();
		})();
	});
</script>

<div class="stdpad lab-page">
	<div class="lab-shell">
		<aside class="lab-side column">
			<div class="lab-side-inner">
				<nav class="lab-nav column rgap32">
					{#each Object.entries(grouped) as [category, items]}
						<div class="lab-nav-group column rgap8">
							<small class="sm lgrey">{category}</small>
							{#each items as item}
								{@const isActive = $page.url.pathname === item.linkpath}
									<p class="lab-nav-item"><a class="blank" href={item.linkpath} class:active={isActive}>{item.meta.title}</a></p>
							{/each}
						</div>
					{/each}
				</nav>
			</div>
		</aside>
		<main class="lab-main">
			<slot></slot>
		</main>
	</div>
</div>
