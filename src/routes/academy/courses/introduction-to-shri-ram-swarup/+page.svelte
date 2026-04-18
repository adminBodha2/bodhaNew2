<script lang="ts">
	import Container from '$lib/comps/container.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import autoAnimate from '@formkit/auto-animate';
	import { metaTitle, metaDescription, metaUrl, metaImage } from '$lib/utils/metastores';

	$metaTitle = 'Introduction to Shri Ram Swarup — Bodha Courses';
	$metaDescription = 'Online course on the works and thoughts of Shri Ram Swarup.';
	$metaUrl = 'https://www.bodharesearch.in/academy/courses/introduction-to-shri-ram-swarup';
	$metaImage = '/images/intro-to-srs.webp';

	const tabs = ['Overview', 'Audience', 'Takeaways', 'Facilitator', 'Sessions'];
	let active = 4;
</script>

<Head title={$metaTitle} metaDescription={$metaDescription} metaUrl={$metaUrl} metaImage={$metaImage} />

<Container narrow={true} scaled={true}>
<div class="box std padded viewHeight atMin ycenter column">
		<div class="hero-layout">
		<div class="hero-left">
			<p class="eyebrow tt-u borderbot pbot16">
				<a class="linkonhover" href="/">bodha</a>
				<span class="crumb-sep">›</span>
				<a class="linkonhover" href="/academy/academy">academy</a>
			</p>
			<div class="box elembox hero-inner-text">
			<h1 class="source-serif">Introduction to Shri Ram Swarup</h1>
			<p class="small-text grey">Shri Ram Swarup was one of the greatest Hindu thinkers to come out of India in the last century. This course is an introduction to his works and thoughts, leading learners to a better understanding of Bharatavarsha, Sanatana Dharma, and our place in the scheme of things.</p>
			<div class="row ycenter cgap8">
				<p class="tag-pill colored tt-u">Concluded</p>
				<p class="citation-big altprim tt-u">Pankaj Saxena</p>
			</div>
			<div class="grid four stay2 rgap16 stats-row">
				<div class="stat-item">
					<span class="stat-val">21–24 Mar · 1–4 Apr</span>
					<span class="stat-lbl tt-u">Dates</span>
				</div>
				<div class="stat-item">
					<span class="stat-val">8</span>
					<span class="stat-lbl tt-u">Sessions</span>
				</div>
				<div class="stat-item">
					<span class="stat-val">7 – 8 PM</span>
					<span class="stat-lbl tt-u">Timing</span>
				</div>
				<div class="stat-item">
					<span class="stat-val">₹ 2499</span>
					<span class="stat-lbl tt-u">Price</span>
				</div>
			</div>
			</div>
		</div>
		<div class="hero-image">
			<img src="/images/srg-square.webp" alt="Introduction to Shri Ram Swarup" />
		</div>
		</div>
