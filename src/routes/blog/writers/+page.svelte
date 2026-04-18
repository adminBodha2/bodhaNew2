<script lang="ts">
	import { onMount } from 'svelte';
	import { writersWithCountsAlphabetical } from '$lib/utils/localpulls';
	import Head from '$lib/comps/headcomponent.svelte';
	import { metaTitle, metaDescription, metaUrl, metaImage } from '$lib/utils/metastores';

	let writers: any;
	let showEx = false;

	$metaTitle = 'Writers — Bodha Blog';
	$metaDescription = "Meet the writers behind Bodha's essays on Hindu culture, history, and tradition.";
	$metaUrl = 'https://www.bodharesearch.in/blog/writers';
	$metaImage = '/images/bodhacover.png';

	onMount(async () => {
		writers = await writersWithCountsAlphabetical();
	});
</script>

<Head title={$metaTitle} metaDescription={$metaDescription} metaUrl={$metaUrl} metaImage={$metaImage} />

	{#if writers && writers.length > 0}
	<div class="box std">
		<div class="writers-grid">
			{#each writers as item}
			<a class="writer-card blank" href="/blog/writers/{item.writer}">
				<p class="source-serif">{item.writer}</p>
				{#if item.count}
				<p class="citation-big lgrey">{item.count} {item.count === 1 ? 'essay' : 'essays'}</p>
				{/if}
			</a>
			{/each}
		</div>
	</div>
	{/if}


<style lang="sass">

.writers-grid
	display: grid
	gap: 1px
	background: rgba(0,0,0,0.06)
	border: 1px solid rgba(0,0,0,0.06)
	border-radius: 10px
	overflow: hidden
	@media screen and (min-width: 1025px)
		grid-template-columns: repeat(3, 1fr)
	@media screen and (min-width: 631px) and (max-width: 1024px)
		grid-template-columns: repeat(2, 1fr)

.writer-card
	display: flex
	flex-direction: column
	gap: 4px
	padding: 1.4rem
	background: #FFFFFF
	transition: background 0.15s ease
	&:hover
		background: #F9F8F6
		.writer-name
			color: var(--theme)

.writer-name
	font-size: clamp(1rem, 1.5vw, 1.15rem)
	font-weight: 400
	line-height: 1.2
	letter-spacing: -0.02em
	color: #111
	transition: color 0.15s ease

.writer-count
	font-size: 0.75rem
	color: var(--text-ghost)

</style>
