<script lang="ts">
	import { onMount } from 'svelte';
	import { fullBlog } from '$lib/utils/localpulls';
	import Container from '$lib/comps/container.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import BlogCard from '$lib/comps/blogcard.svelte';
	import { servingExternal } from '$lib/serving/servingWiki';
	import { metaTitle, metaDescription, metaUrl, metaImage } from '$lib/utils/metastores';

	let posts: any;
	let showEx = false;
	const externalPosts = servingExternal();

	$metaTitle = 'Bodha — Blog';
	$metaDescription = 'Our blog featuring essays on Hindu culture, history, festivals, and more.';
	$metaUrl = 'https://www.bodharesearch.in/blog';
	$metaImage = '/images/bodhacover.png';

	onMount(async () => {
		posts = await fullBlog();
	});
</script>

<Head title={$metaTitle} metaDescription={$metaDescription} metaUrl={$metaUrl} metaImage={$metaImage} />

<Container narrow={true} scaled={true}>
<div class="box std padded-ontop">
	<div class="box textbox borderbot pbot32">
		<p class="eyebrow tt-u"><a class="linkonhover" href="/">Bodha</a></p>
		<h1 class="hero-title source-serif">Blog</h1>
		<p class="small-text grey">Essays on Hindu culture, history, civilisation, and the intellectual life of a society in renewal.</p>
		<div class="row cgap8 rgap8 mwrap">
			<button class="filter-button" class:active={!showEx} on:click={() => (showEx = false)}>Essays</button>
			<button class="filter-button" class:active={showEx} on:click={() => (showEx = true)}>External Posts</button>
			<a class="filter-button" href="/blog/writers">Writers</a>
			<a class="filter-button" href="/blog/tags">Tags</a>
		</div>
	</div>
	<div class="box std">
		{#if !showEx && posts && posts.length > 0}
		<div class="standard-grid grid three">
			{#each posts as item, i}
			<BlogCard
				title={item.meta.title}
				link={item.linkpath}
				image={item.meta.image}
				excerpt={item.meta.excerpt}
				author={item.meta.author}
				date={item.formattedDate}
				words={item.meta.words}
				numbering="number{i}"
			>
				{#each item.meta.tags as tag}
				<span class="tag-pill tt-u">{tag.replaceAll('-', ' ')}</span>
				{/each}
			</BlogCard>
			{/each}
		</div>

		{:else if showEx}
		<div class="standard-grid grid three">
			{#each externalPosts as item}
			<a class="ext-card blank" href={item.route} target="_blank" rel="noreferrer">
				<div class="ext-card-body">
					<span class="ext-badge tt-u">External</span>
					<h3 class="blog-title source-serif">{item.title}</h3>
					<p class="ext-desc">{item.description}</p>
				</div>
				<div class="ext-card-foot">
					{#each item.tags as tag}
					<span class="tag-pill tt-u">{tag.replaceAll('-', ' ')}</span>
					{/each}
				</div>
			</a>
			{/each}
		</div>
		{/if}
	</div>
</div>
</Container>

<style lang="sass">
.hero-sub
	max-width: 66ch

.blog-nav
	display: flex
	flex-wrap: wrap
	gap: 6px

.nav-btn
	font-size: 0.78rem
	font-weight: 500
	padding: 5px 14px
	border-radius: 100px
	border: 1px solid rgba(0,0,0,0.1)
	background: transparent
	color: #666
	cursor: pointer
	transition: all 0.15s ease
	&:hover
		border-color: rgba(0,0,0,0.18)
		color: #333
	&.active
		background: var(--theme)
		border-color: var(--theme)
		color: #FFF

// External cards
.ext-card
	display: flex
	flex-direction: column
	background: #FFFFFF
	transition: background 0.15s ease
	&:hover
		background: #F9F8F6
		.ext-title
			color: var(--theme)

.ext-card-body
	display: flex
	flex-direction: column
	gap: 0.6rem
	padding: 1.2rem 1.4rem
	flex: 1

.ext-badge
	font-size: 7.5px
	font-weight: 700
	letter-spacing: 0.12em
	color: #4C9BE8
	padding: 2px 8px
	border-radius: 100px
	border: 1px solid rgba(116,192,252,0.3)
	background: rgba(116,192,252,0.08)
	align-self: flex-start

.ext-title
	font-size: clamp(0.95rem, 1.5vw, 1.1rem)
	font-weight: 400
	line-height: 1.25
	letter-spacing: -0.02em
	color: #111
	margin: 0
	transition: color 0.15s ease

.ext-desc
	font-size: 0.82rem
	line-height: 1.6
	color: #777
	margin: 0

.ext-card-foot
	display: flex
	flex-wrap: wrap
	gap: 4px
	padding: 0.8rem 1.4rem
	border-top: 1px solid rgba(0,0,0,0.06)

</style>
