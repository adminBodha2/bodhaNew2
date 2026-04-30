<script lang="ts">

	import { teamMembers } from '$lib/utils/localsends';
	import Container from '$lib/comps/container.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import { absoluteImage, absoluteUrl, stringifyJsonLd, webPageJsonLd } from '$lib/utils/seo';

	const title = 'Team | Bodha';
	const metaDescription = 'Meet the founders and team behind Bodha Research.';
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


<Head
	{title}
	{metaDescription}
	{metaUrl}
	{metaImage}
	imWidth="2560"
	imHeight="1440"
	{jsonld}
/>

<Container narrow={true} scaled={true}>
<div class="box std padded-ontop">
	<Crumb item1="Bodha" item1Link="/" showT={true} title="Team" showD={true} desc="The founders and researchers behind Bodha — working to establish an Indic lens of inquiry into history, culture, and civilization."/>

		<div class="grid three standard-grid">
			{#each teamMembers as member}
			<div class="member-card">
				<div class="member-image">
					<img src={member.image} alt={member.name} />
				</div>
				<div class="member-info">
					<div class="member-head">
						<p class="card-title tight">{member.name}</p>
						<p class="citation-big grey tt-u">{member.role}</p>
					</div>
					<p class="descriptor-text grey">{member.bio}</p>
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

</div>
</Container>

<style lang="sass">

.member-card
	display: flex
	flex-direction: column
	background: var(--color-back)
	padding: 1.6rem
	gap: 1rem
	transition: background 0.15s ease
	&:hover
		background: var(--color-stone)
	@media screen and (max-width: 1024px)
		border-left: var(--border-main)
		border-bottom: var(--border-main)
		border-right: var(--border-main)

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
		color: var(--color-theme-2)

.link-sep
	font-size: 0.7rem
	color: #DDD

</style>
