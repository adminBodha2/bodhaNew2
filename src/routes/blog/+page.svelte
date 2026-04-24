<script lang="ts">
	import { onMount } from 'svelte';
	import { fullBlog } from '$lib/utils/localpulls';
	import Container from '$lib/comps/container.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte'
	import BlogCard from '$lib/comps/blogcard.svelte';
	import { servingExternal } from '$lib/serving/servingWiki';

	let posts: any;
	let showEx = false;
	const externalPosts = servingExternal();

	const title = 'Bodha - Blog';
	const metaDescription = 'Our blog featuring essays on Hindu culture, history, festivals, and more.';
	const metaUrl = 'https://www.bodharesearch.in/blog';
	const metaImage = 'https://www.bodharesearch.in/images/bodhacover.png';

	onMount(async () => {
		posts = await fullBlog();
	});
</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} />

<Container narrow={true} scaled={true}>
<div class="box std padded-ontop">
	<Crumb item1="Bodha" item1Link="/" showT={true} title="Blog" showD={true} desc={metaDescription} showRow={true}>
		<div class="row cgap8 rgap8 mwrap">
			<button class="nav-btn" class:active={!showEx} on:click={() => (showEx = false)}>Essays</button>
			<button class="nav-btn" class:active={showEx} on:click={() => (showEx = true)}>External Posts</button>
			<a class="nav-btn" href="/blog/writers">Writers</a>
			<a class="nav-btn" href="/blog/tags">Tags</a>
		</div>
	</Crumb>
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
				numbering="whitestone"
			>
				{#each item.meta.tags as tag}
				<a class="tag-pill tt-u" href="/blog/tags/{tag}">{tag.replaceAll('-', ' ')}</a>
				{/each}
			</BlogCard>
			{/each}
		</div>
		{:else if showEx}
		<div class="standard-grid grid four">
			{#each externalPosts as item, i}
			<a class="box blank whitestone" href={item.route} target="_blank" rel="noreferrer">
				<div class="ext-card-body">
					<p class="highlight-text source-serif tight bold">{item.title}</p>
					<p class="small-text tight grey">{item.description}</p>
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

.ext-card-body
	display: flex
	flex-direction: column
	gap: 0.6rem
	padding: 1.2rem 1.4rem
	flex: 1

.ext-card-foot
	display: flex
	flex-wrap: wrap
	gap: 4px
	padding: 0.8rem 1.4rem
	border-top: 1px solid rgba(0,0,0,0.06)

</style>
