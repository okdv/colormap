// src/lib/services/settings.ts
import type { Settings } from "$lib/types";
import type { Writable } from "svelte/store";

/**
 * updates settings to store/localStorage and refreshes page if feature layer was changed (to re-init map)
 */
export const updateSettings = (newSettings: Settings, store: Writable<Settings>) => {
    let refresh: boolean = false; 
    store.update(currentSettings => {
        // if feature layer filename changed, set refresh=true
        if (currentSettings.featureLayerFilename !== newSettings.featureLayerFilename) {
            refresh = true
        }
        // update store with new settings
        return newSettings
    })
    // reload if refresh was set to true (feature layer changed) 
    if (refresh) { 
		window.location.reload();
    }
}