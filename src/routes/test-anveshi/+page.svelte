<script lang="ts">
	import type { PageData } from './$types';
	import Container from '$lib/comps/container.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import { absoluteImage, absoluteUrl, collectionPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';

	type BlogPost = {
		linkpath: string;
		formattedDate?: string;
		meta: {
			title?: string;
			image?: string;
			excerpt?: string;
			author?: string[];
			words?: string | number;
			tags?: string[];
			category?: string | string[];
		};
	};

	type CategoryCount = {
		category: string;
		count: number;
	};

	type ExternalPost = {
		title: string;
		description: string;
		route: string;
		tags: string[];
	};

	type TagCount = {
		tag: string;
		count: number;
	};

	type WriterCount = {
		writer: string;
		count: number;
	};

	let { data }: { data: PageData } = $props();
	let selectedCategory = $state('All');

	let posts = $derived((data.posts ?? []) as BlogPost[]);
	let categories = $derived((data.categories ?? []) as CategoryCount[]);
	let externalPosts = $derived(((data.externalPosts ?? []) as ExternalPost[]).slice(0, 6));
	let tags = $derived(((data.tags ?? []) as TagCount[]).slice(0, 18));
	let writers = $derived(((data.writers ?? []) as WriterCount[]).slice(0, 10));
	let heroPosts = $derived(posts.slice(0, 3));
	let gridPosts = $derived(
		posts.filter((post) => selectedCategory === 'All' || postCategories(post).includes(selectedCategory))
	);
	let articlePosts = $derived(gridPosts.filter((post) => !heroPosts.some((hero) => hero.linkpath === post.linkpath)));
	let latestPosts = $derived(posts.slice(0, 6));

	const title = 'Blog | Bodha';
	const metaDescription = 'Essays on Hindu culture, history, festivals, civilizational thought, and more.';
	const metaUrl = absoluteUrl('/blog');
	const metaImage = absoluteImage('/images/bodhacover.png');

	let jsonld = $derived(
		stringifyJsonLd(
			collectionPageJsonLd({
				name: title,
				description: metaDescription,
				url: metaUrl,
				image: metaImage,
				items: posts.map((post) => ({
					name: post.meta.title ?? 'Bodha essay',
					url: post.linkpath,
					description: post.meta.excerpt ?? ''
				}))
			})
		)
	);

	function postCategories(post: BlogPost) {
		const category = post.meta.category;
		const categories = Array.isArray(category) ? category : category ? [category] : [];
		return categories.map((item) => item.trim()).filter(Boolean);
	}

	function authors(post: BlogPost) {
		return post.meta.author ?? [];
	}

	function primaryCategory(post: BlogPost) {
		return postCategories(post)[0] ?? 'Essay';
	}

	function writerUrl(writer: string) {
		return `/blog/writers/${encodeURIComponent(writer)}`;
	}

	function tagUrl(tag: string) {
		return `/blog/tags/${encodeURIComponent(tag)}`;
	}
</script>

<Head
	{title}
	{metaDescription}
	{metaUrl}
	{metaImage}
	imWidth="2560"
	imHeight="1440"
	{jsonld}
/>

