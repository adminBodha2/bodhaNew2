<script lang="ts">
	import { page } from '$app/state';
	const BASE = 'https://www.bodharesearch.in';
	import Container from '$lib/comps/container.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Social from '$lib/comps/socialshare.svelte';
	import Title from '$lib/comps/page-title.svelte';
	import Pageprogress from '$lib/comps/pageprogress.svelte';

	let { data } = $props();

	let posts = $derived(data.posts ?? []);
	let ref = $state<HTMLElement | null>(null);
	let sY = $state(0);
	let imageY = $derived(-(sY / 12));

	let formattedDate = $derived(
		new Date(data.date).toLocaleDateString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric'
		})
	);

	let firstAuthor = $derived(Array.isArray(data.author) ? data.author[0] : data.author);

	let title = $derived(data.title);
	let metaDescription = $derived(data.excerpt);
	let metaUrl = $derived(BASE + page.url.pathname);
	let metaImage = $derived(data.image);

	let jsonld = $derived(JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: data.title,
		description: data.excerpt,
		image: data.image,
		datePublished: data.date,
		author: { '@type': 'Person', name: firstAuthor },
		publisher: { '@type': 'Organization', name: 'Bodha Research', url: BASE },
		url: metaUrl
	}));
</script>

<svelte:window bind:scrollY={sY}/>

<Head {title} {metaDescription} {metaUrl} {metaImage} ogType="article" {jsonld} />

<Pageprogress --thispagebackground="var(--color-theme)" --thispageheight="3px" {ref} />
<Container narrow={true} scaled={true}>
<div class="blog-heading stdbox padded-ontop">
	<div class="elembox blog-title-area xcenter mleft ta-c">
		<Crumb centered={true} item1="Bodha" item1Link="/" show2={true} item2="Blog" item2linked={true} item2Link="/blog"/>
		<h1 class="page-title source-serif width80 self-center">{data.title}</h1>
		<div class="textbox stone-box width60 self-center">
		<p class="altprim">{data.excerpt}</p>
		<div class="info row ycenter xcenter mleft">
			<div class="line left-line"></div>
			<p class="small-text"><a class="linked" href="/blog/writers/{data.author}">{data.author}</a> | {data.words} words | {formattedDate}</p>
			<div class="line right-line"></div>
		</div>
		<div class="tag-row row self-center">
			{#each data.tags as tag}
			<a class="tag-pill themed tt-u blank" href="/blog/tags/{tag}">{tag.replaceAll('-', ' ')}</a>
			{/each}
		</div>
		</div>
	</div>
	<div class="box blog-image-area xcenter">
		<img src={data.image} alt={data.title} style:transform={`translateY(${imageY}px)`}/>
	</div>
	<div class="article-slate">
	<article class="blog-article self-center" bind:this={ref}>
		<data.content />
		<div class="row share-row ycenter cgap16 xbetween">
			<Social urlToShare={page.url.href} />
			<a class="small-button" href="/blog">← Back to Blog</a>
		</div>
	</article>
	</div>
</div>
<div class="stdbox padded bordertop">
	{#if posts && posts.length > 0}
		<Title text="More Like This"/>
		<div class="grid four white-grid">
			{#each posts as item, i}
				<a class="postcard blank labelbox card-padded" href={item.linkpath}>
					<p class="highlight-text tight bold">{item.meta.title}</p>
					<p class="small-text grey">{item.meta.excerpt}</p>
					<div class="box foot self-bottom bordertop ptop8">
					<p class="tag-text lgrey tt-u">{item.meta.author} | {item.meta.words} words</p>
					<div class="row of-info mwrap cgap8 rgap8">
						{#each item.meta.tags as tag}
							<p class="tag-pill hollow themed tt-u">{tag.replaceAll('-',' ')}</p>
						{/each}
					</div>
					</div>
				</a>
			{/each}
		</div>
	{/if}
</div>
</Container>

<style lang="sass">

.postcard
	background: var(--color-white)
	&:hover
		background: var(--color-stone)

.share-row
	border-top: var(--border-main)
	padding-top: 2rem
	margin-top: 2rem

.blog-image-area
	overflow: hidden
	border-radius: 5px
	position: relative
	img
		object-fit: cover
		position: absolute
		width: 100%
	@media screen and (max-width: 1024px)
		height: 200px
		img
			height: 630px
	@media screen and (min-width: 1025px)
		height: 540px
		img
			height: 630px

.line
	height: 1px
	width: 20%
	background: var(--color-grey-1)
	@media screen and (max-width: 1024px)
		display: none

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

.blog-article
	width: 100%
	@media screen and (min-width: 1025px)
		width: 928px
		padding: 2rem

.share-row
	display: flex
	align-items: center
	justify-content: space-between
	flex-wrap: wrap
	gap: 1rem

</style>
