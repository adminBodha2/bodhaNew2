<script lang="ts">
	import { onMount } from 'svelte';
	import { clickOutsideAction } from '$lib/utils/clickoutside' 
	import Container from '$lib/comps/wrapper.svelte';
	import tourStepsJson from '$lib/serving/site-tour.json';
	import { fly } from 'svelte/transition';
	import { dismissSiteTour, loadSiteTourState, resetSiteTour, saveSiteTourProgress, saveSiteTourState, SITE_TOUR_VERSION, recordSiteVisit, isNewVisitor, type SiteTourId } from '$lib/utils/globalstores';
	import Icon from '$lib/icons/tour-info.svelte'
	import Close from '$lib/icons/close.svelte'

	type TourVisibility = 'none' | 'icon' | 'panel';
	type TourScreen = 'selector' | 'tour' | 'ended';

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
	let tourDismissed = $state(false);
	let siteTourStateLoaded = $state(false);

	const activeSteps = $derived(activeTourId ? tourSteps.filter((step) => step.tour_id === activeTourId).sort((a, b) => a.step_number - b.step_number) : []);

	const currentStep = $derived(activeStepNumber === null ? null : (activeSteps.find((step) => step.step_number === activeStepNumber) ?? null));

	onMount(() => {
		const visitorState = recordSiteVisit();
		const savedTourState = loadSiteTourState();
		const newVisitor = isNewVisitor(visitorState);
		activeScreen = 'selector';

		const savedStepExists = tourSteps.some((step) => step.tour_id === savedTourState.tour_id && step.step_number === savedTourState.step_number);
		const hasUnfinishedTour = Boolean(
			savedTourState.tour_id &&
			savedTourState.step_number &&
			savedStepExists &&
			!savedTourState.dismissed
		);
		const shouldAutoShowIcon = !savedTourState.dismissed && newVisitor;

		tourDismissed = savedTourState.dismissed;
		tourVisibility = shouldAutoShowIcon ? 'icon' : 'none';

		if (hasUnfinishedTour) {
			activeScreen = 'tour';
			activeTourId = savedTourState.tour_id;
			activeStepNumber = savedTourState.step_number;
			tourDismissed = false;
		}

		siteTourStateLoaded = true;
	});

	$effect(() => {
		if (!siteTourStateLoaded || !activeTourId || activeStepNumber === null) return;
		saveSiteTourProgress(activeTourId, activeStepNumber);
	});

	function startTour(tourId: SiteTourId, stepNumber = 1) {
		tourVisibility = 'panel';
		activeScreen = 'tour';
		activeTourId = tourId;
		activeStepNumber = stepNumber;
		tourDismissed = false;
	}

	function showSelector() {
		tourVisibility = 'panel';
		activeScreen = 'selector';
		activeTourId = null;
		activeStepNumber = null;
		tourDismissed = false;
		resetSiteTour();
	}

	function openTourPanel() {
		if (tourVisibility === 'none') {
			showSelector();
			return;
		}

		tourVisibility = 'panel';
	}

	function closeTourPanel() {
		tourVisibility = 'icon';
	}

	function resetJourney(dismissed: boolean) {
		activeTourId = null;
		activeStepNumber = null;
		tourDismissed = dismissed;

		saveSiteTourState({
			version: SITE_TOUR_VERSION,
			tour_id: null,
			step_number: 0,
			dismissed
		});
	}

	function goNext() {
		if (!currentStep) return;
		const nextStep = activeSteps.find((step) => step.step_number === currentStep.step_number + 1);
		if (!nextStep) {
			endTour();
			return;
		}
		activeStepNumber = nextStep.step_number;
	}

	function goPrev() {
		if (!currentStep) return;
		const prevStep = activeSteps.find((step) => step.step_number === currentStep.step_number - 1);
		if (!prevStep) {
			showSelector();
			return;
		}
		activeStepNumber = prevStep.step_number;
	}

	function endTour() {
		tourVisibility = 'panel';
		activeScreen = 'ended';
		activeTourId = null;
		activeStepNumber = null;
		tourDismissed = true;
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

<Container>
	<div class="stdbox stdpad header-margin">
		<p>begin...{tourVisibility} | {activeScreen} | {activeStepNumber}</p>
			{#if tourVisibility === 'panel'}
				<aside class="tour-panel" aria-label="Site Tour" in:fly={{ x: 464, duration: 180 }} out:fly={{ x: 464, duration: 140 }}>
				<div class="tour-card" use:clickOutsideAction={closeTourPanel}>
					{#if activeScreen === 'ended'}
						<div class="row xbetween ycenter top-end borderbot">
							<p class="tag-text tt-u bold white">Tour Ended</p>
							<button class="blank" onclick={closeTourPanel}><Close size={28} color="#FFFFFF"/></button>
						</div>
						<div class="mid-area box textbox">
							<p class="rem1 pbot16 borderbot">We hope this tour helped you discover areas of our website relevant to you. Restart this tour any time from 'Site Tour' link in the footer.</p>
							<button class="small-button themed"  style="margin-top: auto" onclick={restartEndedTour}>Restart</button>
						</div>
						<div class="row cgap16 self-bottom ycenter bordertop">
								<p class="descriptor-text tight white">Click outside or press 'Esc' to close. Re-open this tour anytime with the icon at bottom-right screen corner, or through the 'Site Tour' link in the footer.</p>
						</div>
					{/if}
					{#if activeScreen === 'selector'}
						<div class="row xbetween ycenter top-end borderbot">
							<p class="tag-text tt-u bold white">{startScreen?.page_type}</p>
							<button class="blank" onclick={closeTourPanel}><Close size={28} color="#FFFFFF"/></button>
						</div>
						<div class="mid-area textbox">
							<p class="rem1 bold tight">{startScreen?.route_label ?? 'Namaste'}</p>
							<p class="rem1">{startScreen?.route_text ?? 'This tour is designed to introduce and orient you to our website. Please select your exploration route.'}</p>
							<div class="row cgap16 ycenter">
								<button class="newbutton" onclick={() => startTour('work_first')} ><span class="button-decor"></span><div class="button-content"><span class="button__text">{startScreen?.next_button_label ?? 'Our Work'}</span></div></button>
								<button class="newbutton" onclick={() => startTour('content_first')}
									><span class="button-decor"></span>
									<div class="button-content"><span class="button__text">{startScreen?.secondary_button_label ?? 'Content'}</span></div></button>
							</div>
						</div>
						<div class="row cgap16 self-bottom ycenter bordertop">
							<p class="descriptor-text tight white">Click outside or press 'Esc' to close. Re-open this tour anytime with the icon at bottom-right screen corner, or through the 'Site Tour' link in the footer.</p>
						</div>
					{:else if currentStep}
						<div class="row xbetween ycenter top-end borderbot">
							<p class="tag-text tt-u bold white">{currentStep.page_type}
							| Step {currentStep.step_number} of {activeSteps.length}</p>
							<button class="blank" onclick={closeTourPanel}><Close size={28} color="#FFFFFF"/></button>
						</div>
						<div class="mid-area textbox">
							<p class="paragraph-text bold">{currentStep.route_label}</p>
							{#if currentStep.route_secondary !== ""}
							<p class="rem1">{currentStep.route_text}</p>
							<p class="rem1">{currentStep.route_secondary}</p>
							{:else}
							<p class="rem1 pbot16 borderbot">{currentStep.route_text}</p>
							{/if}
							<div class="box rgap4">
								<p class="tag-text tt-u grey">next</p>
								<button class="blankbutton" onclick={goNext}>{currentStep.next_button_label} <span class="blue bold">→</span></button>
							</div>
							<div class="row cgap16 bordertop ptop16" style="margin-top: auto">
							<button class="small-button themed" onclick={goPrev}>Previous</button>
							<button class="small-button themed" onclick={endTour}>End</button>
							<button class="small-button themed" onclick={showSelector}>Restart</button>
							</div>
						</div>
						<div class="row cgap16 self-bottom ycenter bordertop">
							<p class="descriptor-text tight white">Click outside or press 'Esc' to close. Re-open this tour anytime with the icon at bottom-right screen corner, or through the 'Site Tour' link in the footer.</p>
						</div>
					{/if}
				</div>
				</aside>
			{:else if tourVisibility === 'icon'}
				<button class="blank with-tooltip" aria-label="Open Site Tour" onclick={openTourPanel}><Icon/>
					<span class="tooltip" role="tooltip">
						Open Site Tour
					</span>
				</button>
			{/if}
	</div>
</Container>

<style lang="sass">

button.blank.with-tooltip
	position: fixed
	right: 2rem
	bottom: 2rem
	z-index: 2000

.tour-panel
	position: fixed
	height: 100vh
	width: 464px
	top: 0
	right: 0
	display: flex
	flex-direction: column
	align-items: center
	justify-content: center
	z-index: 999
	backdrop-filter: blur(20px)
	background: rgba(0,0,0,0.1)

.tour-card
	border: var(--border-dark)
	width: 400px
	height: 600px
	box-shadow: 3px 2px 16px rgba(0,0,0,0.1)
	border-radius: 4px
	background: #FFFFFF
	overflow: hidden
	.top-end
		padding: 1rem
		height: 48px
		background: var(--color-theme-2)
	.mid-area
		margin-left: 1rem
		margin-right: 1rem
		height: calc(100% - 144px)
		border-left: var(--border-dark)
		border-right: var(--border-dark)
		padding: 1rem
	.self-bottom
		padding: 1rem
		height: 96px
		background: var(--color-theme-2)

</style>
