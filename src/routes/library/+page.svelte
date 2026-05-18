<svelte:options runes={true} />

<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import libraryItems from '$lib/serving/library-items.json';
	import Parallax from '$lib/comps/parallaxhalf.svelte';
	import Title from '$lib/comps/page-title.svelte';
	import { bharata1000 } from '$lib/utils/supabaseClient';
	import { libCategories, libPaths, libExternal } from '$lib/utils/localsends';
	import Reveal from '$lib/svelteanim/components/Reveal.svelte';
	import { useInView } from '$lib/svelteanim';
	import { absoluteImage, absoluteUrl, collectionPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';

	type Section = {
		section: string;
	};

	let { data }: { data: PageData } = $props();
	let sections = $derived((data.sections ?? []) as Section[]);
	let selectedSection = $state('');
	let bharatabooks = $state<any>(null);
	let revref = $state<HTMLElement | null>(null);
	let visref = useInView(() => revref, { threshold: 0.4, once: true });
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

<Container>
	<Parallax imageLink="/images/key-bol.webp" wipe={true} />
	<section class="box wrapper-std rgap32 first-box">
		<Crumb showT={true} title="Bodha Open Library" showD={true} desc="A collection of readings in Hindu culture and history, philosophical systems, Indian knowledge systems (IKS), scriptures, and more." />
		<div class="grid grid-cols-1 lg:grid-cols-2 rgap16 cgap32" bind:this={revref}>
			<Reveal visible={visref.visible}>
				<p class="highlight-text">Bodha Open Library is a collection of readings in Hindu culture and history, philosophical systems, Indian knowledge systems (IKS), scriptures, and more. Find your next reading by browsing the categories, or select one of our curated reading paths.</p>
			</Reveal>
			<Reveal visible={visref.visible} delay={500}>
				<p class="highlight-text">All texts in the library are sourced from the public domain. If any text violates copyright, please write to us at <span class="blue">sitemaster@bodharesearch.in</span>. All works compiled under 'Aryan Issue' are externally hosted/published papers, and links will open in a new tab.</p>
			</Reveal>
		</div>
	</section>
	<section class="box wrapper-std rgap32 lg:rgap64 growingline">
		<Title text="Categories" />
		<div class="grid grid-cols-2 lg:grid-cols-4 gap8 lg:gap16">
			{#each libCategories as cat, i}
				<a class="blank box p24 b-main radius glass-2" href={cat.href}>
					<div class="box shelf-main">
						<p class="txt-xs tt-u w500 theme">
							{#if cat.type === 'arch'}41 issues{:else}{categoryCounts[cat.type]} texts{/if}
						</p>
						<p class="txt-xl lg:txt-2xl w600 a-hover ptop8 pbot8">{cat.label}</p>
					</div>
					<p class="grey2 lh14">{cat.desc}</p>
				</a>
			{/each}
		</div>
	</section>
	<section class="box wrapper-std rgap32 lg:rgap64 growingline alternate">
		<Title text="Curated Reading Paths" />
		<div class="grid grid-cols-2 lg:grid-cols-3 gap8 lg:gap16">
			{#each libPaths as path, i}
				<a class="blank box p24 b-main radius glass-2" href={path.href}>
					<p class="txt-xl lg:txt-2xl w600 a-hover pbot8">{path.label}</p>
					<p class="grey2 lh14">{path.desc}</p>
				</a>
			{/each}
		</div>
	</section>
	<section class="box wrapper-std rgap32 lg:rgap64 growingline">
		<Title text="Bharata1000" />
		<div class="grid grid-cols-1 lg:grid-cols-2 rgap16 cgap32">
			<p class="highlight-text">
				Bharata1000 is a curation of 1000 books to learn and understand itihasa, Bharata, and Dharma. The idea here is to provide rampways and learning paths for those looking to study deeper into civilizational and cultural Bharata. Presenting a work in this list is not an endorsement of its contents, for many are listed to inform the reader's shatrubodha, and expose them to problematic but
				well-known paradigms for India and Dharma.
			</p>
			<p class="highlight-text">For example, there is no good English language translation of the Rigveda, and problems abound in those that are available. But if Ralph Griffith's work shows how the early European mind understood the text, and how they read it, then the more recent translation by Jamison and Brereton evidences the interpretations that are being pushed now.</p>
		</div>
		<p class="w600 theme">Select any section below to view books:</p>
		<div class="row cgap8 rgap8 wrap">
			{#each sections as item, i}
				<button class="filter-button" onclick={() => toggleSection(item.section)} class:active={item.section === selectedSection}>{item.section}</button>
			{/each}
			{#if selectedSection !== ''}
				<button class="filter-button" onclick={() => toggleSection('')} class:active={selectedSection === ''}>Close</button>
			{/if}
		</div>
		{#if bharatabooks}
			<div class="grid grid-cols-2 lg:grid-cols-4 gap8 lg:gap16">
				{#each bharatabooks as item}
					<div class="box p24 b-main radius">
						<p class="txt-xl w600 a-hover pbot8">{item.title}</p>
						<p class="grey2 lh14">{item.description}</p>
						{#if item.author && item.author !== ''}
							<p class="txt-xs tt-u w500 theme ptop8 self-bottom">{item.author}</p>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	</section>
	<section class="box wrapper-std rgap32 lg:rgap64 growingline alternate">
		<Title text="External Resources" />
		<div class="grid grid-cols-2 lg:grid-cols-4 white-grid">
			{#each libExternal as res}
				<a class="blank whitestone box rgap8 p16 lg:p24" href={res.href} target="_blank" rel="noreferrer">
					<p class="txt-lg w500 a-hover">{res.label} →</p>
					<p class="grey0">{res.desc}</p>
				</a>
			{/each}
		</div>
	</section>
</Container>
