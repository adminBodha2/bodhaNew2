<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/state';
	import autoAnimate from '@formkit/auto-animate';
	import Container from '$lib/comps/container.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';

	export let data: PageData;
	let selectedKind = 'all';

	function toggleKind(newKind: string) {
		selectedKind = newKind;
	}
</script>

<Head title="{data.tagTitle} | Bodha Tags" metaDescription="Explore all content related to {data.tagTitle} at Bodha." metaImage="/images/bodhacover/png" metaUrl={'https://www.bodharesearch.in' + page.url.pathname} />

<Container narrow={true} scaled={true}>
	<div class="box std padded-ontop">
		<Crumb rgap={16} item1="Tags" item1Link="/tags" showT={true} title={data.tagTitle} showRow={true}>
				<div class="row cgap8 rgap8 wrap">
					<button class="filter-button tt-u" class:active={selectedKind === 'all'} on:click={() => toggleKind('all')}>All</button>
					<button class="filter-button tt-u" class:active={selectedKind === 'article'} on:click={() => toggleKind('article')}>Essays</button>
					<button class="filter-button tt-u" class:active={selectedKind === 'external-article'} on:click={() => toggleKind('external-article')}>External Posts</button>
					<button class="filter-button tt-u" class:active={selectedKind === 'research'} on:click={() => toggleKind('research')}>Research</button>
					<button class="filter-button tt-u" class:active={selectedKind === 'big question'} on:click={() => toggleKind('big question')}>Big Questions</button>
					<button class="filter-button tt-u" class:active={selectedKind === 'school'} on:click={() => toggleKind('school')}>Schools</button>
					<button class="filter-button tt-u" class:active={selectedKind === 'thinkerl'} on:click={() => toggleKind('thinker')}>Thinkers</button>
				</div>
		</Crumb>

		<div class="grid four standard-grid stay2" use:autoAnimate>
			{#each data.articles as article}
				{#if article.kind === selectedKind && selectedKind !== 'all'}
				
						<div class="box number labelbox">
							{#if selectedKind === 'external-article'}
								<p class="card-title tight"><a class="blank linker" target="_blank" rel="noreferrer" href={article.route}>{article.title}</a></p>
							{:else}
								<p class="card-title tight"><a class="blank linker" href={article.route}>{article.title}</a></p>
							{/if}
							<p class="grey small-text">{article.description}</p>
						</div>
		
				{:else if selectedKind === 'all'}
		
						<div class="box number labelbox">
							{#if article.kind === 'external-article'}
								<p class="card-title tight"><a class="blank linker" target="_blank" rel="noreferrer" href={article.route}>{article.title}</a></p>
							{:else}
								<p class="card-title tight"><a class="blank linker" href={article.route}>{article.title}</a></p>
							{/if}
							<p class="grey small-text">{article.description}</p>
							<p class="citation-big blue tt-u">{article.kind}</p>
						</div>
	
				{/if}
			{/each}
		</div>
	</div>
</Container>

<style lang="sass">

.box.number
	padding: 1.4rem

.padded-ontop
	min-height: calc(100vh - 160px)

</style>
