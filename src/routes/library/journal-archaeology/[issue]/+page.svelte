<script lang="ts">

	import { page } from '$app/state';
	import type { PageData } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
	import '$lib/styles/lab2.sass';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';

	let { data } = $props();

</script>

<Container>
	<section class="documents-grid">
		<div class="box sidearea">
			{#if data.groups?.length > 0}
				<div class="all-items">
					{#each data.groups as item}
					{#if item.meta.title !== data.title}
					<a class="project-link sidebar-text" href={item.linkpath}>
						{item.meta.title}
					</a>
					{/if}
					{/each}
				</div>
			{/if}
		</div>
		<div class="stdbox mainarea stdpad is-last header-margin">
			<div class="labelbox title-area">
				<Crumb showT={true} title={data.title}/>
			</div>
			<div class="classic-document">
				<data.content />
			</div>
			<div class="grid two white-grid" style="margin-top: -1rem">
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

</style>