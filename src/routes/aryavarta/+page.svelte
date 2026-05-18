<script lang="ts">
	import type { PageData } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Parallax from '$lib/comps/parallaxhalf.svelte';
	import WaterRipple from '$lib/motion-core/water-ripple/WaterRipple.svelte';

	type Comic = {
		linkpath: string;
		meta: {
			title?: string;
			issue?: number;
			volume?: number;
			id?: number;
			date?: string;
			image?: string;
			description?: string;
		};
	};

	let { data }: { data: PageData } = $props();
	let posts = $derived((data.posts ?? []) as Comic[]);
</script>

<Container>
	<Parallax imageLink="/images/heroes/key-soa.webp" wipe={true} />
	<section class="box wrapper-std first-box rgap32">
		<Crumb showT={true} title="Scrolls of Aryavarta" showD={true} desc="A creative project in cultural storytelling through digital comics, recreating legends, triumphs, struggles, and tragedies from Indian history." />
		<div class="box rgap8">
			<p class="txt-lg theme">To receive the fortnightly issues in your email inbox, please <a href="/members" class="linked">subscribe.</a></p>
		</div>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 cgap16 rgap16">
			{#each posts as item}
				<a class="blank box comic-card p16 radius8 whitestone" href={item.linkpath}>
					<img class="fitted herocard radius4" src={item.meta.image} alt={item.meta.title} />
					<div class="box comic-data-main p16 rgap16">
						<p class="txt-2xl w600 a-hover">{item.meta.title}</p>
						<p class="grey1 txt-lg">{item.meta.description}</p>
					</div>
					<div class="self-bottom bordertop p16 nobot">
						<p class="txt-xs w500 tt-u">Vol. {item.meta.volume}, Issue {item.meta.issue} | {item.meta.date}</p>
					</div>
				</a>
			{/each}
		</div>
	</section>
</Container>

<style lang="sass">

.comic-card
	border: var(--border-dark)

.key-image
	width: 100%
	height: 400px
	@media screen and (min-width: 1025px)
		height: calc(100vh - 144px)
		margin-top: 80px

</style>
