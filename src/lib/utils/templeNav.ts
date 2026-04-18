import { writable, get } from 'svelte/store';
import { onMount, onDestroy } from 'svelte';
import { iW } from './globalstores';
import { browser } from '$app/environment';


export function createTempleNav(
	getTemps: () => any[],
	getReady: () => boolean,
	allIndex = 30
) {
	const initial = Array(allIndex + 1).fill(false);
	initial[allIndex] = true;
	const selectedTemple = writable<boolean[]>(initial);

	function toggleTemple(index: number) {
		selectedTemple.update((prev) => {
			const next = [...prev];
			next[index] = !next[index];
			for (let i = 0; i < next.length; i++) {
				if (i !== index) next[i] = false;
			}
			return next;
		});
	}

	let touchStartX = 0;

	function handleKeydown(e: KeyboardEvent) {
		const temps = getTemps();
		const ready = getReady();
		if (!temps || !ready) return;
		if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
		e.preventDefault();

		const sel = get(selectedTemple);
		const current = sel[allIndex] ? -1 : sel.findIndex((v, i) => i < temps.length && v);

		if (e.key === 'ArrowRight') {
			if (current === -1) toggleTemple(0);
			else if (current === temps.length - 1) toggleTemple(allIndex);
			else toggleTemple(current + 1);
		} else {
			if (current === -1) toggleTemple(temps.length - 1);
			else if (current === 0) toggleTemple(allIndex);
			else toggleTemple(current - 1);
		}
	}

	function handleTouchStart(e: TouchEvent) {
		touchStartX = e.touches[0].clientX;
	}

	function handleTouchEnd(e: TouchEvent) {
		if (!getTemps() || !getReady()) return;
		if (!get(iW)) return;
		const dx = e.changedTouches[0].clientX - touchStartX;
		if (Math.abs(dx) < 40) return;
		handleKeydown({ key: dx < 0 ? 'ArrowRight' : 'ArrowLeft', preventDefault: () => {} } as KeyboardEvent);
	}

	onMount(() => {
		if (!browser) return;
	
		window.addEventListener('keydown', handleKeydown);
	
		return () => {
			window.removeEventListener('keydown', handleKeydown);
		};
	});

	return { selectedTemple, toggleTemple, handleTouchStart, handleTouchEnd };
}
