<script lang="ts">
	import type { PageData } from './$types';
	import Container from '$lib/comps/container.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import { metaTitle, metaDescription, metaUrl, metaImage } from '$lib/utils/metastores'

	export let data: PageData;
	$metaTitle = 'Explore Concepts and Ideas at Bodha'
  $metaDescription = 'Entry point for our knowledge base and wiki.'
  $metaUrl = 'https://www.bodharesearch.in/concept'
  $metaImage = '/images/bodhacover.png'

	// Separate Amarakosha varga concepts from regular concepts
	$: akVargas   = data.concepts.filter((c: any) => c.slug.startsWith('ak-'));
	$: regular    = data.concepts.filter((c: any) => !c.slug.startsWith('ak-') && c.count > 1);
	$: totalCount = data.concepts.length;
</script>

<Head title={$metaTitle} metaDescription={$metaDescription} metaUrl={$metaUrl} metaImage={$metaImage}></Head>

<Container narrow={true} scaled={true}>
<div class="box-t">
	<div class="hero">
		<p class="eyebrow tt-u"><a class="linkonhover" href="/">Bodha Research</a></p>
		<h1 class="hero-title source-serif">Concepts</h1>
		<p class="hero-sub">Domains of thought across the knowledge system. Each concept connects texts, thinkers, and ideas.</p>
		<div class="hero-meta row ycenter cgap12">
			<span class="count-pill">{totalCount} concepts</span>
			<span class="divider-dot">·</span>
			<span class="meta-hint">Sorted by connections</span>
		</div>
	</div>

	{#if akVargas.length > 0}
	<div class="section-block">
		<div class="section-head">
			<p class="eyebrow tt-u">Amarakośa Domains — {akVargas.length}</p>
			<p class="section-desc">The 24 semantic domains of the Amarakośa, mapped to this knowledge system.</p>
		</div>
		<div class="ak-grid">
			{#each akVargas as concept}
				<a class="ak-card blank" href="/concept/{concept.slug}">
					<span class="ak-devanagari">{concept.meta?.devanagari ?? ''}</span>
					<span class="ak-label">{concept.title.replace(/^.+ — /, '')}</span>
					{#if concept.meta?.wordCount}
						<span class="ak-count">{concept.meta.wordCount} words</span>
					{/if}
				</a>
			{/each}
		</div>
	</div>
	{/if}

	<div class="section-block">
		<div class="section-head">
			<p class="eyebrow tt-u">All Concepts — {regular.length}</p>
		</div>
		<div class="concept-grid">
			{#each regular as concept}
				<a class="concept-pill blank" href="/concept/{concept.slug}">
					<span class="pill-title">{concept.title}</span>
					<span class="pill-count">{concept.count}</span>
				</a>
			{/each}
		</div>
	</div>

</div>
</Container>

<style lang="sass">

.hero-sub
	max-width: 56ch

// ── SECTIONS ───────────────────────────────────────────────

.section-head
	display: flex
	flex-direction: column
	gap: 0.2rem

.section-desc
	font-size: 0.8rem
	color: #ACACAC

// ── AMARAKOSHA CARDS ───────────────────────────────────────

.ak-grid
	display: grid
	gap: 6px
	grid-template-columns: repeat(auto-fill, minmax(180px, 1fr))

.ak-card
	display: flex
	flex-direction: column
	gap: 2px
	padding: 0.7rem 0.9rem
	border-radius: 8px
	border: 1px solid rgba(116,192,252,0.25)
	background: rgba(116,192,252,0.06)
	box-shadow: var(--sh2)
	transition: box-shadow 0.15s ease, transform 0.15s ease
	&:hover
		box-shadow: 0 2px 8px rgba(116,192,252,0.2), 0 4px 12px rgba(0,0,0,0.04)
		transform: translateY(-1px)

.ak-devanagari
	font-size: 0.75rem
	color: #74C0FC
	font-family: var(--fontface-serif)
	opacity: 0.8
	line-height: 1.3

.ak-label
	font-size: 0.78rem
	font-weight: 500
	color: #222
	line-height: 1.3

.ak-count
	font-size: 0.68rem
	color: var(--text-ghost)
	margin-top: 2px

// ── CONCEPT PILLS ──────────────────────────────────────────

.concept-grid
	display: flex
	flex-wrap: wrap
	gap: 5px

.concept-pill
	display: inline-flex
	align-items: center
	gap: 6px
	padding: 4px 10px
	border-radius: 100px
	border: 1px solid rgba(0,0,0,0.09)
	background: #F9F8F6
	transition: all 0.15s ease
	&:hover
		border-color: rgba(25,113,194,0.3)
		background: rgba(25,113,194,0.05)
		.pill-title
			color: var(--theme)

.pill-title
	font-size: 0.75rem
	font-weight: 500
	color: #444
	line-height: 1

.pill-count
	font-size: 0.65rem
	font-weight: 600
	color: var(--text-ghost)
	line-height: 1

</style>
