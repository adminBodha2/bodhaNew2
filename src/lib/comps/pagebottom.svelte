<script lang="ts">
	import FB from '$lib/icons/facebook.svelte';
	import Twitter from '$lib/icons/twitter.svelte';
	import Insta from '$lib/icons/instagram.svelte';
	import Linkedin from '$lib/icons/linkedin.svelte';
	import Github from '$lib/icons/github.svelte'
	import Designed from '$lib/icons/designed.svelte'
</script>

<div class="foot-wrap stdbox padded">
	<div class="foot-inner narrowbox padded elembox">
		<div class="foot-top">
			<div class="foot-brand">
				<p class="lgrey small-text">Bodha is a think tank and research group grounded in the wisdom of Hindu civilization.<br>
					Site designed at Bodha Lab | <a class="linkedlight" href="/docs/terms-and-conditions">Terms and Conditions</a> | <a class="linkedlight" href="/docs/privacy-policy">Privacy</a> | <a class="linkedlight" href="/docs/refunds-policy">Refunds.</a>
				</p>
				<Designed/>
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
				<p class="tag-text lgrey tt-u">Research</p>
				<div class="foot-links">
					<a class="foot-link blank grey" href="/research">Projects</a>
					<a class="foot-link blank grey" href="/big-questions">Big Questions</a>
					<a class="foot-link blank grey" href="/academy">Courses</a>
					<a class="foot-link blank grey" href="/lab">Lab</a>
				</div>
			</div>
			<div class="foot-col">
				<p class="tag-text lgrey tt-u">Culture</p>
				<div class="foot-links">
					<a class="foot-link blank grey" href="/anveshi">Anveshi</a>
					<a class="foot-link blank grey" href="/paths">Reading Paths</a>
					<a class="foot-link blank grey" href="/concepts">Concepts</a>
					<a class="foot-link blank grey" href="/temples">Temples</a>
				</div>
			</div>
			<div class="foot-col">
				<p class="tag-text lgrey tt-u">Readings</p>
				<div class="foot-links">
					<a class="foot-link blank grey" href="/blog">Blog</a>
					<a class="foot-link blank grey" href="/library">Open Library</a>
					<a class="foot-link blank grey" href="/inspiration">Inspiration</a>
				</div>
			</div>
			<div class="foot-col">
				<p class="tag-text lgrey tt-u">Bodha</p>
				<div class="foot-links">
					<a class="foot-link blank grey" href="/about">About</a>
					<a class="foot-link blank grey" href="/contact">Contact</a>
					<a class="foot-link blank grey" href="/videos">Videos</a>
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

.foot-wrap
	width: 100%
	background: linear-gradient(180deg,rgba(0, 44, 94, 1) 0%, rgba(0, 28, 59, 1) 53%, rgba(0, 9, 19, 1) 84%, rgba(0, 0, 0, 1) 100%)
	box-shadow: inset 0 12px 24px -12px rgba(0, 0, 0, 0.85)

// ── TOP ROW ───────────────────────────────────────────────

.foot-top
	display: flex
	align-items: flex-start
	justify-content: space-between
	gap: 1.5rem
	@media screen and (max-width: 1024px)
		display: grid
		grid-template-columns: 1fr
		grid-template-areas: "." "foot-brand"
		.foot-brand
			grid-area: foot-brand
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
	backdrop-filter: blur(12px) saturate(1.2)
	background: linear-gradient(180deg, rgba(255, 255, 255, .76), rgba(243, 243, 243, .64))
	border: 1px solid rgba(255, 255, 255, .98)
	box-shadow: 0 1px 0 rgba(255, 255, 255, .9), 0 8px 18px rgba(15, 23, 42, .1), inset 0 -1px 1px rgba(0, 0, 0, .05)
	transform-origin: center center
	&:hover
		background: linear-gradient(180deg, rgba(243, 243, 243, .64), rgba(255, 255, 255, .76))
		transform: scale(0.95)

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

.foot-grid
	display: grid
	padding-bottom: 4rem
	padding-top: 4rem
	border-bottom: 1px solid rgba(255,255,255,0.1)
	border-top: 1px solid rgba(255,255,255,0.1)
	@media screen and (min-width: 1025px)
		grid-template-columns: repeat(4, 1fr)
		gap: 2rem
	@media screen and (max-width: 1024px)
		grid-template-columns: repeat(2, 1fr)
		gap: 2rem 4rem

.foot-col
	display: flex
	flex-direction: column
	gap: 1rem

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
	@media screen and (max-width: 1024px)
		flex-direction: column
		align-items: flex-start

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
