// src/lib/services/map.ts
import type { GeoJson, GeoJsonFeature, InteractiveLayer, LegendItem } from '$lib/types';
import { legendStore, settingsStore, selectedItem, interactiveLayersStore, currentInteractiveLayerStore } from '$lib/stores';
import { map, geoJsonLayer, selectedFeaturesStore } from '$lib/stores';
import { get } from 'svelte/store';
import type * as L from 'leaflet';
import { SelectedFeature } from '$lib/types';

/**
 * returns the geojson manifest stored in /data/manifest.json
 * @returns promise to return the files object in the manifest.json (currently string[])
 */
export const getFeatureLayers = async (): Promise<InteractiveLayer[]> => {
	try {
		const res = await fetch('/data/manifest.json');
		if (!res.ok) {
			throw new Error('Error HTTP ' + res.status);
		}
		const data: InteractiveLayer[] = await res.json();
		return data;
	} catch (err) {
		console.error(`Could not retrieve manifest: ${err}`);
		return [];
	}
};

/**
 * returns interactive layer from store or manifest based on its id
 * @returns promise to return the files object in the manifest.json (currently string[])
 */
export const getInteractiveLayerByID = async (id: string): Promise<InteractiveLayer | null> => {
	let currentInteractiveLayers = get(interactiveLayersStore);
	let currentInteractiveLayer: InteractiveLayer | null = null;
	if (!currentInteractiveLayers || currentInteractiveLayers.length === 0) {
		currentInteractiveLayers = await getFeatureLayers();
	}

	for (let i = 0; i < currentInteractiveLayers.length; i++) {
		const activeLayer = currentInteractiveLayers[i];
		if (activeLayer.id === id) {
			currentInteractiveLayer = activeLayer;
		}
	}

	return currentInteractiveLayer;
};

/**
 * determine style for geojson features, effectively either base or selected if a colors present
 * @param color if undefined, set the base style, if defined > set selected style using the custom color
 * @returns geojson feature style as json object
 */
const calculateFeatureStyle = (color?: string) => {
	const currentSettings = get(settingsStore);
	// if a color is passed, apply selected styling
	if (color) {
		return {
			...currentSettings.baseStyle.selected,
			fillColor: color
		};
	}
	// otherwise return base style
	return currentSettings.baseStyle.unselected;
};

/**
 * determine what legend item has selected a feature, if any
 * @param mapId map id as string
 * @param featureId feature id as string
 * @returns legenditem or undefined if not selected
 */
const getFeatureSelector = (mapId: string, featureId: string): LegendItem | undefined => {
	let selectedBy: LegendItem | undefined = undefined;
	const currentSelectedFeaturesStore = get(selectedFeaturesStore)
	const currentLegendStore = get(legendStore)
	// see if the id is already present in selected features store, return that if so
	const currentlySelectedFeature: SelectedFeature | null = currentSelectedFeaturesStore[mapId] ? currentSelectedFeaturesStore[mapId][featureId] : null;
	if (currentlySelectedFeature && currentLegendStore[mapId]) {
		selectedBy = currentLegendStore[mapId][currentlySelectedFeature.selectedById]
	}
	return selectedBy;
};

// array of map subscriptions for automatic actions like updating style on store change, etc
let subscriptions: (() => void)[] = [];

/**
 * Initializes leaflet map including tiles (e.g. base layer) and features (e.g. counties)
 * @param mapContainer HTML element that will contain the leaflet map
 * @param geojson Parsed, ready to use geojson data
 * @todo enhance coordinate defaults, accessibility and memory
 * @todo support other tiles/base layers
 */
