<script lang="ts">
	import type { PageData } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Parallax from '$lib/comps/parallaxhalf.svelte';
	import Title from '$lib/comps/page-title.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import WikiGraph from '$lib/comps/wikigraph.svelte';
	import { absoluteImage, absoluteUrl } from '$lib/utils/seo';

	let { data }: { data: PageData } = $props();

	const title = 'Knowledge Wiki | Bodha';
	const metaDescription = 'An interactive map of the Bodha knowledge base — thinkers, schools, questions, wiki pages, and research nodes, connected by the relationships between them.';
	const metaUrl = absoluteUrl('/wiki');
	const metaImage = absoluteImage('/images/heroes/key-wiki.webp');
</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="2560" imHeight="1440" />

	<Parallax imageLink="/images/heroes/key-wiki.webp" wipe={true} />
<Container>
<Crumb showT={true} title="Bodha Knowledge Wiki" showD={true} desc="An interactive map of the Bodha knowledge base. Nodes are thinkers, schools, questions, wiki pages, and research projects. Edges show how they connect — who draws on whom, what addresses what, which schools a thinker belongs to." />
	<section class="wrapper-std">
		<div class="grid grid-cols-1 lg:grid-cols-2 cgap64 rgap16">
			<div class="box rgap16">
				<p class="highlight-text">At Bodha, we're nerds about archives, knowledge bases, wikis, and repositories. Our ambition is to create a platform for discovery, learning, and research of all things itihasa, Bharata, Dharma, and the Indian Knowledge Systems (IKS).</p>
			</div>
			<div class="box rgap16">
				<p class="highlight-text">To this end, the Bodha knowledge wiki is an information and data architecture that facilitates discovery paths for the curious and interested.</p>
				<p class="highlight-text">It is the central organizing point for - 1) all content at our website, and 2) all general internet content that we curate and list.</p>
			</div>
		</div>
		<div class="box rgap24 bordertop ptop32">
			<h2 class="txt-2xl w600">Understanding the Wiki</h2>
			<div class="grid grid-cols-1 lg:grid-cols-3 cgap64 rgap16">
				<div class="box rgap16 col-span-1">
					<p class="txt-lg">All content is group along two paths - type of content, and theme.</p>
					<p class="txt-lg"><span class="theme">Types:</span> essays/articles, books, thinkers, schools, questions, research. Of these, the final 4 groups classify content along Bodha's internal research work.</p>
					<p class="txt-lg"><span class="theme">Domains:</span> thematic classification used across the website.</p>
					<p class="txt-lg">Use the graph view below to explore, or navigate by structured pages. <span class="w600">Explore our repository of 200+ Hindu temples <a class="linkedlight" href="/wiki/temples">here.</a></span></p>
					<p class="txt-lg">Explore our <a class="linkedlight" href="/wiki/indian-knowledge-systems-and-education">IKS publications repository.</a></p>
				</div>
				<div class="box rgap16 col-span-2">
					<div class="grid grid-cols-1 lg:grid-cols-2 white-grid">
						{#each data.domains as domain}
							<a href="/wiki/{domain.slug}" class="blank box whitestone p16 rgap8">
								<p class="txt-lg w600">{domain.title}</p>
								<p class="grey1">{domain.description}</p>
							</a>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</section>
	<section class="wrapper-std growingline">
		<Title text="Graph View" />
		<WikiGraph nodes={data.nodes} edges={data.edges} />
	</section>
</Container>
