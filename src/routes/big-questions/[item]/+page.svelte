<script lang="ts">

	import Crumb from '$lib/comps/breadcrumb.svelte';
	import { page } from '$app/state';
	import Head from '$lib/comps/headcomponent.svelte';
	let sY: number;
	export let data;

</script>

<svelte:window bind:scrollY={sY} />

<Head
	title={data.title}
	metaDescription={data.description}
	metaImage={data.icon}
	metaUrl={'https://www.bodharesearch.in' + page.url.pathname}
/>

<section class="content-area">
	<Crumb item1="BIG QUESTIONS" item1Link="/big-questions" show2={true} item2={data.id} />
	<div class="column rgap32">
		<div class="column rgap8 borderbot pbot32">
			<h2 class="source-serif tight">{data.title}</h2>
			<p class="sm grey">{data.description}</p>
			<div class="row ycenter cgap8 rgap8 ptop8">
				{#each data.tags as tag}
				<small class="label white tt-c">{tag.replaceAll('-', ' ')}</small>
				{/each}
			</div>
		</div>
		<div class="parallax">
			<img
				class="key"
				src={data.icon}
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
