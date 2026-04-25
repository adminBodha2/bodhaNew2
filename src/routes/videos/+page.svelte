<script lang="ts">
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Swipes from '$lib/comps/swipercomp.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Youtuber from '$lib/comps/youtuber.svelte';
	import Container from '$lib/comps/container.svelte';
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

<Container narrow={true} scaled={true}>
	<div class="stdbox padded-ontop">
		<Crumb item1="Bodha" item1Link="/" showT={true} title={title} showD={true} desc={metaDescription}/>
		{#if vids && vids.length > 0}
		<Swipes slidesPerView={3} spaceBetween={8}	pagination={false} breakpoints={{0: { slidesPerView: 1, spaceBetween: 8}, 1024: {slidesPerView: 3,spaceBetween: 8}}}>
			{#each vids as item}
				<swiper-slide>
					<div class="column rgap16">
						<Youtuber youTubeId={item.videoid} />
						<div class="column rgap8">
							<p class="w500 tight"><a class="blank linker" href={item.link} target="_blank" rel="noreferrer">{item.name}</a></p>
							<p class="small-text grey">{item.channel}</p>
						</div>
					</div>
				</swiper-slide>
			{/each}
		</Swipes>
		{/if}
	</div>
</Container>
