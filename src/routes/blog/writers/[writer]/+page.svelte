<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { selectedWriter } from '$lib/utils/localpulls';
	import Container from '$lib/comps/container.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import BlogCard from '$lib/comps/blogcard.svelte';

	let writerName = page.params.writer ?? '';
	let posts: any;

	onMount(async () => {
		posts = await selectedWriter(writerName, 50);
	});
</script>

<Head title="{writerName} — Bodha Blog" metaDescription="Essays by {writerName} at Bodha Research." metaUrl="https://www.bodharesearch.in/blog/writers/{writerName}" metaImage="/images/bodhacover.png" />

	{#if posts && posts.length > 0}
	<div class="box std">
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
	</div>
	{/if}