</div>
<div class="box std padded bordertop">
		<div class="tabs-nav">
			{#each tabs as tab, i}
				<button
					class="tab-btn"
					class:active={active === i}
					on:click={() => (active = i)}
				>{tab}</button>
			{/each}
		</div>
		<div class="tab-panel" use:autoAnimate>
			{#if active === 0}
			<div class="grid two tightrows">
				<p class="card-text">Shri Ram Swarup was one of the finest thinkers of Bharatavarsha, who commented upon every important aspect of Hindu culture; and upon the nature of Bharata's civilizational enemies, with penetrative insights. He did a purva paksha of ideologies like Islam, Christianity, Judaism and Communism, through an exposition of yogic chitta bhumis. He explained yoga sadhana and its centrality to Hindu Dharma, drawing from deep meditational experiences. He explained Hindu darshana and nuances of language, words, and roots by discussing names of gods.</p>
				<p class="card-text">He dreamed of re-establishing Sanatana Dharma as a universal tradition, while helping pagan sects to revive. Never wasting a single word, his writing is un-editable like a sutra, and yet exudes great literary beauty. Shri Ram Swarup was a deep civilizational thinker — spiritually, intellectually, and culturally. Every aspiring thinker and leader should heed his call for Hindu renaissance, and his concepts of Svayambodha and Shatrubodha. This course is an introduction to the work of Shri Ram Swarup, discussing all his works in eight lectures, leading the learners to a better understanding of Bharatavarsha and the world.</p>
			</div>
			{:else if active === 1}
			<div class="grid tight two">
				<div class="box is-item rgap8">
					<p class="w500">Thinkers</p>
					<p class="small-text">Thinkers who want to develop a deep understanding of Sanatana Dharma and Hindu cosmology will immensely benefit from the deep insights that Shri Ram Swarup has about our tradition. Those who want to understand the civilizational struggles of Bharatavarsha and Hindu Dharma vis-à-vis monotheistic colonialisms will also benefit from the course.</p>
				</div>
				<div class="box is-item rgap8">
					<p class="w500">Activists</p>
					<p class="small-text">Cultural activists and civilizational nationalists who are determined to protect the ideological, as well as geographical integrity of Bharatavarsha, will gain great perspective and insights about what to do about the problems that the Hindu society faces. Those who want a global network of dharmic sects will also gain various insights through this course.</p>
				</div>
				<div class="box is-item rgap8">
					<p class="w500">Scholars</p>
					<p class="small-text">Scholars studying comparative religion, cultural anthropology, sociology, philosophy and political science will immensely benefit from the comprehension of Hindu Dharma and society based on the works of Shri Ram Swarup. His works have many potential ideas and departure points of great projects which scholars can take forward.</p>
				</div>
				<div class="box is-item rgap8">
					<p class="w500">Students</p>
					<p class="small-text">India's textbooks do not do justice to the history, culture and civilization of Bharatavarsha. Shri Ram Swarup wrote in order to correct this fault in our historiography. He does not just tell us the true history of our country and Dharma, he gives us the points of view from which to see the world and change it for the better. That is why students will benefit immensely from the course.</p>
				</div>
			</div>

			{:else if active === 2}
			<div class="grid tight two">
				<div class="box is-item rgap8">
					<p class="w500">Developing Svayambodha</p>
					<p class="small-text">Who are we? Every society has to ask this question every time we lose sight of our identity, origin and roots. What does being Hindu mean? What are the universal principles of Hindu Dharma? What are the core ideas of Bharatiya culture and civilization? Shri Ram Swarup has answered all these questions about the fundamental identity of Hindu culture and people. This course will attempt to develop this profound sense of svayambodha through his works.</p>
				</div>
				<div class="box is-item rgap8">
					<p class="w500">Developing Shatrubodha</p>
					<p class="small-text">India is locked in a civilizational struggle with two colonialisms: European Christian colonialism and Middle Eastern colonialism. It is necessary to understand the theological, institutional and religious inspiration behind them. It is necessary to understand the nature of prophetic monotheistic religions and how they are different from yogic traditions. This course will attempt to do it through the works of Shri Ram Swarup.</p>
				</div>
				<div class="box is-item rgap8">
					<p class="w500">Respect for Tradition</p>
					<p class="small-text">Dharma makes itself manifest through traditions, customs and rituals. Ever since the Vedas were written in Bharatavarsha, rituals have a central importance in Sanatana Dharma. But how do these rituals work? How do mantras operate? Shri Ram Swarup has explained how the Hindu cosmos virtually works and during this while he has explained the deepest of life's mysteries. This course will develop a deep understanding of the dharmic tradition.</p>
				</div>
				<div class="box is-item rgap8">
					<p class="w500">A Plan for Pagan Revival</p>
					<p class="small-text">One of the greatest dreams of Shri Ram Swarup was to revive the pagan, polytheistic traditions all over the world. He firmly believed that Sanatana Dharma, being a great living tradition, is capable of providing a cultural umbrella under which diverse non-Abrahamic traditions can unite and take guidance from. This course will advance this path by making you understand the need and plan for the same.</p>
				</div>
			</div>
			{:else if active === 3}
			<div class="grid two left cgap16 rgap16">
				<div class="facilitator-image">
					<img src="/images/team/PS.webp" alt="Pankaj Saxena" />
				</div>
				<div class="facilitator-bio">
					<p class="w500 card-text">Pankaj Saxena</p>
					<p class="card-text">Pankaj Saxena is a founder of Bodha and an author on Hindu temples, aesthetics, arts, literature, history and culture. But he also calls himself a Voice of India graduate. Early in life, by the grace of his guru, he encountered the works of Shri Ram Swarup, published by Voice of India. And that started him on a journey of civilizational immersion.</p>
					<p class="card-text">Through the works of Shri Ram Swarup, he realized the importance of Sanatana Dharma in the greater scheme of things. It made him look at the world through a deeply Sanatana/ Hindu point of view. Ever since then he tries to spread the work of Shri Ram Swarup; particularly focusing on his deep spiritual anchor, the yogic vision behind this worldview, and his call for a pagan revival and unity, presided and guided by a living ancient, pagan civilization like Bharatavarsha.</p>
				</div>
			</div>
			{:else if active === 4}
			<div class="grid tight stay2 four">
				<div class="box is-item textbox">
					<span class="session-num tt-u">Session 1</span>
					<p class="card-head">Inverting the Gaze: A Hindu View of the World</p>
					<p class="small-text">Studying the purva paksha of the two religions in his books like 'Hindu View of Christianity and Islam' and 'Hinduism and Monotheistic religions'.</p>
					<p class="session-refs">Books Consulted: Hindu View of Christianity and Islam, Hinduism and Monotheistic Religions</p>
				</div>
				<div class="box is-item textbox">
					<span class="session-num tt-u">Session 2</span>
					<p class="card-head">The Mind of the Other: A Critique of Islam</p>
					<p class="small-text">Understanding the true nature of Islam and Prophetic Monotheism, and how the Muslim mind works. This chapter will also deal with the issue of women in Islam.</p>
					<p class="session-refs">Books Consulted: Understanding Islam through Hadis, Woman in Islam, Hinduism and the Monotheistic Religions</p>
				</div>
				<div class="box is-item textbox">
					<span class="session-num tt-u">Session 3</span>
					<p class="card-head">The Missionary Threat to India: A Critique of Christianity</p>
					<p class="small-text">Studying the evangelist and missionary nature of Christianity, and why it is fundamentally dangerous for Bharatavarsha and Sanatana Dharma.</p>
					<p class="session-refs">Books Consulted: Hinduism and the Monotheistic Religions, Hindu View of Christianity and Islam, Christianity an Imperialist Ideology</p>
				</div>
				<div class="box is-item textbox">
					<span class="session-num tt-u">Session 4</span>
					<p class="card-head">Theory and Practice of Communism: A Critique of Communism</p>
					<p class="small-text">Delving deep into the early works of Ram Swarup in which he analyzes the nature of communism and how it can disturb Indian society and culture by weakening it from within.</p>
					<p class="session-refs">Books Consulted: Gandhism and Communism, Foundations of Maoism, Communists after Communism, Red Star over Bengal</p>
				</div>
				<div class="box is-item textbox">
					<span class="session-num tt-u">Session 5</span>
					<p class="card-head">Hindu View of Buddhism and Sikhism</p>
					<p class="small-text">Analyzing similarities, problems and conflicts between the two dharmic sects of Hinduism and Buddhism on one hand, and between Hinduism and Sikhism on the other.</p>
					<p class="session-refs">Books Consulted: Hindu-Buddhist Rejoinder to Pope John-Paul II, Buddhism vis-a-vis Hinduism, Hindu-Sikh Relationship, Meditations: Yogas, Gods, Religions</p>
				</div>
				<div class="box is-item textbox">
					<span class="session-num tt-u">Session 6</span>
					<p class="card-head">On Hinduism: Looking upon Ourselves</p>
					<p class="small-text">Studying our own tradition, religion and culture through the most universal of concepts and practices and reflecting upon the reasons of the cultural self-alienation in Hindus.</p>
					<p class="session-refs">Books Consulted: On Hinduism: Reviews & Reflections</p>
				</div>
				<div class="box is-item textbox">
					<span class="session-num tt-u">Session 7</span>
					<p class="card-head">Meditations: A Sadhaka's View of the World</p>
					<p class="small-text">Gazing inwards into the greatest yogic tradition of the world, analyzing Patanjali Yoga and its importance in our lives along with analyzing the nature of gods.</p>
					<p class="session-refs">Books Consulted: Meditations: Yogas, Gods, Religions</p>
				</div>
				<div class="box is-item textbox">
					<span class="session-num tt-u">Session 8</span>
					<p class="card-head">Sanatana Dharma and Pagan Religions of the World</p>
					<p class="small-text">Delving deep into the nature of language; analyzing the connection between speech sounds and consciousness; and finally understanding the mystery of the names of gods.</p>
					<p class="session-refs">Books Consulted: The Word as Revelation: Names of Gods</p>
				</div>
			</div>
			{/if}

		</div>
</div>
</Container>

<style lang="sass">

.crumb-sep
	margin: 0 4px
	color: #CCC

.hero-layout
	display: grid
	gap: var(--gap-std)
	background: var(--stone)
	@media screen and (min-width: 1025px)
		grid-template-columns: 1fr 40%
		height: 80%
		border: var(--theme-border)
		.hero-left
			padding: 2rem
	@media screen and (max-width: 1024px)
		grid-template-columns: 1fr
		grid-template-areas: "hero-image" "hero-left"
		.hero-left
			grid-area: hero-left
			padding: 1rem 2rem 2rem 2rem
		.hero-image
			grid-area: hero-image
			height: 320px

.hero-left
	display: flex
	flex-direction: column
	gap: var(--gap-text)

.hero-inner-text
	@media screen and (min-width: 1025px)
		height: 100%
		justify-content: center

.stats-row
	border-top: var(--stroke-subtle)
	padding-top: 1rem
	padding-bottom: 1rem

.stat-item
	display: flex
	flex-direction: column
	gap: 2px

.stat-val
	font-size: 0.82rem
	font-weight: 500
	color: #333
	line-height: 1.2

.stat-lbl
	font-size: 8px
	font-weight: 700
	letter-spacing: 0.12em
	color: var(--text-ghost)

.stat-dot
	color: #DDD
	font-size: 1rem
	line-height: 1
	margin-bottom: 8px

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

// ── TABS ───────────────────────────────────────────────────

.tabs-nav
	display: flex
	flex-wrap: wrap
	gap: 6px

.tab-btn
	font-size: 0.78rem
	font-weight: 500
	letter-spacing: 0.02em
	padding: 6px 16px
	border-radius: 100px
	border: 1px solid rgba(0,0,0,0.1)
	background: transparent
	color: #666
	cursor: pointer
	transition: all 0.15s ease
	&:hover
		border-color: rgba(0,0,0,0.18)
		color: #333
	&.active
		background: var(--theme)
		border-color: var(--theme)
		color: #FFF

.tab-panel
	padding-top: 0.5rem

// ── TAB CONTENT ────────────────────────────────────────────

.prose-grid
	display: grid
	gap: var(--gap-std)
	@media screen and (min-width: 1025px)
		grid-template-columns: 1fr 1fr
	p
		font-size: 0.95rem
		line-height: 1.75
		color: #444
		margin: 0

.content-grid
	display: grid
	gap: 0.75rem
	&.two
		@media screen and (min-width: 1025px)
			grid-template-columns: 1fr 1fr
	&.four
		@media screen and (min-width: 1025px)
			grid-template-columns: 1fr 1fr 1fr 1fr
		@media screen and (min-width: 631px) and (max-width: 1024px)
			grid-template-columns: 1fr 1fr

.is-item
	background: #F9F8F6
	border: 1px solid rgba(0,0,0,0.06)
	border-radius: 8px
	padding: 1.2rem 1.4rem

.content-card
	background: #F9F8F6
	border: 1px solid rgba(0,0,0,0.06)
	border-radius: 8px
	padding: 1.2rem 1.4rem
	display: flex
	flex-direction: column
	gap: var(--gap-text)

.card-head
	font-size: 0.88rem
	font-weight: 600
	color: #111
	line-height: 1.3
	margin: 0

.card-body
	font-size: 0.88rem
	line-height: 1.7
	color: #6B6B6B
	margin: 0

.session-card
	gap: 0.5rem

.session-num
	font-size: 8px
	font-weight: 700
	letter-spacing: 0.14em
	color: var(--text-ghost)

.session-refs
	font-size: 0.75rem
	line-height: 1.5
	color: var(--text-ghost)
	margin: 0
	padding-top: 0.25rem
	border-top: 1px solid rgba(0,0,0,0.05)

// ── FACILITATOR ────────────────────────────────────────────

.facilitator-layout
	display: grid
	gap: var(--gap-std)
	align-items: start
	@media screen and (min-width: 1025px)
		grid-template-columns: 220px 1fr
	@media screen and (max-width: 1024px)
		grid-template-columns: 1fr

.facilitator-image
	img
		width: 100%
		border-radius: 8px
		border: 1px solid rgba(0,0,0,0.06)
		display: block
		@media screen and (max-width: 1024px)
			aspect-ratio: 1
			object-fit: cover
			height: 400px

.facilitator-bio
	display: flex
	flex-direction: column
	gap: var(--gap-text)
	padding: 1rem

.fac-name
	font-size: clamp(1.1rem, 2vw, 1.5rem)
	font-weight: 400
	letter-spacing: -0.02em
	color: #111
	margin: 0

</style>
