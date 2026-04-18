<script lang="ts">
	import { onMount } from 'svelte';
	import Container from '$lib/comps/container.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import BlogCard from '$lib/comps/blogcard.svelte';
	import Parallax from '$lib/comps/parallaxfull.svelte'
	import Youtuber from '$lib/comps/youtuber.svelte';
	import Title from '$lib/comps/page-title.svelte'
	import { metaTitle, metaDescription, metaUrl, metaImage } from '$lib/utils/metastores';
	import { limitBlog } from '$lib/utils/localpulls';
	import { sixVideos } from '$lib/utils/supabaseClient';

	let vids: any[] = [];
	let blogs: any[] = [];

	$metaTitle = 'Bodha';
	$metaDescription =
		'Bodha is a think tank and research group focused on contemporary issues of cultural concern, to inform core areas of policy with wisdom derived from Hindu traditions.';
	$metaUrl = 'https://www.bodharesearch.in';
	$metaImage = '/images/bodhacover.png';

	const jsonld = JSON.stringify([
		{
			'@context': 'https://schema.org',
			'@type': 'Organization',
			name: 'Bodha Research',
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
			name: 'Bodha Research',
			url: 'https://www.bodharesearch.in'
		}
	]);

	const gateways = [
		{
			title: 'Research',
			href: '/research',
			kicker: 'Fieldwork',
			desc: 'Institutional design, policy, strategic affairs, and deep cultural inquiry.'
		},
		{
			title: 'Big Questions',
			href: '/big-questions',
			kicker: 'Inquiry',
			desc: 'The major civilisational questions we think deserve sharp, sustained attention.'
		},
		{
			title: 'Academy',
			href: '/academy',
			kicker: 'Learning',
			desc: 'Courses, training, and the long work of building scholars and frameworks.'
		},
		{
			title: 'Open Library',
			href: '/library',
			kicker: 'Reading',
			desc: 'Books, curated shelves, and reading paths across Hindu thought and civilisational study.'
		}
	];

	const verticals = [
		{
			title: 'Research',
			href: '/research',
			image: '/images/key-research.webp',
			desc: 'Focused field research on institutions, policy, culture, and the lived structure of Hindu civilization.',
			kicker: 'research'
		},
		{
			title: 'Bodha Anveshi',
			href: '/anveshi',
			image: '/images/key-anveshi.webp',
			desc: 'Immersive temple and kshetra journeys through places where civilizational memory still breathes.',
			kicker: 'culture'
		},
		{
			title: 'Academy',
			href: '/academy',
			image: '/images/key-academy.webp',
			desc: 'Training, transmission, and the patient cultivation of thinkers rooted in Indic methods.',
			kicker: 'learning'
		},
		{
			title: 'Big Questions',
			href: '/big-questions',
			image: '/images/key-bigquestions.webp',
			desc: 'Major questions that shape the contemporary Hindu condition and the path beyond confusion.',
			kicker: 'research'
		}
	];

	const publications = [
		{
			title: 'Svayambodha and Shatrubodha',
			image: '/images/book-ss.webp',
			desc: 'A framework for civilisational self-understanding and clarity about the threats Sanatana Dharma faces today.',
			links: [
				{ label: 'Hindu eShop', href: 'https://www.hindueshop.com/product/svayambodha-and-shatrubodha/' },
				{ label: 'Padhega India', href: 'https://padhegaindia.in/product/svayambodha-and-shatrubodha-hindu-view-of-self-and-the-world-hb/' },
				{ label: 'Amazon', href: 'https://amzn.in/d/hMAWoWD' }
			]
		},
		{
			title: 'Fractal Maṇḍala',
			image: '/images/book-fm.webp',
			desc: 'A fresh exploration of ancient India through civilisational memory, sacred history, and indigenous ways of preserving the past.',
			links: [
				{ label: 'Hindu eShop', href: 'https://www.hindueshop.com/product/fractal-mandala/' },
				{ label: 'Padhega India', href: 'https://padhegaindia.in/product/fractal-mandala-a-history-of-ancient-india/' },
				{ label: 'Amazon', href: 'https://amzn.in/d/5a526b5' }
			]
		}
	];

	onMount(async () => {
		vids = await sixVideos();
		blogs = await limitBlog();
	});
