<svelte:options runes={true} />

<script lang="ts">
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Parallax from '$lib/comps/parallaxhalf.svelte';
	import Title from '$lib/comps/page-title.svelte';
	import { absoluteImage, absoluteUrl } from '$lib/utils/seo';
	import { teamMembers } from '$lib/utils/localsends';
	import Slide from '$lib/svelteanim/components/Slide2.svelte';
	import Blur from '$lib/svelteanim/components/Blur.svelte';
	import Reveal from '$lib/svelteanim/components/Reveal.svelte';

	const title = 'IKS Internship';
	const metaDescription = 'Field research in Hindu temple governance — in collaboration with the IKS Division, Ministry of Education, Govt. of India.';
	const metaUrl = absoluteUrl('/indian-knowledge-systems/internship');
	const metaImage = absoluteImage('/images/temples/iksinternship.png');
	const applyLink = 'https://forms.gle/dsXeEFfXiVTfjRy79';

	const stats = [
		{ value: '₹10,000 / month', label: 'Monthly fellowship' },
		{ value: '5 Months', label: 'Oct 2026 – Feb 2027' },
		{ value: '12 Positions', label: 'Open seats' }
	];

	const institution = [
		{ title: 'Spiritual and religious centre', text: 'A site of darshana, and a matha where sadhus and rishis gather.' },
		{ title: 'Centre of learning and the arts', text: 'Where acharyas taught and music, dance, and craft were cultivated and sustained.' },
		{ title: 'Socio-economic engine', text: 'Generating employment, sustaining artisans, and stimulating local trade.' },
		{ title: 'Social welfare institution', text: 'Hospitals, hostels, food distribution, education, and old-age homes.' },
		{ title: 'Paralegal institution', text: 'Dispute resolution and community governance rooted in dharmic frameworks.' }
	];

	const tasks = [
		{ title: 'Literature review', text: 'Survey existing scholarship, government records, and trust documentation on your cluster’s temple governance traditions.' },
		{ title: 'Primary interviews', text: 'Conduct structured interviews with temple administrators, trustees, priests, and community stakeholders - then transcribe, annotate, and code the material.' },
		{ title: 'Case study documentation', text: 'Draft a structured case study on your cluster’s indigenous temple governance model.' },
		{ title: 'Consolidated research contribution', text: 'Your cluster’s case study feeds into Bodha’s cross-regional research record on Hindu Models of Temple Management - a substantive, publishable contribution to IKS scholarship.' }
	];

	const fellowship = [
		{ label: 'Monthly Fellowship', value: '₹10,000 / month', text: '' },
		{ label: 'Duration', value: '5 months', text: '' },
		{ label: 'Certification', value: 'IKS Division', text: '' }
	];

	const eligibility = [
		{ title: 'Academic background', text: 'UG or PG students from any recognised university. Students of gurukulas and pathshalas are equally eligible. Independent scholars and recently graduated students (within 2 years of completing a degree) may also apply.' },
		{ title: 'Age', text: 'Between 16 and 30 years, as per IKS Division programme norms.' },
		{ title: 'Subject interest', text: 'Interest in Indian Knowledge Systems, history, culture studies, anthropology, sociology, or related fields.' },
		{ title: 'Location', text: 'Preference will be given to applicants based in or near their preferred cluster region. Remote applicants are welcome but must be available for at least one field visit.' }
	];

	const mentorRoles: Record<string, string> = {
		'Pankaj Saxena': 'Principal Investigator · Founder, Bodha',
		'Akshay Jha': 'Mentor & Project Manager · Co-Founder, Bodha'
	};
	const mentorNames: Record<string, string> = {
		'Pankaj Saxena': 'Dr. Pankaj Saxena',
		'Akshay Jha': 'Akshay Kumar Jha'
	};
	const mentors = teamMembers.filter((member) => member.name in mentorRoles);
</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="1536" imHeight="1024" />

