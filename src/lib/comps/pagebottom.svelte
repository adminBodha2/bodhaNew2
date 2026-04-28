<script lang="ts">
	import FB from '$lib/icons/facebook.svelte';
	import Twitter from '$lib/icons/twitter.svelte';
	import Insta from '$lib/icons/instagram.svelte';
	import Linkedin from '$lib/icons/linkedin.svelte';
	import Github from '$lib/icons/github.svelte'
	import Designed from '$lib/icons/designed.svelte'
	import '$lib/styles/graphing.sass'
</script>

<div class="foot-wrap stdbox">
	<div class="foot-wide-lines"></div>
	<div class="foot-inner narrowsize box">
		<div class="foot-top">
			<button
				class="blank foot-scroll"
				onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
			>
				<span class="foot-scroll-arrow">↑</span>
				<span class="foot-scroll-label tt-u">Top</span>
			</button>
		</div>
		<div class="footer-grid">
			<div class="foot-brand">
				<p class="lgrey small-text">Bodha is a think tank and research group grounded in the wisdom of Hindu civilization.</p>
				<p class="lgrey small-text">Site designed at Bodha Lab</p>
				<Designed/>
			</div>
			<div class="foot-col">
				<p class="tag-text lgrey tt-u">Research</p>
				<div class="foot-links">
					<a class="foot-link blank white" href="/research">Projects</a>
					<a class="foot-link blank white" href="/big-questions">Big Questions</a>
					<a class="foot-link blank white" href="/academy">Courses</a>
					<a class="foot-link blank white" href="/lab">Lab</a>
				</div>
			</div>
			<div class="foot-col">
				<p class="tag-text lgrey tt-u">Culture</p>
				<div class="foot-links">
					<a class="foot-link blank white" href="/anveshi">Anveshi</a>
					<a class="foot-link blank white" href="/temples">Temples</a>
				</div>
			</div>
			<div class="foot-col">
				<p class="tag-text lgrey tt-u">Readings</p>
				<div class="foot-links">
					<a class="foot-link blank white" href="/blog">Blog</a>
					<a class="foot-link blank white" href="/library">Open Library</a>
					<a class="foot-link blank white" href="/inspiration">Inspiration</a>
				</div>
			</div>
			<div class="foot-col">
				<p class="tag-text lgrey tt-u">Bodha</p>
				<div class="foot-links">
					<a class="foot-link blank white" href="/about">About</a>
					<a class="foot-link blank white" href="/contact">Contact</a>
					<a class="foot-link blank white" href="/videos">Videos</a>
				</div>
			</div>
		</div>
		<div class="foot-bottom">
			<div class="foot-legal">
				<small class="lgrey">© 2026 Bodha Research Pvt Ltd | <a class="linkedlight" href="/docs/terms-and-conditions">T&C</a> | <a class="linkedlight" href="/docs/privacy-policy">Privacy</a> | <a class="linkedlight" href="/docs/refunds-policy">Refunds</a></small>
				<small class="lgrey">Svayambodha Centre For Culture Studies Foundation</small>
			</div>
			<div class="foot-actions">
				<a class="blank foot-social" href="https://x.com/BodhaResearch" rel="noreferrer" target="_blank">
					<Twitter color="var(--color-white)" />
				</a>
				<a class="blank foot-social" href="https://www.facebook.com/profile.php?id=61584291760187" rel="noreferrer" target="_blank">
					<FB color="var(--color-white)" />
				</a>
				<a class="blank foot-social" href="https://www.instagram.com/bodharesearch" rel="noreferrer" target="_blank">
					<Insta color="var(--color-white)" />
				</a>
				<a class="blank foot-social" href="https://www.linkedin.com/company/bodha-research/" rel="noreferrer" target="_blank">
					<Linkedin color="var(--color-white)" />
				</a>
				<a class="blank foot-social" href="https://github.com/adminBodha2/bodhaNew2" rel="noreferrer" target="_blank">
					<Github color="var(--color-white)"/>
				</a>
			</div>
		</div>
	</div>
</div>

