<script lang="ts">
	import type { HeritageSite } from '$lib/utils/map-sites';
	import { sites as defaultSites } from '$lib/utils/map-sites';

	interface Props {
		sites?: HeritageSite[];
	}

	let { sites = defaultSites }: Props = $props();

	let activeId: string | null = $state(null);
	let hoverId: string | null = $state(null);

	const active = $derived<HeritageSite | null>(
		sites.find((s) => s.id === activeId) ?? null
	);

	// Map projection bounds (lon/lat to SVG x/y)
	const LON_MIN = 71.6;
	const LON_MAX = 73.6;
	const LAT_MIN = 22.8;
	const LAT_MAX = 24.6;
	const W = 1000;
	const H = 900;

	function project(lat: number, lon: number): { x: number; y: number } {
		const x = ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * W;
		const y = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * H;
		return { x, y };
	}

	function handleSelect(id: string): void {
		activeId = activeId === id ? null : id;
	}

	function handleKey(e: KeyboardEvent, id: string): void {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			handleSelect(id);
		}
	}

	const refCities: { name: string; lat: number; lon: number }[] = [
		{ name: 'Ahmedabad', lat: 23.0225, lon: 72.5714 },
		{ name: 'Mehsana', lat: 23.588, lon: 72.369 },
		{ name: 'Palanpur', lat: 24.171, lon: 72.434 }
	];
</script>

