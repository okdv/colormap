// src/lib/stores/map.ts 
import { writable } from "svelte/store";
import type * as L from 'leaflet'; 
import { addRecordToStore, removeRecordFromStore, storeData } from "$lib/services/stores";
import type { SelectedFeature } from "$lib/types/map";

// leaflet map instance, initialized to null bc it only should exist client side
export const map = writable<L.Map | null>(null);

// geojson layer of features (e.g. counties) that sits on top of map, init to null bc it should only exist client side
export const geoJsonLayer = writable<L.GeoJSON | null>(null)

/**
 * creates store of selected features and persists it to local storage (or uses an existing local storage if available) 
 * @returns a proxy to the store with interactions baked in
 * @todo support updating selected feature, avoids need to deselect > reselect in order to update the selector legend item used 
 */
const createSelectedFeatures = () => {
    const store =  storeData<Record<string, SelectedFeature>>('selectedFeatures', {});
  
    return {
      subscribe: store.subscribe,
      select: (feature: SelectedFeature) => addRecordToStore<SelectedFeature>(feature.id, feature, store),
      deselect: (id: string) => removeRecordFromStore<SelectedFeature>(id, store),
      deselectAll: () => store.set({})
    };
  };
  
  export const selectedFeaturesStore = createSelectedFeatures();