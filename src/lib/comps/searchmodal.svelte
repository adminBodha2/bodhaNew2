<script lang="ts">

	import { onMount } from 'svelte'
	import Close from '$lib/icons/close.svelte'
	import { createPostsIndex, searchPostsIndex, type SearchResult } from '$lib/utils/search'
	import type { SearchItem } from '$lib/utils/search'
	import { searchState, toggleSearch } from '$lib/utils/globalstores'

	let search: 'loading' | 'ready' = 'loading'
  	let searchTerm = ''
  	let results: SearchResult[] = []

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
<div class="sm-back" class:open={$searchState} on:click={closeifOff}>
	<div class="sm-panel" on:click|stopPropagation>

		<div class="sm-header">
			<div class="sm-header-left">
				<span class="sm-icon">⌕</span>
				<p class="eyebrow tt-u sm-label">Search</p>
			</div>
			<button class="blank sm-close" on:click={toggleSearch}>
				<Close larger={true}/>
			</button>
		</div>

		<div class="sm-input-wrap">
			{#if search === 'ready'}
				<input
					bind:value={searchTerm}
					placeholder="Search articles, books, topics…"
					autocomplete="off"
					spellcheck="false"
					type="search"
					class="sm-input"
				/>
			{:else}
				<div class="sm-loading">
					<span class="eyebrow tt-u">Loading index…</span>
				</div>
			{/if}
		</div>

		{#if results.length > 0}
		<div class="sm-results">
			{#each results as result}
			<a class="sm-result blank" href={result.slug} on:click={toggleSearch}>
				{#if result.category}
				<span class="sm-result-cat eyebrow tt-u">{result.category}</span>
				{/if}
				<p class="sm-result-title">{@html result.title}</p>
				{#if result.content}
				<p class="sm-result-excerpt">{@html result.content}</p>
				{/if}
			</a>
			{/each}
		</div>
		{:else if searchTerm.trim() && search === 'ready'}
		<div class="sm-empty">
			<p class="eyebrow tt-u">No results for "{searchTerm}"</p>
		</div>
		{/if}

	</div>
</div>

<style lang="sass">

.sm-back
	position: fixed
	inset: 0
	z-index: 999
	background: rgba(0,0,0,0)
	backdrop-filter: blur(0px)
	display: flex
	align-items: flex-start
	justify-content: center
	padding-top: 6vh
	pointer-events: none
	visibility: hidden
	opacity: 0
	transition: background 0.18s ease, backdrop-filter 0.18s ease, opacity 0.18s ease, visibility 0s 0.18s
	&.open
		background: rgba(0,0,0,0.35)
		backdrop-filter: blur(6px)
		pointer-events: all
		visibility: visible
		opacity: 1
		transition: background 0.18s ease, backdrop-filter 0.18s ease, opacity 0.18s ease, visibility 0s 0s
	@media screen and (max-width: 1024px)
		padding-top: 0
		align-items: flex-end

.sm-panel
	background: #FFFFFF
	border: 1px solid rgba(0,0,0,0.07)
	border-radius: 16px
	box-shadow: 0 8px 32px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06)
	display: flex
	flex-direction: column
	overflow: hidden
	@media screen and (min-width: 1025px)
		width: 56%
		max-width: 680px
		max-height: 78vh
	@media screen and (max-width: 1024px)
		width: 100%
		max-height: 88dvh
		border-bottom-left-radius: 0
		border-bottom-right-radius: 0

// ── HEADER ────────────────────────────────────────────────

.sm-header
	display: flex
	align-items: center
	justify-content: space-between
	padding: 1.1rem 1.25rem
	border-bottom: 1px solid rgba(0,0,0,0.06)
	flex-shrink: 0

.sm-header-left
	display: flex
	align-items: center
	gap: 8px

.sm-icon
	font-size: 1rem
	color: var(--text-ghost)
	line-height: 1

.sm-label
	color: var(--text-ghost)

.sm-close
	color: var(--text-ghost)
	transition: color 0.12s ease
	&:hover
		color: var(--text-main)

// ── INPUT ─────────────────────────────────────────────────

.sm-input-wrap
	padding: 1rem 1.25rem
	border-bottom: 1px solid rgba(0,0,0,0.06)
	flex-shrink: 0

.sm-input
	width: 100%
	padding: 0.7rem 0.9rem
	font-size: 1rem
	border: 1px solid rgba(0,0,0,0.1)
	border-radius: 8px
	background: #F5F4F2
	color: var(--text-main)
	transition: border-color 0.15s ease, box-shadow 0.15s ease
	outline: none
	&::placeholder
		color: var(--text-ghost)
	&:focus
		border-color: var(--theme)
		box-shadow: 0 0 0 3px rgba(var(--theme-rgb, 0,0,0), 0.06)
		background: #FFFFFF

.sm-loading
	padding: 0.5rem 0

// ── RESULTS ───────────────────────────────────────────────

.sm-results
	overflow-y: auto
	flex: 1
	padding: 0.75rem
	display: flex
	flex-direction: column
	gap: 2px
	&::-webkit-scrollbar
		width: 4px
	&::-webkit-scrollbar-thumb
		background: rgba(0,0,0,0.12)
		border-radius: 2px
	&::-webkit-scrollbar-track
		background: transparent

.sm-result
	display: flex
	flex-direction: column
	gap: 3px
	padding: 0.85rem 1rem
	border-radius: 10px
	transition: background 0.12s ease
	&:hover
		background: #F5F4F2

.sm-result-cat
	color: var(--theme)
	font-size: 9px

.sm-result-title
	font-size: 0.93rem
	font-weight: 600
	color: var(--text-main)
	margin: 0
	line-height: 1.3

.sm-result-excerpt
	font-size: 0.8rem
	color: var(--text-ghost)
	margin: 0
	line-height: 1.5
	display: -webkit-box
	-webkit-line-clamp: 2
	-webkit-box-orient: vertical
	overflow: hidden

.sm-empty
	padding: 2rem 1.25rem
	text-align: center
	color: var(--text-ghost)

</style>
