<script lang="ts">
	import { teamMembers } from '$lib/utils/localsends';
	import { absoluteImage, absoluteUrl, stringifyJsonLd, webPageJsonLd } from '$lib/utils/seo';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Title from '$lib/comps/page-title.svelte';
	import Parallax from '$lib/comps/parallaxhalf.svelte';
	import Slider from '$lib/svelteanim/components/Slide.svelte';
	import Reveal from '$lib/svelteanim/components/Reveal.svelte';
	import { useInView } from '$lib/svelteanim/utils/useInView.svelte';
	import Policy from '$lib/icons/policy.svelte';
	import Concern from '$lib/icons/concern.svelte';
	import Aware from '$lib/icons/aware.svelte';

	const title = 'About Bodha | Hindu Research, IKS, Policy, and Cultural Work';
	const metaDescription = 'Learn about Bodha, a Hindu research group working across Indian Knowledge Systems, policy, education, cultural experiences, and public thought.';
	const metaUrl = absoluteUrl('/about');
	const metaImage = absoluteImage('/images/bodhacover.png');
	let referenceOne = $state<HTMLElement | null>(null);
	let referenceTwo = $state<HTMLElement | null>(null);
	let isVisible = useInView(() => referenceOne, { threshold: 0.4, once: true });
	let isTwoVisible = useInView(() => referenceTwo, { threshold: 0.5, once: true });
	let revref = $state<HTMLElement | null>(null);
	let revVis = useInView(() => revref, { threshold: 0.4, once: true });

	const jsonld = stringifyJsonLd(
		webPageJsonLd({
			name: title,
			description: metaDescription,
			url: metaUrl,
			image: metaImage,
			type: 'AboutPage'
		})
	);
</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="2560" imHeight="1440" {jsonld} />

	<Parallax imageLink="/images/heroes/key-aboutbodha.webp" wipe={true}/>
