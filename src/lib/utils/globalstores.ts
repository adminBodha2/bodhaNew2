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
