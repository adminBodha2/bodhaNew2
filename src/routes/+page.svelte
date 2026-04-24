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

<div class="stdbox padded ycenter" id="first">
	<div class="home-panel column">
		<div class="grid two softleft ybottom tightrows">
			<div class="box textbox">
				<h1 class="source-serif"><span class="blue">Bodha</span> is a think tank and research group,</h1>
			</div>
			<p class="altprim highlight-text">Studying contemporary issues of cultural concern, to inform policy, education, and public thought with wisdom drawn from Hindu traditions. We research, teach, publish, and build experiences that thicken the Hindu renaissance.</p>
		</div>
		<div class="grid four stay2 tight">
			{#each gateways as item}
			<a class="box blank labelbox card-padded" href={item.href}>
				<div class="theme-line"></div>
				<p class="tag-text w500 lgrey tt-u">{item.kicker}</p>
				<h2 class="card-title">{item.title}</h2>
				<p class="small-text grey">{item.desc}</p>
			</a>
			{/each}
		</div>
	</div>
</div>

<div class="stdbox padded bordertop">
	<Title text="verticals"/>
	<div class="grid two tight stay2">
		{#each verticals as item}
		<a class="elembox blank verticals" href={item.href}>
			<div class="imgbox"><img src={item.image} alt={item.title} /></div>
			<div class="labelbox">
				<div class="theme-line"></div>
				<p class="tag-text lgrey tt-u">{item.kicker}</p>
				<h2 class="card-title">{item.title}</h2>
				<p class="small-text grey">{item.desc}</p>
			</div>
		</a>
		{/each}
	</div>
</div>

{#if blogs.length > 0}
<div class="stdbox padded bordertop">
	<div class="row xbetween ycenter rgap16">
		<Title text="essays and articles"/>
		<a class="small-button row ycenter cgap4" href="/blog">See All <div class="button-text">→</div></a>
	</div>
	<div class="standard-grid grid three blog-grid">
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
			<a class="tag-pill themed tt-u" href="/tags/{tag}">{tag.replaceAll('-', ' ')}</a>
			{/each}
		</BlogCard>
		{/each}
	</div>
	<a class="linked" href="/blog"><p class="inherit">Read More →</p></a>
</div>
{/if}

<div class="stdbox padded bordertop">
	<Title text="publications"/>
	<div class="grid two tight">
		{#each publications as pub}
		<div class="books">
			<img class="publication-image" src={pub.image} alt={pub.title} />
			<div class="box labelbox">
				<h2 class="card-title">{pub.title}</h2>
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

// ── HERO ──────────────────────────────────────────────────

#first
	min-height: 100vh

.home-panel
	background: var(--stone)
	border: var(--border-dark)
	row-gap: 3rem
	padding: 4rem
	border-radius: 4px
	@media screen and (max-width: 1024px)
		padding: 1rem
		row-gap: 2rem

// ── GATEWAY CARDS ─────────────────────────────────────────

.card-padded
	background: #FFFFFF
	border: var(--border-main)
	border-radius: 4px
	transition: all 500ms cubic-bezier(0.000, 1.145, 0.905, 0.970)
	&:hover
		border: var(--border-dark)
		box-shadow: var(--shadow-1)
		.theme-line
			transform: scaleX(1.5)

.theme-line
	height: 2px
	width: 32px
	background: var(--theme)
	transition: all 0.14s ease
	transform-origin: left center

// ── SECTION STRUCTURE ─────────────────────────────────────

// ── VERTICALS ─────────────────────────────────────────────

.verticals
	overflow: hidden
	border: var(--border-main)
	background: var(--color-alt-4)
	transition: all 200ms cubic-bezier(0.000, 1.145, 0.905, 0.970)
	border-radius: 4px
	&:hover
		transform: translateY(-2px)
		border-color: rgba(0,0,0,0.1)
		box-shadow: 0 8px 24px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.03)
		background: var(--color-back)
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
		padding: 0 2rem 2rem 2rem
	.imgbox
		height: 320px
		overflow: hidden
	@media screen and (max-width: 1024px)
		.imgbox
			height: 200px
		.labelbox
			padding: 0 1rem 1.5rem 1rem

.blog-grid
	border-radius: 4px


// ── PUBLICATIONS ──────────────────────────────────────────

.books
	display: flex
	flex-direction: column
	gap: 1.25rem
	padding: 1.5rem
	border: 1px solid rgba(0,0,0,0.06)
	border-radius: 4px
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
