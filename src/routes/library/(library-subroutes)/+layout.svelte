<script lang="ts">
	import { page } from '$app/state';
	import Container from '$lib/comps/wrapper.svelte';
	import '$lib/styles/system/document-layout.sass';
	import { libCategories, libPaths } from '$lib/utils/localsends';
	import libraryItems from '$lib/serving/library-items.json';
	import pathItems from '$lib/serving/path-books-map.json';

	let { children } = $props();

	type LibraryItem = (typeof libraryItems)[number];
	type PathBook = (typeof pathItems)[number];

	function accordionForPath(pathname: string) {
		const category = libCategories.find((item) => item.href === pathname);
		if (category) {
			return `category:${category.forLink}`;
		}

		const path = libPaths.find((item) => item.href === pathname);
		if (path) {
			return `path:${path.href.split('/').at(-1)}`;
		}

		return null;
	}

	let openAccordion = $state<string | null>(accordionForPath(page.url.pathname));
	let lastPath = $state(page.url.pathname);

	let currentAccordion = $derived(accordionForPath(page.url.pathname));

	let booksByCategory = $derived.by<Record<string, LibraryItem[]>>(() => {
		return libCategories.reduce<Record<string, LibraryItem[]>>((groups, category) => {
			groups[category.forLink] = libraryItems.filter((item) => item.type === category.forLink);
			return groups;
		}, {});
	});

	let booksByPath = $derived.by<Record<string, PathBook[]>>(() => {
		return libPaths.reduce<Record<string, PathBook[]>>((groups, path) => {
			const slug = path.href.split('/').at(-1);
			if (slug) {
				groups[slug] = pathItems.filter((item) => item.group === slug);
			}
			return groups;
		}, {});
	});

	function toggleAccordion(key: string) {
		openAccordion = openAccordion === key ? null : key;
	}

	$effect(() => {
		if (page.url.pathname !== lastPath) {
			lastPath = page.url.pathname;
			openAccordion = currentAccordion;
		}
	});
</script>

<Container>
	<section class="docgrid scrollside">
		<div class="box docside">
			<div class="doclist">
				<div class="box sidebar-acco">
					<p class="sidebar-label">Categories</p>
					{#each libCategories as cat}
						{@const accordionKey = `category:${cat.forLink}`}
						<div class="accordion-item">
							<button class="sidebar-button" class:active={openAccordion === accordionKey} type="button" aria-expanded={openAccordion === accordionKey} aria-controls={`library-category-${cat.forLink}`} onclick={() => toggleAccordion(accordionKey)}>
								<span>{cat.label}</span>
								<span class="accordion-icon" aria-hidden="true">{openAccordion === accordionKey ? '-' : '+'}</span>
							</button>
							{#if openAccordion === accordionKey}
								<div class="book-list" id={`library-category-${cat.forLink}`}>
									{#if booksByCategory[cat.forLink]?.length}
										{#each booksByCategory[cat.forLink] as book}
											<a class="book-link" href={book.type === 'aryan-issue' ? book.linkreal : book.linkfinal} target={book.type === 'aryan-issue' ? '_blank' : undefined} rel={book.type === 'aryan-issue' ? 'noreferrer' : undefined}>
												{book.name}
											</a>
										{/each}
									{:else}
										<a class="book-link muted" href={cat.href}>{cat.label}</a>
									{/if}
								</div>
							{/if}
						</div>
					{/each}
					<p class="sidebar-label mtop16">Paths</p>
					{#each libPaths as path}
						{@const pathSlug = path.href.split('/').at(-1)}
						{@const accordionKey = `path:${pathSlug}`}
						<div class="accordion-item">
							<button class="sidebar-button" class:active={openAccordion === accordionKey} type="button" aria-expanded={openAccordion === accordionKey} aria-controls={`library-path-${pathSlug}`} onclick={() => toggleAccordion(accordionKey)}>
								<span>{path.label}</span>
								<span class="accordion-icon" aria-hidden="true">{openAccordion === accordionKey ? '-' : '+'}</span>
							</button>
							{#if openAccordion === accordionKey}
								<div class="book-list" id={`library-path-${pathSlug}`}>
									{#if pathSlug && booksByPath[pathSlug]?.length}
										{#each booksByPath[pathSlug] as book}
											<a class="book-link" href={book.link}>
												{book.text}
											</a>
										{/each}
									{:else}
										<a class="book-link muted" href={path.href}>{path.label}</a>
									{/if}
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		</div>
		<div class="docmain sm:pbot32">
			{@render children?.()}
		</div>
	</section>
</Container>

<style lang="sass">

.docmain
	background: var(--color-back)

.sidebar-acco
	gap: 1px

.sidebar-label
	padding: 1rem 1rem 0.5rem
	color: var(--color-grey-0)
	font-size: 0.75rem
	letter-spacing: 0
	text-transform: uppercase

.accordion-item
	border-bottom: var(--border-main)

.sidebar-button
	width: 100%
	display: flex
	align-items: center
	justify-content: space-between
	gap: 1rem
	padding: 0.875rem 1rem
	border: none
	background: transparent
	color: var(--color-text)
	text-align: left
	cursor: pointer
	transition: background 180ms ease-out, color 180ms ease-out
	font-size: 1.1rem
	&:hover
		background: var(--color-stone-1)
		color: var(--color-primary)
	&.active
		background: var(--color-stone-1)
		color: var(--color-primary)
	@media (min-width: 1025px)
		font-size: 1rem

.accordion-icon
	flex: 0 0 auto
	font-size: 1.1rem
	line-height: 1

.book-list
	display: flex
	flex-direction: column
	padding: 0.25rem 0 0.75rem

.book-link
	display: block
	padding: 0.4rem 1rem 0.4rem 1.5rem
	color: var(--color-grey-2)
	text-decoration: none
	transition: background 180ms ease-out, color 180ms ease-out
	&:hover
		background: var(--color-stone-1)
		color: var(--color-primary)
	&.muted
		color: var(--color-grey-3)

</style>
