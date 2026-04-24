<script lang="ts">
	import type { PageData } from './$types';
	import Container from '$lib/comps/container.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte'
	import Title from '$lib/comps/page-title.svelte'
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
<div class="stdbox padded-ontop">
	<Crumb item1="Bodha" item1Link="/" show2={true} item2="Paths" item2linked={true} item2Link="/paths" showT={true} title={data.path.title} showD={true} desc={data.path.description}/>
	<Title text="Recommended Readings"/>
	<div class="grid three white-grid">
		{#each data.steps as step, i}
		<div class="labelbox path-item card-padded">
			{#if step.node}
				<NodeCard node={step.node} />
			{:else}
			<p class="small-text grey">Node not found: {step.nodeId}</p>
			{/if}
		</div>
		{/each}
	</div>
</div>
<div class="stdbox padded bordertop">
	{#if data.conceptNodes.length > 0 || Object.values(data.relatedGrouped).some(g => g.length > 0)}
	<Title text="Explore Path"/>
	<div class="row ycenter cgap8 rgap8 mwrap">
		<button class="nav-btn" on:click={() => setFilter('Concepts')} class:active={filterType === 'Concepts'}>Concepts</button>
		<button class="nav-btn" on:click={() => setFilter('Books')} class:active={filterType === 'Books'}>Books</button>
		<button class="nav-btn" on:click={() => setFilter('Articles')} class:active={filterType === 'Articles'}>Essays</button>
		<button class="nav-btn" on:click={() => setFilter('Thinkers')} class:active={filterType === 'Thinkers'}>Thinkers</button>
		<button class="nav-btn" on:click={() => setFilter('Schools')} class:active={filterType === 'Schools'}>Schools</button>
	</div>
	<div class="related-section" use:autoAnimate>
		{#if data.conceptNodes.length > 0 && filterType === 'Concepts'}
		<div class="grid four white-grid">
			{#each data.conceptNodes as node}
				{#if node.slug !== '' || node.slug === null }
				<a class="blank card-padded concept-item" href="/concept/{node.slug}">
				<p class="highlight-text w500">{node.title}</p>
				<p class="small-text grey">{node.description}</p>
				</a>
				{/if}
			{/each}
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
				<div class="grid four white-grid">
					{#each group.nodes as node}
					{@const ts = typeStyle[group.type]}
					<a class="blank labelbox other-item card-padded" href={getContentHref(node)}>
						<p class="w500">{node.title}</p>
						{#if node.type === 'article' || 'question' || 'thinker' || 'school' || 'book'}
						<p class="small-text grey">{node.description}</p>
						{/if}
						{#if node.meta.author !== null && node.meta.author !== 'Unknown'}
						<p class="tag-text lgrey tt-c">{node.meta.author}</p>
						{/if}
						<div class="row wrap tagstray rgap8 cgap8">
							{#each node.classification.tags as tag}
							{#if tag !== null && tag !== ""}
							<p class="tag-pill tt-u themed">{tag.replaceAll('-',' ')}</p>
							{/if}
							{/each}
						</div>
					</a>
					{/each}
				</div>
			{/if}
		{/each}
		</div>
	</div>
	{/if}
</div>
</Container>

<style lang="sass">

.concept-item, .other-item
	background: var(--color-white)
	&:hover
		background: var(--color-stone)

.path-item
	background: var(--color-white)

.tagstray
	gap: 5px
	padding-top: 4px

.wrap.tagstray
	@media screen and (min-width: 1025px)
		gap: 5px
		padding-top: 4px

.related-section
	min-height: 80vh

</style>
