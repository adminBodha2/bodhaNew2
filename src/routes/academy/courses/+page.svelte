<script lang="ts">
	import Container from '$lib/comps/container.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Hidden from '$lib/comps/page-header-one.svelte'

	const title = 'Bodha Courses';
	const metaDescription = 'Online courses covering the most important Indian thinkers and schools of thought, from an Indic point of view.';
	const metaUrl = 'https://www.bodharesearch.in/academy/courses';
	const metaImage = 'https://www.bodharesearch.in/images/key-academy.webp';

const jsonld = JSON.stringify({
	'@context': 'https://schema.org',
	'@type': 'CollectionPage',
	name: title,
	description: metaDescription,
	url: metaUrl,
	image: metaImage,
	mainEntity: {
		'@type': 'ItemList',
		itemListElement: [
			{
				'@type': 'ListItem',
				position: 1,
				url: 'https://www.bodharesearch.in/academy/courses/introduction-to-shri-ram-swarup',
				item: {
					'@type': 'Course',
					name: 'Introduction to Shri Ram Swarup',
					description: 'An introduction to the works and thought of Shri Ram Swarup.',
					provider: {
						'@type': 'Organization',
						name: 'Bodha',
						url: 'https://www.bodharesearch.in'
					}
				}
			}
		]
	}
});


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

<Container narrow={true} scaled={true}>
<Hidden title="Courses at Bodha"/>
<div class="stdbox padded-ontop">
	<Crumb item1="Bodha" item1Link="/" show2={true} item2="Academy" item2linked={true} item2Link="/academy" showT={true} title="Courses"/>
		<div class="white-grid grid two">
			<a class="box course-item" href="/academy/courses/introduction-to-shri-ram-swarup">
				<div class="image-type-c">
					<img src="/images/srg-square.webp" alt="Introduction to Shri Ram Swarup" />
				</div>
				<div class="box textbox">
					<p class="card-title source-serif">Introduction to Shri Ram Swarup</p>
					<p class="small-text grey">Shri Ram Swarup was one of the greatest Hindu thinkers to come out of India in the last century. This course is an introduction to his works and thoughts, leading learners to a better understanding of Bharatavarsha, Sanatana Dharma, and our place in the scheme of things.</p>
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
					<p class="small-text grey">The unique story of a culture is captured in its history. But the arbiters of historiography have labeled every culture apart from their own as myth and legend. This course will explore the obfuscated history of Bhāratavarṣa in the light of the Purāṇas, and advance the case for writing and living the true history of this land.</p>
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