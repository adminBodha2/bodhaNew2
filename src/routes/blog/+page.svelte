<script lang="ts">
	import { tick } from 'svelte';
	import type { PageData } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Heading from '$lib/comps/page-header-one.svelte';
	import BlogMenu from '$lib/icons/blog-menu.svelte';
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

	type WriterCount = {
		writer: string;
		count: number;
	};

	let { data }: { data: PageData } = $props();
	let selectedCategory = $state('All');
	let mobileMenuOpen = $state(false);
	let categoryMenuOpen = $state(false);
	let firstMenuItem: HTMLButtonElement | undefined = $state();
	let firstCategoryItem: HTMLButtonElement | undefined = $state();
	let visibleArticleCount = $state(12);

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
	let visibleArticlePosts = $derived(articlePosts.slice(0, visibleArticleCount));
	let hasMoreArticles = $derived(visibleArticleCount < articlePosts.length);
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

	function closeMobileMenu() {
		mobileMenuOpen = false;
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
			closeMobileMenu();
			closeCategoryMenu();
		}
	}

	$effect(() => {
		if (!mobileMenuOpen) return;

		tick().then(() => {
			firstMenuItem?.focus();
		});
	});

	$effect(() => {
		if (!categoryMenuOpen) return;

		tick().then(() => {
			firstCategoryItem?.focus();
		});
	});
</script>

<svelte:window onkeydown={onWindowKeydown} />

<Head
	{title}
	{metaDescription}
	{metaUrl}
	{metaImage}
	imWidth="2560"
	imHeight="1440"
	{jsonld}
/>

