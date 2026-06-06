<script lang="ts">
	import type { PageData } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import News from '$lib/icons/newsletter.svelte';
	import { absoluteImage, absoluteUrl, collectionPageJsonLd, stringifyJsonLd } from '$lib/utils/seo';

	type NewsLetter = {
		linkpath: string;
		meta: {
			title?: string;
			date?: string;
			id?: number;
			pdflink?: string;
			image?: string;
			description?: string;
		};
	};

	let { data }: { data: PageData } = $props();
	let posts = $derived((data.posts ?? []) as NewsLetter[]);
	const title = 'Bodha Newsletter | Bodha';
	const metaDescription = 'Bodha Newsletter is a monthly release bringing together the many strands of work unfolding at Bodha.';
	const metaUrl = absoluteUrl('/newsletter');
	const metaImage = absoluteImage('/images/bodhacover.png');
	const jsonld = $derived(
		stringifyJsonLd(
			collectionPageJsonLd({
				name: title,
				description: metaDescription,
				url: metaUrl,
				image: metaImage,
				items: posts.map((post) => ({
					name: post.meta.title ?? 'Bodha Newsletter',
					url: post.linkpath,
					description: post.meta.date
				}))
			})
		)
	);
</script>

<Head {title} {metaDescription} {metaImage} {metaUrl} {jsonld} />

<Container>
	<section class="box wrapper-std rgap32 header-margin">
		<Crumb showT={true} title="Bodha Newsletter" showD={true} desc="Bodha Newsletter is a monthly release bringing together the many strands of work unfolding at Bodha." />
		<div class="grid lg:grid-cols-2 rgap16 cgap64 borderbot pbot32">
			<div class="box rgap16">
				<p class="highlight-text">Our monthly newsletter brings together the many strands of work unfolding at Bodha - longform essays, research notes, updates from ongoing projects, new publications, cultural reflections, and creative experiments in storytelling.</p>
				<p class="highlight-text">To receive the monthly newsletters in your email inbox, please <a href="/members" class="linked">subscribe.</a></p>
			</div>
			<p class="highlight-text">Bodha’s work is expanding across research, writing, publishing, design, archives, and public education. Rather than letting these efforts remain scattered across different platforms, this newsletter will serve as a regular monthly record of what we are thinking, building, publishing, and preparing.</p>
		</div>
		<div class="grid grid-cols-1 lg:grid-cols-3 gap16">
			{#each posts as item}
				<a class="box blank b-main whitestone" href={item.linkpath}>
					<div class="p8"><img class="fitted landscape" src={item.meta.image} alt={item.meta.title}/></div>
					<div class="box rgap16 std-pad ybottom">
							<p class="txt-2xl w600 a-hover">{item.meta.title}</p>
							<p class="grey1">{item.meta.description}</p>
					</div>
				</a>
			{/each}
		</div>
	</section>
</Container>
