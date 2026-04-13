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
	<div class="column pbot32">
		<Crumb item1="INSPIRATION" item1Link="/inspiration" show2={true} item2={data.title} />
		<h2 class="source-serif tight">{data.title}</h2>
		<p class="sm grey ptop8 pbot16">{data.description}</p>
		<div class="row cgap8 rgap8 ycenter">
			{#each data.tags as tag}
				<small class="label white tt-u">{tag.replaceAll('-', ' ')}</small>
			{/each}
		</div>
	</div>
	<div class="column rgap32">
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
