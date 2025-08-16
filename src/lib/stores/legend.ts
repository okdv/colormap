import type { LegendLocalStorage, LegendItem, Legend } from '$lib/types';
import { get, writable } from 'svelte/store';
import { addRecordToNestedStore, addRecordToStore, removeRecordFromNestedStore, removeRecordFromStore, storeData, updateRecordInNestedStore, updateRecordInStore } from '$lib/services';

/**
 * Creates legend store and persists it to local storage (or uses an existing local storage if available)
 * @returns a proxy to the store with interactions baked in
 */
const createLegend = () => {
	// default legend item
	const defaultItem = {
		id: crypto.randomUUID(),
		name: 'Visited',
		color: '#ff0000'
	};
	// default legend
	const legendSet: Record<string, LegendItem> = {
		[defaultItem.id]: defaultItem
	};

	// create store
	const store = storeData<LegendLocalStorage>('legend', {});

	return {
		subscribe: store.subscribe,
		addMap: (mapId: string) => addRecordToStore<Legend>(mapId, legendSet, store),
		removeMap: (mapId: string) => removeRecordFromStore<Legend>(mapId, store),
		clearMap: (mapId: string) => updateRecordInStore<Legend>(mapId, legendSet, store),
		addLegendItem: (mapId: string, item: LegendItem) => addRecordToNestedStore(mapId, item.id, item, store),
		removeLegendItem: (mapId: string, itemId: string) => removeRecordFromNestedStore(mapId, itemId, store),
		updateLegendItem: (mapId: string, newItem: LegendItem) => updateRecordInNestedStore(mapId, newItem.id, newItem, store),

		updateItem: (newItem: LegendItem) => updateRecordInStore(newItem.id, newItem, store),
		addItem: (newItem: LegendItem) => addRecordToStore(newItem.id, newItem, store),
		removeItem: (id: string) => removeRecordFromStore(id, store),
		clearItems: () => store.set({ [defaultItem.id]: defaultItem })
	};
};
export const legendStore = createLegend();
export const selectedItem = writable<LegendItem | null>(null);
