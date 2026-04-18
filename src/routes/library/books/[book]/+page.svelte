<script lang="ts">
	import { page } from '$app/state';
	import Container from '$lib/comps/container.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte'
	import Head from '$lib/comps/headcomponent.svelte';

	export let data;

	const shelfMap: Record<string, { label: string; href: string }> = {
		essentials: { label: 'Essentials', href: '/library/essentials' },
		'aryan-issue': { label: 'Aryan Issue', href: '/library/aryan-issue' },
		darshana: { label: 'Darshanas', href: '/library/darshana' },
		iks: { label: 'Indian Knowledge Systems', href: '/library/iks' },
		scriptural: { label: 'Scriptural', href: '/library/scriptural' },
		shatrubodha: { label: 'Shatrubodha', href: '/library/shatrubodha' },
		svayambodha: { label: 'Svayambodha', href: '/library/svayambodha' }
	};

	const shelf = shelfMap[data.type];
</script>

<Head
	title={data.name}
	metaDescription={data.summary ?? `Read ${data.name} at Bodha Open Library.`}
	metaImage="/images/bodhacover.png"
	metaUrl={'https://www.bodharesearch.in' + page.url.pathname}
/>

<Container narrow={true} scaled={true}>
<div class="box std padded-ontop">
	<Crumb rgap={8} item1="Library" item1Link="/library" show2={true} item2={data.type} showT={true} title={data.name} showD={true} desc={data.summary} showRow={true}>
		<div class="box labelbox">
			<p class="small-text tt-u w500">{data.author}</p>
			<div class="row cgap8 rgap8 mwrap">
				{#each data.tags as tag}
<a class="tag-pill tt-u" href="/tags/{tag}">{tag}</a>
				{/each}
			</div>
		</div>
	</Crumb>
	<div class="box std reader">
		<iframe title={data.name} src={data.linkreal} allow="autoplay"></iframe>
	</div>
</div>
</Container>

<style lang="sass">

.sep
	margin: 0 4px
	color: #DDD

.hero-sub
	max-width: 64ch

.meta-row
	display: flex
	flex-wrap: wrap
	gap: 6px

.meta-pill
	font-size: 0.76rem
	color: #666
	padding: 4px 10px
	border-radius: 100px
	border: 1px solid rgba(0,0,0,0.08)
	background: #F9F8F6

.tags-row
	display: flex
	flex-wrap: wrap
	gap: 6px

.reader-head
	display: flex
	align-items: center
	justify-content: space-between
	gap: 1rem
	flex-wrap: wrap

.reader-link
	font-size: 0.8rem
	font-weight: 500
	color: var(--theme)
	transition: color 0.12s ease
	&:hover
		color: var(--themealt)

.reader
	background: #FFF
	iframe
		display: block
		width: 100%
		height: 72vh
		min-height: 620px
		border: 1px solid rgba(0,0,0,0.08)
		border-radius: 8px
		background: #FFFFFF
	@media screen and (max-width: 1024px)
		iframe
			height: 68vh
			min-height: 540px

</style>
