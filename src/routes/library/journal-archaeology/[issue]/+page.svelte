<script lang="ts">

	import { page } from '$app/state';
	import type { PageData } from './$types';
	import Container from '$lib/comps/container.svelte';
	import '$lib/styles/lab2.sass';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';

	let { data } = $props();

</script>

<Container narrow={true} scaled={true}>
	<section class="documents-grid">
		<div class="box sidearea">
			{#if data.groups?.length > 0}
				<div class="box all-items">
					{#each data.groups as item}
					{#if item.meta.title !== data.title}
					<a class="blank project-link whitestone" href={item.linkpath}>
						<p class="rem1 tight grey">{item.meta.title}</p>
					</a>
					{/if}
					{/each}
				</div>
			{/if}
		</div>
		<div class="box mainarea">
			<div class="textbox borderbot">
				<Crumb item1="Bodha" item1Link="/" show2={true} item2="Indian Journal of Archaeology" item2linked={true} item2Link="/library/journal-archaeology"/>
				<h1 class="doc-title source-serif">{data.title}</h1>
			</div>
			<article class="wiki-body">
				<data.content />
			</article>
			<div class="grid two white-grid">
				{#each data.relatedArticles as item}
					<div class="box card-padded whitestone">
						<p class="citation-big lgrey tt-u">{item.pubref}</p>
						<p class="tight ptop4 pbot4">{item.title}</p>
						<p class="rem1 grey tight pbot8">{item.authors}</p>
						<a class="linked w500 tt-u" href={item.link} target="_blank" rel="noreferrer">SEE JOURNAL→</a>
					</div>
				{/each}
			</div>
		</div>
	</section>
</Container>

<style lang="sass">



.mainarea
	padding-bottom: 2rem
	.textbox.borderbot
		margin-top: 2rem

.wiki-body
	padding-top: 2rem

</style>