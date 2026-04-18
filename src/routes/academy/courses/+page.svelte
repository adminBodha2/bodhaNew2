<script lang="ts">
	import Container from '$lib/comps/container.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Parallax from '$lib/comps/parallaxfull.svelte';
	import Title from '$lib/comps/page-title.svelte'
	import { metaTitle, metaDescription, metaUrl, metaImage } from '$lib/utils/metastores';
	$metaTitle = 'Bodha Courses';
	$metaDescription = 'Online courses covering the most important Indian thinkers and schools of thought, from an Indic point of view.';
	$metaUrl = 'https://www.bodharesearch.in/academy/courses';
	$metaImage = '/images/key-academy.webp';
</script>

<Head title={$metaTitle} metaDescription={$metaDescription} metaUrl={$metaUrl} metaImage={$metaImage} />

<Parallax imageLink="/images/key-academy.webp" isClass="is50"/>
<Container narrow={true} scaled={true}>
<div class="box std padded">
	<div class="grid two cgap32">
	<div class="box textbox formobile">
		<p class="eyebrow tt-u"><a class="linkonhover" href="/">Bodha</a></p>
		<h1 class="hero-title source-serif">Academy</h1>
		<p class="hero-sub small-text grey">Training scholars in Indic research methodology and anthropology. Introducing the highest Hindu ideas and traditions to the next generation of thinkers and learners.</p>
	</div>
	<div class="mission-text ta-r mleft">
			<p class="ii">Modern fault lines in Hindu society stem from a clash of identities created and amplified during the colonial era through academia and allied institutions. We want to correct this through field studies that decolonize research methodology — arriving at a genuinely Indic lens of inquiry.</p>
			<p class="item-lin">This is not possible without creating a line of scholars capable of carrying this work forward, to the next decade and beyond to the next generation.</p>
			<p class="item-lin bold blue-dark">That is the purpose of Bodha Academy.</p>
			<p class="item-lin">We aim to reach Hindu learners, scholars, aspiring activists and others through online courses covering the most important Indian thinkers and schools of thought.</p>
	</div>
	</div>
</div>
<div class="box std padded bordertop">
	<Title text="courses"/>
		<div class="standard-grid grid two">
			<a class="card-type-c number1" href="/academy/courses/introduction-to-shri-ram-swarup">
				<div class="image-type-c">
					<img class="radius" src="/images/srg-square.webp" alt="Introduction to Shri Ram Swarup" />
				</div>
				<div class="box textbox">
					<div class="row ycenter xbetween cgap8">
						<p class="tag-pill colored tt-u">Concluded</p>
						<p class="citation-big grey tt-u">Pankaj Saxena</p>
					</div>
					<h3 class="blog-title source-serif">Introduction to Shri Ram Swarup</h3>
					<p class="small-text grey">Shri Ram Swarup was one of the greatest Hindu thinkers to come out of India in the last century. This course is an introduction to his works and thoughts, leading learners to a better understanding of Bharatavarsha, Sanatana Dharma, and our place in the scheme of things.</p>
					<span class="course-link">View course →</span>
				</div>
			</a>
			<div class="card-type-c number2">
				<div class="image-type-c">
					<img class="radius" src="https://sddlbohniijgegvypkfk.supabase.co/storage/v1/object/public/bodhasite/blog-articles/bharatiya-wanderlust.webp" alt="Ancient Indian History" />
				</div>
				<div class="box textbox">
					<div class="row ycenter cgap8">
						<p class="tag-pill colored tt-u">Upcoming</p>
						<p class="citation-big grey tt-u">Amritanshu Pandey</p>
					</div>
					<h3 class="blog-title source-serif">Ancient Indian History</h3>
					<p class="small-text grey">The unique story of a culture is captured in its history. But the arbiters of historiography have labeled every culture apart from their own as myth and legend. This course will explore the obfuscated history of Bhāratavarṣa in the light of the Purāṇas, and advance the case for writing and living the true history of this land.</p>
				</div>
			</div>
		</div>
</div>
</Container>

<style lang="sass">

.formobile
	@media screen and (max-width: 1024px)
		border-bottom: var(--theme-border)
		padding-bottom: 2rem
		margin-bottom: 2rem

.standard-grid
	.box.textbox
		padding: 1rem 0 0 0
		@media screen and (min-width: 1025px)
			padding: 1rem 1rem 0 1rem

// ── MISSION ────────────────────────────────────────────────

.mission-text
	display: flex
	flex-direction: column
	gap: var(--gap-text)


</style>
