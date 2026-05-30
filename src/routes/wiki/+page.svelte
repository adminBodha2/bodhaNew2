<script lang="ts">
	import type { PageData } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Parallax from '$lib/comps/parallaxhalf.svelte';
	import Title from '$lib/comps/page-title.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Reveal from '$lib/svelteanim/components/Reveal.svelte';
	import Slide from '$lib/svelteanim/components/Slide2.svelte';
	import Cut from '$lib/svelteanim/components/Cut.svelte';
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
<Crumb showT={true} title="Bodha Knowledge Base" showD={true} desc="An interactive map of the Bodha knowledge base. Nodes are thinkers, schools, questions, wiki pages, and research projects. Edges show how they connect — who draws on whom, what addresses what, which schools a thinker belongs to." />
	<section class="wrapper-std">
		<div class="grid grid-cols-1 lg:grid-cols-2 cgap64 rgap16">
			<div class="box rgap16">
				<Reveal>
					<p class="highlight-text">At Bodha, we're nerds about archives, knowledge bases, wikis, and repositories. Our ambition is to create a platform for discovery, learning, and research of all things itihasa, Bharata, Dharma, and the Indian Knowledge Systems (IKS).</p>
				</Reveal>
			</div>
			<div class="box rgap16">
				<Reveal start="top 70%">
				<p class="highlight-text">To this end, the Bodha knowledge wiki is an information and data architecture that facilitates discovery paths for the curious and interested.</p>
				</Reveal>
				<Reveal start="top 70%">
				<p class="highlight-text">It is the central organizing point for - 1) all content at our website, and 2) all general internet content that we curate and list.</p>
				</Reveal>
			</div>
		</div>
		<Cut start="top 70%" end="bottom 20%" class=".cut-item">
		<div class="grid grid-cols-1 lg:grid-cols-4 gap16">
			<a class="box std-pad rgap8 whitestone cut-item" href="/wiki/domains">
				<p class="txt-xl w600 a-hover">Explore by Domains</p>
				<p class="grey2">Domains are thematic supergroups used to organize content across the website.</p>
			</a>
			<a class="box std-pad rgap16 stonecard cut-item" href="#graph-section" onclick={(e) => { e.preventDefault(); document.getElementById("graph-section")?.scrollIntoView({ behavior: 'smooth' }); }}>
				<p class="txt-xl w600">View Graph</p>
				<p class="grey2">The wiki visualized in graphs and nodes.</p>
			</a>
			<a class="box std-pad rgap16 stonecard cut-item" href="/wiki/temples">
				<p class="txt-xl w600 a-hover">Temples Repository</p>
				<p class="grey2">300+ and growing registry of Hindu temples across India, major deities, and architecture.</p>
			</a>
			<a class="box std-pad rgap16 stonecard cut-item" href="/wiki/indian-knowledge-systems-and-education">
				<p class="txt-xl w600">IKS Wiki</p>
				<p class="grey2">Search through IKS journals repository, updated monthly.</p>
			</a>
		</div>
		</Cut>
	</section>
	<section class="wrapper-std growingline alternate">
		<Title text="Domains"/>
		<Slide targetSelector=".slide-item2" end="bottom 40%" duration={400}>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap16">
				{#each data.domains as domain}
					<a href="/wiki/{domain.slug}" class="whitestone rgap16 blank box slide-item2 std-pad b-main">
						<p class="txt-2xl w600">{domain.title}</p>
						<p class="grey1">{domain.description}</p>
						<div>
							<p class="txt-xs tt-u w500" style="color: {domain.color}">{domain.count}</p>
						<p class="txt-00 grey2 w600">connections</p>
						</div>
					</a>
				{/each}
			</div>
		</Slide>
	</section>
	<section class="wrapper-std growingline" id="graph-section">
		<Title text="Graph View" />
		<WikiGraph nodes={data.nodes} edges={data.edges} />
	</section>
</Container>

<style lang="sass">

.cut-item
	transition: all 90ms cubic-bezier(0, 0, 0.58, 1)
	&:hover
		box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 3px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px

</style>