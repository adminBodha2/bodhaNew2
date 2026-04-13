<script lang="ts">
	import { onMount } from 'svelte';
	import { allResearch } from '$lib/utils/localpulls';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import { page } from '$app/state';
	import Head from '$lib/comps/headcomponent.svelte';
	let sY: number;
	export let data;

	let projects: any;

	onMount(() => {
		(async () => {
			projects = await allResearch();
		})();
	});
</script>

<svelte:window bind:scrollY={sY} />

<Head
	title={data.title}
	metaDescription="Explore our research projects at Bodha."
	metaImage={data.image}
	metaUrl={'https://www.bodharesearch.in' + page.url.pathname}
/>

<section class="content-area">
	<Crumb item1="RESEARCH" item1Link="/research" show2={true} item2={data.title} />
	<div class="column rgap32">
		<div class="column rgap8">
			<h2 class="source-serif tight">{data.title}</h2>
			<small class="label white tt-c">{data.type}</small>
		</div>
		<div class="parallax">
			<img
				class="key"
				src={data.image}
				alt={data.title}
				style="transform: translateY(-{sY / 5}px)"
			/>
		</div>
		<article class="classic-document">
			<svelte:component this={data.content} />
		</article>
	</div>
</section>

<style lang="sass">

.parallax
	width: 100%
	overflow: hidden
	border-radius: 8px
	height: 300px
	@media screen and (min-width: 1025px)
		height: 480px

img.key
	position: relative
	top: 0
	left: 0
	object-fit: cover
	width: 100%
	height: 540px
	@media screen and (min-width: 1025px)
		height: 768px

</style>
