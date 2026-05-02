<script lang="ts">
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Hidden from '$lib/comps/page-header-one.svelte'
	import { absoluteImage, absoluteUrl, collectionPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';

	const title = 'Bodha Courses';
	const metaDescription = 'Online courses covering the most important Indian thinkers and schools of thought, from an Indic point of view.';
	const metaUrl = absoluteUrl('/academy/courses');
	const metaImage = absoluteImage('/images/key-academy.webp');

	const jsonld = stringifyJsonLd(
		collectionPageJsonLd({
			name: title,
			description: metaDescription,
			url: metaUrl,
			image: metaImage,
			items: [
				{
					name: 'Introduction to Shri Ram Swarup',
					description: 'An introduction to the works and thought of Shri Ram Swarup.',
					url: '/academy/courses/introduction-to-shri-ram-swarup'
				}
			]
		})
	);


</script>

<Head
	{title}
	{metaDescription}
	{metaUrl}
	{metaImage}
	imWidth="1536"
	imHeight="1024"
	{jsonld}
/>

<Container>
<Hidden title="Courses at Bodha"/>
<div class="stdbox stdpad header-margin">
	<Crumb showT={true} title="Courses" showD={true} desc={metaDescription}/>
		<div class="white-grid grid two">
			<a class="box course-item" href="/academy/courses/introduction-to-shri-ram-swarup">
				<div class="image-type-c">
					<img src="/images/srg-square.webp" alt="Introduction to Shri Ram Swarup" />
				</div>
				<div class="box textbox">
					<p class="card-title source-serif">Introduction to Shri Ram Swarup</p>
					<p class="descriptor-text grey">Shri Ram Swarup was one of the greatest Hindu thinkers to come out of India in the last century. This course is an introduction to his works and thoughts, leading learners to a better understanding of Bharatavarsha, Sanatana Dharma, and our place in the scheme of things.</p>
				</div>
				<div class="row ycenter xbetween mwrap cgap8 rgap8 foot self-bottom">
					<p class="citation-big grey tt-u">Pankaj Saxena</p>
					<p class="tag-pill themed tt-u">Concluded</p>
				</div>
			</a>
			<div class="box course-item">
				<div class="image-type-c">
					<img src="https://sddlbohniijgegvypkfk.supabase.co/storage/v1/object/public/bodhasite/blog-articles/bharatiya-wanderlust.webp" alt="Ancient Indian History" />
				</div>
				<div class="box textbox">
					<p class="card-title source-serif">Ancient Indian History</p>
					<p class="descriptor-text grey">The unique story of a culture is captured in its history. But the arbiters of historiography have labeled every culture apart from their own as myth and legend. This course will explore the obfuscated history of Bhāratavarṣa in the light of the Purāṇas, and advance the case for writing and living the true history of this land.</p>
				</div>
				<div class="row ycenter xbetween mwrap cgap8 rgap8 foot self-bottom">
					<p class="citation-big grey tt-u">Amritanshu Pandey</p>
					<p class="tag-pill accented tt-u">Upcoming</p>
				</div>
			</div>
		</div>
</div>
</Container>

<style lang="sass">

.course-item
	background: var(--color-back)
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
