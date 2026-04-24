<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte'
	import { selectedOpenLibrary } from '$lib/utils/supabaseClient';
	import Container from '$lib/comps/container.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte'
	import Title from '$lib/comps/page-title.svelte'
	import Head from '$lib/comps/headcomponent.svelte';


	export let data;
	let relatedBooks:any
	let sizing = 'medium'

	function setSizing(index:string) {
		sizing = index
	}

	const shelfMap: Record<string, { label: string; href: string }> = {
		essentials: { label: 'Essentials', href: '/library/essentials' },
		'aryan-issue': { label: 'Aryan Issue', href: '/library/aryan-issue' },
		darshana: { label: 'Darshanas', href: '/library/darshana' },
		iks: { label: 'Indian Knowledge Systems', href: '/library/iks' },
		scriptural: { label: 'Scriptural', href: '/library/scriptural' },
		shatrubodha: { label: 'Shatrubodha', href: '/library/shatrubodha' },
		svayambodha: { label: 'Svayambodha', href: '/library/svayambodha' }
	};

	const title = data.name
	const metaDescription = data.summary
	const metaUrl = 'https://www.bodharesearch.in' + page.url.pathname
	const metaImage = 'https://www.bodharesearch.in/images/key-bol.webp'

	onMount(() => {
		(async() => {
			relatedBooks = await selectedOpenLibrary(data.type)
		})();
	})
</script>

<Head {title} {metaDescription} {metaImage} {metaUrl}/>

<Container narrow={true} scaled={true}>
<div class="stdbox padded-ontop">
	<Crumb centered={true} item1="Library" item1Link="/library" show2={true} item2={data.type} showT={true} title={data.name} showD={true} desc="{data.author} | {data.summary}" showRow={true}>
			<div class="row cgap8 rgap8 mwrap">
				{#each data.tags as tag}
					<a class="tag-pill themed tt-u" href="/concepts/{tag}">{tag.replaceAll('-',' ')}</a>
				{/each}
			</div>
	</Crumb>
	<div class="box std reader {sizing}">
		<div class="box textbox xcenter ta-c mleft sizing-tray">
			<p class="citation-big grey">Set Reader Size</p>
		<div class="row cgap8 rgap8 xcenter">
			<button class="nav-btn" class:active={sizing === 'large'} on:click={() => setSizing('large')}>
				Large
			</button>
			<button class="nav-btn" class:active={sizing === 'medium'} on:click={() => setSizing('medium')}>
				Medium
			</button>
			<button class="nav-btn" class:active={sizing === 'compact'} on:click={() => setSizing('compact')}>
				Compact
			</button>
		</div>
		</div>
		<iframe loading="lazy" title={data.name} src={data.linkreal} allow="autoplay"></iframe>
	</div>
</div>
{#if relatedBooks && relatedBooks.length > 0}
	<div class="stdbox padded bordertop">
		<Title text="Related Books"/>
		<div class="grid four white-grid stay2">
			{#each relatedBooks as item, i}
				<a class="blank labelbox card-padded whitestone" href={item.linkfinal2}>
					<p class="w500 tight">{item.name}</p>
					<p class="small-text grey tight">{item.short}</p>
				</a>
			{/each}
		</div>
	</div>
{/if}
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
	background: var(--stone)
	align-items: center
	border: var(--stroke-subtle)
	padding: 2rem
	iframe
		display: block
		border-radius: 5px
		border: 1px solid #e2e8f0
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05)
	@media screen and (min-width: 1025px)
		&.medium
			iframe
				width: 700px
				height: 72vh
				min-height: 620px
		&.large
			iframe
				width: 900px
				height: 90vh
		&.compact
			iframe
				width: 560px
				height: 70vh
	@media screen and (max-width: 1024px)
		padding: 1rem
		iframe
			width: 100%
		&.medium, &.large, &.compact
			iframe
				height: 68vh

.sizing-tray
	@media screen and (max-width: 1024px)
		display: none

</style>
