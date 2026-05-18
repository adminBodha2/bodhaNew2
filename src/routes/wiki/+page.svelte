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
	const metaImage = absoluteImage('/images/bodhacover.png');
</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="2560" imHeight="1440" />

<Container>
	<Parallax imageLink="/images/heroes/key-wiki.webp" wipe={true} />
	<section class="wrapper-std first-box">
		<Crumb showT={true} title="Bodha Knowledge Wiki" showD={true} desc="An interactive map of the Bodha knowledge base. Nodes are thinkers, schools, questions, wiki pages, and research projects. Edges show how they connect — who draws on whom, what addresses what, which schools a thinker belongs to." />
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
			<div class="grid grid-cols-1 lg:grid-cols-2 cgap64 rgap16">
				<div class="box rgap16">
					<p class="highlight-text">All content is group along two paths - type of content, and theme.</p>
					<p class="highlight-text"><span class="theme">Types:</span> essays/articles, books, thinkers, schools, questions, research. Of these, the final 4 groups classify content along Bodha's internal research work.</p>
					<p class="highlight-text"><span class="theme">Domains:</span> thematic classification used across the website.</p>
					<p class="highlight-text">Use the graph view below to explore, or navigate by structured pages. <span class="w600">Explore our repository of 200+ Hindu temples <a class="linkedlight" href="/wiki/temples">here.</a></span></p>
					<p class="highlight-text">Explore our <a class="linkedlight" href="/wiki/iks-publications">IKS publications repository.</a></p>
				</div>
				<div class="box rgap16">
					<p class="highlight-text w600">Domains:</p>
					<p class="txt-lg lh15">
						Arts and Aesthetics<br />
						Civilizational Consciousness<br />
						Darshanas and Philosophy<br />
						Dharmashastra and Polity<br />
						Festivals and Living Tradition<br />
						History and Civilizational Recovery<br />
						Indology and Civilizational Critique<br />
						Indian Knowledge Systems<br />
						Language and Sanskrit<br />
						Puranas and Itihasa<br />
						Sacred Geography and Temples<br />
						Sindhu-Sarasvati and Origins<br />
						Shruti and the Vedic World
					</p>
				</div>
			</div>
		</div>
	</section>
	<section class="wrapper-std growingline">
		<Title text="Graph View" />
		<WikiGraph nodes={data.nodes} edges={data.edges} />
	</section>
</Container>
