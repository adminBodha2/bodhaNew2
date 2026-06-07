<svelte:options runes={true} />

<script lang="ts">
	import type { PageData } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Parallax from '$lib/comps/parallaxhalf.svelte';
	import Title from '$lib/comps/page-title.svelte';
	import { absoluteImage, absoluteUrl } from '$lib/utils/seo';
	import Slider from '$lib/svelteanim/components/Slide2.svelte';
	import Blur from '$lib/svelteanim/components/Blur.svelte'
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
			<Reveal>
				<p class="highlight-text">Modern fault lines in Hindu society stem from a clash of identities created and amplified during the colonial era through academia and allied institutions. We want to correct this through field studies that decolonize research methodology — arriving at a genuinely Indic lens of inquiry.</p>
			</Reveal>
			<div class="box rgap8">
				<Reveal start="top 70%">
					<p class="highlight-text">This is not possible without creating a line of scholars capable of carrying this work forward, to the next decade and beyond to the next generation.</p>
				</Reveal>
				<Reveal start="top 65%">
					<p class="bold highlight-text">That is the purpose of Bodha Academy.</p>
				</Reveal>
			</div>
		</div>
	</section>
	<section class="wrapper-std growingline" bind:this={reference}>
		<Title text="courses" />
		<Slider targetSelector=".course-item">
		<div class="grid grid-cols-1 lg:grid-cols-3 gap16">
			{#each courses as course, i}
				{@const detail = course.detail}
					{#if detail.page === true}
						<a class="box course-item b-main p8 whitestone" href="/academy/{detail.slug}">
							<div class="p8">
								<img class="fitted landscape" src={detail.image ?? '/images/key-academy.webp'} alt={detail.title} />
							</div>
							<div class="box rgap16 std-pad">
								<h3 class="txt-2xl lh12 w600 a-hover ls001m lg:ls003m">{detail.title}</h3>
								<p class="txt-lg lh14 grey2">{detail.description}</p>
							{#if detail.status === "OPEN NOW"}
								<p class="txt-xs tt-u w500 theme">{detail.dates} | {detail.price}</p>
							{/if}
							</div>
							<p class="txt-sm tt-u w500 grey3 bordertop px16 lg:px32 py16 self-bottom">{detail.instructor} | {detail.status}</p>
						</a>
					{:else}
						<div class="box course-item b-main p8">
							<div class="p8">
								<img class="fitted landscape" src={detail.image ?? '/images/key-academy.webp'} alt={detail.title} />
							</div>
							<div class="box rgap16 std-pad">
								<h3 class="txt-2xl lh12 w600 a-hover ls001m lg:ls003m">{detail.title}</h3>
								<p class="txt-lg lh14 grey2">{detail.description}</p>
							</div>
							<p class="txt-sm tt-u w500 grey3 bordertop px16 lg:px32 py16 self-bottom">{detail.instructor} | {detail.status}</p>
						</div>
					{/if}
			{/each}
		</div>
		</Slider>
	</section>
	<section class="wrapper-std growingline alternate">
		<Title text="Academy Scholars" />
		<div class="box width80">
			{#each posts as item}
				<Blur>				<div class="person-card row mcol rgap16">
					<img class="fitted" src={item.photo} alt={item.name} />
					<div class="rgap16 box std-pad">
						<p class="txt-2xl w500">{item.name}</p>
						<p class="txt-lg lh14 grey2">{item.description}</p>
					</div>
				</div></Blur>
			{/each}
		</div>
	</section>
</Container>

<style lang="sass">

.person-card
	border: var(--border-main)

</style>
