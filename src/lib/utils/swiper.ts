// swiper.ts
import { browser } from '$app/environment';
import { register } from 'swiper/element/bundle';

let registered = false;

export function registerSwiper() {
	if (browser && !registered) {
		register();
		registered = true;
	}
}