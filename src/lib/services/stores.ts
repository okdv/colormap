// src/lib/services/stores.ts

import { browser } from '$app/environment';
import type { Func } from '$lib/types';
import { get, writable, type Writable } from 'svelte/store';

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
 * adds a record to a nested store, e.g. it can add a feature to selectedFeatures (which is a Record Set of Features nested in a Record Set of Maps)
 * @param outerKey key of the outer Record, e.g. mapId in selectedFeatures 
 * @param innerKey key of the inner Record, e.g. feature.id in selectedFeatures 
 * @param newRecord the value of the new Record being added to the nested set, e.g. feature: SelectedFeature in selectedFeatures 
 * @param store the store it will be updating, e.g. selectedFeatures
 */
export const addRecordToNestedStore = <T>(
	outerKey: string, 
	innerKey: string,
	newRecord: T, 
	store: Writable<Record<string, Record<string, T>>>
) => {
	store.update((outerRecords) => {
		// create a local clone to interact with
		const newOuterRecords = {...outerRecords};

		// if the outerkey doesnt exist yet, create it with init value of newRecord 
		if (!newOuterRecords[outerKey]) {
			newOuterRecords[outerKey] = {}
		}

		// update the nested Record immutably
		newOuterRecords[outerKey] = {
			...newOuterRecords[outerKey],
			[innerKey]: newRecord
		}

		return newOuterRecords
	});
}

/**
 * removes a record from a nested store, e.g. it can remove a feature from selectedFeatures (which is a Record Set of Features nested in a Record Set of Maps)
 * @param outerKey key of the outer Record, e.g. mapId in selectedFeatures 
 * @param innerKey key of the inner Record, e.g. feature.id in selectedFeatures 
 * @param store the store it will be updating, e.g. selectedFeatures
 */
export const removeRecordFromNestedStore = <T>(
	outerKey: string, 
	innerKey: string,
	store: Writable<Record<string, Record<string, T>>>
) => {
	store.update((outerRecords) => {
		// create a local clone to interact with
		const newOuterRecords = {...outerRecords};

		// if the outer and inner Records/Sets exist, create a local clone of the inner Record Set and delete the inner Record from that
		if (newOuterRecords[outerKey] && newOuterRecords[outerKey][innerKey]) {
			const newInnerRecords = { ...newOuterRecords[outerKey]}
			delete newInnerRecords[innerKey]

			newOuterRecords[outerKey] = newInnerRecords;
		}

		return newOuterRecords
	});
}

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
 * returns a deep clone of the stores value, rather than a reference to the store value like get(store)
 * @param store the store to be deep cloned
 */
export const getDeepClonedValue = <T>(store: Writable<T>) => {
	const currentValue = get(store);
	// use structuredClone if its available
	if (typeof structuredClone === 'function') {
		return structuredClone(currentValue);
	}
	// fallback to og deep clone trick if not
	return JSON.parse(JSON.stringify(currentValue));
};

/**
 * Saves a value to localStorage with a key
 * @param key (string) full localStorage key name, e.g. "colormap.fooBar"
 * @param value value to set localStorage to, will be stringified
 */
const persistToLocalStorage = <T>(key: string, value: T) => {
	try {
		console.log(key + ' saved to localSTorage');
		localStorage.setItem(key, JSON.stringify(value));
	} catch (err) {
		console.error(`Error saving ${key} to localStorage: ${err}`);
	}
};

/**
 * Executes a function with a queueing delay, particularly used for creating a debounce behavior between svelte store and localStorage to sort of 'queue' saves
 * @param func (Function) this is the function that will be executed on the debounce, can have any number or type of args
 * @param delay (number) ms delay that is passed to setTimout
 */
const debounce = <T extends unknown[]>(func: Func<T>, delay: number): Func<T> => {
	let timeout: ReturnType<typeof setTimeout>;
	console.log('debounced');

	return function (this: unknown, ...args: T) {
		clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(this, args), delay);
	};
};

/**
 * Creates and syncs svelte store and localStorage with initial or existing values, or updated items from the store subscription
 * @param storeName the localstorage store specific key, e.g. key='fooBar' results in localStorage entry named "colormap.fooBar"
 * @param initValue initial value for the store and localstorage, usually a default value'
 * @param delay integer that sets a debounce delay for localStorage to be updated, defaults to 0, which bypasses debounce
 * @returns a svelte store
 */
export const storeData = <T>(storeName: string, initValue: T, delay: number = 0): Writable<T> => {
	// Local Storage Keys follow this format: colormap.fooBar
	const LOCAL_STORAGE_KEY_PREFIX = 'colormap';
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

		// check if delay is set
		if (delay > 0) {
			const debouncedSaved = debounce(persistToLocalStorage, delay);
			store.subscribe((value) => {
				debouncedSaved(key, value);
			});
		} else {
			store.subscribe((value) => {
				persistToLocalStorage(key, value);
			});
		}
	}

	return store;
};
