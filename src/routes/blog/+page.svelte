<script lang="ts">
	import { tick } from 'svelte';
	import type { PageData } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import '$lib/styles/system/blog.sass';
	import BlogMenu from '$lib/icons/blog-menu.svelte';
	import ResponsiveMenu from '$lib/comps/responsive-menu-2.svelte';
	import ResponsiveMenu2 from '$lib/comps/responsive-menu-2.svelte';
	import { absoluteImage, absoluteUrl, collectionPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';
	import { allWriters } from '$lib/utils/localsends';

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
		platform: string;
	};

	type TagCount = {
		tag: string;
		count: number;
	};

	let { data }: { data: PageData } = $props();
	let selectedCategory = $state('All');
	let categoryMenuOpen = $state(false);
	let firstCategoryItem: HTMLButtonElement | undefined = $state();
	let visibleArticleCount = $state(12);

	let posts = $derived((data.posts ?? []) as BlogPost[]);
	let categories = $derived((data.categories ?? []) as CategoryCount[]);
	let externalPosts = $derived(((data.externalPosts ?? []) as ExternalPost[]).slice(0, 6));
	let tags = $derived(((data.tags ?? []) as TagCount[]).slice(0, 18));
	let heroPosts = $derived(posts.slice(0, 3));
	let gridPosts = $derived(posts.filter((post) => selectedCategory === 'All' || postCategories(post).includes(selectedCategory)));
	let articlePosts = $derived(gridPosts.filter((post) => !heroPosts.some((hero) => hero.linkpath === post.linkpath)));
	let visibleArticlePosts = $derived(articlePosts.slice(0, visibleArticleCount));
	let hasMoreArticles = $derived(visibleArticleCount < articlePosts.length);

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

	function tagUrl(tag: string) {
		return `/blog/tags/${encodeURIComponent(tag)}`;
	}

	function closeCategoryMenu() {
		categoryMenuOpen = false;
	}

	function selectCategory(category: string) {
		selectedCategory = category;
		visibleArticleCount = 12;
		closeCategoryMenu();
	}

	function loadMoreArticles() {
		visibleArticleCount = Math.min(visibleArticleCount + 12, articlePosts.length);
	}

	function onWindowKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeCategoryMenu();
		}
	}

	$effect(() => {
		if (!categoryMenuOpen) return;

		tick().then(() => {
			firstCategoryItem?.focus();
		});
	});
</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="2560" imHeight="1440" {jsonld} />

