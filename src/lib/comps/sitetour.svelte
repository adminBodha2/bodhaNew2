<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { clickOutsideAction } from '$lib/utils/clickoutside';
	import tourStepsJson from '$lib/serving/site-tour.json';
	import { fly } from 'svelte/transition';
	import { dismissSiteTour, iW, isLocalSiteTourPreview, loadSiteTourState, resetSiteTour, saveSiteTourProgress, saveSiteTourState, SITE_TOUR_OPEN_EVENT, SITE_TOUR_VERSION, recordSiteVisit, isNewVisitor, type SiteTourId } from '$lib/utils/globalstores';
	import Icon from '$lib/icons/tour-info.svelte';
	import Close from '$lib/icons/close.svelte';

	type TourVisibility = 'none' | 'icon' | 'panel';
	type TourScreen = 'selector' | 'tour' | 'ended';

	type Props = {
		isFooterVisible?: boolean;
	};

	type TourStep = {
		tour_id: SiteTourId;
		page_type: string;
		step_number: number;
		step_type: 'route' | 'decision';
		route_label: string;
		route_path: string;
		anchor: string;
		route_text: string;
		route_secondary: string;
		next_button_label: string;
		secondary_button_label: string;
	};

	type StartStep = Omit<TourStep, 'tour_id' | 'step_type'> & {
		tour_id: 'start_screen';
		step_type: 'start';
	};

	type SiteTourJsonStep = TourStep | StartStep;

	const siteTourSteps = tourStepsJson as SiteTourJsonStep[];
	const startScreen = siteTourSteps.find((step) => step.step_type === 'start') ?? null;
	const tourSteps = siteTourSteps.filter((step): step is TourStep => step.tour_id === 'work_first' || step.tour_id === 'content_first');
	let tourVisibility = $state<TourVisibility>('icon');
	let activeScreen = $state<TourScreen>('selector');
	let activeTourId = $state<SiteTourId | null>(null);
	let activeStepNumber = $state<number | null>(null);
	let siteTourStateLoaded = $state(false);
	let autoIconEligible = $state(false);
	let { isFooterVisible = false }: Props = $props();

	const stepCounter = [
		1,
		2,
		3,
		4,
		5,
		6,
		7,
		8,
		9,
		10,
		11,
		12,
		13,
		14,
		15,
		16,
		17,
		18,
		19,
		20
	]

	const activeSteps = $derived(activeTourId ? tourSteps.filter((step) => step.tour_id === activeTourId).sort((a, b) => a.step_number - b.step_number) : []);

	const currentStep = $derived(activeStepNumber === null ? null : (activeSteps.find((step) => step.step_number === activeStepNumber) ?? null));

	onMount(() => {
		const visitorState = recordSiteVisit();
		const savedTourState = loadSiteTourState();
		const newVisitor = isNewVisitor(visitorState);
		const localPreview = isLocalSiteTourPreview();
		activeScreen = 'selector';

		const hasUnfinishedTour = hasSavedTourStep(savedTourState);
		const shouldAutoShowIcon = localPreview || (!savedTourState.dismissed && newVisitor);

		autoIconEligible = shouldAutoShowIcon;
		tourVisibility = shouldAutoShowIcon ? 'icon' : 'none';

		if (hasUnfinishedTour) {
			activeScreen = 'tour';
			activeTourId = savedTourState.tour_id;
			activeStepNumber = savedTourState.step_number;
		}

		siteTourStateLoaded = true;

		window.addEventListener(SITE_TOUR_OPEN_EVENT, openTourFromPersistedState);

		return () => {
			window.removeEventListener(SITE_TOUR_OPEN_EVENT, openTourFromPersistedState);
		};
	});

	$effect(() => {
		if (!siteTourStateLoaded || !activeTourId || activeStepNumber === null) return;
		saveSiteTourProgress(activeTourId, activeStepNumber);
	});

	function getStepHref(step: TourStep) {
		return step.anchor ? `${step.route_path}#${step.anchor}` : step.route_path;
	}

	function scrollToAnchor(anchor: string) {
		document.getElementById(anchor)?.scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
	}

	async function navigateToStep(step: TourStep) {
		if (step.anchor && page.url.pathname === step.route_path) {
			scrollToAnchor(step.anchor);
			return;
		}

		await goto(getStepHref(step));

		if (step.anchor) {
			setTimeout(() => scrollToAnchor(step.anchor), 100);
		}
	}

	function setVisibilityAfterTourNavigation() {
		tourVisibility = $iW && autoIconEligible ? 'icon' : 'panel';
	}

	function hasSavedTourStep(savedTourState = loadSiteTourState()) {
		return Boolean(
			savedTourState.tour_id &&
				savedTourState.step_number &&
				!savedTourState.dismissed &&
				tourSteps.some((step) => step.tour_id === savedTourState.tour_id && step.step_number === savedTourState.step_number)
		);
	}

	async function startTour(tourId: SiteTourId, stepNumber = 1) {
		const firstStep = tourSteps.find((step) => step.tour_id === tourId && step.step_number === stepNumber);
		if (!firstStep) return;

		setVisibilityAfterTourNavigation();
		activeScreen = 'tour';
		activeTourId = tourId;
		activeStepNumber = firstStep.step_number;
		await navigateToStep(firstStep);
	}

	function showSelector() {
		tourVisibility = 'panel';
		activeScreen = 'selector';
		activeTourId = null;
		activeStepNumber = null;
		resetSiteTour();
	}

	async function openTourFromPersistedState() {
		const savedTourState = loadSiteTourState();

		if (hasSavedTourStep(savedTourState)) {
			const targetStep = tourSteps.find((step) => step.tour_id === savedTourState.tour_id && step.step_number === savedTourState.step_number);
			if (!targetStep) return;

			activeScreen = 'tour';
			activeTourId = savedTourState.tour_id;
			activeStepNumber = targetStep.step_number;
			tourVisibility = 'panel';
			await navigateToStep(targetStep);
			return;
		}

		tourVisibility = 'panel';
		activeScreen = 'selector';
		activeTourId = null;
		activeStepNumber = null;
	}

	async function openTourPanel() {
		if (tourVisibility === 'none') {
			await openTourFromPersistedState();
			return;
		}

		tourVisibility = 'panel';

		if (currentStep) {
			await navigateToStep(currentStep);
		}
	}

	function closeTourPanel() {
		tourVisibility = shouldShowIconWhenClosed() ? 'icon' : 'none';
	}

	function handlePanelClose() {
		if (activeScreen === 'ended') {
			closeEndedTour();
			return;
		}

		closeTourPanel();
	}

	function shouldShowIconWhenClosed() {
		return autoIconEligible || isLocalSiteTourPreview();
	}

	function resetJourney(dismissed: boolean) {
		activeTourId = null;
		activeStepNumber = null;
		autoIconEligible = !dismissed && autoIconEligible;

		saveSiteTourState({
			version: SITE_TOUR_VERSION,
			tour_id: null,
			step_number: 0,
			dismissed
		});
	}

	async function goNext() {
		if (!currentStep) return;
		const nextStep = activeSteps.find((step) => step.step_number === currentStep.step_number + 1);
		if (!nextStep) {
			endTour();
			return;
		}
		activeStepNumber = nextStep.step_number;
		setVisibilityAfterTourNavigation();
		await navigateToStep(nextStep);
	}

	async function goPrev() {
		if (!currentStep) return;
		const prevStep = activeSteps.find((step) => step.step_number === currentStep.step_number - 1);
		if (!prevStep) {
			showSelector();
			return;
		}
		activeStepNumber = prevStep.step_number;
		setVisibilityAfterTourNavigation();
		await navigateToStep(prevStep);
	}

	async function goToStep(stepNumber: number) {
		const targetStep = activeSteps.find((step) => step.step_number === stepNumber);
		if (!targetStep) return;

		activeScreen = 'tour';
		activeStepNumber = targetStep.step_number;
		setVisibilityAfterTourNavigation();
		await navigateToStep(targetStep);
	}

	function endTour() {
		tourVisibility = 'panel';
		activeScreen = 'ended';
		activeTourId = null;
		activeStepNumber = null;
		autoIconEligible = false;
		dismissSiteTour();
	}

	function closeEndedTour() {
		resetJourney(true);
		activeScreen = 'selector';
		tourVisibility = 'none';
	}

	function restartEndedTour() {
		resetJourney(false);
		activeScreen = 'selector';
		tourVisibility = 'panel';
	}

