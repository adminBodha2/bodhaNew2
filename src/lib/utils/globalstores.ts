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

const storedAnimState = browser ? JSON.parse(localStorage.getItem('animState') || 'true') : true;
export const animState = writable(storedAnimState);
export function setAnimEnabled(enabled: boolean) {
	animState.set(enabled);

	if (browser) {
		localStorage.setItem('animState', JSON.stringify(enabled));
	}
}
export function toggleAnim() {
	if (browser) {
		animState.update((mode) => {
			const newMode = !mode;
			localStorage.setItem('animState', JSON.stringify(newMode));
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

export const SITE_TOUR_VERSION = 2;
export const SITE_TOUR_STORAGE_KEY = 'bodha_site_tour_state';
export const SITE_VISITOR_STORAGE_KEY = 'bodha_site_visitor_state';
export const SITE_TOUR_OPEN_EVENT = 'bodha:open-site-tour';
export const NEW_USER_VISIT_LIMIT = 5;
const VISIT_SESSION_MS = 30 * 60 * 1000;

export type SiteVisitorState = {
	version: number;
	visit_count: number;
	first_seen_at: string;
	last_seen_at: string;
};

export function createDefaultSiteTourState(): SiteTourState {
	return {
		version: SITE_TOUR_VERSION,
		tour_id: null,
		step_number: 0,
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
				typeof parsed.step_number === 'number' && parsed.step_number >= 0
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

export function resetSiteTour() {
	saveSiteTourState(createDefaultSiteTourState());
}

export function loadVisitorState(): SiteVisitorState | null {
	if (!browser) return null;

	const raw = localStorage.getItem(SITE_VISITOR_STORAGE_KEY);
	if (!raw) return null;

	try {
		const parsed = JSON.parse(raw) as Partial<SiteVisitorState>;

		if (parsed.version !== SITE_TOUR_VERSION) {
			localStorage.removeItem(SITE_VISITOR_STORAGE_KEY);
			return null;
		}

		return {
			version: SITE_TOUR_VERSION,
			visit_count: typeof parsed.visit_count === 'number' ? parsed.visit_count : 0,
			first_seen_at: typeof parsed.first_seen_at === 'string' ? parsed.first_seen_at : new Date().toISOString(),
			last_seen_at: typeof parsed.last_seen_at === 'string' ? parsed.last_seen_at : new Date().toISOString()
		};
	} catch {
		localStorage.removeItem(SITE_VISITOR_STORAGE_KEY);
		return null;
	}
}

export function recordSiteVisit(): SiteVisitorState {
	const now = new Date().toISOString();
	const defaultState: SiteVisitorState = {
		version: SITE_TOUR_VERSION,
		visit_count: 1,
		first_seen_at: now,
		last_seen_at: now
	};

	if (!browser) return defaultState;
	if (isLocalSiteTourPreview()) return defaultState;

	const saved = loadVisitorState();
	const shouldCountVisit =
		!saved || Date.now() - Date.parse(saved.last_seen_at) > VISIT_SESSION_MS;

	const nextState: SiteVisitorState = saved
		? {
				...saved,
				visit_count: shouldCountVisit ? saved.visit_count + 1 : saved.visit_count,
				last_seen_at: now
			}
		: defaultState;

	localStorage.setItem(SITE_VISITOR_STORAGE_KEY, JSON.stringify(nextState));
	return nextState;
}

export function isNewVisitor(visitorState: SiteVisitorState) {
	return visitorState.visit_count <= NEW_USER_VISIT_LIMIT;
}

export function openSiteTourSelector() {
	if (!browser) return;
	window.dispatchEvent(new CustomEvent(SITE_TOUR_OPEN_EVENT));
}

export function isLocalSiteTourPreview() {
	if (!browser) return false;

	return ['localhost', '127.0.0.1', '::1'].includes(window.location.hostname);
}
