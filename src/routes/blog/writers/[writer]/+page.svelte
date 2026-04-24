<script lang="ts">
	import { page } from '$app/state';
	import Head from '$lib/comps/headcomponent.svelte';
	import Container from '$lib/comps/container.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import BlogCard from '$lib/comps/blogcard.svelte';

	let { data } = $props();

	let writerName = $derived(data.writerName);
	let posts = $derived(data.posts ?? []);

	let title = $derived('Essays by ' + writerName + ' | Bodha Blog');
	let metaDescription = $derived('Read all essays by ' + writerName + ' at Bodha Blog.');
	let metaUrl = $derived('https://www.bodharesearch.in' + page.url.pathname);
	const metaImage = 'https://www.bodharesearch.in/images/bodhacover.png';

	let jsonld = $derived(JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		name: title,
		description: metaDescription,
		url: metaUrl,
		image: metaImage,
		mainEntity: {
			'@type': 'ItemList',
			itemListElement: posts.map((post: any, index: number) => ({
				'@type': 'ListItem',
				position: index + 1,
				name: post.meta.title,
				url: 'https://www.bodharesearch.in' + post.linkpath
			}))
		}
	}));
</script>


<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="2560" imHeight="1440" {jsonld} />


<Container narrow={true} scaled={true}>
	<div class="stdbox padded-ontop">
		<Crumb item1="Blog" item1Link="/blog" show2={true} item2linked={true} item2="Writers" item2Link="/blog/writers" showT={true} title={writerName} showRow={true}>
			<div class="row cgap8 rgap8 mwrap">
				<a class="nav-btn" href="/blog">Blog</a>
				<a class="nav-btn" href="/blog/writers">Writers</a>
				<a class="nav-btn" href="/blog/tags">Tags</a>
			</div>
		</Crumb>
		{#if posts && posts.length > 0}
			<div class="white-grid grid three">
				{#each posts as item, i}
					<BlogCard title={item.meta.title} link={item.linkpath} image={item.meta.image} excerpt={item.meta.excerpt} author={item.meta.author} date={item.formattedDate} words={item.meta.words} numbering="whitestone">
						{#each item.meta.tags as tag}
							<span class="tag-pill tt-u">{tag.replaceAll('-', ' ')}</span>
						{/each}
					</BlogCard>
				{/each}
			</div>
		{/if}
	</div>
</Container>
