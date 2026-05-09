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
	import Reveal from '$lib/svelteanim/components/Reveal.svelte'

	type Scholar = {
		name?:string;
		photo?:string;
		description?:string
	}

	let { data }: { data: PageData } = $props();
	let posts = $derived((data.scholars ?? []) as Scholar[]);
	let reference = $state<HTMLElement | null>(null);
	let isVisible = useInView(() => reference, { threshold: 1, once: true});
	let revealref = $state<HTMLElement | null>(null)
	let revealVis = useInView(() => revealref, { threshold: 0.2, once: true});
	const title = 'Academy | Bodha';
	const metaDescription = 'Training scholars in Indic research methodology and anthropology. Introducing the highest Hindu ideas and traditions to the next generation.';
	const metaUrl = absoluteUrl('/academy');
	const metaImage = absoluteImage('/images/key-academy.webp');

</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="1536" imHeight="1024" />

<Container>
<Parallax imageLink="/images/key-academy.webp" />
	<section class="wrapper-std first-box">
		<Crumb showT={true} title="Bodha Academy" showD={true} desc={metaDescription}/>
		<div class="grid grid-cols-1 lg:grid-cols-2 gap16" bind:this={revealref}>
			<Reveal visible={revealVis.visible}>
		<p class="highlight-text col-span-full">Modern fault lines in Hindu society stem from a clash of identities created and amplified during the colonial era through academia and allied institutions. We want to correct this through field studies that decolonize research methodology — arriving at a genuinely Indic lens of inquiry.</p>
			</Reveal>
			<div class="box rgap8 col-span-full">
			<Reveal visible={revealVis.visible}>
				<p class="highlight-text">This is not possible without creating a line of scholars capable of carrying this work forward, to the next decade and beyond to the next generation.</p>
			</Reveal>
			<Reveal visible={revealVis.visible}>
				<p class="bold highlight-text">That is the purpose of Bodha Academy.</p> 
			</Reveal>
			</div>
		</div>
	</section>
	<section class="wrapper-std growingline" bind:this={reference}>
		<Title text="courses" />
		<div class="grid grid-cols-1 lg:grid-cols-2 white-grid">
			<Slider visible={isVisible.visible} direction="left" outDirection="left" distance={200} duration={400} delay={500}>
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
			</Slider>
			<Slider visible={isVisible.visible} direction="right" outDirection="right" distance={200} duration={400} delay={500}>
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
			</Slider>
		</div>
	</section>
	<section class="wrapper-std growingline alternate">
		<Title text="Academy Scholars"/>
		<div class="box">
			{#each posts as item}
				<div class="person-card">
					<img  class="person-photo" src={item.photo} alt={item.name}/> 
					<div class="person-data box rgap8">
						<p class="card-title tight bold">{item.name}</p>
						<p class="paragraph-text grey">{item.description}</p>
					</div>
				</div>
			{/each}
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
