import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const storedMenuState = browser ? JSON.parse(localStorage.getItem('menuState') || 'false') : false;
export const menuState = writable(storedMenuState);
export function toggleMenuState() {
	if (browser) {
		menuState.update((mode) => {
			const newMode = !mode;
			localStorage.setItem('menuState', JSON.stringify(newMode));
			return newMode;
		});
	}
}

export const searchState = writable(false);
export function toggleSearch() {
	searchState.update((mode) => !mode);
}

export const readerChromeHidden = writable(false);

export const libraryMenu = writable(false)
export function toggleLibraryMenu(){
	libraryMenu.update((mode) => !mode);
}

const storedDarkTheme = browser ? JSON.parse(localStorage.getItem('darkTheme') || 'false') : false;
export const darkTheme = writable(storedDarkTheme);
export function toggleTheme() {
	if (browser) {
		darkTheme.update((mode) => {
			const newMode = !mode;
			localStorage.setItem('darkTheme', JSON.stringify(newMode));
			return newMode;
		});
	}
}

export const iW = writable(false)

export type SiteTourId = 'work_first' | 'content_first';

export type SiteTourState = {
	version: number;
	tour_id: SiteTourId | null;
	step_number: number | null;
	dismissed: boolean;
};

export const SITE_TOUR_VERSION = 1;
export const SITE_TOUR_STORAGE_KEY = 'bodha_site_tour_state';

export function createDefaultSiteTourState(): SiteTourState {
	return {
		version: SITE_TOUR_VERSION,
		tour_id: null,
		step_number: null,
		dismissed: false
	};
}

function isSiteTourId(value: unknown): value is SiteTourId {
	return value === 'work_first' || value === 'content_first';
}

export function loadSiteTourState(): SiteTourState {
	if (!browser) return createDefaultSiteTourState();

	const rawState = localStorage.getItem(SITE_TOUR_STORAGE_KEY);
	if (!rawState) return createDefaultSiteTourState();

	try {
		const parsed = JSON.parse(rawState) as Partial<SiteTourState>;

		if (parsed.version !== SITE_TOUR_VERSION) {
			localStorage.removeItem(SITE_TOUR_STORAGE_KEY);
			return createDefaultSiteTourState();
		}

		return {
			version: SITE_TOUR_VERSION,
			tour_id: isSiteTourId(parsed.tour_id) ? parsed.tour_id : null,
			step_number:
				typeof parsed.step_number === 'number' && parsed.step_number > 0
					? parsed.step_number
					: null,
			dismissed: parsed.dismissed === true
		};
	} catch {
		localStorage.removeItem(SITE_TOUR_STORAGE_KEY);
		return createDefaultSiteTourState();
	}
}

export function saveSiteTourState(state: SiteTourState) {
	if (!browser) return;

	localStorage.setItem(
		SITE_TOUR_STORAGE_KEY,
		JSON.stringify({
			version: SITE_TOUR_VERSION,
			tour_id: state.tour_id,
			step_number: state.step_number,
			dismissed: state.dismissed
		})
	);
}

export function saveSiteTourProgress(tourId: SiteTourId, stepNumber: number) {
	saveSiteTourState({
		version: SITE_TOUR_VERSION,
		tour_id: tourId,
		step_number: stepNumber,
		dismissed: false
	});
}

export function dismissSiteTour() {
	saveSiteTourState({
		version: SITE_TOUR_VERSION,
		tour_id: null,
		step_number: null,
		dismissed: true
	});
}
