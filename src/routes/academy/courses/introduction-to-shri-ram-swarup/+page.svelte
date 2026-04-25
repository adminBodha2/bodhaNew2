<script lang="ts">
	import Container from '$lib/comps/container.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Title from '$lib/comps/page-title.svelte';
	import autoAnimate from '@formkit/auto-animate';
	import Calendar from '$lib/icons/calendar.svelte';
	import Sessions from '$lib/icons/sessions.svelte';
	import Time from '$lib/icons/time.svelte';
	import Rupee from '$lib/icons/rupee.svelte';
	import { absoluteImage, absoluteUrl, courseJsonLd, stringifyJsonLd } from '$lib/utils/seo';

	const title = 'Introduction to Shri Ram Swarup | Bodha Courses';
	const metaDescription = 'Online course on the works and thoughts of Shri Ram Swarup.';
	const metaUrl = absoluteUrl('/academy/courses/introduction-to-shri-ram-swarup');
	const metaImage = absoluteImage('/images/intro-to-srs.webp');

	const tabs = ['Overview', 'Audience', 'Takeaways', 'Facilitator', 'Sessions'];
	let active = $state(0);

	const jsonld = stringifyJsonLd(
		courseJsonLd({
		name: 'Introduction to Shri Ram Swarup',
		description: metaDescription,
		url: metaUrl,
		image: metaImage,
			instructor: 'Pankaj Saxena',
			price: '2499',
			availability: 'https://schema.org/SoldOut'
		})
	);
</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="1200" imHeight="630" {jsonld} />

