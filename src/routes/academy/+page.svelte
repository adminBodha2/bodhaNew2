<svelte:options runes={true} />
<script lang="ts">

	import type { PageData } from './$types'
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Parallax from '$lib/comps/parallaxhalf.svelte';
	import Title from '$lib/comps/page-title.svelte';
	import { absoluteImage, absoluteUrl } from '$lib/utils/seo';
	import Slider from '$lib/svelteanim/components/Slide.svelte'
	import { useInView } from '$lib/svelteanim/utils/useInView.svelte';

	type Scholar = {
		name?:string;
		photo?:string;
		description?:string
	}

	let { data }: { data: PageData } = $props();
	let posts = $derived((data.scholars ?? []) as Scholar[]);
	let reference = $state<HTMLElement | null>(null);
	let isVisible = useInView(() => reference, { threshold: 1, once: true});
	const title = 'Academy | Bodha';
	const metaDescription = 'Training scholars in Indic research methodology and anthropology. Introducing the highest Hindu ideas and traditions to the next generation.';
	const metaUrl = absoluteUrl('/academy');
	const metaImage = absoluteImage('/images/key-academy.webp');

</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="1536" imHeight="1024" />

<Container>
<Parallax imageLink="/images/key-academy.webp" />
	<div class="db-grid padded wraps first-box">
		<Crumb showT={true} title="Bodha Academy" showD={true} desc={metaDescription}/>
		<div class="db-grid span-4">
			<p class="highlight-text span-2">Modern fault lines in Hindu society stem from a clash of identities created and amplified during the colonial era through academia and allied institutions. We want to correct this through field studies that decolonize research methodology — arriving at a genuinely Indic lens of inquiry.</p>
			<div class="box rgap-sm span-2">
				<p class="highlight-text">This is not possible without creating a line of scholars capable of carrying this work forward, to the next decade and beyond to the next generation.</p>
				<p class="bold highlight-text">That is the purpose of Bodha Academy.</p>
			</div>
		</div>
	</div>
	<div class="db-grid padded wraps growingline" bind:this={reference}>
		<Title text="courses" />
		<div class="white-grid db-grid span-4 fix-2">
			<Slider visible={isVisible.visible} direction="left" outDirection="left" distance={200} duration={400} delay={500}>
			<a class="box rgap-sd course-item forbord p2222" href="/academy/courses/introduction-to-shri-ram-swarup">
				<div>
					<img class="fit t2" src="/images/srg-square.webp" alt="Introduction to Shri Ram Swarup" />
				</div>
				<div class="box rgap-sm p0101">
					<p class="card-title">Introduction to Shri Ram Swarup</p>
					<p class="paragraph-text grey">Shri Ram Swarup was one of the greatest Hindu thinkers to come out of India in the last century. This course is an introduction to his works and thoughts, leading learners to a better understanding of Bharatavarsha, Sanatana Dharma, and our place in the scheme of things.</p>
				</div>
				<div class="row ycenter xbetween mwrap cgap8 rgap8 foot self-bottom p1101">
					<p class="altprim tt-u w500">Pankaj Saxena</p>
					<p class="tag-pill tt-u">Concluded</p>
				</div>
			</a>
			</Slider>
			<Slider visible={isVisible.visible} direction="right" outDirection="right" distance={200} duration={400} delay={500}>
			<div class="box rgap-sd bk0000 forbord p2222">
				<div>
					<img class="fit t2" src="https://sddlbohniijgegvypkfk.supabase.co/storage/v1/object/public/bodhasite/blog-articles/bharatiya-wanderlust.webp" alt="Ancient Indian History" />
				</div>
				<div class="box rgap-sm p0101">
					<p class="card-title">Ancient Indian History</p>
					<p class="paragraph-text grey">The unique story of a culture is captured in its history. But the arbiters of historiography have labeled every culture apart from their own as myth and legend. This course will explore the obfuscated history of Bhāratavarṣa in the light of the Purāṇas, and advance the case for writing and living the true history of this land.</p>
				</div>
				<div class="row ycenter xbetween mwrap cgap8 rgap8 foot self-bottom p1101">
					<p class="altprim tt-u w500">Amritanshu Pandey</p>
					<p class="tag-pill tt-u">Upcoming</p>
				</div>
			</div>
			</Slider>
		</div>
	</div>
	<div class="db-grid padded wraps growingline alternate is-last">
		<Title text="Academy Scholars"/>
		<div class="db-grid span-4">
			{#each posts as item}
				<div class="db-grid span-4">
					<div class="up span-1">
						<img  class="square" src={item.photo} alt={item.name}/> 
					</div>
					<div class="box down rgap-sm span-2 p0222">
						<p class="card-title tight">{item.name}</p>
						<p class="grey">{item.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</Container>

<style lang="sass">

.course-item
	background: var(--color-back)
	transition: var(--transition1)
	&:hover
		background: var(--color-stone)

.forbord
	.foot
		border-top: var(--border-main)

</style>
