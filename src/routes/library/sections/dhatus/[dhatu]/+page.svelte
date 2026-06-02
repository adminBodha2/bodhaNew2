<script lang="ts">
	import type { PageData } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import { absoluteImage, absoluteUrl, stringifyJsonLd, webPageJsonLd } from '$lib/utils/seo';

	let { data }: { data: PageData } = $props();

	let title = $derived(`√${data.dhatu.rootIast} | Dhātupāṭha`);
	let metaDescription = $derived(`Dhātupāṭha root √${data.dhatu.rootIast}: ${data.dhatu.meaningIast}.`);
	let metaUrl = $derived(absoluteUrl(`/library/sections/dhatus/${data.dhatu.slug}`));
	const metaImage = absoluteImage('/images/sitemaster/list-dhatu-word-meanings.png');
	let jsonld = $derived(stringifyJsonLd(
		webPageJsonLd({
			name: title,
			description: metaDescription,
			url: metaUrl,
			image: metaImage,
			type: 'WebPage'
		})
	));
</script>

<Head {title} {metaDescription} {metaImage} {metaUrl} imWidth="1600" imHeight="1000" {jsonld} />

<Container>
	<section class="wrapper-std">
		<Crumb showT={true} title={`√${data.dhatu.rootIast}`} showD={true} desc={data.dhatu.meaningIast} fullP={true} />
		<div class="box rgap24">
			<div class="box rgap8 std-pad whitestone b-main">
				<p class="txt-xs tt-u w500 theme">Gaṇa {data.dhatu.gana} · {data.dhatu.ganaName} · {data.dhatu.id}</p>
				<h1 class="txt-2xl lg:txt-4xl w600">√{data.dhatu.rootIast}</h1>
				<p class="highlight-text">{data.dhatu.meaningIast}</p>
				<p class="grey2">{data.dhatu.root} · {data.dhatu.meaning}</p>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 gap16">
				<a class="blank box rgap8 tight-pad whitestone b-main" href={data.dhatu.sourceUrl} target="_blank" rel="noreferrer">
					<p class="txt-lg w500 a-hover">Open source table</p>
					<p class="grey2">{data.dhatu.source}</p>
				</a>
				<div class="box rgap8 tight-pad whitestone b-main">
					<p class="txt-lg w500">Words from this dhātu</p>
					<p class="grey2">{data.derivedWordCount} dictionary-linked words using source citations and guṇa/vṛddhi stem signals.</p>
				</div>
			</div>
			{#if data.derivedWordCount}
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
			{/if}
			{#if data.relatedRules.length}
				<div class="box rgap8">
					<p class="txt-xs tt-u w500 grey2">Related rules</p>
					<div class="grid grid-cols-1 md:grid-cols-2 gap16">
						{#each data.relatedRules as rule}
							<a class="blank box rgap8 tight-pad whitestone b-main" href={`/library/sections/ashtadhyayi/${rule.id}`}>
								<p class="txt-xs tt-u w500 theme">{rule.id}</p>
								<p class="txt-lg w500 a-hover">{rule.transliteration}</p>
							</a>
						{/each}
					</div>
				</div>
			{/if}
			<div class="row wrap cgap8 rgap8">
				{#if data.neighbors.previous}
					<a class="primary grey" href={`/library/sections/dhatus/${data.neighbors.previous.slug}`}><span>√{data.neighbors.previous.rootIast}</span></a>
				{/if}
				<a class="primary" href="/library/sections/dhatus"><span>All Dhātus</span></a>
				{#if data.neighbors.next}
					<a class="primary grey" href={`/library/sections/dhatus/${data.neighbors.next.slug}`}><span>√{data.neighbors.next.rootIast}</span></a>
				{/if}
			</div>
		</div>
	</section>
</Container>
