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
	import Blur from '$lib/svelteanim/components/Blur.svelte';
	import Slide from '$lib/svelteanim/components/Slide2.svelte';
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
	let ref2 = $state<HTMLElement | null>(null);
	let ref3 = $state<HTMLElement | null>(null);	
	let ref4 = $state<HTMLElement | null>(null);	
	let visref2 = useInView(() =>  ref2, { threshold: 0.6, once: true});
	let visref3 = useInView(() =>  ref3, { threshold: 0.8, once: true});
	let visref4 = useInView(() =>  ref4, { threshold: 0.8, once: true});
	const title = 'Open Library | Bodha';
	const metaDescription = 'A collection of readings in Hindu culture and history, philosophical systems, Indian knowledge systems (IKS), scriptures, and more.';
	const metaUrl = absoluteUrl('/library');
	const metaImage = absoluteImage('/images/heroes/key-bol.webp');

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

<Parallax imageLink="/images/heroes/key-bol.webp" wipe={true} />
<Container>
<Crumb showT={true} title="Bodha Open Library" showD={true} desc="A collection of readings in Hindu culture and history, philosophical systems, Indian knowledge systems (IKS), scriptures, and more." />
	<section class="wrapper-std">
		<div class="grid grid-cols-1 lg:grid-cols-2 rgap16 cgap32" bind:this={revref}>
			<Reveal visible={visref.visible}>
				<p class="highlight-text">Bodha Open Library is a collection of readings in Hindu culture and history, philosophical systems, Indian knowledge systems (IKS), scriptures, and more. Find your next reading by browsing the categories, or select one of our curated reading paths.</p>
			</Reveal>
			<Reveal visible={visref.visible} delay={500}>
				<p class="highlight-text">All texts in the library are sourced from the public domain. If any text violates copyright, please write to us at <span class="blue">sitemaster@bodharesearch.in</span>. All works compiled under 'Aryan Issue' are externally hosted/published papers, and links will open in a new tab.</p>
			</Reveal>
		</div>
	</section>
	<section class="wrapper-std growingline">
		<Title text="Categories" />
		<Slide>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap16">
			{#each libCategories as cat, i}
				<a class="blank box rgap8 std-pad b-main whitestone slide-item" href={cat.href}>
					<p class="txt-xl w600 a-hover">{cat.label}</p>
					<p class="grey2 lh14">{cat.desc}</p>
						<p class="txt-xs tt-u w500 theme">
							{#if cat.type === 'arch'}41 issues{:else}{categoryCounts[cat.type]} texts{/if}
						</p>
				</a>
			{/each}
		</div>
		</Slide>
	</section>
	<section class="box wrapper-std rgap32 lg:rgap64 growingline alternate">
		<Title text="Curated Reading Paths" />
		<Slide targetSelector=".slide-item2">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap16">
			{#each libPaths as path, i}
				<a class="blank box rgap8 std-pad b-main whitestone slide-item2" href={path.href}>
					<p class="txt-xl w600 a-hover">{path.label}</p>
					<p class="grey2 lh14">{path.desc}</p>
				</a>
			{/each}
		</div>
		</Slide>
	</section>
	<section class="box wrapper-std rgap32 lg:rgap64 growingline">
		<Title text="Bharata1000" />
		<div class="grid grid-cols-1 lg:grid-cols-2 rgap16 cgap32" bind:this={ref4}>
			<Reveal visible={visref4.visible} duration={650}>
			<p class="highlight-text">
				Bharata1000 is a curation of 1000 books to learn and understand itihasa, Bharata, and Dharma. The idea here is to provide rampways and learning paths for those looking to study deeper into civilizational and cultural Bharata. Presenting a work in this list is not an endorsement of its contents, for many are listed to inform the reader's shatrubodha, and expose them to problematic but
				well-known paradigms for India and Dharma.
			</p>
			</Reveal>
			<Reveal visible={visref4.visible} duration={450} delay={700}>
				<p class="highlight-text">For example, there is no good English language translation of the Rigveda, and problems abound in those that are available. But if Ralph Griffith's work shows how the early European mind understood the text, and how they read it, then the more recent translation by Jamison and Brereton evidences the interpretations that are being pushed now.</p>
			</Reveal>
		</div>
		<a class="primary tt-u" href="/library/bharata1000"><span>Explore Curation</span></a>
	</section>
	<section class="box wrapper-std rgap32 lg:rgap64 growingline alternate">
		<Title text="External Resources" />
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 white-grid">
			{#each libExternal as res}
				<a class="blank whitestone box rgap16 p24 lg:p32" href={res.href} target="_blank" rel="noreferrer">
					<p class="txt-lg w500 a-hover">{res.label} →</p>
					<p class="grey0">{res.desc}</p>
				</a>
			{/each}
		</div>
	</section>
</Container>
