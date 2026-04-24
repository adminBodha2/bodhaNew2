<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { selectedWriter } from '$lib/utils/localpulls';
	import Head from '$lib/comps/headcomponent.svelte';
	import Container from '$lib/comps/container.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import BlogCard from '$lib/comps/blogcard.svelte';

	let writerName = page.params.writer ?? '';
	let posts: any;

	const title = 'Essays by ' + writerName;
	const metaDescription = 'Read all essays by ' + writerName + ' at Bodha Blog';
	const metaUrl = 'https://www.bodharesearch.in' + page.url.pathname;
	const metaImage = 'https://www.bodharesearch.in/images/bodhacover.png';

	onMount(async () => {
		posts = await selectedWriter(writerName, 50);
	});
</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} />

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