<Container narrow={true} scaled={true}>
	<div class="box std padded-ontop blog-index">
		<Crumb item1="Bodha" item1Link="/" showT={true} title="Blog" showD={true} desc={metaDescription} showRow={true}>
			<div class="row cgap8 rgap8 mwrap blog-tabs">
				<button class="nav-btn active">Essays</button>
				<a class="nav-btn" href="#external-posts">External Posts</a>
				<a class="nav-btn" href="/blog/writers">Writers</a>
				<a class="nav-btn" href="/blog/tags">Tags</a>
			</div>
		</Crumb>

		<div class="editorial-layout">
			{#if heroPosts.length > 0}
				<section class="lead-panel">
					<a class="featured-essay blank" href={heroPosts[0].linkpath}>
						{#if heroPosts[0].meta.image}
							<img src={heroPosts[0].meta.image} alt={heroPosts[0].meta.title} />
						{/if}
						<div class="featured-overlay"></div>
						<div class="featured-copy">
							<p class="feature-label tag-text tt-u">Featured Essay</p>
							<h2 class="source-serif">{heroPosts[0].meta.title}</h2>
							<div class="row wrap cgap4 rgap4">
								{#each postCategories(heroPosts[0]) as category}
									<span class="tag-pill">{category}</span>
								{/each}
							</div>
							<div class="feature-meta row wrap cgap8 rgap8 ycenter">
								{#each authors(heroPosts[0]) as author}
									<span>{author}</span>
								{/each}
								<span>{heroPosts[0].formattedDate}</span>
								{#if heroPosts[0].meta.words}
									<span>{heroPosts[0].meta.words} words</span>
								{/if}
							</div>
						</div>
					</a>
				</section>

				<section class="highlight-panel" aria-label="Highlighted essays">
					{#each heroPosts.slice(1) as post, i}
						<a class="highlight-card blank" class:with-image={i === 0} href={post.linkpath}>
							{#if i === 0 && post.meta.image}
								<img src={post.meta.image} alt={post.meta.title} />
							{/if}
							<div class="highlight-copy">
								<p class="tag-text tt-u blue-dark">{primaryCategory(post)}</p>
								<h3 class="source-serif">{post.meta.title}</h3>
								<div class="row wrap cgap4 rgap4">
									{#each (post.meta.tags ?? []).slice(0, 3) as tag}
										<span class="tag-pill">{tag.replaceAll('-', ' ')}</span>
									{/each}
								</div>
								<p class="small-text lgrey">{post.formattedDate} · {post.meta.words ?? ' '} words</p>
							</div>
						</a>
					{/each}
				</section>
			{/if}

			<aside class="blog-sidebar">
				<section class="sidebar-section">
					<p class="tag-text tt-u blue-dark">Latest essays</p>
					<div class="latest-list">
						{#each latestPosts.slice(0, 5) as post, i}
							<a class="latest-item blank" href={post.linkpath}>
								<span class="source-serif latest-number">{String(i + 1).padStart(2, '0')}</span>
								<div class="column rgap4">
									<p class="source-serif bold tight">{post.meta.title}</p>
									<p class="tag-text tt-u grey">{post.formattedDate}</p>
								</div>
							</a>
						{/each}
					</div>
				</section>

				<section class="sidebar-section" id="external-posts">
					<p class="tag-text tt-u blue-dark">External posts</p>
					<div class="external-list">
						{#each externalPosts.slice(0, 3) as post}
							<a class="external-item blank" href={post.route} target="_blank" rel="noreferrer">
								<div class="external-thumb"></div>
								<div class="column rgap4">
									<p class="source-serif bold tight">{post.title}</p>
									<p class="tag-text tt-u grey">{post.tags?.[0]?.replaceAll('-', ' ') ?? 'External'}</p>
								</div>
							</a>
						{/each}
					</div>
				</section>

				<section class="sidebar-section">
					<div class="row xbetween ycenter">
						<p class="tag-text tt-u blue-dark">Writers</p>
						<a class="small-text linked" href="/blog/writers">View all</a>
					</div>
					<div class="writer-row">
						{#each writers.slice(0, 5) as item}
							<a class="writer-avatar blank" href={writerUrl(item.writer)} title={item.writer}>
								<span>{item.writer.slice(0, 1)}</span>
							</a>
						{/each}
					</div>
				</section>

				<section class="sidebar-section">
					<p class="tag-text tt-u blue-dark">Popular tags</p>
					<div class="chip-cloud">
						{#each tags.slice(0, 8) as item}
							<a class="tag-pill tt-u" href={tagUrl(item.tag)}>{item.tag.replaceAll('-', ' ')}</a>
						{/each}
					</div>
				</section>
			</aside>

			<section class="article-panel">
				<div class="row xbetween-mleft ycenter mcol mleft cgap8 rgap8">
					<div class="column rgap8">
						<p class="tag-text tt-u lgrey">{gridPosts.length} essays</p>
						<h2 class="source-serif section-title">Essays by category</h2>
					</div>
					<div class="row wrap cgap8 rgap8">
						<button class="nav-btn" class:active={selectedCategory === 'All'} onclick={() => (selectedCategory = 'All')}>
							All <span>{posts.length}</span>
						</button>
						{#each categories as item}
							<button
								class="nav-btn"
								class:active={selectedCategory === item.category}
								onclick={() => (selectedCategory = item.category)}
							>
								{item.category} <span>{item.count}</span>
							</button>
						{/each}
					</div>
				</div>

				<div class="article-grid">
					{#each articlePosts as post}
						<article class="essay-card whitestone">
							<a class="essay-media blank" href={post.linkpath}>
								{#if post.meta.image}
									<img src={post.meta.image} alt={post.meta.title} />
								{/if}
							</a>
							<div class="essay-body">
								<div class="row wrap cgap4 rgap4">
									{#each postCategories(post) as category}
										<span class="tag-pill themed tt-u">{category}</span>
									{/each}
								</div>
								<a class="blank column rgap8" href={post.linkpath}>
									<p class="tag-text tt-u lgrey">{post.formattedDate}</p>
									<h3 class="source-serif">{post.meta.title}</h3>
									<p class="small-text grey">{post.meta.excerpt}</p>
								</a>
							</div>
							<div class="essay-foot">
								<div class="row wrap cgap4 rgap4 ycenter">
									{#each authors(post) as author}
										<a class="writer-chip blank" href={writerUrl(author)}>{author}</a>
									{/each}
									{#if post.meta.words}
										<span class="small-text lgrey">{post.meta.words} words</span>
									{/if}
								</div>
								<div class="row wrap cgap4 rgap4">
									{#each post.meta.tags ?? [] as tag}
										<a class="tag-pill tt-u" href={tagUrl(tag)}>{tag.replaceAll('-', ' ')}</a>
									{/each}
								</div>
							</div>
						</article>
					{/each}
				</div>
			</section>
		</div>
	</div>
</Container>

<style lang="sass">
.blog-index
	padding-bottom: 5rem

.blog-tabs
	@media screen and (min-width: 1025px)
		justify-content: center

.editorial-layout
	display: grid
	align-items: start
	@media screen and (min-width: 1025px)
		grid-template-columns: minmax(0, 1.34fr) minmax(300px, 0.74fr) 300px
		column-gap: 1px
		row-gap: 1px
		background: var(--color-alt-2)
		border-top: var(--border-dark)
		border-bottom: var(--border-dark)
	@media screen and (max-width: 1024px)
		gap: 1rem

.lead-panel, .highlight-panel, .article-panel, .blog-sidebar
	background: var(--color-back)

.lead-panel
	min-width: 0

.featured-essay
	position: relative
	display: flex
	min-height: 560px
	overflow: hidden
	background: var(--color-stone)
	@media screen and (min-width: 1025px)
		height: 100%
	@media screen and (max-width: 1024px)
		border: var(--border-main)
		min-height: 460px
	@media screen and (max-width: 640px)
		min-height: 420px

.featured-essay:hover img, .highlight-card:hover img, .essay-card:hover .essay-media img
	transform: scale(1.04)

.featured-essay img
	position: absolute
	inset: 0
	width: 100%
	height: 100%
	object-fit: cover
	transition: transform 0.28s ease
	filter: grayscale(0.2)

.featured-overlay
	position: absolute
	inset: 0
	background: linear-gradient(90deg, rgba(255,255,255,0.94), rgba(255,255,255,0.72) 48%, rgba(255,255,255,0.2))

.featured-copy
	position: relative
	z-index: 1
	display: flex
	flex-direction: column
	justify-content: center
	gap: 1.1rem
	width: 82%
	padding: 2rem 2.4rem
	h2
		font-size: clamp(2.8rem, 4.2vw, 4.8rem)
		line-height: 1.06
		letter-spacing: 0
	@media screen and (max-width: 640px)
		width: 100%
		padding: 1.35rem
		h2
			font-size: 2.45rem

.feature-label
	width: max-content
	padding: 6px 10px
	background: var(--color-theme-2)
	color: var(--color-back)
	font-weight: 700

.feature-meta
	margin-top: 1rem
	font-size: 0.72rem
	font-weight: 600
	text-transform: uppercase
	color: var(--color-primary)
	span:not(:last-child)::after
		content: "·"
		margin-left: 0.6rem
		color: var(--color-grey-2)

.highlight-panel
	display: grid
	gap: 1px
	min-width: 0
	@media screen and (min-width: 1025px)
		min-height: 560px
		grid-template-rows: auto 1fr
	@media screen and (max-width: 1024px)
		gap: 1rem

.highlight-card
	min-width: 0
	display: grid
	background: var(--color-back)
	border: var(--border-main)
	overflow: hidden
	&.with-image
		grid-template-rows: 180px auto
	img
		width: 100%
		height: 100%
		object-fit: cover
		display: block
		transition: transform 0.28s ease
		filter: grayscale(0.4)
	@media screen and (min-width: 1025px)
		border: none

.highlight-copy
	display: flex
	flex-direction: column
	gap: 0.8rem
	padding: 1.2rem
	h3
		font-size: 1.55rem
		line-height: 1.12
		letter-spacing: 0
	@media screen and (max-width: 640px)
		h3
			font-size: 1.55rem

.article-panel
	display: flex
	flex-direction: column
	gap: 1rem
	padding-top: 1rem
	min-width: 0
	@media screen and (min-width: 1025px)
		grid-column: 1 / 3
		padding-right: 1rem
	@media screen and (max-width: 1024px)
		padding-top: 0

.section-title
	font-size: var(--typeH2)
	letter-spacing: 0

.article-grid
	display: grid
	gap: 1px
	background: var(--color-alt-2)
	border: var(--border-dark)
	overflow: hidden
	@media screen and (min-width: 1025px)
		grid-template-columns: repeat(2, minmax(0, 1fr))
	@media screen and (max-width: 1024px)
		background: transparent
		border: none
		gap: 1rem

.essay-card
	display: grid
	grid-template-columns: 190px 1fr
	min-width: 0
	background: var(--color-back)
	@media screen and (max-width: 1024px)
		display: flex
		flex-direction: column
		border: var(--border-main)

.essay-media
	height: 100%
	min-height: 168px
	display: block
	overflow: hidden
	background: var(--color-stone)
	@media screen and (max-width: 640px)
		height: 210px

.essay-media img
	width: 100%
	height: 100%
	object-fit: cover
	display: block
	transition: transform 0.28s ease

.essay-body
	display: flex
	flex-direction: column
	gap: 0.8rem
	padding: 1.2rem 1.35rem
	flex: 1
	h3
		font-size: 1.55rem
		line-height: 1.16
		letter-spacing: 0

.essay-foot
	grid-column: 1 / 3
	display: flex
	flex-direction: column
	gap: 0.75rem
	padding: 0.9rem 1.35rem
	border-top: 1px solid rgba(0,0,0,0.06)

.blog-sidebar
	display: flex
	flex-direction: column
	gap: 1px
	background: var(--color-back)
	position: sticky
	top: 6rem
	min-width: 0
	@media screen and (min-width: 1025px)
		grid-column: 3
		grid-row: 1 / 3
		border-left: var(--border-dark)
	@media screen and (max-width: 1024px)
		position: static
		background: transparent
		border: none
		gap: 1rem

.sidebar-section
	display: flex
	flex-direction: column
	gap: 1rem
	padding: 1rem
	background: var(--color-back)
	border-bottom: var(--border-main)
	@media screen and (max-width: 1024px)
		border: var(--border-main)

.latest-list, .external-list
	display: flex
	flex-direction: column

.latest-item
	display: grid
	grid-template-columns: 48px 1fr
	gap: 0.8rem
	padding: 0.8rem 0
	border-top: var(--border-main)
	background: var(--color-back)
	transition: background 0.08s ease
	&:hover
		background: var(--color-stone)

.latest-number
	font-size: 2rem
	line-height: 1
	color: var(--color-theme-2)

.external-item
	display: grid
	grid-template-columns: 64px 1fr
	gap: 0.8rem
	padding: 0.8rem 0
	border-top: var(--border-main)

.external-thumb
	aspect-ratio: 1 / 1
	background: linear-gradient(135deg, var(--color-stone), var(--color-grey-1))

.chip-cloud
	display: flex
	flex-wrap: wrap
	gap: 5px

.writer-row
	display: flex
	gap: 0.6rem
	flex-wrap: wrap

.writer-avatar
	display: flex
	align-items: center
	justify-content: center
	width: 42px
	height: 42px
	border-radius: 50%
	border: var(--border-main)
	background: var(--color-stone)
	color: var(--color-theme-2)
	font-weight: 700
	font-size: 0.9rem
	&:hover
		background: var(--color-theme-2)
		color: var(--color-back)

.writer-chip
	display: inline-flex
	align-items: center
	gap: 5px
	width: max-content
	max-width: 100%
	padding: 5px 9px
	border: 1px solid var(--color-grey-1)
	border-radius: 3px
	background: var(--color-grey-4)
	color: var(--color-alt-3)
	font-size: 0.68rem
	font-weight: 600
	line-height: 1.1
	text-transform: uppercase
	transition: all 0.08s ease
	&:hover
		background: var(--color-theme-2)
		color: var(--color-back)

.nav-btn span
	margin-left: 4px
	opacity: 0.72
</style>
