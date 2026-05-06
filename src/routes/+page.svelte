<script lang="ts">
	import type { PageData } from './$types';
	import { DEFAULT_IMAGE, SITE_URL, organizationJsonLd, stringifyJsonLd, websiteJsonLd } from '$lib/utils/seo';
	import Container from '$lib/comps/wrapper.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Parallax from '$lib/comps/parallaxfull.svelte';
	import Title from '$lib/comps/page-title.svelte';
	import { verticals, publications } from '$lib/utils/localsends';
	import VideoPlayer from '$lib/comps/custom-video-player.svelte';
	import Slider from '$lib/svelteanim/components/Slide.svelte';
	import { useInView } from '$lib/svelteanim/utils/useInView.svelte';

	let { data }: { data: PageData } = $props();

	let blogs = $derived(data.blogs ?? []);
	let vids = $derived(data.vids ?? []);
	let latestItems = $derived(data.latestItems ?? []);
	let section = $state<HTMLElement | null>(null);
	let sectionTwo = $state<HTMLElement | null>(null);
	let sectionThree = $state<HTMLElement | null>(null);
	let sectionFour = $state<HTMLElement | null>(null);
	let sectionFive = $state<HTMLElement | null>(null);
	let sectionSix = $state<HTMLElement | null>(null);
	const verticalsInView = useInView(() => section, { threshold: 0.1, once: true });
	const secondInView = useInView(() => sectionTwo, { threshold: 0.1, once: true });
	const thirdInView = useInView(() => sectionThree, { threshold: 0.1, once: true });
	const fourthInView = useInView(() => sectionFour, { threshold: 0.1, once: true });
	const fifthInView = useInView(() => sectionFive, { threshold: 0.1, once: true });
	const sixthInView = useInView(() => sectionSix, { threshold: 0.1, once: true });

	const title = 'Bodha - Cultural Think Tank';
	const metaDescription = 'Bodha is a think tank and research group focused on contemporary issues of cultural concern, to inform core areas of policy with wisdom derived from Hindu traditions.';
	const metaUrl = SITE_URL;
	const metaImage = DEFAULT_IMAGE;

	const jsonld = stringifyJsonLd([organizationJsonLd(), websiteJsonLd()]);
</script>

<Head {title} {metaDescription} {metaImage} {metaUrl} {jsonld} />

<Parallax imageLink="/images/heroimage2.webp" isClass="is100" />

