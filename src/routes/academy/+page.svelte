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

<Container>
	<Parallax imageLink="/images/key-academy.webp" wipe={true} />
	<section class="wrapper-std first-box">
		<Crumb showT={true} title="Bodha Academy" showD={true} desc={metaDescription} />
		<div class="grid grid-cols-1 lg:grid-cols-2 gap16" bind:this={revealref}>
			<Reveal visible={revealVis.visible}>
				<p class="highlight-text">Modern fault lines in Hindu society stem from a clash of identities created and amplified during the colonial era through academia and allied institutions. We want to correct this through field studies that decolonize research methodology — arriving at a genuinely Indic lens of inquiry.</p>
			</Reveal>
			<div class="box rgap8">
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
			{#each courses as course, i}
				<Slider visible={isVisible.visible} direction="left" outDirection="left" distance={200} duration={400} delay={500}>
					{#if course.page === true}
						<a class="box rgap16 course-item p32" href="/academy/courses/{course.slug}">
							<div>
								<img class="fitted herocard radius4" src={course.image} alt={course.title} />
							</div>
							<div class="box rgap8">
								<h3 class="txt-2xl w600 lg:txt-3xl a-hover">{course.title}</h3>
								<p class="txt-lg lh14 grey1">{course.desc}</p>
							</div>
							<div class="row ycenter xbetween mwrap cgap8 rgap8 foot self-bottom">
								<p class="txt-sm tt-u w500 grey0">{course.instructor}</p>
								<p class="txt-xs tt-u w500 theme">{course.status}</p>
							</div>
						</a>
					{:else}
						<div class="box rgap16 course-item p32">
							<div>
								<img class="fitted herocard radius4" src={course.image} alt={course.title} />
							</div>
							<div class="box rgap8">
								<h3 class="txt-2xl w600 lg:txt-3xl">{course.title}</h3>
								<p class="txt-lg lh14 grey1">{course.desc}</p>
							</div>
							<div class="row ycenter xbetween mwrap cgap8 rgap8 foot self-bottom">
								<p class="txt-sm tt-u w500 grey0">{course.instructor}</p>
								<p class="txt-xs tt-u w500 theme">{course.status}</p>
							</div>
						</div>
					{/if}
				</Slider>
			{/each}
		</div>
	</section>
	<section class="wrapper-std growingline alternate">
		<Title text="Academy Scholars" />
		<div class="box">
			{#each posts as item}
				<div class="person-card">
					<img class="person-photo" src={item.photo} alt={item.name} />
					<div class="person-data box rgap8">
						<p class="txt-xl w500">{item.name}</p>
						<p class="txt-lg lh14 grey2">{item.description}</p>
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
