<svelte:options runes={true} />

<script lang="ts">
	import { onMount } from 'svelte';
	import type { GeoJSONSource, Map as MapLibreMap } from 'maplibre-gl';
	import type { FeatureCollection } from 'geojson';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import temples from '$lib/serving/temples-latlongs.json';

	type Temple = {
		name: string;
		slug: string;
		state: string;
		latitude: number | null;
		longitude: number | null;
	};

	type TempleWithCoordinates = Temple & {
		latitude: number;
		longitude: number;
	};

	type TempleFeature = {
		type: 'Feature';
		geometry: {
			type: 'Point';
			coordinates: [number, number];
		};
		properties: {
			name: string;
			slug: string;
			state: string;
			color: string;
		};
	};

	type TempleFeatureCollection = {
		type: 'FeatureCollection';
		features: TempleFeature[];
	};

	const CARTO_DARK_TILES = [
		'https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
		'https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
		'https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
		'https://d.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
	];

	const INDIA_BOUNDARY_SOURCE = '/maps/india-boundary.geojson';
	const EMPTY_BOUNDARY: FeatureCollection = {
		type: 'FeatureCollection',
		features: []
	};

	const STATE_COLORS: Record<string, string> = {
		'Andaman and Nicobar Islands': '#26a69a',
		'Andhra Pradesh': '#ef5350',
		'Arunachal Pradesh': '#7e57c2',
		Assam: '#66bb6a',
		Bihar: '#ffa726',
		Chandigarh: '#8d6e63',
		Chhattisgarh: '#78909c',
		'Dadra and Nagar Haveli and Daman and Diu': '#ab47bc',
		Delhi: '#f7c948',
		Gujarat: '#42a5f5',
		Haryana: '#d4e157',
		'Himachal Pradesh': '#29b6f6',
		'Jammu and Kashmir': '#ec407a',
		Jharkhand: '#ff7043',
		Karnataka: '#26c6da',
		Kerala: '#9ccc65',
		Lakshadweep: '#5c6bc0',
		'Madhya Pradesh': '#ffca28',
		Maharashtra: '#ff6b35',
		Manipur: '#7986cb',
		Mizoram: '#4db6ac',
		Nagaland: '#aed581',
		'Not Identified': '#8b8078',
		Odisha: '#e91e63',
		Puducherry: '#ba68c8',
		Punjab: '#ffd54f',
		Rajasthan: '#ff8a65',
		Sikkim: '#81c784',
		'Tamil Nadu': '#4fc3f7',
		Telangana: '#a1887f',
		Tripura: '#80cbc4',
		'Uttar Pradesh': '#fff176',
		Uttarakhand: '#90caf9',
		'West Bengal': '#ce93d8'
	};

	let mapEl: HTMLDivElement;
	let maplibre: typeof import('maplibre-gl') | undefined;
	let map = $state<MapLibreMap | undefined>(undefined);
	let activePopup: InstanceType<typeof import('maplibre-gl').Popup> | undefined;
	let filterOpen = $state(false);
	let searchQuery = $state('');
	let dismissedSearchQuery = $state('');

	const validTemples = (temples as Temple[]).filter(
		(temple): temple is TempleWithCoordinates =>
			typeof temple.latitude === 'number' && typeof temple.longitude === 'number'
	);
	const states = [...new Set(validTemples.map((temple) => temple.state))].sort();

	let selectedStates = $state<string[]>([...states]);

	const visibleTemples = $derived(
		validTemples.filter((temple) => selectedStates.includes(temple.state))
	);
	const visibleCount = $derived(visibleTemples.length);
	const searchResults = $derived(
		searchQuery.trim().length < 2
			? []
			: validTemples
					.filter((temple) => {
						const query = searchQuery.toLowerCase().trim();
						return (
							temple.name.toLowerCase().includes(query) ||
							temple.state.toLowerCase().includes(query)
						);
					})
					.slice(0, 12)
	);
	const templeGeoJson = $derived.by<TempleFeatureCollection>(() => ({
		type: 'FeatureCollection',
		features: visibleTemples.map((temple) => ({
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [temple.longitude, temple.latitude]
			},
			properties: {
				name: temple.name,
				slug: temple.slug,
				state: temple.state,
				color: templeColor(temple.state)
			}
		}))
	}));

	function templeColor(state: string) {
		return STATE_COLORS[state] ?? '#f7c948';
	}

	function popupHtml(temple: TempleWithCoordinates) {
		const color = templeColor(temple.state);

		return `
			<div class="popup-temple-name">${temple.name}</div>
			<div class="popup-state">
				<span class="popup-state-dot" style="background:${color}"></span>
				${temple.state}
			</div>
			<div class="popup-coords" style="background:transparent;color:#8b8078">${temple.latitude.toFixed(4)}, ${temple.longitude.toFixed(4)}</div>
		`;
	}

	function showTemplePopup(temple: TempleWithCoordinates) {
		if (!map || !maplibre) return;

		activePopup?.remove();
		activePopup = new maplibre.Popup({
			closeButton: true,
			closeOnClick: true,
			offset: 14
		})
			.setLngLat([temple.longitude, temple.latitude])
			.setHTML(popupHtml(temple))
			.addTo(map);
	}

	function findTempleBySlug(slug: string) {
		return validTemples.find((temple) => temple.slug === slug);
	}

	function toggleState(state: string) {
		selectedStates = selectedStates.includes(state)
			? selectedStates.filter((item) => item !== state)
			: [...selectedStates, state];
	}

	function selectAllStates() {
		selectedStates = [...states];
	}

	function clearStates() {
		selectedStates = [];
	}

	function focusTemple(temple: TempleWithCoordinates) {
		searchQuery = temple.name;
		dismissedSearchQuery = temple.name;

		if (!selectedStates.includes(temple.state)) {
			selectedStates = [...selectedStates, temple.state];
		}

		map?.easeTo({
			center: [temple.longitude, temple.latitude],
			zoom: 11,
			duration: 900
		});
		showTemplePopup(temple);
	}

	$effect(() => {
		const source = map?.getSource('temples') as GeoJSONSource | undefined;
		source?.setData(templeGeoJson);
	});

	function addTempleLayers(targetMap: MapLibreMap) {
		if (targetMap.getSource('temples')) return;

		targetMap.addSource('temples', {
			type: 'geojson',
			data: templeGeoJson,
			cluster: true,
			clusterMaxZoom: 13,
			clusterRadius: 44
		});

		targetMap.addLayer({
			id: 'temple-clusters-halo',
			type: 'circle',
			source: 'temples',
			filter: ['has', 'point_count'],
			paint: {
				'circle-color': '#FFFFFF',
				'circle-radius': ['step', ['get', 'point_count'], 26, 10, 32, 50, 40],
				'circle-opacity': 0,
				'circle-blur': 0
			}
		});

		targetMap.addLayer({
			id: 'temple-clusters',
			type: 'circle',
			source: 'temples',
			filter: ['has', 'point_count'],
			paint: {
				'circle-color': '#313131',
				'circle-radius': ['step', ['get', 'point_count'], 18, 10, 23, 50, 29],
				'circle-stroke-color': 'rgba(0,0,0,0)',
				'circle-stroke-width': 1
			}
		});

		targetMap.addLayer({
			id: 'temple-points-halo',
			type: 'circle',
			source: 'temples',
			filter: ['!', ['has', 'point_count']],
			paint: {
				'circle-color': ['coalesce', ['get', 'color'], '#f7c948'],
				'circle-radius': 13,
				'circle-opacity': 0.28,
				'circle-blur': 0.45
			}
		});

		targetMap.addLayer({
			id: 'temple-points',
			type: 'circle',
			source: 'temples',
			filter: ['!', ['has', 'point_count']],
			paint: {
				'circle-color': ['coalesce', ['get', 'color'], '#f7c948'],
				'circle-radius': 6,
				'circle-stroke-color': 'rgba(255, 255, 255, 0.92)',
				'circle-stroke-width': 2.5
			}
		});
	}

	async function loadBoundaryOverlay(targetMap: MapLibreMap) {
		const source = targetMap.getSource('indiaBoundary') as GeoJSONSource | undefined;
		if (!source) return;

		try {
			const response = await fetch(INDIA_BOUNDARY_SOURCE);
			if (!response.ok) return;

			source.setData(await response.json());
		} catch {
			// Keep the CARTO basemap usable if the local boundary file has not been added yet.
		}
	}

	onMount(() => {
		let mapInstance: MapLibreMap | undefined;
		let mounted = true;

		async function initialiseMap() {
			maplibre = await import('maplibre-gl');
			if (!mounted || !maplibre) return;

			mapInstance = new maplibre.Map({
			container: mapEl,
			center: [78.9629, 22.5937],
			zoom: 4,
			minZoom: 3,
			maxZoom: 16,
			attributionControl: false,
				style: {
					version: 8,
					sources: {
					cartoDark: {
						type: 'raster',
						tiles: CARTO_DARK_TILES,
						tileSize: 256,
						attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
					},
						indiaBoundary: {
							type: 'geojson',
							data: EMPTY_BOUNDARY
						}
					},
				layers: [
					{
						id: 'background',
						type: 'background',
						paint: {
							'background-color': '#07080a'
						}
					},
					{
						id: 'carto-dark',
						type: 'raster',
						source: 'cartoDark',
						paint: {
							'raster-opacity': 0.92
						}
					},
					{
						id: 'india-boundary-fill',
						type: 'fill',
						source: 'indiaBoundary',
						paint: {
							'fill-color': '#111117',
							'fill-opacity': 0.08
						}
					},
					{
						id: 'india-boundary-glow',
						type: 'line',
						source: 'indiaBoundary',
						paint: {
							'line-color': '#474747',
							'line-opacity': 1,
							'line-width': 2,
							'line-blur': 2
						}
					},
					{
						id: 'india-boundary-line',
						type: 'line',
						source: 'indiaBoundary',
							paint: {
								'line-color': '#474747',
								'line-opacity': 0.12,
								'line-width': 0.5
							}
						}
					]
				}
			});

				map = mapInstance;
				mapInstance.addControl(new maplibre.NavigationControl({ showCompass: false }), 'top-left');
			mapInstance.addControl(
			new maplibre.AttributionControl({
				compact: true,
				customAttribution: 'Boundary overlay: Bharat Maps source'
			}),
			'bottom-right'
			);

				const setupTempleMap = () => {
					if (!mapInstance) return;

					loadBoundaryOverlay(mapInstance);
					addTempleLayers(mapInstance);

					mapInstance.on('click', 'temple-clusters', async (event) => {
						if (!mapInstance) return;

						const feature = mapInstance.queryRenderedFeatures(event.point, {
							layers: ['temple-clusters']
						})[0];
						const clusterId = feature?.properties?.cluster_id;
						const coordinates = (feature?.geometry as { coordinates?: [number, number] } | undefined)
							?.coordinates;
						const source = mapInstance.getSource('temples') as GeoJSONSource | undefined;

						if (!source || clusterId === undefined || !coordinates) return;

						const zoom = await source.getClusterExpansionZoom(clusterId);
						mapInstance.easeTo({
							center: coordinates,
							zoom,
							duration: 650
						});
					});

				mapInstance.on('click', 'temple-points', (event) => {
					const slug = event.features?.[0]?.properties?.slug;
					if (typeof slug !== 'string') return;

					const temple = findTempleBySlug(slug);
					if (temple) showTemplePopup(temple);
				});

					for (const layerId of ['temple-clusters', 'temple-points']) {
						mapInstance.on('mouseenter', layerId, () => {
							mapInstance?.getCanvas().style.setProperty('cursor', 'pointer');
						});
						mapInstance.on('mouseleave', layerId, () => {
							mapInstance?.getCanvas().style.setProperty('cursor', '');
						});
					}
				};

				if (mapInstance.isStyleLoaded()) {
					setupTempleMap();
				} else {
					mapInstance.once('style.load', setupTempleMap);
				}
			}

		initialiseMap();

		return () => {
			mounted = false;
			activePopup?.remove();
			mapInstance?.remove();
			map = undefined;
			maplibre = undefined;
		};
	});
