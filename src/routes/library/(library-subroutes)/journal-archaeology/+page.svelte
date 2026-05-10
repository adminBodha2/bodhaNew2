<script lang="ts">
	import type { PageData } from './$types';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import { flip } from 'svelte/animate';
	import Title from '$lib/comps/page-title.svelte';
	import { slide } from 'svelte/transition';
	import { sineIn, sineOut } from 'svelte/easing';

	let { data }: { data: PageData } = $props();
	let groups = $derived(data.groups ?? []);
	let openIssue = $state<number | null>(null);
	let scroY = $state(0);
	let parallaxY = $derived(scroY / 6);
	function toggleIssue(issue: number) {
		openIssue = openIssue === issue ? null : issue;
	}
</script>

<svelte:window bind:scrollY={scroY} />

<section class="box library-book rgap32">
	<Crumb showT={true} title="Indian Journal of Archaeology" />
	<p class="highlight-text">
		The Indian Journal of Archaeology (IJA) has made public each of their journal issues since 2016. "Full access, no subscriptions, and no limitations." This totals to around 41 issues so far, spread over 11 volumes all available on their <a class="linked" target="_blank" rel="noreferrer" href="https://ijarch.com/">website.</a>
		Here at Bodha Open Library, we've sifted through each issue, sorted and classified the articles, and present the archive in easy to navigate, explore-friendly forms.
	</p>
	<div class="box bordertop ptop32" id="contents">
		<h2>Themes</h2>
		{#if groups && groups.length > 0}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 white-grid">
				{#each groups as item}
					<a class="blank card-padded whitestone" href={item.linkpath}>
						<p class="paragraph-text">{item.meta.title}</p>
					</a>
				{/each}
			</div>
		{/if}
	</div>
	<div class="bordertop box ptop32 rgap32">
		<h2>All Issues</h2>
		<div class="grid issues ultra">
			{#each data.issues as item (item.issue)}
				<div class="box each-issue" class:openeditem={openIssue === item.issue} animate:flip={{ duration: 350, easing: sineOut }}>
					<button class="blank row xbetween thisdoes" onclick={() => toggleIssue(item.issue)}>
						<p class="bold tt-u">{item.volumeIssue} | {item.issueMonth}</p>
						{#if openIssue === item.issue}
							<a class="golink bold tt-u" href={item.path} target="_blank" rel="noreferrer">READ ISSUE</a>
						{/if}
					</button>
					{#if openIssue === item.issue}
						<div class="rgap8 box contingent" in:slide={{ duration: 320, axis: 'y', easing: sineOut }} out:slide={{ duration: 270, axis: 'y', easing: sineIn }}>
							<p class="grey">{item.description}</p>
							<div class="grid grid-cols-1 lg:grid-cols-2 metaitem cgap16 rgap16">
								{#each item.items as iss}
									<div class="box rgap8">
										<p class="w500 tight">{iss.title}</p>
										<p class="tag-text grey tt-u">{iss.authorsText}</p>
									</div>
								{/each}
							</div>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

<style lang="sass">

a.golink
	background: var(--color-theme)
	color: #fff
	padding: 4px 8px
	font-size: 0.9rem	
	transform-origin: center center
	&:hover
		background: var(--color-theme-dark)

.each-issue
	overflow: hidden

.each-issue.openeditem
	a.golink
		animation: flicker 0.5s cubic-bezier(0.455, 0.030, 0.515, 0.955) infinite alternate-reverse

@keyframes flicker
	0%
		transform: scale(1)
	34%
		transform: scale(1.02)
	65%
		transform: scale(0.98)
	100%
		transform: scale(1)

.grid.issues
	grid-template-columns: 1fr 1fr
	background: none
	border: none
	.contingent
		padding: 1rem
	@media screen and (min-width: 1025px)
		grid-template-columns: repeat(3, 1fr)
	@media screen and (min-width: 1201px)
		grid-template-columns: repeat(3, 1fr)
		.contingent
			padding: 1.5rem
			.metaitem
				border-top: var(--border-main)
				padding-top: 1rem

.contingent
	background: var(--color-back)

button.blank.row.xbetween.thisdoes
	padding: 1rem
	width: 100%
	border-bottom: var(--border-main)
	box-shadow: 1px 1px 2px rgba(0,0,0,0.1)
	p
		transition: all 120ms ease
	&:hover
		background: var(--color-stone-1)
		p
			transform: scale(0.95)

.each-issue.openeditem
	background: var(--color-back)
	border: 1px solid #FFFFFF
	box-shadow: 0 1px 0 rgba(0,0,0,0.03), 0 2px 10px rgba(0,0,0,0.04), 0 4px 4px rgba(0,0,0,0.06)
	grid-column: span 2
	@media screen and (min-width: 1025px)
		grid-column: span 3
	@media screen and (min-width: 1201px)
		grid-column: span 3

</style>
