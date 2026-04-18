<script lang="ts">
	import type { PageData } from './$types';
	import type { Node } from '$lib/types/graph';
	import Container from '$lib/comps/container.svelte';
	import NodeMiniCard from '$lib/nodeitems/NodeMiniCard.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Debugger from '$lib/comps/debugger.svelte';
	import { metaDescription, metaTitle, metaImage, metaUrl } from '$lib/utils/metastores';

	export let data: PageData;
	$metaTitle="{data.node.title} — Bodha"
	$metaDescription=data.node.description
	$metaUrl="https://www.bodharesearch.in/node/{data.node.id}"
	$metaImage='/images/bodhacover.png'

	const relatedConcepts: Node[] = data.related.concepts;
	const relatedNodes: Node[] = data.related.related;
	const referencedBy: Node[] = data.referencedBy;

	const typeStyle: Record<string, { color: string; bg: string; border: string }> = {
		article:  { color: '#1971C2', bg: 'rgba(25,113,194,0.07)',  border: 'rgba(25,113,194,0.2)'  },
		thinker:  { color: '#1864AB', bg: 'rgba(24,100,171,0.07)',  border: 'rgba(24,100,171,0.2)'  },
		school:   { color: '#0D3B65', bg: 'rgba(13,59,101,0.07)',   border: 'rgba(13,59,101,0.2)'   },
		text:     { color: '#5999D3', bg: 'rgba(89,153,211,0.09)',  border: 'rgba(89,153,211,0.25)' },
		question: { color: '#4C9BE8', bg: 'rgba(76,155,232,0.07)',  border: 'rgba(76,155,232,0.2)'  },
		concept:  { color: '#74C0FC', bg: 'rgba(116,192,252,0.09)', border: 'rgba(116,192,252,0.3)' },
	};
	$: ts = typeStyle[data.node.type] ?? typeStyle.article;
</script>

<Head title={$metaTitle} metaDescription={$metaDescription} metaUrl={$metaUrl} metaImage={$metaImage}></Head>

<Container narrow={true} scaled={true}>
<div class="box padded-ontop only">
	<Debugger {data} label="Page Data" />
<Debugger value={data.relatedGrouped} label="Related Grouped" />
	<div class="page-hero">
		<p class="eyebrow tt-u"><a class="linkonhover" href="/node">← Library</a></p>
		<div class="row ycenter cgap10">
			<span class="type-badge tt-u" style="color:{ts.color}; background:{ts.bg}; border-color:{ts.border};">{data.node.type}</span>
			{#if data.node.meta?.author}
				<span class="meta-author">{data.node.meta.author}</span>
			{/if}
		</div>
		<h1 class="hero-title source-serif">{data.node.title}</h1>
		{#if data.node.description}
			<p class="hero-sub">{data.node.description}</p>
		{/if}
	</div>

	{#if relatedConcepts.length > 0}
	<div class="section-block">
		<p class="eyebrow tt-u">Concepts — {relatedConcepts.length}</p>
		<div class="mini-grid">
			{#each relatedConcepts as node (node.id)}
				<NodeMiniCard {node} />
			{/each}
		</div>
	</div>
	{/if}

	{#if relatedNodes.length > 0}
	<div class="section-block">
		<p class="eyebrow tt-u">Related — {relatedNodes.length}</p>
		<div class="mini-grid">
			{#each relatedNodes as node (node.id)}
				<NodeMiniCard {node} />
			{/each}
		</div>
	</div>
	{/if}

	{#if referencedBy.length > 0}
	<div class="section-block">
		<p class="eyebrow tt-u">Referenced By — {referencedBy.length}</p>
		<div class="mini-grid">
			{#each referencedBy as node (node.id)}
				<NodeMiniCard {node} />
			{/each}
		</div>
	</div>
	{/if}

</div>
</Container>

<style lang="sass">

.page-hero
	display: flex
	flex-direction: column
	gap: 0.75rem
	padding-bottom: 2.5rem
	border-bottom: 1px solid rgba(0,0,0,0.07)
	margin-bottom: 1rem

.type-badge
	font-size: 9px
	font-weight: 700
	letter-spacing: 0.1em
	padding: 3px 10px
	border-radius: 100px
	border: 1px solid

.meta-author
	font-size: 0.8rem
	color: #AAA

.hero-title
	font-size: clamp(1.6rem, 3.5vw, 2.5rem)
	font-weight: 400
	line-height: 1.12
	letter-spacing: -0.025em
	color: #111
	margin: 0

.hero-sub
	max-width: 60ch

// ── SECTIONS ───────────────────────────────────────────────

.section-block
	padding-top: 2rem
	border-top: 1px solid rgba(0,0,0,0.06)
	margin-top: 1rem
	display: flex
	flex-direction: column
	gap: 0.75rem



</style>
