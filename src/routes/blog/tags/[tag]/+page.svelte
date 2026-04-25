<script lang="ts">
	import { page } from '$app/state';
	import Container from '$lib/comps/container.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import BlogCard from '$lib/comps/blogcard.svelte';
	import { absoluteImage, absoluteUrl, collectionPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';

	let { data } = $props();

	let route = $derived(data.route);
	let posts = $derived(data.posts ?? []);

	let title = $derived('Tag | ' + route);
	let metaDescription = $derived('All essays tagged ' + route + ' at Bodha Blog.');
	let metaUrl = $derived(absoluteUrl(page.url.pathname));
	const metaImage = absoluteImage('/images/bodhacover.png');

	let jsonld = $derived(
		stringifyJsonLd(
			collectionPageJsonLd({
				name: title,
				description: metaDescription,
				url: metaUrl,
				image: metaImage,
				items: posts.map((post: any) => ({
					name: post.meta.title,
					url: post.linkpath
			}))
			})
		)
	);
</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="2560" imHeight="1440" {jsonld} />

<Container narrow={true} scaled={true}>
	<div class="stdbox padded-ontop">
		<Crumb item1="Blog" item1Link="/blog" show2={true} item2linked={true} item2="Tags" item2Link="/blog/tags" showT={true} title={route} showRow={true}>
			<div class="row cgap8 rgap8 mwrap">
				<a class="nav-btn" href="/blog">Blog</a>
				<a class="nav-btn" href="/blog/writers">Writers</a>
				<a class="nav-btn" href="/blog/tags">Tags</a>
			</div>
		</Crumb>
	{#if posts.length > 0}
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
	{/if}
	</div>
</Container>
