import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const storedMenuState = browser ? JSON.parse(localStorage.getItem('menuState') || 'false') : false;
export const menuState = writable(storedMenuState);
export function toggleMenuState(){
  if (browser) {
    menuState.update((mode) => {
      const newMode = !mode;
      localStorage.setItem('menuState', JSON.stringify(newMode));
      return newMode;
    })
  }
}

const storedSearchState = browser ? JSON.parse(localStorage.getItem('searchState') || 'false') : false;
export const searchState = writable(storedSearchState);
export function toggleSearch(){
  if (browser) {
    searchState.update((mode) => {
      const newMode = !mode;
      localStorage.setItem('searchState', JSON.stringify(newMode));
      return newMode;
    })
  }
}