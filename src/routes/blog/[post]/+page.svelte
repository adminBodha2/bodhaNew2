<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	const BASE = 'https://www.bodharesearch.in';
	import '$lib/styles/blog.sass';
	import { categoryPosts } from '$lib/utils/localpulls';
	import Container from '$lib/comps/container.svelte';
	import Parallax from '$lib/comps/parallaxfull.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Social from '$lib/comps/socialshare.svelte';
	import Pageprogress from '$lib/comps/pageprogress.svelte';

	let posts = $state<any>([]);
	let { data } = $props();

	let ref = $state<HTMLElement | null>(null);

const formattedDate = $derived(
	new Date(data.date).toLocaleDateString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric'
	})
);

	const firstAuthor = $derived(
		Array.isArray(data.author) ? data.author[0] : data.author
	);

const jsonld = $derived(
	JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: data.title,
		description: data.excerpt,
		image: data.image,
		datePublished: data.date,
		author: { '@type': 'Person', name: firstAuthor },
		publisher: { '@type': 'Organization', name: 'Bodha Research', url: BASE },
		url: BASE + page.url.pathname,
	})
);

	$effect(() => {
		if (!data?.category) return;

		(async () => {
			posts = await categoryPosts(data.category);
		})();
	});


	onMount(() => {
		(async () => {
			posts = await categoryPosts(data.category);
		})();
	});
</script>

<Head title={data.title} metaDescription={data.excerpt} metaImage={data.image} metaUrl={BASE + page.url.pathname} {jsonld} />

<Parallax isClass="is100" imageLink={data.image} />
<Pageprogress --thispagebackground="var(--theme)" --thispageheight="3px" {ref} />

<Container narrow={true} scaled={true}>
<div class="box std padded">

	<div class="article-header">
		<p class="breadcrumb tt-u">
			<a class="linkonhover" href="/">Bodha</a>
			<span class="sep">></span>
			<a class="linkonhover" href="/blog">Blog</a>
		</p>
		<h1 class="page-title source-serif width80">{data.title}</h1>
		<p class="small-text width60 grey">{data.excerpt}</p>
		<div class="author-row">
			<a class="author-name tt-u blank linkonhover" href="/blog/writers/{data.author}">{data.author}</a>
			<span class="author-sep">·</span>
			<span class="author-words">{data.words} words</span>
			<span class="author-sep">·</span>
			<span class="author-words">{formattedDate}</span>
		</div>
		<div class="tag-row">
			{#each data.tags as tag}
			<a class="tag-pill colored tt-u blank" href="/blog/tags/{tag}">{tag.replaceAll('-', ' ')}</a>
			{/each}
		</div>
	</div>

	<article class="blog-article" bind:this={ref}>
		<data.content />
	</article>

	<div class="share-row">
		<Social urlToShare={page.url.href} />
		<a class="back-link linkonhover" href="/blog">← Back to Blog</a>
	</div>

	{#if posts && posts.length > 0}
	<div class="box std bordertop ptop32">
		<p class="eyebrow tt-u">More in this category</p>
		<div class="standard-grid grid three">
			{#each posts as item, i}
			<a class="more-card hover-card blank number{i}" href={item.linkpath}>
				<h3 class="blog-title source-serif">{item.meta.title}</h3>
				<p class="more-excerpt">{item.meta.excerpt}</p>
				<div class="more-tags">
					{#each item.meta.tags as tag}
					<span class="tag-pill tt-u">{tag.replaceAll('-', ' ')}</span>
					{/each}
				</div>
			</a>
			{/each}
		</div>
	</div>
	{/if}

</div>
</Container>

<style lang="sass">

.breadcrumb
	font-size: 10px
	letter-spacing: 0.14em
	font-weight: 600
	color: #999

.tag-row
	display: flex
	flex-wrap: wrap
	gap: 6px

.tag-pill
	font-size: 7.5px
	font-weight: 700
	letter-spacing: 0.1em
	color: var(--text-ghost)
	padding: 3px 10px
	border-radius: 100px
	border: 1px solid rgba(0,0,0,0.08)
	background: #F5F5F4
	transition: background 0.12s ease
	&:hover
		background: #EEEDE9
		color: #555

.article-title
	font-size: clamp(1.9rem, 4vw, 2.8rem)
	font-weight: 400
	line-height: 1.1
	letter-spacing: -0.03em
	color: #111
	margin: 0

.article-excerpt
	font-size: 1rem
	line-height: 1.75
	color: #6B6B6B
	margin: 0

.author-row
	display: flex
	align-items: center
	gap: 8px

.author-name
	font-size: 9px
	font-weight: 700
	letter-spacing: 0.14em
	color: #555

.author-sep
	color: #DDD

.author-words
	font-size: 0.75rem
	color: var(--text-ghost)

.blog-article
	width: 100%
	@media screen and (min-width: 1025px)
		width: 900px

.share-row
	display: flex
	align-items: center
	justify-content: space-between
	flex-wrap: wrap
	gap: 1rem

.back-link
	font-size: 0.82rem
	color: var(--text-ghost)
	transition: color 0.12s ease
	&:hover
		color: var(--theme)

.more-grid
	display: grid
	gap: 1px
	background: rgba(0,0,0,0.06)
	border: 1px solid rgba(0,0,0,0.06)
	border-radius: 10px
	overflow: hidden
	@media screen and (min-width: 631px)
		grid-template-columns: repeat(3, 1fr)

.more-card
	display: flex
	flex-direction: column
	gap: 0.5rem
	padding: 1.2rem 1.4rem
	background: #FFFFFF
	transition: background 0.15s ease
	&:hover
		background: #F9F8F6
		.more-title
			color: var(--theme)

.more-title
	font-size: clamp(0.9rem, 1.5vw, 1.05rem)
	font-weight: 400
	line-height: 1.25
	letter-spacing: -0.02em
	color: #111
	margin: 0
	transition: color 0.15s ease

.more-excerpt
	font-size: 0.8rem
	line-height: 1.6
	color: #777
	margin: 0

.more-tags
	display: flex
	flex-wrap: wrap
	gap: 4px
	margin-top: auto
	padding-top: 0.5rem

</style>