<Container>
	<section class="box wrapper-std header-margin">
		<Crumb showT={false} title="Bodha Blog" showRow={true}>
			<ResponsiveMenu>
				<a class="small-button tt-u" href="/blog/external-posts">External Posts</a>
				<a class="small-button tt-u" href="/blog/writers">Writers</a>
				<a class="small-button tt-u" href="/blog/tags">Tags</a>
			</ResponsiveMenu>
		</Crumb>
		<div class="blog-wrapper">
			<div class="editorial-layout">
				{#if heroPosts.length > 0}
					<section class="lead-panel lg:ptop32">
						<a class="featured-essay blank" href={heroPosts[0].linkpath}>
							{#if heroPosts[0].meta.image}
								<enhanced:img class="featured-essay-image" src={heroPosts[0].meta.image} alt={heroPosts[0].meta.title} />
							{/if}
							<div class="featured-overlay"></div>
							<div class="featured-copy">
								<p class="white width90 desc">{heroPosts[0].meta.excerpt}</p>
								<h2 class="card-title white">{heroPosts[0].meta.title}</h2>
								<div class="row wrap cgap8 rgap8 ycenter">
									{#each authors(heroPosts[0]) as author}
										<p class="citation white">{author} |</p>
									{/each}
									<p class="citation white">{heroPosts[0].formattedDate} |</p>
									{#if heroPosts[0].meta.words}
										<p class="citation white">{heroPosts[0].meta.words} words</p>
									{/if}
								</div>
								<div class="row wrap cgap4 rgap4">
									{#each postCategories(heroPosts[0]) as category}
										<span class="cite tt-u">{category}</span>
									{/each}
								</div>
							</div>
						</a>
					</section>
					<section class="highlight-panel lg:ptop32" aria-label="Highlighted essays">
						{#each heroPosts.slice(1) as post, i}
							<a class="box rgap16 blank hc{i}" class:with-image={i === 0} href={post.linkpath}>
								{#if i === 0 && post.meta.image}
									<enhanced:img class="std radius" src={post.meta.image} alt={post.meta.title} />
								{/if}
								<div class="box pbot8">
									<p class="cite tt-u grey">{primaryCategory(post)}</p>
									<p class="highlight-text bold tight">{post.meta.title}</p>
									<div class="row wrap cgap4 rgap4 ptop8">
										{#each (post.meta.tags ?? []).slice(0, 3) as tag, i}
											<p class="cite hollow themed tt-u dead">
												{#if i > 0}|
												{/if}
												{tag.replaceAll('-', ' ')}
											</p>
										{/each}
									</div>
									<p class="cite lgrey">{post.formattedDate} · {post.meta.words ?? ' '} words</p>
								</div>
							</a>
						{/each}
					</section>
				{/if}
				<aside class="blog-sidebar lg:ptop32">
					<section class="sidebar-section" id="external-posts">
						<a class="cite tt-u blue-dark section-titler" href="/blog/external">External posts</a>
						<div class="external-list">
							{#each externalPosts.slice(0, 6) as post}
								<a class="external-item blank" href={post.route} target="_blank" rel="noreferrer">
									<div class="box rgap4">
										<p class="w500 tight">{post.title}</p>
										<p class="cite tt-u lgrey">{post.platform}</p>
									</div>
								</a>
							{/each}
						</div>
					</section>
					<section class="sidebar-section lg:ptop16 lg:pbot16" id="writers-section">
						<div class="row xbetween ycenter">
							<a class="cite tt-u blue-dark section-titler" href="/blog/writers">Writers</a>
						</div>
						<div class="writer-row">
							{#each allWriters as item}
								<a class="writer-avatar blank" href={item.link}>
									<img class="writer-av" src={item.image} alt={item.writer} />
								</a>
							{/each}
						</div>
					</section>
					<section class="sidebar-section lg:ptop16" id="tags-section">
						<a class="cite tt-u blue-dark section-titler" href="/blog/tags">Popular tags</a>
						<div class="chip-cloud">
							{#each tags.slice(0, 8) as item}
								<a class="cite tt-u" href={tagUrl(item.tag)}>{item.tag.replaceAll('-', ' ')}</a>
							{/each}
						</div>
					</section>
				</aside>
				<section class="article-panel lg:ptop32 lg:pbot32">
					<div class="row xbetween-mleft ycenter mcol mleft cgap8 rgap8">
						<p class="highlight-text w500">Essays by Category</p>

						<ResponsiveMenu2>
							<button class="small-button" class:active={selectedCategory === 'All'} onclick={() => selectCategory('All')}>
								All <span>{posts.length}</span>
							</button>
							{#each categories as item}
								<button class="small-button" class:active={selectedCategory === item.category} onclick={() => selectCategory(item.category)}>
									{item.category} <span>{item.count}</span>
								</button>
							{/each}
						</ResponsiveMenu2>
					</div>
					<div class="article-grid radius">
						{#each visibleArticlePosts as post}
							<article class="essay-holder p8 lg:p16 ncolor-inv">
								<div class="essay-holder-left">
									{#if post.meta.image}
										<enhanced:img class="essay-holder-image" src={post.meta.image} alt={post.meta.title} />
									{/if}
									<div class="row wrap essay-tags rgap4 cgap4">
										{#each post.meta.tags ?? [] as tag}
											<a class="cite tt-u" href={tagUrl(tag)}>{tag.replaceAll('-', ' ')}</a>
										{/each}
									</div>
								</div>
								<a class="essay-holder-right blank box rgap16" style="height: 100%" href={post.linkpath}>
									<p class="body-text bold tight">{post.meta.title}</p>
									<p class="tight lgrey">{post.meta.excerpt}</p>
									<p class="cite tt-u lgrey self-bottom bordertop ptop8">{post.meta.author} | {post.meta.words} words</p>
								</a>
							</article>
						{/each}
					</div>
					{#if hasMoreArticles}
						<div class="load-more-wrap">
							<button class="load-more-button" type="button" onclick={loadMoreArticles}>
								Load more articles
								<span>{Math.min(visibleArticleCount, articlePosts.length)} / {articlePosts.length}</span>
							</button>
						</div>
					{/if}
				</section>
			</div>
		</div>
	</section>
</Container>

<style lang="sass">

#external-posts
	@media (max-width: 1024px)
		gap: 0
		padding-top: 0
		.section-titler
			padding-top: 1rem
			padding-left: 1rem
			padding-bottom: 1rem
			background: var(--color-grey-2)
			color: #FFFFFF
			&:hover
				color: var(--color-theme)

#writers-section, #tags-section
	@media (max-width: 1024px)
		padding: 2rem 1rem
		border-radius: 8px

.editorial-layout
	display: grid
	align-items: start
	@media screen and (min-width: 1025px)
		grid-template-columns: 2fr 1fr 1fr
		column-gap: 2rem
		row-gap: 1px
		border-bottom: var(--border-dark)
	@media screen and (max-width: 1024px)
		gap: 1rem
		padding-top: 1rem

.lead-panel, .highlight-panel, .article-panel, .blog-sidebar
	background: var(--color-back)

.featured-essay
	position: relative
	display: flex
	height: 660px
	overflow: hidden
	border-radius: 8px
	@media screen and (min-width: 1025px)
		height: 520px
		.featured-copy h2.card-title
			transition: transform 0.28s ease
		.featured-copy p.desc
			opacity: 0
		&:hover
			.featured-copy p.desc
				opacity: 1
			.featured-overlay
				background: linear-gradient(0deg, rgba(0,0,0,0.94), rgba(0,0,0,0.52) 48%, rgba(0,0,0,0.3))

.featured-essay-image
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
	background: linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,0) 48%, rgba(0,0,0,0.9))
	transition: opacity 0.28s ease

.featured-copy
	position: relative
	z-index: 1
	display: flex
	flex-direction: column
	justify-content: flex-end
	gap: 0.5rem
	padding: 1rem
	p
		transition: opacity 0.28s ease
	@media screen and (min-width: 1025px)
		padding: 2rem

.highlight-panel
	display: grid
	gap: 1px
	@media screen and (min-width: 1025px)
		min-height: 520px
		grid-template-rows: auto 1fr
		row-gap: 1rem
	@media screen and (max-width: 1024px)
		gap: 1rem

.highlight-card
	display: grid
	overflow: hidden
	&.with-image
		grid-template-rows: 160px auto
	@media screen and (min-width: 1025px)
		&.with-image
			grid-template-rows: 200px auto

.hc0
	border-bottom: var(--border-main)
	@media screen and (max-width: 1024px)
		padding-bottom: 1rem

.article-panel
	display: flex
	flex-direction: column
	gap: 1rem
	min-width: 0
	@media screen and (min-width: 1025px)
		grid-column: 1 / 3
		border-top: var(--border-dark)
		margin-top: 2rem
		gap: 2rem

.article-grid
	display: grid
	gap: 1px
	background: var(--color-stone-2)
	border: var(--border-dark)
	overflow: hidden
	@media screen and (min-width: 1025px)
		grid-template-columns: repeat(2, minmax(0, 1fr))
		background: var(--color-back)
	@media screen and (max-width: 1024px)
		border: none
		gap: 1rem

.essay-holder
	display: grid
	grid-template-columns: 1fr
	margin-bottom: 2rem	
	row-gap: 1rem
	@media screen and (min-width: 1025px)
		grid-template-columns: 200px 1fr
		margin-bottom: 0
		.essay-holder-right
			padding-left: 1.3rem

.essay-holder-image
	width: 100%
	object-fit: cover
	transition: transform 0.28s ease
	@media (max-width: 1024px)
		margin-bottom: 1rem

.load-more-wrap
	display: flex
	justify-content: center

.load-more-button
	display: inline-flex
	align-items: center
	justify-content: center
	padding: 0.5em
	gap: 0.75rem
	min-width: min(100%, 280px)
	border: var(--border-dark)
	border-radius: 4px
	background: var(--color-back)
	color: var(--color-primary)
	font-family: var(--fontface-sans)
	font-size: 0.78rem
	font-weight: 700
	letter-spacing: 0.02rem
	text-transform: uppercase
	transition: background 0.08s ease, color 0.08s ease, border-color 0.08s ease
	span
		color: var(--color-grey-0)
		font-size: 0.68rem
		font-weight: 600
	&:hover
		background: var(--color-theme-dark)
		border-color: var(--color-theme-dark)
		color: var(--color-back)
		span
			color: var(--color-back)

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
		top: 80px
		height: calc(100vh - 80px)
		padding-left: 2rem
		overflow-y: scroll
	@media screen and (max-width: 1024px)
		position: static
		background: transparent
		border: none
		gap: 1rem

.sidebar-section
	gap: 1rem
	display: flex
	flex-direction: column
	background: var(--color-back)
	border-bottom: var(--border-dark)
	@media screen and (max-width: 1024px)
		border: var(--border-main)
	@media screen and (min-width: 1025px)
		&:last-child
			border-bottom: none

.latest-list
	display: flex
	flex-direction: column

.external-list
	display: grid
	grid-template-columns: 1fr 1fr
	@media (min-width: 1025px)
		display: flex
		flex-direction: column

.latest-item
	display: grid
	grid-template-columns: 48px 1fr
	gap: 0.8rem
	border-top: var(--border-main)
	background: var(--color-back)
	transition: background 0.08s ease
	&:hover
		background: var(--color-stone-1)

.latest-number
	font-size: 2rem
	line-height: 1
	color: var(--color-theme-dark)

.external-item
	gap: 0.8rem
	border-top: var(--border-main)
	padding-top: 1rem
	padding-bottom: 1rem
	@media (max-width: 1024px)
		padding-left: 1rem
		padding-right: 1rem
		background: var(--color-back)

.chip-cloud
	display: flex
	flex-wrap: wrap
	gap: 5px

.writer-row
	display: flex
	gap: 1rem
	flex-wrap: wrap

.writer-avatar
	display: flex
	align-items: center
	justify-content: center
	width: 56px
	height: 56px
	border-radius: 50%
	overflow: hidden
	border: var(--border-main)
	img
		object-fit: cover
		width: 100%
		height: 100%
		filter: grayscale(0.5)
	&:hover
		img
			filter: grayscale(0)

.writer-chip
	display: inline-flex
	align-items: center
	gap: 5px
	width: max-content
	max-width: 100%
	border: 1px solid var(--color-grey-0)
	border-radius: 3px
	background: var(--color-grey-2)
	color: var(--color-stone-3)
	font-size: 0.68rem
	font-weight: 600
	line-height: 1.1
	text-transform: uppercase
	transition: all 0.08s ease
	&:hover
		background: var(--color-theme-dark)
		color: var(--color-back)

</style>
