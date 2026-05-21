<svelte:options runes={true} />

<script lang="ts">
	import type { PageData } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Parallax from '$lib/comps/parallaxhalf.svelte';
	import Title from '$lib/comps/page-title.svelte';
	import { absoluteImage, absoluteUrl } from '$lib/utils/seo';
	import Slider from '$lib/svelteanim/components/Slide.svelte';
	import { useInView } from '$lib/svelteanim/utils/useInView.svelte';
	import Reveal from '$lib/svelteanim/components/Reveal.svelte';

	type Scholar = {
		name?: string;
		photo?: string;
		description?: string;
	};

	let { data }: { data: PageData } = $props();
	let posts = $derived((data.scholars ?? []) as Scholar[]);
	let courses = $derived(data.courses ?? []);
	let reference = $state<HTMLElement | null>(null);
	let isVisible = useInView(() => reference, { threshold: 1, once: true });
	let revealref = $state<HTMLElement | null>(null);
	let revealVis = useInView(() => revealref, { threshold: 0.2, once: true });
	const title = 'Bodha Academy | Indic Research Methodology and Hindu Thought';
	const metaDescription = 'Training scholars in Indic research methodology and anthropology. Introducing the highest Hindu ideas and traditions to the next generation.';
	const metaUrl = absoluteUrl('/academy');
	const metaImage = absoluteImage('/images/key-academy.webp');
</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="1536" imHeight="1024" />

	<Parallax imageLink="/images/key-academy.webp" wipe={true} />
<Container>
<Crumb showT={true} title="Bodha Academy" showD={true} desc={metaDescription} />
	<section class="wrapper-std">
		<div class="grid grid-cols-1 lg:grid-cols-2 cgap64 rgap16" bind:this={revealref}>
			<Reveal visible={revealVis.visible} duration={400}>
				<p class="highlight-text">Modern fault lines in Hindu society stem from a clash of identities created and amplified during the colonial era through academia and allied institutions. We want to correct this through field studies that decolonize research methodology — arriving at a genuinely Indic lens of inquiry.</p>
			</Reveal>
			<div class="box rgap8">
				<Reveal visible={revealVis.visible} duration={500} delay={300}>
					<p class="highlight-text">This is not possible without creating a line of scholars capable of carrying this work forward, to the next decade and beyond to the next generation.</p>
				</Reveal>
				<Reveal visible={revealVis.visible} duration={300} delay={600}>
					<p class="bold highlight-text">That is the purpose of Bodha Academy.</p>
				</Reveal>
			</div>
		</div>
	</section>
	<section class="wrapper-std growingline" bind:this={reference}>
		<Title text="courses" />
		<div class="grid grid-cols-1 lg:grid-cols-2 white-grid width80">
			{#each courses as course, i}
				<Slider visible={isVisible.visible} direction="left" outDirection="right" distance={400} duration={700} delay={i * 500}>
					{#if course.page === true}
						<a class="box course-item" href="/academy/courses/{course.slug}">
							<div class="p8">
								<img class="fitted landscape" src={course.image} alt={course.title} />
							</div>
							<div class="box rgap16 p16 lg:p32">
								<h3 class="source-serif txt-3xl lh12 w690 lg:txt-4xl a-hover ls001m lg:ls003m">{course.title}</h3>
								<p class="txt-lg lh14 grey2">{course.desc}</p>
							</div>
							<p class="txt-bs tt-u w500 grey3 bordertop px16 lg:px32 py16">{course.instructor} | {course.status}</p>
						</a>
					{:else}
						<div class="box course-item">
							<div class="p8">
								<img class="fitted landscape" src={course.image} alt={course.title} />
							</div>
							<div class="box rgap16 p16 lg:p32">
								<h3 class="source-serif txt-3xl lh12 w690 lg:txt-4xl a-hover ls001m lg:ls003m">{course.title}</h3>
								<p class="txt-lg lh14 grey2">{course.desc}</p>				
							</div>
							<p class="txt-bs tt-u w500 grey3 bordertop px16 lg:px32 py16 self-bottom">{course.instructor} | {course.status}</p>
						</div>
					{/if}
				</Slider>
			{/each}
		</div>
	</section>
	<section class="wrapper-std growingline alternate">
		<Title text="Academy Scholars" />
		<div class="box width80">
			{#each posts as item}
				<div class="person-card row mcol">
					<img class="fitted" src={item.photo} alt={item.name} />
					<div class="rgap16 box p24 lg:p32">
						<p class="txt-2xl w500">{item.name}</p>
						<p class="txt-lg lh14 grey2">{item.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</section>
</Container>

<style lang="sass">

.person-card
	border: var(--border-main)

.course-item
	background: var(--color-back)
	transition: all 200ms cubic-bezier(0.000, 1.145, 0.905, 0.970)
	&:hover
		background: var(--color-stone-1)

</style>
