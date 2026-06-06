<script lang="ts">
	import { teamMembers } from '$lib/utils/localsends';
	import { absoluteImage, absoluteUrl, stringifyJsonLd, webPageJsonLd } from '$lib/utils/seo';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Title from '$lib/comps/page-title.svelte';
	import Parallax from '$lib/comps/parallaxhalf.svelte';
	import Reveal from '$lib/svelteanim/components/Reveal.svelte';
	import Stacker from '$lib/svelteanim/components/StackingWords.svelte';
	import Cut from '$lib/svelteanim/components/Cut.svelte';
	import Slide from '$lib/svelteanim/components/Slide2.svelte';
	import Blur from '$lib/svelteanim/components/Blur.svelte';
	import Scale from '$lib/svelteanim/components/Scale.svelte';
	import Policy from '$lib/icons/policy.svelte';
	import Concern from '$lib/icons/concern.svelte';
	import Aware from '$lib/icons/aware.svelte';

	const title = 'About Bodha | Hindu Research, IKS, Policy, and Cultural Work';
	const metaDescription = 'Bodha, a research group and think-tank working across issues of Hindu concern, Indian Knowledge Systems, policy, education, cultural experiences, and public thought.';
	const metaUrl = absoluteUrl('/about');
	const metaImage = absoluteImage('/images/bodhacover.png');

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
	<section class="wrapper-std min100vh">
		<div class="grid grid-cols-1 lg:grid-cols-4 rgap16">
			<div class="col-span-3 box rgap32">
			<Stacker scrub={3} ease="power3.out">
				<p class="txt-3xl lg:txt-7xl lh12 w500 lg:ls004m">Bodha is a <span class="theme">think tank and research group</span> studying contemporary issues of cultural concern.</p>
			</Stacker>
				<Reveal>
				<p class="txt-2xl lh16">We inform core areas of policy with wisdom derived from Hindu culture and philosophy, and help orient education to the Indian Knowledge Systems (IKS). We also curate cultural experiences of core Hindu institutions like the Hindu temple.</p>
			</Reveal>
			<div class="box rgap16">
				<Reveal start="top 70%"><a class="link-one highlight-text themed" href="/blog/what-bodha-logo-means">Meaning Behind Our Logo →</a></Reveal>
				<Reveal start="top 60%"><a class="link-two highlight-text themed" href="/blog/bodha-pyramid-of-priorities-nature-of-hindu-orgs">Pyramid of Priorities →</a></Reveal>
			</div>
			</div>
			<div class="box col-span-1">
			</div>
		</div>
		<div class="box rgap16">
				<h3 class="txt-xl w400 grey1">Our Mandate</h3>
				<Cut targetSelector=".items" start="top 75%" end="top 15%" scrub={2}>
				<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap16">
					<div class="box ycenter cgap16 rgap8 std-pad whitecard items b-main">
						<Policy color="var(--color-theme-dark)" />
						<p class="txt-lg lh14">Provide an Indian cultural lens to policy and institutional design with research in frontier areas.</p>
					</div>
					<div class="box ycenter cgap16 rgap8 std-pad whitecard items b-main">
						<Concern color="var(--color-theme-dark)" />
						<p class="txt-lg lh14">Ask pertinent questions about the most critical cultural problems today.</p>
					</div>
					<div class="box ycenter cgap16 rgap8 std-pad whitecard items b-main">
						<Aware color="var(--color-theme-dark)" />
						<p class="txt-lg lh14">Create immersive cultural experiences to make our youth more culture aware and active.</p>
					</div>
				</div>
				</Cut>
		</div>
	</section>
	<section class="wrapper-std growingline">
		<Title text="Our Work" />
		<Slide targetSelector=".works">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap16" id="forlinks">
				<a class="works box rgap8 whitestone b-main p8" href="/research">
					<img class="fitted landscape" src="/images/key-research.webp" alt="research"/>
					<div class="box rgap16 p16">
					<p class="txt-2xl lg:txt-3xl w600 a-hover ls002m">Research</p>
					<p class="lh16 grey2">Our primary work stream, with active and upcoming research projects. We point methodological rigor, authenticity, and emic cultural sensitivity towards issues such as Hindu models of temple management, Hindu views of modernity, and more</p>
					</div>
					<p class="a-hover highlight-text arrow self-bottom px16">→</p>
				</a>
				<a class="works box rgap8 whitestone b-main p8" href="/big-questions">
					<img class="fitted landscape" src="/images/key-bigquestions.webp" alt="big-questions"/>
					<div class="box rgap16 p16">
					<p class="txt-2xl lg:txt-3xl w600 a-hover ls002m">Big Questions</p>
					<p class="lh16 grey2">With the Big Questions initiative, we're asking provocative questions about the most fundamental problems and open questions that Hindu society faces today.</p>
					</div>
					<p class="a-hover highlight-text arrow self-bottom px8">→</p>
				</a>
				<a class="works box rgap8 whitestone b-main p8" href="/academy">
					<img class="fitted landscape" src="/images/key-academy.webp" alt="bodha academy"/>
					<div class="box rgap16 p16">
					<p class="txt-2xl lg:txt-3xl w600 a-hover ls002m">Academy</p>
					<p class="lh16 grey2">Bodha Academy envisions creating a line of scholars capable of carrying the Hindu intellectural work forward, and runs critical online courses.</p>
					</div>
					<p class="a-hover highlight-text arrow self-bottom px8">→</p>
				</a>
				<a class="works box rgap8 whitestone b-main p8" href="/anveshi">
					<img class="fitted landscape" src="/images/key-anveshi.webp" alt="anveshi"/>
					<div class="box rgap16 p16">
					<p class="txt-2xl lg:txt-3xl w600 a-hover ls002m">Anveshi</p>
					<p class="lh16 grey2">Bodha Anveshi is our flagship cultural immersion program, curating sacred tours to unexplored cultural kshetras and trails.</p>
					</div>
					<p class="a-hover highlight-text arrow self-bottom px8">→</p>
				</a>
				<a class="works box rgap8 whitestone b-main p8" href="/library">
					<img class="fitted landscape" src="/images/heroes/key-bol.webp" alt="bodha open library"/>
					<div class="box rgap16 p16">
					<p class="txt-2xl lg:txt-3xl w600 a-hover ls002m">Bodha Open Library</p>
					<p class="lh16 grey2">The Bodha Open Library features 200+ texts ranging from Puranas and Darshanic texts to papers on Indo-European linguistics, IKS, and more.</p>
					</div>
					<p class="a-hover highlight-text arrow self-bottom px8">→</p>
				</a>
				<a class="works box rgap8 whitestone b-main p8" href="/blog">
					<img class="fitted landscape" src="/images/heroes/key-blog.webp" alt="bodha blog"/>
					<div class="box rgap16 p16">
					<p class="txt-2xl lg:txt-3xl w600 a-hover ls002m">Essays, Writings</p>
					<p class="lh16 grey2">Read our essays on culture, history, tradition, and more at our blog, featuring 50+ articles that bring together our writings, research, opinions over the years.</p>
					</div>
					<p class="a-hover highlight-text arrow self-bottom px8">→</p>
				</a>
				<a class="works box rgap8 whitestone b-main p8" href="/inspiration">
					<img class="fitted landscape" src="/images/key-inspiration.webp" alt="inspiration"/>
					<div class="box rgap16 p16">
					<p class="txt-2xl lg:txt-3xl w600 a-hover ls002m">Our Inspiration</p>
					<p class="lh16 grey2">No work emerges in isolation. Every idea, method, and conviction is shaped by a longer continuum of thought. We document the schools of thought and thinkers that inspire and inform us.</p>
					</div>
					<p class="a-hover highlight-text arrow self-bottom px8">→</p>
				</a>
				<a class="works box rgap8 whitestone b-main p8" href="/designbodha">
					<img class="fitted landscape" src="/images/heroes/key-designbodha.webp" alt="designbodha"/>
					<div class="box rgap16 p16">
					<p class="txt-2xl lg:txt-3xl w600 a-hover ls002m">designBodha</p>
					<p class="lh16 grey2">An initiative for dharmic design - a call to designers, creators, product developers, and others to develop ethical, harmonious, and regenerative creation across disciplines.</p>
					</div>
					<p class="a-hover highlight-text arrow self-bottom px8">→</p>
				</a>
		</div>
		</Slide>
	</section>
	<section class="wrapper-std growingline alternate">
		<Title text="The Team" />
		<Blur targetSelector=".team-member" duration={300} end="top 40%">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap16">
			{#each teamMembers as member, j}
				<div class="box rgap32 whitecard std-pad b-main team-member">
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
		</Blur>
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
