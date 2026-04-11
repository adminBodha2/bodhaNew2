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
	metaImage="/images/bodhacover.png"
	metaUrl={'https://www.bodharesearch.in' + $page.url.pathname}
/>

<div class="lab-article column rgap48">
	<div>
		<small class="blue"><a class="blank" href="/lab">BODHA LAB</a> | <span class="lgrey tt-u">{data.category} | {dOM} {mOD}, {yOP}</span></small>
		<h2 class="source-serif">{data.title}</h2>
		<p class="sm">{data.excerpt}</p>
	</div>
	<article class="lab-article-body column">
		<svelte:component this={data.content} />
	</article>
</div>