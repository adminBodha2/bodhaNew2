<svelte:options runes={true} />

<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import Container from '$lib/comps/wrapper.svelte';
	import Dropdown from '$lib/comps/responsive-menu.svelte'
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import libraryItems from '$lib/serving/library-items.json';
	import Parallax from '$lib/comps/parallaxfull.svelte';
	import Title from '$lib/comps/page-title.svelte';
	import { bharata1000 } from '$lib/utils/supabaseClient';
	import { libCategories, libPaths, libExternal } from '$lib/utils/localsends';
	import { absoluteImage, absoluteUrl, collectionPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';

	type Section = {
		section: string;
	};

	let { data }: { data: PageData } = $props();
	let sections = $derived((data.sections ?? []) as Section[]);
	let selectedSection = $state('');
	let bharatabooks = $state<any>(null);
	const title = 'Open Library | Bodha';
	const metaDescription = 'A collection of readings in Hindu culture and history, philosophical systems, Indian knowledge systems (IKS), scriptures, and more.';
	const metaUrl = absoluteUrl('/library');
	const metaImage = absoluteImage('/images/key-bol.webp');

	const categoryCounts = Object.fromEntries(libCategories.map((category) => [category.type, libraryItems.filter((item) => item.type === category.type).length]));
	const jsonld = stringifyJsonLd(
		collectionPageJsonLd({
			name: title,
			description: metaDescription,
			url: metaUrl,
			image: metaImage,
			items: libCategories.map((category) => ({
				name: category.label,
				url: category.href
			}))
		})
	);

	function toggleSection(newitem: string) {
		selectedSection = newitem;
		(async () => {
			bharatabooks = await bharata1000(selectedSection);
		})();
	}

	onMount(async () => {
		bharatabooks = await bharata1000(selectedSection);
	});
</script>

<Head {title} {metaDescription} {metaImage} {metaUrl} imWidth="1536" imHeight="1024" {jsonld} />

<Parallax imageLink="/images/key-bol.webp" isClass="is50" />
<Container>
	<div class="is-first">
		<Crumb showT={true} title="Bodha Open Library" showD={true} desc="A collection of readings in Hindu culture and history, philosophical systems, Indian knowledge systems (IKS), scriptures, and more." />
		<div class="grid grid-cols-1 lg:grid-cols-2 rgap16 cgap32">
			<p class="paragraph-text">Bodha Open Library is a collection of readings in Hindu culture and history, philosophical systems, Indian knowledge systems (IKS), scriptures, and more. Find your next reading by browsing the categories, or select one of our curated reading paths.</p>
			<p class="paragraph-text">All texts in the library are sourced from the public domain. If any text violates copyright, please write to us at <span class="blue">sitemaster@bodharesearch.in</span>. All works compiled under 'Aryan Issue' are externally hosted/published papers, and links will open in a new tab.</p>
		</div>
	</div>
	<div class="bordertop" id="categories">
		<Title text="Categories" />
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 white-grid">
			{#each libCategories as cat, i}
				<a class="card-padded labelbox whitestone" href={cat.href}>
					<div class="box shelf-main">
						<p class="paragraph-text w500 tight">{cat.label}</p>
						<p class="tag-text grey">
							{#if cat.type === 'arch'}41 issues{:else}{categoryCounts[cat.type]} texts{/if}
						</p>
					</div>
					<p class="descriptor-text tight altprim">{cat.desc}</p>
				</a>
			{/each}
		</div>
	</div>
	<div class="bordertop" id="reading-paths">
		<Title text="Curated Reading Paths" />
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 white-grid">
			{#each libPaths as path, i}
				<a class="card-padded labelbox blank whitestone" href={path.href}>
					<p class="paragraph-text w500 tight">{path.label}</p>
					<p class="descriptor-text grey tight">{path.desc}</p>
				</a>
			{/each}
		</div>
	</div>
	<div class="bordertop" id="bharata1000">
		<div class="textbox">
			<Title text="Bharata1000" />
			<div class="grid grid-cols-1 lg:grid-cols-2 rgap16 cgap32">
				<p>
					Bharata1000 is a curation of 1000 books to learn and understand itihasa, Bharata, and Dharma. The idea here is to provide rampways and learning paths for those looking to study deeper into civilizational and cultural Bharata.
					Presenting a work in this list is not an endorsement of its contents, for many are listed to inform the reader's shatrubodha, and expose them to problematic but well-known paradigms for India and Dharma.
				</p>
				<p>
					For example, there is no good English language translation of the Rigveda, and problems abound in those that are available. But if Ralph Griffith's work shows how the early European mind understood the text, and how they read it, then the more recent
					translation by Jamison and Brereton evidences the interpretations that are being pushed now.
				</p>
			</div>
		</div>
		<div class="labelbox tray-of-sections">
			<p class="descriptor-text grey">Select any section below to view books:</p>
			<div class="row cgap8 rgap8 wrap">
				{#each sections as item, i}
					<button class="filter-button" onclick={() => toggleSection(item.section)} class:active={item.section === selectedSection}>{item.section}</button>
				{/each}
				{#if selectedSection !== ''}
					<button class="filter-button" onclick={() => toggleSection('')} class:active={selectedSection === ''}>Close</button>
				{/if}
			</div>
		</div>
		<Dropdown>
				{#if selectedSection !== ''}
					<button class="dropped-link" onclick={() => toggleSection('')} class:active={selectedSection === ''}>Close</button>
				{/if}
				{#each sections as item, i}
					<button class="dropped-link" onclick={() => toggleSection(item.section)} class:active={item.section === selectedSection}>{item.section}</button>
				{/each}
		</Dropdown>
			{#if bharatabooks}
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 cgap16 rgap16">
					{#each bharatabooks as item}
						<div class="box labelbox">
							<div class="box borderbot pbot8">
								<p class="w500 tight">{item.title}</p>
							{#if item.author && item.author !== ''}
								<p class="tag-text tt-u">{item.author}</p>
							{/if}
							</div>
							<p class="descriptor-text grey tight">{item.description}</p>
						</div>
					{/each}
				</div>
			{/if}
	</div>
	<div class="is-last bordertop" id="other-resources">
		<Title text="External Resources" />
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 white-grid">
			{#each libExternal as res}
				<a class="resource-card blank whitestone" href={res.href} target="_blank" rel="noreferrer">
					<p class="item-line tight">{res.label} →</p>
					<p class="descriptor-text grey tight">{res.desc}</p>
				</a>
			{/each}
		</div>
	</div>
</Container>

<style lang="sass">

.tray-of-sections
	@media screen and (max-width: 1024px)
		display: none

.resource-card
	display: flex
	flex-direction: column
	gap: 0.4rem
	padding: 1.2rem 1.4rem
	background: var(--color-back)
	transition: background 0.15s ease

</style>
