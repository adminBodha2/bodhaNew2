<script lang="ts">
	import { page } from '$app/state';
	import type { PageData } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import '$lib/styles/system/document-layout.sass';
	import Head from '$lib/comps/headcomponent.svelte';
	import autoAnimate from '@formkit/auto-animate';
	import ResponsiveMenu from '$lib/comps/responsive-menu-2.svelte';
	import { absoluteImage, absoluteUrl, collectionPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';
	import Slide from '$lib/svelteanim/components/Slide2.svelte';
	import Cut from '$lib/svelteanim/components/Cut.svelte';

	type BharataRow = {
		id?: number;
		section?: string | null;
		subsection?: string | null;
		title?: string | null;
		author?: string | null;
		description?: string | null;
		link?: string | null;
		'reading-path'?: string | null;
	};

	type ReadingPath = {
		meta: Record<string, any>;
		linkpath: string;
		books: BharataRow[];
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
	let paths = $derived((data.paths ?? []) as ReadingPath[]);
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

	let activeSection = $derived(selectedSection);
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
		if (selectedSection === section) {
			selectedSection = null;
		} else {
			selectedSection = section;
		}
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

<Container>
<section class="wrapper-std">
	<Crumb showT={true} title="Bharata1000" showD={true} desc={metaDescription} fullP={true}/>
	<div class="grid grid-cols-1 lg:grid-cols-2 cgap64 rgap16">
		<div class="box rgap16 slide-item">
			<p class="highlight-text">Bharata1000 is a curation of 1000 books to learn and understand itihasa, Bharata, and Dharma. The idea here is to provide rampways and reading paths for those looking to study deeper into civilizational and cultural Bharata. Presenting a work in this list is not an endorsement of its contents, for many are listed to inform the reader's shatrubodha, and expose them to problematic but well-known paradigms for India and Dharma.</p>
		</div>
		<div class="box rgap16 slide-item">
			<p class="highlight-text">There are two primary ways to explore the curation. The books are organized over 36 sections, each with sub-sections, that group them thematically and subject-wise. We have also put 15 reading paths together, addressing different interest, application and comfort levels.</p>
		</div>
	</div>
</section>
<section class="wrapper-std growingline">
	<Slide class=".slide-item">
		<div class="grid grid-cols-1 lg:grid-cols-3 gap16">
			{#each paths as path, i}
				<div class="std-pad box rgap8 slide-item ncolor">
					<div class="box borderbot pbot16">
					<div class="box">
						<p class="txt-00 tt-u w500 grey0" style="color: {path.meta.color}">{path.meta.id}</p>
						<p class="txt-00 tt-u w500 grey2">{path.meta.focus}</p>
					</div>
					<p class="txt-xl lg:txt-2xl w600 ptop16">{path.meta.title}</p>
					<p class="grey1">{path.meta.description}</p>
					</div>
					{#if path.books && path.books.length > 0}
						<div class="box rgap8">
								{#each path.books as b}
									{#if b.link}
										<a
											class="linker"
											href={b.link}
											target={isExternalLink(b.link) ? '_blank' : undefined}
											rel={isExternalLink(b.link) ? 'noreferrer' : undefined}
										>
											<p class="txt-lg a-hover">{b.title}</p>
											<p class="txt-xs grey1">{b.author}</p>
										</a>
									{:else}
										<p class="txt-lg">
											{b.title}
										</p>
									{/if}
								{/each}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</Slide>
</section>
<section class="box growingline alternate">
	{#if sections.length > 0}
		<div class="docgrid">
			<aside class="docside">
				<div class="box stickybox">
				{#each sections as section}
					<button 
						class="section-button" 
						class:active={activeSection === section.name}
						onclick={() => selectSection(section.name)}
						type="button"
					>
						<span>{section.name}</span>
						<span>{section.count}</span>
					</button>
				{/each}
				</div>
			</aside>
			<div class="mobside">
				<ResponsiveMenu>
					{#each sections as section}
					<button class="selection-button" class:active={activeSection === section.name} onclick={() => selectSection(section.name)}>{section.name}</button>
					{/each}
			</ResponsiveMenu>
			</div>
			<div class="docmain mainarea">
				<div class="grid grid-cols-1 lg:grid-cols-3 gap16" use:autoAnimate>
					{#each visibleRows as item}
						{#if item.link}
							<a class="rgap8 blank box tight-pad whitestone" href={item.link} target={isExternalLink(item.link) ? '_blank' : undefined} rel={isExternalLink(item.link) ? 'noreferrer' : undefined}>
								<p class="txt-lg w600 a-hover">{item.title}</p>
								{#if item.description}
									<p class="grey1 lh14">{item.description}</p>
								{/if}
								{#if item.author}
									<p class="txt-xs tt-u w500 theme-dark self-bottom">{item.author}</p>
								{/if}
							</a>
						{:else}
							<div class="rgap8 blank box tight-pad whitecard">
								<p class="txt-lg w600">{item.title}</p>
								{#if item.description}
									<p class="grey1 lh14">{item.description}</p>
								{/if}
								{#if item.author}
									<p class="txt-xs tt-u w500 theme-dark self-bottom">{item.author}</p>
								{/if}
							</div>
						{/if}
					{/each}
				</div>
			</div>
		</div>
	{/if}
</section>
</Container>

<style lang="sass">

.docgrid
	@media (max-width: 1024px)
		grid-template-areas: "mobside" "mainarea"
		.mobside
			grid-area: mobside
		.mainarea
			grid-area: mainarea

.docside
	height: 100%
	@media (max-width: 1024px)
		display: none

.mobside
	@media (min-width: 1025px)
		display: none

.docside .stickybox
	display: flex
	flex-direction: column
	gap: 2px
	@media (min-width: 1025px)
		position: sticky
		top: 80px
		height: calc(100vh - 80px)
		overflow-y: scroll
		padding: 2rem 1rem 2rem 0
	button.section-button
		width: 100%
		display: flex
		align-items: center
		justify-content: space-between
		gap: 0.75rem
		padding: 0.4rem 0.75rem
		margin: 0
		border: none
		background: transparent
		text-align: left
		font-size: 0.92rem
		color: var(--color-grey-2)
		cursor: pointer
		transition: background 110ms ease-out, color 110ms ease-out
		letter-spacing: 0.01em
		&:hover
			background: var(--color-stone-1)
			color: var(--color-text)
		&.active
			background: var(--color-theme-dark)
			color: #fff
		span:last-child
			font-size: 0.78rem
			font-weight: 400
			opacity: 0.75
			padding-left: 0.5rem

.docmain
	@media (min-width: 1025px)
		padding-left: 4rem

button.selection-button
	padding: 0.5rem
	font-size: 0.85rem
	text-transform: uppercase
	background: var(--color-back)
	border: none

</style>
