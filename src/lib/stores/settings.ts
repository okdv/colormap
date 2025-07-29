// src/lib/stores/settings.ts
import { storeData, updateSettings } from "$lib/services";
import type { Settings } from "$lib/types";
import { get } from "svelte/store";

const createSettings = () => {
    const defaultSettings: Settings = {
        featureLayerFilename: 'us_counties_2023.geojson',
        baseStyle: {
            selected: {
                color: 'white',
                weight: 2,
                fillOpacity: 0.5
            },
            unselected: {
                color: '#444',
                weight: 1,
                fillOpacity: 0.3,
                fillColor: '#ccc'
            }
        }
    }
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

        }
        // @todo add a getCurrentValue function to bypass the obj reference returned by get(store) 
    }
}

export const settingsStore = createSettings();