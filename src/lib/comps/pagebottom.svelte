<script lang="ts">
	import FB from '$lib/icons/facebook.svelte';
	import Twitter from '$lib/icons/twitter.svelte';
	import Insta from '$lib/icons/instagram.svelte';
	import Linkedin from '$lib/icons/linkedin.svelte';
	import Github from '$lib/icons/github.svelte';
	import Designed from '$lib/icons/designed.svelte';
	import Sun from '$lib/icons/sun.svelte';
	import Moon from '$lib/icons/moon.svelte';
	import { darkTheme, openSiteTourSelector, toggleTheme } from '$lib/utils/globalstores';
</script>

<section class="foot-wrap box">
	<div class="foot-wide-lines"></div>
	<div class="foot-inner">
		<div class="foot-top">
			<button class="blank foot-scroll" onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
				<span class="foot-scroll-arrow">↑</span>
				<span class="foot-scroll-label tt-u">Top</span>
			</button>
		</div>
		<div class="secondblock box rgap8 lg:rgap32">
		<div class="textline1 box rgap8">
			<a href="/"><img class="footer-logo" src="/images/bodha-logo-light.webp" alt="bodha logo" /></a>
			<p class="sm:txt-sm light-footer lh16">A think tank and research group grounded in the wisdom of Hindu civilization.</p>
		</div>
		<div class="textline2 box rgap16">
			<p class="sm:txt-sm light-footer lh16"><a href="/members" class="linkedlight">SUBSCRIBE/ LOG IN.</a> <br />Site designed at <a class="linkedlight" href="/designbodha">designBodha</a>. <a class="linkedlight" href="/sitemap.xml">Sitemap</a> | <a class="linkedlight" href="/contact">Contact</a></p>
			<div class="row ycenter cgap16">
				<Designed />
				<button class="blank" onclick={toggleTheme}>
					{#if $darkTheme}
						<Sun />
					{:else}
						<Moon />
					{/if}
					<p class="txt-xs pleft8" style="color: #c1c1c1">Toggle Theme</p>
				</button>
			</div>
		</div>
		</div>
		<div class="bigblock grid grid-cols-2 lg:grid-cols-4">
		<div class="box foot-col rgap16 grid1">
			<p class="txt-xs light-footer tt-u">pillars</p>
			<div class="foot-links box">
				<a class="foot-link blank white" href="/research">Research</a>
				<a class="foot-link blank white" href="/anveshi">Anveshi</a>
				<a class="foot-link blank white" href="/big-questions">Big Questions</a>
			</div>
		</div>
		<div class="box foot-col rgap16 grid2">
			<p class="txt-xs light-footer tt-u">learning</p>
			<div class="foot-links box">
				<a class="foot-link blank white" href="/academy">Academy</a>
				<a class="foot-link blank white" href="/wiki">Knowledge Base</a>
				<a class="foot-link blank white" href="/wiki/temples">Hindu Temples</a>
				<!--
					<a class="foot-link blank white" href="/ontology">Ontology</a>
					<a class="foot-link blank white" href="/concepts">Concepts</a>
					-->
			</div>
		</div>
		<div class="box foot-col rgap16 grid3">
			<p class="txt-xs light-footer tt-u">Readings</p>
			<div class="foot-links box">
				<a class="foot-link blank white" href="/blog">Blog</a>
				<a class="foot-link blank white" href="/library">Open Library</a>
				<!--
					<a class="foot-link blank white" href="/explorer">Explorer</a>
					-->
				<a class="foot-link blank white" href="/newsletter">Newsletter</a>
			</div>
		</div>
		<div class="box foot-col rgap16 grid4">
			<p class="txt-xs light-footer tt-u">Other</p>
			<div class="foot-links box">
				<a class="foot-link blank white" href="/about">About</a>
				<a class="foot-link blank white" href="/inspiration">Inspiration</a>
				<a class="foot-link blank white" href="/lab">Lab</a>
				<a class="foot-link blank white" href="/aryavarta">Aryavarta</a>
				<!--
					<button type="button" class="foot-link footer-btn" onclick={openSiteTourSelector}>Site Tour</button>
					-->
			</div>
		</div>
		</div>
		<div class="foot-bottom self-bottom">
			<div class="foot-legal">
				<p class="lgrey">© 2026 Bodha Research Pvt Ltd | <a class="linkedlight" href="/docs/terms-and-conditions">T&C</a> | <a class="linkedlight" href="/docs/privacy-policy">Privacy</a> | <a class="linkedlight" href="/docs/refunds-policy">Refunds</a></p>
				<p class="lgrey">Svayambodha Centre For Culture Studies Foundation</p>
			</div>
			<div class="foot-actions">
				<a class="blank foot-social" href="https://x.com/BodhaResearch" rel="noreferrer" target="_blank">
					<Twitter size="24" color="#FFFFFF" />
				</a>
				<a class="blank foot-social" href="https://www.facebook.com/profile.php?id=61584291760187" rel="noreferrer" target="_blank">
					<FB size="24" color="#FFFFFF" />
				</a>
				<a class="blank foot-social" href="https://www.instagram.com/bodharesearch" rel="noreferrer" target="_blank">
					<Insta size="24" color="#FFFFFF" />
				</a>
				<a class="blank foot-social" href="https://www.linkedin.com/company/bodha-research/" rel="noreferrer" target="_blank">
					<Linkedin size="24" color="#FFFFFF" />
				</a>
				<a class="blank foot-social" href="https://github.com/adminBodha2/bodhaNew2" rel="noreferrer" target="_blank">
					<Github size="24" color="#FFFFFF" />
				</a>
			</div>
		</div>
	</div>
</section>

<style lang="sass">

.bigblock
	@media (max-width: 1024px)
		row-gap: 2rem
		padding-top: 1rem
		padding-bottom: 1rem

p.light-footer
	color: #a7a7a7

.foot-wrap
	width: 100%
	position: relative
	overflow: hidden
	background: linear-gradient(180deg,rgba(0, 44, 94, 1) 0%, rgba(0, 28, 59, 1) 53%, rgba(0, 9, 19, 1) 84%, rgba(0, 0, 0, 1) 100%)
	box-shadow: inset 0 12px 24px -12px rgba(0, 0, 0, 0.85)
	&::before
		content: ''
		position: absolute
		inset: 0
		pointer-events: none
		background: repeating-linear-gradient(90deg, rgba(0,0,0,0.08) 0 1px, transparent 1px 8px), radial-gradient(circle at 50% 0%, rgba(0,0,0,0.3), transparent 70%)
		opacity: 1
	&::after
		content: ''
		position: absolute
		left: 0
		right: 0
		height: 1px
		background: rgba(255,255,255,.12)
		pointer-events: none
	@media (max-width: 1024px)
		min-height: 100vh
		padding-left: 0.5rem
		padding-right: 0.5rem
		&::after
			top: 2rem
	@media (min-width: 1025px)
		height: calc(100vh - 80px)
		padding-left: 1rem
		padding-right: 1rem
		&::after
			top: 4rem
	@media (min-width: 1601px)
		padding-left: 4rem
		padding-right: 4rem
		&::after
			top: 6rem

.foot-wide-lines
	position: absolute
	inset: 0
	pointer-events: none
	z-index: 1
	&::before
		content: ''
		position: absolute
		left: 0
		right: 0
		bottom: 2rem
		height: 1px
		background: rgba(255,255,255,.12)
	@media (min-width: 1025px)
		&::before
			bottom: 4rem
	@media (min-width: 1201px)
		&::before
			bottom: 6rem

.foot-inner
	z-index: 2
	height: 100%
	width: 100%
	margin-left: auto
	margin-right: auto
	@media (max-width: 1024px)
		border-left: 1px solid rgba(255,255,255,0.1)
		border-right: 1px solid rgba(255,255,255,0.1)
		padding-left: 1rem
		padding-right: 1rem
		row-gap: 1.5rem
		margin-top: auto
		margin-bottom: auto
	@media (min-width: 1025px)
		border-left: 1px solid rgba(255,255,255,0.1)
		border-right: 1px solid rgba(255,255,255,0.1)
		width: 992px
		row-gap: 4rem
		padding-left: 2rem
		padding-right: 2rem
	@media (min-width: 1201px)
		width: 1168px
		row-gap: 6rem
		padding-left: 4rem
		padding-right: 4rem
	@media (min-width: 1441px)
		width: 1408px
	@media (min-width: 1601px)
		width: 1472px

.foot-inner
	display: flex
	flex-direction: column
	height: 100%
	@media (min-width: 1025px)
		display: grid
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr
		grid-template-areas: "top top top top top top" "secondblock secondblock bigblock bigblock bigblock bigblock" "bottom bottom bottom bottom bottom bottom"
		align-content: center

.foot-top
	grid-area: top

.secondblock
	grid-area: secondblock

.bigblock
	grid-area: bigblock

.foot-bottom
	grid-area: bottom

.foot-top
	display: flex
	align-items: flex-start
	justify-content: flex-end
	border-bottom: 0
	button
		width: max-content

.foot-scroll
	display: flex
	flex-direction: column
	align-items: center
	gap: 4px
	padding: 1rem
	border-radius: 8px
	transition: all 0.15s ease
	backdrop-filter: blur(12px) saturate(1.5)
	background: linear-gradient(180deg, rgba(255, 255, 255, .46), rgba(243, 243, 243, .84))
	border: 1px solid rgba(255, 255, 255, .98)
	box-shadow: 3px 1px 3px rgba(0,0,0,0.4), 2px 8px 18px rgba(0,0,0,0.1), inset 0 -1px 1px rgba(0, 0, 0, .05)
	transform-origin: center center
	&:hover
		background: linear-gradient(180deg, rgba(243, 243, 243, .64), rgba(255, 255, 255, .76))
		transform: scale(0.95)
		box-shadow: 3px 1px 3px rgba(0,0,0,0), 2px 8px 18px rgba(0,0,0,0), inset 0 -1px 1px rgba(0, 0, 0, 0)
		.foot-scroll-arrow
			transform: translateY(-4px)
	@media screen and (max-width: 1024px)
		margin-left: auto

.foot-scroll-arrow
	font-size: 1rem
	color: #1971C2
	line-height: 1
	transition: transform 180ms ease

.foot-scroll-label
	font-size: 8px
	font-weight: 700
	letter-spacing: 0.1em
	color: #1971C2

// ── TOP ROW ───────────────────────────────────────────────

.footer-logo
	object-fit: contain
	opacity: 0.9
	height: 48px
	margin-right: auto


// ── LINK GRID ─────────────────────────────────────────────

.foot-col
	display: flex
	flex-direction: column
	@media screen and (min-width: 1025px)
		align-items: flex-end
		text-align: right

.foot-links
	display: flex
	flex-direction: column
	row-gap: 12px

.foot-link
	font-size: 0.9rem
	font-weight: 400
	transition: color 0.12s ease
	text-transform: uppercase
	&:hover
		color: var(--color-theme)

// ── BOTTOM BAR ────────────────────────────────────────────

.foot-bottom
	display: flex
	align-items: center
	justify-content: space-between
	gap: 1rem
	flex-wrap: wrap
	@media (max-width: 1024px)
		flex-direction: column
		align-items: flex-start
		justify-self: flex-end
		margin-top: auto

.foot-legal
	display: flex
	flex-direction: column
	gap: 4px
	p
		font-size: 13px
		color: #aaa

.foot-actions
	display: flex
	flex-direction: row
	align-items: center
	gap: 12px

</style>