export const initMapAndLayers = async (mapContainer: HTMLDivElement) => {
	await import('leaflet/dist/leaflet.css');
	const L = await import('leaflet'); // lazy import to avoid SSR

	// get interactive layer, and its associated geojson, fail if null
	const interactiveLayer = get(currentInteractiveLayerStore);
	if (interactiveLayer === null) {
		console.warn('Matching interactive layer could not be found in manifest');
		return;
	}
	const mapId = interactiveLayer.id;
	const featureLayerRes = await fetch(`/data/${interactiveLayer.filename}`);
	const geojson: GeoJson = await featureLayerRes.json();

	// get map params from interactive layer
	const zoomLevel = interactiveLayer.defaultZoom ?? 4;
	const coordinates = interactiveLayer.defaultCoordinates
		? [interactiveLayer.defaultCoordinates.latitude, interactiveLayer.defaultCoordinates.longitude]
		: [37.8, -96];

	// local instance of the leaflet map + set default view
	const localLeafletMap = L.map(mapContainer).setView(coordinates, zoomLevel);

	// add OSM tile as base layer + attribution, add to local map
	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; OpenStreetMap contributors'
	}).addTo(localLeafletMap);

	// local instance of the features geojson layer, e.g. counties
	const localGeoJsonLayer = L.geoJSON(geojson, {
		// set base style
		style: calculateFeatureStyle(),
		onEachFeature: (feature: GeoJsonFeature, layer: L.Layer) => {
			// get metadata
			const featureId = feature.properties.GEOID;
			const featureName: string = typeof feature.properties.NAME === 'string' ? typeof feature.properties.NAME : '';

			// add feature id to generated layer as well
			(layer as L.Layer).featureId = featureId;

			// Add click event to each feature layer
			layer.on('click', () => {
				// feature name shown on hover
				layer.bindTooltip(featureName);

				// if the feature is already selected, simply deselect it
				const selector = getFeatureSelector(mapId, featureId);
				if (selector) {
					selectedFeaturesStore.deselectLayer(interactiveLayer.id, featureId);
					return;
				}

				// if there is no active legend item, warn the user and do nothing
				const activeLegendItem = get(selectedItem);
				if (activeLegendItem === null) {
					console.error('Unable to select feature, there may be no legend items');
					alert('Please create and/or select a legend item before trying to select a feature');
					return;
				}

				// otherwise select it
				selectedFeaturesStore.selectLayer(interactiveLayer.id, new SelectedFeature(featureId, featureName, activeLegendItem.id));
			});
		}
	}).addTo(localLeafletMap); // add feature layers to local map

	// set map and layer store
	map.set(localLeafletMap);
	geoJsonLayer.set(localGeoJsonLayer);

	// on changes to the selected features store, update the layers style
	subscriptions.push(
		selectedFeaturesStore.subscribe(() => {
			// if there are geojson layers
			const currentGeoJsonLayer = get(geoJsonLayer);
			if (currentGeoJsonLayer) {
				currentGeoJsonLayer.eachLayer((layer: L.Layer) => {
					const featureId = (layer as L.Layer).featureId;
					if (featureId) {
						// get selector if it exists and update the style of the feature layer
						const selector = getFeatureSelector(interactiveLayer.id, featureId);
						(layer as L.Path).setStyle(calculateFeatureStyle(selector?.color));
					}
				});
			}
		})
	);

	// on changes to the legend, update the associated layers styles
	subscriptions.push(
		legendStore.subscribe((newLegendStoreData) => {
			const selectedFeatures = get(selectedFeaturesStore)[interactiveLayer.id]
			const currentGeoJsonLayer = get(geoJsonLayer);
			const legendItems = newLegendStoreData[interactiveLayer.id]
			if (currentGeoJsonLayer && legendItems && Object.keys(selectedFeatures).length > 0) {
				currentGeoJsonLayer.eachLayer((feature: L.Layer) => {
					const featureId = feature.featureId;
					// get selector if it exists and update the style of the feature layer
					const selector = getFeatureSelector(interactiveLayer.id, featureId);
					if (selector) {
						feature.setStyle(calculateFeatureStyle(selector.color));
						return;
					}
					if (selectedFeatures[featureId]) {
						selectedFeaturesStore.deselectLayer(interactiveLayer.id, featureId);
						return;
					}
				});
			}
		})
	);
};

/**
 * removes leaflet map and layers, along with any map subscriptions
 */
export const cleanupMap = () => {
	subscriptions.forEach((unsubscribe) => unsubscribe());
	subscriptions = [];
	const currentMap = get(map);
	if (currentMap) {
		currentMap.remove();
		map.set(null);
		geoJsonLayer.set(null);
	}
};
