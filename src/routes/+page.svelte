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
	const verticalsInView = useInView(() => section, { threshold: 0.2, once: true });
	const secondInView = useInView(() => sectionTwo, { threshold: 0.5, once: true });
	const thirdInView = useInView(() => sectionThree, { threshold: 0.5, once: true });
	const fourthInView = useInView(() => sectionFour, { threshold: 0.5, once: true });
	const fifthInView = useInView(() => sectionFive, { threshold: 0.6, once: true });

	const title = 'Bodha - Cultural Think Tank';
	const metaDescription = 'Bodha is a think tank and research group focused on contemporary issues of cultural concern, to inform core areas of policy with wisdom derived from Hindu traditions.';
	const metaUrl = SITE_URL;
	const metaImage = DEFAULT_IMAGE;

	const jsonld = stringifyJsonLd([organizationJsonLd(), websiteJsonLd()]);
</script>

<Head {title} {metaDescription} {metaImage} {metaUrl} {jsonld} />

<Parallax imageLink="/images/heroimage2.webp" isClass="is100" />

<Container>
	<div class="db-grid padded wraps" id="first">
		<div class="db-grid span-4 rgap-sd">
			<h1 class="source-serif span-2 mwidth90"><span class="blue">Bodha</span> is a think tank and research group,</h1>
			<p class="highlight-text span-3" style="font-weight: 400">Studying contemporary issues of cultural concern, to inform policy, education, and public thought with wisdom drawn from Hindu traditions. We research, teach, publish, and build experiences that thicken the Hindu renaissance.</p>
		</div>
		<div class="db-grid span-4" bind:this={section}>
			{#each verticals as item, i}
				<Slider visible={verticalsInView.visible} direction="down" outDirection="up" distance={200} duration={1000} delay={i * 200}>
					<a class="box blank verticals glass-1" href={item.href}>
						<div class="pb0"><img class="portrait" src={item.image} alt={item.title} /></div>
						<div class="box rgap-sm p1222">
							<h2 class="card-title source-serif">{item.title}</h2>
							<p class="grey">{item.desc}</p>
						</div>
					</a>
				</Slider>
			{/each}
		</div>
	</div>

	<!--------latest---------------------------------------------------------------------->
	{#if latestItems}
		<div class="db-grid padded wraps growingline" id="latest" bind:this={sectionTwo}>
			<Title text="Latest at Bodha" />
			<div class="db-grid span-4">
				{#each latestItems as item, i}
					<Slider visible={secondInView.visible} direction="down" outDirection="up" distance={200} duration={1000} delay={i * 100}>
						<a class="box rgap-sm p2222 blank glass-3" href={item.link}>
							<p class="card-title tight a-hover">{item.title}</p>
							<p class="grey">{item.description}</p>
							<p class="tag-pill tt-u self-bottom dead">{item.badge}</p>
						</a>
					</Slider>
				{/each}
			</div>
		</div>
	{/if}

	<!------------blog articles------------------------------------------------------------>
	{#if blogs.length > 0}
		<div class="db-grid padded wraps growingline alternate" id="blog posts" bind:this={sectionThree}>
			<div class="row xbetween ycenter rgap16 mwrap mleft span-4">
				<Title text="essays and articles" />
				<a class="blue-button" href="/blog">See All</a>
			</div>
			<div class="db-grid fix-3 span-4">
				{#each blogs as item, i}
					<Slider visible={thirdInView.visible} direction="down" outDirection="up" distance={200} duration={1000} delay={i * 250}>
						<div class="box glass-2">
							<div class="row cgap4 rgap4 ycenter p1101">
								{#if item.meta.tags && item.meta.tags.length > 0}
									{#each item.meta.tags as tag}
										<a class="tag-pill tt-u blank" href="/blog/tags/{tag}">{tag.replaceAll('-', ' ')}</a>
									{/each}
								{/if}
							</div>
							<a class="blank p1111" href={item.linkpath}>
								<img class="fit" src={item.meta.image} alt={item.meta.title} />
							</a>
							<a class="blank box rgap-sd p0222" href={item.linkpath}>
								<p class="card-title tight">{item.meta.title}</p>
								<p class="descriptor-text grey">{item.meta.excerpt}</p>
							</a>
							<div class="self-bottom p1212 bordertop">
								<p class="tag-text altprim tt-u w500">{item.formattedDate} | {item.meta.author} | {item.meta.words} words</p>
							</div>
						</div>
					</Slider>
				{/each}
			</div>
		</div>
	{/if}

	<!------------publications------------------------------------------------------------>
	<div class="db-grid padded wraps growingline" id="publications" bind:this={sectionFour}>
		<Title text="publications" />
		<div class="db-grid span-4 fix-2">
			{#each publications as pub, i}
				<Slider visible={fourthInView.visible} direction="down" outDirection="up" distance={200} duration={1000} delay={i * 100}>
					<div class="books rgap-sd">
						<img class="contained left" src={pub.image} alt={pub.title} />
						<div class="box rgap-sm p1111">
							<p class="card-title">{pub.title}</p>
							<p class="grey">{pub.desc}</p>
							<div class="row wrap cgap8 rgap8 mtop8">
								{#each pub.links as link}
									<a class="grey-button" href={link.href} target="_blank" rel="noreferrer"
										>{link.label} →
										</a>
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
		<div class="db-grid padded wraps growingline alternate" bind:this={sectionFive}>
			<div class="row xbetween ycenter rgap16 mcol mleft span-4">
				<Title text="recent videos" />
				<a class="blue-button" href="/videos">All Videos</a>
			</div>
			<div class="db-grid fix-3 span-4">
				{#each vids as item, i}
					<Slider visible={fifthInView.visible} direction="down" outDirection="up" distance={200} duration={1000} delay={i * 100}>
						<div class="box rgap-sd p0000 blank whitestone theme-line-parent videobox">
							<VideoPlayer videoId={item.videoid} title={item.name} loop />
							<a class="box rgap-sm p0111" href={item.link} target="_blank" rel="noreferrer">
								<p class="bold paragraph-text tight">{item.name}</p>
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

img.contained
	object-fit: contain

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

// ── PUBLICATIONS ──────────────────────────────────────────

.books
	display: flex
	flex-direction: column
	@media (min-width: 1025px)
		display: grid
		grid-template-columns: 160px 1fr
		align-items: center


// ── VIDEOS ────────────────────────────────────────────────

.videobox
	border: var(--border-main)
	&:hover
		border: 1px solid var(--color-stone)

</style>
