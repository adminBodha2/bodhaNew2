// Shared forge store: canonical progression state for the Dhatu Forge bench and world.
// Reads/writes the localStorage key `dhatu-forge-save`.
// Both /dhatu-forge and /dhatu-forge/world read this store so progression stays in sync.

import { browser } from '$app/environment';
import type { ForgeConfig, Recipe } from './dhatu-forge';

const STORAGE_KEY = 'dhatu-forge-save';

export interface ForgedEntry {
	key: string;
	dhatuId: string;
	prefixId: string;
	name: string;
	derivation: string;
	meaning: string;
	civ: string;
	timestamp: number;
}

export interface ForgeProgress {
	playerLevel: number;
	forgedLog: ForgedEntry[];
}

class ForgeStore {
	playerLevel = $state(1);
	forgedLog = $state<ForgedEntry[]>([]);
	#loaded = false;

	load(): void {
		if (this.#loaded || !browser) return;
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw) {
				const parsed = JSON.parse(raw) as Partial<ForgeProgress>;
				this.playerLevel = parsed.playerLevel ?? 1;
				this.forgedLog = parsed.forgedLog ?? [];
			}
		} catch {
			/* corrupt save; ignore */
		}
		this.#loaded = true;
	}

	save(): void {
		if (!browser) return;
		try {
			const data: ForgeProgress = {
				playerLevel: this.playerLevel,
				forgedLog: this.forgedLog,
			};
			localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
		} catch {
			/* storage full; ignore */
		}
	}

	reset(): void {
		this.playerLevel = 1;
		this.forgedLog = [];
		this.save();
	}

	computeLevel(count: number, thresholds: number[]): number {
		let lvl = 1;
		for (let i = thresholds.length - 1; i >= 0; i--) {
			if (count >= thresholds[i]) {
				lvl = i + 1;
				break;
			}
		}
		return lvl;
	}

	addForged(
		dhatuId: string,
		prefixId: string,
		recipe: Recipe,
		thresholds: number[]
	): { leveledUp: boolean; newLevel: number; entry: ForgedEntry } {
		const key = `${dhatuId}+${prefixId}`;
		const entry: ForgedEntry = {
			key,
			dhatuId,
			prefixId,
			name: recipe.name,
			derivation: recipe.derivation,
			meaning: recipe.meaning,
			civ: recipe.civ,
			timestamp: Date.now(),
		};
		this.forgedLog = [entry, ...this.forgedLog];
		const newLevel = this.computeLevel(this.forgedLog.length, thresholds);
		const leveledUp = newLevel > this.playerLevel;
		if (leveledUp) this.playerLevel = newLevel;
		this.save();
		return { leveledUp, newLevel, entry };
	}

	hasCrafted(key: string): boolean {
		return this.forgedLog.some((e) => e.key === key);
	}
}

export const forgeStore = new ForgeStore();

// Helper: looks up a recipe in the forge config by `dhatuId+prefixId`.
export function findRecipe(
	forgeConfig: ForgeConfig,
	dhatuId: string,
	prefixId: string
): { key: string; recipe: Recipe } | null {
	const key = `${dhatuId}+${prefixId}`;
	const recipe = forgeConfig.recipes[key];
	if (!recipe) return null;
	return { key, recipe };
}
