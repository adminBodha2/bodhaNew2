<script lang="ts">
	import type { PageData } from './$types';
	import Head from '$lib/comps/headcomponent.svelte';
	import Container from '$lib/comps/container.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import { absoluteImage, absoluteUrl, collectionPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';

	let { data }: { data: PageData } = $props();

	const title = 'Reading Paths | Bodha';
	const metaDescription = 'Curated sequences through the Bodha knowledge base. Each path is a guided journey with editorial notes.';
	const metaUrl = absoluteUrl('/paths');
	const metaImage = absoluteImage('/images/bodhacover.png');

	let jsonld = $derived(
		stringifyJsonLd(
			collectionPageJsonLd({
				name: title,
				description: metaDescription,
				url: metaUrl,
				image: metaImage,
				items: data.paths.map((path: any) => ({
					name: path.title,
					description: path.description,
					url: `/paths/${path.id}`
			}))
			})
		)
	);
</script>

<Head
	{title}
	{metaDescription}
	{metaUrl}
	{metaImage}
	imWidth="2560"
	imHeight="1440"
	{jsonld}
/>

<Container narrow={true} scaled={true}>
	<div class="stdbox padded-ontop">
		<Crumb item1="Bodha" item1Link="/" showT={true} title="Reading Paths" showD={true} desc="Curated sequences through the Bodha knowledge base. Each path is a guided journey with editorial notes."/>
		<div class="grid three ultra">
			{#each data.paths as path, i}
				<a class="blank labelbox outer card-padded" href="/paths/{path.id}">
					<div class="labelbox main-text">
						<p class="tag-text lgrey">{String(i + 1).padStart(2, '0')}{#if path.subtitle} - {path.subtitle}{/if}</p>
						<p class="source-serif card-title">{path.title}</p>
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

.labelbox.outer
	backdrop-filter: blur(18px) saturate(1.25)
	background: linear-gradient(180deg, rgba(255, 255, 255, .72), rgba(243, 243, 243, .58))
	border: 1px solid rgba(255, 255, 255, .76)
	box-shadow: 0 1px 0 rgba(255, 255, 255, .92), 0 8px 12px rgba(15, 23, 42, .12), inset 0 1px 0 rgba(255, 255, 255, .82), inset 0 -1px 2px rgba(0, 0, 0, .04)
	transition: all 0.25s
	.main-text
		height: 100%
	&:hover
		.arrow-icon
			transform: translateX(4px)
			opacity: 1

// ── CARD FOOTER ────────────────────────────────────────────

.card-footer
	margin-top: 1rem
	padding-top: 1rem
	border-top: var(--border-main)
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

.arrow-icon
	font-size: 1rem
	color: var(--color-theme)
	transition: transform 0.2s ease, opacity 0.2s ease

</style>
