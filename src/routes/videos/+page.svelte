<script lang="ts">
	import { onMount } from 'svelte';
	import { allVideos } from '$lib/utils/supabaseClient';
	import Crumb from '$lib/comps/breadcrumb.svelte'
	import Swipes from '$lib/comps/swipercomp.svelte'
	import Head from '$lib/comps/headcomponent.svelte';
	import Youtuber from '$lib/comps/youtuber.svelte';
	import Container from '$lib/comps/container.svelte';

	let vids: any;

	const title = "Videos at Bodha"
	const metaDescription = "Collected talks, podcasts, conference sessions, and more by members of our team."
	const metaUrl = "https://www.bodharesearch.in/videos"
	const metaImage = "https://www.bodharesearch.in/images/bodhacover.png"

	onMount(() => {
		(async () => {
			vids = await allVideos();
		})();
	});
</script>

<Head {title} {metaDescription} {metaImage} {metaUrl}/>

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
