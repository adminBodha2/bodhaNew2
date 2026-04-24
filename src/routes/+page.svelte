<script lang="ts">
	import { onMount } from 'svelte';
	import Container from '$lib/comps/container.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import BlogCard from '$lib/comps/blogcard.svelte';
	import Parallax from '$lib/comps/parallaxfull.svelte'
	import Youtuber from '$lib/comps/youtuber.svelte';
	import Title from '$lib/comps/page-title.svelte'
	import { limitBlog } from '$lib/utils/localpulls';
	import { sixVideos } from '$lib/utils/supabaseClient';
	import { gateways, verticals, publications } from '$lib/utils/localsends'

	let vids = $state<any[]>([])
	let blogs = $state<any[]>([])

	const title = 'Bodha - Cultural Think Tank'
	const metaDescription = 'Bodha is a think tank and research group focused on contemporary issues of cultural concern, to inform core areas of policy with wisdom derived from Hindu traditions.'
	const metaUrl = 'https://www.bodharesearch.in'
	const metaImage = 'https://www.bodharesearch.in/images/bodhacover.png'

	const jsonld = JSON.stringify([
		{
			'@context': 'https://schema.org',
			'@type': 'Organization',
			name: 'Bodha',
			url: 'https://www.bodharesearch.in',
			logo: 'https://www.bodharesearch.in/images/bodhacover.png',
			sameAs: [
				'https://x.com/BodhaResearch',
				'https://www.instagram.com/bodharesearch',
				'https://www.linkedin.com/company/bodha-research/'
			]
		},
		{
			'@context': 'https://schema.org',
			'@type': 'WebSite',
			name: 'Bodha',
			url: 'https://www.bodharesearch.in'
		}
	]);

	onMount(async () => {
		vids = await sixVideos();
		blogs = await limitBlog();
	});
</script>

<Head
	{title} {metaDescription} {metaImage} {metaUrl} {jsonld}
/>

<Parallax imageLink="/images/heroimage2.webp" isClass="is100"/>

<Container narrow={true} scaled={true}>