<figure class="ghm">
	<div class="ghm-map-wrap">
		<svg
			viewBox="0 0 {W} {H}"
			xmlns="http://www.w3.org/2000/svg"
			role="img"
			aria-labelledby="ghm-title ghm-desc"
		>
			<title id="ghm-title">Heritage sites of northern Gujarat</title>
			<desc id="ghm-desc"
				>An ink-on-paper map showing 13 heritage temple and stepwell sites across northern
				Gujarat, including Rani ki Vav, Modhera Sun Temple, and the Solanki-era cluster
				around Patan and Mehsana.</desc
			>

			<rect x="0" y="0" width={W} height={H} fill="var(--ghm-paper)" />

			<!-- Aravalli range hint (eastern edge) -->
			<g class="ghm-hills" stroke="var(--ghm-ink-faint)" stroke-width="0.7" fill="none">
				<path d="M 820 90 Q 835 78 850 90 Q 865 78 880 90 Q 895 78 910 90" />
				<path d="M 850 125 Q 865 113 880 125 Q 895 113 910 125 Q 925 113 940 125" />
				<path d="M 880 165 Q 895 153 910 165 Q 925 153 940 165" />
				<path d="M 905 215 Q 920 203 935 215 Q 950 203 965 215" />
				<path d="M 925 265 Q 940 253 955 265" />
			</g>
			<text x="940" y="75" class="ghm-region-label" text-anchor="end">Aravalli</text>

			<!-- Saraswati river -->
			<path
				d="M 950 280 Q 850 290 750 310 Q 600 340 450 360 Q 350 370 250 380 Q 180 385 120 400"
				fill="none"
				stroke="var(--ghm-water)"
				stroke-width="1.2"
				opacity="0.55"
			/>
			<text x="180" y="395" class="ghm-river-label">Sarasvati</text>

			<!-- Sabarmati river -->
			<path
				d="M 760 80 Q 720 200 680 320 Q 640 440 580 560 Q 520 680 440 800 Q 380 870 320 900"
				fill="none"
				stroke="var(--ghm-water)"
				stroke-width="1.2"
				opacity="0.55"
			/>
			<text x="600" y="555" class="ghm-river-label" transform="rotate(58 600 555)"
				>Sabarmati</text
			>

			<!-- Rann of Kutch hint -->
			<g opacity="0.5">
				<text x="100" y="800" class="ghm-region-label">Towards Rann</text>
				<path
					d="M 60 815 Q 100 818 140 815"
					fill="none"
					stroke="var(--ghm-ink-faint)"
					stroke-width="0.5"
					stroke-dasharray="1 4"
				/>
			</g>

			<!-- Compass rose -->
			<g transform="translate(920, 820)" class="ghm-compass">
				<circle cx="0" cy="0" r="28" fill="none" stroke="var(--ghm-ink-faint)" stroke-width="0.6" />
				<path d="M 0 -22 L 4 0 L 0 22 L -4 0 Z" fill="var(--ghm-ink)" />
				<path
					d="M -22 0 L 0 4 L 22 0 L 0 -4 Z"
					fill="none"
					stroke="var(--ghm-ink)"
					stroke-width="0.6"
				/>
				<text x="0" y="-32" class="ghm-compass-label" text-anchor="middle">N</text>
			</g>

			<!-- Scale bar -->
			<g transform="translate(60, 850)" class="ghm-scale">
				<line x1="0" y1="0" x2="111" y2="0" stroke="var(--ghm-ink)" stroke-width="1" />
				<line x1="0" y1="-4" x2="0" y2="4" stroke="var(--ghm-ink)" stroke-width="1" />
				<line x1="55.5" y1="-3" x2="55.5" y2="3" stroke="var(--ghm-ink)" stroke-width="0.8" />
				<line x1="111" y1="-4" x2="111" y2="4" stroke="var(--ghm-ink)" stroke-width="1" />
				<text x="0" y="18" class="ghm-scale-label">0</text>
				<text x="55.5" y="18" class="ghm-scale-label" text-anchor="middle">25</text>
				<text x="111" y="18" class="ghm-scale-label" text-anchor="middle">50 km</text>
			</g>

			<!-- City reference dots -->
			<g class="ghm-cities">
				{#each refCities as c (c.name)}
					{@const p = project(c.lat, c.lon)}
					{#if p.x > 0 && p.x < W && p.y > 0 && p.y < H}
						<circle cx={p.x} cy={p.y} r="2" fill="var(--ghm-ink-faint)" />
						<text x={p.x + 6} y={p.y + 4} class="ghm-city-label">{c.name}</text>
					{/if}
				{/each}
			</g>

			<!-- Site pins -->
			<g class="ghm-pins">
				{#each sites as site (site.id)}
					{@const p = project(site.lat, site.lon)}
					{@const isActive = activeId === site.id}
					{@const isHover = hoverId === site.id}
					<g
						class="ghm-pin"
						class:active={isActive}
						class:hover={isHover}
						transform="translate({p.x}, {p.y})"
						role="button"
						tabindex="0"
						aria-label={site.name + ', ' + site.place}
						aria-pressed={isActive}
						onclick={() => handleSelect(site.id)}
						onkeydown={(e: KeyboardEvent) => handleKey(e, site.id)}
						onmouseenter={() => (hoverId = site.id)}
						onmouseleave={() => (hoverId = null)}
						onfocus={() => (hoverId = site.id)}
						onblur={() => (hoverId = null)}
					>
						<circle class="ghm-pin-halo" r={isActive ? 18 : 12} />
						<circle class="ghm-pin-dot" r={isActive ? 6 : 4.5} />
						<circle class="ghm-pin-inner" r="1.5" />
						{#if isHover || isActive}
							<g transform="translate(10, -8)">
								<text class="ghm-pin-label">{site.name}</text>
								<text class="ghm-pin-sublabel" y="14">{site.place}</text>
							</g>
						{/if}
					</g>
				{/each}
			</g>
		</svg>
	</div>

	<div class="ghm-card-region" aria-live="polite">
		{#if active}
			<article class="ghm-card">
				<header class="ghm-card-head">
					<div>
						<h3>{active.name}</h3>
						<p class="ghm-card-place">{active.place}</p>
					</div>
					<button
						type="button"
						class="ghm-close"
						onclick={() => (activeId = null)}
						aria-label="Close details"
					>
						<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
							<path
								d="M3 3 L13 13 M13 3 L3 13"
								stroke="currentColor"
								stroke-width="1.4"
								stroke-linecap="round"
								fill="none"
							/>
						</svg>
					</button>
				</header>
				<div class="ghm-card-body">
					{#if active.description}
						<p>{active.description}</p>
					{:else}
						<p class="ghm-placeholder">
							[ Description for {active.name} goes here. Edit the
							<code>description</code> field in <code>sites.ts</code>. ]
						</p>
					{/if}
				</div>
			</article>
		{:else}
			<p class="ghm-hint">Select a site on the map to read about it.</p>
		{/if}
	</div>
</figure>

<style>
	.ghm {
		--ghm-paper: #f4f0e6;
		--ghm-ink: #1a1814;
		--ghm-ink-soft: #4a4540;
		--ghm-ink-faint: #8a8278;
		--ghm-water: #2a3540;
		--ghm-card-bg: #faf6ec;
		--ghm-card-border: #2a2620;

		margin: 0;
		font-family:
			'EB Garamond',
			'Cormorant Garamond',
			Georgia,
			'Times New Roman',
			serif;
		color: var(--ghm-ink);
		max-width: 1100px;
		width: 100%;
	}

	@media (prefers-color-scheme: dark) {
		.ghm {
			--ghm-paper: #1a1814;
			--ghm-ink: #e8e2d4;
			--ghm-ink-soft: #b8b0a0;
			--ghm-ink-faint: #6a655c;
			--ghm-water: #6a8090;
			--ghm-card-bg: #221f19;
			--ghm-card-border: #4a4540;
		}
	}

	.ghm-map-wrap {
		width: 100%;
		background: var(--ghm-paper);
		border: 1px solid var(--ghm-ink-faint);
		border-radius: 2px;
		overflow: hidden;
		position: relative;
	}

	.ghm-map-wrap svg {
		display: block;
		width: 100%;
		height: auto;
	}

	.ghm-region-label,
	.ghm-river-label {
		font-family: 'EB Garamond', Georgia, serif;
		font-style: italic;
		font-size: 14px;
		fill: var(--ghm-ink-faint);
		letter-spacing: 0.08em;
	}

	.ghm-river-label {
		fill: var(--ghm-water);
		opacity: 0.75;
	}

	.ghm-city-label {
		font-family: 'EB Garamond', Georgia, serif;
		font-size: 13px;
		fill: var(--ghm-ink-soft);
		letter-spacing: 0.04em;
	}

	.ghm-compass-label,
	.ghm-scale-label {
		font-family: 'EB Garamond', Georgia, serif;
		font-size: 11px;
		fill: var(--ghm-ink-soft);
		letter-spacing: 0.05em;
	}

	.ghm-pin {
		cursor: pointer;
		outline: none;
	}

	.ghm-pin-halo {
		fill: var(--ghm-paper);
		stroke: var(--ghm-ink);
		stroke-width: 0.8;
		opacity: 0;
		transition:
			opacity 200ms ease,
			r 200ms ease;
	}

	.ghm-pin.hover .ghm-pin-halo,
	.ghm-pin.active .ghm-pin-halo {
		opacity: 1;
	}

	.ghm-pin-dot {
		fill: var(--ghm-ink);
		stroke: var(--ghm-paper);
		stroke-width: 1.2;
		transition: r 200ms ease;
	}

	.ghm-pin-inner {
		fill: var(--ghm-paper);
		opacity: 0;
		transition: opacity 200ms ease;
	}

	.ghm-pin.active .ghm-pin-inner {
		opacity: 1;
	}

	.ghm-pin:focus-visible .ghm-pin-halo {
		opacity: 1;
		stroke-width: 1.5;
		stroke-dasharray: 2 2;
	}

	.ghm-pin-label {
		font-family: 'EB Garamond', Georgia, serif;
		font-size: 14px;
		font-weight: 500;
		fill: var(--ghm-ink);
		paint-order: stroke;
		stroke: var(--ghm-paper);
		stroke-width: 4px;
		stroke-linejoin: round;
	}

	.ghm-pin-sublabel {
		font-family: 'EB Garamond', Georgia, serif;
		font-size: 11px;
		font-style: italic;
		fill: var(--ghm-ink-soft);
		paint-order: stroke;
		stroke: var(--ghm-paper);
		stroke-width: 3px;
		stroke-linejoin: round;
	}

	.ghm-card-region {
		margin-top: 1.25rem;
		min-height: 1.5rem;
	}

	.ghm-hint {
		margin: 0;
		padding: 0.75rem 0;
		font-style: italic;
		color: var(--ghm-ink-soft);
		font-size: 0.95rem;
		text-align: center;
	}

	.ghm-card {
		background: var(--ghm-card-bg);
		border: 1px solid var(--ghm-card-border);
		border-radius: 2px;
		padding: 1.25rem 1.5rem 1.5rem;
		animation: ghm-fade 280ms ease;
	}

	@keyframes ghm-fade {
		from {
			opacity: 0;
			transform: translateY(-4px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.ghm-card-head {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
		border-bottom: 1px solid var(--ghm-ink-faint);
		padding-bottom: 0.6rem;
		margin-bottom: 0.85rem;
	}

	.ghm-card-head h3 {
		margin: 0 0 0.15rem;
		font-family: 'EB Garamond', Georgia, serif;
		font-size: 1.5rem;
		font-weight: 500;
		letter-spacing: 0.01em;
		color: var(--ghm-ink);
	}

	.ghm-card-place {
		margin: 0;
		font-style: italic;
		font-size: 0.95rem;
		color: var(--ghm-ink-soft);
		letter-spacing: 0.03em;
	}

	.ghm-close {
		flex-shrink: 0;
		width: 28px;
		height: 28px;
		border: 1px solid var(--ghm-ink-faint);
		background: transparent;
		color: var(--ghm-ink);
		border-radius: 2px;
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		transition:
			background 150ms ease,
			border-color 150ms ease;
	}

	.ghm-close:hover {
		background: var(--ghm-paper);
		border-color: var(--ghm-ink);
	}

	.ghm-card-body p {
		margin: 0;
		font-size: 1rem;
		line-height: 1.7;
		color: var(--ghm-ink);
	}

	.ghm-placeholder {
		font-style: italic;
		color: var(--ghm-ink-soft) !important;
	}

	.ghm-placeholder code {
		font-family: 'JetBrains Mono', 'Fira Code', monospace;
		font-style: normal;
		font-size: 0.85em;
		padding: 0.1em 0.35em;
		background: var(--ghm-paper);
		border-radius: 2px;
	}

	@media (max-width: 600px) {
		.ghm-pin-label {
			font-size: 12px;
		}
		.ghm-pin-sublabel {
			font-size: 10px;
		}
		.ghm-card {
			padding: 1rem 1.1rem 1.2rem;
		}
		.ghm-card-head h3 {
			font-size: 1.25rem;
		}
	}
</style>