<script lang="ts">
	import type { PageData } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import ResponsiveMenu from '$lib/comps/responsive-menu.svelte';
	import { absoluteImage, absoluteUrl, collectionPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';

	let { data }: { data: PageData } = $props();

	const title = 'Sanskrit Word List | Synaptic';
	const metaDescription = 'Browse Sanskrit words with Apte and Monier-Williams dictionary meanings.';
	const metaUrl = absoluteUrl('/library/sections/words');
	const metaImage = absoluteImage('/images/sitemaster/list-dhatu-word-meanings.png');
	let jsonld = $derived(stringifyJsonLd(
		collectionPageJsonLd({
			name: title,
			description: metaDescription,
			url: metaUrl,
			image: metaImage,
			items: data.slice.items.map((word) => ({
				name: word.headword,
				description: word.preview,
				url: absoluteUrl(`/library/sections/words/${word.slug}`)
			}))
		})
	));

	function dictionaryHref(dictionary: 'apte' | 'mw' | null) {
		const params = new URLSearchParams();
		if (dictionary) params.set('dictionary', dictionary);
		if (data.query) params.set('q', data.query);
		const query = params.toString();
		return `/library/sections/words${query ? `?${query}` : ''}`;
	}

	function pageHref(page: number) {
		const params = new URLSearchParams();
		if (data.dictionary) params.set('dictionary', data.dictionary);
		if (data.query) params.set('q', data.query);
		params.set('page', String(page));
		return `/library/sections/words?${params.toString()}`;
	}
</script>

<Head {title} {metaDescription} {metaImage} {metaUrl} imWidth="1600" imHeight="1000" {jsonld} />

<Container>
	<section class="wrapper-std">
		<Crumb showT={true} title="Sanskrit Word List" showD={true} desc={metaDescription} fullP={true} />
		<form class="box rgap16" method="GET">
			<input type="search" name="q" value={data.query} placeholder="Search Sanskrit word or meaning" />
			{#if data.dictionary}
				<input type="hidden" name="dictionary" value={data.dictionary} />
			{/if}
			<button class="primary" type="submit"><span>Search</span></button>
		</form>
		<div class="box rgap8 ptop16">
			<p class="txt-xs tt-u w500 grey2">Dictionary</p>
			<ResponsiveMenu>
				<a class="selection-button" class:active={!data.dictionary} href={dictionaryHref(null)}>All</a>
				<a class="selection-button" class:active={data.dictionary === 'apte'} href={dictionaryHref('apte')}>Apte</a>
				<a class="selection-button" class:active={data.dictionary === 'mw'} href={dictionaryHref('mw')}>Monier-Williams</a>
			</ResponsiveMenu>
		</div>
	</section>
	<section class="wrapper-std growingline alternate">
		<div class="box rgap16">
			<p class="txt-sm grey2">{data.slice.totalItems} words · page {data.slice.page} of {data.slice.totalPages}</p>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap16">
				{#each data.slice.items as word}
					<a class="blank box rgap8 tight-pad whitestone b-main" href={`/library/sections/words/${word.slug}`}>
						<p class="txt-xs tt-u w500 theme">{word.dictionaries.join(' + ')}</p>
						<p class="txt-xl w600 a-hover">{word.headword}</p>
						<div class="box rgap4">
							{#each word.previewLines as line}
								<p class="grey2">{line}</p>
							{/each}
						</div>
						{#if word.dhatuSlugs.length}
							<p class="txt-xs tt-u w500 grey2">{word.dhatuSlugs.length} dhātu link{word.dhatuSlugs.length === 1 ? '' : 's'}</p>
						{/if}
					</a>
				{/each}
			</div>
			<div class="row wrap cgap8 rgap8">
				{#if data.slice.page > 1}
					<a class="primary grey" href={pageHref(data.slice.page - 1)}><span>Previous</span></a>
				{/if}
				{#if data.slice.page < data.slice.totalPages}
					<a class="primary" href={pageHref(data.slice.page + 1)}><span>Next</span></a>
				{/if}
			</div>
		</div>
	</section>
</Container>
