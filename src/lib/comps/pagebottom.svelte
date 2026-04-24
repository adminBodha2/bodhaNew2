<script lang="ts">
	import FB from '$lib/icons/facebook.svelte';
	import Twitter from '$lib/icons/twitter.svelte';
	import Insta from '$lib/icons/instagram.svelte';
	import Linkedin from '$lib/icons/linkedin.svelte';
</script>

<div class="foot-wrap">
	<div class="foot-inner narrowbox stdpad">
		<div class="foot-top">
			<div class="foot-brand">
				<p class="white">Bodha</p>
				<p class="lgrey small-text">A think tank and research group grounded in the wisdom of Hindu civilization.<br>
					Site designed at Bodha Lab | <a class="linkedlight" target="_blank" rel="noreferrer" href="https://github.com/adminBodha2/bodhaNew2">Github</a>
				</p>
			</div>
			<button
				class="blank foot-scroll"
				onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
			>
				<span class="foot-scroll-arrow">↑</span>
				<span class="foot-scroll-label tt-u">Top</span>
			</button>
		</div>

		<div class="foot-grid">
			<div class="foot-col">
				<p class="tag-text lgrey tt-u">Readings</p>
				<div class="foot-links">
					<a class="foot-link blank white" href="/blog">Blog</a>
					<a class="foot-link blank white" href="/lab">Lab</a>
					<a class="foot-link blank white" href="/library">Open Library</a>
					<a class="foot-link blank white" href="/inspiration">Inspiration</a>
				</div>
			</div>
			<div class="foot-col">
				<p class="tag-text lgrey tt-u">Work</p>
				<div class="foot-links">
					<a class="foot-link blank white" href="/research">Research</a>
					<a class="foot-link blank white" href="/big-questions">Big Questions</a>
					<a class="foot-link blank white" href="/academy">Academy</a>
					<a class="foot-link blank white" href="/anveshi">Bodha Anveshi</a>
				</div>
			</div>
			<div class="foot-col">
				<p class="tag-text lgrey tt-u">About</p>
				<div class="foot-links">
					<a class="foot-link blank white" href="/team">Team</a>
					<a class="foot-link blank white" href="/contact">Contact</a>
					<a class="foot-link blank white" href="/path">Learning Paths</a>
				</div>
			</div>
		</div>

		<div class="foot-bottom">
			<div class="foot-legal">
				<small>© 2026 Bodha Research Pvt Ltd | <a class="linkedlight" href="/contact">Contact</a></small>
				<small>Svayambodha Centre For Culture Studies Foundation</small>
			</div>
			<div class="foot-actions">
				<a class="blank foot-social" href="https://x.com/BodhaResearch" rel="noreferrer" target="_blank">
					<Twitter color="var(--color-grey-2)" />
				</a>
				<a class="blank foot-social" href="https://www.facebook.com/profile.php?id=61584291760187" rel="noreferrer" target="_blank">
					<FB color="var(--color-grey-2)" />
				</a>
				<a class="blank foot-social" href="https://www.instagram.com/bodharesearch" rel="noreferrer" target="_blank">
					<Insta color="var(--color-grey-2)" />
				</a>
				<a class="blank foot-social" href="https://www.linkedin.com/company/bodha-research/" rel="noreferrer" target="_blank">
					<Linkedin color="var(--color-grey-2)" />
				</a>
			</div>
		</div>

	</div>
</div>

<style lang="sass">

.stdpad
	@media screen and (min-width: 1201px)
		padding-left: 80px
		padding-right: 80px
	@media screen and (min-width: 1025px) and (max-width: 1200px)
		padding-left: 48px
		padding-right: 48px
	@media screen and (min-width: 631px) and (max-width: 1024px)
		padding-left: 32px
		padding-right: 32px
	@media screen and (max-width: 630px)
		padding-left: 16px
		padding-right: 16px

.foot-wrap
	width: 100%
	background: linear-gradient(180deg,rgba(7, 57, 104, 1) 0%, rgba(7, 29, 48, 1) 27%, rgba(7, 14, 26, 1) 61%, rgba(10, 4, 4, 1) 100%)

.foot-inner
	display: flex
	flex-direction: column
	gap: 0
	@media screen and (min-width: 1025px)
		padding-top: 4rem
		padding-bottom: 3rem
	@media screen and (max-width: 1024px)
		padding-top: 3rem
		padding-bottom: 2.5rem

// ── TOP ROW ───────────────────────────────────────────────

.foot-top
	display: flex
	align-items: flex-start
	justify-content: space-between
	gap: 1.5rem
	padding-bottom: 2.5rem
	border-bottom: 1px solid rgba(0,0,0,0.08)
	margin-bottom: 2.5rem

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
	border: 1px solid rgba(0,0,0,0.08)
	background: var(--color-white)
	transition: all 0.15s ease
	flex-shrink: 0
	&:hover
		border-color: rgba(0,0,0,0.15)
		box-shadow: 0 2px 8px rgba(0,0,0,0.05)

.foot-scroll-arrow
	font-size: 1rem
	color: #444
	line-height: 1

.foot-scroll-label
	font-size: 8px
	font-weight: 700
	letter-spacing: 0.1em
	color: #999

// ── LINK GRID ─────────────────────────────────────────────

.foot-grid
	display: grid
	gap: 2rem
	padding-bottom: 2.5rem
	border-bottom: 1px solid rgba(0,0,0,0.08)
	margin-bottom: 2rem
	@media screen and (min-width: 1025px)
		grid-template-columns: repeat(3, 1fr)
	@media screen and (max-width: 1024px)
		grid-template-columns: repeat(2, 1fr)

.foot-col
	display: flex
	flex-direction: column
	gap: 1rem

.foot-links
	display: flex
	flex-direction: column
	gap: 0.6rem

.foot-link
	font-size: 0.88rem
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

.foot-social
	opacity: 0.6
	transition: opacity 0.12s ease
	&:hover
		opacity: 1

</style>
