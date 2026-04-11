<script lang="ts">
	import Container from '$lib/comps/container.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import FB from '$lib/icons/facebook.svelte';
	import Twitter from '$lib/icons/twitter.svelte';
	import Insta from '$lib/icons/instagram.svelte';
	import Linkedin from '$lib/icons/linkedin.svelte';
	import Title from '$lib/comps/page-title.svelte';
	import { metaTitle, metaDescription, metaUrl, metaImage } from '$lib/utils/metastores';

	$metaTitle = 'Bodha Academy';
	$metaDescription =
		'Bodha is a think tank and research group focused on contemporary issues of cultural concern, to inform core areas of policy with wisdom derived from Hindu traditions.';
	$metaUrl = 'https://www.bodharesearch.in/academy';
	$metaImage = '/images/bodhacover.png';
</script>

<Head
	title={$metaTitle}
	metaDescription={$metaDescription}
	metaUrl={$metaUrl}
	metaImage={$metaImage}
></Head>

<Container>
	<div class="box-t andB">
		<Title text="Courses" />
		<div class="grid three stacked">
			<div class="column blogbox2 rgap16">
				<img class="vert" src="/images/srg-square.webp" alt="shri sita ram goel" />
				<h5 class="source-serif">
					<a class="blank" href="/academy/courses/introduction-to-shri-ram-swarup"
						>Introduction to Shri Ram Swarup</a
					>
				</h5>
				<p class="sm grey">
					Shri Ram Swarup was one of the greatest Hindu thinkers to come out of India in the last
					century. This course is an introduction to his works and thoughts, leading learners to a
					better understanding of Bharatavarsha, Sanatana Dharma, and our place in the scheme of
					things.
				</p>
				<div class="row wrap cgap8 rgap8 ycenter xbetween">
					<small class="blue"><b>CONCLUDED</b></small>
					<small class="tt-u">Instructor - Pankaj Saxena</small>
				</div>
			</div>
			<div class="column blogbox2 rgap16">
				<img
					class="vert"
					src="https://sddlbohniijgegvypkfk.supabase.co/storage/v1/object/public/bodhasite/blog-articles/bharatiya-wanderlust.webp"
					alt="ancient indian history"
				/>
				<h5 class="source-serif">
					<a class="blank" href="/academy/courses/introduction-to-shri-ram-swarup"
						>Ancient Indian History</a
					>
				</h5>
				<p class="sm grey">
					The unique story of a culture is captured in its history. But the arbiters of
					historiography have labeled every culture apart from their own as myth and legend. This
					course will explore the obfuscated history of Bhāratavarṣa in the light of the Purāṇas,
					and advance the case for writing and living the true history of this land.
				</p>
				<div class="row wrap cgap8 rgap8 ycenter xbetween">
					<small class="blue"><b>UPCOMING</b></small>
					<small class="tt-u">Instructor - Amritanshu Pandey</small>
				</div>
			</div>
		</div>
	</div>
</Container>

<style lang="sass">
  
img.vert
	object-fit: cover
	width: 100%
	height: 280px

</style>
