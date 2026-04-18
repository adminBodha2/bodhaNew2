<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte'
	import { tagsWithCounts, tagsWithCountsAlphabetical } from '$lib/utils/localpulls';
	import Container from '$lib/comps/container.svelte';
	import autoAnimate from '@formkit/auto-animate';
	import Toggler from '$lib/comps/toggle.svelte';

	let tags = $state<any>([]);
	let tagsC = $state<any>([]);
	let showCount = $state(false)

	const segments = $derived(page.url.pathname.split('/').filter(Boolean));
	const depth = $derived(segments.length);
	const route = $derived(page.params.tag ?? '');

	let { children } = $props();

	onMount(async () => {
		tags = await tagsWithCountsAlphabetical();
		tagsC = await tagsWithCounts();
	});
</script>

<Container narrow={true} scaled={true}>
	<div class="box std padded-ontop">
		<div class="box textbox borderbot pbot32">
			<p class="eyebrow tt-u"><a class="linkonhover" href="/blog/tags">TAGS</a></p>
			<h1 class="hero-title source-serif tt-c">{#if depth === 2}Tags{:else}{route.replaceAll('-', ' ')}{/if}</h1>
			<p class="small-text grey">Browse all content tags across Bodha's essays.</p>
			<div class="row cgap8 rgap8 mwrap">
				<a class="filter-button" href="/blog">Blog</a>
				<a class="filter-button" href="/blog/writers">Writers</a>
				{#if depth !== 2}
				<a class="filter-button" href="/blog/tags">Tags</a>
				{/if}
			</div>
		</div>
	{@render children?.()}
	</div>
	{#if depth > 2}
	<div class="box std padded bordertop">
	<div class="row ycenter cgap8">
		<button class="blank" onclick={() => (showCount = !showCount)}>
			<Toggler isToggled={showCount} />
		</button>
		<span class="sort-label">{showCount ? 'Sort Alphabetical' : 'Sort by Count'}</span>
	</div>
	{#if tagsC && tagsC.length > 0}
	<div class="tags-wrap" use:autoAnimate>
		{#each tagsC as tag}
		<a class="tag-item blank" href="/blog/tags/{tag.tag}">
			{tag.tag.replaceAll('-', ' ')}
			<span class="tag-count">({tag.count})</span>
		</a>
		{/each}
	</div>
	{:else if tags && tags.length > 0}
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
	{/if}
</Container>

<style lang="sass">

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