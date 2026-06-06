<script lang="ts">
	import type { PageData } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Crumb2 from '$lib/comps/crumb-2.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import HubRelatedLinks from '$lib/comps/hub-related-links.svelte';
	import CardGrid from '$lib/comps/card-grid.svelte';
	import TagList from '$lib/comps/tag-list.svelte';
	import autoAnimate from '@formkit/auto-animate';
	import { staggerAnimatePlugin } from '$lib/svelteanim/utils/staggerPlugin';
	import { absoluteImage, absoluteUrl } from '$lib/utils/seo';
	import iksItems from '$lib/serving/db-iks.json';
	import seoTopicLinks from '$lib/generated/seo-topic-links.json';
	import Responsive from '$lib/comps/responsive-menu.svelte';

	let { data }: { data: PageData } = $props();

	type IksAuthor = {
		name?: string;
		authorId?: string;
	};

	type IksItem = {
		paperId?: string;
		url?: string;
		title?: string;
		venue?: string;
		year?: number;
		publicationDate?: string;
		authors?: IksAuthor[];
		abstract?: string | null;
	};

	const title = $derived(`${data.domain.title} | Bodha Knowledge Wiki`);
	const metaDescription = $derived(data.domain.description);
	const metaUrl = $derived(absoluteUrl(`/wiki/${data.domain.slug}`));
	const metaImage = absoluteImage('/images/bodhacover.png');
	const iksDatabase = iksItems as IksItem[];
	const iksTopic = seoTopicLinks.topics['indian-knowledge-systems'];
	const relatedIksPages = $derived(iksTopic?.supportingPages ?? []);

	let iksSearch = $state('');
	let openIksPaperId = $state<string | null>(null);

	// Define the canonical order of sections (must match sectionOrder in $lib/wiki-graph)
	const allTabs = ['Wiki Pages', 'Thinkers', 'Schools', 'Questions', 'Research', 'Essays', 'Books', 'Labs'] as const;

	// Derive the list of tabs that actually have content for this domain (more robust)
	const availableTabs = $derived(allTabs.filter((tab) => data.sections.some((section) => section.title === tab)));

	// The currently selected tab
	let activeTab = $state<string>('');

	// Initialize activeTab reactively (avoids "initial value capture" warning)
	$effect(() => {
		if (activeTab === '' && availableTabs.length > 0) {
			activeTab = availableTabs[0];
		}
	});

	// If the current activeTab is no longer available (e.g. data changed), reset it
	$effect(() => {
		if (activeTab && !availableTabs.includes(activeTab as any)) {
			activeTab = availableTabs[0] ?? '';
		}
	});

	const selectedSection = $derived(data.sections.find((section) => section.title === activeTab));

	const sectionCards = $derived(
		(selectedSection?.items ?? []).map((item) => ({
			id: item.title,
			title: item.title,
			description: item.description,
			lens: item.lens ?? undefined,
			authors: item.authors,
			href: item.href ?? undefined
		}))
	);

	const iksSearchResults = $derived.by(() => {
		const query = iksSearch.trim().toLowerCase();
		if (query.length < 2) return [];

		return iksDatabase.filter((item) => item.title?.toLowerCase().includes(query)).slice(0, 24);
	});

	function authorList(item: IksItem) {
		return (
			item.authors
				?.map((author) => author.name)
				.filter(Boolean)
				.join(', ') || 'Unknown authors'
		);
	}

	function publicationInfo(item: IksItem) {
		return [item.venue, item.publicationDate || item.year].filter(Boolean).join(' | ') || 'Publication details unavailable';
	}

	function abstractText(item: IksItem) {
		return item.abstract?.replace(/\s+/g, ' ').trim() || 'Abstract unavailable.';
	}

	function displayTitle(value = '') {
		const letters = value.replace(/[^A-Za-z]/g, '');
		const isAllCaps = letters.length > 0 && letters === letters.toUpperCase();
		if (!isAllCaps) return value;

		const acronyms = new Set(['AI', 'API', 'ICT', 'IKS', 'NEP', 'STEM', 'UGC']);

		return value.toLowerCase().replace(/\b[\p{L}\p{N}][\p{L}\p{N}'-]*/gu, (word) => {
			const upper = word.toUpperCase();
			if (acronyms.has(upper)) return upper;
			return word.charAt(0).toUpperCase() + word.slice(1);
		});
	}

	function itemKey(item: IksItem) {
		return item.paperId || item.url || item.title || '';
	}

	function toggleIksPaper(item: IksItem) {
		const key = itemKey(item);
		openIksPaperId = openIksPaperId === key ? null : key;
	}

	function resetIksSearchOnEscape(event: KeyboardEvent) {
		if (event.key !== 'Escape' || iksSearch.trim().length < 2) return;
		iksSearch = '';
		openIksPaperId = null;
	}