</script>

{#if tourVisibility === 'panel'}
		<aside class="tour-card" use:clickOutsideAction={handlePanelClose} aria-label="Site Tour" in:fly={{ y: 200, duration: 280 }} out:fly={{ y: 200, duration: 240 }}>
			{#if activeScreen === 'ended'}
				<div class="textbox top-end">
					<div class="row ycenter xbetween">
						<p class="tag-text tt-u bold white">
							tour ended
						</p>
					</div>
				</div>
				<div class="mid-area just-select">
					<div class="mid-one ender-mid">
						<div class="mid-one-main">
							<div class="row ytop xbetween">
								<p class="card-title bold blue-dark tight" style="padding-top: 4px">End of Tour</p>
								<button class="blank" style="margin-bottom: 4px" onclick={closeEndedTour}><Close size={36} color="var(--color-primary)" /></button>
							</div>
							<p class="tight">We hope this tour helped you discover areas of our website relevant to you. Restart this tour any time from 'Site Tour' link in the footer.</p>
							<button class="small-button variant" onclick={showSelector}>Restart Now</button>
						</div>
					</div>
				</div>
				<div class="labelbox self-bottom">
					<p class="rem1 tight white">Click outside or press 'Esc' to close.</p>
					<p class="rem1 tight white">Re-open this tour anytime with the icon at bottom-right screen corner, or through the 'Site Tour' link in the footer.</p>
					<p class="rem1 tight white">Press Cmd+K/Ctrl+K anytime to initiate Search.</p>
				</div>
			{/if}
			{#if activeScreen === 'selector'}
				<div class="textbox top-end">
					<div class="row ycenter xbetween">
					<p class="tag-text tt-u bold white">
						bodha site tour
					</p>
					<p class="tag-text tt-u bold white mobilestepcounter">0 / 20</p>
					</div>
					<div class="row ybottom stepcounter">
						<span class="big-number white">0</span><span class="small-number white"> / 20</span>
					</div>
				</div>
				<div class="mid-area just-select">
					<div class="mid-one selector-mid">
						<div class="mid-one-main">
							<div class="row ytop xbetween">
								<p class="card-title bold blue-dark tight" style="padding-top: 4px">{startScreen?.route_label ?? 'Namaste'}</p>
								<button class="blank" style="margin-bottom: 4px" onclick={handlePanelClose}><Close size={36} color="var(--color-primary)" /></button>
							</div>
							<p class="tight">{startScreen?.route_text ?? 'This tour is designed to introduce and orient you to our website. Please select your exploration route.'}</p>
							<div class="row cgap8 ptop8">
						<button class="newbutton" onclick={() => startTour('work_first')}
							><span class="button-decor"></span>
							<div class="button-content"><span class="button__text">{startScreen?.next_button_label ?? 'Our Work'}</span></div></button>
						<button class="newbutton" onclick={() => startTour('content_first')}
							><span class="button-decor"></span>
							<div class="button-content"><span class="button__text">{startScreen?.secondary_button_label ?? 'Content'}</span></div></button>
							</div>
						</div>
						<div class="nav textbox ycenter">
							<p class="rem1">This tour functions better on a laptop/PC.</p>
							<div class="row cgap8">
								<button class="small-button variant" onclick={endTour}>End</button>
								<button class="small-button variant" onclick={showSelector}>Restart</button>
							</div>
						</div>
					</div>
				</div>
				<div class="labelbox self-bottom">
					<p class="rem1 tight white">Click outside or press 'Esc' to close.</p>
					<p class="rem1 tight white">Re-open this tour anytime with the icon at bottom-right screen corner, or through the 'Site Tour' link in the footer.</p>
					<p class="rem1 tight white">Press Cmd+K/Ctrl+K anytime to initiate Search.</p>
				</div>
			{:else if currentStep}
				<div class="textbox top-end">
					<div class="row ycenter xbetween">
					<p class="tag-text tt-u bold white">
						{currentStep.page_type}
					</p>
					<p class="tag-text tt-u bold white mobilestepcounter">{currentStep.step_number} / {activeSteps.length}</p>
					</div>
					<div class="row ybottom stepcounter">
						<span class="big-number white">{currentStep.step_number}</span><span class="small-number white"> / {activeSteps.length}</span>
					</div>
					<button class="small-button variant prev-on-desk" style="margin-top: auto" onclick={goPrev}>← Prev</button>
				</div>
				<div class="mid-area">
					<div class="mid-one">
						<div class="mid-one-main">
							<div class="row ytop xbetween">
								<p class="card-title bold blue-dark tight" style="padding-top: 4px">{currentStep.route_label}</p>
								<button class="blank" style="margin-bottom: 4px" onclick={handlePanelClose}><Close size={36} color="var(--color-primary)" /></button>
							</div>
						{#if currentStep.route_secondary !== ''}
							<p class="tight">{currentStep.route_text}</p>
							<p class="tight">{currentStep.route_secondary}</p>
						{:else}
							<p class="tight">{currentStep.route_text}</p>
						{/if}
						</div>
						<div class="mid-one-side">
						<button class="nav box ycenter" onclick={goNext}>
							<p class="tag-text grey">NEXT</p>
							<span class="blankbutton">{currentStep.next_button_label} <span class="blue-dark bold">→</span></span>
						</button>
							<div class="row cgap8 easy-buttons">
							{#if currentStep.step_number !== 20}
							<button class="small-button variant" onclick={endTour}>End</button>
							{/if}
							<button class="small-button variant" onclick={showSelector}>Restart</button>
							<button class="small-button variant prev-on-mobile" onclick={goPrev}>Previous</button>
							</div>
						</div>
					</div>
					<div class="mid-baseline of-buttons">
						{#if currentStep.step_number > 0}
							{#each stepCounter as number}
								<button class="baselinebutton" class:active={number === currentStep.step_number} onclick={() => goToStep(number)}>{number}</button>
							{/each}
						{/if}
					</div>
				</div>
				<div class="labelbox self-bottom">
					<p class="rem1 tight white">Click outside or press 'Esc' to close.</p>
					<p class="rem1 tight white">Re-open this tour anytime with the icon at bottom-right screen corner, or through the 'Site Tour' link in the footer.</p>
					<p class="rem1 tight white">Press Cmd+K/Ctrl+K anytime to initiate Search.</p>
				</div>
			{/if}
		</aside>
{:else if tourVisibility === 'icon' && !isFooterVisible}
	<button class="blank with-tooltip" aria-label="Open Site Tour" onclick={openTourPanel}
		><Icon />
		<span class="tooltip" role="tooltip"> Open Site Tour </span>
	</button>
{/if}

<style lang="sass">

.small-button.variant
	border-radius: 5px
	background: #FFF
	border: var(--border-darker)
	&:hover
		background: var(--color-grey-4)
		color: #FFF

.mid-baseline.of-buttons
	border-top: var(--border-dark)
	border-bottom: none

.big-number
	font-weight: bold
	font-size: 5rem
	line-height: 1

.stepcounter, .prev-on-desk
	@media screen and (max-width: 1024px)
		display: none

.mobilestepcounter, .prev-on-mobile
	@media screen and (min-width: 1025px)
		display: none

.small-number
	margin-bottom: 6px

button.baselinebutton
	cursor: pointer
	text-align: center
	z-index: 1
	transition: all 0.2s ease
	display: flex
	justify-content: center
	align-items: center
	background: none
	border-top: none
	border-bottom: none
	border-left: none
	font-weight: 500
	border-right: var(--border-dark)
	font-size: 1rem
	&:last-child
		border-right: none
	&.active
		color: #fff
		background: var(--color-theme-2)
		&:hover
			background: var(--color-theme-2)
			color: #FFF
	&:hover
		background: var(--color-grey-4)
		color: #FFF
	@media screen and (max-width: 1024px)
		padding: 0.5rem
		border-bottom: var(--border-main)

button.blank.with-tooltip
	z-index: 900
	view-transition-name: site-tour
	@media screen and (max-width: 1024px)
		position: sticky
		bottom: 0
		width: 100%
		padding-top: 10px
		padding-bottom: 10px
		background: linear-gradient(80deg,rgba(0, 44, 94, 1) 0%, rgba(0, 28, 59, 1) 53%, rgba(0, 9, 19, 1) 100%)
	@media screen and (min-width: 1025px)
		position: fixed
		right: 0
		top: 72px
		height: calc(100vh - 72px)
		width: 64px
		background: rgba(255,255,255,0.3)
		border-left: var(--border-main)
		backdrop-filter: blur(10px)
		&:hover
			background: var(--color-stone)

.tour-card
	border: var(--border-dark)
	width: 100%
	height: 240px
	box-shadow: 5px 8px 16px rgba(0,0,0,0.3), -4px 0 32px rgba(0,0,0,0.6)
	background: #FFFFFF
	position: sticky
	left: 0
	bottom: 0
	z-index: 900
	display: grid
	grid-template-columns: 160px 1fr 240px
	view-transition-name: site-tour
	transition: all 0.3s ease
	.top-end
		padding: 1rem
		width: 160px
		background: linear-gradient(180deg,rgba(0, 44, 94, 1) 0%, rgba(0, 28, 59, 1) 53%, rgba(0, 9, 19, 1) 84%, rgba(0, 0, 0, 1) 100%)
	.mid-area
		border-left: var(--border-dark)
		border-right: var(--border-dark)
		display: flex
		flex-direction: column
		@media screen and (min-width: 1025px)
			display: grid
			grid-template-columns: 1fr
			grid-template-rows: 1fr 40px
			grid-template-areas: "mid-one" "mid-baseline"
			column-gap: 1.5rem
			border-bottom: none
			overflow-y: scroll
			&.just-select
				grid-template-areas: "mid-one"
				grid-template-rows: 1fr
			.mid-one
				grid-area: mid-one
				display: grid
				grid-template-columns: 1fr 280px
				grid-template-areas: "mid-one-main mid-one-side"
				&.ender-mid
					grid-template-columns: 1fr
					grid-template-areas: "mid-one-main"
				.mid-one-main
					grid-area: mid-one-main
					padding: 1.25rem
					display: flex
					flex-direction: column
					row-gap: 0.6rem
				.mid-one-side
					width: 280px
					height: 100%
					border-left: var(--border-main)
					grid-area: mid-one-side
					display: flex
					flex-direction: column
					justify-content: space-between
					.nav
						border: none
						padding: 2rem 1rem
						background: var(--color-stone)
						text-align: left
						width: 100%
						border-bottom: var(--border-main)
						&:hover
							background: #F0F4EF
					.easy-buttons
						padding: 1rem
						justify-self: flex-end
			.mid-baseline
				grid-area: mid-baseline
				display: flex
				flex-direction: row
				width: 100%
				button.baselinebutton
					flex: 1
	.self-bottom
		padding: 1rem
		width: 240px
		background: linear-gradient(180deg,rgba(0, 44, 94, 1) 0%, rgba(0, 28, 59, 1) 53%, rgba(0, 9, 19, 1) 84%, rgba(0, 0, 0, 1) 100%)
		height: 100%
	@media screen and (min-width: 1025px)
		bottom: 0
	@media screen and (max-width: 1024px)
		display: flex
		border-radius: 8px
		overflow: hidden
		flex-direction: column
		width: calc(100% - 1rem)
		margin-left: auto
		margin-right: auto
		right: 0.5rem
		bottom: 1rem
		height: calc(100dvh - 80px)
		box-shadow: 3px 6px 10px rgba(0,0,0,0.3), -4px 0 13px rgba(0,0,0,0.3)
		.top-end, .mid-area, .self-bottom
			width: 100%
		.mid-area
			border-left: none
			border-right: none
			display: flex
			flex-direction: column
			height: 100%
			.mid-one
				padding: 1rem
				display: flex
				flex-direction: column
				height: 100%
				.mid-one-main
					display: flex
					flex-direction: column
					row-gap: 1rem
					border-bottom: var(--border-main)
					padding-bottom: 2rem
				.mid-one-side
					display: flex
					flex-direction: column
					justify-content: space-between
					height: 100%
					.nav
						padding: 2rem
						background: var(--color-stone)
						border-top: none
						border-left: none
						border-right: none
						border-bottom: var(--border-main)
						text-align: left
			.mid-baseline
				display: flex
				flex-direction: row
				flex-wrap: wrap
				width: 100%
				margin-top: auto
				button.baselinebutton
					flex: 1 0 20%
		.self-bottom
			height: 160px

:global(::view-transition-old(site-tour)),
:global(::view-transition-new(site-tour))
	animation: none
	mix-blend-mode: normal

</style>
