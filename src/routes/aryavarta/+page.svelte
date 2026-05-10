<script lang="ts">
	import type { PageData } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
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
	<section class="key-image">
		<WaterRipple src="/images/heroes/key-soa.webp" class="ripple-motion" brushSize={100} />
	</section>
	<section class="box wrapper-std first-box rgap32">
		<Crumb showT={true} title="Scrolls of Aryavarta" showD={true} desc="A creative project in cultural storytelling through digital comics, recreating legends, triumphs, struggles, and tragedies from Indian history." />
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 cgap16 rgap16">
			{#each posts as item}
				<a class="blank box comic-card p8 radius whitestone" href={item.linkpath}>
					<img class="fit" src={item.meta.image} alt={item.meta.title} />
					<div class="box comic-data-main p16">
						<p class="card-title a-hover">{item.meta.title}</p>
						<p class="grey">{item.meta.description}</p>
					</div>
					<div class="self-bottom bordertop p16 nobot">
						<p class="cite">Vol. {item.meta.volume}, Issue {item.meta.issue} | {item.meta.date}</p>
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
