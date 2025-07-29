// src/lib/stores/settings.ts
import { storeData, updateSettings, updateFeatureLayer } from "$lib/services";
import { Settings } from "$lib/types";
import { get } from "svelte/store";

/**
 * handles global settings
 * @returns functions to interact with settings store
 */
const createSettings = () => {
    const defaultSettings = new Settings()
    const store = storeData<Settings>('settings', defaultSettings)

    return {
        subscribe: store.subscribe,
        updateSettings: (newSettings: Settings) => updateSettings(newSettings, store),
        reset: () => store.set(defaultSettings),
        // returns a deep clone of the current state value. get(store) returns a ref to the object, no the object itself.
        getCurrentValue: () => {
            const currentValue = get(store)
            // use structuredClone if its available
            if (typeof structuredClone === 'function') {
                return structuredClone(currentValue)
            }
            // fallback to og deep clone trick if not 
            return JSON.parse(JSON.stringify(currentValue));

        },
        updateFeatureLayer: (newFeatureFilename: string) => updateFeatureLayer(newFeatureFilename, store)
        // @todo add a getCurrentValue function to bypass the obj reference returned by get(store) 
    }
}

export const settingsStore = createSettings();