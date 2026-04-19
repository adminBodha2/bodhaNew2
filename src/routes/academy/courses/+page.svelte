<script lang="ts">
	import Container from '$lib/comps/container.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Parallax from '$lib/comps/parallaxfull.svelte';
	import Hidden from '$lib/comps/page-header-one.svelte'
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
<Hidden title="Courses at Bodha"/>
<div class="box std padded column ycenter">
	<Title text="Courses"/>
	<div class="standard-grid grid two">
			<a class="card-type-c number" href="/academy/courses/introduction-to-shri-ram-swarup">
				<div class="image-type-c">
					<img src="/images/srg-square.webp" alt="Introduction to Shri Ram Swarup" />
				</div>
				<div class="box textbox">
					<h3 class="blog-title">Introduction to Shri Ram Swarup</h3>
					<p class="small-text grey">Shri Ram Swarup was one of the greatest Hindu thinkers to come out of India in the last century. This course is an introduction to his works and thoughts, leading learners to a better understanding of Bharatavarsha, Sanatana Dharma, and our place in the scheme of things.</p>
				</div>
<div class="row ycenter xbetween mwrap cgap8 rgap8 foot">
				<p class="citation-big grey tt-u">Pankaj Saxena</p>
						<p class="tag-pill themed tt-u">Concluded</p>
</div>

			</a>
			<div class="card-type-c number">
				<div class="image-type-c">
					<img src="https://sddlbohniijgegvypkfk.supabase.co/storage/v1/object/public/bodhasite/blog-articles/bharatiya-wanderlust.webp" alt="Ancient Indian History" />
				</div>
				<div class="box textbox">
					<h3 class="blog-title">Ancient Indian History</h3>
					<p class="small-text grey">The unique story of a culture is captured in its history. But the arbiters of historiography have labeled every culture apart from their own as myth and legend. This course will explore the obfuscated history of Bhāratavarṣa in the light of the Purāṇas, and advance the case for writing and living the true history of this land.</p>
				</div>
				<div class="row ycenter xbetween mwrap cgap8 rgap8 foot">
					<p class="citation-big grey tt-u">Amritanshu Pandey</p>
					<p class="tag-pill accented tt-u">Upcoming</p>
				</div>
			</div>
		</div>
</div>
</Container>

<style lang="sass">

.standard-grid
	.box.textbox
		padding: 1rem
		@media screen and (min-width: 1025px)
			padding: 1.5rem
	.foot
		border-top: 1px solid var(--color-border)
		padding: 1rem
		@media screen and (min-width: 1025px)
			padding: 1rem 1.5rem

</style>