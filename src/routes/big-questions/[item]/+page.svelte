<script lang="ts">
	import NodeCard from '$lib/nodeitems/NodeCard.svelte';
	import { page } from '$app/state';
	import Container from '$lib/comps/container.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte'
	import Head from '$lib/comps/headcomponent.svelte';
	let sY: number;
	export let data;

	const jsonld = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: data.title,
		description: data.description,
		image: data.icon,
		publisher: { '@type': 'Organization', name: 'Bodha Research', url: 'https://www.bodharesearch.in' },
		url: 'https://www.bodharesearch.in' + page.url.pathname,
	});
</script>

<svelte:window bind:scrollY={sY} />

<Head
	title={data.title}
	metaDescription={data.description}
	metaImage={data.icon}
	metaUrl={'https://www.bodharesearch.in' + page.url.pathname}
	{jsonld}
/>

<Container narrow={true} scaled={true}>
<div class="box std padded-ontop">
	<Crumb rgap={16} item1="Big Questions" item1Link="/big-questions" showT={true} title={data.title} showD={true} desc={data.description} showRow={true}>
		{#if data.tags?.length}
		<div class="row wrap cgap8">
			{#each data.tags as tag}
			<a class="tag-pill tt-u" href="/tags/{tag}">{tag.replaceAll('-', ' ')}</a>
			{/each}
		</div>
		{/if}
	</Crumb>
	<div class="box std">
		<div class="grid two midgaps">
			<div class="box classic-document down">
				<data.content />
			</div>
			<div class="image up">
				<img src={data.icon} alt={data.title}/>
			</div>
		</div>
	</div>
<!--
	{#if data.concepts?.length > 0}
	<div class="section-block">
		<p class="eyebrow tt-u">Reading Room</p>
		<p class="section-sub">Texts, articles, and thinkers connected to this question through the knowledge graph.</p>

		<div class="concept-tags row wrap cgap8">
			{#each data.concepts as concept}
			<a class="concept-tag blank linkonhover" href="/concept/{concept.slug}">{concept.title}</a>
			{/each}
		</div>

		{#if data.relatedReading}
			{#if data.relatedReading.articles?.length > 0}
			<div class="reading-section">
				<p class="reading-label tt-u">Articles</p>
				<div class="reading-grid">
					{#each data.relatedReading.articles as node}
					<NodeCard {node} />
					{/each}
				</div>
			</div>
			{/if}
			{#if data.relatedReading.texts?.length > 0}
			<div class="reading-section">
				<p class="reading-label tt-u">Books</p>
				<div class="reading-grid">
					{#each data.relatedReading.texts as node}
					<NodeCard {node} />
					{/each}
				</div>
			</div>
			{/if}
			{#if data.relatedReading.thinkers?.length > 0}
			<div class="reading-section">
				<p class="reading-label tt-u">Thinkers</p>
				<div class="reading-grid">
					{#each data.relatedReading.thinkers as node}
					<NodeCard {node} />
					{/each}
				</div>
			</div>
			{/if}
		{/if}
	</div>
	{/if}
	{#if data.researchPath && data.researchSteps}
	<div class="section-block">
		<p class="eyebrow tt-u">Research Pathway</p>
		<p class="section-sub">{data.researchPath.description}</p>
		<div class="pathway">
			{#each data.researchSteps as step, i}
			<div class="step">
				<div class="step-marker">
					<span class="step-num">{i + 1}</span>
					{#if i < data.researchSteps.length - 1}
					<div class="step-line" />
					{/if}
				</div>
				<div class="step-body">
					{#if step.node}
					<NodeCard node={step.node} note={step.note} />
					{:else}
					<p class="missing-node">Node not found: {step.nodeId}</p>
					{/if}
				</div>
			</div>
			{/each}
		</div>
	</div>
	{/if}
-->
</div>
</Container>

<style lang="sass">

.midgaps
	img
		object-fit: cover
		width: 100%
		height: 100%

.page-content
	gap: var(--gap-std)

// ── ARTICLE HEADER ─────────────────────────────────────────

.article-header
	display: flex
	flex-direction: column
	gap: var(--gap-text)
	padding-bottom: 2rem
	border-bottom: 1px solid rgba(0,0,0,0.06)

.tag-pill
	font-size: 8px
	font-weight: 700
	letter-spacing: 0.1em
	color: var(--text-ghost)

// ── FEATURE IMAGE ──────────────────────────────────────────

.article-image
	width: 100%
	overflow: hidden
	border-radius: 8px
	border: 1px solid rgba(0,0,0,0.06)
	height: 280px
	@media screen and (min-width: 1025px)
		height: 400px
	img
		width: 100%
		height: 150%
		object-fit: cover
		display: block

// ── SECTIONS ───────────────────────────────────────────────

.section-sub
	font-size: 0.88rem
	line-height: 1.65
	color: #777
	margin: 0

// ── READING ROOM ───────────────────────────────────────────

.concept-tag
	font-size: 0.75rem
	font-weight: 500
	color: #444
	padding: 3px 10px
	border-radius: 100px
	border: 1px solid rgba(0,0,0,0.09)
	background: #F9F8F6
	transition: all 0.15s ease
	&:hover
		border-color: rgba(25,113,194,0.3)
		background: rgba(25,113,194,0.05)
		color: var(--theme)

.reading-section
	display: flex
	flex-direction: column
	gap: 0.5rem

.reading-label
	font-size: 8.5px
	font-weight: 700
	letter-spacing: 0.12em
	color: var(--text-ghost)

.reading-grid
	display: grid
	gap: 6px
	@media screen and (min-width: 1025px)
		grid-template-columns: 1fr 1fr

// ── RESEARCH PATHWAY ───────────────────────────────────────

.pathway
	display: flex
	flex-direction: column

.step
	display: flex
	gap: 1rem
	align-items: flex-start

.step-marker
	display: flex
	flex-direction: column
	align-items: center
	flex-shrink: 0
	padding-top: 0.75rem

.step-num
	width: 26px
	height: 26px
	border-radius: 50%
	border: 1.5px solid var(--theme)
	display: flex
	align-items: center
	justify-content: center
	font-size: 0.72rem
	font-weight: 700
	color: var(--theme)
	flex-shrink: 0

.step-line
	width: 1px
	flex: 1
	min-height: 20px
	background: rgba(0,0,0,0.1)
	margin-top: 4px

.step-body
	flex: 1
	padding-bottom: 1.5rem
	padding-top: 0.5rem

.missing-node
	font-size: 0.8rem
	color: var(--text-ghost)

</style>
