// src/lib/services/settings.ts
import type { Settings } from "$lib/types";
import type { Writable } from "svelte/store";

export const updateSettings = (newSettings: Settings, store: Writable<Settings>) => {
    let refresh: boolean = false; 
    store.update(currentSettings => {
        // if feature layer filename changed, refresh after update
        console.log(currentSettings, newSettings.featureLayerFilename)
        if (currentSettings.featureLayerFilename !== newSettings.featureLayerFilename) {
            refresh = true
        }
        return newSettings
    })
    if (refresh) { 
		window.location.reload();
    }
}