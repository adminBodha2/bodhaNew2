<script lang="ts">
	import Container from '$lib/comps/wrapper.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Title from '$lib/comps/page-title.svelte';
	import autoAnimate from '@formkit/auto-animate';
	import Calendar from '$lib/icons/calendar.svelte';
	import Sessions from '$lib/icons/sessions.svelte';
	import Time from '$lib/icons/time.svelte';
	import Rupee from '$lib/icons/rupee.svelte';
	import Menudrop from '$lib/comps/responsive-menu.svelte';
	import { absoluteImage, absoluteUrl, courseJsonLd, stringifyJsonLd } from '$lib/utils/seo';
	import InteractiveGrid from '$lib/motion-core/interactive-grid/InteractiveGrid.svelte';
	import type { ComponentProps } from 'svelte';

	const title = 'Introduction to Shri Ram Swarup | Bodha Courses';
	const metaDescription = 'A Bodha Academy course introducing Shri Ram Swarup, his Hindu thought, purva paksha, yoga sadhana, and civilizational reading of Bharatavarsha.';
	const metaUrl = absoluteUrl('/academy/courses/introduction-to-shri-ram-swarup');
	const metaImage = absoluteImage('/images/intro-to-srs.webp');

	const tabs = ['Overview', 'Audience', 'Takeaways', 'Facilitator', 'Sessions'];
	let active = $state(0);
	const demoImage = '/images/srg-square.webp';
	type Props = Partial<ComponentProps<typeof InteractiveGrid>>;

	let { grid = 24, mouseSize = 0.15, strength = 0.5, relaxation = 0.7 }: Props = $props();

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

