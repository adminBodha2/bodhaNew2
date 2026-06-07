<svelte:options runes={true} />

<script lang="ts">
	import type { PageProps } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import Head from '$lib/comps/headcomponent.svelte';
	import { absoluteImage, absoluteUrl } from '$lib/utils/seo';
	import Calendar from '$lib/icons/calendar.svelte';
	import Sessions from '$lib/icons/sessions.svelte';
	import Time from '$lib/icons/time.svelte';
	import Rupee from '$lib/icons/rupee.svelte';
	import Title from '$lib/comps/page-title.svelte';
	import Blur from '$lib/svelteanim/components/Blur.svelte';
	import Menudrop from '$lib/comps/responsive-menu.svelte';
	import RazorpayButton from '$lib/comps/RazorpayButton.svelte';
	import autoAnimate from '@formkit/auto-animate';
	import { staggerAnimatePlugin } from '$lib/svelteanim/utils/staggerPlugin';
	let { data }: PageProps = $props();
	let detail = $derived(data.detail);
	let title = $derived(`${detail.title} | Bodha Academy`);
	let metaDescription = $derived(detail.description);
	let metaUrl = $derived(absoluteUrl(`/academy/${detail.slug}`));
	let metaImage = $derived(absoluteImage(detail.image ?? '/images/key-academy.webp'));
	const tabs = ['Overview', 'Audience', 'Takeaways', 'Facilitator', 'Sessions'];
	let active = $state(0);

	function extractRazorpayId(html: string): string | null {
		const match = html.match(/data-payment_button_id="([^"]+)"/);
		return match ? match[1] : null;
	}

	let paylinkId = $derived(extractRazorpayId(detail.paylink ?? ''));
	let paylinkDId = $derived(extractRazorpayId(detail.paylinkD ?? ''));
</script>

<Head {title} {metaDescription} {metaUrl} {metaImage} imWidth="1536" imHeight="1024" />

<Container>
	<section class="box ycenter sm:pbot64" id="course-header">
		<div class="grid grid-cols-1 lg:grid-cols-2 ordered cgap32">
			<div class="box rgap32 down" id="top-left">
				<Crumb isSolo={true}/>
				<div class="box rgap24 lg:rgap32">
					<h1 class="txt-4xl lh11 md:txt-5xl lg:txt-6xl ls001m md:ls004m lg:ls009m source-serif">{detail.title}</h1>
					<p class="txt-xl lh14 grey2">{detail.description}</p>
					<div class="grid grid-cols-2 lg:grid-cols-4 white-grid mtop16">
						<div class="box rgap8 p16 lg:p32 whitecard">
							<Calendar />
							<p class="txt-sm tt-u w500">{detail.dates}</p>
						</div>
						<div class="box rgap8 p16 lg:p32 whitecard">
							<Sessions />
							<p class="txt-sm tt-u w500">{detail.sessions}</p>
						</div>
						<div class="box rgap8 p16 lg:p32 whitecard">
							<Time />
							<p class="txt-sm tt-u w500">{detail.timings}</p>
						</div>
						<div class="box rgap8 p16 lg:p32 whitecard">
							<Rupee />
							<p class="txt-sm tt-u w500">{detail.price}</p>
						</div>
					</div>
					{#if detail.status === "OPEN NOW"}
						<div class="box gap8">
							<p class="txt-xs tt-u w600">Payment Links (refresh if links not visible):</p>
							<div class="row paybuttons gap16 mwrap">
								{#if paylinkId}
									<div class="box">
<RazorpayButton buttonId={paylinkId} />
<p class="txt-00 tt-u">Indian Payments</p>
									</div>
								{/if}
								{#if paylinkDId}
									<div class="box">
<RazorpayButton buttonId={paylinkDId} />
<p class="txt-00 tt-u">Intl. Payments</p>
									</div>
								{/if}
							</div>
						</div>
					{/if}
				</div>
			</div>
			<div class="box up" id="top-right">
				<img class="fi" src={detail.image} alt={detail.title} />
			</div>
		</div>
	</section>
	<section class="wrapper-std growingline" id="course-details">
		<Title text="Course Details" />
		<Blur>
			<div class="tab-panel" use:autoAnimate={staggerAnimatePlugin({ stagger: 80, duration: 300 })}>
				<Menudrop label="Course Details" ariaLabel="Future chapters regions">
				{#each tabs as tab, i}
					<button class="selection-button" class:active={active === i} onclick={() => (active = i)}>{tab}</button>
				{/each}
				</Menudrop>
				{#if active === 0}
				<div class="grid grid-cols-1 lg:grid-cols-2 cgap64 rgap16 intro-deets">
					{#each data.overview as item}
						<p class="highlight-text">{item.para1}</p>
						<p class="highlight-text">{item.para2}</p>
					{/each}
				</div>
				{:else if active === 1}
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap16 audience">
						{#each data.audience as item}
							<div class="box whitecard rgap16 std-pad b-main">
								<p class="txt-xl w600">{item.title}</p>
								<p class="txt-bs lh14 grey2">{item.text}</p>
							</div>
						{/each}
					</div>
				{:else if active === 2}
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap16 takeaways">
						{#each data.takeaways as item}
							<div class="box whitecard rgap16 std-pad b-main">
								<p class="txt-xl w600">{item.title}</p>
								<p class="txt-bs lh14 grey2">{item.text}</p>
							</div>
						{/each}
					</div>
				{:else if active === 3}
					{#each data.instructor as person}
					<div class="grid grid-cols-1 lg:grid-cols-2 rgap16 facil b-main">
					<div class="p16">
						<img class="fitted h-also" src={person.photo} alt={person.name} />
					</div>
					<div class="box rgap16 std-pad">
						<h3 class="txt-2xl w600">{person.name}</h3>
						{#each person.text as paragraph}
							<p class="txt-lg lh14">{paragraph}</p>
						{/each}
					</div>
					</div>
					{/each}
				{:else if active === 4}
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap16 all-sessions" class:lg:grid-cols-4={detail.title === "Introduction to Shri Ram Swarup"} class:lg:grid-cols-3={detail.title === "Civilization Theory - Dhatus as Civilizational Code"}>
						{#each data.sessions as session}
							<div class="box rgap16 whitecard std-pad b-main">
								<p class="txt-xs tt-u w500 theme">Session {session.id}</p>
								<p class="txt-xl w600">{session.title}</p>
								<p class="txt-bs grey2 lh14">{session.text}</p>
								{#if session.books}
									<p class="txt-sm grey1 ptop16 bordertop selfbottom">Readings: {session.books}</p>
								{/if}
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</Blur>
	</section>
</Container>

<style lang="sass">

#course-header
	img
		object-fit: cover
		width: 100%
		height: 100%

#course-header
	@media (min-width: 1025px)
		min-height: 100vh
		.ordered
			height: 100%

#top-right
	height: 100%
	width: 100%
	@media (max-width: 1024px)
		height: 400px

#top-left
	@media (min-width: 1025px)
		padding-right: 2rem
		height: 100%

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
