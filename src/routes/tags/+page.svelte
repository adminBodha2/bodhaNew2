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
	<div class="box std padded-ontop">
		<Crumb item1="Bodha" item1Link="/" showT={true} title="Tags" desc="The best way to explore all content, learning, and discovery at Bodha." showD={true}/>
		<div class="row wrap rgap8 cgap8">
			{#each tags as tag}
				<a class="tag-item blank tt-u" href="/tags/{tag}">{tag.replaceAll('-', ' ')}</a>
			{/each}
		</div>
	</div>
</Container>

<style lang="sass">

.tag-item
	font-size: 0.8rem
	font-weight: 500
	color: #555
	padding: 6px 14px
	border-radius: 100px
	border: 1px solid rgba(0,0,0,0.1)
	background: #FFFFFF
	transition: all 0.12s ease
	&:hover
		border-color: var(--theme)
		color: var(--theme)
		background: #F9F8F6

</style>
