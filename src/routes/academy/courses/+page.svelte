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
<section class="wrapper-std">
<Crumb showT={true} title="Courses" showD={true} desc={metaDescription}/>
		<div class="grid grid-cols-1 lg:grid-cols-3 gap16">
			<a class="box course-item b-main p8 whitestone" href="/academy/courses/introduction-to-shri-ram-swarup">
				<div class="p8">
					<img class="fitted landscape" src="/images/srg-square.webp" alt="Introduction to Shri Ram Swarup" />
				</div>
				<div class="box rgap16 std-pad">
					<h3 class="txt-2xl lh12 w600 a-hover ls001m lg:ls003m">Introduction to Shri Ram Swarup</h3>
					<p class="txt-lg lh14 grey2">Shri Ram Swarup was one of the greatest Hindu thinkers to come out of India in the last century. This course is an introduction to his works and thoughts, leading learners to a better understanding of Bharatavarsha, Sanatana Dharma, and our place in the scheme of things.</p>
				</div>
				<p class="txt-sm tt-u w500 grey3 bordertop px16 lg:px32 py16 self-bottom">Pankaj Saxena | Concluded</p>
			</a>
			<div class="box course-item b-main p8">
				<div class="p8">
					<img class="fitted landscape" src="https://sddlbohniijgegvypkfk.supabase.co/storage/v1/object/public/bodhasite/blog-articles/bharatiya-wanderlust.webp" alt="Ancient Indian History" />
				</div>
				<div class="box rgap16 std-pad">
					<h3 class="txt-2xl lh12 w600 a-hover ls001m lg:ls003m">Ancient Indian History</h3>
					<p class="txt-lg lh14 grey2">The unique story of a culture is captured in its history. But the arbiters of historiography have labeled every culture apart from their own as myth and legend. This course will explore the obfuscated history of Bhāratavarṣa in the light of the Purāṇas, and advance the case for writing and living the true history of this land.</p>
				</div>
				<p class="txt-sm tt-u w500 grey3 bordertop px16 lg:px32 py16 self-bottom">Amritanshu Pandey | Upcoming</p>
			</div>
		</div>
</section>
</Container>