<Container>
	<Heading title="Blog | Bodha"/>
	<div class="textbox blog-wrapper">
		<div class="row cgap8 rgap8 mwrap xleft selection-row ycenter">
			<p class="tag-text tt-u" style="margin-right: 1rem; font-weight: bold">Bodha Blog</p>
			<a class="small-button tt-u" href="/blog/external-posts">External Posts</a>
			<a class="small-button tt-u" href="/blog/writers">Writers</a>
			<a class="small-button tt-u" href="/blog/tags">Tags</a>
		</div>
		<div class="mobile-selection-menu">
			<button
				class="mobile-menu-trigger"
				type="button"
				aria-haspopup="menu"
				aria-expanded={mobileMenuOpen}
				aria-controls="test-anveshi-selection-menu"
				onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
			>
				<span class="row ycenter cgap8">
					<BlogMenu size="20" color="currentColor" />
					<span>Browse</span>
				</span>
				<span class="menu-state" aria-hidden="true">{mobileMenuOpen ? 'Close' : 'Menu'}</span>
			</button>
			{#if mobileMenuOpen}
				<button class="mobile-menu-scrim" type="button" aria-label="Close menu" onclick={closeMobileMenu}></button>
				<div id="test-anveshi-selection-menu" class="mobile-menu-content" role="menu" aria-label="Blog navigation">
					<div class="mobile-menu-arrow"></div>
					<button
						bind:this={firstMenuItem}
						class="mobile-menu-item active"
						type="button"
						role="menuitem"
						onclick={closeMobileMenu}
					>
						<span>Essays</span>
						<span class="item-note">{posts.length}</span>
					</button>
					<a class="mobile-menu-item" role="menuitem" href="/blog/external-posts" onclick={closeMobileMenu}>
						<span>External Posts</span>
					</a>
					<a class="mobile-menu-item" role="menuitem" href="/blog/writers" onclick={closeMobileMenu}>
						<span>Writers</span>
					</a>
					<a class="mobile-menu-item" role="menuitem" href="/blog/tags" onclick={closeMobileMenu}>
						<span>Tags</span>
					</a>
				</div>
			{/if}
		</div>
		<div class="editorial-layout">
			{#if heroPosts.length > 0}
				<section class="lead-panel">
					<a class="featured-essay blank" href={heroPosts[0].linkpath}>
						{#if heroPosts[0].meta.image}
							<img src={heroPosts[0].meta.image} alt={heroPosts[0].meta.title} />
						{/if}
						<div class="featured-overlay"></div>
						<div class="featured-copy">
							<h2 class="card-title white">{heroPosts[0].meta.title}</h2>
							<p class="descriptor-text tight white width90">{heroPosts[0].meta.excerpt}</p>
							<div class="box labelbox">
							<div class="row wrap cgap8 rgap8 ycenter">
								{#each authors(heroPosts[0]) as author}
									<p class="tag-text white">{author}</p>
								{/each}
								<p class="tag-text white">{heroPosts[0].formattedDate}</p>
								{#if heroPosts[0].meta.words}
									<p class="tag-text white">{heroPosts[0].meta.words} words</p>
								{/if}
							</div>
							<div class="row wrap cgap4 rgap4">
								{#each postCategories(heroPosts[0]) as category}
									<span class="tag-pill tt-u">{category}</span>
								{/each}
							</div>
							</div>
						</div>
					</a>
				</section>
				<section class="highlight-panel" aria-label="Highlighted essays">
					{#each heroPosts.slice(1) as post, i}
						<a class="highlight-card blank hc{i}" class:with-image={i === 0} href={post.linkpath}>
							{#if i === 0 && post.meta.image}
								<img src={post.meta.image} alt={post.meta.title} />
							{/if}
							<div class="labelbox tight-padded">
								<p class="tag-text tt-u grey">{primaryCategory(post)}</p>
								<p class="paragraph-text bold tight">{post.meta.title}</p>
								<div class="row wrap cgap4 rgap4">
									{#each (post.meta.tags ?? []).slice(0, 3) as tag}
										<p class="tag-pill hollow themed tt-u">{tag.replaceAll('-', ' ')}</p>
									{/each}
								</div>
								<p class="tag-text lgrey">{post.formattedDate} · {post.meta.words ?? ' '} words</p>
							</div>
						</a>
					{/each}
				</section>
			{/if}
			<aside class="blog-sidebar">
				<section class="sidebar-section" id="external-posts">
					<a class="tag-text tt-u blue-dark section-titler" href="/blog/external">External posts</a>
					<div class="external-list">
						{#each externalPosts.slice(0, 6) as post}
							<a class="external-item blank" href={post.route} target="_blank" rel="noreferrer">
								<div class="column rgap4">
									<p class="rem1 bold tight">{post.title}</p>
									<p class="tag-text tt-u lgrey">{post.platform}</p>
								</div>
							</a>
						{/each}
					</div>
				</section>
				<section class="sidebar-section">
					<div class="row xbetween ycenter">
						<a class="tag-text tt-u blue-dark section-titler" href="/blog/writers">Writers</a>
					</div>
					<div class="writer-row">
						{#each allWriters as item}
							<a class="writer-avatar blank" href={item.link}>
								<img class="writer-av" src={item.image} alt={item.writer}/>
							</a>
						{/each}
					</div>
				</section>
				<section class="sidebar-section">
					<a class="tag-text tt-u blue-dark section-titler" href="/blog/tags">Popular tags</a>
					<div class="chip-cloud">
						{#each tags.slice(0, 8) as item}
							<a class="tag-pill tt-u" href={tagUrl(item.tag)}>{item.tag.replaceAll('-', ' ')}</a>
						{/each}
					</div>
				</section>
			</aside>
			<section class="article-panel">
				<div class="row xbetween-mleft ycenter mcol mleft cgap8 rgap8">
					<p class="paragraph-text bold">Essays by Category</p>
					<div class="row wrap cgap8 rgap8 category-selection">
						<button class="nav-btn" class:active={selectedCategory === 'All'} onclick={() => selectCategory('All')}>
							All <span>{posts.length}</span>
						</button>
						{#each categories as item}
							<button
								class="nav-btn"
								class:active={selectedCategory === item.category}
								onclick={() => selectCategory(item.category)}
							>
								{item.category} <span>{item.count}</span>
							</button>
						{/each}
					</div>
					<div class="mobile-category-menu">
						<button
							class="mobile-menu-trigger category-trigger"
							type="button"
							aria-haspopup="menu"
							aria-expanded={categoryMenuOpen}
							aria-controls="test-anveshi-category-menu"
							onclick={() => {
								categoryMenuOpen = !categoryMenuOpen;
								mobileMenuOpen = false;
							}}
						>
							<span class="row ycenter cgap8">
								<BlogMenu size="20" color="currentColor" />
								<span>{selectedCategory}</span>
							</span>
							<span class="menu-state" aria-hidden="true">{categoryMenuOpen ? 'Close' : 'Filter'}</span>
						</button>

						{#if categoryMenuOpen}
							<button class="mobile-menu-scrim" type="button" aria-label="Close category menu" onclick={closeCategoryMenu}></button>
							<div id="test-anveshi-category-menu" class="mobile-menu-content" role="menu" aria-label="Essay categories">
								<div class="mobile-menu-arrow"></div>
								<button
									bind:this={firstCategoryItem}
									class="mobile-menu-item"
									class:active={selectedCategory === 'All'}
									type="button"
									role="menuitemradio"
									aria-checked={selectedCategory === 'All'}
									onclick={() => selectCategory('All')}
								>
									<span>All</span>
									<span class="item-note">{posts.length}</span>
								</button>
								{#each categories as item}
									<button
										class="mobile-menu-item"
										class:active={selectedCategory === item.category}
										type="button"
										role="menuitemradio"
										aria-checked={selectedCategory === item.category}
										onclick={() => selectCategory(item.category)}
									>
										<span>{item.category}</span>
										<span class="item-note">{item.count}</span>
									</button>
								{/each}
							</div>
						{/if}
					</div>
				</div>
				<div class="article-grid">
					{#each visibleArticlePosts as post}
						<article class="essay-holder whitestone">
							<div class="essay-holder-left">
								<img src={post.meta.image} alt={post.meta.title} />
									<div class="row wrap essay-tags">
										{#each post.meta.tags ?? [] as tag}
											<a class="tag-pill tt-u" href={tagUrl(tag)}>{tag.replaceAll('-', ' ')}</a>
										{/each}
									</div>
							</div>
							<a class="essay-holder-right blank labelbox" style="height: 100%" href={post.linkpath}>
								<p class="paragraph-text bold tight">{post.meta.title}</p>
								<p class="descriptor-text tight lgrey">{post.meta.excerpt}</p>
								<p class="tag-text tt-u lgrey self-bottom bordertop ptop8" style="margin-top: auto">{post.meta.author} | {post.meta.words} words</p>
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
</Container>

<style lang="sass">

.blog-wrapper
	padding-top: 5rem
	@media screen and (min-width: 1025px)
		padding-top: 6rem

.mobile-selection-menu, .mobile-category-menu
	display: none
	position: relative
	z-index: 20

.mobile-menu-trigger
	width: 100%
	display: flex
	align-items: center
	justify-content: space-between
	gap: 1rem
	padding: 0.8rem 0.9rem
	border: var(--border-dark)
	border-radius: 5px
	background: var(--color-grey-4)
	color: var(--color-back)
	font-family: var(--fontface-sans)
	font-size: 0.78rem
	font-weight: 700
	letter-spacing: 0.02rem
	text-transform: uppercase
	box-shadow: var(--shadow11)
	&:hover
		background: var(--color-theme)

.menu-state
	font-size: 0.66rem
	font-weight: 600
	opacity: 0.72

.category-trigger
	background: var(--color-back)
	color: var(--color-primary)
	&:hover
		color: var(--color-back)

.mobile-menu-scrim
	position: fixed
	inset: 0
	z-index: 18
	border: none
	background: rgba(0,0,0,0.18)
	backdrop-filter: blur(2px)

.mobile-menu-content
	position: absolute
	top: calc(100% + 0.55rem)
	left: 0
	right: 0
	z-index: 21
	display: flex
	flex-direction: column
	padding: 0.45rem
	border: var(--border-dark)
	border-radius: 7px
	background: var(--color-back)
	box-shadow: 0 18px 45px rgba(0,0,0,0.18)
	transform-origin: top center
	animation: menuIn 0.14s ease-out

.mobile-menu-arrow
	position: absolute
	top: -6px
	left: 22px
	width: 12px
	height: 12px
	border-left: var(--border-dark)
	border-top: var(--border-dark)
	background: var(--color-back)
	transform: rotate(45deg)

.mobile-menu-item
	display: flex
	align-items: center
	justify-content: space-between
	gap: 1rem
	padding: 0.78rem 0.85rem
	border: none
	border-radius: 4px
	background: transparent
	color: var(--color-primary)
	font-family: var(--fontface-sans)
	font-size: 0.82rem
	font-weight: 650
	line-height: 1.1
	text-align: left
	text-transform: uppercase
	transition: background 0.08s ease, color 0.08s ease
	&:hover, &:focus-visible
		outline: none
		background: var(--color-stone)
		color: var(--color-theme-2)
	&.active
		background: var(--color-theme-6)
		color: var(--color-theme-2)

.item-note
	color: var(--color-grey-2)
	font-size: 0.68rem
	font-weight: 600

@keyframes menuIn
	from
		opacity: 0
		transform: translateY(-4px) scale(0.98)
	to
		opacity: 1
		transform: translateY(0) scale(1)

@media screen and (max-width: 1024px)
	.selection-row, .category-selection
		display: none
	.mobile-selection-menu, .mobile-category-menu
		display: block
	.mobile-category-menu
		width: 100%

.editorial-layout
	display: grid
	align-items: start
	@media screen and (min-width: 1025px)
		grid-template-columns: 2fr 1fr 1fr
		column-gap: 2rem
		row-gap: 1px
		border-bottom: var(--border-dark)
		border-top: var(--border-dark)
	@media screen and (max-width: 1024px)
		gap: 1rem

.lead-panel, .highlight-panel, .article-panel, .blog-sidebar
	background: var(--color-back)

.lead-panel, .highlight-panel
	@media screen and (min-width: 1025px)
		padding-top: 2rem

.featured-essay
	position: relative
	display: flex
	height: 360px
	overflow: hidden
	border: var(--border-dark)
	@media screen and (min-width: 1025px)
		height: 520px
		.featured-copy h2.card-title
			transition: transform 0.28s ease
		&:hover
			.featured-overlay, .featured-copy p, .featured-copy .labelbox
				opacity: 0
			.featured-copy h2.card-title
				transform: translateY(64px)

.featured-essay:hover img, .highlight-card:hover img
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
	background: linear-gradient(0deg, rgba(0,0,0,0.74), rgba(0,0,0,0.42) 48%, rgba(0,0,0,0.1))
	transition: opacity 0.28s ease

.featured-copy
	position: relative
	z-index: 1
	display: flex
	flex-direction: column
	justify-content: flex-end
	gap: 1rem
	padding: 1rem
	p, .labelbox
		transition: opacity 0.28s ease
	@media screen and (min-width: 1025px)
		padding: 2rem

.highlight-panel
	display: grid
	gap: 1px
	@media screen and (min-width: 1025px)
		min-height: 520px
		grid-template-rows: auto 1fr
	@media screen and (max-width: 1024px)
		gap: 1rem

.highlight-card
	display: grid
	overflow: hidden
	&.with-image
		grid-template-rows: 160px auto
	img
		width: 100%
		height: 160px
		object-fit: cover
		transition: transform 0.28s ease
		filter: grayscale(0.4)
		@media screen and (max-width: 1024px)
			padding-bottom: 1rem
	@media screen and (min-width: 1025px)
		&.with-image
			grid-template-rows: 200px auto
			img
				height: 100%

.hc0
	border-bottom: var(--border-main)
	@media screen and (max-width: 1024px)
		padding-bottom: 1rem

.article-panel
	display: flex
	flex-direction: column
	gap: 1rem
	padding-top: 1rem
	min-width: 0
	@media screen and (min-width: 1025px)
		grid-column: 1 / 3
		border-top: var(--border-dark)
		margin-top: 2rem
		padding-bottom: 1rem
	@media screen and (max-width: 1024px)
		padding-top: 1rem

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

.essay-holder
	display: grid
	grid-template-columns: 1fr
	margin-bottom: 2rem	
	.essay-holder-left
		img
			height: 160px
	@media screen and (min-width: 1025px)
		grid-template-columns: 200px 1fr
		margin-bottom: 0
		.essay-holder-left
			img
				height: 120px

.essay-holder-left, .essay-holder-right
	@media screen and (min-width: 1025px)
		padding: 1rem

.essay-holder-right, .essay-tags
	@media screen and (max-width: 1024px)
		padding: 0 1rem

.essay-tags
	@media screen and (max-width: 1024px)
		margin-bottom: 1rem
		margin-top: 1rem

.essay-card
	display: grid
	grid-template-columns: 190px 1fr
	min-width: 0
	background: var(--color-back)
	@media screen and (max-width: 1024px)
		display: flex
		flex-direction: column
		border: var(--border-main)

.essay-holder img
	width: 100%
	object-fit: cover
	transition: transform 0.28s ease

.load-more-wrap
	display: flex
	justify-content: center
	padding-top: 0.5rem

.load-more-button
	display: inline-flex
	align-items: center
	justify-content: center
	gap: 0.75rem
	min-width: min(100%, 280px)
	padding: 0.82rem 1.2rem
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
		color: var(--color-grey-2)
		font-size: 0.68rem
		font-weight: 600
	&:hover
		background: var(--color-theme-2)
		border-color: var(--color-theme-2)
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
		top: 72px
		height: calc(100vh - 72px)
	@media screen and (max-width: 1024px)
		position: static
		background: transparent
		border: none
		gap: 1rem

.sidebar-section
	display: flex
	flex-direction: column
	gap: 1rem
	padding: 1rem 0 1rem 2rem
	background: var(--color-back)
	border-bottom: var(--border-dark)
	@media screen and (max-width: 1024px)
		border: var(--border-main)
		padding: 0.5rem
		a.section-titler
			padding-top: 0.5rem
	@media screen and (min-width: 1025px)
		&:last-child
			border-bottom: none

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
	gap: 0.8rem
	padding: 0.8rem 0
	border-top: var(--border-main)

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
