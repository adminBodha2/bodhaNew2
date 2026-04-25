<script lang="ts">

	import { page } from '$app/state';
	import '$lib/styles/lab.sass';
	import Container from '$lib/comps/container.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import { absoluteImage, absoluteUrl, articleJsonLd, stringifyJsonLd } from '$lib/utils/seo';

	let { data } = $props();
	let sY = $state(0);
	let imageY = $derived(-(sY / 4));

	let title = $derived(data.title + ' | Big Questions at Bodha');
	let metaDescription = $derived(data.description);
	let metaUrl = $derived(absoluteUrl(page.url.pathname));
	let metaImage = $derived(absoluteImage(data.icon));

	let jsonld = $derived(
		stringifyJsonLd(
			articleJsonLd({
				headline: data.title,
				description: data.description,
				image: metaImage,
				url: metaUrl
			})
		)
	);

</script>

<svelte:window bind:scrollY={sY} />

<Head {title} {metaDescription} {metaUrl} {metaImage} ogType="article" {jsonld} imWidth="1024" imHeight="683" />

<Container narrow={true} scaled={true}>
	<section class="stdbox padded-ontop">
		<Crumb rgap={16} item1="Big Questions" item1Link="/big-questions" showT={true} title={data.title} showD={true} desc={data.description} showRow={true}>
			{#if data.tags?.length}
				<div class="row wrap cgap8 rgap8 ycenter">
					{#each data.tags as tag}
						<a class="tag-pill tt-u" href="/concepts/{tag}">{tag.replaceAll('-', ' ')}</a>
					{/each}
				</div>
			{/if}
		</Crumb>
		<section class="key-image">
			<img src={data.icon} alt={data.title} style:transform={`translateY(${imageY}px)`} />
		</section>
		<section class="content-section">
			<div class="classic-document">
				<img class="icon" src={data.image} alt={data.title} />
				<data.content />
				{#if data.concepts.length}
					  <div class="grid three tight">
    {#each data.concepts as concept (concept.id)}
      <p>
        <a href={`/concepts/${concept.slug}`}>
          {concept.title}
        </a>
      </p>
    {/each}
  </div>
				{/if}
			</div>
			<div class="box sidebar">
				{#if data.questions?.length > 0}
					<div class="projects">
						{#each data.questions as item}
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

<style lang="sass">

img.icon
	object-fit: cover
	height: 56px
	width: 56px
	background: none
	padding: 0
	border: none

</style>
