<script lang="ts">
	import { onMount } from 'svelte'
	import { page } from '$app/state';
	import { allQuestions } from '$lib/utils/localpulls';
	import '$lib/styles/lab.sass'
	import Container from '$lib/comps/container.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte'
	import Head from '$lib/comps/headcomponent.svelte';
	let sY: number;
	export let data;
	let questions: any;

	const jsonld = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: data.title,
		description: data.description,
		image: data.icon,
		publisher: { '@type': 'Organization', name: 'Bodha Research', url: 'https://www.bodharesearch.in' },
		url: 'https://www.bodharesearch.in' + page.url.pathname,
	});

	onMount(async () => {
		questions = await allQuestions();
	});
</script>

<svelte:window bind:scrollY={sY} />

<Head
	title={data.title}
	metaDescription={data.description}
	metaImage={data.icon}
	metaUrl={'https://www.bodharesearch.in' + page.url.pathname}
	{jsonld}
/>

<Container narrow={true} scaled={true}>
<section class="stdbox padded-ontop">
	<Crumb rgap={16} item1="Big Questions" item1Link="/big-questions" showT={true} title={data.title} showD={true} desc={data.description} showRow={true}>
		{#if data.tags?.length}
		<div class="row wrap cgap8 rgap8 ycenter">
			{#each data.tags as tag}
			<a class="tag-pill tt-u" href="/tags/{tag}">{tag.replaceAll('-', ' ')}</a>
			{/each}
		</div>
		{/if}
	</Crumb>
	<section class="key-image">
		<img src={data.icon} alt={data.title} style="transform: translateY(-{sY/4}px)"/>
	</section>
	<section class="content-section">
		<div class="classic-document">
		<data.content />
		</div>
		<div class="box sidebar">
			{#if questions && questions.length > 0}
				<div class="projects">
					{#each questions as item}
						<a class="blank project-link" href={item.linkpath}>
							<p class="rem1 grey">{item.meta.title}</p>
						</a>
					{/each}
				</div>
			{/if}
		</div>
	</section>
</section>
</Container>