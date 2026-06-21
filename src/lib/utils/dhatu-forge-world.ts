// Types for the top-down Dhatu Forge world

import type { ForgeConfig } from './dhatu-forge';

export interface BiomeGate {
	x: number;
	label: string;
}

export interface BiomeForge {
	x: number;
	y: number;
}

export interface Biome {
	id: number;
	name: string;
	level: number;
	x: number;
	width: number;
	color: string;
	accent: string;
	dhatuIds: string[];
	prefixIds: string[];
	forge: BiomeForge;
	gate: BiomeGate | null;
}

export interface WorldConfig {
	title: string;
	width: number;
	height: number;
	startPosition: { x: number; y: number };
	biomes: Biome[];
}

export type PickupType = 'dhatu' | 'prefix';

export interface Pickup {
	id: string;             // unique key, e.g. "dhatu:dhr" or "prefix:sam"
	biomeId: number;
	type: PickupType;
	refId: string;          // dhatu.id or prefix.id
	x: number;
	y: number;
	collected: boolean;
}

export type MovementMode = 'grid' | 'free';

export interface WorldSave {
	avatarX: number;
	avatarY: number;
	pickups: Pickup[];      // all pickups, with collected flag
	movementMode: MovementMode;
}

export interface AvatarPosition {
	x: number;
	y: number;
}

export type { ForgeConfig };
