<script lang="ts">
	import { page } from '$app/state';
	import { browser } from '$app/environment';
	import type { PageData } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Parallax from '$lib/comps/parallaxhalf.svelte';
	import Reveal from '$lib/svelteanim/components/Reveal.svelte';
	import PDFReader from '$lib/comps/pdfreader.svelte';
	import { iW } from '$lib/utils/globalstores';
	import { absoluteUrl, absoluteImage, articleJsonLd, stringifyJsonLd } from '$lib/utils/seo';

	let { data }: { data: PageData } = $props();

	const LANG_KEY = 'aryavarta_lang_pref';
	let showHindi = $state(browser ? localStorage.getItem(LANG_KEY) === 'hi' : false);

	function toggleLanguage() {
		showHindi = !showHindi;
		if (browser) localStorage.setItem(LANG_KEY, showHindi ? 'hi' : 'en');
	}

	const pdfSrc = $derived(showHindi && data.pdfhindi ? data.pdfhindi : data.pdflink);
	let title = $derived(`${data.title} | Scrolls of Aryavarta`);
	let metaDescription = $derived(data.description);
	let metaUrl = $derived(absoluteUrl(page.url.pathname));
	let metaImage = $derived(absoluteImage(data.image));
	let jsonld = $derived(
		stringifyJsonLd(
			articleJsonLd({
				headline: data.title,
				description: metaDescription,
				url: metaUrl,
				image: metaImage,
				datePublished: data.date,
				section: 'Scrolls of Aryavarta'
			})
		)
	);
</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} ogType="article" {jsonld} />

	<Parallax imageLink={data.image} wipe={true} />
<Container>
		<Crumb showT={true} title={data.title} showD={true} desc={data.description} showRow={true}>
			<div class="box">
				<p class="grey">Vol. {data.volume}, Issue {data.issue} | {data.date}</p>
			</div>
		</Crumb>
	<section class="wrapper-std">
		<div class="width70 content-highlights">
			<Reveal>
				<data.content />
			</Reveal>
			<Reveal>
				<p class="highlight-text ptop16 pbot16">To receive the fortnightly issues in your email inbox, please <a href="/members" class="linked">subscribe.</a></p>
			</Reveal>
			{#if data.id > 1 && data.pdfhindi}
			<div class="row cgap16">
				<button class="main-btn" class:active={!showHindi} onclick={() => showHindi && toggleLanguage()}>Read in English</button>
				<button class="main-btn" class:active={showHindi} onclick={() => !showHindi && toggleLanguage()}>हिंदी में पढ़ें</button>
			</div>
			{/if}
		</div>
		<div class="pdf-reader">
			<PDFReader src={pdfSrc} title={data.title} height="82vh" doubleSpread={!$iW} />
		</div>
	</section>
</Container>

<style lang="sass">

.main-btn
	padding: 0.4rem 1rem
	border: var(--border-dark)
	border-radius: 4px
	background: var(--color-stone-3)
	font-size: 0.9rem
	cursor: pointer
	color: var(--color-primary)
	transition: background 0.15s, color 0.15s
	&:hover
		background: var(--color-theme)
		color: #FFFFFF
	&.active
		background: var(--color-theme-dark)
		color: var(--color-back)
		border-color: var(--color-theme-dark)
</style>
