// World-only save/load utilities. Persists avatar position, collected pickups,
// and movement mode. Progression (level, forgedLog) is owned by forgeStore.

import { browser } from '$app/environment';
import type { Pickup, MovementMode } from './dhatu-forge-world';

const STORAGE_KEY = 'dhatu-forge-world-save';

export interface WorldSaveData {
	avatarX: number;
	avatarY: number;
	pickups: Pickup[];
	movementMode: MovementMode;
}

export function loadWorldSave(): Partial<WorldSaveData> | null {
	if (!browser) return null;
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return null;
		return JSON.parse(raw) as Partial<WorldSaveData>;
	} catch {
		return null;
	}
}

export function saveWorldSave(data: WorldSaveData): void {
	if (!browser) return;
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
	} catch {
		/* storage full; ignore */
	}
}

export function clearWorldSave(): void {
	if (!browser) return;
	try {
		localStorage.removeItem(STORAGE_KEY);
	} catch {
		/* ignore */
	}
}
