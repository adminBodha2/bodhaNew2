<script lang="ts">
	import { page } from '$app/state';
	import type { PageData } from './$types';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import { absoluteImage, absoluteUrl, collectionPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';

	type BharataRow = {
		id?: number;
		section?: string | null;
		subsection?: string | null;
		title?: string | null;
		author?: string | null;
		description?: string | null;
		link?: string | null;
	};

	type SectionGroup = {
		name: string;
		count: number;
		subsections: {
			name: string;
			count: number;
		}[];
	};

	let { data }: { data: PageData } = $props();

	const fallbackSection = 'Unsectioned';
	const fallbackSubsection = 'General';
	const title = 'Bharata1000 | Bodha Open Library';
	const metaDescription = 'A curated reading list of books for studying itihasa, Bharata, Dharma, and civilizational knowledge.';
	const metaImage = absoluteImage('/images/key-bol.webp');
	let metaUrl = $derived(absoluteUrl(page.url.pathname));

	let selectedSection = $state<string | null>(null);
	let selectedSubsection = $state<string | null>(null);

	let rows = $derived((data.rows ?? []) as BharataRow[]);
	let sections = $derived.by<SectionGroup[]>(() => {
		const groups = new Map<string, BharataRow[]>();

		for (const row of rows) {
			const section = row.section?.trim() || fallbackSection;
			groups.set(section, [...(groups.get(section) ?? []), row]);
		}

		return [...groups.entries()].map(([name, items]) => {
			const subsectionGroups = new Map<string, BharataRow[]>();

			for (const item of items) {
				const subsection = item.subsection?.trim() || fallbackSubsection;
				subsectionGroups.set(subsection, [...(subsectionGroups.get(subsection) ?? []), item]);
			}

			return {
				name,
				count: items.length,
				subsections: [...subsectionGroups.entries()].map(([subsectionName, subsectionItems]) => ({
					name: subsectionName,
					count: subsectionItems.length
				}))
			};
		});
	});

	let activeSection = $derived(selectedSection ?? sections[0]?.name ?? null);
	let visibleRows = $derived.by(() => {
		return rows.filter((row) => {
			const section = row.section?.trim() || fallbackSection;
			const subsection = row.subsection?.trim() || fallbackSubsection;

			if (activeSection && section !== activeSection) return false;
			if (selectedSubsection && subsection !== selectedSubsection) return false;

			return true;
		});
	});

	let activeHeading = $derived(
		selectedSubsection ? `${activeSection} / ${selectedSubsection}` : activeSection || 'Bharata1000'
	);

	let jsonld = $derived(
		stringifyJsonLd(
			collectionPageJsonLd({
				name: title,
				description: metaDescription,
				url: metaUrl,
				image: metaImage,
				items: visibleRows.map((item) => ({
					name: item.title ?? 'Untitled',
					description: item.description ?? undefined,
					url: item.link ?? metaUrl
				}))
			})
		)
	);

	function selectSection(section: string) {
		selectedSection = section;
		selectedSubsection = null;
	}

	function selectSubsection(section: string, subsection: string) {
		selectedSection = section;
		selectedSubsection = subsection;
	}

	function isExternalLink(link: string | null | undefined) {
		return typeof link === 'string' && link.startsWith('http');
	}
</script>

<Head {title} {metaDescription} {metaImage} {metaUrl} imWidth="1536" imHeight="1024" {jsonld} />

<section class="box rgap32">
	<Crumb serifed={false} showT={true} title="Bharata1000" showD={true} desc={metaDescription} fullP={true} sidebarSoloPad2={true}/>
	{#if sections.length > 0}
		<div class="bharata-layout">
			<aside class="box bharata-nav">
				{#each sections as section}
					<div class="box section-group">
						<button class="section-button" class:active={activeSection === section.name && !selectedSubsection} type="button" onclick={() => selectSection(section.name)}>
							<span>{section.name}</span>
							<span>{section.count}</span>
						</button>
						<div class="box subsection-list">
							{#each section.subsections as subsection}
								<button class="subsection-button" class:active={activeSection === section.name && selectedSubsection === subsection.name} type="button" onclick={() => selectSubsection(section.name, subsection.name)}>
									<span>{subsection.name}</span>
									<span>{subsection.count}</span>
								</button>
							{/each}
						</div>
					</div>
				{/each}
			</aside>
			<div class="box rgap24">
				<div class="row spread cgap16 rgap8 mwrap">
					<p class="txt-2xl w600 source-serif">{activeHeading}</p>
					<p class="txt-sm tt-u w500 grey2">{visibleRows.length} texts</p>
				</div>
				<div class="grid grid-cols-1 lg:grid-cols-2 white-grid">
					{#each visibleRows as item}
						{#if item.link}
							<a class="blank box rgap16 p24 lg:p32 whitestone" href={item.link} target={isExternalLink(item.link) ? '_blank' : undefined} rel={isExternalLink(item.link) ? 'noreferrer' : undefined}>
								<p class="txt-xl w500 a-hover">{item.title}</p>
								{#if item.description}
									<p class="grey1 lh14">{item.description}</p>
								{/if}
								{#if item.author}
									<p class="txt-xs tt-u w500 theme self-bottom">{item.author}</p>
								{/if}
							</a>
						{:else}
							<div class="box rgap16 p24 lg:p32 whitestone">
								<p class="txt-xl w500">{item.title}</p>
								{#if item.description}
									<p class="grey1 lh14">{item.description}</p>
								{/if}
								{#if item.author}
									<p class="txt-xs tt-u w500 theme self-bottom">{item.author}</p>
								{/if}
							</div>
						{/if}
					{/each}
				</div>
			</div>
		</div>
	{:else}
		<div class="box p24 lg:p32 whitestone">
			<p class="grey1">No Bharata1000 records are available.</p>
		</div>
	{/if}
</section>

<style lang="sass">

.bharata-layout
	display: grid
	grid-template-columns: minmax(0, 1fr)
	gap: 2rem
	@media (min-width: 1025px)
		grid-template-columns: minmax(240px, 320px) minmax(0, 1fr)
		align-items: start

.bharata-nav
	border: var(--border-main)
	background: var(--color-back)
	@media (min-width: 1025px)
		position: sticky
		top: 6rem

.section-group
	border-bottom: var(--border-main)
	&:last-child
		border-bottom: none

.section-button,
.subsection-button
	width: 100%
	display: flex
	align-items: center
	justify-content: space-between
	gap: 1rem
	border: none
	background: transparent
	text-align: left
	cursor: pointer
	transition: background 180ms ease-out, color 180ms ease-out
	letter-spacing: 0
	&:hover,
	&.active
		background: var(--color-stone-1)
		color: var(--color-primary)

.section-button
	padding: 1rem
	color: var(--color-text)
	font-size: 1rem
	font-weight: 600

.subsection-list
	padding: 0 0 0.75rem

.subsection-button
	padding: 0.35rem 1rem 0.35rem 1.5rem
	color: var(--color-grey-2)
	font-size: 0.92rem

</style>
