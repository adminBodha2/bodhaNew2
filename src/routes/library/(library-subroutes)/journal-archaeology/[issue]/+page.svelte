<script lang="ts">
	import { page } from '$app/state';
	import type { PageData } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
	import '$lib/styles/system/document-layout.sass';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';

	let { data } = $props();
</script>

<div class="labelbox title-area">
	<Crumb showT={true} title={data.title} />
</div>
<div class="doctext classic-document ptop32 pbot16">
	<data.content />
</div>
<section class="box bordertop ptop32 rgap24">
	<h2 class="txt-2xl w600">Related</h2>
	<div class="grid grid-cols-1 lg:grid-cols-2 white-grid related-articles">
		{#each data.relatedArticles as item}
			<div class="box whitestone p16 lg:p32">
				<p class="txt-xs tt-u w500 theme">{item.pubref}</p>
				<p class="txt-xl w500 ptop16 pbot8">{item.title}</p>
				<p class="grey1 pbot16">{item.authors}</p>
				<a class="linked w500 tt-u" href={item.link} target="_blank" rel="noreferrer">SEE JOURNAL→</a>
			</div>
		{/each}
	</div>
</section>
