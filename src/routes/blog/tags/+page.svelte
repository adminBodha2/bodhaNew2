<script lang="ts">
	import { onMount } from 'svelte';
	import { tagsWithCounts, tagsWithCountsAlphabetical } from '$lib/utils/localpulls';
	import Head from '$lib/comps/headcomponent.svelte';
	import autoAnimate from '@formkit/auto-animate';
	import Toggler from '$lib/comps/toggle.svelte';
	import { metaTitle, metaDescription, metaUrl, metaImage } from '$lib/utils/metastores';

	let tags: any;
	let tagsC: any;
	let showCount = false;

	$metaTitle = 'Tags — Bodha Blog';
	$metaDescription = 'All content tags at the Bodha website.';
	$metaUrl = 'https://www.bodharesearch.in/blog/tags';
	$metaImage = '/images/bodhacover.png';

	onMount(async () => {
		tags = await tagsWithCountsAlphabetical();
		tagsC = await tagsWithCounts();
	});
</script>

<Head title={$metaTitle} metaDescription={$metaDescription} metaUrl={$metaUrl} metaImage={$metaImage} />


<div class="box std">
	<div class="sort-row">
		<button class="blank" on:click={() => (showCount = !showCount)}>
			<Toggler isToggled={showCount} />
		</button>
		<span class="sort-label">{showCount ? 'Sort Alphabetical' : 'Sort by Count'}</span>
	</div>
	{#if showCount && tagsC && tagsC.length > 0}
	<div class="tags-wrap" use:autoAnimate>
		{#each tagsC as tag}
		<a class="tag-item blank" href="/blog/tags/{tag.tag}">
			{tag.tag.replaceAll('-', ' ')}
			<span class="tag-count">({tag.count})</span>
		</a>
		{/each}
	</div>
	{:else if !showCount && tags && tags.length > 0}
	<div class="tags-wrap" use:autoAnimate>
		{#each tags as tag}
		<a class="tag-item blank" href="/blog/tags/{tag.tag}">
			{tag.tag.replaceAll('-', ' ')}
			{#if tag.count}<span class="tag-count">({tag.count})</span>{/if}
		</a>
		{/each}
	</div>
	{/if}
</div>


<style lang="sass">

.sort-row
	display: flex
	align-items: center
	gap: 8px

.sort-label
	font-size: 0.75rem
	color: var(--text-ghost)

.tags-wrap
	display: flex
	flex-wrap: wrap
	gap: 8px

.tag-item
	font-size: 0.8rem
	font-weight: 500
	color: #555
	padding: 6px 14px
	border-radius: 100px
	border: 1px solid rgba(0,0,0,0.1)
	background: #FFFFFF
	transition: all 0.12s ease
	&:hover
		border-color: var(--theme)
		color: var(--theme)
		background: #F9F8F6

.tag-count
	font-size: 0.7rem
	color: var(--text-ghost)
	margin-left: 4px

</style>
