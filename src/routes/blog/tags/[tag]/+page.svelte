<script lang="ts">
	import { page } from '$app/state';
	import { selectedTag } from '$lib/utils/localpulls';

	import Head from '$lib/comps/headcomponent.svelte';
	import BlogCard from '$lib/comps/blogcard.svelte';
	let route = page.params.tag ?? '';
</script>

<Head title="#{route} — Bodha Blog" metaDescription="All essays tagged {route} at Bodha Research." metaUrl="https://www.bodharesearch.in/blog/tags/{route}" metaImage="/images/bodhacover.png" />

	{#await selectedTag(route) then loaded}
	{#if loaded && loaded.length > 0}
	<div class="box std">
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
	{/await}

