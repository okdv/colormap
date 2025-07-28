// src/lib/stores/settings.ts
import { storeData, updateSettings } from "$lib/services";
import type { Settings } from "$lib/types";

const createSettings = () => {
    console.log("create settings ran")
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
        reset: () => store.set(defaultSettings)
    }
}

export const settingsStore = createSettings();