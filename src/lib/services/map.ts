// src/lib/services/map.ts
import type { GeoJson, GeoJsonFeature, LegendItem } from '$lib/types';
import { legendStore, settingsStore, selectedItem, selectedLayerStore } from '$lib/stores';
import { map, geoJsonLayer, selectedFeaturesStore } from '$lib/stores';
import { get } from 'svelte/store';
import type * as L from 'leaflet';
import { SelectedFeature } from '$lib/types';

/**
 * determine style for geojson features, effectively either base or selected if a colors present
 * @param color if undefined, set the base style, if defined > set selected style using the custom color
 * @returns geojson feature style as json object
 */
const calculateFeatureStyle = (color?: string) => {
	const currentSettings = get(settingsStore)
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
 * @param id feature id as string
 * @returns legenditem or undefined if not selected
 */
const getFeatureSelector = (id: string): LegendItem | undefined => {
	let selectedBy = undefined;
	// see if the id is already present in selected features store, return that if so
	const currentlySelectedFeature = get(selectedFeaturesStore)[id];
	if (currentlySelectedFeature) {
		const selector = get(legendStore)[currentlySelectedFeature.selectedById];
		selectedBy = selector;
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
	const L = await import('leaflet'); // lazy import to avoid SSR
	await import('leaflet/dist/leaflet.css');

	// try to retrieve feature layer using settings
	const currentSettings = get(settingsStore)
	const featureLayerRes = await fetch(`/data/${currentSettings.featureLayerFilename}`);
	const geojson: GeoJson = await featureLayerRes.json()

	// local instance of the leaflet map + set default view
	const localLeafletMap = L.map(mapContainer).setView([37.8, -96], 4);

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
			const id = feature.properties.GEOID;
			const name = feature.properties.NAME;

			// add feature id to generated layer as well
			(layer as L.Layer).featureId = id;

			// Add click event to each feature layer
			layer.on('click', () => {
				// feature name shown on hover
				layer.bindTooltip(name);

				// if the feature is already selected, simply deselect it
				const selector = getFeatureSelector(id);
				if (selector) {
					selectedFeaturesStore.deselect(id);
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
				selectedFeaturesStore.select(new SelectedFeature(id, name, activeLegendItem.id));
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
						const selector = getFeatureSelector(featureId);
						(layer as L.Path).setStyle(calculateFeatureStyle(selector?.color));
					}
				});
			}
		})
	);

	// on changes to the legend, update the associated layers styles
	subscriptions.push(
		legendStore.subscribe(() => {
			// if there are geojson layers  and selected features
			const currentGeoJsonLayer = get(geoJsonLayer);
			const currentSelectedFeatures = get(selectedFeaturesStore);
			if (currentGeoJsonLayer && Object.keys(currentSelectedFeatures).length > 0) {
				currentGeoJsonLayer.eachLayer((layer: L.Layer) => {
					const featureId = (layer as L.Layer).featureId;
					// get selector if it exists and update the style of the feature layer
					const selector = getFeatureSelector(featureId);
					if (selector) {
						(layer as L.Path).setStyle(calculateFeatureStyle(selector.color));
						return;
					}
					if (currentSelectedFeatures[featureId]) {
						selectedFeaturesStore.deselect(featureId);
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

export const selectLayer = async (layer: string, set: (this: void, value: string) => void) => {
	const currentSelectedLayer = get(selectedLayerStore);
	try {
		// if new and current layer are the same, do nothing
		if (currentSelectedLayer === layer) {
			throw new Error(`Attempted to select ${layer} but it is already selected`);
		}
		// get the corresponding geojson if it exists
		const res = await fetch(`/data/${layer}`);
		if (!res.ok) {
			throw new Error(`Failed to fetch geojson layer: ${layer}`);
		}
		set(layer);
		selectedFeaturesStore.deselectAll();
		window.location.reload();
	} catch (e) {
		console.error(e);
	}
};