<div class="stdbox padded ycenter" id="first">
	<div class="home-panel column">
		<div class="grid two softleft ybottom tightrows">
			<div class="box textbox">
				<h1 class="source-serif"><span class="blue">Bodha</span> is a think tank and research group,</h1>
			</div>
			<div class="box labelbox">
				<p class="altprim highlight-text">Studying contemporary issues of cultural concern, to inform policy, education, and public thought with wisdom drawn from Hindu traditions. We research, teach, publish, and build experiences that thicken the Hindu renaissance.</p>
			</div>
		</div>
		<div class="grid four tight">
			{#each gateways as item}
			<a class="box blank labelbox card-padded" href={item.href}>
				<div class="theme-line"></div>
				<p class="tag-text w500 lgrey tt-u">{item.kicker}</p>
				<h2 class="card-title source-serif">{item.title}</h2>
				<p class="small-text grey">{item.desc}</p>
			</a>
			{/each}
		</div>
	</div>
</div>

<div class="stdbox padded bordertop" id="bodha verticals">
	<Title text="verticals"/>
	<div class="grid four tight">
		{#each verticals as item}
		<a class="elembox blank verticals" href={item.href}>
			<div class="imgbox"><img src={item.image} alt={item.title} /></div>
			<div class="labelbox">
				<div class="theme-line"></div>
				<p class="tag-text lgrey tt-u">{item.kicker}</p>
				<h2 class="card-title source-serif">{item.title}</h2>
				<p class="small-text grey">{item.desc}</p>
			</div>
		</a>
		{/each}
	</div>
</div>

{#if blogs.length > 0}
<div class="stdbox padded bordertop" id="blog posts">
	<div class="row xbetween ycenter rgap16">
		<Title text="essays and articles"/>
		<a class="small-button row ycenter cgap4" href="/blog">See All <div class="button-text">→</div></a>
	</div>
	<div class="white-grid grid three blog-grid">
		{#each blogs as item, i}
		<BlogCard
			title={item.meta.title}
			link={item.linkpath}
			image={item.meta.image}
			excerpt={item.meta.excerpt}
			author={item.meta.author}
			date={item.formattedDate}
			words={item.meta.words}
			numbering = "slate"
		>
			{#each item.meta.tags as tag}
			<a class="tag-pill themed tt-u" href="/blog/tags/{tag}">{tag.replaceAll('-', ' ')}</a>
			{/each}
		</BlogCard>
		{/each}
	</div>
</div>
{/if}

<div class="stdbox padded bordertop" id="publications">
	<Title text="publications"/>
	<div class="grid two tight">
		{#each publications as pub}
		<div class="books">
			<img class="publication-image" src={pub.image} alt={pub.title} />
			<div class="box labelbox">
				<p class="card-title source-serif">{pub.title}</p>
				<p class="small-text grey">{pub.desc}</p>
				<div class="row mwrap cgap16 rgap8 ptop8">
					{#each pub.links as link}
					<a class="small-button row ycenter cgap8" href={link.href} target="_blank" rel="noreferrer">{link.label} <div class="button-text">→</div></a>
					{/each}
				</div>
			</div>
		</div>
		{/each}
	</div>
</div>

{#if vids.length > 0}
<div class="stdbox padded bordertop">
	<div class="row xbetween ycenter rgap16">
		<Title text="recent videos"/>
		<a class="small-button row ycenter cgap8" href="/videos">See All <div class="button-text">→</div></a>
	</div>
	<div class="standard-grid grid three video-grid">
		{#each vids as item, i}
		<a class="video-card blank number" href={item.link} target="_blank" rel="noreferrer">
			<Youtuber youTubeId={item.videoid} />
			<div class="box video-footer rgap8">
				<p class="w500 tight">{item.name}</p>
				<div class="theme-line"></div>
				<p class="citation lgrey tt-u">{item.channel}</p>
			</div>
		</a>
		{/each}
	</div>
</div>
{/if}

</Container>

<style lang="sass">

#first
	min-height: 100vh

.home-panel
	row-gap: 3rem
	border-radius: 4px
	@media screen and (max-width: 1024px)
		padding: 0
		row-gap: 2rem

// ── GATEWAY CARDS ─────────────────────────────────────────

.card-padded
	border: var(--border-dark)
	border-radius: 4px
	transition: var(--transition1)
	&:hover
		box-shadow: var(--shadow1)
		background: var(--color-stone)
		.theme-line
			transform: scaleX(1.5)

.theme-line
	height: 2px
	width: 32px
	background: var(--theme)
	transition: all 0.14s ease
	transform-origin: left center

// ── VERTICALS ─────────────────────────────────────────────

.verticals
	overflow: hidden
	border: var(--border-dark)
	transition: var(--transition1)
	border-radius: 4px
	&:hover
		box-shadow: var(--shadow1)
		background: var(--color-stone)
		.theme-line
			transform: scaleX(1.5)
		img
			transform: scale(1.05)
	img
		width: 100%
		height: 100%
		object-fit: cover
		transition: all 500ms cubic-bezier(0.745, 0.150, 0.690, 0.470)
	.labelbox
		padding: 0 1.5rem 1.5rem 1.5rem
	.imgbox
		height: 200px
		overflow: hidden
	@media screen and (max-width: 1024px)
		.labelbox
			padding: 0 1rem 1.5rem 1rem

.blog-grid
	border-radius: 4px


// ── PUBLICATIONS ──────────────────────────────────────────

.books
	display: flex
	flex-direction: column
	gap: 1.25rem
	padding: 1rem
	border: 1px solid rgba(0,0,0,0.06)
	border-radius: 4px
	background: var(--stone)
	@media screen and (min-width: 1025px)
		display: grid
		grid-template-columns: 160px 1fr
		align-items: start

.publication-image
	object-fit: cover
	border-radius: 4px
	display: block
	@media screen and (min-width: 1025px)
		height: 256px
		width: 100%
	@media screen and (max-width: 1024px)
		height: 200px
		margin-right: auto


// ── VIDEOS ────────────────────────────────────────────────

.video-grid
	border-radius: 4px

.video-card
	overflow: hidden
	background: #FFFFFF
	transition: transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease
	&:hover
		transform: translateY(-2px)
		.theme-line
			transform: scaleX(1.5)

.video-footer
	padding: 1.1rem 1.2rem
	border-top: 1px solid rgba(0,0,0,0.05)

</style>
