<script lang="ts">
	import type { PageData } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import { absoluteImage, absoluteUrl, stringifyJsonLd, webPageJsonLd } from '$lib/utils/seo';

	let { data }: { data: PageData } = $props();

	let title = $derived(`${data.rule.id} | Aṣṭādhyāyī`);
	let metaDescription = $derived(data.rule.english || `${data.rule.transliteration} — Aṣṭādhyāyī ${data.rule.id}.`);
	let metaUrl = $derived(absoluteUrl(`/library/sections/ashtadhyayi/${data.rule.id}`));
	const metaImage = absoluteImage('/images/sitemaster/ashtadhyayi-item.png');
	let jsonld = $derived(stringifyJsonLd(
		webPageJsonLd({
			name: title,
			description: metaDescription,
			url: metaUrl,
			image: metaImage,
			type: 'WebPage'
		})
	));
	let explainerParagraphs = $derived(formatExplainerParagraphs(data.rule.explainer));

	function linkRuleReferences(value: string) {
		return value.replace(
			/\[\[(\d+\.\d+\.\d+)\]\]/g,
			'<a href="/library/sections/ashtadhyayi/$1">$1</a>'
		);
	}

	function formatExplainerParagraphs(value: string) {
		return value
			.replace(/\\n/g, '\n')
			.split(/\n{2,}/)
			.map((paragraph) => linkRuleReferences(paragraph.trim()).replace(/\n/g, '<br>'))
			.filter(Boolean);
	}
</script>

<Head {title} {metaDescription} {metaImage} {metaUrl} imWidth="1600" imHeight="1000" {jsonld} />

<Container>
	<section class="wrapper-std tight-stack">
		<Crumb libraryType={true} hindiTitle={true} isSolo={true} showT={true} title={data.rule.text} showD={true} desc="Adhyāya {data.rule.adhyaya} · Pāda {data.rule.pada} · Rule {data.rule.number}" fullP={true} />
		<div class="docgrid inverted">
			<aside class="docside">
				<div class="doclist">
					<div class="box rgap8">
						<p class="txt-lg grey2">{data.rule.transliteration}{#if data.rule.theme} | {data.rule.theme}{/if}</p>
						<p class="txt-lg grey2">padaccheda - {data.rule.padacheda}</p>
					</div>
					<div class="row wrap cgap8 rgap8 sidebar-second">
						{#if data.neighbors.previous}
							<a class="small-button plain" href={`/library/sections/ashtadhyayi/${data.neighbors.previous.id}`}><span>{data.neighbors.previous.id}</span></a>
						{/if}
						<a class="small-button plain" href="/library/sections/ashtadhyayi"><span>All Rules</span></a>
						{#if data.neighbors.next}
							<a class="small-button plain" href={`/library/sections/ashtadhyayi/${data.neighbors.next.id}`}><span>{data.neighbors.next.id}</span></a>
						{/if}
					</div>
					<div class="box sidebar-third gap8">
						<a class="linkonhover row gap8" href={data.rule.sanskritDictionaryUrl} target="_blank" rel="noreferrer">Panini Research Tool <div class="arrow">→</div></a>
						<a class="linkonhover row gap8" href={data.rule.sanskritDocumentsUrl} target="_blank" rel="noreferrer">Detailed Commentary <div class="arrow">→</div></a>
					</div>
				</div>
			</aside>
			<div class="docmain">
				<article class="classic-document">
					<div class="box std-pad b-main stonecard mbot32">
						{#if data.rule.english}
							<p class="txt-xl mbot0">{data.rule.english}</p>
						{/if}
					</div>
			{#if data.rule.explainer}
						{#each explainerParagraphs as paragraph}
							<p>{@html paragraph}</p>
						{/each}
			{/if}
				</article>
			</div>
		</div>
	</section>
</Container>

<style lang="sass">

.sidebar-second
	padding-top: 2rem
	border-top: var(--border-main)
	margin-top: 2rem
	margin-bottom: 1rem
	@media (min-width: 1025px)
		padding-top: 2rem
		border-top: var(--border-main)
		margin-top: 2rem
		margin-bottom: 1rem

</style>
