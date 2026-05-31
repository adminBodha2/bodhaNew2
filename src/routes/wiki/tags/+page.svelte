<script lang="ts">
	import type { PageData } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/crumb-2.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import { absoluteImage, absoluteUrl } from '$lib/utils/seo';
	import Responsive from '$lib/comps/responsive-menu-2.svelte'

	let { data }: { data: PageData } = $props();

	const title = 'Tags | Bodha Knowledge Wiki';
	const metaDescription = 'Filter wiki items by tags from the canonical list.';
	const metaUrl = absoluteUrl('/wiki/tags');
	const metaImage = absoluteImage('/images/bodhacover.png');

	let selectedTags = $state<string[]>([]);
	let tagSearch = $state('');
	let itemSearch = $state('');

	const allTags = $derived((data?.tags ?? []) as string[]);
	const allItems = $derived((data?.items ?? []) as any[]);

	const visibleTags = $derived(
		allTags.filter((t) =>
			!tagSearch.trim() || t.toLowerCase().includes(tagSearch.toLowerCase().trim())
		)
	);

	const filteredItems = $derived.by(() => {
		const q = itemSearch.trim().toLowerCase();
		let items = allItems;

		if (selectedTags.length > 0) {
			items = items.filter((item: any) =>
				selectedTags.some((tag) => (item.tags || []).includes(tag))
			);
		}

		if (q) {
			items = items.filter((item: any) =>
				item.title?.toLowerCase().includes(q) ||
				item.description?.toLowerCase().includes(q)
			);
		}

		return items;
	});

	function toggleTag(tag: string) {
		selectedTags = selectedTags.includes(tag)
			? selectedTags.filter((t) => t !== tag)
			: [...selectedTags, tag];
	}

	function clearFilters() {
		selectedTags = [];
		itemSearch = '';
	}

	function removeTag(tag: string) {
		selectedTags = selectedTags.filter((t) => t !== tag);
	}

	function displayTag(tag: string) {
		return tag.replaceAll('-', ' ');
	}
</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="2560" imHeight="1440" />

<Container>
	<section class="wrapper-std tight-stack">
		<Crumb showT={true} title="Wiki Tags" showD={true} desc="Select tags from the list on the left to filter items." />
		<div class="doc-header-grid wide-aside inverted">
			<aside class="box">
				<div class="stickybox box rgap16">
					<input
						type="search"
						class="fordesk"
						placeholder="Search tags..."
						bind:value={tagSearch}
					/>
					{#if selectedTags.length > 0}
						<button type="button" class="small-button" onclick={clearFilters}>
							Clear all	
						</button>
						<div class="row wrap gap4">
							{#each selectedTags as tag (tag)}
								<button type="button" class="small-button hollow" onclick={() => removeTag(tag)}>
									{displayTag(tag)} ×
								</button>
							{/each}
						</div>
					{/if}
					<div class="formob">
						<Responsive>
								{#each visibleTags as tag (tag)}
							<button
								type="button"
								class="small-button"
								class:active={selectedTags.includes(tag)}
								onclick={() => toggleTag(tag)}
							>
								{displayTag(tag)}
							</button>
						{/each}
						</Responsive>
					</div>
					<div class="row wrap gap4 fordesk">
						{#each visibleTags as tag (tag)}
							<button
								type="button"
								class="filter-button"
								class:active={selectedTags.includes(tag)}
								onclick={() => toggleTag(tag)}
							>
								{displayTag(tag)}
							</button>
						{/each}
					</div>
				</div>
			</aside>
			<div class="main-area rgap32 box">
				<input
					type="search"
					placeholder="Search results..."
					bind:value={itemSearch}
				/>
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap16">
					{#if selectedTags.length === 0}
					<p>Select tag(s).</p>
					{:else}
					{#each filteredItems as item (item.id)}
						<a
							class="box whitestone tight-pad b-main"
							href={item.href}
							target={item.isExternal ? '_blank' : undefined}
							rel={item.isExternal ? 'noreferrer' : undefined}
						>
							<p class="txt-00 tt-u w500 grey1">{item.type}</p>
							<p class="txt-lg w600 a-hover">{item.title}</p>
							{#if item.description}
								<p class="grey1">{item.description}</p>
							{/if}
							{#if item.tags?.length}
								<div class="row wrap gap4 ptop8">
									{#each item.tags.slice(0, 5) as t}
										<span class="txt-00 tt-u w500 grey2">{displayTag(t)}</span>
									{/each}
								</div>
							{/if}
						</a>
					{/each}
					{/if}
				</div>
				{#if filteredItems.length === 0}
					<p class="grey1">No items match the current selection.</p>
				{/if}
			</div>
		</div>
	</section>
</Container>

<style lang="sass">

.formob
	@media (min-width: 1025px)
		display: none

.fordesk
	@media (max-width: 1024px)
		display: none

input
	padding: 0.5rem 1rem
	border: var(--border-darker)
	border-radius: 4px
	font-size: 0.9rem
	width: 100%

</style>
