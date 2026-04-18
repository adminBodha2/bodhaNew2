<script lang="ts">
	import type { PageData } from './$types';
	import Container from '$lib/comps/container.svelte';
	import NodeMiniCard from '$lib/nodeitems/NodeMiniCard.svelte';
	import Head from '$lib/comps/headcomponent.svelte';

	export let data: PageData;

	const grouped  = data.grouped;
	const description = data.concept.description || `Texts, thinkers, and ideas connected to ${data.concept.title}.`;
	const isAK = data.concept.slug.startsWith('ak-');

	const sections = [
		{ label: 'Articles',  nodes: grouped.articles  },
		{ label: 'Books',     nodes: grouped.texts      },
		{ label: 'Thinkers',  nodes: grouped.thinkers   },
		{ label: 'Schools',   nodes: grouped.schools    },
		{ label: 'Questions', nodes: grouped.questions  },
	].filter(s => s.nodes.length > 0);

	$: totalContent = sections.reduce((s, g) => s + g.nodes.length, 0);
</script>

<Head
	title="{data.concept.title} — Bodha Concepts"
	metaDescription={description}
	metaUrl="https://www.bodharesearch.in/concept/{data.concept.slug}"
	metaImage = "/images/bodhacover.png"
/>

<Container narrow={true} scaled={true}>
<div class="box-t">

	<div class="page-hero">
		<p class="eyebrow tt-u"><a class="linkonhover" href="/concept">← Concepts</a></p>

		<div class="row ycenter cgap8">
			{#if isAK}
				<span class="ak-badge tt-u">Amarakośa Domain</span>
			{:else}
				<span class="concept-badge tt-u">Concept</span>
			{/if}
			{#if totalContent > 0}
				<span class="meta-hint">{totalContent} connected items</span>
			{/if}
		</div>

		<h1 class="hero-title source-serif">{data.concept.title}</h1>

		{#if isAK && data.concept.meta?.devanagari}
			<div class="ak-meta row ycenter cgap12">
				<span class="ak-devanagari">{data.concept.meta.devanagari}</span>
				<span class="ak-divider">·</span>
				<span class="ak-iast">{data.concept.meta.iast}</span>
				{#if data.concept.meta?.wordCount}
					<span class="ak-wordcount">{data.concept.meta.wordCount} words in Amarakośa</span>
				{/if}
			</div>
		{/if}

		{#if description}
			<p class="hero-sub">{description}</p>
		{/if}
	</div>

	{#if data.relatedConcepts && data.relatedConcepts.length > 0}
	<div class="section-block">
		<p class="eyebrow tt-u">Related Concepts — {data.relatedConcepts.length}</p>
		<div class="mini-grid">
			{#each data.relatedConcepts as node (node.id)}
				<NodeMiniCard {node} />
			{/each}
		</div>
	</div>
	{/if}

	{#each sections as section}
	<div class="section-block">
		<p class="eyebrow tt-u">{section.label} — {section.nodes.length}</p>
		<div class="mini-grid">
			{#each section.nodes as node (node.id)}
				<NodeMiniCard {node} />
			{/each}
		</div>
	</div>
	{/each}

	{#if sections.length === 0 && (!data.relatedConcepts || data.relatedConcepts.length === 0)}
	<div class="empty-state">
		<p class="eyebrow tt-u">No connected content yet</p>
	</div>
	{/if}

</div>
</Container>

<style lang="sass">

.concept-badge
	font-size: 9px
	font-weight: 700
	letter-spacing: 0.1em
	padding: 3px 10px
	border-radius: 100px
	border: 1px solid rgba(116,192,252,0.3)
	background: rgba(116,192,252,0.09)
	color: #4C9BE8

.ak-badge
	font-size: 9px
	font-weight: 700
	letter-spacing: 0.1em
	padding: 3px 10px
	border-radius: 100px
	border: 1px solid rgba(116,192,252,0.4)
	background: rgba(116,192,252,0.12)
	color: #1971C2

.hero-sub
	max-width: 60ch

// ── AMARAKOSHA META ────────────────────────────────────────

.ak-meta
	flex-wrap: wrap

.ak-devanagari
	font-size: 1rem
	font-family: var(--fontface-serif)
	color: #74C0FC

.ak-divider
	color: #DDD

.ak-iast
	font-size: 0.82rem
	color: #ACACAC
	font-style: italic

.ak-wordcount
	font-size: 0.72rem
	color: var(--text-ghost)
	padding: 2px 8px
	border-radius: 100px
	border: 1px solid rgba(0,0,0,0.07)
	background: #F9F8F6

// ── SECTIONS ───────────────────────────────────────────────

.empty-state
	padding-top: 3rem
	text-align: center

</style>
