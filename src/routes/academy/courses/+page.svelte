<script lang="ts">

	import Container from '$lib/comps/container.svelte'
	import Head from '$lib/comps/headcomponent.svelte'
	import Title from '$lib/comps/page-title.svelte'
	import Card from '$lib/comps/card-comp.svelte'
	import Crumb from '$lib/comps/breadcrumb.svelte'
	import { metaTitle, metaDescription, metaUrl, metaImage } from '$lib/utils/metastores'
  
	$metaTitle = 'Bodha Academy'
	$metaDescription = 'Bodha is a think tank and research group focused on contemporary issues of cultural concern, to inform core areas of policy with wisdom derived from Hindu traditions.'
	$metaUrl = 'https://www.bodharesearch.in/academy'
	$metaImage = '/images/key-academy.webp'
  
  </script>
  
  <Head title={$metaTitle} metaDescription={$metaDescription} metaUrl={$metaUrl} metaImage={$metaImage}></Head>
  
  <Container narrow={true}>
	  <div class="box-t">
			<div class="column borderbot pbot32">
				<Crumb item1="ACADEMY" item1Link="/academy" show2={true} item2="COURSES"/>
				<Title text="Courses"/>
			</div>
		  <div class="grid two stacked-2">
			  <Card link="/academy/courses/introduction-to-shri-ram-swarup" imageLink="/images/srg-square.webp">
				  <h5 class="source-serif">Introduction to Shri Ram Swarup</h5>
				  <p class="grey">Shri Ram Swarup was one of the greatest Hindu thinkers to come out of India in the last century. This course is an introduction to his works and thoughts, leading learners to a better understanding of Bharatavarsha, Sanatana Dharma, and our place in the scheme of things.</p>
				  <div class="row wrap cgap8 rgap8 ycenter xbetween">
					  <small class="blue"><b>CONCLUDED</b></small>
					  <small class="label white tt-u">Instructor - Pankaj Saxena</small>
				  </div>
			  </Card>
			  <Card noLink={true} imageLink="https://sddlbohniijgegvypkfk.supabase.co/storage/v1/object/public/bodhasite/blog-articles/bharatiya-wanderlust.webp">
				  <h5 class="source-serif">Ancient Indian History</h5>
				  <p class="sm grey">The unique story of a culture is captured in its history. But the arbiters of historiography have labeled every culture apart from their own as myth and legend. This course will explore the obfuscated history of Bhāratavarṣa in the light of the Purāṇas, and advance the case for writing and living the true history of this land.</p>
				  <div class="row wrap cgap8 rgap8 ycenter xbetween">
					  <small class="blue"><b>UPCOMING</b></small>
					  <small class="label white tt-u">Instructor - Amritanshu Pandey</small>
				  </div>
			  </Card>	
		  </div>
	  </div>
  </Container>