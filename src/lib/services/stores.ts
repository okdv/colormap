// src/lib/services/stores.ts

import { browser } from '$app/environment';
import { writable, type Writable } from 'svelte/store';

/**
 * adds or updates record in store
 * @param key string key for the new record, usually it should be the id field
 * @param newRecord the new record to be added
 * @param store the store it will be updating
 */
export const addRecordToStore = <T>(key: string, newRecord: T, store: Writable<Record<string, T>>) =>
	store.update((records) => ({
		[key]: newRecord,
		...records
	}));

/**
 * removes record in store
 * @param key id of the record to be removed
 * @param store the store it will be updating
 */
export const removeRecordFromStore = <T>(key: string, store: Writable<Record<string, T>>) =>
	store.update((records) => {
		const newItems = { ...records };
		delete newItems[key];
		return newItems;
	});

/**
 * updates record in store
 * @param key id of the record to be removed
 * @param store the store it will be updating
 */
export const updateRecordInStore = <T>(key: string, newRecord: T, store: Writable<Record<string, T>>) =>
	store.update((records) => {
		const storedData = { ...records };
		storedData[key] = newRecord;
		return storedData;
	});

/**
 * Creates and syncs svelte store and localStorage with initial or existing values, or updated items from the store subscription
 * @param storeName the localstorage store specific key, e.g. key='fooBar' results in localStorage entry named "colormap.fooBar"
 * @param initValue initial value for the store and localstorage, usually a default value
 * @returns a svelte store
 */
export const storeData = <T>(storeName: string, initValue: T): Writable<T> => {
	// Local Storage Keys follow this format: colormap.fooBar
	const LOCAL_STORAGE_KEY_PREFIX = 'colormap';

	let value = initValue;
	const key = `${LOCAL_STORAGE_KEY_PREFIX}.${storeName}`;

	// create store
	const store = writable(initValue);

	// if this is running in the browser and has local storage
	if (browser && typeof localStorage !== 'undefined') {
		// use localstorage data if it exists
		const stored = localStorage.getItem(key);
		if (stored) {
			try {
				const json = JSON.parse(stored);
				store.set(json);
			} catch (e) {
				console.error(`Error parsing ${key} from localStorage: `, e);
				store.set(initValue);
			}
		}

		// subscribe localstorage to the store
		store.subscribe((value) => {
			try {
				localStorage.setItem(key, JSON.stringify(value));
			} catch (e) {
				console.error(`Error setting ${key} to localStorage`, e);
			}
		});
	}

	return store;
};
