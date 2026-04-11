<script lang="ts">
	import FB from '$lib/icons/facebook.svelte';
	import Twitter from '$lib/icons/twitter.svelte';
	import Insta from '$lib/icons/instagram.svelte';
	import Linkedin from '$lib/icons/linkedin.svelte';
	import Scroller from '$lib/comps/scrolltotop.svelte';

	let sY = $state(0);
</script>

<svelte:window bind:scrollY={sY} />

<div class="separator"></div>
<button
	class="blank column xcenter ycenter rgap4"
	style="margin-bottom: 1rem"
	onclick={() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}}
>
	<Scroller />
	<small class="lgrey">scroll to top</small>
</button>
<div class="column mainer">
	<div class="stdpad column rgap32">
		<div class="grid two rgap24 pbot16">
			<div class="column rgap16">
				<p class="lgrey thinner sm">readings:</p>
				<p class="white thinner">
					<a class="blank linkedlight" href="/blog"><b>BLOG</b></a> - expert, long-form essays and opinions
				</p>
				<p class="white thinner">
					<a class="blank linkedlight" href="/lab"><b>LAB</b></a> - notes on what we're reading and researching
				</p>
				<p class="white thinner">
					<a class="blank linkedlight" href="/library"><b>BODHA OPEN LIBRARY</b></a> - collection of texts,
					papers, scriptures
				</p>
				<p class="white thinner">
					<a class="blank linkedlight" href="/inspiration"><b>INSPIRATION</b></a> - thinkers and schools
					of thought that we learn from
				</p>
			</div>
			<div class="column rgap16">
				<p class="lgrey thinner sm">research and more:</p>
				<p class="white thinner">
					<a class="blank linkedlight" href="/research"><b>RESEARCH</b></a> - all our current and planned
					projects
				</p>
				<p class="white thinner">
					<a class="blank linkedlight" href="/big-questions"><b>BIG QUESTIONS</b></a> - that we are asking,
					and answering
				</p>
				<p class="white thinner">
					<a class="blank linkedlight" href="/academy"><b>ACADEMY</b></a> - our work on compounding and
					scaling research
				</p>
				<p class="white thinner">
					<a class="blank linkedlight" href="/anveshi"><b>BODHA ANVESHI</b></a> - temple tours, cultural
					and sacred immersion
				</p>
			</div>
		</div>
		<div class="column ptop32" style="border-top: 1px solid #252525">
			<div class="grid two rgap24">
				<div class="column rgap8">
					<small class="white"
						>© 2026 Bodha | Designed at Bodha Lab | <a class="blank linkedlight" href="/contact">Contact</a></small
					>
					<small style="color: #a7a7a7"
						>Bodha Research Pvt Ltd | Svayambodha Centre For Culture Studies Foundation</small
					>
				</div>
				<div class="row ycenter xright mleft cgap16">
					<a class="blank" href="https://x.com/BodhaResearch" rel="noreferrer" target="_blank">
						<Twitter />
					</a>
					<a
						class="blank"
						href="https://www.facebook.com/profile.php?id=61584291760187"
						rel="noreferrer"
						target="_blank"
					>
						<FB />
					</a>
					<a
						class="blank"
						href="https://www.instagram.com/bodharesearch"
						rel="noreferrer"
						target="_blank"
					>
						<Insta />
					</a>
					<a
						class="blank"
						href="https://www.linkedin.com/company/bodha-research/"
						rel="noreferrer"
						target="_blank"
					>
						<Linkedin />
					</a>
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="sass">

.separator
	padding-top: 16px

.mainer
	width: 100%
	background: linear-gradient(180deg,rgba(7, 57, 104, 1) 0%, rgba(7, 29, 48, 1) 27%, rgba(7, 14, 26, 1) 61%, rgba(10, 4, 4, 1) 100%)
	@media screen and (min-width: 1025px)
		padding-top: 8rem
		padding-bottom: 8rem
	@media screen and (max-width: 1024px)
		padding-top: 5.5rem
		padding-bottom: 5.5rem

</style>
