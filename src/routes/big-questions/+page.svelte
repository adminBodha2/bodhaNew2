<script lang="ts">
	import { onMount } from 'svelte';
	import { allQuestions } from '$lib/utils/localpulls';
	import Swipes from '$lib/comps/swipercomp.svelte';
	import Container from '$lib/comps/container.svelte';
	import Heading from '$lib/comps/page-header-one.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Parallax from '$lib/comps/parallaxfull.svelte';

	const title = 'Bodha — Big Questions';
	const metaDescription = 'Hindu consciousness is awakening across the nation. Bodha aids this process by asking provocative questions about the most fundamental problems and open questions that Hindu society faces today — issues that are not settled, perennially asked by every Hindu generation, and novel dilemmas of our time.';
	const metaUrl = 'https://www.bodharesearch.in/big-questions';
	const metaImage = 'https://www.bodharesearch.in/images/key-bigquestions.webp';

	let questions: any;

	onMount(async () => {
		questions = await allQuestions();
	});
</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} />

<Parallax imageLink="/images/key-bigquestions.webp" isClass="is50" />
<Container narrow={true} scaled={true}>
	<Heading title="Big Questions" />
	<div class="stdbox padded">
		<Crumb item1="Bodha" item1Link="/" showT={true} title="Big Questions" showD={true} desc={metaDescription} />
		{#if questions && questions.length > 0}
			<Swipes slidesPerView={1} spaceBetween={8} pagination={false} breakpoints={{ 0: { slidesPerView: 1, spaceBetween: 8 }, 1024: { slidesPerView: 1, spaceBetween: 8 } }}>
				{#each questions as item}
					<swiper-slide>
						<div class="column question-card">
							<a class="blank row ycenter question-head mcol xleft" href={item.linkpath}>
								<img class="q-icon blue" src={item.meta.image} alt={item.meta.title} />
								<h2 class="card-title source-serif">{item.meta.id} — {item.meta.title}</h2>
							</a>
							<div class="grid two right question-grid">
								<div class="box question-left down">
									<div class="main-box">
									<svelte:component this={item.content} />
									<a class="linkedlight" href={item.linkpath}>Explore →</a>
									</div>
								</div>
								<div class="box question-right up">
									<div class="ycenter q-left-text labelbox">
										<div class="row wrap cgap8">
											{#each item.meta.tags as tag}
												<a class="tag-pill themed tt-u" href="/tags/{tag}">{tag.replaceAll('-', ' ')}</a>
											{/each}
										</div>
										<p class="small-text grey">{item.meta.description}</p>
									</div>
									<img src={item.meta.icon} alt={item.meta.title} />
								</div>
							</div>
						</div>
					</swiper-slide>
				{/each}
			</Swipes>
		{/if}
	</div>
</Container>

<style lang="sass">

swiper-slide
	height: 100%
	display: flex

swiper-slide > *
	width: 100%

.question-card
	overflow: hidden
	background: #fff
	border-radius: 4px
	height: 100%

.question-head
	gap: 1rem
	padding: 1.5rem
	&:hover
		h2
			color: var(--theme)
	@media screen and (max-width: 1024px)
		padding: 0 0 1rem 0
		gap: 0.5rem

.question-grid
	border: var(--border-main)

.q-icon
	width: 40px
	height: 40px
	object-fit: contain
	flex-shrink: 0
	filter: saturate(0) opacity(0.6)
	&.blue
		filter: saturate(1) opacity(1)
	@media screen and (max-width: 1024px)
		margin-right: auto

.question-left
	display: flex
	flex-direction: column
	padding: 1rem
	@media screen and (min-width: 1025px)
		padding: 2rem
		border-right: var(--border-main)

.q-left-text
	padding: 1rem
	height: calc(100% - 200px)
	background: var(--color-stone)
	@media screen and (min-width: 1025px)
		padding: 2rem
		height: calc(100% - 280px)

.question-right
	img
		width: 100%
		object-fit: cover
		height: 200px
	@media screen and (min-width: 1025px)
		img
			height: 280px

</style>
