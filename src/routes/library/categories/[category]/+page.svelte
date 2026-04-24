<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { selectedOpenLibrary } from '$lib/utils/supabaseClient';
	import Head from '$lib/comps/headcomponent.svelte';
	import Container from '$lib/comps/container.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import { libCategories } from '$lib/utils/localsends';
	let { data } = $props();
	let books = $state<any>([]);
	const category = $derived(data.category);

	$effect(() => {
		if (!category?.forLink) return;

		(async () => {
			books = await selectedOpenLibrary(category.forLink);
		})();
	});

	const title = category.label
	const metaDescription = category.desc
	const metaUrl = 'https://www.bodharesearch.in' + page.url.pathname
	const metaImage = 'https://www.bodharesearch.in/images/key-bol.webp';

	onMount(async () => {
		books = await selectedOpenLibrary(category.forLink);
	});
</script>

<Head {title} {metaDescription} {metaImage} {metaUrl}/>

<Container narrow={true} scaled={true}>
	<div class="box std padded-ontop">
		<Crumb item1="Library" item1Link="/library" show2={true} item2="Categories" showT={true} title={category.label} showD={true} desc={category.desc} showRow={true}>
			<div class="row cgap8 rgap8 mwrap ptop16">
				{#each libCategories as cat (cat.type)}
					{#if cat.type !== category.type}
						<a class="nav-btn" href={cat.href}>
							{cat.label}
						</a>
					{/if}
				{/each}
			</div>
		</Crumb>
		{#if books && books.length > 0}
			<div class="grid four white-grid">
				{#each books as item, i}
					{#if item.type === 'aryanissue'}
						<a class="blank labelbox whitestone card-padded" href={item.linkfinal} target="_blank" rel="noreferrer">
							<p class="w500 tight">{item.name}</p>
							<p class="citation-big tt-u lgrey">{item.author}</p>
						</a>
					{:else}
						<a class="blank labelbox whitestone card-padded" href={item.linkfinal2}>
							<p class="w500 tight">{item.name}</p>
							<p class="small-text grey tight">{item.short}</p>
							<p class="citation-big tt-u lgrey self-bottom">{item.author}</p>
						</a>
					{/if}
				{/each}
			</div>
		{/if}
	</div>
</Container>