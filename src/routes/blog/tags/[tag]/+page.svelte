<script lang="ts">

	import { page } from '$app/state';
	import { selectedTag } from '$lib/utils/localpulls';
	import Container from '$lib/comps/container.svelte'
	import Crumb from '$lib/comps/breadcrumb.svelte'
	import Head from '$lib/comps/headcomponent.svelte';
	import BlogCard from '$lib/comps/blogcard.svelte';
	let route = page.params.tag ?? '';

	const title = 'Tag - ' + route
	const metaDescription = 'All essays tagged ' + route + ' at Bodha blog.'
	const metaUrl = 'https://www.bodharesearch.in' + page.url.pathname;
	const metaImage = 'https://www.bodharesearch.in/images/bodhacover.png';

</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} />

<Container narrow={true} scaled={true}>
	<div class="stdbox padded-ontop">
		<Crumb item1="Blog" item1Link="/blog" show2={true} item2linked={true} item2="Tags" item2Link="/blog/tags" showT={true} title={route} showRow={true}>
			<div class="row cgap8 rgap8 mwrap">
				<a class="nav-btn" href="/blog">Blog</a>
				<a class="nav-btn" href="/blog/writers">Writers</a>
				<a class="nav-btn" href="/blog/tags">Tags</a>
			</div>
		</Crumb>
	{#await selectedTag(route) then loaded}
	{#if loaded && loaded.length > 0}
		<div class="standard-grid grid three">
			{#each loaded as item, i}
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
	{/await}

	</div>
</Container>
