<script lang="ts">
	import { teamMembers } from '$lib/utils/localsends';
	import { absoluteImage, absoluteUrl, stringifyJsonLd, webPageJsonLd } from '$lib/utils/seo';
	import Container from '$lib/comps/container.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Title from '$lib/comps/page-title.svelte';

	const title = 'About | Bodha';
	const metaDescription = 'About Bodha Research, its work, method, and purpose.';
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

<Container narrow={true} scaled={true}>
	<div class="stdbox padded-ontop">
		<Crumb item1="Bodha" item1Link="/" showT={true} title="About Bodha" />
		<div class="grid two midgaps right">
			<p class="paragraph-text">Bodha is a <span class="blue">think tank and research group</span> studying contemporary issues of cultural concern. We inform core areas of policy with wisdom derived from Hindu culture and philosophy, and help orient education to the Indian Knowledge Systems (IKS). We also curate cultural experiences of core Hindu institutions like the Hindu temple.</p>
			<div class="labelbox">
				<p class="bold">Our Mandate</p>
				<p class="grey pbot8">
					1. Provide an Indian cultural lens to policy and institutional design with research in frontier areas.<br />
					2. Ask pertinent questions about the most critical cultural problems today.<br />
					3. Create immersive cultural experiences to make our youth more culture aware and active.
				</p>
			</div>
		</div>
	</div>
	<div class="stdbox padded bordertop">
		<Title text="Our Work" />
		<div class="grid four widegaps midrows work-grid">
			<div class="textbox work-item item1">
				<p class="paragraph-text bold">Research</p>
				<p class="altprim">Our primary work stream, with projects in current and upcoming pipelines. We point methodological rigor, authenticity, and emic cultural sensitivity towards issues such as Hindu models of temple management, Hindu views of modernity, and more</p>
				<a class="small-button hollow row ycenter cgap8" href="/research"
					>See All Projects
					<div class="button-text">→</div></a>
			</div>
			<div class="textbox work-item item2">
				<p class="paragraph-text bold">Big Questions</p>
				<p class="altprim">With the Big Questions initiative, we're asking provocative questions about the most fundamental problems and open questions that Hindu society faces today.</p>
				<a class="small-button hollow row ycenter cgap8" href="/big-questions"
					>Know More
					<div class="button-text">→</div></a>
			</div>
			<div class="textbox work-item item3">
				<p class="paragraph-text bold">Academy</p>
				<p class="altprim">Bodha Academy envisions creating a line of scholars capable of carrying the Hindu intellectural work forward, and runs critical online courses.</p>
				<a class="small-button hollow row ycenter cgap8" href="/academy"
					>See Courses
					<div class="button-text">→</div></a>
			</div>
			<div class="textbox work-item item4">
				<p class="paragraph-text bold">Anveshi</p>
				<p class="altprim">Bodha Anveshi is our flagship cultural immersion program, curating sacred tours to unexplored cultural kshetras and trails.</p>
				<a class="small-button hollow row ycenter cgap8" href="/anveshi"
					>Upcoming Tours
					<div class="button-text">→</div></a>
			</div>
		</div>
	</div>
		<div class="textbox bordertop padded">
			<p class="paragraph-text width70">The <a class="linkedlight w500" href="/library">Bodha Open Library</a> features 200+ texts ranging from Puranas and Darshanic texts to papers on Indo-European linguistics, IKS, and more.</p>
			<p class="paragraph-text width70">Read our essays on culture, history, tradition, and more at our <a class="linkedlight w500" href="/blog">Blog</a>, and explore our talks, podcasts, conference sessions and other videos <a class="linkedlight w500" href="/videos">here.</a></p>
			<p class="paragraph-text width70">No work emerges in isolation. Every idea, method, and conviction is shaped by a longer continuum of thought, by thinkers who asked difficult questions, and by traditions that refined ways of seeing the world. We document the schools of thought and thinkers that inspire and inform us at <a class="linkedlight w500" href="/inspiration">Inspiration.</a></p>
			<p class="paragraph-text width70">On the <a class="linkedlight w500" href="/blog/what-bodha-logo-means">meaning</a> behind our logo.</p>
		</div>
	<div class="stdbox padded bordertop">
		<Title text="The Team" />
		<div class="grid three white-grid">
			{#each teamMembers as member}
				<div class="textbox whitestone card-padded">
					<div class="member-image">
						<img src={member.image} alt={member.name} />
					</div>
					<div class="member-info textbox">
						<div class="member-head">
							<p class="bold card-title tight">{member.name}</p>
							<p class="rem1 altprim tt-u w500">{member.role}</p>
						</div>
						<p class="grey">{member.bio}</p>
						{#if member.links.length > 0}
							<div class="member-links row ycenter cgap4">
								{#each member.links as link, i}
									{#if i > 0}<span class="link-sep">·</span>{/if}
									<p class="descriptor-text blue bold"><a class="blank" href={link.href} target="_blank" rel="noreferrer">{link.label}</a></p>
								{/each}
							</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
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

.work-item
	background: var(--color-back)
	@media screen and (max-width: 1024px)
		border-bottom: var(--border-dark)
		padding-bottom: 2rem
	@media screen and (min-width: 1025px)
		p.paragraph-text
			border-bottom: var(--border-main)
			padding-bottom: 1rem

</style>
