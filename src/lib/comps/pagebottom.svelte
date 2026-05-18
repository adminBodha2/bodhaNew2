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
	<div class="foot-inner box">
		<div class="foot-top">
			<button class="blank foot-scroll" onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
				<span class="foot-scroll-arrow">↑</span>
				<span class="foot-scroll-label tt-u">Top</span>
			</button>
		</div>
		<div class="footer-grid">
			<div class="foot-brand box rgap16">
				<a href="/"><img class="footer-logo" src="/images/bodha-logo-light.webp" alt="bodha logo" /></a>
				<p class="light-footer">A think tank and research group grounded in the wisdom of Hindu civilization.</p>
				<p class="light-footer">Site designed at <a class="linkedlight" href="/designbodha">designBodha</a>. <br /><a class="linkedlight" href="/sitemap.xml">Sitemap</a> | <a class="linkedlight" href="/contact">Contact</a></p>
				<div class="row ycenter cgap8">
					<Designed />
					<!--
				<button class="blank" onclick={toggleTheme}>
					{#if $darkTheme}
						<Sun/>
					{:else}
						<Moon/>
					{/if}
				</button>
				-->
				</div>
			</div>
			<div class="foot-col rgap8 lg:rgap16">
				<p class="citation light-footer tt-u">pillars</p>
				<div class="foot-links box rgap16">
					<a class="foot-link blank white" href="/research">Research</a>
					<a class="foot-link blank white" href="/anveshi">Anveshi</a>
					<a class="foot-link blank white" href="/big-questions">Big Questions</a>
				</div>
			</div>
			<div class="foot-col rgap8 lg:rgap16">
				<p class="citation light-footer tt-u">learning</p>
				<div class="foot-links rgap16">
					<a class="foot-link blank white" href="/academy">Academy</a>
					<!--
					<a class="foot-link blank white" href="/ontology">Ontology</a>
					<a class="foot-link blank white" href="/concepts">Concepts</a>
					-->
				</div>
			</div>
			<div class="foot-col rgap8 lg:rgap16">
				<p class="citation light-footer tt-u">Readings</p>
				<div class="foot-links rgap16">
					<a class="foot-link blank white" href="/blog">Blog</a>
					<a class="foot-link blank white" href="/library">Open Library</a>
					<!--
					<a class="foot-link blank white" href="/explorer">Explorer</a>
					-->
					<a class="foot-link blank white" href="/newsletter">Newsletter</a>
				</div>
			</div>
			<div class="foot-col rgap8 lg:rgap16">
				<p class="citation light-footer tt-u">Other</p>
				<div class="foot-links rgap16">
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
		<div class="foot-bottom">
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

p.light-footer
	color: #a7a7a7

.foot-brand
	p.light-footer
		font-size: 14px

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
		height: calc(100vh - 64px)
		padding-left: 1rem
		padding-right: 1rem
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
	border-right: 1px solid rgba(255,255,255,0.1)
	border-left: 1px solid rgba(255,255,255,0.1)
	height: 100%
	width: 100%
	overflow: hidden
	padding: 1rem
	row-gap: 4rem
	margin-left: auto
	margin-right: auto
	padding-top: 2	rem
	@media (max-width: 1024px)
		padding-left: 1rem
		padding-right: 1rem
		height: 100%
		row-gap: 2rem
	@media (min-width: 1025px)
		width: 992px
		row-gap: 2rem
		padding-top: 6rem
		padding-left: 2rem
		padding-right: 2rem
	@media (min-width: 1201px)
		width: 1168px
		row-gap: 3rem
		padding-top: 8rem
		padding-left: 4rem
		padding-right: 4rem
	@media (min-width: 1441px)
		width: 1408px
	@media (min-width: 1601px)
		width: 1472px

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
	color: var(--color-theme-dark)
	line-height: 1
	transition: transform 180ms ease

.foot-scroll-label
	font-size: 8px
	font-weight: 700
	letter-spacing: 0.1em
	color: var(--color-theme-dark)

.footer-grid
	display: grid
	grid-template-columns: 1fr 1fr
	.foot-brand
		grid-column: span 2
	row-gap: 2rem
	@media (min-width: 1025px)
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr
		.foot-brand
			grid-column: span 3
			grid-row: span 2
	@media (min-width: 1201px)
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr
		.foot-brand
			grid-column: span 3

// ── TOP ROW ───────────────────────────────────────────────

.foot-brand
	display: flex
	flex-direction: column
	.footer-logo
		object-fit: contain
		opacity: 0.9
		height: 64px
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

.foot-link
	font-size: 1rem
	font-weight: 400
	transition: color 0.12s ease
	text-transform: uppercase
	&:hover
		color: var(--color-theme)

button.footer-btn
	background: none
	border: none
	color: #FFFFFF
	display: flex
	flex-direction: column
	text-align: left
	padding-left: 0
	@media screen and (min-width: 1025px)
		text-align: right
		align-items: flex-end
		width: 100%
		padding-right: 0

// ── BOTTOM BAR ────────────────────────────────────────────

.foot-bottom
	display: flex
	align-items: center
	justify-content: space-between
	gap: 1rem
	flex-wrap: wrap
	margin-top: auto
	padding-bottom: 3rem
	@media screen and (max-width: 1024px)
		flex-direction: column
		align-items: flex-start
		margin-top: auto
	@media (min-width: 721px)
		padding-bottom: 4rem
	@media (min-width: 1025px)
		padding-bottom: 6rem
	@media (min-width: 1201px)
		padding-bottom: 8rem

.foot-legal
	display: flex
	flex-direction: column
	gap: 3px
	p
		font-size: 13px
		color: #aaa

.foot-actions
	display: flex
	flex-direction: row
	align-items: center
	gap: 12px

</style>
