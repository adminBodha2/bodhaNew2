<script lang="ts">
	import { teamMembers } from '$lib/utils/localsends';
	import Container from '$lib/comps/wrapper.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import { absoluteImage, absoluteUrl, stringifyJsonLd, webPageJsonLd } from '$lib/utils/seo';

	const title = 'Bodha Team | Hindu Research, IKS, Culture, and Policy Scholars';
	const metaDescription = 'Meet the founders, researchers, writers, and collaborators behind Bodha Research and its work on Hindu culture, IKS, policy, and civilization.';
	const metaUrl = absoluteUrl('/team');
	const metaImage = absoluteImage('/images/bodhacover.png');

	const jsonld = stringifyJsonLd({
		...webPageJsonLd({
			name: title,
			description: metaDescription,
			url: metaUrl,
			image: metaImage,
			type: 'AboutPage'
		}),
		mainEntity: {
			'@type': 'Organization',
			name: 'Bodha',
			url: absoluteUrl('/'),
			member: teamMembers.map((member) => ({
				'@type': 'Person',
				name: member.name,
				jobTitle: member.role,
				image: absoluteImage(member.image),
				description: member.bio,
				sameAs: member.links.map((link) => link.href)
			}))
		}
	});
</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="2560" imHeight="1440" {jsonld} />

<Container>
	<section class="wrapper-std">
		<Crumb showT={true} title="Team" showD={true} desc="The founders and researchers behind Bodha — working to establish an Indic lens of inquiry into history, culture, and civilization." />
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap16">
			{#each teamMembers as member}
				<div class="rgap16 box b-main std-pad">
					<div class="member-image">
						<img src={member.image} alt={member.name} />
					</div>
					<div class="member-info">
						<div class="member-head">
							<p class="txt-xl w600">{member.name}</p>
							<p class="txt-sm tt-u w500">{member.role}</p>
						</div>
						<p class="grey2 lh14">{member.bio}</p>
						{#if member.links.length > 0}
							<div class="member-links">
								{#each member.links as link, i}
									{#if i > 0}<span class="link-sep">·</span>{/if}
									<a class="member-link blank" href={link.href} target="_blank" rel="noreferrer">{link.label}</a>
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
		width: 80px
		height: 80px
		border-radius: 50%
		object-fit: cover
		object-position: center top
		border: 1px solid rgba(0,0,0,0.07)
		display: block

.member-info
	display: flex
	flex-direction: column
	gap: 0.5rem

.member-head
	display: flex
	flex-direction: column
	gap: 3px

.member-links
	display: flex
	flex-wrap: wrap
	align-items: center
	gap: 6px
	margin-top: auto

.member-link
	font-size: 0.78rem
	font-weight: 500
	color: var(--color-theme)
	transition: color 0.12s ease
	&:hover
		color: var(--color-theme-dark)

.link-sep
	font-size: 0.7rem
	color: #DDD

</style>
