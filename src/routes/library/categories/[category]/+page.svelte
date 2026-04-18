<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state'
	import { selectedOpenLibrary } from '$lib/utils/supabaseClient';
	import Head from '$lib/comps/headcomponent.svelte';
	import Container from '$lib/comps/container.svelte'
	import Crumb from '$lib/comps/breadcrumb.svelte'
	import { metaTitle, metaDescription, metaUrl, metaImage } from '$lib/utils/metastores';
	let { data } = $props();
	let books = $state<any>([]);
	const category = $derived(data.category);

const categories = [
		{ label: 'Essentials', href: '/library/categories/essentials', type: 'essentials', forLink: 'essentials', desc: 'Foundational readings for entering the civilisational and philosophical landscape of Bodha.' },
		{ label: 'Aryan Issue', href: '/library/categories/aryan-issue', type: 'aryan-issue', forLink: 'aryanissue', desc: 'Texts on the Aryan debate, migration theory, archaeology, philology, and civilizational argument.' },
		{ label: 'Darshanas', href: '/library/categories/darshanas', type: 'darshanas', forLink: 'darshana', desc: 'Primary and secondary works on Indian philosophical systems, debates, and metaphysical frameworks.' },
		{ label: 'Indian Knowledge Systems', href: '/library/categories/iks', type: 'iks', forLink: 'iks', desc: 'Works on organised traditions of knowledge, method, science, language, and pedagogy.' },
		{ label: 'Scriptural', href: '/library/categories/scriptural', type: 'scriptural', forLink: 'scriptural', desc: 'Sources in shruti, smriti, puranic, and sacred-historical traditions.' },
		{ label: 'Shatrubodha', href: '/library/categories/shatrubodha', type: 'shatrubodha', forLink: 'shatrubodha', desc: 'Texts dealing with critique, conflict, ideology, and civilisational self-understanding.' },
		{ label: 'Svayambodha', href: '/library/categories/svayambodha', type: 'svayambodha', forLink: 'svayambodha', desc: 'Books oriented toward self-understanding, cultural continuity, and Hindu civilisational confidence.' }
];

$effect(() => {
	metaTitle.set(
		category
			? `Bodha Open Library - ${category.label}`
			: 'Bodha Open Library'
	);

	metaDescription.set(
		category?.desc ?? 'Browse Bodha’s open library across categories.'
	);

	metaUrl.set('https://www.bodharesearch.in' + page.url.pathname);
	metaImage.set('/images/key-bol.webp');
});

	$effect(() => {
		if (!category?.forLink) return;

		(async () => {
			books = await selectedOpenLibrary(category.forLink);
		})();
	});

	onMount(async () => {
		books = await selectedOpenLibrary(category.forLink);
	});

</script>

<Head title={$metaTitle} metaDescription={$metaDescription} metaUrl={$metaUrl} metaImage={$metaImage} />

<Container narrow={true} scaled={true}>
	<div class="box std padded-ontop">
		<Crumb item1="Library" item1Link="/library" show2={true} item2="Categories" showT={true} title={category.label} showD={true} desc={category.desc} showRow={true}>
			<div class="row cgap8 rgap8 mwrap ptop16">
	{#each categories as cat (cat.type)}
	{#if cat.type !== category.type}
	<a class="filter-button" href={cat.href}>
		{cat.label}
	</a>
	{/if}
{/each}
			</div>
		</Crumb>
		{#if books && books.length > 0}
			<div class="grid four standard-grid">
				{#each books as item, i}
					{#if item.type === 'aryanissue'}
					<a class="blank box number" href={item.linkfinal} target="_blank" rel="noreferrer">
						<p class="item-line tight w500">{item.name}</p>
						<p class="citation-big tt-u lgrey">{item.author}</p>
					</a>
					{:else}
					<a class="blank box number" href={item.linkfinal2}>
						<p class="item-line tight w500">{item.name}</p>
						<p class="citation-big tt-u lgrey">{item.author}</p>
					</a>
					{/if}
				{/each}
			</div>
		{/if}
	</div>
</Container>

<style lang="sass">

a.blank.box
	padding: 1.25rem

</style>