</script>

<svelte:head>
	<title>Temple Map | Bodha</title>
</svelte:head>

<section class="temple-map-shell">
	<div bind:this={mapEl} class="temple-map"></div>
	<div class="search-panel">
		<input
			bind:value={searchQuery}
			type="search"
			placeholder="Search temples or states"
			aria-label="Search temples or states"
			oninput={() => (dismissedSearchQuery = '')}
		/>

		{#if searchQuery.trim().length >= 2 && searchQuery !== dismissedSearchQuery}
			<div class="search-results">
				{#if searchResults.length > 0}
					{#each searchResults as temple}
						<button type="button" onclick={() => focusTemple(temple)}>
							<span style={`background:${templeColor(temple.state)}`}></span>
							<strong>{temple.name}</strong>
							<small>{temple.state}</small>
						</button>
					{/each}
				{:else}
					<p>No temples found</p>
				{/if}
			</div>
		{/if}
	</div>
	<div class="stats-panel">
		<p>India Temples Map</p>
		<div class="stats-row">
			<div>
				<strong>{validTemples.length}</strong>
				<span>Total</span>
			</div>
			<div>
				<strong>{states.length}</strong>
				<span>States</span>
			</div>
			<div>
				<strong>{visibleCount}</strong>
				<span>Visible</span>
			</div>
		</div>
	</div>
	<div class="filter-panel">
		<button type="button" class="filter-toggle" onclick={() => (filterOpen = !filterOpen)}>
			Filter by State
		</button>
		{#if filterOpen}
			<div class="filter-dropdown">
				<div class="filter-actions">
					<button type="button" onclick={selectAllStates}>Select All</button>
					<button type="button" onclick={clearStates}>Deselect All</button>
				</div>

				{#each states as state}
					<button type="button" class="filter-item" onclick={() => toggleState(state)}>
						<span class:checked={selectedStates.includes(state)}>
							{selectedStates.includes(state) ? '✓' : ''}
						</span>
						<i style={`background:${templeColor(state)}`}></i>
						{state}
					</button>
				{/each}
			</div>
		{/if}
	</div>
</section>

<style lang="sass">
	.temple-map-shell
		position: relative
		min-height: 100vh
		background: #111117
		overflow: hidden

	.temple-map
		width: 100%
		height: 100vh
		z-index: 1

	.search-panel
		position: absolute
		top: 18px
		right: 24px
		z-index: 4
		width: min(320px, calc(100vw - 48px))

		input
			width: 100%
			border: 1px solid rgba(247, 201, 72, 0.25)
			border-radius: 10px
			padding: 11px 14px
			color: #f5eadf
			background: rgba(15, 15, 22, 0.94)
			outline: none

	.search-results
		margin-top: 8px
		max-height: 320px
		overflow: auto
		border: 1px solid rgba(247, 201, 72, 0.18)
		border-radius: 12px
		background: rgba(15, 15, 22, 0.97)

		button
			width: 100%
			display: grid
			grid-template-columns: 10px 1fr
			gap: 4px 8px
			padding: 10px 14px
			border: 0
			border-bottom: 1px solid rgba(255, 255, 255, 0.06)
			color: #e0d5c8
			text-align: left
			background: transparent
			cursor: pointer

			&:hover
				background: rgba(247, 201, 72, 0.1)

			span
				width: 9px
				height: 9px
				border-radius: 50%
				margin-top: 5px

			strong
				font-size: 13px
				font-weight: 600

			small
				grid-column: 2
				color: #8b8078
				font-size: 11px

		p
			margin: 0
			padding: 14px
			color: #8b8078

	.stats-panel
		position: absolute
		left: 24px
		bottom: 24px
		z-index: 4
		display: grid
		gap: 10px
		padding: 14px 18px
		border: 1px solid rgba(255, 255, 255, 0.08)
		border-radius: 12px
		background: rgba(10, 10, 15, 0.74)
		backdrop-filter: blur(16px)

		p
			margin: 0
			color: #fff
			font-weight: 700

		strong
			color: #fff
			font-size: 22px
			line-height: 1

		span
			color: #8b8078
			font-size: 10px
			text-transform: uppercase
			letter-spacing: 0.08em

	.stats-row
		display: flex
		gap: 16px

		div
			display: grid
			gap: 3px
			text-align: center

	.filter-panel
		position: absolute
		right: 24px
		bottom: 24px
		z-index: 4

	.filter-toggle
		border: 1px solid rgba(247, 201, 72, 0.25)
		border-radius: 10px
		padding: 10px 16px
		color: #f7c948
		background: rgba(15, 15, 22, 0.94)
		cursor: pointer

	.filter-dropdown
		position: absolute
		right: 0
		bottom: calc(100% + 8px)
		width: min(280px, calc(100vw - 48px))
		max-height: 420px
		overflow: auto
		padding: 10px
		border: 1px solid rgba(247, 201, 72, 0.18)
		border-radius: 12px
		background: rgba(15, 15, 22, 0.98)

	.filter-actions
		display: flex
		gap: 8px
		margin-bottom: 8px

		button
			flex: 1
			border: 1px solid rgba(247, 201, 72, 0.18)
			border-radius: 8px
			padding: 7px
			color: #f7c948
			background: rgba(247, 201, 72, 0.08)
			cursor: pointer

	.filter-item
		width: 100%
		display: grid
		grid-template-columns: 18px 10px 1fr
		align-items: center
		gap: 8px
		border: 0
		border-radius: 8px
		padding: 7px 8px
		color: #ded2c6
		text-align: left
		background: transparent
		cursor: pointer

		&:hover
			background: rgba(247, 201, 72, 0.08)

		span
			width: 18px
			height: 18px
			display: grid
			place-items: center
			border: 1px solid rgba(247, 201, 72, 0.32)
			border-radius: 5px
			color: #101015
			font-size: 12px

			&.checked
				background: #f7c948

		i
			width: 10px
			height: 10px
			border-radius: 50%

	:global(.maplibregl-ctrl-top-left)
		top: 92px
		left: 24px

	:global(.maplibregl-ctrl-group)
		border: 1px solid rgba(247, 201, 72, 0.18)
		background: rgba(15, 15, 22, 0.94)

	:global(.maplibregl-ctrl button)
		color: #f7c948

	:global(.maplibregl-ctrl button + button)
		border-top-color: rgba(247, 201, 72, 0.18)

	:global(.maplibregl-popup-content),
	:global(.maplibregl-popup-tip)
		background: rgba(15, 15, 22, 0.98)
		color: #e0d5c8

	:global(.maplibregl-popup-content)
		border: 1px solid rgba(247, 201, 72, 0.18)
		border-radius: 10px
		padding: 12px 14px

	:global(.maplibregl-popup-close-button)
		color: #e0d5c8
		font-size: 18px
		padding: 2px 6px

	:global(.popup-temple-name)
		padding-right: 16px
		font-weight: 700
		color: #f7c948

	:global(.popup-state)
		display: flex
		align-items: center
		gap: 6px
		margin-top: 6px

	:global(.popup-state-dot)
		width: 8px
		height: 8px
		border-radius: 50%

	:global(.popup-coords)
		margin-top: 6px
		color: #8b8078
		background: transparent
		font-size: 11px

	@media screen and (max-width: 720px)
		.search-panel
			top: 72px
			left: 16px
			right: 16px
			width: auto

		.stats-panel
			left: 16px
			bottom: 16px

		.filter-panel
			right: 16px
			bottom: 16px

		:global(.maplibregl-ctrl-top-left)
			left: 16px
</style>
