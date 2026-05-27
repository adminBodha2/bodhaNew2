<svelte:options runes={true} />

<script lang="ts">
	import { onMount, tick } from 'svelte';
	import Optimizer from '$lib/comps/seo-optimizer.svelte';
	import Container from '$lib/comps/wrapper.svelte';
	import Crumb from '$lib/comps/breadcrumb.svelte';
	import HubRelatedLinks from '$lib/comps/hub-related-links.svelte';
	import type { GeoJSONSource, Map as MapLibreMap } from 'maplibre-gl';
	import type { PageProps } from './$types';
	import type { FeatureCollection } from 'geojson';
	import '$lib/styles/maplibre-gl.css';
	import temples from '$lib/serving/db-hindu-temples.json';
	import seoTopicLinks from '$lib/generated/seo-topic-links.json';
	let { data }: PageProps = $props();

	const title = 'Hindu Temples Wiki Map | Bodha';
	const metaDescription = 'Explore Bodha wiki entries for Hindu temples across Bharat, with temple locations, deities, states, and sacred geography.';

	//each temple carries this data on the page
	type Temple = {
		temple_name: string;
		slug: string;
		description: string | null;
		main_deity: string | null;
		category: string | null;
		temple_type: string | null;
		shiva_temple: boolean | null;
		vishnu_temple: boolean | null;
		devi_temple: boolean | null;
		ganesha_temple: boolean | null;
		saptapuri: boolean | null;
		char_dham: boolean | null;
		is_architectural_heritage: boolean | null;
		anveshi_image: string | null;
		latitude: number;
		longitude: number;
		state: string | null;
		image: string | null;
		is_anveshi: boolean | null;
		chapter: string | null;
	};

	//coordinates of each temple
	type TempleWithCoordinates = Temple & {
		latitude: number;
		longitude: number;
		mapKey: string;
		displayState: string;
		displayImage: string | null;
	};

	type PopupPlacement = {
		x: number;
		y: number;
		anchor: 'above' | 'below' | 'center';
		maxHeight: number;
	};

	//temples given property of a circle
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
			mapKey: string;
			is_anveshi: boolean;
			image: string | null;
			chapter: string | null;
			description: string | null;
		};
	};

	//entire temples collection complete
	type TempleFeatureCollection = {
		type: 'FeatureCollection';
		features: TempleFeature[];
	};

	//base background for the map
	const CARTO_DARK_TILES = ['https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', 'https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', 'https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', 'https://d.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'];

	//adding geoson to show correct political boundaries of india
	const INDIA_BOUNDARY_SOURCE = '/maps/india-boundary.geojson';
	const EMPTY_BOUNDARY: FeatureCollection = {
		type: 'FeatureCollection',
		features: []
	};

	//giving different colors to temples in different states
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
		Meghalaya: '#b0bec5',
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
		'West Bengal': '#ce93d8',
		Unknown: '#8b8078'
	};

	let mapEl: HTMLDivElement;
	let filterPanelEl: HTMLDivElement;
	let maplibre: typeof import('maplibre-gl') | undefined;
	let map = $state<MapLibreMap | undefined>(undefined);
	let activeTemple = $state<TempleWithCoordinates | undefined>(undefined);
	let popupPlacement = $state<PopupPlacement | undefined>(undefined);
	let filterOpen = $state(false);
	let categoryFilterOpen = $state(false);
	let searchQuery = $state('');
	let dismissedSearchQuery = $state('');
	let showAnveshiOnly = $state(false);
	let showShivaOnly = $state(false);
	let showVishnuOnly = $state(false);
	let showDeviOnly = $state(false);
	let showGaneshaOnly = $state(false);
	let mapReady = $state(false);

	const validTemples = (temples as Temple[])
		.filter((temple): temple is Temple & { latitude: number; longitude: number } => typeof temple.latitude === 'number' && typeof temple.longitude === 'number')
		.map((temple) => ({
			...temple,
			mapKey: `${temple.slug}:${temple.latitude}:${temple.longitude}`,
			displayState: getTempleState(temple),
			displayImage: getTempleImage(temple)
		}));

	const states = [...new Set(validTemples.map((temple) => temple.displayState))].sort();

	const categories = [...new Set(validTemples.map((temple) => temple.category).filter((c): c is string => !!c))].sort();

	let selectedStates = $state<string[]>([...states]);
	let selectedCategories = $state<string[]>([]);

	const visibleTemples = $derived(
		validTemples.filter((temple) => {
			// State filter
			if (!selectedStates.includes(temple.displayState)) return false;

			// Anveshi filter
			if (showAnveshiOnly && !temple.is_anveshi) return false;

			// Deity filters (show only if toggled)
			if (showShivaOnly && !temple.shiva_temple) return false;
			if (showVishnuOnly && !temple.vishnu_temple) return false;
			if (showDeviOnly && !temple.devi_temple) return false;
			if (showGaneshaOnly && !temple.ganesha_temple) return false;

			// Category multi-select
			if (selectedCategories.length > 0) {
				if (!temple.category || !selectedCategories.includes(temple.category)) return false;
			}

			return true;
		})
	);

	const visibleCount = $derived(visibleTemples.length);
	const anveshiCount = $derived(validTemples.filter((temple) => temple.is_anveshi).length);
	const shivaCount = $derived(validTemples.filter((temple) => temple.shiva_temple).length);
	const vishnuCount = $derived(validTemples.filter((temple) => temple.vishnu_temple).length);
	const deviCount = $derived(validTemples.filter((temple) => temple.devi_temple).length);
	const ganeshaCount = $derived(validTemples.filter((temple) => temple.ganesha_temple).length);
	const templeTopic = seoTopicLinks.topics['hindu-temple'];
	const relatedTemplePages = $derived(templeTopic?.supportingPages ?? []);

	const searchResults = $derived(
		searchQuery.trim().length < 2
			? []
			: visibleTemples
					.filter((temple) => {
						const query = searchQuery.toLowerCase().trim();
						return temple.temple_name.toLowerCase().includes(query) || temple.displayState.toLowerCase().includes(query) || (temple.main_deity?.toLowerCase().includes(query) ?? false);
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
				name: temple.temple_name,
				slug: temple.slug,
				state: temple.displayState,
				color: templeColor(temple.displayState),
				mapKey: temple.mapKey,
				is_anveshi: temple.is_anveshi === true,
				image: temple.displayImage,
				chapter: temple.chapter,
				description: temple.description
			}
		}))
	}));

	function getTempleState(temple: Temple) {
		return temple.state?.trim() || 'Unknown';
	}

	function getTempleImage(temple: Temple) {
		return temple.anveshi_image || temple.image;
	}

	function getTempleDescription(temple: Temple) {
		return temple.description?.trim() ?? '';
	}

	function templeColor(state: string) {
		return STATE_COLORS[state] ?? '#FFFFFF';
	}

	function showTemplePopup(temple: TempleWithCoordinates) {
		if (!map) return;
		activeTemple = temple;
		syncActivePopupPoint();
	}

	function syncActivePopupPoint() {
		if (!map || !activeTemple) {
			popupPlacement = undefined;
			return;
		}

		const point = map.project([activeTemple.longitude, activeTemple.latitude]);
		const shell = mapEl.parentElement;
		const shellWidth = shell?.clientWidth ?? mapEl.clientWidth;
		const shellHeight = shell?.clientHeight ?? mapEl.clientHeight;
		const markerX = mapEl.offsetLeft + point.x;
		const markerY = mapEl.offsetTop + point.y;
		const popupWidth = Math.min(360, shellWidth - 32);
		const edgePadding = 16;

		if (shellWidth < 1025) {
			popupPlacement = {
				x: shellWidth / 2,
				y: mapEl.offsetTop + mapEl.clientHeight / 2,
				anchor: 'center',
				maxHeight: Math.max(160, Math.min(520, mapEl.clientHeight - 32))
			};
			return;
		}

		const x = Math.min(Math.max(markerX, edgePadding + popupWidth / 2), shellWidth - edgePadding - popupWidth / 2);
		const spaceAbove = markerY - edgePadding;
		const spaceBelow = shellHeight - markerY - edgePadding;
		const anchor = spaceAbove < 260 && spaceBelow > spaceAbove ? 'below' : 'above';
		const availableHeight = anchor === 'below' ? spaceBelow : spaceAbove;

		popupPlacement = {
			x,
			y: markerY,
			anchor,
			maxHeight: Math.max(160, Math.min(520, availableHeight - 24))
		};
	}

	function closeTemplePopup() {
		activeTemple = undefined;
		popupPlacement = undefined;
	}

	/** Explicitly validate the active temple after filter changes.
	 *  Replaces the previous $effect-based sync (anti-pattern).
	 */
	function validateActiveTemple() {
		if (activeTemple && !visibleTemples.some((temple) => temple.slug === activeTemple?.slug)) {
			closeTemplePopup();
		}
	}

	function templeHref(temple: TempleWithCoordinates) {
		if (temple.is_anveshi && temple.chapter) {
			return `/anveshi/${temple.chapter}`;
		}

		return `/wiki/temples/${temple.slug}`;
	}

	function findTempleByMapKey(mapKey: string) {
		return validTemples.find((temple) => temple.mapKey === mapKey);
	}

	function toggleState(state: string) {
		selectedStates = selectedStates.includes(state) ? selectedStates.filter((item) => item !== state) : [...selectedStates, state];
		refreshTempleSource();
		validateActiveTemple();
	}

	function selectAllStates() {
		selectedStates = [...states];
		refreshTempleSource();
		validateActiveTemple();
	}

	function clearStates() {
		selectedStates = [];
		refreshTempleSource();
		validateActiveTemple();
	}

	function toggleCategory(category: string) {
		selectedCategories = selectedCategories.includes(category)
			? selectedCategories.filter((item) => item !== category)
			: [...selectedCategories, category];
		refreshTempleSource();
		validateActiveTemple();
	}

	function selectAllCategories() {
		selectedCategories = [...categories];
		refreshTempleSource();
		validateActiveTemple();
	}

	function clearCategories() {
		selectedCategories = [];
		refreshTempleSource();
		validateActiveTemple();
	}

	function toggleAnveshiTemples() {
		showAnveshiOnly = !showAnveshiOnly;
		refreshTempleSource();
		validateActiveTemple();
	}

	function toggleShivaOnly() {
		const newValue = !showShivaOnly;
		showShivaOnly = newValue;
		if (newValue) {
			showVishnuOnly = false;
			showDeviOnly = false;
			showGaneshaOnly = false;
		}
		refreshTempleSource();
		validateActiveTemple();
	}

	function toggleVishnuOnly() {
		const newValue = !showVishnuOnly;
		showVishnuOnly = newValue;
		if (newValue) {
			showShivaOnly = false;
			showDeviOnly = false;
			showGaneshaOnly = false;
		}
		refreshTempleSource();
		validateActiveTemple();
	}

	function toggleDeviOnly() {
		const newValue = !showDeviOnly;
		showDeviOnly = newValue;
		if (newValue) {
			showShivaOnly = false;
			showVishnuOnly = false;
			showGaneshaOnly = false;
		}
		refreshTempleSource();
		validateActiveTemple();
	}

	function toggleGaneshaOnly() {
		const newValue = !showGaneshaOnly;
		showGaneshaOnly = newValue;
		if (newValue) {
			showShivaOnly = false;
			showVishnuOnly = false;
			showDeviOnly = false;
		}
		refreshTempleSource();
		validateActiveTemple();
	}

	function clearDeityFilters() {
		showShivaOnly = false;
		showVishnuOnly = false;
		showDeviOnly = false;
		showGaneshaOnly = false;
		refreshTempleSource();
		validateActiveTemple();
	}

	function focusTemple(temple: TempleWithCoordinates) {
		searchQuery = temple.temple_name;
		dismissedSearchQuery = temple.temple_name;

		if (!selectedStates.includes(temple.displayState)) {
			selectedStates = [...selectedStates, temple.displayState];
		}

		map?.easeTo({
			center: [temple.longitude, temple.latitude],
			zoom: 11,
			duration: 900
		});
		showTemplePopup(temple);
	}

	$effect(() => {
		if (!mapReady) return;
		setTempleSourceData();
	});

	function setTempleSourceData() {
		const source = map?.getSource('temples') as GeoJSONSource | undefined;
		source?.setData(templeGeoJson);
	}

	function refreshTempleSource() {
		void tick().then(setTempleSourceData);
	}

	$effect(() => {
		if (!filterOpen && !categoryFilterOpen) return;

		function closeFilterOnOutsideClick(event: PointerEvent) {
			if (filterPanelEl?.contains(event.target as Node)) return;
			filterOpen = false;
			categoryFilterOpen = false;
		}

		document.addEventListener('pointerdown', closeFilterOnOutsideClick);

		return () => {
			document.removeEventListener('pointerdown', closeFilterOnOutsideClick);
		};
	});

	function addTempleLayers(targetMap: MapLibreMap) {
		if (targetMap.getSource('temples')) return;

		targetMap.addSource('temples', {
			type: 'geojson',
			data: templeGeoJson,
			cluster: true,
			clusterMaxZoom: 1,
			clusterRadius: 0
		});

		targetMap.addLayer({
			id: 'temple-clusters',
			type: 'circle',
			source: 'temples',
			filter: ['has', 'point_count'],
			paint: {
				'circle-color': '#56ed49',
				'circle-radius': ['step', ['get', 'point_count'], 4, 5, 8, 50, 12],
				'circle-stroke-color': '#FFFFFF',
				'circle-stroke-width': 1
			}
		});

		targetMap.addLayer({
			id: 'temple-points-halo',
			type: 'circle',
			source: 'temples',
			filter: ['!', ['has', 'point_count']],
			paint: {
				'circle-color': '#FFFFFF',
				'circle-radius': 0,
				'circle-opacity': 0,
				'circle-blur': 0
			}
		});

		targetMap.addLayer({
			id: 'temple-points',
			type: 'circle',
			source: 'temples',
			filter: ['!', ['has', 'point_count']],
			paint: {
				'circle-color': ['case', ['==', ['get', 'is_anveshi'], true], '#D3633A', '#9ED800'],
				'circle-radius': 4,
				'circle-stroke-color': ['case', ['==', ['get', 'is_anveshi'], true], '#D3633A', '#9ED800'],
				'circle-stroke-width': 0
			}
		});
		mapReady = true;
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
				minZoom: 1,
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
				const activeMap = mapInstance;

				loadBoundaryOverlay(activeMap);
				addTempleLayers(activeMap);

				activeMap.on('click', 'temple-clusters', async (event) => {
					const feature = activeMap.queryRenderedFeatures(event.point, {
						layers: ['temple-clusters']
					})[0];
					const clusterId = feature?.properties?.cluster_id;
					const coordinates = (feature?.geometry as { coordinates?: [number, number] } | undefined)?.coordinates;
					const source = activeMap.getSource('temples') as GeoJSONSource | undefined;

					if (!source || clusterId === undefined || !coordinates) return;

					const zoom = await source.getClusterExpansionZoom(clusterId);
					activeMap.easeTo({
						center: coordinates,
						zoom,
						duration: 650
					});
				});

				activeMap.on('click', 'temple-points', (event) => {
					const mapKey = event.features?.[0]?.properties?.mapKey;
					if (typeof mapKey !== 'string') return;

					const temple = findTempleByMapKey(mapKey);
					if (temple) showTemplePopup(temple);
				});

				activeMap.on('click', (event) => {
					const clickedTempleFeature = activeMap.queryRenderedFeatures(event.point, {
						layers: ['temple-points']
					})[0];

					if (!clickedTempleFeature) closeTemplePopup();
				});

				activeMap.on('move', syncActivePopupPoint);
				activeMap.on('resize', syncActivePopupPoint);

				for (const layerId of ['temple-clusters', 'temple-points']) {
					activeMap.on('mouseenter', layerId, () => {
						activeMap.getCanvas().style.setProperty('cursor', 'pointer');
					});
					activeMap.on('mouseleave', layerId, () => {
						activeMap.getCanvas().style.setProperty('cursor', '');
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
			closeTemplePopup();
			mapInstance?.remove();
			map = undefined;
			maplibre = undefined;
		};
	});
</script>

<Optimizer {title} description={metaDescription} url={data.seo.url} siteUrl="https://www.bodharesearch.in" siteName="Bodha" image={data.seo.image} imageAlt={data.seo.imageAlt} type="article" publishedDate={data.seo.publishedDate} tags={data.seo.tags} breadcrumbs={data.seo.breadcrumbs} noindex={false} author="designBodha" twitterCreator="@BodhaResearch" />

<Container>
	<section class="wrapper-std">
		<Crumb showT={true} title="Hindu Temples" showD={true} desc={metaDescription} showRow={true}>
			<div class="box rgap4">
				<p class="txt-sm grey0">
					Temples base data from <a class="linked" href="https://github.com/rishabhmodi03/hindu-temples" target="_blank" rel="noreferrer"> Hindu temples repo by Rishabh Modi. </a>
					Locations are approximate. Data cleaning underway. To contribute, write to sitemaster@bodharesearch.in
				</p>
				<div class="row cgap8">
					<p class="txt-xs w500 tt-u"><span class="theme">{states.length}</span> States</p>
					<p class="txt-xs w500 tt-u"><span class="theme">{visibleCount}</span> Temples</p>
				</div>
			</div>
		</Crumb>
		<div class="box rgap16">
			<div class="filter-panel" bind:this={filterPanelEl}>
				<div class="filter-buttons">
					<button type="button" class="selection-button" class:active={showAnveshiOnly} onclick={toggleAnveshiTemples}>
						Anveshi Temples ({anveshiCount})
					</button>
					<button type="button" class="selection-button" class:active={showShivaOnly} onclick={toggleShivaOnly}>
						Shiva ({shivaCount})
					</button>
					<button type="button" class="selection-button" class:active={showVishnuOnly} onclick={toggleVishnuOnly}>
						Vishnu ({vishnuCount})
					</button>
					<button type="button" class="selection-button" class:active={showDeviOnly} onclick={toggleDeviOnly}>
						Devi ({deviCount})
					</button>
					<button type="button" class="selection-button" class:active={showGaneshaOnly} onclick={toggleGaneshaOnly}>
						Ganesha ({ganeshaCount})
					</button>

					{#if showShivaOnly || showVishnuOnly || showDeviOnly || showGaneshaOnly}
						<button type="button" class="selection-button" onclick={clearDeityFilters}>
							Clear Deities
						</button>
					{/if}

					<button type="button" class="selection-button" onclick={() => { categoryFilterOpen = false; filterOpen = !filterOpen; }}> States </button>
					<button type="button" class="selection-button" onclick={() => { filterOpen = false; categoryFilterOpen = !categoryFilterOpen; }}> Categories </button>
				</div>
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

				{#if categoryFilterOpen}
					<div class="filter-dropdown" style="left: 120px;">
						<div class="filter-actions">
							<button type="button" onclick={selectAllCategories}>Select All</button>
							<button type="button" onclick={clearCategories}>Deselect All</button>
						</div>

						{#each categories as category}
							<button type="button" class="filter-item" onclick={() => toggleCategory(category)}>
								<span class:checked={selectedCategories.includes(category)}>
									{selectedCategories.includes(category) ? '✓' : ''}
								</span>
								{category}
							</button>
						{/each}
					</div>
				{/if}
			</div>
			<div class="temple-map-shell">
				<div bind:this={mapEl} class="temple-map"></div>
				{#if activeTemple && popupPlacement}
					<div class="temple-popup" class:below={popupPlacement.anchor === 'below'} class:center={popupPlacement.anchor === 'center'} style={`left:${popupPlacement.x}px;top:${popupPlacement.y}px;--popup-max-height:${popupPlacement.maxHeight}px`} role="dialog" aria-label={activeTemple.temple_name}>
						<button type="button" class="temple-popup-close" aria-label="Close temple popup" onclick={closeTemplePopup}> x </button>
						<a class="popup-temple-link" href={templeHref(activeTemple)}>
							{#if activeTemple.displayImage}
								<img class="fit" src={activeTemple.displayImage} alt={activeTemple.temple_name} />
							{/if}
							<div class="popup-temple-name">{activeTemple.temple_name}</div>
							{#if activeTemple.is_anveshi}
								<div class="popup-badge">In Anveshi</div>
							{/if}
							{#if getTempleDescription(activeTemple)}
								<p class="popup-story">{getTempleDescription(activeTemple).slice(0, 80)}... <span style="color: #F18100">(Go to Page)</span></p>
							{/if}
						</a>
					</div>
				{/if}
			</div>
		</div>
	</section>
	<HubRelatedLinks title="Related Paths" items={relatedTemplePages} />
</Container>

<style lang="sass">

	.temple-map-shell
		position: relative
		min-height: 100vh
		border-radius: 4px
		background: var(--color-back)
		overflow: hidden
		margin-top: 0

	.temple-map
		width: 100%
		height: calc(100vh - 64px)
		z-index: 1
		@media (min-width: 1025px)
			width: 100%
			height: calc(100vh - 80px)

	.filter-panel
		position: relative
		z-index: 4
		width: max-content

	.filter-dropdown
		position: absolute
		left: 0
		top: 64px
		width: 100%
		max-height: 620px
		overflow: auto
		padding: 10px
		border: 1px solid #474747
		border-radius: 4px
		background: rgba(0,0,0,0.1)
		backdrop-filter: blur(10px)

	.filter-actions
		display: flex
		gap: 8px
		margin-bottom: 8px
		button
			flex: 1
			border: 1px solid rgba(255,255,255,0.2)
			border-radius: 8px
			font-size: 12px
			padding: 7px
			color: #d7d7d7
			background: rgba(0,0,0,0.1)
			cursor: pointer
			&:hover
				color: var(--color-white)
				background: var(--color-theme)

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
			border: 1px solid rgba(255,255,255,0.2)
			border-radius: 5px
			color: #101015
			font-size: 12px
			&.checked
				background: rgba(255,255,255,0.5)
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

	.temple-popup
		position: absolute
		z-index: 5
		transform: translate(-50%, calc(-100% - 14px))
		width: min(360px, calc(100vw - 32px))
		max-height: var(--popup-max-height, min(520px, calc(100vh - 160px)))
		overflow: auto
		border: 1px solid rgba(255,255,255,0.2)
		border-radius: 10px
		padding: 1rem
		color: #FFFFFF
		background: rgba(0,0,0,0.1)
		backdrop-filter: blur(5px)
		box-shadow: 0 14px 34px rgba(0, 0, 0, 0.32)
		&::after
			content: ''
			position: absolute
			left: 50%
			bottom: -8px
			width: 14px
			height: 14px
			transform: translateX(-50%) rotate(45deg)
			border-right: 1px solid rgba(247, 201, 72, 0.18)
			border-bottom: 1px solid rgba(247, 201, 72, 0.18)
			background: rgba(15, 15, 22, 0.98)
		&.below
			transform: translate(-50%, 14px)
			&::after
				top: -8px
				bottom: auto
				border: 0
				border-left: 1px solid rgba(247, 201, 72, 0.18)
				border-top: 1px solid rgba(247, 201, 72, 0.18)
		&.center
			transform: translate(-50%, -50%)
			&::after
				display: none
	.temple-popup-close
		position: absolute
		border: none
		top: 2px
		right: 6px
		z-index: 1
		border: 0
		padding: 2px 6px
		color: #e0d5c8
		background: transparent
		font-size: 18px
		line-height: 1
		cursor: pointer
		&:hover
			color: #f7c948
	img.fit
		margin-top: 1rem
		border-radius: 8px
	.popup-temple-link
		display: block
		color: inherit
		text-decoration: none
	.popup-temple-name
		border: none
		color: #FFFFFF
		font-weight: bold
		margin-top: 0.5rem
	.popup-badge
		width: max-content
		border: 1px solid rgba(255,255,255,0.5)
		border-radius: 4px
		padding: 4px
		color: #FFFFFF
		background: var(--color-anveshi)
		font-size: 10px
		font-weight: 450
		margin-top: 0.5rem
		text-transform: uppercase
	.popup-story
		margin: 10px 0 0
		color: #dedede
		font-size: 12px
		line-height: 1.45

	@media screen and (max-width: 720px)
		:global(.maplibregl-ctrl-top-left)
			left: 16px

</style>
