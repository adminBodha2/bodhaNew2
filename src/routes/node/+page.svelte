<script lang="ts">
	import type { PageData } from './$types';
	import Container from '$lib/comps/container.svelte';
	import NodeMiniCard from '$lib/nodeitems/NodeMiniCard.svelte';
	import Head from '$lib/comps/headcomponent.svelte';

	export let data: PageData;

	const types = [
		{ key: 'articles',  label: 'Articles',  nodes: data.articles  },
		{ key: 'texts',     label: 'Books',     nodes: data.texts     },
		{ key: 'thinkers',  label: 'Thinkers',  nodes: data.thinkers  },
		{ key: 'schools',   label: 'Schools',   nodes: data.schools   },
		{ key: 'questions', label: 'Questions', nodes: data.questions },
	];

	let activeKey = 'articles';
	$: active = types.find(t => t.key === activeKey)!;
	$: total = types.reduce((s, t) => s + t.nodes.length, 0);
</script>

<Head
	title="Knowledge Library — Bodha"
	metaDescription="Explore articles, texts, thinkers, schools, and questions across the Bodha knowledge system."
	metaUrl="https://www.bodharesearch.in/node"
/>

<Container narrow={true} scaled={true}>
<div class="box padded-ontop only">

	<div class="page-hero">
		<p class="eyebrow tt-u"><a class="linkonhover" href="/">Bodha Research</a></p>
		<h1 class="hero-title source-serif">Knowledge Library</h1>
		<p class="hero-sub">Articles, books, thinkers, schools, and questions across the knowledge system.</p>
		<div class="hero-meta row ycenter cgap12">
			<span class="count-pill">{total} nodes</span>
			<span class="divider-dot">·</span>
			<span class="meta-hint">{types.length} types</span>
		</div>
	</div>

	<div class="type-filter row ycenter cgap8">
		{#each types as t}
			<button
				class="filter-btn blank tt-u"
				class:active={activeKey === t.key}
				on:click={() => activeKey = t.key}
			>
				{t.label}
				<span class="filter-count">{t.nodes.length}</span>
			</button>
		{/each}
	</div>

	<div class="section-block">
		<p class="eyebrow tt-u">{active.label} — {active.nodes.length}</p>
		<div class="mini-grid">
			{#each active.nodes as node (node.id)}
				<NodeMiniCard {node} />
			{/each}
		</div>
	</div>

</div>
</Container>

<style lang="sass">

.page-hero
	display: flex
	flex-direction: column
	gap: 0.75rem
	padding-bottom: 2.5rem
	border-bottom: 1px solid rgba(0,0,0,0.07)
	margin-bottom: 2rem

.hero-title
	font-size: clamp(2rem, 4vw, 3rem)
	font-weight: 400
	line-height: 1.1
	letter-spacing: -0.03em
	color: #111
	margin: 0

.hero-sub
	max-width: 56ch

.hero-meta
	margin-top: 0.25rem

// ── FILTER ─────────────────────────────────────────────────

.type-filter
	flex-wrap: wrap
	gap: 6px
	margin-bottom: 2rem

.filter-btn
	font-size: 9px
	font-weight: 700
	letter-spacing: 0.1em
	padding: 5px 12px
	border-radius: 100px
	border: 1px solid rgba(0,0,0,0.12)
	background: #FFFFFF
	color: #888
	cursor: pointer
	display: flex
	align-items: center
	gap: 6px
	transition: all 0.15s ease
	box-shadow: 0 1px 2px rgba(0,0,0,0.03)
	&:hover
		border-color: rgba(25,113,194,0.3)
		color: var(--theme)
	&.active
		background: var(--theme)
		border-color: var(--theme)
		color: #FFFFFF
		box-shadow: 0 2px 8px rgba(25,113,194,0.2)
		.filter-count
			color: rgba(255,255,255,0.7)

.filter-count
	font-size: 8px
	font-weight: 600
	color: #BCBCBC


</style>
