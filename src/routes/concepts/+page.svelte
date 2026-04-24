<script lang="ts">
	import type { PageData } from './$types';
	import Container from '$lib/comps/container.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte'
	import Head from '$lib/comps/headcomponent.svelte';

	export let data: PageData;

	const title = 'Explore Concepts and Ideas at Bodha'
  	const metaDescription = 'Entry point for our knowledge base and wiki.'
  	const metaUrl = 'https://www.bodharesearch.in/concepts'
  	const metaImage = 'https://www.bodharesearch.in/images/bodhacover.png'

	// Separate Amarakosha varga concepts from regular concepts
	$: akVargas   = data.concepts.filter((c: any) => c.slug.startsWith('ak-'));
	$: regular    = data.concepts.filter((c: any) => !c.slug.startsWith('ak-') && c.count > 1);
	$: totalCount = data.concepts.length;
</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} />

<Container narrow={true} scaled={true}>
<div class="stdbox padded-ontop">
	<Crumb item1="Bodha" item1Link="/" showT={true} title="Concepts" showD={true} desc="{totalCount} Concepts - Domains of thought across the knowledge base. Each concept connects texts, thinkers, and ideas."/>
	<div class="row wrap cgap16 rgap16">
		{#each regular as concept}
			<a class="tag-item tt-u blank" href="/concepts/{concept.slug}">
				{concept.title}
				<span class="tag-count">{concept.count}</span>
			</a>
		{/each}
	</div>
</div>
<!--
<div class="stdbox padded bordertop">
	<Title text="Amarakosha Domains"/>
	{#if akVargas.length > 0}
		<div class="ak-grid">
			{#each akVargas as concept}
				<a class="ak-card blank" href="/concepts/{concept.slug}">
					<span class="ak-devanagari">{concept.meta?.devanagari ?? ''}</span>
					<span class="ak-label">{concept.title.replace(/^.+ — /, '')}</span>
					{#if concept.meta?.wordCount}
						<span class="ak-count">{concept.meta.wordCount} words</span>
					{/if}
				</a>
			{/each}
		</div>
	{/if}
</div>
-->
</Container>

<style lang="sass">

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

</style>
