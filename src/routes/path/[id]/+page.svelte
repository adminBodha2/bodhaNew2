<script lang="ts">
	import type { PageData } from './$types';
	import Container from '$lib/comps/container.svelte';
	import NodeCard from '$lib/nodeitems/NodeCard.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import autoAnimate from '@formkit/auto-animate';
	import Concepts from '$lib/comps/button-concept.svelte'
	import Thinkers from '$lib/comps/button-thinker.svelte'
	import Schools from '$lib/comps/button-school.svelte'
	import Books from '$lib/comps/button-book.svelte'
	import Articles from '$lib/comps/button-article.svelte'

	import { page } from '$app/stores';
	import { getContentHref } from '$lib/graph/routing';
	import { nodeById } from '$lib/graph';

	export let data: PageData;
	let filterType = 'Concepts'

	function setFilter(newFilter:string){
		filterType = newFilter
	}

	const typeStyle: Record<string, { color: string; bg: string; border: string }> = {
		article:  { color: '#1971C2', bg: 'rgba(25,113,194,0.07)',  border: 'rgba(25,113,194,0.2)'  },
		thinker:  { color: '#1864AB', bg: 'rgba(24,100,171,0.07)',  border: 'rgba(24,100,171,0.2)'  },
		school:   { color: '#0D3B65', bg: 'rgba(13,59,101,0.07)',   border: 'rgba(13,59,101,0.2)'   },
		text:     { color: '#5999D3', bg: 'rgba(89,153,211,0.09)',  border: 'rgba(89,153,211,0.25)' },
		concept:  { color: '#74C0FC', bg: 'rgba(116,192,252,0.09)', border: 'rgba(116,192,252,0.3)' },
	};

	const levelColor: Record<string, string> = {
		entry: '#5999D3',
		intermediate: '#1971C2',
		advanced: '#0D3B65'
	};

	$: pageUrl = `https://www.bodharesearch.in/path/${data.path.id}`;
	$: shareText = encodeURIComponent(`${data.path.title} — a learning path on Bodha Research`);
	$: shareUrl = encodeURIComponent(pageUrl);

	const shares = [
		{ label: 'Twitter', href: () => `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`, icon: 'twitter' },
		{ label: 'LinkedIn', href: () => `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareText}`, icon: 'linkedin' },
		{ label: 'WhatsApp', href: () => `https://wa.me/?text=${shareText}%20${shareUrl}`, icon: 'whatsapp' },
		{ label: 'Facebook', href: () => `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, icon: 'facebook' },
		{ label: 'Email', href: () => `mailto:?subject=${shareText}&body=${pageUrl}`, icon: 'email' },
	];
</script>

<Head
	title="{data.path.title} — Bodha Learning Paths"
	metaDescription={data.path.description}
	metaUrl="https://www.bodharesearch.in/path/{data.path.id}"
	metaImage="/images/bodhacover.png"
/>

<Container narrow={true} scaled={true}>
<div class="box padded-ontop">
	<div class="path-header">
		<div class="header-badges row ycenter cgap16">
			<p class="eyebrow tt-u"><a class="linkonhover" href="/path">← Paths</a></p>
			<span class="level-tag tt-u" style="color: {levelColor[data.path.level] ?? '#333'}; border-color: {levelColor[data.path.level] ?? '#333'}40;">{data.path.level}</span>
		</div>
		<h1 class="hero-title source-serif">{data.path.title}</h1>
		{#if data.path.subtitle}
			<p class="path-subtitle">{data.path.subtitle}</p>
		{/if}
		<p class="path-desc">{data.path.description}</p>
		<div class="step-preview row ycenter cgap8">
			{#each data.steps as _, i}
				<span class="preview-dot" style="opacity: {1 - i * (0.6 / data.steps.length)}"></span>
			{/each}
			<span class="preview-label">{data.steps.length} steps in sequence</span>
		</div>
	</div>
	<div class="grid two tight areaofcards">
		{#each data.steps as step, i}
		<div class="step-body">
			<div class="row mcol cgap16 numbertray">
				<div>
				<div class="step-num"><span>{i + 1}</span></div>{#if i < data.steps.length - 1}<div class="step-line"></div>{/if}
				</div>
				<div>
				{#if step.note}
					<p class="small-text grey step-note">{step.note}</p>
				{/if}
				</div>
			</div>
			{#if step.node}
				<NodeCard node={step.node} />
			{:else}
			<p class="small-text grey">Node not found: {step.nodeId}</p>
			{/if}
		</div>
		{/each}
	</div>
	{#if data.conceptNodes.length > 0 || Object.values(data.relatedGrouped).some(g => g.length > 0)}
	<div class="related-section"  use:autoAnimate>
		<div class="related-header">
			<p class="related-title tt-u">From the Knowledge Graph</p>
			<p class="related-sub">Concepts, texts, and thinkers connected to this path</p>
		</div>
		<div class="pagination-tray">
			<Concepts on:click={() => setFilter('Concepts')} active={filterType === 'Concepts'} label="Concepts"/>
			<Books on:click={() => setFilter('Books')} active={filterType === 'Books'} label="Books"/>
			<Articles on:click={() => setFilter('Articles')} active={filterType === 'Articles'} label="Articles"/>
			<Thinkers on:click={() => setFilter('Thinkers')} active={filterType === 'Thinkers'} label="Thinkers"/>
			<Schools on:click={() => setFilter('Schools')} active={filterType === 'Schools'} label="Schools"/>
		</div>
		{#if data.conceptNodes.length > 0 && filterType === 'Concepts'}
		<div class="mini-group ptop16">
			<div class="column">
				{#each data.conceptNodes as node}
					{#if node.slug !== '' || node.slug === null }
				<h5 class="title-item source-serif borderbot pbot16"><a class="blank" href="/concept/{node.slug}">{node.title}</a></h5>
				{/if}
				{/each}
			</div>
		</div>
		{/if}
		<div class="measuredbox">
		{#each [
			{ label: 'Articles', nodes: data.relatedGrouped.articles, type: 'article' },
			{ label: 'Books', nodes: data.relatedGrouped.texts, type: 'text' },
			{ label: 'Thinkers', nodes: data.relatedGrouped.thinkers, type: 'thinker' },
			{ label: 'Schools', nodes: data.relatedGrouped.schools, type: 'school' },
		] as group}
			{#if group.nodes.length > 0 && group.label === filterType}
				<div class="grid four stay2 tight">
					{#each group.nodes as node}
					{@const ts = typeStyle[group.type]}
					<div class="box stamp">
					<p class="item-line source-serif"><a class="mini-card blank" href={getContentHref(node)}>{node.title}</a></p>
					{#if node.type === 'article' || 'question' || 'thinker' || 'school' || 'book'}
							<p class="small-text ptop16">{node.description}</p>
					{/if}
					{#if node.meta.author !== null}
					<p class="small-text grey mini-author tight w500 tt-u">{node.meta.author}</p>
					{/if}
					<div class="row wrap tagstray">
						{#each node.classification.tags as tag}
							<small class="blue-dark">{tag}</small>
						{/each}
				</div>
					</div>
					{/each}
				</div>
			{/if}
		{/each}
		</div>
	</div>
	{/if}
	<div class="path-end">
		<div class="end-circle">✓</div>
		<p class="end-label">End of path</p>
		<a class="blank back-to-paths tt-u" href="/path">← Back to all paths</a>
		<div class="share-section">
			<p class="share-label tt-u">Share this path</p>
			<div class="share-buttons row ycenter cgap8">
				{#each shares as s}
					<a class="share-btn blank" href={s.href()} target="_blank" rel="noreferrer" aria-label="Share on {s.label}">
						{#if s.icon === 'twitter'}
							<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
						{:else if s.icon === 'linkedin'}
							<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
						{:else if s.icon === 'whatsapp'}
							<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
						{:else if s.icon === 'facebook'}
							<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
						{:else if s.icon === 'email'}
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
						{/if}
						<span>{s.label}</span>
					</a>
				{/each}
			</div>
		</div>
	</div>
</div>
</Container>

<style lang="sass">

.tagstray
	gap: 5px
	padding-top: 4px

.stamp
	background: var(--stamp)
	border: 1px solid #e7e7e7
	border-radius: 8px
	padding: 0.89rem	
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)
	&:hover
		box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)
	@media screen and (min-width: 1025px)
		.item-line.source-serif
			padding-bottom: 1.2rem
			border-bottom: 1px solid #d1d1d1
			padding-top: 0.875rem
		.mini-author
			padding-top: 1rem
			margin-top: auto

.wrap.tagstray
	@media screen and (min-width: 1025px)
		gap: 5px
		padding-top: 4px


// ── PAGE ──────────────────────────────────────────────────

.pagination-tray
	display: flex
	flex-direction: row	
	column-gap: 8px
	align-items: stretch
	align-content: stretch
	@media screen and (max-width: 1024px) 
		flex-wrap: wrap
		gap: 8px

.related-section
	min-height: 80vh

// ── HEADER ────────────────────────────────────────────────

.path-header
	display: flex
	flex-direction: column
	gap: 0.75rem
	padding-bottom: 3rem
	border-bottom: 1px solid rgba(0,0,0,0.07)
	margin-bottom: 3rem

.header-badges
	margin-top: 0.5rem

.level-tag
	font-size: 9.5px
	font-weight: 700
	letter-spacing: 0.1em
	padding: 3px 10px
	border-radius: 100px
	border: 1px solid

.path-subtitle
	font-size: 0.9rem
	color: #AAA
	font-style: italic
	margin: 0

.path-desc
	font-size: 1rem
	line-height: 1.75
	color: #6B6B6B
	margin: 0.25rem 0 0

.step-preview
	margin-top: 0.5rem
	gap: 5px

.preview-dot
	width: 6px
	height: 6px
	border-radius: 50%
	background: var(--theme)
	flex-shrink: 0

.preview-label
	font-size: 0.7rem
	color: #C0BFBB
	letter-spacing: 0.04em
	margin-left: 6px

// ── STEPS ─────────────────────────────────────────────────

.step-num
	width: 34px
	height: 34px
	border-radius: 50%
	border: 1.5px solid rgba(0,0,0,0.15)
	background: #EBEBE9
	display: flex
	align-items: center
	justify-content: center
	box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 0 0 4px rgba(255,255,255,0.8)
	span
		font-size: 0.72rem
		color: #555
		letter-spacing: 0.02em

.numbertray
	align-items: flex-end
	.step-note
		width: calc(100% - 128px)

.step-body
	display: flex
	flex-direction: column
	padding: 2rem
	border: 1px solid rgba(0,0,0,0.07)
	border-radius: 8px
	box-shadow: 0 1px 2px rgba(0,0,0,0.02), 0 3px 8px rgba(0,0,0,0.03), 0 8px 16px rgba(0,0,0,0.03)


// ── RELATED KNOWLEDGE ─────────────────────────────────────

.related-section
	margin-top: 3rem
	padding-top: 2.5rem
	border-top: 1px solid rgba(0,0,0,0.07)
	display: flex
	flex-direction: column
	gap: 2rem

.related-header
	display: flex
	flex-direction: column
	gap: 0.3rem

.related-title
	font-size: 9px
	font-weight: 700
	letter-spacing: 0.14em
	color: #BCBCBC

.related-sub
	font-size: 0.82rem
	color: #ACACAC

.mini-group
	display: flex
	flex-direction: column
	gap: 0.6rem

.mini-card
	display: flex
	flex-direction: column
	transition: all 0.18s ease 0.2s
	border-radius: 8px


// ── END ───────────────────────────────────────────────────

.path-end
	display: flex
	flex-direction: column
	align-items: center
	gap: 1.2rem
	padding-top: 2rem

.end-circle
	width: 38px
	height: 38px
	border-radius: 50%
	border: 1.5px solid rgba(0,0,0,0.15)
	background: #FFFFFF
	display: flex
	align-items: center
	justify-content: center
	font-size: 0.85rem
	color: #888
	box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 0 0 4px rgba(255,255,255,0.8)

.end-label
	font-size: 0.72rem
	font-weight: 600
	letter-spacing: 0.08em
	color: #BCBCBC
	text-transform: uppercase

.back-to-paths
	font-size: 0.72rem
	font-weight: 600
	letter-spacing: 0.08em
	color: #ACACAC
	margin-top: 0.5rem
	transition: color 0.15s ease
	&:hover
		color: var(--theme)

.share-section
	margin-top: 2rem
	display: flex
	flex-direction: column
	align-items: center
	gap: 0.75rem

.share-label
	font-size: 9px
	font-weight: 600
	letter-spacing: 0.12em
	color: #CECCC7

.share-buttons
	flex-wrap: wrap
	justify-content: center
	gap: 8px

.share-btn
	display: flex
	align-items: center
	gap: 6px
	padding: 6px 14px
	border-radius: 100px
	border: 1px solid rgba(0,0,0,0.1)
	background: #FFFFFF
	color: #888
	font-size: 0.72rem
	font-weight: 500
	letter-spacing: 0.03em
	box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 2px 6px rgba(0,0,0,0.03)
	transition: color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease
	svg
		flex-shrink: 0
	&:hover
		color: var(--theme)
		border-color: rgba(25, 113, 194, 0.3)
		box-shadow: 0 2px 4px rgba(25,113,194,0.08), 0 4px 12px rgba(25,113,194,0.06)

</style>
