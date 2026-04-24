<script lang="ts">
	import { onMount } from 'svelte';
	import { tagsWithCounts, tagsWithCountsAlphabetical } from '$lib/utils/localpulls';
	import Container from '$lib/comps/container.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';

	let tags: any;
	let tagsC: any;
	let showCount = false;

	const title = 'Tags — Bodha Blog';
	const metaDescription = 'All content tags at the Bodha website.';
	const metaUrl = 'https://www.bodharesearch.in/blog/tags';
	const metaImage = 'https://www.bodharesearch.in/images/bodhacover.png';

	onMount(async () => {
		tags = await tagsWithCountsAlphabetical();
		tagsC = await tagsWithCounts();
	});
</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} />

<Container narrow={true} scaled={true}>
	<div class="stdbox padded-ontop">
		<Crumb item1="Bodha" item1Link="/" show2={true} item2linked={true} item2="Blog" item2Link="/blog" showT={true} title="Tags" showRow={true}>
			<div class="row cgap8 rgap8 mwrap">
				<a class="nav-btn" href="/blog">Blog</a>
				<a class="nav-btn" href="/blog/writers">Writers</a>
				<button class="nav-btn" on:click={() => (showCount = !showCount)}
					>{#if showCount}Sort Alpabhetical{:else}Sort by Count{/if}</button>
			</div>
		</Crumb>
		{#if showCount && tagsC && tagsC.length > 0}
			<div class="tags-wrap">
				{#each tagsC as tag}
					<a class="tag-item blank tt-u" href="/blog/tags/{tag.tag}">
						{tag.tag.replaceAll('-', ' ')}
						<span class="tag-count">({tag.count})</span>
					</a>
				{/each}
			</div>
		{:else if !showCount && tags && tags.length > 0}
			<div class="tags-wrap">
				{#each tags as tag}
					<a class="tag-item blank tt-u" href="/blog/tags/{tag.tag}">
						{tag.tag.replaceAll('-', ' ')}
						{#if tag.count}<span class="tag-count">({tag.count})</span>{/if}
					</a>
				{/each}
			</div>
		{/if}
	</div>
</Container>

<style lang="sass">

.tags-wrap
	display: flex
	flex-wrap: wrap
	gap: 8px

</style>
