<script lang="ts">
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { onDestroy } from 'svelte';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import ResponsiveMenu from '$lib/comps/responsive-menu.svelte';
	import { filterRules, paginate } from '$lib/synaptic';
	import { absoluteImage, absoluteUrl, collectionPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';
	import IconNext from '$lib/icons/arrow-next.svelte';
	import IconPrev from '$lib/icons/arrow-prev.svelte'

	let { data }: { data: PageData } = $props();

	const title = 'Aṣṭādhyāyī Rules | Synaptic';
	const metaDescription = 'Browse Pāṇini’s Aṣṭādhyāyī by adhyāya and pāda.';
	const metaUrl = absoluteUrl('/library/sections/ashtadhyayi');
	const metaImage = absoluteImage('/images/sitemaster/list-ashtadhyayi.png');
	const adhyayas = [1, 2, 3, 4, 5, 6, 7, 8];
	const padas = [1, 2, 3, 4];
	let searchDraft = $state<string | null>(null);
	let searchTimer: ReturnType<typeof setTimeout> | null = null;
	let lastRouteQuery = $state<string | null>(null);
	let searchInput = $derived(searchDraft ?? data.query);
	let activeQuery = $derived(searchInput.trim().length >= 3 ? searchInput.trim() : '');
	let activePage = $derived(activeQuery === data.query ? data.slice.page : 1);
	let liveSlice = $derived(paginate(filterRules(data.adhyaya, data.pada, activeQuery), activePage));
	let jsonld = $derived(stringifyJsonLd(
		collectionPageJsonLd({
			name: title,
			description: metaDescription,
			url: metaUrl,
			image: metaImage,
			items: liveSlice.items.map((rule) => ({
				name: `${rule.id} ${rule.transliteration}`,
				url: absoluteUrl(`/library/sections/ashtadhyayi/${rule.id}`)
			}))
		})
	));

	$effect(() => {
		if (data.query !== lastRouteQuery) {
			searchDraft = null;
			lastRouteQuery = data.query;
		}
	});

	function filterHref(adhyaya: number | null, pada: number | null) {
		const params = new URLSearchParams();
		if (adhyaya) params.set('adhyaya', String(adhyaya));
		if (pada) params.set('pada', String(pada));
		if (activeQuery) params.set('q', activeQuery);
		const query = params.toString();
		return `/library/sections/ashtadhyayi${query ? `?${query}` : ''}`;
	}

	function pageHref(page: number) {
		const params = new URLSearchParams();
		if (data.adhyaya) params.set('adhyaya', String(data.adhyaya));
		if (data.pada) params.set('pada', String(data.pada));
		if (activeQuery) params.set('q', activeQuery);
		params.set('page', String(page));
		return `/library/sections/ashtadhyayi?${params.toString()}`;
	}

	function searchHref(query: string) {
		const params = new URLSearchParams();
		if (data.adhyaya) params.set('adhyaya', String(data.adhyaya));
		if (data.pada) params.set('pada', String(data.pada));
		if (query.length >= 3) params.set('q', query);
		const nextQuery = params.toString();
		return `/library/sections/ashtadhyayi${nextQuery ? `?${nextQuery}` : ''}`;
	}

	function handleSearchInput(event: Event) {
		const searchTerm = event.currentTarget instanceof HTMLInputElement ? event.currentTarget.value : '';
		const query = searchTerm.trim();
		searchDraft = searchTerm;
		if (searchTimer) clearTimeout(searchTimer);
		searchTimer = setTimeout(() => {
			void goto(searchHref(query), { keepFocus: true, noScroll: true });
		}, 250);
	}

	function handleSearchSubmit(event: SubmitEvent) {
		const form = event.currentTarget instanceof HTMLFormElement ? event.currentTarget : null;
		const value = form ? new FormData(form).get('q') : '';
		const query = typeof value === 'string' ? value.trim() : '';
		if (query.length > 0 && query.length < 3) {
			event.preventDefault();
		}
	}

	onDestroy(() => {
		if (searchTimer) clearTimeout(searchTimer);
	});
</script>

<Head {title} {metaDescription} {metaImage} {metaUrl} imWidth="1600" imHeight="1000" {jsonld} />

<Container>
	<section class="wrapper-std min100vh">
		<Crumb isSolo={true} showT={true} title="Aṣṭādhyāyī" showD={true} desc={metaDescription} fullP={true} />
		<div class="row gap8 ytop xbetween">
			<div class="row gap8 ytop">
			<div class="box rgap8">
				<ResponsiveMenu>
					<a class="selection-button-2" class:active={!data.adhyaya} href={filterHref(null, null)}>All</a>
					{#each adhyayas as adhyaya}
						<a class="selection-button-2" class:active={data.adhyaya === adhyaya} href={filterHref(adhyaya, null)}>{adhyaya}</a>
					{/each}
				</ResponsiveMenu>
				<p class="txt-00 tt-u w500 grey2">Adhyāya</p>
			</div>
			{#if data.adhyaya}
				<div class="box rgap8">
					<ResponsiveMenu>
						<a class="selection-button-2" class:active={!data.pada} href={filterHref(data.adhyaya, null)}>All</a>
						{#each padas as pada}
							<a class="selection-button-2" class:active={data.pada === pada} href={filterHref(data.adhyaya, pada)}>{pada}</a>
						{/each}
					</ResponsiveMenu>
					<p class="txt-00 tt-u w500 grey2">Pāda</p>
				</div>
			{/if}
			</div>
			<form class="row gap8" method="GET" onsubmit={handleSearchSubmit}>
				<input class="library-search" type="search" name="q" value={searchInput} oninput={handleSearchInput} placeholder="Search..." autocomplete="off" />
				{#if data.adhyaya}
					<input type="hidden" name="adhyaya" value={data.adhyaya} />
				{/if}
				{#if data.pada}
					<input type="hidden" name="pada" value={data.pada} />
				{/if}
				<button class="primary" type="submit"><span>Search</span></button>
			</form>
		</div>
		<div class="box rgap16">
			<div class="row ycenter gap16">
				<p class="txt-sm grey2">{liveSlice.totalItems} rules · page {liveSlice.page} of {liveSlice.totalPages}</p>
				<div class="row ycenter">
				{#if liveSlice.page > 1}
					<a class="row ycenter a-svg" href={pageHref(liveSlice.page - 1)}><IconPrev/></a>
				{/if}
				{#if liveSlice.page < liveSlice.totalPages}
					<a class="row ycenter a-svg" href={pageHref(liveSlice.page + 1)}><IconNext/></a>
				{/if}
				</div>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 rgap16 lg:rgap32 cgap32 pbot16">
				{#each liveSlice.items as rule}
					<a class="blank box rgap8" href={`/library/sections/ashtadhyayi/${rule.id}`}>
						<p class="txt-xs tt-u w500 theme">{rule.id}</p>
						<p class="txt-lg w400 a-hover hind lh15 a-hover">{rule.text}</p>
						<p class="grey2 txt-sm lh14">{rule.transliteration}</p>
					</a>
				{/each}
			</div>
			<div class="row wrap cgap8 rgap8">
				{#if liveSlice.page > 1}
					<a class="primary grey" href={pageHref(liveSlice.page - 1)}><span>Previous</span></a>
				{/if}
				{#if liveSlice.page < liveSlice.totalPages}
					<a class="primary" href={pageHref(liveSlice.page + 1)}><span>Next</span></a>
				{/if}
			</div>
		</div>
	</section>
</Container>
