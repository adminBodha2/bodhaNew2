<script lang="ts">
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Hidden from '$lib/comps/page-header-one.svelte'
	import { useInView } from '$lib/svelteanim/utils/useInView.svelte';
	import { absoluteImage, absoluteUrl, collectionPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';

	const title = 'Bodha Courses | Hindu Thinkers, IKS, and Indic Thought';
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
<section class="box wrapper-std rgap32 header-margin">
	<Crumb showT={true} title="Courses" showD={true} desc={metaDescription}/>
		<div class="grid grid-cols-1 lg:grid-cols-2 white-grid">
			<a class="box rgap16 course-item p16 lg:p32" href="/academy/courses/introduction-to-shri-ram-swarup">
				<div>
					<img class="size-lg" src="/images/srg-square.webp" alt="Introduction to Shri Ram Swarup" />
				</div>
				<div class="box rgap8">
					<h3>Introduction to Shri Ram Swarup</h3>
					<p class="paragraph-text grey">Shri Ram Swarup was one of the greatest Hindu thinkers to come out of India in the last century. This course is an introduction to his works and thoughts, leading learners to a better understanding of Bharatavarsha, Sanatana Dharma, and our place in the scheme of things.</p>
				</div>
				<div class="row ycenter xbetween mwrap cgap8 rgap8 foot self-bottom">
					<p class="altprim tt-u w500">Pankaj Saxena</p>
					<p class="tag-pill tt-u dead">Concluded</p>
				</div>
			</a>
			<div class="box rgap16 p16 lg:p32">
				<div>
					<img class="size-lg" src="https://sddlbohniijgegvypkfk.supabase.co/storage/v1/object/public/bodhasite/blog-articles/bharatiya-wanderlust.webp" alt="Ancient Indian History" />
				</div>
				<div class="box rgap8">
					<h3>Ancient Indian History</h3>
					<p class="paragraph-text grey">The unique story of a culture is captured in its history. But the arbiters of historiography have labeled every culture apart from their own as myth and legend. This course will explore the obfuscated history of Bhāratavarṣa in the light of the Purāṇas, and advance the case for writing and living the true history of this land.</p>
				</div>
				<div class="row ycenter xbetween mwrap cgap8 rgap8 foot self-bottom">
					<p class="altprim tt-u w500 dead">Amritanshu Pandey</p>
					<p class="tag-pill tt-u">Upcoming</p>
				</div>
			</div>
		</div>
</section>
</Container>

<style lang="sass">

.course-item
	background: var(--color-back)
	transition: all 200ms cubic-bezier(0.000, 1.145, 0.905, 0.970)
	&:hover
		background: var(--color-stone-1)

</style>
