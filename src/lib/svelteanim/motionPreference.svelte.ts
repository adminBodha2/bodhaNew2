import { get } from 'svelte/store';
import { animState } from '$lib/utils/globalstores';

let scrollAnimationsEnabled = $state(get(animState));

animState.subscribe((enabled) => {
	scrollAnimationsEnabled = enabled;
});

export function areScrollAnimationsDisabled(): boolean {
	return !scrollAnimationsEnabled;
}
