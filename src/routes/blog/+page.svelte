<script lang="ts">
	import { tick } from 'svelte';
	import type { PageData } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import PageHead from '$lib/comps/page-header-one.svelte';
	import Slide from '$lib/svelteanim/components/Slide2.svelte';
	import autoAnimate from '@formkit/auto-animate';
	import { staggerAnimatePlugin } from '$lib/svelteanim/utils/staggerPlugin';
	import '$lib/styles/system/blog.sass';
	import Title from '$lib/comps/page-title.svelte';
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
	let secondLPosts = $derived(posts.slice(3, 6));
	let gridPosts = $derived(posts.filter((post) => selectedCategory === 'All' || postCategories(post).includes(selectedCategory)));
	let articlePosts = $derived(gridPosts);
	let visibleArticlePosts = $derived(articlePosts.slice(0, visibleArticleCount));
	let hasMoreArticles = $derived(visibleArticleCount < articlePosts.length);

	const title = 'Bodha Blog | Hindu Culture, Dharma, IKS, and Civilizational Essays';
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
	<PageHead title="Blog | Bodha" />
	<section class="wrapper-std header-margin rgap32">
		<ResponsiveMenu>
			<a class="small-button tt-u" href="/blog/external-posts">External Posts</a>
			<a class="small-button tt-u" href="/blog/writers">Writers</a>
			<a class="small-button tt-u" href="/blog/tags">Tags</a>
		</ResponsiveMenu>
		<div class="blog-bucket">
			<div class="mainarea">
				<div class="heroposts">
					{#if heroPosts.length > 0}
						<div class="featured">
							<a class="featured-essay blank" href={heroPosts[0].linkpath}>
								{#if heroPosts[0].meta.image}
									<img class="fitted herocard" src={heroPosts[0].meta.image} alt={heroPosts[0].meta.title} />
								{/if}
								<div class="featured-overlay"></div>
								<div class="featured-copy box p16 md:p24 lg:p32 rgap16">
									<h2 class="txt-2xl md:txt-3xl lg:txt-4xl w500 white">{heroPosts[0].meta.title}</h2>
									<p class="sm:txt-sm white lh14">{heroPosts[0].meta.excerpt}</p>
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
											<p class="txt-xs w500 white tt-u">{category}</p>
										{/each}
									</div>
								</div>
							</a>
						</div>
						<div class="highlight2 box rgap16 lg:rgap32" aria-label="Highlighted essays">
							{#each heroPosts.slice(1) as post, i}
								<a class="box rgap8 blank" class:with-image={i === 0} href={post.linkpath}>
									{#if i === 0 && post.meta.image}
										<img class="fitted landscape pbot8" src={post.meta.image} alt={post.meta.title} />
									{/if}
									<div class="box pbot8">
										<p class="txt-xs tt-u w500 theme">{primaryCategory(post)}</p>
										<p class="txt-xl w600 ptop8 pbot8 a-hover lh11">{post.meta.title}</p>
										<div class="row wrap cgap4 rgap4 ptop8">
											{#each (post.meta.tags ?? []).slice(0, 3) as tag, i}
												<p class="txt-00 tt-u w500 grey0">
													{#if i > 0}|
													{/if}
													{tag.replaceAll('-', ' ')}
												</p>
											{/each}
										</div>
										<p class="txt-xs tt-u w500 grey2 ptop4">{post.formattedDate} · {post.meta.words ?? ' '} words</p>
									</div>
								</a>
							{/each}
						</div>
					{/if}
				</div>
				<div class="otherposts grid grid-cols-1 lg:grid-cols-3 rgap32 cgap16 lg:cgap48">
					{#if secondLPosts.length > 0}
						{#each secondLPosts as item}
							<a class="box blank rgap8 lg:rgap16" href={item.linkpath}>
								<img class="fitted" src={item.meta.image} alt={item.meta.title} style="aspect-ratio: 16/6"/>
								<div class="box rgap8">
									<p class="txt-lg w600 a-hover">{item.meta.title}</p>
									<p class="txt-xs tt-u w500 grey1">{item.meta.author}</p>
								</div>
							</a>
						{/each}
					{/if}
				</div>
			</div>
			<div class="sidearea">
				<div class="sidebar-section" id="external-posts">
					<a class="txt-xs tt-u grey0 section-titler" href="/blog/external">External posts →</a>
					<div class="external-list">
						{#each externalPosts.slice(0, 5) as post}
							<a class="external-item blank" href={post.route} target="_blank" rel="noreferrer">
								<div class="box rgap8">
									<p class="w600 lh12">{post.title}</p>
									<p class="txt-00 tt-u w500 theme">{post.platform}</p>
								</div>
							</a>
						{/each}
					</div>
				</div>
				<div class="sidebar-section lg:ptop16 lg:pbot16" id="writers-section">
					<a class="txt-xs tt-u grey0 section-titler" href="/blog/writers">Writers →</a>
					<div class="writer-row">
						{#each allWriters as item}
							<a class="writer-avatar blank" href={item.link}>
								<img class="writer-av" src={item.image} alt={item.writer} />
							</a>
						{/each}
					</div>
				</div>
				<div class="sidebar-section lg:ptop16" id="tags-section">
					<a class="txt-xs tt-u grey0 section-titler" href="/blog/tags">Popular Tags →</a>
					<div class="chip-cloud">
						{#each tags.slice(0, 8) as item}
							<a class="txt-xs tt-u w500 theme" href={tagUrl(item.tag)}>{item.tag.replaceAll('-', ' ')}</a>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-------------all posts, by category---------------------------------->
	<section class="wrapper-std growingline" id="all-articles">
		<Title text="All Articles" />
		<Slide targetSelector=".small-button">
		<ResponsiveMenu2>
			<button class="small-button tt-u" class:active={selectedCategory === 'All'} onclick={() => selectCategory('All')}>
				All
			</button>
			{#each categories as item}
				<button class="small-button tt-u" class:active={selectedCategory === item.category} onclick={() => selectCategory(item.category)}>
					{item.category}
				</button>
			{/each}
		</ResponsiveMenu2>
		</Slide>
		<Slide targetSelector=".blog-item" start="top 95%" end="bottom: 70%">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap16" use:autoAnimate={staggerAnimatePlugin({ stagger: 80, duration: 300 })}>
			{#each visibleArticlePosts as post (post.linkpath)}
				<article class="box b-main blog-item">
					<div class="p8">
						{#if post.meta.image}
							<img class="fitted landscape radius4" src={post.meta.image} alt={post.meta.title} />
						{/if}
					</div>
					<a class="blank box rgap16 p16" style="height: 100%" href={post.linkpath}>
						<p class="txt-xl w600">{post.meta.title}</p>
						<p class="lh14 grey1">{post.meta.excerpt}</p>
					</a>
					<div class="box self-bottom bordertop ptop8 rgap4 p16">
						<p class="txt-sm tt-u w500">{post.meta.author} | {post.meta.words} words</p>
						<div class="row wrap essay-tags rgap4 cgap4">
							{#each post.meta.tags ?? [] as tag}
								<a class="txt-xs theme w500 tt-u" href={tagUrl(tag)}>#{tag.replaceAll('-', ' ')}</a>
							{/each}
						</div>
					</div>
				</article>
			{/each}
		</div>
		</Slide>
		{#if hasMoreArticles}
			<div class="load-more-wrap">
				<button class="load-more-button" type="button" onclick={loadMoreArticles}>
					Load more articles
					<span>{Math.min(visibleArticleCount, articlePosts.length)} / {articlePosts.length}</span>
				</button>
			</div>
		{/if}

	</section>
</Container>

<style lang="sass">

.blog-bucket
	display: grid
	grid-template-columns: 1fr
	grid-template-rows: 1fr
	column-gap: 3rem
	row-gap: 2rem
	grid-auto-flow: row
	grid-template-areas: "mainarea" "sidearea"
	@media (min-width: 1025px)
		grid-template-columns: 1fr 1fr 1fr 0.8fr
		grid-template-areas: "mainarea mainarea mainarea sidearea"
		column-gap: 2rem
	@media (min-width: 1201px)
		column-gap: 3rem

.mainarea
	display: flex
	flex-direction: column
	row-gap: 2rem
	grid-area: mainarea
	@media (min-width: 1025px)
		row-gap: 2rem
	@media (min-width: 1201px)
		column-gap: 3rem

.heroposts
	grid-area: heroposts
	display: grid
	column-gap: 3rem
	grid-template-columns: 1fr
	grid-template-areas: "featured" "highlight2"
	row-gap: 2rem
	@media (min-width: 1025px)
		grid-template-columns: 1fr 1fr 1fr
		grid-template-areas: "featured featured highlight2"
		column-gap: 2rem
	@media (min-width: 1201px)
		column-gap: 3rem

.featured
	grid-area: featured

.highlight2
	grid-area: highlight2

.otherposts
	grid-area: otherposts

.sidearea
	grid-area: sidearea

#external-posts
	@media (min-width: 1025px)
		.section-titler.grey0
			&:hover
				color: var(--color-theme)
	@media (max-width: 1024px)
		gap: 0
		padding-top: 0
		.section-titler
			padding-left: 1rem
			padding-bottom: 1rem
			&:hover
				color: var(--color-theme)

#writers-section, #tags-section
	@media (max-width: 1024px)
		padding: 2rem 1rem
		border-radius: 8px

.featured-essay
	position: relative
	display: flex
	height: 440px
	overflow: hidden
	border-radius: 2px
	.featured-overlay
		background: linear-gradient(0deg, rgba(0,0,0,0.94), rgba(0,0,0,0.62) 58%, rgba(0,0,0,0.39))
		transition: all 360ms ease
		position: absolute
		inset: 0
	@media screen and (min-width: 1025px)
		height: 100%
		.featured-overlay
			background: linear-gradient(0deg, rgba(0,0,0,0.94), rgba(0,0,0,0.52) 48%, rgba(0,0,0,0.3))
		&:hover
			.featured-overlay
				opacity: 0.5

.fitted.herocard
	position: absolute
	inset: 0
	width: 100%
	height: 100%
	object-fit: cover
	transition: transform 0.28s ease
	filter: grayscale(0.2)

.featured-copy
	position: relative
	z-index: 1
	justify-content: flex-end
	p
		transition: opacity 0.28s ease

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

.sidebar-section
	gap: 1rem
	display: flex
	flex-direction: column
	background: var(--color-back)
	border-bottom: var(--border-dark)
	@media screen and (min-width: 1025px)
		&:last-child
			border-bottom: none

.external-list
	display: grid
	grid-template-columns: 1fr
	@media (min-width: 1025px)
		display: flex
		flex-direction: column

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

</style>
