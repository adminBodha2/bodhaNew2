<script lang="ts">

	import type { PageData } from './$types';
	import Head from '$lib/comps/headcomponent.svelte';
	import Container from '$lib/comps/container.svelte'
	import Crumb from '$lib/comps/breadcrumb.svelte'
	export let data: PageData;

	const levelColor: Record<string, string> = {
		entry: '#5999D3',
		intermediate: '#1971C2',
		advanced: '#0D3B65'
	};
</script>

<Head
	title="Reading Paths — Bodha"
	metaDescription="Curated sequences through the Bodha knowledge base. Each path is a guided journey with editorial notes."
	metaUrl="https://www.bodharesearch.in/path"
	metaImage="/images/bodhacover.png"
/>

<Container narrow={true} scaled={true}>
	<div class="stdbox padded-ontop">
		<Crumb item1="Bodha" item1Link="/" showT={true} title="Reading Paths" showD={true} desc="Curated sequences through the Bodha knowledge base. Each path is a guided journey with editorial notes."/>
		<div class="grid two white-grid">
			{#each data.paths as path, i}
				<a class="blank labelbox outer card-padded" href="/paths/{path.id}">
					<div class="labelbox main-text">
						<p class="tag-text lgrey">{String(i + 1).padStart(2, '0')}{#if path.subtitle} - {path.subtitle}{/if}</p>
						<h2 class="source-serif card-title">{path.title}</h2>
						<p class="rem1 altprim">{path.description.slice(0, 160)}…</p>
					</div>
					<div class="card-footer row ycenter xbetween self-bottom">
						<div class="box rgap4">
							<p class="citation-big tt-u grey">{path.steps.length} phases</p>
							<div class="footer-steps row ycenter cgap6">
								{#each { length: Math.min(path.steps.length, 10) } as _, si}
									<span class="step-dot" style="opacity: {1 - si * 0.13}"></span>
								{/each}
							</div>
						</div>
						<p class="arrow-icon tt-c small-text">{path.level} Level →</p>
					</div>
				</a>
			{/each}
		</div>
	</div>
</Container>

<style lang="sass">

// ── SINGLE CARD ────────────────────────────────────────────

.white-grid
	.labelbox.outer
		background: var(--color-white)
		transition: all 0.25s
		.main-text
			height: 100%
		&:hover
			transform: translateY(-2px)
			box-shadow: 0 2px 4px rgba(0,0,0,0.04), 0 8px 10px rgba(0,0,0,0.04), 0 28px 48px rgba(0,0,0,0.07)
			border-color: rgba(0,0,0,0.11)
			background: var(--color-stone)
			.arrow-icon
				transform: translateX(4px)
				opacity: 1

// ── CARD TOP ───────────────────────────────────────────────

.step-count
	font-size: 0.72rem
	font-weight: 500
	letter-spacing: 0.04em
	color: #ACACAC


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

</style>
