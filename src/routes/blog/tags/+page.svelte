<script lang="ts">
	import Container from '$lib/comps/wrapper.svelte';
	import Card from '$lib/comps/blog-card.svelte';
	import Slide from '$lib/svelteanim/components/Slide2.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import PageHead from '$lib/comps/page-header-one.svelte';
	import '$lib/styles/system/blog.sass';
	import ResponsiveMenu from '$lib/comps/responsive-menu-2.svelte';
	import { absoluteImage, absoluteUrl, collectionPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';
	import { selectedTag as fetchTagPosts } from '$lib/utils/blogpulls';

	let { data } = $props();

	let tags = $derived(data.tags ?? []);
	let tagsC = $derived(data.tagsC ?? []);
	let showCount = $state(false);
	let activeTag = $state<string | null>(null);
	let tagPosts = $state<any[]>([]);

	$effect(() => {
		const tag = activeTag;
		if (!tag) { tagPosts = []; return; }
		fetchTagPosts(tag).then(posts => { tagPosts = posts; });
	});

	function selectTag(tag: string) {
		activeTag = activeTag === tag ? null : tag;
	}

	function tagUrl(tag: string) {
		return `/blog/tags/${encodeURIComponent(tag)}`;
	}

	const title = 'Bodha Blog Tags | Hindu Culture, Dharma, IKS, and Civilizational Themes';
	const metaDescription = 'Browse Bodha blog essays by tags across Hindu culture, Dharma, Indian knowledge systems, temples, festivals, history, and civilizational thought.';
	const metaUrl = absoluteUrl('/blog/tags');
	const metaImage = absoluteImage('/images/bodhacover.png');

	function toggleTagC() {
		showCount = !showCount;
	}

	let jsonld = $derived(
		stringifyJsonLd(
			collectionPageJsonLd({
				name: title,
				description: metaDescription,
				url: metaUrl,
				image: metaImage,
				items: tags.map((tag) => ({
					name: tag.tag,
					url: `/blog/tags/${tag.tag}`
				}))
			})
		)
	);
</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="2560" imHeight="1440" {jsonld} />

<Container>
	<PageHead title="All Tags at the Blog | Bodha" />
	<section class="wrapper-std header-margin rgap32">
			<ResponsiveMenu>
				<a class="small-button tt-u" href="/blog">Blog</a>
				<a class="small-button tt-u" href="/blog/external-posts">External Posts</a>
				<a class="small-button tt-u" href="/blog/writers">Writers</a>
			<a class="small-button tt-u active" href="/blog/tags">Tags</a>
			</ResponsiveMenu>
		<div class="blog-wrapper">
			<div class="tags box rgap16">
			<div class="row cgap8 ycenter">
				<div class="toggler-std">
					<input class="in-toggle" id="check-toggle" type="checkbox" bind:checked={showCount} />
					<label for="check-toggle"></label>
				</div>
				<p class="txt-xs tt-u w500 grey1">
					{#if showCount}View Alphabetical{:else}View by Count{/if}
				</p>
			</div>
			<div class="row wrap cgap8 rgap8 tray-of-tags">
				{#if showCount && tagsC && tagsC.length > 0}
					{#each tagsC as tag}
						<button class="main-btn tt-u" class:active={activeTag === tag.tag} onclick={() => selectTag(tag.tag)}>
							{tag.tag.replaceAll('-', ' ')}
							<span class="tag-count">({tag.count})</span>
						</button>
					{/each}
				{:else if !showCount && tags && tags.length > 0}
					{#each tags as tag}
						<button class="main-btn tt-u" class:active={activeTag === tag.tag} onclick={() => selectTag(tag.tag)}>
							{tag.tag.replaceAll('-', ' ')}
						</button>
					{/each}
				{/if}
			</div>
			</div>
			<div class="results">
			{#if activeTag}
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap16">
						{#each tagPosts as post (post.linkpath)}
							<Card
								image={post.meta.image}
								title={post.meta.title}
								link={post.linkpath}
								desc={post.meta.excerpt}
								author={post.meta.author?.[0]}
								words={post.meta.words}
								shutTag={true}
							>
							</Card>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</section>
</Container>

<style lang="sass">

.blog-wrapper
	display: grid
	grid-template-columns: 1fr
	gap: 2rem
	grid-template-areas: "tags" "results"
	.tags
		grid-area: tags
	.results
		grid-area: results
	@media (min-width: 1025px)
		grid-template-columns: 360px 1fr
		grid-template-areas: "tags results"
		gap: 3rem
	@media (min-width: 1201px)
		grid-template-columns: 420px 1fr

.results
	display: flex
	flex-direction: column
	gap: 1rem

.main-btn
	&.active
		background: var(--color-theme-dark)
		color: var(--color-back)
		border-color: var(--color-theme-dark)

</style>
