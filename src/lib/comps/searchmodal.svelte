<script lang="ts">

	import { onMount } from 'svelte';
	import SearchWorker from '$lib/search/lib-blog-search-worker?worker';
	import { searchState, toggleSearch } from '$lib/utils/globalstores'; // your existing writable<boolean>
	import type { SearchResult, SearchKind } from '$lib/search/lib-blog-search';
	import Close from '$lib/icons/close.svelte';

	let dialog = $state<HTMLDialogElement | null>(null);
	let inputEl = $state<HTMLInputElement | null>(null);
	let status = $state<'idle' | 'ready'>('idle');
	let searchTerm = $state('');
	let filter = $state<SearchKind | 'all'>('all');
	let results = $state<SearchResult[]>([]);
	let errorMsg = $state<string | null>(null);
	let worker: Worker;

	const MIN_QUERY_LENGTH = 3;

	onMount(() => {
		worker = new SearchWorker();
		worker.addEventListener('message', (e: MessageEvent) => {
			const { type, payload } = e.data;
			if (type === 'ready') status = 'ready';
			if (type === 'results') results = payload.results;
			if (type === 'error') errorMsg = payload.message;
		});
		worker.postMessage({ type: 'load' });
		return () => worker.terminate();
	});

	// open/close in response to the global store
	$effect(() => {
		if (!dialog) return;
		if ($searchState && !dialog.open) {
			dialog.showModal();
			document.body.style.overflow = 'hidden';
			queueMicrotask(() => inputEl?.focus());
		} else if (!$searchState && dialog.open) {
			dialog.close();
			document.body.style.overflow = '';
		}
	});

	// search reactively
	$effect(() => {
		if (status !== 'ready') return;
		const q = searchTerm.trim();
		if (q.length < MIN_QUERY_LENGTH) {
			results = [];
			return;
		}
		worker.postMessage({
			type: 'search',
			payload: { searchTerm: q, kind: filter === 'all' ? undefined : filter }
		});
	});

	const books = $derived(results.filter((r) => r.kind === 'book'));
	const posts = $derived(results.filter((r) => r.kind === 'post'));

	function handleClose() {
		$searchState = false;
		searchTerm = '';
		results = [];
		document.body.style.overflow = '';
	}

	function handleBackdropClick(e: MouseEvent) {
		// clicking the backdrop = clicking the dialog element itself
		if (e.target === dialog) $searchState = false;
	}
</script>

<dialog bind:this={dialog} onclose={handleClose} onclick={handleBackdropClick} aria-labelledby="search-title" class="search-dialog">
	<div class="dialog-body">
		<search>
			<form role="search" onsubmit={(e) => e.preventDefault()}>
				<input id="search-input" bind:this={inputEl} bind:value={searchTerm} placeholder="Search…" autocomplete="off" spellcheck="false" type="search" aria-controls="search-results" />
			</form>
			<button type="button" class="blank" aria-label="Close search" onclick={() => ($searchState = false)}><Close /></button>
		</search>
		{#if errorMsg || books || posts}
			<div id="search-results" class="results" role="region" aria-live="polite" aria-busy={status !== 'ready'}>
				{#if errorMsg}
					<p class="error rem1">Search unavailable: {errorMsg}</p>
				{:else if status !== 'ready'}
					<p class="rem1">Loading search…</p>
				{:else if searchTerm.trim().length > 0 && searchTerm.trim().length < MIN_QUERY_LENGTH}
					<p class="rem1">Type at least {MIN_QUERY_LENGTH} characters to search.</p>
				{:else if searchTerm.trim().length >= MIN_QUERY_LENGTH && results.length === 0}
					<p class="rem1">No matches for &ldquo;{searchTerm}&rdquo;</p>
				{/if}
				<div class="box">
					{#if books.length}
						{#each books as r (r.id)}
							<article>
								{#if r.type === 'aryan-issue'}
								<a class="result-item" href={r.linkfinal} onclick={() => ($searchState = false)} target="_blank" rel="noreferrer">
									<p class="w500 tight">{@html r.name}</p>
									<p class="small-text grey">{@html r.author}</p>
								</a>
								{:else}
								<a class="result-item" href={r.linkfinal} onclick={() => ($searchState = false)}>
									<p class="w500 tight">{@html r.name}</p>
									<p class="small-text grey">{@html r.author}</p>
								</a>
								{/if}
							</article>
						{/each}
					{/if}
					{#if posts.length}
						{#each posts as r (r.id)}
							<article>
								<a class="result-item" href={r.linkfinal} onclick={() => ($searchState = false)}>
									<p class="w500 tight">{@html r.name}</p>
									<p class="small-text grey">{@html r.author}</p>
								</a>
							</article>
						{/each}
					{/if}
				</div>
			</div>
		{/if}
	</div>
</dialog>

<style lang="sass">

.search-dialog
	border-radius: 0.75rem
	padding: 1rem
	max-width: 64rem
	width: 90vw
	max-height: 80vh
	border: 2px solid #FFFFFF
	background: linear-gradient(180deg, #FFFFFF 0%, #FBFBFB 55%, #F4F4F4 100%)
	box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.035), 0 1px 0 0 rgba(225, 225, 225, 0.55), 0 6px 14px -6px rgba(0, 0, 0, 0.10), 0 1.5px 3px 0 rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.95), inset 0 5px 10px -4px rgba(195, 195, 195, 0.42)
	opacity: 1
	transform: translateY(0)
	transition: opacity 0.25s ease, transform 0.25s ease, overlay 0.25s allow-discrete, display 0.25s allow-discrete
	margin-bottom: auto
	margin-top: 10vh
	&::backdrop
		background: rgba(0, 0, 0, 0.5)
		backdrop-filter: blur(5px)
		transition: background 0.25s ease, backdrop-filter 0.25s ease, overlay 0.25s allow-discrete, display 0.25s allow-discrete
	&:not([open])
		opacity: 0
		transform: translateY(100px)
	@starting-style
		&[open]
			opacity: 0
			transform: translateY(-300px)
	&[open]::backdrop
		background: rgba(0, 0, 0, 0.5)
		backdrop-filter: blur(5px)
	&[open]
		@starting-style
			&::backdrop
				background: rgba(0, 0, 0, 0)
				backdrop-filter: blur(0)
	@media screen and (max-width: 1024px)
		padding: 0.5rem
		width: calc(100% - 2rem)

.dialog-body
	display: flex
	flex-direction: column
	max-height: 80vh

search
	display: grid
	grid-template-columns: 1fr 32px
	padding: 1rem 1rem 0 1rem
	column-gap: 0.5rem
	@media screen and (max-width: 1024px)
		padding: 1rem 0.5rem 0 0.5rem

search form
	display: flex
	flex-direction: column
	gap: 0.5rem

input[type="search"]
	width: 100%
	padding: 0.75rem 1rem
	border: none
	border-radius: 0.5rem
	font-size: 1rem

.results
	overflow-y: auto
	padding: 0 1rem 1rem

article
	display: flex
	justify-content: space-between
	align-items: center
	padding: 0.5rem
	border-radius: 0.4rem
	&:hover
		background: #f5f5f5
	a
		text-decoration: none
		color: inherit
		flex: 1

</style>