<Container narrow={true} scaled={true}>
	<div class="stdbox padded ycenter" id="course-header">
		<div class="hero-layout">
			<div class="hero-left">
				<Crumb item1="Bodha" item1Link="/" show2={true} item2="Academy" item2linked={true} item2Link="/academy" />
				<div class="box elembox hero-inner-text">
					<h1 class="page-title source-serif">Introduction to Shri Ram Swarup</h1>
					<p class="small-text grey">Shri Ram Swarup was one of the greatest Hindu thinkers to come out of India in the last century. This course is an introduction to his works and thoughts, leading learners to a better understanding of Bharatavarsha, Sanatana Dharma, and our place in the scheme of things.</p>
					<div class="grid four stay2 stats-row">
						<div class="stat-item si-1 rgap4">
							<Calendar />
							<p class="small-text w500">21–24 Mar · 1–4 Apr</p>
							<p class="citation-big thin lgrey tt-u">Dates</p>
						</div>
						<div class="stat-item si-2 rgap4">
							<Sessions />
							<p class="small-text w500">8</p>
							<p class="citation-big thin lgrey tt-u">Sessions</p>
						</div>
						<div class="stat-item si-3 rgap4">
							<Time />
							<p class="small-text w500">7 – 8 PM</p>
							<p class="citation-big thin lgrey tt-u">Timings</p>
						</div>
						<div class="stat-item si-4 rgap4">
							<Rupee />
							<p class="small-text w500">₹ 2499</p>
							<p class="citation-big thin lgrey tt-u">Price</p>
						</div>
					</div>
				</div>
			</div>
			<div class="hero-image">
				<img src="/images/srg-square.webp" alt="Introduction to Shri Ram Swarup" />
			</div>
		</div>
	</div>
	<div class="stdbox padded bordertop">
		<Title text="Course Details" />
		<div class="section-tray">
			{#each tabs as tab, i}
				<button class="tray-btn" class:active={active === i} onclick={() => (active = i)}>{tab}</button>
			{/each}
		</div>
		<div class="tab-panel" use:autoAnimate>
			{#if active === 0}
				<div class="grid two tightrows card-padded more">
					<p class="highlight-text">
						Shri Ram Swarup was one of the finest thinkers of Bharatavarsha, who commented upon every important aspect of Hindu culture; and upon the nature of Bharata's civilizational enemies, with penetrative insights. He did a purva paksha of ideologies like Islam, Christianity, Judaism and Communism, through an exposition of yogic chitta bhumis. He explained yoga sadhana and its centrality to
						Hindu Dharma, drawing from deep meditational experiences. He explained Hindu darshana and nuances of language, words, and roots by discussing names of gods.
					</p>
					<p class="highlight-text">
						He dreamed of re-establishing Sanatana Dharma as a universal tradition, while helping pagan sects to revive. Never wasting a single word, his writing is un-editable like a sutra, and yet exudes great literary beauty. Shri Ram Swarup was a deep civilizational thinker — spiritually, intellectually, and culturally. Every aspiring thinker and leader should heed his call for Hindu
						renaissance, and his concepts of Svayambodha and Shatrubodha. This course is an introduction to the work of Shri Ram Swarup, discussing all his works in eight lectures, leading the learners to a better understanding of Bharatavarsha and the world.
					</p>
				</div>
			{:else if active === 1}
				<div class="grid white-grid four">
					<div class="box card-padded whitecard rgap8">
						<p class="w500 highlight-text">Thinkers</p>
						<p class="small-text grey">Thinkers who want to develop a deep understanding of Sanatana Dharma and Hindu cosmology will immensely benefit from the deep insights that Shri Ram Swarup has about our tradition. Those who want to understand the civilizational struggles of Bharatavarsha and Hindu Dharma vis-à-vis monotheistic colonialisms will also benefit from the course.</p>
					</div>
					<div class="box card-padded whitecard rgap8">
						<p class="w500 highlight-text">Activists</p>
						<p class="small-text grey">
							Cultural activists and civilizational nationalists who are determined to protect the ideological, as well as geographical integrity of Bharatavarsha, will gain great perspective and insights about what to do about the problems that the Hindu society faces. Those who want a global network of dharmic sects will also gain various insights through this course.
						</p>
					</div>
					<div class="box card-padded whitecard rgap8">
						<p class="w500 highlight-text">Scholars</p>
						<p class="small-text grey">Scholars studying comparative religion, cultural anthropology, sociology, philosophy and political science will immensely benefit from the comprehension of Hindu Dharma and society based on the works of Shri Ram Swarup. His works have many potential ideas and departure points of great projects which scholars can take forward.</p>
					</div>
					<div class="box card-padded whitecard rgap8">
						<p class="w500 highlight-text">Students</p>
						<p class="small-text grey">
							India's textbooks do not do justice to the history, culture and civilization of Bharatavarsha. Shri Ram Swarup wrote in order to correct this fault in our historiography. He does not just tell us the true history of our country and Dharma, he gives us the points of view from which to see the world and change it for the better. That is why students will benefit immensely from the
							course.
						</p>
					</div>
				</div>
			{:else if active === 2}
				<div class="grid white-grid four">
					<div class="box card-padded whitecard rgap8">
						<p class="w500 highlight-text">Developing Svayambodha</p>
						<p class="small-text grey">
							Who are we? Every society has to ask this question every time we lose sight of our identity, origin and roots. What does being Hindu mean? What are the universal principles of Hindu Dharma? What are the core ideas of Bharatiya culture and civilization? Shri Ram Swarup has answered all these questions about the fundamental identity of Hindu culture and people. This course will attempt
							to develop this profound sense of svayambodha through his works.
						</p>
					</div>
					<div class="box card-padded whitecard rgap8">
						<p class="w500 highlight-text">Developing Shatrubodha</p>
						<p class="small-text grey">
							India is locked in a civilizational struggle with two colonialisms: European Christian colonialism and Middle Eastern colonialism. It is necessary to understand the theological, institutional and religious inspiration behind them. It is necessary to understand the nature of prophetic monotheistic religions and how they are different from yogic traditions. This course will attempt to
							do it through the works of Shri Ram Swarup.
						</p>
					</div>
					<div class="box card-padded whitecard rgap8">
						<p class="w500 highlight-text">Respect for Tradition</p>
						<p class="small-text grey">
							Dharma makes itself manifest through traditions, customs and rituals. Ever since the Vedas were written in Bharatavarsha, rituals have a central importance in Sanatana Dharma. But how do these rituals work? How do mantras operate? Shri Ram Swarup has explained how the Hindu cosmos virtually works and during this while he has explained the deepest of life's mysteries. This course will
							develop a deep understanding of the dharmic tradition.
						</p>
					</div>
					<div class="box card-padded whitecard rgap8">
						<p class="w500 highlight-text">A Plan for Pagan Revival</p>
						<p class="small-text grey">
							One of the greatest dreams of Shri Ram Swarup was to revive the pagan, polytheistic traditions all over the world. He firmly believed that Sanatana Dharma, being a great living tradition, is capable of providing a cultural umbrella under which diverse non-Abrahamic traditions can unite and take guidance from. This course will advance this path by making you understand the need and
							plan for the same.
						</p>
					</div>
				</div>
			{:else if active === 3}
				<div class="grid two left cgap16 rgap16">
					<div class="facilitator-image">
						<img src="/images/team/PS.webp" alt="Pankaj Saxena" />
					</div>
					<div class="facilitator-bio">
						<p class="w500 highlight-text">Pankaj Saxena</p>
						<p class="card-text">Pankaj Saxena is a founder of Bodha and an author on Hindu temples, aesthetics, arts, literature, history and culture. But he also calls himself a Voice of India graduate. Early in life, by the grace of his guru, he encountered the works of Shri Ram Swarup, published by Voice of India. And that started him on a journey of civilizational immersion.</p>
						<p class="card-text">
							Through the works of Shri Ram Swarup, he realized the importance of Sanatana Dharma in the greater scheme of things. It made him look at the world through a deeply Sanatana/ Hindu point of view. Ever since then he tries to spread the work of Shri Ram Swarup; particularly focusing on his deep spiritual anchor, the yogic vision behind this worldview, and his call for a pagan revival
							and unity, presided and guided by a living ancient, pagan civilization like Bharatavarsha.
						</p>
					</div>
				</div>
			{:else if active === 4}
				<div class="white-grid grid four">
					<div class="textbox whitecard card-padded">
						<p class="citation-big lgrey tt-u">Session 1</p>
						<p class="w500 tight">Inverting the Gaze: A Hindu View of the World</p>
						<p class="small-text altprim">Studying the purva paksha of the two religions in his books like 'Hindu View of Christianity and Islam' and 'Hinduism and Monotheistic religions'.</p>
						<p class="small-text grey self-bottom bordertop ptop16">Books Consulted: Hindu View of Christianity and Islam, Hinduism and Monotheistic Religions</p>
					</div>
					<div class="textbox whitecard card-padded">
						<p class="citation-big lgrey tt-u">Session 2</p>
						<p class="w500 tight">The Mind of the Other: A Critique of Islam</p>
						<p class="small-text altprim">Understanding the true nature of Islam and Prophetic Monotheism, and how the Muslim mind works. This chapter will also deal with the issue of women in Islam.</p>
						<p class="small-text grey self-bottom bordertop ptop16">Books Consulted: Understanding Islam through Hadis, Woman in Islam, Hinduism and the Monotheistic Religions</p>
					</div>
					<div class="textbox whitecard card-padded">
						<p class="citation-big lgrey tt-u">Session 3</p>
						<p class="w500 tight">The Missionary Threat to India: A Critique of Christianity</p>
						<p class="small-text altprim">Studying the evangelist and missionary nature of Christianity, and why it is fundamentally dangerous for Bharatavarsha and Sanatana Dharma.</p>
						<p class="small-text grey self-bottom bordertop ptop16">Books Consulted: Hinduism and the Monotheistic Religions, Hindu View of Christianity and Islam, Christianity an Imperialist Ideology</p>
					</div>
					<div class="textbox whitecard card-padded">
						<p class="citation-big lgrey tt-u">Session 4</p>
						<p class="w500 tight">Theory and Practice of Communism: A Critique of Communism</p>
						<p class="small-text altprim">Delving deep into the early works of Ram Swarup in which he analyzes the nature of communism and how it can disturb Indian society and culture by weakening it from within.</p>
						<p class="small-text grey self-bottom bordertop ptop16">Books Consulted: Gandhism and Communism, Foundations of Maoism, Communists after Communism, Red Star over Bengal</p>
					</div>
					<div class="textbox whitecard card-padded">
						<p class="citation-big lgrey tt-u">Session 5</p>
						<p class="w500 tight">Hindu View of Buddhism and Sikhism</p>
						<p class="small-text altprim">Analyzing similarities, problems and conflicts between the two dharmic sects of Hinduism and Buddhism on one hand, and between Hinduism and Sikhism on the other.</p>
						<p class="small-text grey self-bottom bordertop ptop16">Books Consulted: Hindu-Buddhist Rejoinder to Pope John-Paul II, Buddhism vis-a-vis Hinduism, Hindu-Sikh Relationship, Meditations: Yogas, Gods, Religions</p>
					</div>
					<div class="textbox whitecard card-padded">
						<p class="citation-big lgrey tt-u">Session 6</p>
						<p class="w500 tight">On Hinduism: Looking upon Ourselves</p>
						<p class="small-text altprim">Studying our own tradition, religion and culture through the most universal of concepts and practices and reflecting upon the reasons of the cultural self-alienation in Hindus.</p>
						<p class="small-text grey self-bottom bordertop ptop16">Books Consulted: On Hinduism: Reviews & Reflections</p>
					</div>
					<div class="textbox whitecard card-padded">
						<p class="citation-big lgrey tt-u">Session 7</p>
						<p class="w500 tight">Meditations: A Sadhaka's View of the World</p>
						<p class="small-text altprim">Gazing inwards into the greatest yogic tradition of the world, analyzing Patanjali Yoga and its importance in our lives along with analyzing the nature of gods.</p>
						<p class="small-text grey self-bottom bordertop ptop16">Books Consulted: Meditations: Yogas, Gods, Religions</p>
					</div>
					<div class="textbox whitecard card-padded">
						<p class="citation-big lgrey tt-u">Session 8</p>
						<p class="w500 tight">Sanatana Dharma and Pagan Religions of the World</p>
						<p class="small-text altprim">Delving deep into the nature of language; analyzing the connection between speech sounds and consciousness; and finally understanding the mystery of the names of gods.</p>
						<p class="small-text grey self-bottom bordertop ptop16">Books Consulted: The Word as Revelation: Names of Gods</p>
					</div>
				</div>
			{/if}
		</div>
	</div>
</Container>

<style lang="sass">

.section-tray
	display: grid
	grid-template-columns: repeat(2, 1-fr)
	border: var(--border-dark)
	background: var(--color-grey-1)
	gap: 1px
	border-radius: 5px
	overflow: visible
	.tray-btn
		background: var(--color-white)
		border: 1px solid var(--color-white)
		padding: 12px 20px
		font-size: 1rem
		box-shadow: 0 1px 0 rgba(0,0,0,0.03), 0 2px 10px rgba(0,0,0,0.04), 0 4px 4px rgba(0,0,0,0.06)
		&:first-child
			grid-column: span 2
			border-radius: 5px 5px 0 0
		&:last-child
			border-radius: 0 0 5px 0
		&:nth-last-child(2)
			border-radius: 0 0 0 5px
		&:hover
			background: var(--color-theme-5)
			border: 1px solid var(--color-theme-5)
			box-shadow: none
		&.active
			background: var(--color-theme)
			border: 1px solid var(--color-theme)
			color: var(--color-white)
	@media screen and (min-width: 1025px)
		display: flex
		flex-direction: row
		width: max-content
		.tray-btn
			background: var(--color-white)
			border: 1px solid var(--color-white)
			padding: 12px 20px
			font-size: 1rem
			box-shadow: 0 1px 0 rgba(0,0,0,0.03), 0 2px 10px rgba(0,0,0,0.04), 0 4px 4px rgba(0,0,0,0.06)
			&:first-child
				border-radius: 5px 0 0 5px
			&:last-child
				border-radius: 0 5px 5px 0
			&:nth-last-child(2)
				border-radius: 0
			&:active
				transform: scale(1.05)

#course-header
	@media screen and (min-width: 1025px)
		height: 100vh

.hero-layout
	display: grid
	gap: 2rem
	@media screen and (min-width: 1025px)
		grid-template-columns: 1fr 40%
		height: 80%
		.hero-left
			padding: 2rem
	@media screen and (max-width: 1024px)
		grid-template-columns: 1fr
		grid-template-areas: "hero-image" "hero-left"
		.hero-left
			grid-area: hero-left
			padding: 0
		.hero-image
			grid-area: hero-image
			height: 320px

.hero-left
	display: flex
	flex-direction: column
	gap: 0.5rem

.hero-inner-text
	@media screen and (min-width: 1025px)
		height: 100%
		justify-content: center

.stat-item
	display: flex
	flex-direction: column
	background: #FFF
	padding: 1.5rem

.stats-row
	border: var(--border-main)

.si-1, .si-2, .si-3
	@media screen and (min-width: 1025px)
		border-right: var(--border-main)

.si-1, .si-2
	@media screen and (max-width: 1024px)
		border-bottom: var(--border-main)

.si-1, .si-3
	@media screen and (max-width: 1024px)
		border-right: var(--border-main)

.hero-image
	@media screen and (min-width: 1025px)
		img
			width: 100%
			object-fit: cover
			height: 100%
	@media screen and (max-width: 1024px)
		img
			width: 100%
			object-fit: cover
			height: 100%

.tab-panel
	border: var(--border-dark)
	border-radius: 5px


// ── FACILITATOR ────────────────────────────────────────────

.facilitator-image
	img
		width: 100%
		display: block
		@media screen and (max-width: 1024px)
			aspect-ratio: 1
			object-fit: cover
			width: 160px
			margin: 1rem 0 0 1rem
			border-radius: 140px

.facilitator-bio
	display: flex
	flex-direction: column
	gap: 0.5rem
	justify-content: center
	padding: 1rem

</style>
