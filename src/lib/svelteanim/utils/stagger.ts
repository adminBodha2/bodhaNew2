export type StaggerPattern =
	| 'linear'      // 0, 1, 2, 3 … equal spacing
	| 'center-out'  // middle items first, edges last
	| 'edges-in'    // edge items first, middle last
	| 'random';     // seeded pseudo-random order (reproducible across SSR/client)

export interface StaggerOptions {
	/** Delay increment between items in ms. Default: 80 */
	delay?: number;
	/** Distribution pattern. Default: 'linear' */
	pattern?: StaggerPattern;
	/**
	 * Total number of items in the group.
	 * Required for 'center-out' and 'edges-in'. Ignored for 'linear'.
	 */
	count?: number;
	/**
	 * Seed for the 'random' pattern. Same seed = same order every render.
	 * Default: 1
	 */
	seed?: number;
	/**
	 * Cap the maximum delay so a large group doesn't take forever to finish.
	 * e.g. max: 600 means items beyond that point all animate together.
	 */
	max?: number;
}

/**
 * Returns the delay in milliseconds for item at `index` based on the chosen
 * stagger pattern. Pass the result directly to any animation component's
 * `delay` prop.
 *
 * Does not produce a component — it composes with everything via `delay`:
 *
 * @example
 * ```svelte
 * {#each cards as card, i}
 *   <Scale visible={inView} delay={stagger(i, { delay: 80, pattern: 'center-out', count: cards.length })}>
 *     <Card {card} />
 *   </Scale>
 * {/each}
 * ```
 *
 * Patterns:
 * - `linear`     — 0 ms, 80 ms, 160 ms … standard cascade
 * - `center-out` — middle items animate first, edges last; good for balanced grids
 * - `edges-in`   — edge items animate first, center last; creates a "closing" feel
 * - `random`     — seeded shuffle so order is unpredictable but consistent across renders
 */
export function stagger(index: number, options: StaggerOptions = {}): number {
	const { delay = 80, pattern = 'linear', count, seed = 1, max } = options;

	let result: number;

	switch (pattern) {
		case 'linear': {
			result = index * delay;
			break;
		}

		case 'center-out': {
			// Distance from center → further = later
			const n = count ?? 10;
			const center = (n - 1) / 2;
			result = Math.abs(index - center) * delay;
			break;
		}

		case 'edges-in': {
			// Distance from center → further = earlier (inverted center-out)
			const n = count ?? 10;
			const center = (n - 1) / 2;
			const maxDist = Math.ceil(center);
			result = (maxDist - Math.abs(index - center)) * delay;
			break;
		}

		case 'random': {
			// Seeded LCG so the order is unpredictable but identical on every render,
			// including SSR. No Math.random() involved.
			result = seededRandom(seed * 9301 + index * 49297) * (count ?? 10) * delay;
			break;
		}

		default: {
			result = index * delay;
		}
	}

	return max !== undefined ? Math.min(result, max) : result;
}

/**
 * Deterministic pseudo-random value in [0, 1) from an integer seed.
 * Uses a simple but well-distributed hash — good enough for visual staggering.
 */
function seededRandom(seed: number): number {
	// Wang hash
	let s = seed;
	s = (s ^ 61) ^ (s >>> 16);
	s = Math.imul(s, 9);
	s ^= s >>> 4;
	s = Math.imul(s, 0x27d4eb2d);
	s ^= s >>> 15;
	// Bring to unsigned, then normalise to [0, 1)
	return ((s >>> 0) / 0xffffffff);
}
