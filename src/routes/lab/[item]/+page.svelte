<script lang="ts">
	import { page } from '$app/stores';
	import { formatYear, formatDOM, formatMonth } from '$lib/utils/localpulls.js';
	import Head from '$lib/comps/headcomponent.svelte';
	export let data;

	let yOP: string;
	let dOM: string;
	let mOD: string;

	$: if ($page) {
		yOP = formatYear(data.date);
		dOM = formatDOM(data.date);
		mOD = formatMonth(data.date);
	}
</script>

<Head
	title={data.title}
	metaDescription={data.excerpt}
	metaImage="/images/key-research.webp"
	metaUrl={'https://www.bodharesearch.in' + $page.url.pathname}
/>

<section class="content-area">
	<div class="borderbot pbot32">
		<small class="blue"><a class="blank" href="/lab">BODHA LAB</a> | <span class="lgrey tt-u">{data.category}</span></small>
		<h2 class="source-serif">{data.title}</h2>
		<p class="sm pbot16">{data.excerpt}</p>
		<small class="label white">{dOM} {mOD}, {yOP}</small>
	</div>
	<article class="classic-document ptop32">
		<svelte:component this={data.content} />
	</article>
</section>