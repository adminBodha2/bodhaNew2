<script lang="ts">
	interface CardMeta {
		id: string;
		slug: string;
		title: string;
		sanskrit?: { transliteration?: string; devanagari?: string };
		tradition?: string;
		register?: { tradition?: string; text?: string };
		gist?: string;
		applicability?: string[];
		cross_refs?: string[];
		question?: string;
	}

	interface Card {
		meta: CardMeta;
		linkpath: string;
	}

	let { allcards }: { allcards: Card[] } = $props();

	// ─── tradition config ─────────────────────────────────────────────────────

	const TRADITIONS: Record<string, { label: string; bg: string; fg: string; dot: string }> = {
		All: { label: 'All', bg: 'transparent', fg: 'inherit', dot: '#888' },
		Nyaya: { label: 'Nyāya', bg: '#EEF2FF', fg: '#3730A3', dot: '#3730A3' },
		Yoga: { label: 'Yoga', bg: '#FFF7ED', fg: '#9A3412', dot: '#EA580C' },
		Mimamsa: { label: 'Mīmāṃsā', bg: '#FFF1F2', fg: '#9F1239', dot: '#E11D48' },
		Vedanta: { label: 'Vedānta', bg: '#F0FDF4', fg: '#166534', dot: '#16A34A' },
		Vyakarana: { label: 'Vyākaraṇa', bg: '#FAF5FF', fg: '#6B21A8', dot: '#9333EA' },
		'Alankara-shastra': { label: 'Alaṃkāra', bg: '#FFF0F6', fg: '#9D174D', dot: '#DB2777' },
		Other: { label: 'Other', bg: '#F8FAFC', fg: '#475569', dot: '#94A3B8' }
	};

	const APPLICABILITY_OPTIONS = ['Users', 'Builders', 'Stewards'];

	// ─── state ────────────────────────────────────────────────────────────────

	let activeTradition = $state('All');
	let activeApplicability = $state<string[]>([]);
	let selectedCard = $state<Card | null>(null);
	let panelOpen = $state(false);

	const pt = $derived(selectedCard ? getTradition(selectedCard) : 'Other');
	const pts = $derived(tradStyle(pt));

	// ─── derived ─────────────────────────────────────────────────────────────

	const traditions = $derived(() => {
		const seen = new Set<string>();
		for (const c of allcards) {
			const t = c.meta.tradition ?? c.meta.register?.tradition ?? 'Other';
			seen.add(t);
		}
		return ['All', ...Object.keys(TRADITIONS).filter((k) => k !== 'All' && seen.has(k))];
	});

	const filteredCards = $derived(() => {
		return allcards.filter((c) => {
			const t = c.meta.tradition ?? c.meta.register?.tradition ?? 'Other';
			const tradMatch = activeTradition === 'All' || t === activeTradition;
			const appMatch =
				activeApplicability.length === 0 ||
				activeApplicability.every((a) => c.meta.applicability?.includes(a));
			return tradMatch && appMatch;
		});
	});

	// ─── helpers ─────────────────────────────────────────────────────────────

	function getTradition(card: Card): string {
		return card.meta.tradition ?? card.meta.register?.tradition ?? 'Other';
	}

	function tradStyle(tradition: string) {
		return TRADITIONS[tradition] ?? TRADITIONS['Other'];
	}

	function openCard(card: Card) {
		selectedCard = card;
		panelOpen = true;
	}

	function closePanel() {
		panelOpen = false;
		setTimeout(() => (selectedCard = null), 300);
	}

	function getCrossRef(id: string): Card | undefined {
		return allcards.find((c) => c.meta.id === id);
	}

	function toggleApplicability(tag: string) {
		if (activeApplicability.includes(tag)) {
			activeApplicability = activeApplicability.filter((a) => a !== tag);
		} else {
			activeApplicability = [...activeApplicability, tag];
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') closePanel();
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<!-- ── Filters ─────────────────────────────────────────────────────────────── -->
<div class="filters">
	<div class="tradition-tabs" role="tablist" aria-label="Filter by tradition">
		{#each traditions() as t (t)}
			{@const style = tradStyle(t)}
			<button
				role="tab"
				aria-selected={activeTradition === t}
				class="tab-btn"
				class:active={activeTradition === t}
				style:--tab-bg={style.bg}
				style:--tab-fg={style.fg}
				onclick={() => (activeTradition = t)}
			>
				{#if t !== 'All'}
					<span class="dot" style:background={style.dot}></span>
				{/if}
				{style.label}
			</button>
		{/each}
	</div>

	<div class="app-filters" role="group" aria-label="Filter by applicability">
		{#each APPLICABILITY_OPTIONS as tag (tag)}
			<button
				class="app-pill"
				class:active={activeApplicability.includes(tag)}
				onclick={() => toggleApplicability(tag)}
				aria-pressed={activeApplicability.includes(tag)}
			>
				{tag}
			</button>
		{/each}
	</div>
</div>

<p class="count-label">
	{filteredCards().length} card{filteredCards().length !== 1 ? 's' : ''}
	{activeTradition !== 'All' ? `· ${tradStyle(activeTradition).label}` : ''}
	{activeApplicability.length ? `· ${activeApplicability.join(', ')}` : ''}
</p>

<!-- ── Card Grid ───────────────────────────────────────────────────────────── -->
<div class="card-grid" role="list">
	{#each filteredCards() as card (card.meta.id)}
		{@const t = getTradition(card)}
		{@const ts = tradStyle(t)}
		<button
			class="card"
			role="listitem"
			onclick={() => openCard(card)}
			aria-label="Open card: {card.meta.title}"
		>
			<div class="card-header">
				<span class="id-badge">{card.meta.id}</span>
				<span class="trad-badge" style:background={ts.bg} style:color={ts.fg}>
					{ts.label}
				</span>
			</div>

			<div class="card-body">
				<p class="card-title">{card.meta.title}</p>
				{#if card.meta.sanskrit?.transliteration}
					<p class="card-sanskrit">
						{card.meta.sanskrit.transliteration}
						{#if card.meta.sanskrit?.devanagari}
							<span class="devanagari">{card.meta.sanskrit.devanagari}</span>
						{/if}
					</p>
				{/if}
				{#if card.meta.gist}
					<p class="card-gist">{card.meta.gist}</p>
				{/if}
			</div>

			{#if card.meta.applicability?.length}
				<div class="card-footer">
					{#each card.meta.applicability as tag (tag)}
						<span class="app-tag">{tag}</span>
					{/each}
				</div>
			{/if}
		</button>
	{/each}
</div>

<!-- ── Detail Panel ───────────────────────────────────────────────────────── -->
{#if selectedCard}
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
	<div class="overlay" class:open={panelOpen} onclick={closePanel} aria-hidden="true"></div>

	<aside class="panel" class:open={panelOpen} aria-label="Card detail">
		<div class="panel-inner">
			<!-- close -->
			<button class="close-btn" onclick={closePanel} aria-label="Close panel">
				<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
					<line x1="2" y1="2" x2="16" y2="16" />
					<line x1="16" y1="2" x2="2" y2="16" />
				</svg>
			</button>

			<!-- tradition badge -->
			<div class="panel-badges">
				<span class="id-badge large">{selectedCard.meta.id}</span>
				<span class="trad-badge large" style:background={pts.bg} style:color={pts.fg}>
					{pts.label}
				</span>
			</div>

			<!-- title block -->
			<div class="panel-title-block">
				<h2 class="panel-title">{selectedCard.meta.title}</h2>
				{#if selectedCard.meta.sanskrit?.transliteration}
					<p class="panel-sanskrit">
						{selectedCard.meta.sanskrit.transliteration}
						{#if selectedCard.meta.sanskrit?.devanagari}
							<span class="devanagari">{selectedCard.meta.sanskrit.devanagari}</span>
						{/if}
					</p>
				{/if}
			</div>

			<!-- applicability -->
			{#if selectedCard.meta.applicability?.length}
				<div class="panel-app-row">
					{#each selectedCard.meta.applicability as tag (tag)}
						<span class="app-pill static">{tag}</span>
					{/each}
				</div>
			{/if}

			<hr class="divider" />

			<!-- gist -->
			{#if selectedCard.meta.gist}
				<p class="panel-gist">{selectedCard.meta.gist}</p>
			{/if}

			<!-- question -->
			{#if selectedCard.meta.question}
				<div class="question-box">
					<p class="question-label">Diagnostic question</p>
					<p class="question-text">{selectedCard.meta.question}</p>
				</div>
			{/if}

			<!-- cross refs -->
			{#if selectedCard.meta.cross_refs?.length}
				<div class="cross-refs">
					<p class="cross-refs-label">Related cards</p>
					<div class="cross-refs-list">
						{#each selectedCard.meta.cross_refs as refId (refId)}
							{@const ref = getCrossRef(refId)}
							{#if ref}
								<button class="cross-ref-chip" onclick={() => openCard(ref)}>
									<span class="chip-id">{refId}</span>
									<span class="chip-title">{ref.meta.title}</span>
									<span class="chip-arrow">→</span>
								</button>
							{:else}
								<span class="cross-ref-chip muted">{refId}</span>
							{/if}
						{/each}
					</div>
				</div>
			{/if}

			<!-- tradition context -->
			{#if selectedCard.meta.register?.text}
				<div class="tradition-context">
					<p class="context-label">Source</p>
					<p class="context-text">{selectedCard.meta.register.text}</p>
				</div>
			{/if}

			<!-- full article link -->
			<a class="full-link" href={selectedCard.linkpath}>
				Read full card
				<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
					<line x1="2" y1="7" x2="12" y2="7" />
					<polyline points="8,3 12,7 8,11" />
				</svg>
			</a>
		</div>
	</aside>
{/if}

<style lang="sass">

// ── tokens ────────────────────────────────────────────────────────────────────

$radius-sm: 6px
$radius-md: 10px
$radius-lg: 14px
$easing: cubic-bezier(0.25, 0.46, 0.45, 0.94)

// ── filters ───────────────────────────────────────────────────────────────────

.filters
	display: flex
	flex-direction: column
	gap: 12px
	margin-bottom: 20px

.tradition-tabs
	display: flex
	flex-wrap: wrap
	gap: 6px

.tab-btn
	display: inline-flex
	align-items: center
	gap: 6px
	padding: 6px 14px
	border-radius: 99px
	border: 1.5px solid transparent
	font-size: 13px
	font-weight: 500
	cursor: pointer
	transition: all 140ms $easing
	background: var(--color-grey-0, #f5f5f5)
	color: var(--color-grey-3, #444)

	&:hover
		border-color: var(--color-grey-1, #ddd)

	&.active
		background: var(--tab-bg, #eef2ff)
		color: var(--tab-fg, #3730A3)
		border-color: var(--tab-fg, #3730A3)

.dot
	width: 7px
	height: 7px
	border-radius: 50%
	flex-shrink: 0

.app-filters
	display: flex
	flex-wrap: wrap
	gap: 6px

.app-pill
	padding: 4px 12px
	border-radius: 99px
	border: 1.5px solid var(--color-grey-1, #ddd)
	font-size: 12px
	font-weight: 500
	cursor: pointer
	transition: all 140ms $easing
	background: transparent
	color: var(--color-grey-2, #666)

	&:hover
		border-color: var(--color-grey-2, #666)

	&.active
		background: var(--color-main, #111)
		color: #fff
		border-color: var(--color-main, #111)

	&.static
		cursor: default
		pointer-events: none

.count-label
	font-size: 12px
	color: var(--color-grey-2, #888)
	margin-bottom: 24px
	text-transform: uppercase
	letter-spacing: 0.05em
	font-weight: 500

// ── card grid ─────────────────────────────────────────────────────────────────

.card-grid
	display: grid
	grid-template-columns: repeat(1, 1fr)
	gap: 14px

	@media (min-width: 640px)
		grid-template-columns: repeat(2, 1fr)

	@media (min-width: 1024px)
		grid-template-columns: repeat(4, 1fr)

.card
	display: flex
	flex-direction: column
	gap: 14px
	padding: 20px
	border-radius: $radius-lg
	border: 1.5px solid var(--color-grey-1, #e5e5e5)
	background: var(--color-white, #fff)
	cursor: pointer
	text-align: left
	transition: border-color 160ms $easing, box-shadow 160ms $easing, transform 160ms $easing

	&:hover
		border-color: var(--color-grey-2, #aaa)
		box-shadow: 0 4px 20px rgba(0,0,0,0.07)
		transform: translateY(-2px)

	&:active
		transform: translateY(0)

.card-header
	display: flex
	align-items: center
	justify-content: space-between
	gap: 8px

.id-badge
	font-size: 11px
	font-weight: 700
	letter-spacing: 0.08em
	text-transform: uppercase
	color: var(--color-grey-2, #888)

	&.large
		font-size: 12px

.trad-badge
	font-size: 11px
	font-weight: 600
	letter-spacing: 0.04em
	padding: 2px 8px
	border-radius: 99px
	text-transform: uppercase

	&.large
		font-size: 12px
		padding: 3px 10px

.card-body
	flex: 1
	display: flex
	flex-direction: column
	gap: 6px

.card-title
	font-size: 17px
	font-weight: 600
	line-height: 1.25
	color: var(--color-main, #111)

.card-sanskrit
	font-size: 13px
	color: var(--color-grey-2, #777)
	display: flex
	align-items: center
	gap: 8px

.devanagari
	font-size: 15px
	color: var(--color-grey-2, #999)

.card-gist
	font-size: 13.5px
	line-height: 1.55
	color: var(--color-grey-2, #666)
	display: -webkit-box
	-webkit-line-clamp: 3
	-webkit-box-orient: vertical
	overflow: hidden
	margin-top: 4px

.card-footer
	display: flex
	flex-wrap: wrap
	gap: 6px
	padding-top: 12px
	border-top: 1px solid var(--color-grey-0, #f0f0f0)
	margin-top: auto

.app-tag
	font-size: 11px
	font-weight: 600
	letter-spacing: 0.06em
	text-transform: uppercase
	color: var(--color-grey-2, #888)

// ── overlay ───────────────────────────────────────────────────────────────────

.overlay
	position: fixed
	inset: 0
	background: rgba(0,0,0,0)
	z-index: 40
	transition: background 300ms $easing
	pointer-events: none

	&.open
		background: rgba(0,0,0,0.3)
		pointer-events: auto

// ── panel ─────────────────────────────────────────────────────────────────────

.panel
	position: fixed
	top: 0
	right: 0
	bottom: 0
	width: min(520px, 100vw)
	background: var(--color-white, #fff)
	border-left: 1.5px solid var(--color-grey-1, #e5e5e5)
	z-index: 50
	transform: translateX(100%)
	transition: transform 300ms $easing
	overflow-y: auto

	&.open
		transform: translateX(0)

.panel-inner
	padding: 32px 28px 48px
	display: flex
	flex-direction: column
	gap: 20px
	min-height: 100%
	position: relative

.close-btn
	position: absolute
	top: 24px
	right: 24px
	width: 36px
	height: 36px
	border-radius: 50%
	border: 1.5px solid var(--color-grey-1, #e0e0e0)
	background: transparent
	display: flex
	align-items: center
	justify-content: center
	cursor: pointer
	color: var(--color-grey-2, #666)
	transition: all 140ms $easing

	&:hover
		background: var(--color-grey-0, #f5f5f5)
		color: var(--color-main, #111)

.panel-badges
	display: flex
	align-items: center
	gap: 8px
	padding-right: 44px

.panel-title-block
	display: flex
	flex-direction: column
	gap: 6px

.panel-title
	font-size: 26px
	font-weight: 700
	line-height: 1.2
	color: var(--color-main, #111)
	margin: 0

.panel-sanskrit
	font-size: 15px
	color: var(--color-grey-2, #777)
	display: flex
	align-items: center
	gap: 10px

.panel-app-row
	display: flex
	flex-wrap: wrap
	gap: 6px

.divider
	border: none
	border-top: 1.5px solid var(--color-grey-0, #efefef)
	margin: 0

.panel-gist
	font-size: 15.5px
	line-height: 1.65
	color: var(--color-grey-3, #333)
	font-weight: 400

.question-box
	background: var(--color-grey-0, #f8f8f8)
	border-left: 3px solid var(--color-main, #111)
	border-radius: 0 $radius-sm $radius-sm 0
	padding: 14px 16px
	display: flex
	flex-direction: column
	gap: 6px

.question-label
	font-size: 11px
	font-weight: 700
	letter-spacing: 0.08em
	text-transform: uppercase
	color: var(--color-grey-2, #888)
	margin: 0

.question-text
	font-size: 14.5px
	line-height: 1.6
	color: var(--color-main, #111)
	font-style: italic
	margin: 0

.cross-refs
	display: flex
	flex-direction: column
	gap: 8px

.cross-refs-label
	font-size: 11px
	font-weight: 700
	letter-spacing: 0.08em
	text-transform: uppercase
	color: var(--color-grey-2, #888)
	margin: 0

.cross-refs-list
	display: flex
	flex-direction: column
	gap: 4px

.cross-ref-chip
	display: flex
	align-items: center
	gap: 8px
	padding: 8px 12px
	border-radius: $radius-sm
	border: 1.5px solid var(--color-grey-1, #e5e5e5)
	background: transparent
	cursor: pointer
	text-align: left
	transition: all 140ms $easing
	width: 100%

	&:hover
		border-color: var(--color-main, #111)
		background: var(--color-grey-0, #f8f8f8)

	&.muted
		cursor: default
		pointer-events: none
		color: var(--color-grey-2, #999)

.chip-id
	font-size: 11px
	font-weight: 700
	letter-spacing: 0.06em
	text-transform: uppercase
	color: var(--color-grey-2, #888)
	flex-shrink: 0
	min-width: 28px

.chip-title
	font-size: 13.5px
	font-weight: 500
	color: var(--color-main, #111)
	flex: 1

.chip-arrow
	font-size: 14px
	color: var(--color-grey-2, #aaa)
	flex-shrink: 0

.tradition-context
	display: flex
	flex-direction: column
	gap: 6px

.context-label
	font-size: 11px
	font-weight: 700
	letter-spacing: 0.08em
	text-transform: uppercase
	color: var(--color-grey-2, #888)
	margin: 0

.context-text
	font-size: 13px
	line-height: 1.6
	color: var(--color-grey-2, #666)
	margin: 0

.full-link
	display: inline-flex
	align-items: center
	gap: 8px
	margin-top: auto
	padding: 10px 20px
	border-radius: $radius-sm
	background: var(--color-main, #111)
	color: #fff
	font-size: 14px
	font-weight: 600
	text-decoration: none
	transition: opacity 150ms $easing
	width: fit-content

	&:hover
		opacity: 0.85

</style>
