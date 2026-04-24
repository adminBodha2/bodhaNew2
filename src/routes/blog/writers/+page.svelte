<script lang="ts">
	import Container from '$lib/comps/container.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';

	let { data } = $props();

	let writers = $derived(data.writers ?? []);

	const title = 'Writers | Bodha Blog';
	const metaDescription = "Meet the writers behind Bodha's essays on Hindu culture, history, and tradition.";
	const metaUrl = 'https://www.bodharesearch.in/blog/writers';
	const metaImage = 'https://www.bodharesearch.in/images/bodhacover.png';

	let jsonld = $derived(JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		name: title,
		description: metaDescription,
		url: metaUrl,
		image: metaImage,
		mainEntity: {
			'@type': 'ItemList',
			itemListElement: writers.map((item: any, index: number) => ({
				'@type': 'ListItem',
				position: index + 1,
				name: item.writer,
				url: 'https://www.bodharesearch.in/blog/writers/' + item.writer
			}))
		}
	}));
</script>


<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="2560" imHeight="1440" {jsonld} />


<Container narrow={true} scaled={true}>
	<div class="stdbox padded-ontop">
		<Crumb item1="Bodha" item1Link="/" show2={true} item2linked={true} item2="Blog" item2Link="/blog" showT={true} title="Writers" showRow={true}>
		<div class="row cgap8 rgap8 mwrap">
			<a class="nav-btn" href="/blog">Blog</a>
			<a class="nav-btn" href="/blog/tags">Tags</a>
		</div>
		</Crumb>
	{#if writers && writers.length > 0}
	<div class="box std">
		<div class="grid four">
			{#each writers as item, i}
			<a class="writer-card card-padded blank lining{i}" href="/blog/writers/{item.writer}">
				<p class="source-serif bold">{item.writer}</p>
				{#if item.count}
				<p class="tag-text tt-u grey">{item.count} {item.count === 1 ? 'essay' : 'essays'}</p>
				{/if}
			</a>
			{/each}
		</div>
	</div>
	{/if}
	</div>
</Container>


<style lang="sass">

.grid.four
	border: var(--border-main)
	.writer-card
		background: var(--color-stone)
		transition: background 0.05s ease
		&:hover
			background: #FFF
	@media screen and (min-width: 1025px)
		.lining0, .lining1, .lining2
			border-right: var(--border-main)
	@media screen and (max-width: 1024px)
		.lining0, .lining1, .lining2
			border-bottom: var(--border-main)

.writers-grid
	display: grid
	gap: 1px
	background: rgba(0,0,0,0.06)
	border: 1px solid rgba(0,0,0,0.06)
	border-radius: 10px
	overflow: hidden
	@media screen and (min-width: 1025px)
		grid-template-columns: repeat(3, 1fr)
	@media screen and (min-width: 631px) and (max-width: 1024px)
		grid-template-columns: repeat(2, 1fr)

.writer-name
	font-size: clamp(1rem, 1.5vw, 1.15rem)
	font-weight: 400
	line-height: 1.2
	letter-spacing: -0.02em
	color: #111
	transition: color 0.15s ease

.writer-count
	font-size: 0.75rem
	color: var(--text-ghost)

</style>
