<script lang="ts">
	import type { PageData } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import { absoluteImage, absoluteUrl, stringifyJsonLd, webPageJsonLd } from '$lib/utils/seo';

	let { data }: { data: PageData } = $props();

	let title = $derived(`${data.word.headword} | Synaptic Dictionary`);
	let metaDescription = $derived(`Dictionary meanings for ${data.word.headword} from Apte and Monier-Williams.`);
	let metaUrl = $derived(absoluteUrl(`/library/sections/words/${data.word.slug}`));
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
		<Crumb showT={true} title={data.word.headword} showD={true} desc={metaDescription} fullP={true} />
		<div class="box rgap24">
			<div class="box rgap8 std-pad whitestone b-main">
				<p class="txt-xs tt-u w500 theme">{data.word.dictionaries.join(' + ')}</p>
				<h1 class="txt-2xl lg:txt-4xl w600">{data.word.headword}</h1>
				<p class="grey2">Normalized lookup: {data.word.normalized}</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 gap16">
				{#each data.entries as entry}
					<article class="box rgap8 tight-pad whitestone b-main">
						<p class="txt-xs tt-u w500 theme">{entry.dictionaryLabel}</p>
						<div class="box rgap4">
							{#each entry.meaningLines as line}
								<p class="lh14">{line}</p>
							{/each}
						</div>
						<a class="txt-sm w500" href={entry.sourceUrl} target="_blank" rel="noreferrer">Source entry</a>
					</article>
				{/each}
			</div>

			{#if data.dhatuLinks.length}
				<div class="box rgap8">
					<p class="txt-xs tt-u w500 grey2">Dhātu links</p>
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap16">
						{#each data.dhatuLinks as link}
							<a class="blank box rgap8 tight-pad whitestone b-main" href={`/library/sections/dhatus/${link.dhatuSlug}`}>
								<p class="txt-xs tt-u w500 theme">Gaṇa {link.gana}</p>
								<p class="txt-xl w600 a-hover">√{link.rootIast}</p>
								<p class="grey2">{link.basis}</p>
							</a>
						{/each}
					</div>
				</div>
			{/if}

			<div class="row wrap cgap8 rgap8">
				<a class="primary" href="/library/sections/words"><span>All Words</span></a>
			</div>
		</div>
	</section>
</Container>