</script>

<Head
	title={$metaTitle}
	metaDescription={$metaDescription}
	metaUrl={$metaUrl}
	metaImage={$metaImage}
	{jsonld}
/>

<Parallax imageLink="/images/heroimage2.webp" isClass="is100"/>

<Container narrow={true} scaled={true}>

<div class="box std padded ycenter column" id="first">
	<div class="home-panel column">
		<div class="grid two ybottom tightrows">
			<div class="box textbox">
				<p class="eyebrow tt-u">Bodha Research</p>
				<h1 class="source-serif"><span class="blue">Bodha</span> is a think tank and research group,</h1>
			</div>
			<p class="grey">Studying contemporary issues of cultural concern, to inform policy, education, and public thought with wisdom drawn from Hindu traditions. We research, teach, publish, and build experiences that thicken the Hindu renaissance.</p>
		</div>
		<div class="grid four stay2 tightrows">
			{#each gateways as item}
			<a class="gateway-card blank" href={item.href}>
				<p class="citation lgrey tt-u">{item.kicker}</p>
				<h3 class="source-serif item-title">{item.title}</h3>
				<p class="small-text grey">{item.desc}</p>
			</a>
			{/each}
		</div>
	</div>
</div>

<div class="box std padded bordertop">
	<div class="section-head">
		<Title text="verticals"/>
	</div>
	<div class="grid two tight">
		{#each verticals as item}
		<a class="vertical-card blank" href={item.href}>
			<img src={item.image} alt={item.title} />
			<div class="vertical-body">
				<span class="vertical-accent"></span>
				<p class="citation lgrey tt-u">{item.kicker}</p>
				<h3 class="item-title source-serif">{item.title}</h3>
				<p class="small-text grey">{item.desc}</p>
			</div>
		</a>
		{/each}
	</div>
</div>

{#if blogs.length > 0}
<div class="box std padded bordertop">
	<div class="row mcol xbetween-mleft mleft ycenter rgap8">
		<Title text="essays and articles"/>
		<a class="section-link blank" href="/blog">See All</a>
	</div>
	<div class="standard-grid grid three">
		{#each blogs as item, i}
		<BlogCard
			title={item.meta.title}
			link={item.linkpath}
			image={item.meta.image}
			excerpt={item.meta.excerpt}
			author={item.meta.author}
			date={item.formattedDate}
			words={item.meta.words}
			numbering = "number"
		>
			{#each item.meta.tags as tag}
			<a class="tag-pill tt-u" href="/tags/{tag}">{tag.replaceAll('-', ' ')}</a>
			{/each}
		</BlogCard>
		{/each}
	</div>
</div>
{/if}

<div class="home-section">
	<div class="section-head">
		<Title text="publications"/>
	</div>
	<div class="grid two tight hover-grid">
		{#each publications as pub}
		<div class="publication-card">
			<img class="publication-image" src={pub.image} alt={pub.title} />
			<div class="box labelbox">
				<h3 class="blog-title source-serif">{pub.title}</h3>
				<p class="small-text grey">{pub.desc}</p>
				<div class="row mwrap cgap16 rgap8">
					{#each pub.links as link}
					<a class="publication-link blank" href={link.href} target="_blank" rel="noreferrer">{link.label} →</a>
					{/each}
				</div>
			</div>
		</div>
		{/each}
	</div>
</div>

{#if vids.length > 0}
<div class="home-section">
	<div class="row mcol xbetween-mleft mleft ycenter rgap8">
		<Title text="recent videos"/>
		<a class="section-link blank" href="/videos">See All Talks</a>
	</div>
	<div class="standard-grid grid four">
		{#each vids as item}
		<a class="video-card blank number" href={item.link} target="_blank" rel="noreferrer">
			<Youtuber youTubeId={item.videoid} />
			<div class="box video-footer rgap8">
				<p class="item-line tight">{item.name}</p>
				<span class="video-accent self-bottom"></span>
				<p class="citation lgrey tt-u">{item.channel}</p>
			</div>
		</a>
		{/each}
	</div>
</div>
{/if}

</Container>

<style lang="sass">

// ── HERO ──────────────────────────────────────────────────

#first
	min-height: 100vh

.home-panel
	background: #FFFFFF
	border: 1px solid rgba(0,0,0,0.07)
	border-radius: 16px
	row-gap: 4rem
	padding: 4rem
	box-shadow: 0 2px 8px rgba(0,0,0,0.03), 0 8px 24px rgba(0,0,0,0.04)
	@media screen and (max-width: 1024px)
		padding: 1.5rem
		row-gap: 2rem

// ── GATEWAY CARDS ─────────────────────────────────────────

.gateway-card
	display: flex
	flex-direction: column
	gap: 0.75rem
	padding: 1.4rem
	background: #F5F4F2
	border: 1px solid rgba(0,0,0,0.06)
	border-radius: 10px
	transition: background 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease
	&::before
		content: ''
		display: block
		width: 32px
		height: 2px
		background: #222
		border-radius: 1px
		transition: width 0.2s ease
	&:hover
		background: #EEEDEB
		border-color: rgba(0,0,0,0.1)
		box-shadow: 0 2px 8px rgba(0,0,0,0.05)
		&::before
			width: 48px

// ── SECTION STRUCTURE ─────────────────────────────────────

.home-section
	display: flex
	flex-direction: column
	gap: var(--gap-std)
	padding-top: var(--pad-std)
	padding-bottom: var(--pad-std)
	border-top: 1px solid var(--color-border)

// ── VERTICALS ─────────────────────────────────────────────

.vertical-card
	display: flex
	flex-direction: column
	border: 1px solid rgba(0,0,0,0.07)
	border-radius: 12px
	overflow: hidden
	background: #FFFFFF
	box-shadow: 0 1px 3px rgba(0,0,0,0.03)
	transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease
	padding: 1rem
	&:hover
		transform: translateY(-2px)
		border-color: rgba(0,0,0,0.1)
		box-shadow: 0 8px 24px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.03)
		.vertical-accent
			width: 48px
	img
		width: 100%
		height: 320px
		aspect-ratio: 16 / 9
		object-fit: cover
		display: block
		border-radius: 5px
		@media screen and (max-width: 1024px)
			height: 240px

.vertical-body
	display: flex
	flex-direction: column
	gap: 0.6rem
	padding: 1.25rem 1.4rem
	border-top: 1px solid rgba(0,0,0,0.05)

.vertical-accent
	display: block
	width: 28px
	height: 2px
	background: #222
	border-radius: 1px
	transition: width 0.2s ease
	margin-bottom: 0.2rem

.standard-grid
	@media screen and (max-width: 1024px)
		row-gap: 1rem

// ── PUBLICATIONS ──────────────────────────────────────────

.publication-card
	display: flex
	flex-direction: column
	gap: 1.25rem
	padding: 1.5rem
	border: 1px solid rgba(0,0,0,0.06)
	border-radius: 5px
	background: var(--stone)
	@media screen and (min-width: 1025px)
		display: grid
		grid-template-columns: 160px 1fr
		align-items: start

.publication-image
	object-fit: contain
	border-radius: 4px
	display: block
	@media screen and (min-width: 1025px)
		height: 220px
		width: 100%
	@media screen and (max-width: 1024px)
		height: 200px
		margin-right: auto

.publication-link
	font-size: 0.78rem
	font-weight: 500
	color: #555
	padding: 5px 12px
	border-radius: 100px
	border: 1px solid rgba(0,0,0,0.1)
	background: #F5F4F2
	transition: all 0.15s ease
	&:hover
		color: var(--theme)
		border-color: rgba(25,113,194,0.28)
		background: #FFFFFF

// ── VIDEOS ────────────────────────────────────────────────


.video-card
	overflow: hidden
	background: #FFFFFF
	transition: transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease
	&:hover
		transform: translateY(-2px)
		.video-title
			color: var(--themeaccent)
		.video-accent
			width: 48px

.video-footer
	padding: 1.1rem 1.2rem
	border-top: 1px solid rgba(0,0,0,0.05)

.video-accent
	display: block
	width: 28px
	height: 2px
	background: #222
	border-radius: 1px
	transition: width 0.2s ease

.video-title
	letter-spacing: -0.015em
	transition: color 0.15s ease

</style>
