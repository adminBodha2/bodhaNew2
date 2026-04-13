<script lang="ts">

	import tagData from '$lib/serving/tag-index.json';
	import Container from '$lib/comps/container.svelte'
	import Crumb from '$lib/comps/breadcrumb.svelte'
	import Head from '$lib/comps/headcomponent.svelte'

	type TagName = keyof typeof tagData;
	const tags = Object.keys(tagData) as TagName[];

</script>

<Head title="All Tags at Bodha" metaDescription="The best way to explore all content, learning, and discovery at Bodha." metaUrl="www.bodharesearch.in/tags" metaImage="/images/bodhacover.png"/>

<Container narrow={true}>
	<div class="box-t">
		<div class="column borderbot pbot32">
			<Crumb item1="TAGS" item1Link="/tags"/>
			<h2 class="source-serif tight">All Tags at Bodha</h2>
			<p class="grey sm">Use tags to discover and explore all content at our website - blog articles, learning paths, books, and more.</p>
		</div>
		<div class="row wrap rgap8 cgap8">
			{#each tags as tag}
				<a class="ftnbtn" href="/tags/{tag}">{tag.replaceAll('-', ' ')}</a>
			{/each}
		</div>
	</div>
</Container>
