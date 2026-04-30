<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/state';
	import autoAnimate from '@formkit/auto-animate';
	import Container from '$lib/comps/container.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import { absoluteImage, absoluteUrl, collectionPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';

	let { data }: { data: PageData } = $props();

	let selectedKind = $state('all');

	let title = $derived(data.tagTitle + ' | Bodha Tags');
	let metaDescription = $derived('Explore all content related to ' + data.tagTitle + ' at Bodha.');
	let metaUrl = $derived(absoluteUrl(page.url.pathname));
	const metaImage = absoluteImage('/images/bodhacover.png');
	let jsonld = $derived(
		stringifyJsonLd(
			collectionPageJsonLd({
				name: title,
				description: metaDescription,
				url: metaUrl,
				image: metaImage,
				items: data.articles.map((article: any) => ({
					name: article.title,
					description: article.description,
					url: article.route
				}))
			})
		)
	);

	function toggleKind(newKind: string) {
		selectedKind = newKind;
	}
</script>

<Head
	{title}
	{metaDescription}
	{metaImage}
	{metaUrl}
	imWidth="2560"
	imHeight="1440"
	{jsonld}
/>

<Container narrow={true} scaled={true}>
	<div class="box std padded-ontop">
		<Crumb rgap={16} item1="Tags" item1Link="/tags" showT={true} title={data.tagTitle} showRow={true}>
				<div class="row cgap8 rgap8 wrap">
					<button class="nav-btn" class:active={selectedKind === 'all'} onclick={() => toggleKind('all')}>All</button>
					<button class="nav-btn" class:active={selectedKind === 'article'} onclick={() => toggleKind('article')}>Essays</button>
					<button class="nav-btn" class:active={selectedKind === 'external-article'} onclick={() => toggleKind('external-article')}>External Posts</button>
					<button class="nav-btn" class:active={selectedKind === 'research'} onclick={() => toggleKind('research')}>Research</button>
					<button class="nav-btn" class:active={selectedKind === 'big question'} onclick={() => toggleKind('big question')}>Big Questions</button>
					<button class="nav-btn" class:active={selectedKind === 'school'} onclick={() => toggleKind('school')}>Schools</button>
					<button class="nav-btn" class:active={selectedKind === 'thinker'} onclick={() => toggleKind('thinker')}>Thinkers</button>
				</div>
		</Crumb>
		<div class="grid four white-grid" use:autoAnimate>
			{#each data.articles as article}
				{#if article.kind === selectedKind && selectedKind !== 'all'}
						<div class="labelbox card-padded">
							{#if selectedKind === 'external-article'}
								<p class="w500 tight"><a class="blank linker" target="_blank" rel="noreferrer" href={article.route}>{article.title}</a></p>
							{:else}
								<p class="w500 tight"><a class="blank linker" href={article.route}>{article.title}</a></p>
							{/if}
							<p class="grey descriptor-text">{article.description}</p>
						</div>
		
				{:else if selectedKind === 'all'}
						<div class="labelbox card-padded">
							{#if article.kind === 'external-article'}
								<p class="w500 tight"><a class="blank linker" target="_blank" rel="noreferrer" href={article.route}>{article.title}</a></p>
							{:else}
								<p class="w500 tight"><a class="blank linker" href={article.route}>{article.title}</a></p>
							{/if}
							<p class="grey descriptor-text">{article.description}</p>
							<p class="citation-big blue tt-u">{article.kind}</p>
						</div>
				{/if}
			{/each}
		</div>
	</div>
</Container>

<style lang="sass">

.labelbox.card-padded
	background: var(--color-back)

.padded-ontop
	min-height: calc(100vh - 160px)

</style>
