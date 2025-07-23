import type { LegendItem } from '$lib/types';
import { get, writable } from 'svelte/store';
import {
	addRecordToStore,
	removeRecordFromStore,
	storeData,
	updateRecordInStore
} from '$lib/services';

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
	let legend: Record<string, LegendItem> = {
		[defaultItem.id]: defaultItem
	};

	// create store
	const store = storeData<Record<string, LegendItem>>('legend', legend);

	return {
		subscribe: store.subscribe,
		updateItem: (newItem: LegendItem) => updateRecordInStore(newItem.id, newItem, store),
		addItem: (newItem: LegendItem) => addRecordToStore(newItem.id, newItem, store),
		removeItem: (id: string) => removeRecordFromStore(id, store),
		clearItems: () => store.set({ [defaultItem.id]: defaultItem })
	};
};
export const legendStore = createLegend();

/**
 * handles what legend item is selected
 * @returns a legend item or null
 */
const createSelectedItem = (): LegendItem | null => {
	const currentLegend = get(legendStore);
	const currentLegendValues = Object.values(currentLegend);
	return currentLegendValues.length > 0 ? currentLegendValues[0] : null;
};
export const selectedItem = writable<LegendItem | null>(createSelectedItem());
