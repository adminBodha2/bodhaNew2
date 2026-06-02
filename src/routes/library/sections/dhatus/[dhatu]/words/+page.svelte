<script lang="ts">
	import type { PageData } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import { absoluteImage, absoluteUrl, collectionPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';

	let { data }: { data: PageData } = $props();

	let title = $derived(`Words From √${data.dhatu.rootIast} | Synaptic`);
	let metaDescription = $derived(`Dictionary-linked Sanskrit words related to Dhātupāṭha root √${data.dhatu.rootIast}.`);
	let metaUrl = $derived(absoluteUrl(`/library/sections/dhatus/${data.dhatu.slug}/words`));
	const metaImage = absoluteImage('/images/sitemaster/list-dhatu-words.png');
	let jsonld = $derived(stringifyJsonLd(
		collectionPageJsonLd({
			name: title,
			description: metaDescription,
			url: metaUrl,
			image: metaImage,
			items: data.wordGroups.flatMap((group) => group.words).map((word) => ({
				name: word.headword,
				description: word.preview,
				url: absoluteUrl(`/library/sections/words/${word.slug}`)
			}))
		})
	));

	function pageHref(page: number) {
		const params = new URLSearchParams();
		if (data.query) params.set('q', data.query);
		params.set('page', String(page));
		return `/library/sections/dhatus/${data.dhatu.slug}/words?${params.toString()}`;
	}
</script>

<Head {title} {metaDescription} {metaImage} {metaUrl} imWidth="1600" imHeight="1000" {jsonld} />

<Container>
	<section class="wrapper-std">
		<Crumb showT={true} title={`Words from √${data.dhatu.rootIast}`} showD={true} desc={metaDescription} fullP={true} />
		<form class="box rgap16" method="GET">
			<input type="search" name="q" value={data.query} placeholder="Search linked words or meanings" />
			<button class="primary" type="submit"><span>Search</span></button>
		</form>
	</section>
	<section class="wrapper-std growingline alternate">
		<div class="box rgap16">
			<p class="txt-sm grey2">{data.slice.totalItems} words · page {data.slice.page} of {data.slice.totalPages}</p>
			<div class="box rgap16 std-pad whitestone b-main">
				<div class="grid grid-cols-1 md:grid-cols-5 gap16">
					<p class="txt-sm w600">Root Word</p>
					<p class="txt-sm w600 md:col-span-2">Meaning</p>
					<p class="txt-sm w600">Class</p>
					<p class="txt-sm w600">Source</p>
					<p class="theme">√{data.dhatu.rootIast}</p>
					<p class="md:col-span-2">{data.dhatu.meaningIast}</p>
					<p>{data.dhatu.gana}</p>
					<a href={data.dhatu.sourceUrl} target="_blank" rel="noreferrer">Dhātupāṭha</a>
				</div>
				<div class="box rgap16 tight-pad b-main">
					<p class="txt-sm w600">Exploring Root: √{data.dhatu.rootIast}</p>
					<div class="grid grid-cols-1 md:grid-cols-3 gap16">
						{#each data.wordGroups as group}
							<div class="box rgap8">
								<p class="txt-sm w600">{group.title}</p>
								{#if group.words.length}
									{#each group.words as word}
										<details class="box rgap4">
											<summary class="theme w500">{word.headword}</summary>
											<div class="box rgap4">
												{#each word.meaningLines as line}
													<p class="txt-sm lh14">{line}</p>
												{/each}
											</div>
											<p class="txt-xs tt-u w500 grey2">{word.basis}</p>
											<a class="txt-sm" href={`/library/sections/words/${word.slug}`}>Open meaning</a>
										</details>
									{/each}
								{:else}
									<p class="txt-sm grey2">No linked words in this group yet.</p>
								{/if}
							</div>
						{/each}
					</div>
				</div>
			</div>
			<div class="row wrap cgap8 rgap8">
				{#if data.slice.page > 1}
					<a class="primary grey" href={pageHref(data.slice.page - 1)}><span>Previous</span></a>
				{/if}
				<a class="primary" href={`/library/sections/dhatus/${data.dhatu.slug}`}><span>Back to √{data.dhatu.rootIast}</span></a>
				{#if data.slice.page < data.slice.totalPages}
					<a class="primary" href={pageHref(data.slice.page + 1)}><span>Next</span></a>
				{/if}
			</div>
		</div>
	</section>
</Container>
