<script lang="ts">

	import type { PageData } from './$types'
	import Container from '$lib/comps/wrapper.svelte'
	import Crumb from '$lib/comps/breadcrumb.svelte'
	import { WaterRipple } from '$lib/motion-core';

	type Comic = {
		linkpath: string;
		meta: {
			title?: string;
			issue?: number;
			volume?: number;
			id?: number;
			date?: string;
			image?: string;
			description?: string
		}
	}

	let { data }: { data: PageData } = $props();
	let posts = $derived((data.posts ?? []) as Comic[]);

</script>

<Container>
<section class="key-image">
	<WaterRipple src="/images/heroes/key-soa.webp" class="ripple-motion" brushSize={100} />
</section>
<div class="stdbox padded">
	<Crumb item1="Bodha" item1Link="/" showT={true} title="Scrolls of Aryavarta" showD={true} desc="A creative project in cultural storytelling through digital comics, recreating legends, triumphs, struggles, and tragedies from Indian history."/>
	<div class="box bordertop ptop32">
		<div class="grid three tight">
			{#each posts as item}
				<a class="blank box comic-card card-padded" href={item.linkpath}>
					<img src={item.meta.image} alt={item.meta.title}/>
					<div class="box comic-data-main tight-padded">
						<p class="card-title a-hover">{item.meta.title}</p>
						<p class="grey descriptor-text">{item.meta.description}</p>
					</div>
					<div class="self-bottom bordertop tight-padded">
						<p class="tag-text">Vol. {item.meta.volume}, Issue {item.meta.issue} | {item.meta.date}</p>
					</div>
				</a>
			{/each}
		</div>
	</div>
</div>
</Container>

<style lang="sass">

.comic-card
	img
		object-fit: cover
		width: 100%
		@media screen and (min-width: 1025px)
			height: 280px

.key-image
	width: 100%
	height: 400px
	@media screen and (min-width: 1025px)
		height: calc(100vh - 144px)
		margin-top: 72px

</style>