<Container>
<Crumb showT={true} title="About Bodha" showD={true} desc={metaDescription} />
	<section class="wrapper-std">
		<div class="box rgap32" bind:this={revref}>
			<Reveal visible={revVis.visible}>
				<p class="highlight-text width60">Bodha is a <span class="blue">think tank and research group</span> studying contemporary issues of cultural concern. We inform core areas of policy with wisdom derived from Hindu culture and philosophy, and help orient education to the Indian Knowledge Systems (IKS). We also curate cultural experiences of core Hindu institutions like the Hindu temple.</p>
			</Reveal>
			<div class="box rgap32 ptop16">
				<Title text="Our Mandate" sizeType={true}/>
				<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 white-grid">
					<div class="row ycenter cgap16 rgap8 p24 lg:p32 whitecard">
						<Policy color="var(--color-theme-dark)" />
						<p class="txt-lg lh14">Provide an Indian cultural lens to policy and institutional design with research in frontier areas.</p>
					</div>
					<div class="row ycenter cgap16 rgap8 p24 lg:p32 whitecard">
						<Concern size={56} color="var(--color-theme-dark)" />
						<p class="txt-lg lh14">Ask pertinent questions about the most critical cultural problems today.</p>
					</div>
					<div class="row ycenter cgap16 rgap8 p24 lg:p32 whitecard">
						<Aware color="var(--color-theme-dark)" />
						<p class="txt-lg lh14">Create immersive cultural experiences to make our youth more culture aware and active.</p>
					</div>
				</div>
			</div>
		</div>
	</section>
	<section class="wrapper-std growingline" bind:this={referenceOne}>
		<Title text="Our Work" />
		<div class="box rgap1">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 white-grid" id="forlinks">
			<Slider visible={isVisible.visible} direction="down" outDirection="up" distance={200} duration={1000}>
				<a class="box rgap8 lg:rgap16 p24 lg:p32 whitestone" href="/research">
					<p class="txt-xl w600 a-hover">Research</p>
					<p class="txt-lg lh14 grey2">Our primary work stream, with projects in current and upcoming pipelines. We point methodological rigor, authenticity, and emic cultural sensitivity towards issues such as Hindu models of temple management, Hindu views of modernity, and more</p>
					<p class="blue highlight-text arrow self-bottom">→</p>
				</a>
			</Slider>
			<Slider visible={isVisible.visible} direction="down" outDirection="up" distance={200} duration={1000} delay={200}>
				<a class="box rgap8 lg:rgap16 p24 lg:p32 whitestone" href="/big-questions">
					<p class="txt-xl w600 a-hover">Big Questions</p>
					<p class="txt-lg lh14 grey2">With the Big Questions initiative, we're asking provocative questions about the most fundamental problems and open questions that Hindu society faces today.</p>
					<p class="blue highlight-text arrow self-bottom">→</p>
				</a>
			</Slider>
			<Slider visible={isVisible.visible} direction="down" outDirection="up" distance={200} duration={1000} delay={400}>
				<a class="box rgap8 lg:rgap16 p24 lg:p32 whitestone" href="/academy">
					<p class="txt-xl w600 a-hover">Academy</p>
					<p class="txt-lg lh14 grey2">Bodha Academy envisions creating a line of scholars capable of carrying the Hindu intellectural work forward, and runs critical online courses.</p>
					<p class="blue highlight-text arrow self-bottom">→</p>
				</a>
			</Slider>
			<Slider visible={isVisible.visible} direction="down" outDirection="up" distance={200} duration={1000} delay={600}>
				<a class="box rgap8 lg:rgap16 p24 lg:p32 whitestone" href="/anveshi">
					<p class="txt-xl w600 a-hover">Anveshi</p>
					<p class="txt-lg lh14 grey2">Bodha Anveshi is our flagship cultural immersion program, curating sacred tours to unexplored cultural kshetras and trails.</p>
					<p class="blue highlight-text arrow self-bottom">→</p>
				</a>
			</Slider>
		</div>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 white-grid" bind:this={referenceTwo}>
			<Slider visible={isTwoVisible.visible} direction="down" outDirection="up" distance={200} duration={500}>
				<a class="box rgap8 lg:rgap16 p24 lg:p32 whitestone" href="/library">
					<p class="txt-xl w600 a-hover">Bodha Open Library</p>
					<p class="txt-lg lh14 grey2">The Bodha Open Library features 200+ texts ranging from Puranas and Darshanic texts to papers on Indo-European linguistics, IKS, and more.</p>
					<div class="theme-line"></div>
				</a>
			</Slider>
			<Slider visible={isTwoVisible.visible} direction="down" outDirection="up" distance={200} duration={500} delay={200}>
				<a class="box rgap8 lg:rgap16 p24 lg:p32 whitestone" href="/blog">
					<p class="txt-xl w600 a-hover">Essays, Writings</p>
					<p class="txt-lg lh14 grey2">Read our essays on culture, history, tradition, and more at our blog, featuring 50+ articles that bring together our writings, research, opinions over the years.</p>
					<div class="theme-line"></div>
				</a>
			</Slider>
			<Slider visible={isTwoVisible.visible} direction="down" outDirection="up" distance={200} duration={500} delay={300}>
				<a class="box rgap8 lg:rgap16 p24 lg:p32 whitestone" href="/inspiration">
					<p class="txt-xl w600 a-hover">Our Inspiration</p>
					<p class="txt-lg lh14 grey2">No work emerges in isolation. Every idea, method, and conviction is shaped by a longer continuum of thought. We document the schools of thought and thinkers that inspire and inform us.</p>
					<div class="theme-line"></div>
				</a>
			</Slider>
			<Slider visible={isTwoVisible.visible} direction="down" outDirection="up" distance={200} duration={500} delay={400}>
				<div class="box rgap8 lg:rgap16 p24 lg:p32 whitestone">
					<p class="txt-xl w600 a-hover">Brand and Logo</p>
					<p class="txt-lg lh14 grey2">This essay by our founder explains the <a class="linkedlight" href="meaning behind our logo">meaning behind our logo</a>, and here he outlines the <a class="linkedlight" href="/blog/bodha-pyramid-of-priorities-nature-of-hindu-orgs">Bodha pyramid of priorities.</a>.</p>
					<p class="txt-lg lh14 grey2">We're passionate about design and development! Learn more about <a class="linkedlight" href="/designbodha">designBodha,</a> and access our <a class="linkedlight" target="_blank" rel="noreferrer" href="https://github.com/adminBodha2/bodhaNew2">website public repo</a> at Github.</p>
					<div class="theme-line"></div>
				</div>
			</Slider>
		</div>
		</div>
	</section>
	<section class="wrapper-std growingline alternate">
		<Title text="The Team" />
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 white-grid">
			{#each teamMembers as member, j}
				<div class="box rgap32 whitestone p24 lg:p32">
					<div class="member-image">
						<img src={member.image} alt={member.name} />
					</div>
					<div class="member-info box rgap8">
						<div class="member-head">
							<p class="txt-xl w500">{member.name}</p>
							<p class="tt-u">{member.role}</p>
						</div>
						<p class="grey2 lh14">{member.bio}</p>
						{#if member.links.length > 0}
							<div class="member-links row ycenter cgap4">
								{#if j < 4}
									<p class="txt-xs w500 theme"><a class="blank" href={member.blog}>Writings</a></p>
									<span class="link-sep">·</span>
								{/if}
								{#each member.links as link, i}
									{#if i > 0}<span class="link-sep">·</span>{/if}
									<p class="txt-xs w500 theme"><a class="blank" href={link.href} target="_blank" rel="noreferrer">{link.label}</a></p>
								{/each}
							</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</section>
</Container>

<style lang="sass">

.member-image
	img
		width: 120px
		height: 120px
		border-radius: 50%
		object-fit: cover
		object-position: center top
		border: 1px solid rgba(0,0,0,0.07)
		display: block

</style>