<style lang="sass">

.footer-grid
	display: grid
	grid-template-columns: repeat(6, minmax(120px, 1fr))
	@media screen and (max-width: 1024px)
		grid-template-columns: 1fr 1fr
		row-gap: 2rem

.foot-brand
	grid-column: span 2

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
		top: 92%
		height: 1px
		background: rgba(255,255,255,.12)

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
		background: repeating-linear-gradient(90deg, rgba(255,255,255,.025) 0 1px, transparent 1px 7px), radial-gradient(circle at 50% 0%, rgba(255,255,255,.06), transparent 38%)
		opacity: .55
	&::after
		content: ''
		position: absolute
		left: 0
		right: 0
		height: 1px
		background: rgba(255,255,255,.12)
		pointer-events: none
	@media screen and (max-width: 1024px)
		height: calc(100vh - 64px)
		padding-left: 2rem
		padding-right: 2rem
		&::after
			top: 2rem
	@media screen and (min-width: 1025px)
		height: calc(100vh - 80px)
		padding-top: 6rem
		&::after
			top: 6rem

.foot-inner
	z-index: 2
	border-right: 1px solid rgba(255,255,255,0.1)
	border-left: 1px solid rgba(255,255,255,0.1)
	height: 100%
	overflow: hidden
	padding: 2rem
	row-gap: 6rem
	@media screen and (max-width: 1024px)
		padding-top: 4rem
		padding-left: 1rem
		padding-right: 1rem
		width: 100%
		height: 100%
		row-gap: 4rem

// ── TOP ROW ───────────────────────────────────────────────

.foot-top
	display: flex
	align-items: flex-start
	justify-content: flex-end
	gap: 1.5rem
	border-bottom: 0
	@media screen and (max-width: 1024px)
		display: grid
		grid-template-columns: 1fr
		button
			width: max-content

.foot-brand
	display: flex
	flex-direction: column
	gap: 0.45rem

.foot-scroll
	display: flex
	flex-direction: column
	align-items: center
	gap: 4px
	padding: 10px 14px
	border-radius: 8px
	transition: all 0.15s ease
	backdrop-filter: blur(12px) saturate(1.5)
	background: linear-gradient(180deg, rgba(255, 255, 255, .46), rgba(243, 243, 243, .84))
	border: 1px solid rgba(255, 255, 255, .98)
	box-shadow: 0 1px 0 rgba(255, 255, 255, .9), 0 8px 18px rgba(15, 23, 42, .1), inset 0 -1px 1px rgba(0, 0, 0, .05)
	transform-origin: center center
	&:hover
		background: linear-gradient(180deg, rgba(243, 243, 243, .64), rgba(255, 255, 255, .76))
		transform: scale(0.95)
	@media screen and (max-width: 1024px)
		margin-left: auto

.foot-scroll-arrow
	font-size: 1rem
	color: var(--color-theme-2)
	line-height: 1

.foot-scroll-label
	font-size: 8px
	font-weight: 700
	letter-spacing: 0.1em
	color: var(--color-theme-2)

// ── LINK GRID ─────────────────────────────────────────────

.foot-col
	display: flex
	flex-direction: column
	gap: 1rem
	@media screen and (min-width: 1025px)
		align-items: flex-end
		text-align: right

.foot-links
	display: flex
	flex-direction: column
	gap: 0.6rem

.foot-link
	font-size: 1rem
	transition: color 0.12s ease
	&:hover
		color: var(--color-theme)

// ── BOTTOM BAR ────────────────────────────────────────────

.foot-bottom
	display: flex
	align-items: center
	justify-content: space-between
	gap: 1rem
	flex-wrap: wrap
	margin-top: auto
	margin-bottom: 6rem
	@media screen and (max-width: 1024px)
		flex-direction: column
		align-items: flex-start
		margin-top: auto
		margin-bottom: 4rem

.foot-legal
	display: flex
	flex-direction: column
	gap: 3px
	small
		font-size: 11px
		color: #aaa

.foot-actions
	display: flex
	align-items: center
	gap: 12px

</style>
