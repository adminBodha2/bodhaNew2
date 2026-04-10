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

<div class="lab-article">
	<a class="article-back-item" href="/lab">
		<i class="ri-arrow-left-s-line ri-2x" style="color: var(--blue-light)"></i>
		<span class="article-back-title">BODHA LAB</span>
	</a>
	<h2 class="lab-article-title">{data.title}</h2>
	<p class="lab-article-excerpt">{data.excerpt}</p>
	<div class="lab-article-meta">
		<span class="lab-article-pill">
			<i
				style="color: var(--blue-main)"
				class={data.category === 'Books'
					? 'ri-book-2-fill ri-2x'
					: data.category === 'Opinions'
						? 'ri-chat-voice-fill ri-2x'
						: 'ri-sticky-note-fill ri-2x'}
			></i>
			{data.category}</span
		>
		<span class="lab-article-date">{dOM} {mOD}, {yOP}</span>
	</div>
	<article class="lab-article-body column">
		<svelte:component this={data.content} />
	</article>
</div>

<style lang="sass">

.article-back-item
  text-decoration: none
  font-size: 12px
  font-weight: 700
  letter-spacing: -0.3px
  margin-bottom: 24px
  &:hover
    .article-back-title
      color: var(--blue-light)
  .article-back-title
    color: var(--grey-ink)

</style>
