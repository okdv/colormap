// src/lib/stores/settings.ts
import { storeData, updateSettings, updateFeatureLayer, getDeepClonedValue } from "$lib/services";
import { Settings } from "$lib/types";

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
        getCurrentValue: () => getDeepClonedValue(store),
        updateFeatureLayer: (newFeatureFilename: string) => updateFeatureLayer(newFeatureFilename, store)
    }
}

export const settingsStore = createSettings();