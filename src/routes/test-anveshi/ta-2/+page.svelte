<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import Container from '$lib/comps/wrapper.svelte';
	import tourStepsJson from '$lib/serving/site-tour.json';
	import { dismissSiteTour, loadSiteTourState, saveSiteTourProgress, type SiteTourId } from '$lib/utils/globalstores';

	type TourScreen = 'hidden' | 'selector' | 'tour' | 'ended';

	type TourStep = {
		tour_id: SiteTourId;
		step_number: number;
		step_type: 'route' | 'decision';
		route_label: string;
		route_path: string;
		anchor: string;
		route_text: string;
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
	let activeScreen = $state<TourScreen>('selector');
	let activeTourId = $state<SiteTourId | null>(null);
	let activeStepNumber = $state<number | null>(null);
	let tourDismissed = $state(false);
	let siteTourStateLoaded = $state(false);
	let hideEndedTimer: ReturnType<typeof setTimeout> | null = null;

	const activeSteps = $derived(activeTourId ? tourSteps.filter((step) => step.tour_id === activeTourId).sort((a, b) => a.step_number - b.step_number) : []);

	const currentStep = $derived(activeStepNumber === null ? null : (activeSteps.find((step) => step.step_number === activeStepNumber) ?? null));

	onMount(() => {
		const savedState = loadSiteTourState();
		tourDismissed = savedState.dismissed;
		activeScreen = savedState.dismissed ? 'hidden' : 'selector';
		const savedStepExists = tourSteps.some((step) => step.tour_id === savedState.tour_id && step.step_number === savedState.step_number);
		if (savedState.tour_id && savedState.step_number && savedStepExists) {
			activeScreen = 'tour';
			activeTourId = savedState.tour_id;
			activeStepNumber = savedState.step_number;
			tourDismissed = false;
		}
		siteTourStateLoaded = true;
	});

	onDestroy(() => {
		clearHideEndedTimer();
	});

	$effect(() => {
		if (!siteTourStateLoaded || !activeTourId || activeStepNumber === null) return;
		saveSiteTourProgress(activeTourId, activeStepNumber);
	});

	function startTour(tourId: SiteTourId, stepNumber = 1) {
		clearHideEndedTimer();
		activeScreen = 'tour';
		activeTourId = tourId;
		activeStepNumber = stepNumber;
		tourDismissed = false;
	}

	function showSelector() {
		clearHideEndedTimer();
		activeScreen = 'selector';
		activeTourId = null;
		activeStepNumber = null;
		tourDismissed = false;
	}

	function hideTour() {
		clearHideEndedTimer();
		activeScreen = 'hidden';
		activeTourId = null;
		activeStepNumber = null;
	}

	function clearHideEndedTimer() {
		if (!hideEndedTimer) return;

		clearTimeout(hideEndedTimer);
		hideEndedTimer = null;
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
		clearHideEndedTimer();
		activeScreen = 'ended';
		activeTourId = null;
		activeStepNumber = null;
		tourDismissed = true;
		dismissSiteTour();
		hideEndedTimer = setTimeout(() => {
			activeScreen = 'hidden';
			hideEndedTimer = null;
		}, 3000);
	}
</script>

<Container>
	<div class="stdbox stdpad header-margin">
		<p>begin...</p>
		<div class="grid two">
			{#if activeScreen !== 'hidden'}
				<div class="tour-card">
					{#if activeScreen === 'ended'}
						<p class="top-end tag-text altprim tt-u bold borderbot">Tour ended</p>
						<div class="mid-area box elembox">
							<p>Restart this tour any time from Site Tour link in the footer.</p>
							<button class="newbutton" onclick={showSelector}
								><span class="button-decor"></span>
								<div class="button-content"><span class="button__text">Restart</span></div></button>
							<div class="self-bottom">
								<button onclick={showSelector}>Restart</button>
								<button onclick={hideTour}>Close</button>
							</div>
						</div>
					{/if}
					{#if activeScreen === 'selector'}
						<p class="top-end tag-text altprim tt-u bold borderbot"><span class="grey">BODHA SITE TOUR</span></p>
						<div class="mid-area textbox">
							<p class="highlight-text bold">{startScreen?.route_label ?? 'Namaste'}</p>
							<p>{startScreen?.route_text ?? 'This tour is designed to introduce and orient you to our website. Please select your exploration route.'}</p>
							<div class="row cgap16 ycenter">
								<button class="newbutton" onclick={() => startTour('work_first')}
									><span class="button-decor"></span>
									<div class="button-content"><span class="button__text">{startScreen?.next_button_label ?? 'Our Work'}</span></div></button>
								<button class="newbutton" onclick={() => startTour('content_first')}
									><span class="button-decor"></span>
									<div class="button-content"><span class="button__text">{startScreen?.secondary_button_label ?? 'Content'}</span></div></button>
							</div>
							<div class="row cgap16 self-bottom ycenter">
								<button class="small-button" onclick={showSelector}>Restart</button>
							</div>
						</div>
					{:else if currentStep}
						<p class="top-end tag-text altprim tt-u bold borderbot">
							<span class="grey"
								>{#if currentStep.tour_id === 'work_first'}Explore Our Work{:else}Discover and Learn at Bodha{/if}</span>
							| Step {currentStep.step_number} of {activeSteps.length}
						</p>
						<div class="mid-area box textbox">
							<p class="highlight-text bold">{currentStep.route_label}</p>
							<p>{currentStep.route_text}</p>
							<button class="newbutton" onclick={goNext}
								><span class="button-decor"></span>
								<div class="button-content"><span class="button__text">Next - {currentStep.next_button_label}</span></div></button>
						</div>
						<div class="row cgap16 self-bottom ycenter bordertop">
							<button class="small-button themed" onclick={goPrev}>Previous</button>
							<button class="small-button themed" onclick={endTour}>End</button>
							<button class="small-button themed" onclick={showSelector}>Restart</button>
						</div>
					{/if}
				</div>
			{:else}
				<button onclick={showSelector}>Start</button>
			{/if}
			<div class="admin">
				<p class="descriptor-text">{activeScreen} | {tourDismissed} | {siteTourStateLoaded} | {activeStepNumber} | {activeTourId}</p>
				{#if currentStep}
					<p>
						{currentStep.tour_id}<br />
						{currentStep.step_number}<br />
						{currentStep.step_type}<br />
					</p>
				{/if}
			</div>
		</div>
	</div>
</Container>

<style lang="sass">

.tour-card
	border: var(--border-dark)
	width: 500px
	height: 600px
	box-shadow: 3px 2px 16px rgba(0,0,0,0.1)
	border-radius: 4px
	.top-end
		padding: 1rem
		height: 48px
	.mid-area
		margin-left: 1rem
		margin-right: 1rem
		height: calc(100% - 96px)
		border-left: var(--border-dark)
		border-right: var(--border-dark)
		padding: 1rem
	.self-bottom
		padding: 1rem
		height: 48px

</style>
