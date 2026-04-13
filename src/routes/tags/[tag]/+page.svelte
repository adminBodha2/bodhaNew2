<script lang="ts">

	import type { PageData } from './$types';
	import { page } from '$app/state'
	import autoAnimate from '@formkit/auto-animate';
	import Container from '$lib/comps/container.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';

	export let data: PageData;
	let selectedKind = 'article'

	function toggleKind(newKind:string){
		selectedKind = newKind
	}
	
</script>

<Head 
    title="{data.tagTitle} | Bodha Tags" 
    metaDescription="Explore all content related to {data.tagTitle} at Bodha." 
	metaImage="/images/bodhacover/png"
	metaUrl={'https://www.bodharesearch.in' + page.url.pathname}
/>

<Container narrow={true}>
	<div class="box-t">
		<div class="column">
			<Crumb item1="TAGS" item1Link="/tags" show2={true} item2={data.tagTitle}/>
			<h2 class="source-serif tight tt-c">{data.tagTitle}</h2>
			<div class="row cgap8 rgap8 wrap ptop16">
				<button class="ftnbtn" class:active={selectedKind === ''} on:click={() => toggleKind('')}>All</button>
				<button class="ftnbtn" class:active={selectedKind === "article"} on:click={() => toggleKind("article")}>Essays</button>
				<button class="ftnbtn" class:active={selectedKind === "external-article"} on:click={() => toggleKind("external-article")}>External Posts</button>
				<button class="ftnbtn" class:active={selectedKind === "research"} on:click={() => toggleKind("research")}>Research</button>
				<button class="ftnbtn" class:active={selectedKind === "big question"} on:click={() => toggleKind("big question")}>Big Questions</button>
				<button class="ftnbtn" class:active={selectedKind === "school"} on:click={() => toggleKind("school")}>Schools</button>
				<button class="ftnbtn" class:active={selectedKind === "thinkerl"} on:click={() => toggleKind("thinker")}>Thinkers</button>
			</div>
		</div>
		<div class="grid three stacked-2 bordertop ptop32" use:autoAnimate>
			{#each data.articles as article}
			{#if article.kind === selectedKind && selectedKind !== ''}
			<div class="column rgap8 result">
				<div class="column rgap8">
					{#if selectedKind === 'external-article'}
					<p class="big bold tight"><a class="blank linker" target="_blank" rel="noreferrer" href={article.route}>{article.title}</a></p>
					{:else}
				<p class="big bold tight"><a class="blank linker" href={article.route}>{article.title}</a></p>
				{/if}
				<p class="sm grey">{article.description}</p>
				</div>
			</div>
			{:else if selectedKind === ''}
			<div class="column rgap8 result">
				<div class="column rgap8">
					{#if article.kind === 'external-article'}
					<p class="big bold tight"><a class="blank linker" target="_blank" rel="noreferrer" href={article.route}>{article.title}</a></p>
					{:else}
				<p class="big bold tight"><a class="blank linker" href={article.route}>{article.title}</a></p>
				{/if}
				<p class="sm grey">{article.description}</p>
				</div>
				<small class="label white light tt-c">{article.kind}</small>
			</div>
			{/if}
			{/each}
		</div>
	</div>
</Container>

<style lang="sass">

.grid.three.stacked-2
	align-items: stretch
	
</style>
	