<Container>
	<section class="grid grid-cols-1" id="course-header">
		<div class="grid grid-cols-1 lg:grid-cols-2 ordered rgap32 cgap32">
			<div class="box rgap16 lg:rgap32 down" id="top-left">
				<div class="self-top"><Crumb /></div>
				<div class="box rgap24 lg:rgap32">
					<h1 class="txt-4xl lh11 md:txt-5xl lg:txt-8xl source-serif">Introduction to Shri Ram Swarup</h1>
					<p class="txt-xl lh14 grey2">Shri Ram Swarup was one of the greatest Hindu thinkers to come out of India in the last century. This course is an introduction to his works and thoughts, leading learners to a better understanding of Bharatavarsha, Sanatana Dharma, and our place in the scheme of things.</p>
					<div class="grid grid-cols-2 lg:grid-cols-4 white-grid">
						<div class="box rgap16 p32 whitecard">
							<Calendar />
							<p class="txt-sm tt-u w500">21–24 Mar · 1–4 Apr</p>
						</div>
						<div class="box rgap16 p32 whitecard">
							<Sessions />
							<p class="txt-sm tt-u w500">8 Sessions</p>
						</div>
						<div class="box rgap16 p32 whitecard">
							<Time />
							<p class="txt-sm tt-u w500">7 – 8 PM</p>
						</div>
						<div class="box rgap16 p32 whitecard">
							<Rupee />
							<p class="txt-sm tt-u w500">₹ 2499</p>
						</div>
					</div>
				</div>
			</div>
			<div class="box up" id="top-right">
				<img class="fi" src="/images/srg-square.webp" alt={title} />
			</div>
		</div>
	</section>
	<section class="wrapper-std growingline" id="course-details">
		<Title text="Course Details" />
		<div class="tab-panel" use:autoAnimate={{ easing: 'ease-in-out' }}>
			<Menudrop label="Course Details" ariaLabel="Future chapters regions">
				{#each tabs as tab, i}
					<button class="selection-button" class:active={active === i} onclick={() => (active = i)}>{tab}</button>
				{/each}
			</Menudrop>
			{#if active === 0}
				<div class="grid grid-cols-1 lg:grid-cols-2 cgap64 rgap16 intro-deets">
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
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 white-grid audience">
					<div class="box whitecard rgap8 p16 lg:p24">
						<p class="txt-xl w500">Thinkers</p>
						<p class="txt-lg lh14 grey2">Thinkers who want to develop a deep understanding of Sanatana Dharma and Hindu cosmology will immensely benefit from the deep insights that Shri Ram Swarup has about our tradition. Those who want to understand the civilizational struggles of Bharatavarsha and Hindu Dharma vis-à-vis monotheistic colonialisms will also benefit from the course.</p>
					</div>
					<div class="box whitecard rgap8 p16 lg:p24">
						<p class="txt-xl w500">Activists</p>
						<p class="txt-lg lh14 grey2">
							Cultural activists and civilizational nationalists who are determined to protect the ideological, as well as geographical integrity of Bharatavarsha, will gain great perspective and insights about what to do about the problems that the Hindu society faces. Those who want a global network of dharmic sects will also gain various insights through this course.
						</p>
					</div>
					<div class="box whitecard rgap8 p16 lg:p24">
						<p class="txt-xl w500">Scholars</p>
						<p class="txt-lg lh14 grey2">Scholars studying comparative religion, cultural anthropology, sociology, philosophy and political science will immensely benefit from the comprehension of Hindu Dharma and society based on the works of Shri Ram Swarup. His works have many potential ideas and departure points of great projects which scholars can take forward.</p>
					</div>
					<div class="box whitecard rgap8 p16 lg:p24">
						<p class="txt-xl w500">Students</p>
						<p class="txt-lg lh14 grey2">
							India's textbooks do not do justice to the history, culture and civilization of Bharatavarsha. Shri Ram Swarup wrote in order to correct this fault in our historiography. He does not just tell us the true history of our country and Dharma, he gives us the points of view from which to see the world and change it for the better. That is why students will benefit immensely from the
							course.
						</p>
					</div>
				</div>
			{:else if active === 2}
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 white-grid audience takeaways">
					<div class="box whitecard rgap8 p16 lg:p24">
						<p class="txt-xl w500">Developing Svayambodha</p>
						<p class="txt-lg lh14 grey2">
							Who are we? Every society has to ask this question every time we lose sight of our identity, origin and roots. What does being Hindu mean? What are the universal principles of Hindu Dharma? What are the core ideas of Bharatiya culture and civilization? Shri Ram Swarup has answered all these questions about the fundamental identity of Hindu culture and people. This course will attempt
							to develop this profound sense of svayambodha through his works.
						</p>
					</div>
					<div class="box whitecard rgap8 p16 lg:p24">
						<p class="txt-xl w500">Developing Shatrubodha</p>
						<p class="txt-lg lh14 grey2">
							India is locked in a civilizational struggle with two colonialisms: European Christian colonialism and Middle Eastern colonialism. It is necessary to understand the theological, institutional and religious inspiration behind them. It is necessary to understand the nature of prophetic monotheistic religions and how they are different from yogic traditions. This course will attempt to
							do it through the works of Shri Ram Swarup.
						</p>
					</div>
					<div class="box whitecard rgap8 p16 lg:p24">
						<p class="txt-xl w500">Respect for Tradition</p>
						<p class="txt-lg lh14 grey2">
							Dharma makes itself manifest through traditions, customs and rituals. Ever since the Vedas were written in Bharatavarsha, rituals have a central importance in Sanatana Dharma. But how do these rituals work? How do mantras operate? Shri Ram Swarup has explained how the Hindu cosmos virtually works and during this while he has explained the deepest of life's mysteries. This course will
							develop a deep understanding of the dharmic tradition.
						</p>
					</div>
					<div class="box whitecard rgap8 p16 lg:p24">
						<p class="txt-xl w500">A Plan for Pagan Revival</p>
						<p class="txt-lg lh14 grey2">
							One of the greatest dreams of Shri Ram Swarup was to revive the pagan, polytheistic traditions all over the world. He firmly believed that Sanatana Dharma, being a great living tradition, is capable of providing a cultural umbrella under which diverse non-Abrahamic traditions can unite and take guidance from. This course will advance this path by making you understand the need and
							plan for the same.
						</p>
					</div>
				</div>
			{:else if active === 3}
				<div class="grid grid-cols-1 lg:grid-cols-2 cgap32 rgap16 facil">
					<div>
						<img class="fitted squared radius8" src="/images/team/PS.webp" alt="Pankaj Saxena" />
					</div>
					<div class="box rgap16 p16 lg:p32">
						<h3 class="txt-2xl w600">Pankaj Saxena</h3>
						<p class="txt-lg lh14">Pankaj Saxena is a founder of Bodha and an author on Hindu temples, aesthetics, arts, literature, history and culture. But he also calls himself a Voice of India graduate. Early in life, by the grace of his guru, he encountered the works of Shri Ram Swarup, published by Voice of India. And that started him on a journey of civilizational immersion.</p>
						<p class="txt-lg lh14">
							Through the works of Shri Ram Swarup, he realized the importance of Sanatana Dharma in the greater scheme of things. It made him look at the world through a deeply Sanatana/ Hindu point of view. Ever since then he tries to spread the work of Shri Ram Swarup; particularly focusing on his deep spiritual anchor, the yogic vision behind this worldview, and his call for a pagan revival
							and unity, presided and guided by a living ancient, pagan civilization like Bharatavarsha.
						</p>
					</div>
				</div>
			{:else if active === 4}
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 white-grid all-sessions">
					<div class="box rgap16 whitecard p16">
						<p class="txt-xs tt-u w500 grey1">Session 1</p>
						<p class="txt-lg w500"><b>Inverting the Gaze: A Hindu View of the World</b></p>
						<p class="txt-bs grey2 lh14">Studying the purva paksha of the two religions in his books like 'Hindu View of Christianity and Islam' and 'Hinduism and Monotheistic religions'.</p>
						<p class="txt-sm grey1 ptop16 bordertop selfbottom">Books Consulted: Hindu View of Christianity and Islam, Hinduism and Monotheistic Religions</p>
					</div>
					<div class="box rgap16 whitecard p16">
						<p class="txt-xs tt-u w500 grey1">Session 2</p>
						<p class="txt-lg w500"><b>The Mind of the Other: A Critique of Islam</b></p>
						<p class="txt-bs grey2 lh14">Understanding the true nature of Islam and Prophetic Monotheism, and how the Muslim mind works. This chapter will also deal with the issue of women in Islam.</p>
						<p class="txt-sm grey1 ptop16 bordertop selfbottom">Books Consulted: Understanding Islam through Hadis, Woman in Islam, Hinduism and the Monotheistic Religions</p>
					</div>
					<div class="box rgap16 whitecard p16">
						<p class="txt-xs tt-u w500 grey1">Session 3</p>
						<p class="txt-lg w500"><b>The Missionary Threat to India: A Critique of Christianity</b></p>
						<p class="txt-bs grey2 lh14">Studying the evangelist and missionary nature of Christianity, and why it is fundamentally dangerous for Bharatavarsha and Sanatana Dharma.</p>
						<p class="txt-sm grey1 ptop16 bordertop selfbottom">Books Consulted: Hinduism and the Monotheistic Religions, Hindu View of Christianity and Islam, Christianity an Imperialist Ideology</p>
					</div>
					<div class="box rgap16 whitecard p16">
						<p class="txt-xs tt-u w500 grey1">Session 4</p>
						<p class="txt-lg w500"><b>Theory and Practice of Communism: A Critique of Communism</b></p>
						<p class="txt-bs grey2 lh14">Delving deep into the early works of Ram Swarup in which he analyzes the nature of communism and how it can disturb Indian society and culture by weakening it from within.</p>
						<p class="txt-sm grey1 ptop16 bordertop selfbottom">Books Consulted: Gandhism and Communism, Foundations of Maoism, Communists after Communism, Red Star over Bengal</p>
					</div>
					<div class="box rgap16 whitecard p16">
						<p class="txt-xs tt-u w500 grey1">Session 5</p>
						<p class="txt-lg w500"><b>Hindu View of Buddhism and Sikhism</b></p>
						<p class="txt-bs grey2 lh14">Analyzing similarities, problems and conflicts between the two dharmic sects of Hinduism and Buddhism on one hand, and between Hinduism and Sikhism on the other.</p>
						<p class="txt-sm grey1 ptop16 bordertop selfbottom">Books Consulted: Hindu-Buddhist Rejoinder to Pope John-Paul II, Buddhism vis-a-vis Hinduism, Hindu-Sikh Relationship, Meditations: Yogas, Gods, Religions</p>
					</div>
					<div class="box rgap16 whitecard p16">
						<p class="txt-xs tt-u w500 grey1">Session 6</p>
						<p class="txt-lg w500"><b>On Hinduism: Looking upon Ourselves</b></p>
						<p class="txt-bs grey2 lh14">Studying our own tradition, religion and culture through the most universal of concepts and practices and reflecting upon the reasons of the cultural self-alienation in Hindus.</p>
						<p class="txt-sm grey1 ptop16 bordertop selfbottom">Books Consulted: On Hinduism: Reviews & Reflections</p>
					</div>
					<div class="box rgap16 whitecard p16">
						<p class="txt-xs tt-u w500 grey1">Session 7</p>
						<p class="txt-lg w500"><b>Meditations: A Sadhaka's View of the World</b></p>
						<p class="txt-bs grey2 lh14">Gazing inwards into the greatest yogic tradition of the world, analyzing Patanjali Yoga and its importance in our lives along with analyzing the nature of gods.</p>
						<p class="txt-sm grey1 ptop16 bordertop selfbottom">Books Consulted: Meditations: Yogas, Gods, Religions</p>
					</div>
					<div class="box rgap16 whitecard p16">
						<p class="txt-xs tt-u w500 grey1">Session 8</p>
						<p class="txt-lg w500"><b>Sanatana Dharma and Pagan Religions of the World</b></p>
						<p class="txt-bs grey2 lh14">Delving deep into the nature of language; analyzing the connection between speech sounds and consciousness; and finally understanding the mystery of the names of gods.</p>
						<p class="txt-sm grey1 ptop16 bordertop selfbottom">Books Consulted: The Word as Revelation: Names of Gods</p>
					</div>
				</div>
			{/if}
		</div>
	</section>
</Container>

<style lang="sass">

#course-header
	img
		object-fit: cover
		width: 100%
		height: 100%

#course-header
	padding-top:  2rem
	padding-bottom: 2rem
	@media (min-width: 1025px)
		min-height: 100vh
		padding-top: 8rem
		padding-bottom: 5rem

#top-right
	height: 100%
	width: 100%
	@media (max-width: 1024px)
		height: 400px
		margin-top: 64px

#top-left
	@media (min-width: 1025px)
		padding-right: 2rem

img.square.ins
	max-width: 300px
	border-radius: 50px

.tab-panel
	row-gap: 3rem
	display: flex
	flex-direction: column

#course-details
	min-height: 100vh

// ── FACILITATOR ────────────────────────────────────────────

.facil
	display: grid
	@media screen and (min-width: 1025px)
		grid-template-columns: 300px 1fr
		grid-template-areas: ". ."

</style>
