<script lang="ts">
	import type { PageData } from './$types';
	import Head from '$lib/comps/headcomponent.svelte';
	import Container from '$lib/comps/container.svelte'

	export let data: PageData;

	const levelColor: Record<string, string> = {
		entry: '#5999D3',
		intermediate: '#1971C2',
		advanced: '#0D3B65'
	};
</script>

<Head
	title="Learning Paths — Bodha"
	metaDescription="Curated sequences through the Bodha knowledge system. Each path is a guided journey with editorial notes explaining why each step follows the previous one."
	metaUrl="https://www.bodharesearch.in/path"
	metaImage="/images/bodhacover.png"
/>

<Container narrow={true} scaled={true}>
	<div class="box padded-ontop only">
		<div class="hero">
			<p class="eyebrow tt-u"><a class="linkonhover" href="/">Bodha Research</a></p>
			<h1 class="hero-title source-serif">Learning Paths</h1>
			<p class="hero-sub width70">Curated sequences through the knowledge system. Each path is a guided journey with editorial notes — explaining why each step follows the previous one.</p>
			<div class="hero-meta row ycenter cgap16">
				<span class="count-pill">{data.paths.length} paths</span>
				<span class="divider-dot">·</span>
				<span class="meta-hint">Start anywhere. Read in sequence.</span>
			</div>
		</div>
		<div class="grid three tight">
			{#each data.paths as path, i}
				<a class="card blank" href="/path/{path.id}">
					<div class="card-top row ycenter xbetween">
						<span class="level-tag tt-u" style="color: {levelColor[path.level] ?? '#333'}; border-color: {levelColor[path.level] ?? '#333'}20;">{path.level}</span>
						<span class="step-count">{path.steps.length} steps</span>
					</div>
					<div class="card-body">
						<p class="card-number">{String(i + 1).padStart(2, '0')}</p>
						<h2 class="card-title source-serif">{path.title}</h2>
						{#if path.subtitle}
							<p class="card-subtitle">{path.subtitle}</p>
						{/if}
						<p class="card-desc">{path.description.slice(0, 160)}…</p>
					</div>
					<div class="card-footer row ycenter xbetween">
						<div class="footer-steps row ycenter cgap6">
							{#each { length: Math.min(path.steps.length, 6) } as _, si}
								<span class="step-dot" style="opacity: {1 - si * 0.13}"></span>
							{/each}
							{#if path.steps.length > 6}
								<span class="step-more">+{path.steps.length - 6}</span>
							{/if}
						</div>
						<span class="arrow-icon">→</span>
					</div>
				</a>
			{/each}
		</div>
	</div>
</Container>

<style lang="sass">

// ── HERO ───────────────────────────────────────────────────

.hero
	padding: 0 2rem 5rem 0
	display: flex
	flex-direction: column
	gap: 1rem
	@media screen and (max-width: 1024px)
		padding-bottom: 3.5rem

.hero-sub
	font-size: 1.05rem
	line-height: 1.75
	color: #6B6B6B
	margin: 0

.hero-meta
	margin-top: 0.5rem

.count-pill
	font-size: 0.75rem
	font-weight: 400
	letter-spacing: 0.06em
	color: #FFF
	background: var(--theme)
	padding: 4px 12px
	border-radius: 12px

.divider-dot
	color: #CCC
	font-size: 1.2rem
	line-height: 1

.meta-hint
	font-size: 0.78rem
	color: #AAA
	letter-spacing: 0.02em

// ── SINGLE CARD ────────────────────────────────────────────

.card
	display: flex
	flex-direction: column
	gap: 0
	background: #FFFFFF
	border-radius: 8px
	border: 1px solid rgba(0, 0, 0, 0.07)
	box-shadow: 0 1px 2px rgba(0,0,0,0.03), 0 4px 10px rgba(0,0,0,0.02), 0 5px 8px rgba(0,0,0,0.01)
	padding: 1.2rem 1.2rem 1.5rem
	cursor: pointer
	transition: transform 0.2s ease, box-shadow 0.04s ease, border-color 0.2s ease
	text-decoration: none
	overflow: hidden
	position: relative
	&::before
		content: ''
		position: absolute
		top: 0
		left: 2rem
		right: 2rem
		height: 1px
		background: linear-gradient(90deg, transparent, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0) 100%)
		pointer-events: none
	&:hover
		transform: translateY(-2px)
		box-shadow: 0 2px 4px rgba(0,0,0,0.04), 0 8px 10px rgba(0,0,0,0.04), 0 28px 48px rgba(0,0,0,0.07)
		border-color: rgba(0,0,0,0.11)
		.arrow-icon
			transform: translateX(4px)
			opacity: 1
	&:nth-child(1)
		background: #F4F3EE
	&:nth-child(2)
		background: #f8f8f3
	&:nth-child(3)
		background: #F4F3EE
	&:nth-child(4)
		background: #f8f8f3
	@media screen and (min-width: 1025px)
		padding: 1.5rem 1.5rem 1.75rem
		border-radius: 15px

// ── CARD TOP ───────────────────────────────────────────────

.card-top
	padding-bottom: 1.25rem
	@media screen and (min-width: 1025px)
		padding-bottom: 1.5rem
		margin-bottom: 1.75rem

.level-tag
	font-size: 9.5px
	font-weight: 700
	letter-spacing: 0.1em
	padding: 3px 10px
	border-radius: 100px
	border: 1px solid

.step-count
	font-size: 0.72rem
	font-weight: 500
	letter-spacing: 0.04em
	color: #ACACAC

// ── CARD BODY ──────────────────────────────────────────────

.card-body
	flex: 1
	display: flex
	flex-direction: column
	gap: 0.55rem

.card-number
	font-size: 0.7rem
	font-weight: 700
	letter-spacing: 0.1em
	color: #D0CEC9

.card-subtitle
	font-size: 0.82rem
	color: #AAA
	font-style: italic
	letter-spacing: 0.01em
	margin: 0

.card-desc
	font-size: 0.9rem
	line-height: 1.7
	color: #777
	margin-top: 0.25rem
	max-width: 52ch

h2.card-title
	color: #111
	margin: 0
	@media screen and (min-width: 1025px)
		letter-spacing: -0.001em
		border-top: var(--stroke-focus)
		padding-top: 1.5rem


// ── CARD FOOTER ────────────────────────────────────────────

.card-footer
	margin-top: 1rem
	padding-top: 1rem
	border-top: var(--stroke-subtle)
	@media screen and (min-width: 1025px)
		margin-top: 2rem
		padding-top: 1.25rem

.footer-steps
	gap: 4px

.step-dot
	width: 5px
	height: 5px
	border-radius: 50%
	background: #C5C2BB
	flex-shrink: 0

.step-more
	font-size: 0.65rem
	color: #BCBCBC
	font-weight: 600
	margin-left: 2px

.arrow-icon
	font-size: 1rem
	color: var(--theme)
	transition: transform 0.2s ease, opacity 0.2s ease
	opacity: 0.7

</style>
