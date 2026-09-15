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
	const title = 'Indian Knowledge Systems';
	const metaDescription = 'Timeless disciplines reimagined to anchor the modern Indian intellect.';
	const metaUrl = absoluteUrl('/academy');
	const metaImage = absoluteImage('/images/key-academy.webp');
	let ref = $state<HTMLElement | null>(null);
	let visref = useInView(() => ref, { threshold: 0.6, once: true });
</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="1536" imHeight="1024" />

<Parallax imageLink="/images/key-academy.webp" wipe={true} />
<Container>
<Crumb showT={true} title="Indian Knowledge Systems" showD={true} desc={metaDescription} />
	<section class="wrapper-std">
			<div class="box rgap4 width60">
				<p class="txt-2xl theme source-serif italic">"The human mind, in its progress, marches knowledge to knowledge, renews and enlarges previous knowledge."</p>
				<p class="grey0">Sri Aurobindo</p>
			</div>
		<div class="grid grid-cols-1 lg:grid-cols-2 cgap64 rgap16" bind:this={revealref}>
			<div class="box rgap32">
			<Reveal>
				<p class="highlight-text">True civilizational growth is a conscious renewal, a deliberate synthesis with the roots that give us vitality. The Indian Knowledge Systems (IKS) represent rigorous, experiential inquiry that refused to divorce the observer from the observed, intuition from empirical observation, or human well-being from ecological balance.</p>
				<a class="primary" href="/indian-knowledge-systems/internship"><span>IKS Internship</span></a>
			</Reveal>
			</div>
			<div class="box">
			<Reveal start="top 70%">
					<p class="highlight-text">Bodha’s work is to develop, and help develop battle-tested blueprints for IKS-tethered research, methodology, disciplines, and the foundational work of creating the next generation of scholars - marching knowledge to knowledge and enlarging previous knowledge as Sri Aurobindo would have us do.</p>
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
						<a class="box course-item b-main p8 whitestone" href="/indian-knowledge-systems/{detail.slug}">
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
