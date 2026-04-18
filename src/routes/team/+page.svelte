<script lang="ts">
	import Container from '$lib/comps/container.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte'
	import { metaTitle, metaDescription, metaUrl, metaImage } from '$lib/utils/metastores';

	$metaTitle = 'Bodha — Team';
	$metaDescription = 'Meet the founders and team behind Bodha Research.';
	$metaUrl = 'https://www.bodharesearch.in/team';
	$metaImage = '/images/bodhacover.png';

	const members = [
		{
			name: 'Pankaj Saxena',
			role: 'Founder',
			image: '/images/team/PS.webp',
			bio: 'Pankaj is an author on Hindu temples, arts, literature, history and culture. His writing explains the beauty of Sanātana Dharma through stories about traditions, communities and culture. He has a deep interest in cultural anthropology, evolutionary biology and ecology, and has visited more than 1600 Hindu temples. He is the author of Svayambodha and Shatrubodha.',
			links: [
				{ label: 'Twitter', href: 'https://x.com/PankajSaxena84' },
				{ label: 'Facebook', href: 'https://www.facebook.com/PankajSaxena84' },
				{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/pankajsaxena84/' },
			]
		},
		{
			name: 'Amritanshu Pandey',
			role: 'Co-founder',
			image: '/images/team/AP.webp',
			bio: 'Amrit combines 14 years of professional experience rooted in product development and business leadership, with a lifetime of engagement with ancient Indian history. He writes on history, civilizational thinking and design, and is a research fellow at Sir Jadunath Sarkar Fellowship for Indian History (2025–26) at FIHCR. He is the author of Fractal Maṇḍala — A History of Ancient India.',
			links: [
				{ label: 'Twitter', href: 'https://x.com/saamaanyafreaky' },
				{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/amritanshu-pandey/' },
			]
		},
		{
			name: 'Akshay Jha',
			role: 'Co-founder',
			image: '/images/team/AJ.webp',
			bio: 'Akshay is a researcher of Hindu institutions and philosophy, with a current focus on Hindu temple management. His interests lie in Hindu knowledge tradition, ethnographic approaches to temple management, and the intersection of tradition with contemporary society.',
			links: [
				{ label: 'Twitter', href: 'https://x.com/akshaystates' },
				{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/akshaykrjha/' },
			]
		},
		{
			name: 'Padmavathy Manavazhahan',
			role: 'Manager, Content',
			image: '/images/team/PM.webp',
			bio: 'Padmavathy comes from a background of Advaita Vedānta, with professional experience in software entrepreneurship. Her work in this field is driven by a life-long reverence for Bhārata.',
			links: []
		},
		{
			name: 'Ankit Mishra',
			role: 'Manager, Operations',
			image: '/images/team/AM.webp',
			bio: 'Ankit transitioned from engineering to the development sector after his interests in public policy. He has worked as a political consultant to several political parties and renowned leaders. He aims to integrate Indian Knowledge Systems in development sector and politics to rekindle the dharma and civilizational flame.',
			links: []
		},
	];
</script>

<Head title={$metaTitle} metaDescription={$metaDescription} metaUrl={$metaUrl} metaImage={$metaImage} />

<Container narrow={true} scaled={true}>
<div class="box std padded-ontop">
	<Crumb item1="Bodha" item1Link="/" showT={true} title="Team" showD={true} desc="The founders and researchers behind Bodha — working to establish an Indic lens of inquiry into history, culture, and civilization."/>

		<div class="grid three standard-grid">
			{#each members as member}
			<div class="member-card">
				<div class="member-image">
					<img src={member.image} alt={member.name} />
				</div>
				<div class="member-info">
					<div class="member-head">
						<p class="card-title tight w500">{member.name}</p>
						<p class="citation-big grey tt-u">{member.role}</p>
					</div>
					<p class="small-text grey">{member.bio}</p>
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

.hero-sub
	max-width: 60ch

// ── TEAM GRID ──────────────────────────────────────────────

.team-grid
	display: grid
	gap: 1px
	background: rgba(0,0,0,0.06)
	border: 1px solid rgba(0,0,0,0.06)
	border-radius: 10px
	overflow: hidden
	@media screen and (min-width: 1025px)
		grid-template-columns: repeat(3, 1fr)
	@media screen and (min-width: 631px) and (max-width: 1024px)
		grid-template-columns: repeat(2, 1fr)
	@media screen and (max-width: 630px)
		grid-template-columns: 1fr

.member-card
	display: flex
	flex-direction: column
	background: #FFFFFF
	padding: 1.6rem
	gap: 1rem
	transition: background 0.15s ease
	&:hover
		background: #F9F8F6

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
	gap: var(--gap-text)

.member-head
	display: flex
	flex-direction: column
	gap: 3px

.member-name
	font-size: clamp(1rem, 1.5vw, 1.2rem)
	font-weight: 400
	letter-spacing: -0.02em
	line-height: 1.2
	color: #111
	margin: 0

.member-role
	font-size: 8.5px
	font-weight: 700
	letter-spacing: 0.12em
	color: var(--text-ghost)

.member-bio
	font-size: 0.84rem
	line-height: 1.7
	color: #555
	margin: 0

.member-links
	display: flex
	flex-wrap: wrap
	align-items: center
	gap: 6px
	margin-top: auto

.member-link
	font-size: 0.78rem
	font-weight: 500
	color: var(--theme)
	transition: color 0.12s ease
	&:hover
		color: var(--themealt)

.link-sep
	font-size: 0.7rem
	color: #DDD

</style>
