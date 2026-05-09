<script lang="ts">
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Swipes from '$lib/comps/swipercomp.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Container from '$lib/comps/wrapper.svelte';
	import VideoPlayer from '$lib/comps/custom-video-player.svelte'
	import { absoluteImage, absoluteUrl, collectionPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';

	let { data } = $props();

	let vids = $derived(data.vids ?? []);

	const title = 'Videos | Bodha';
	const metaDescription = 'Collected talks, podcasts, conference sessions, and more by members of the Bodha team.';
	const metaUrl = absoluteUrl('/videos');
	const metaImage = absoluteImage('/images/bodhacover.png');

	let jsonld = $derived(
		stringifyJsonLd(
			collectionPageJsonLd({
				name: title,
				description: metaDescription,
				url: metaUrl,
				image: metaImage,
				items: vids.map((video: any) => ({
					name: video.name,
					url: video.link
			}))
			})
		)
	);
</script>

<Head
	{title}
	{metaDescription}
	{metaImage}
	{metaUrl}
	imWidth="2560"
	imHeight="1440"
	{jsonld}
/>

<Container>
	<section class="box wrapper-std rgap32 header-margin">
		<Crumb showT={true} title="Videos" showD={true} desc={metaDescription}/>
		{#if vids && vids.length > 0}
		<Swipes slidesPerView={3} spaceBetween={8}	pagination={false} breakpoints={{0: { slidesPerView: 1, spaceBetween: 8}, 1024: {slidesPerView: 3,spaceBetween: 8}}}>
			{#each vids as item}
				<swiper-slide>
					<div class="video-card blank theme-line-parent">
						<VideoPlayer videoId={item.videoid} title={item.name} loop />
						<a class="box video-footer rgap8" href={item.link} target="_blank" rel="noreferrer">
							<p class="w500 tight">{item.name}</p>
							<div class="theme-line"></div>
							<p class="citation-big lgrey tt-u">{item.channel}</p>
						</a>
					</div>
				</swiper-slide>
			{/each}
		</Swipes>
		{/if}
	</section>
</Container>

<style lang="sass">

.video-card
	overflow: hidden
	background: var(--color-back)
	transition: transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease
	&:hover
		background: var(--color-stone-1)
		.theme-line
			transform: scaleX(1.5)

.video-footer
	padding: 1.1rem 1.2rem
	border-top: 1px solid rgba(0,0,0,0.05)

</style>
