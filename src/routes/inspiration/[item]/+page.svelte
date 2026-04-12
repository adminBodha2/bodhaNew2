<script lang="ts">
	import { page } from '$app/state';
	import Head from '$lib/comps/headcomponent.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';

	let sY: number;
	export let data;
</script>

<svelte:window bind:scrollY={sY} />

<Head
	title={data.title}
	metaDescription="The primary thinkers and schools of thought we follow."
	metaImage="/images/bodhacover.png"
	metaUrl={'https://www.bodharesearch.in' + page.url.pathname}
/>

<section class="content-area">
	<Crumb item1="INSPIRATION" item1Link="/inspiration" show2={true} item2={data.title} />
	<div class="column rgap32">
		<h2 class="source-serif tight">{data.title}</h2>
		<div class="parallax">
			<img
				class="key"
				class:think={data.type === "thinker"}
				src={data.image}
				alt={data.title}
				style="transform: translateY(-{sY / 3}px)"
			/>
		</div>
		<article class="classic-document">
			<svelte:component this={data.content} />
		</article>
	</div>
</section>

<style lang="sass">

section.content-area
	width: 100%
	@media screen and (min-width: 1025px)
		width: 504px
	@media screen and (min-width: 1201px)
		width: 680px
	@media screen and (min-width: 1441px)
		width: 850px
	@media screen and (min-width: 1921px)
		width: 1400px

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

img.key.think
	position: relative
	top: -100px
	left: 0
	object-fit: cover
	width: 100%
	height: 540px
	@media screen and (min-width: 1025px)
		height: 868px

</style>
