<script lang="ts">

	import { onMount } from 'svelte'
	import Close from '$lib/icons/close.svelte'
	import { createPostsIndex, searchPostsIndex, type SearchResult } from '$lib/utils/search'
	import type { SearchItem } from '$lib/utils/search'
	import { searchState, toggleSearch } from '$lib/utils/globalstores'

	let search: 'loading' | 'ready' = 'loading'
  	let searchTerm = ''
  	let results: SearchResult[] = []      // <-- explicit type

	function closeifOff() {
  		$searchState = false
	}

	onMount(async () => {
    	const posts = await fetch('/api/search.json').then((res) => res.json())
    	const items: SearchItem[] = posts.map((entry: any) => ({
      		title: entry.meta.title,
      		slug: entry.linkpath,
      		content: entry.meta.excerpt ?? "",
      		category: entry.meta.category,
      		tags: entry.meta.tags
    	}))
   		createPostsIndex(items)
   	 	search = 'ready'
  })

  $: if (search === 'ready') {
    ;(async () => {
      // if searchTerm is empty, clear results quickly (optional)
      if (!searchTerm.trim()) {
        results = []
        return
      }
      results = await searchPostsIndex(searchTerm)
    })()
  }

</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="column search-modal-back" class:inside={$searchState} on:click={closeifOff}>
	<div class="column search-modal rgap32" on:click|stopPropagation>
		<div class="row ycenter xbetween">
			<small class="blue">SEARCH</small>
			<button class="blank" on:click={toggleSearch}>
				<Close larger={true}/>
			</button>
		</div>
		<div class="column search-and-result">
			{#if search === 'ready'}
				<input bind:value={searchTerm} placeholder="Search" autocomplete="off" spellcheck="false" type="search" class="search-input"/>
			{/if}
		</div>
		{#if results.length}
		<div class="column tinned rgap16">
			{#each results as result}
				<div class="column">
					<p><a class="blank linked" href={result.slug} on:click={toggleSearch}>{@html result.title}</a></p>
					<p class="sm lgrey">{@html result.content}</p>
				</div>
			{/each}
			</div>
		{/if}
	</div>
</div>

<style lang="sass">

input
	padding: 1rem
	border-radius: 8px
	border: 1px solid var(--grey-std)

.column.tinned
	@media screen and (min-width: 1025px)
		height: 75%
		overflow-y: scroll
	@media screen and (max-width: 1024px)
		height: calc(100vh - 240px)
		overflow-y: scroll

.search-modal-back
	display: flex
	flex-direction: column
	align-items: center
	justify-content: center
	height: 100vh
	width: 100vw
	position: fixed
	top: 100vh
	left: 0
	z-index: 999
	backdrop-filter: blur(7px)
	transition: all 0.12s ease
	padding: 0
	&.inside
		top: 0

.search-modal
	::-webkit-scrollbar
		width: 4px
	::-webkit-scrollbar-thumb
		background: var(--theme)
	::-webkit-scrollbar-track
		background: var(--background)

.search-modal
	background: var(--background)
	border: 1px solid var(--grey-sm)
	border-radius: 8px
	z-index: 2999
	@media screen and (min-width: 1025px)
		width: 60%
		height: 80%
		padding: 2rem
	@media screen and (max-width: 1024px)
		width: 100%
		height:  100%
		padding: 2rem

</style>