<Container>
	<div class="box-std rgap-std ycenter" id="first">
		<div class="box rgap-std">
			<h1 class="source-serif width60"><span class="blue">Bodha</span> is a think tank and research group,</h1>
			<p class="paragraph-text loose width80" style="font-weight: 400">Studying contemporary issues of cultural concern, to inform policy, education, and public thought with wisdom drawn from Hindu traditions. We research, teach, publish, and build experiences that thicken the Hindu renaissance.</p>
		</div>
		<div class="g-grid g-4" bind:this={section}>
			{#each verticals as item, i}
				<Slider visible={verticalsInView.visible} direction="down" outDirection="up" distance={200} duration={1000} delay={i * 200}>
					<a class="box rgap-sm blank verticals glass-1" href={item.href}>
						<div class="imgbox padded-1 no-bot"><img class="fit flip" src={item.image} alt={item.title} /></div>
						<div class="box rgap-sm padded-2 no-top">
							<h2 class="card-title source-serif ptop8">{item.title}</h2>
							<p class="descriptor-text grey">{item.desc}</p>
						</div>
					</a>
				</Slider>
			{/each}
		</div>
	</div>

	<!--------latest---------------------------------------------------------------------->
	{#if latestItems}
		<div class="box-std rgap-std bordertop" id="latest" bind:this={sectionTwo}>
			<Title text="Latest at Bodha" />
			<div class="g-grid">
				{#each latestItems as item, i}
					<Slider visible={secondInView.visible} direction="down" outDirection="up" distance={200} duration={1000} delay={i * 100}>
						<a class="box rgap-sm blank glass-3 padded-2" href={item.link}>
							<p class="card-title tight a-hover">{item.title}</p>
							<p class="descriptor-text grey">{item.description}</p>
							<p class="tag-pill tt-u self-bottom">{item.badge}</p>
						</a>
					</Slider>
				{/each}
			</div>
		</div>
	{/if}

	<!------------blog articles------------------------------------------------------------>
	{#if blogs.length > 0}
		<div class="box-std rgap-std bordertop sideline" id="blog posts" bind:this={sectionThree}>
			<div class="row xbetween ycenter rgap16 mcol mleft">
				<Title text="essays and articles" />
				<a class="small-button themed" href="/blog">See All</a>
			</div>
			<div class="g-grid g-3">
				{#each blogs as item, i}
					<Slider visible={thirdInView.visible} direction="down" outDirection="up" distance={200} duration={1000} delay={i * 250}>
						<div class="post-card box glass-2 padded-1">
							<div class="row cgap4 rgap4 ycenter padded-1">
								{#if item.meta.tags && item.meta.tags.length > 0}
									{#each item.meta.tags as tag}
										<a class="tag-pill tt-u blank" href="/concepts/{tag}">{tag.replaceAll('-', ' ')}</a>
									{/each}
								{/if}
							</div>
							<a class="blank" href={item.linkpath}>
								<img class="fit" src={item.meta.image} alt={item.meta.title} />
							</a>
							<a class="blank box rgap-sm padded-1" href={item.linkpath}>
								<p class="card-title tight">{item.meta.title}</p>
								<p class="descriptor-text grey">{item.meta.excerpt}</p>
							</a>
							<div class="self-bottom padded-1">
								<p class="tag-text altprim tt-u w500">{item.formattedDate} | {item.meta.author} | {item.meta.words} words</p>
							</div>
						</div>
					</Slider>
				{/each}
			</div>
		</div>
	{/if}

	<!------------publications------------------------------------------------------------>
	<div class="box-std rgap-std bordertop" id="publications" bind:this={sectionFour}>
		<Title text="publications" />
		<div class="g-grid g-2">
			{#each publications as pub, i}
				<Slider visible={fourthInView.visible} direction="down" outDirection="up" distance={200} duration={1000} delay={i * 100}>
					<div class="books">
						<img class="portrait book" src={pub.image} alt={pub.title} />
						<div class="padded-2 no-mob rgap-sm column ycenter height100">
							<p class="card-title">{pub.title}</p>
							<p class="descriptor-text grey">{pub.desc}</p>
							<div class="row wrap cgap8 rgap8 ptop8">
								{#each pub.links as link}
									<a class="small-button row ycenter cgap8" href={link.href} target="_blank" rel="noreferrer"
										>{link.label}
										<div class="button-text">→</div></a>
								{/each}
							</div>
						</div>
					</div>
				</Slider>
			{/each}
		</div>
	</div>

	<!-----------videos------------------------------------------------------------>
	{#if vids.length > 0}
		<div class="stdbox stdpad bordertop" bind:this={sectionFive}>
			<div class="row xbetween ycenter rgap16 mcol mleft">
				<Title text="recent videos" />
				<a class="small-button themed" href="/videos">All Videos</a>
			</div>
			<div class="g-grid g-3 gap-1p video-grid">
				{#each vids as item, i}
					<Slider visible={fifthInView.visible} direction="down" outDirection="up" distance={200} duration={1000} delay={i * 100}>
						<div class="video-card blank">
							<VideoPlayer videoId={item.videoid} title={item.name} loop />
							<a class="box video-footer rgap8" href={item.link} target="_blank" rel="noreferrer">
								<p class="w500 tight">{item.name}</p>
								<div class="theme-line"></div>
								<p class="tag-text lgrey tt-u">{item.channel}</p>
							</a>
						</div>
					</Slider>
				{/each}
			</div>
		</div>
	{/if}
</Container>

<style lang="sass">

//introduction-area────────────────────────────────────

#first
	min-height: 100vh

//verticals──────────────────────────────────────

.verticals
	border-radius: 4px
	position: relative
	&:hover
		img
			filter: saturate(1)
		&::after
			width: 100%
			left: 0
	img
		transition: all 120ms cubic-bezier(0.745, 0.150, 0.690, 0.470)
		filter: saturate(0.25)
	&::after
		position: absolute
		right: 0
		bottom: -1px
		content: " "
		width: 0
		height: 2px
		background: var(--color-theme)
		transition: width 200ms ease

// ── GATEWAY CARDS ─────────────────────────────────────────

.theme-line
	height: 2px
	width: 32px
	background: var(--color-theme)
	transition: all 0.14s ease
	transform-origin: left center

// ── PUBLICATIONS ──────────────────────────────────────────

.books
	display: flex
	flex-direction: column
	@media screen and (min-width: 1025px)
		display: grid
		grid-template-columns: 160px 1fr


// ── VIDEOS ────────────────────────────────────────────────

.video-card
	overflow: hidden
	background: var(--color-back)
	transition: border-color 0.15s ease, box-shadow 0.15s ease
	&:hover
		background: var(--color-stone)
		.theme-line
			transform: scaleX(1.5)

.video-footer
	padding: 0.5rem
	@media screen and (min-width: 1025px)
		padding: 1rem

</style>