</script>

<svelte:window onkeydown={resetIksSearchOnEscape} />

<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="2560" imHeight="1440" />

<Container>
	<section class="wrapper-std">
		<Crumb2 showT={true} title={data.domain.title} showD={true} desc={data.domain.description} showRow={true}>
			<div class="box rgap4">
				<p class="txt-xs tt-u w500 grey0">Connected Knowledge - <span class="theme">{data.totalConnected}</span></p>
				{#if data.domain.tags.length}
					<TagList tags={data.domain.tags} color="theme" compact={true} />
				{/if}
			</div>
		</Crumb2>
		{#if data.domain.title === 'Indian Knowledge Systems and Education'}
			<div class="box rgap16">
				<p class="highlight-text width70">We maintain here a monthly updated registry on publications in IKS. Current month registry holds 600+ academic papers. Search by title here.</p>
				<div class="box rgap8">
					<label class="txt-00 tt-u w500 grey0" for="iks-paper-search">Search IKS Papers</label>
					<input id="iks-paper-search" bind:value={iksSearch} type="search" placeholder="Search by paper title..." autocomplete="off" />
				</div>
				{#if iksSearch.trim().length >= 2}
					<div class="box" id="results-wrapper">
						{#if iksSearchResults.length}
							<div class="grid grid-cols-1 lg:grid-cols-2 white-grid">
								{#each iksSearchResults as item (itemKey(item))}
									<button type="button" class="col-span-1 rgap12 box rgap8 p24 xleft ta-l whitestone" onclick={() => toggleIksPaper(item)} aria-expanded={openIksPaperId === itemKey(item)} use:autoAnimate>
										<p class="txt-xs tt-u w500 theme">{publicationInfo(item)}</p>
										<p class="txt-lg w500">{displayTitle(item.title)}</p>
										<p class="txt-sm w500 grey3">{authorList(item)}</p>
										{#if openIksPaperId === itemKey(item)}
											<p class="txt-bs grey2 lh14">{abstractText(item)}</p>
											{#if item.url}
												<a class="txt-bs tt-u w500 theme ptop8" href={item.url} target="_blank" rel="noreferrer" onclick={(event) => event.stopPropagation()}>See Paper</a>
											{/if}
										{/if}
									</button>
								{/each}
							</div>
						{:else}
							<p class="grey1">No matching titles found.</p>
						{/if}
					</div>
				{/if}
			</div>
		{/if}
		<Responsive>
			{#each availableTabs as tab}
				<button class="selection-button" class:active={activeTab === tab} onclick={() => (activeTab = tab)}>
					{tab}
				</button>
			{/each}
		</Responsive>
		<div class="box rgap32">
			{#if selectedSection && selectedSection.items.length > 0}
				<CardGrid items={sectionCards} columns={4} animated={true} />
			{:else if availableTabs.length === 0}
				<p class="grey1 p24">No content available for this domain yet.</p>
			{:else}
				<p class="grey1 p24">No items available in this section for the current domain.</p>
			{/if}
		</div>
	</section>
	{#if data.domain.slug === 'indian-knowledge-systems-and-education'}
		<HubRelatedLinks title="Related IKS Research" items={relatedIksPages} />
	{/if}
</Container>

<style lang="sass">

#results-wrapper
	button.box
		border: none
		p.txt-lg
			text-transform: capitalize

#iks-paper-search
	padding: 12px
	font-size: 1.1rem
	border-radius: 4px
	border: var(--border-dark)
	@media (min-width: 721px)
		width: 320px

</style>
