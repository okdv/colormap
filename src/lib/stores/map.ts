// src/lib/stores/map.ts
import { writable } from 'svelte/store';
import type * as L from 'leaflet';
import { addRecordToNestedStore, addRecordToStore, getFeatureLayers, getInteractiveLayerByID, removeRecordFromNestedStore, removeRecordFromStore, storeData } from '$lib/services';
import { SelectedFeature, type InteractiveLayer, type SelectedFeatures, type SelectedFeaturesLocalStorage } from '$lib/types';

// leaflet map instance, initialized to null bc it only should exist client side
export const map = writable<L.Map | null>(null);

// geojson layer of features (e.g. counties) that sits on top of map, init to null bc it should only exist client side
export const geoJsonLayer = writable<L.GeoJSON | null>(null);

/**
 * creates store of selected features and persists it to local storage (or uses an existing local storage if available)
 * @returns a proxy to the store with interactions baked in
 * @todo support updating selected feature, avoids need to deselect > reselect in order to update the selector legend item used
 */
const createSelectedFeatures = () => {
	const store = storeData<SelectedFeaturesLocalStorage>('selectedFeatures', {}, 500);

	return {
		subscribe: store.subscribe,
		addMap: (map: InteractiveLayer) => addRecordToStore<SelectedFeatures>(map.id, {}, store),
		removeMap: (id: string) => removeRecordFromStore<SelectedFeatures>(id, store),
		selectLayer: (mapId: string, feature: SelectedFeature) => addRecordToNestedStore<SelectedFeature>(mapId, feature.id, feature, store),
		deselectLayer: (mapId: string, featureId: string) => removeRecordFromNestedStore<SelectedFeature>(mapId, featureId, store),
		reset: () => store.set({})
	};
};
export const selectedFeaturesStore = createSelectedFeatures();

/**
 * creates store of an array of interactive layers
 * @returns a proxy to the store 
 */
const createInteractiveLayers = async () => {
	const interactiveLayers: InteractiveLayer[] = await getFeatureLayers();
	const interactiveLayersStore = writable<InteractiveLayer[]>(interactiveLayers);
	return interactiveLayersStore;
};
export const interactiveLayersStore = await createInteractiveLayers();

/**
 * creates store of the currently selected interactive layer
 * @returns a proxy to the store with interactions baked in
 */
const createCurrentInteractiveLayer = () => {
	const { set, update, subscribe} = writable<InteractiveLayer | null>(null);

	return {
		set,
		update,
		subscribe,
		updateByID: async (id: string) => {
			const newInteractiveLayer = await getInteractiveLayerByID(id)
			if (newInteractiveLayer === null) {
				console.error(`No Interactive Layer with ID ${id} found`)
			}
			set(newInteractiveLayer)
		},
		clear: () => set(null)
	}
}
export const currentInteractiveLayerStore = createCurrentInteractiveLayer();