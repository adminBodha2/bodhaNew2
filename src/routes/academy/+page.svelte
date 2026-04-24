<svelte:options runes={true} />
<script lang="ts">
	import Container from '$lib/comps/container.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Parallax from '$lib/comps/parallaxfull.svelte';
	import Title from '$lib/comps/page-title.svelte';

	const title = 'Academy | Bodha';
	const metaDescription = 'Training scholars in Indic research methodology and anthropology. Introducing the highest Hindu ideas and traditions to the next generation.';
	const metaUrl = 'https://www.bodharesearch.in/academy';
	const metaImage = 'https://www.bodharesearch.in/images/key-academy.webp';

</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="1536" imHeight="1024" />

<Parallax imageLink="/images/key-academy.webp" isClass="is50" />
<Container narrow={true} scaled={true}>
	<div class="stdbox padded">
		<Crumb item1="Bodha" item1Link="/" showT={true} title="Bodha Academy"/>
		<div class="grid two tightrows reading-block">
			<p class="highlight-text">Modern fault lines in Hindu society stem from a clash of identities created and amplified during the colonial era through academia and allied institutions. We want to correct this through field studies that decolonize research methodology — arriving at a genuinely Indic lens of inquiry.</p>
			<div class="textbox">
				<p class="highlight-text">This is not possible without creating a line of scholars capable of carrying this work forward, to the next decade and beyond to the next generation.</p>
				<p class="bold highlight-text">That is the purpose of Bodha Academy.</p>
			</div>
		</div>
	</div>
	<div class="stdbox padded bordertop">
		<Title text="courses" />
		<div class="white-grid grid two">
			<a class="box course-item" href="/academy/courses/introduction-to-shri-ram-swarup">
				<div class="image-type-c">
					<img src="/images/srg-square.webp" alt="Introduction to Shri Ram Swarup" />
				</div>
				<div class="box textbox">
					<h2 class="card-title source-serif">Introduction to Shri Ram Swarup</h2>
					<p class="small-text grey">Shri Ram Swarup was one of the greatest Hindu thinkers to come out of India in the last century. This course is an introduction to his works and thoughts, leading learners to a better understanding of Bharatavarsha, Sanatana Dharma, and our place in the scheme of things.</p>
				</div>
				<div class="row ycenter xbetween mwrap cgap8 rgap8 foot self-bottom">
					<p class="citation-big grey tt-u">Pankaj Saxena</p>
					<p class="tag-pill tt-u">Concluded</p>
				</div>
			</a>
			<div class="box course-item">
				<div class="image-type-c">
					<img src="https://sddlbohniijgegvypkfk.supabase.co/storage/v1/object/public/bodhasite/blog-articles/bharatiya-wanderlust.webp" alt="Ancient Indian History" />
				</div>
				<div class="box textbox">
					<h2 class="card-title source-serif">Ancient Indian History</h2>
					<p class="small-text grey">The unique story of a culture is captured in its history. But the arbiters of historiography have labeled every culture apart from their own as myth and legend. This course will explore the obfuscated history of Bhāratavarṣa in the light of the Purāṇas, and advance the case for writing and living the true history of this land.</p>
				</div>
				<div class="row ycenter xbetween mwrap cgap8 rgap8 foot self-bottom">
					<p class="citation-big grey tt-u">Amritanshu Pandey</p>
					<p class="tag-pill tt-u">Upcoming</p>
				</div>
			</div>
		</div>
	</div>
</Container>

<style lang="sass">

.reading-block
	background: var(--color-white)
	border: var(--border-main)
	padding: 1.2rem
	@media screen and (min-width: 1025px)
		padding: 2rem

.course-item
	background: var(--color-white)
	transition: var(--transition1)
	&:hover
		background: var(--color-stone)
	.box.textbox
		padding: 1rem
		@media screen and (min-width: 1025px)
			padding: 1.5rem
	.foot
		border-top: var(--border-main)
		padding: 1rem
		@media screen and (min-width: 1025px)
			padding: 1rem 1.5rem

</style>
