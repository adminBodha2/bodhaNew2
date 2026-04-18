<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte'
	import { writersWithCountsAlphabetical } from '$lib/utils/localpulls';
	import Container from '$lib/comps/container.svelte';


	let writers = $state<any>([]);

	const segments = $derived(page.url.pathname.split('/').filter(Boolean));
	const depth = $derived(segments.length);
	const route = $derived(page.params.writer ?? '');

	let { children } = $props();

	onMount(async () => {
		writers = await writersWithCountsAlphabetical();
	});
</script>

<Container narrow={true} scaled={true}>
	<div class="box std padded-ontop">
		<div class="box textbox borderbot pbot32">
			<p class="eyebrow tt-u"><a class="linkonhover" href="/blog">blog</a></p>
			<h1 class="hero-title source-serif tt-c">{#if depth === 2}Writers{:else}{route.replaceAll('-', ' ')}{/if}</h1>
			<p class="small-text grey">Meet the writers behind Bodha's essays on Hindu culture, history, and tradition.</p>
			<div class="row cgap8 rgap8 mwrap">
				<a class="filter-button" href="/blog">Blog</a>
				{#if depth !== 2}
				<a class="filter-button" href="/blog/writers">Writers</a>
				{/if}
				<a class="filter-button" href="/blog/tags">Tags</a>
			</div>
		</div>
	{@render children?.()}
	</div>

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