<Parallax imageLink="/images/temples/iksinternship.png" wipe={true} />
<Container>
<Crumb showT={true} title="IKS Internship" showD={true} desc="In collaboration with the IKS Division, Ministry of Education, Govt. of India." />
	<section class="wrapper-std">
		<div class="box rgap8 width60">
			<p class="txt-xs tt-u w600 theme">Internship Opportunity</p>
			<p class="txt-2xl w600 source-serif">Hindu Models of Temple Management</p>
		</div>
		<div class="grid grid-cols-2 lg:grid-cols-3 white-grid">
			{#each stats as stat}
				<div class="box rgap8 p16 lg:p32 whitecard">
					<p class="txt-xl lg:txt-2xl w600">{stat.value}</p>
					<p class="txt-sm tt-u w500 grey2">{stat.label}</p>
				</div>
			{/each}
		</div>
		<div class="box rgap8">
			<p class="txt-sm grey2">Applications close on <strong>30 September 2026</strong>.</p>
			<div class="row cgap8 mwrap">
				<a class="primary" href={applyLink} target="_blank" rel="noreferrer"><span>Apply Now →</span></a>
			</div>
		</div>
	</section>
	<section class="wrapper-std growingline">
		<Title text="About the Project" />
		<div class="grid grid-cols-1 lg:grid-cols-2 cgap64 rgap16">
			<div class="box rgap16">
			<Reveal>
				<p class="highlight-text">Our temples have been the heartbeat of Indian civilization for millennia serving as spiritual, cultural, socio-economic, social welfare, and paralegal institutions. These sacred spaces embody centuries of indigenous management wisdom, meticulously crafted by devoted communities.</p>
			</Reveal>
			<Reveal>
				<p class="highlight-text">Yet the vital contributions of Hindu temples to our socio-economic fabric often go unnoticed. They have long generated employment, supported local artisans, stimulated trade, and provided food, shelter, education, and healthcare to those in need. </p>
			</Reveal>
			</div>
			<div class="box rgap16">
				<Reveal start="top 70%">
					<p class="highlight-text">Today, this indigenous self-governance is under threat from top-down administration policies devoid of cultural sensitivity and local context.</p>
				</Reveal>
				<Reveal start="top 70%">
					<p class="highlight-text">Bodha’s research project documents these living traditions rigorously, building the evidentiary foundation for alternative models of temple governance that are conducive to Hindu culture. Interns will be embedded in one of four regional clusters, conducting structured field research under the direct mentorship of Bodha’s research leadership.</p>
				</Reveal>
				<Reveal start="top 70%">
					<a class="linked w500" href="/research/hindu-models-of-temple-management">Read more about the project →</a>
				</Reveal>
			</div>
		</div>
		<div class="box rgap16">
			<h3 class="txt-xl w400 grey1">Temple as Institution</h3>
			<Slide targetSelector=".institution-items">
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap16">
					{#each institution as item}
						<div class="box rgap16 whitecard std-pad b-main institution-items">
							<p class="txt-xl w600 lh12">{item.title}</p>
							<p class="txt-bs lh14 grey2">{item.text}</p>
						</div>
					{/each}
				</div>
			</Slide>
		</div>
	</section>
	<section class="wrapper-std growingline alternate">
		<Title text="What You Will Do" />
		<Slide targetSelector=".task-items">
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap16">
				{#each tasks as task, i}
					<div class="box rgap16 whitecard std-pad b-main task-items">
						<p class="txt-xs tt-u w500 theme">Step {i + 1}</p>
						<p class="txt-xl w600">{task.title}</p>
						<p class="txt-bs lh14 grey2">{task.text}</p>
					</div>
				{/each}
			</div>
		</Slide>
	</section>
	<section class="wrapper-std growingline">
		<Title text="Fellowship and Recognition" />
		<Slide targetSelector=".fellowship-items">
			<div class="grid grid-cols-1 md:grid-cols-3 gap16">
				{#each fellowship as item}
					<div class="box rgap8 whitecard std-pad b-main fellowship-items">
						<p class="txt-sm tt-u w500 grey1">{item.label}</p>
						<p class="txt-2xl lg:txt-3xl w600 theme">{item.value}</p>
						{#if item.text}
							<p class="txt-bs lh14 grey2">{item.text}</p>
						{/if}
					</div>
				{/each}
			</div>
		</Slide>
	</section>
	<section class="wrapper-std growingline alternate">
		<Title text="Who Can Apply" />
		<Slide targetSelector=".eligibility-items">
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap16">
				{#each eligibility as item}
					<div class="box rgap16 whitecard std-pad b-main eligibility-items">
						<p class="txt-xl w600">{item.title}</p>
						<p class="txt-bs lh14 grey2">{item.text}</p>
					</div>
				{/each}
			</div>
		</Slide>
	</section>
	<section class="wrapper-std growingline">
		<Title text="Mentorship" />
		<Reveal>
			<p class="highlight-text width60">All interns are guided directly by Bodha’s research leadership throughout the programme.</p>
		</Reveal>
		<Blur targetSelector=".team-member" duration={300} end="top 40%">
			<div class="grid grid-cols-1 md:grid-cols-2 gap16">
				{#each mentors as member}
					<div class="box rgap32 whitecard std-pad b-main team-member">
						<div class="member-image">
							<img src={member.image} alt={member.name} />
						</div>
						<div class="member-info box rgap8">
							<div class="member-head">
								<p class="txt-xl w500">{mentorNames[member.name]}</p>
								<p class="tt-u">{mentorRoles[member.name]}</p>
							</div>
							<p class="grey2 lh14">{member.bio}</p>
						</div>
					</div>
				{/each}
			</div>
		</Blur>
	</section>
	<section class="wrapper-std growingline alternate">
		<Title text="Thematic Area" />
		<Reveal>
			<p class="highlight-text width80">This internship is offered under Theme 2 - Historical and Civilizational Sciences (इतिहास एवं सभ्यता विभाग), IKS Division, Ministry of Education, Govt. of India.</p>
		</Reveal>
	</section>
	<section class="wrapper-std growingline">
		<Title text="Apply" />
		<div class="grid grid-cols-1 lg:grid-cols-2 cgap64 rgap16">
			<div class="box rgap16">
				<Reveal>
					<p class="highlight-text">Applications close on <strong>30 September 2026</strong>. Write to us at <a class="linked w500" href="mailto:contact@svayambodha.in">contact@svayambodha.in</a> for any enquiry.</p>
				</Reveal>
				<div class="row cgap8 rgap8 mwrap">
					<a class="primary" href={applyLink} target="_blank" rel="noreferrer"><span>Apply Here →</span></a>
				</div>
			</div>
			<Reveal start="top 70%">
				<div class="box rgap12">
					<p class="txt-lg lh14 grey2">In collaboration with the IKS Division, Ministry of Education, Government of India.</p>
					<p class="txt-bs lh14 grey2">This internship is part of Bodha's ongoing research project on <a class="linked w500" href="/research/hindu-models-of-temple-management">Hindu Models of Temple Management →</a></p>
				</div>
			</Reveal>
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
