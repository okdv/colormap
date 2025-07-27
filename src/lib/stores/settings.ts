// src/lib/stores/settings.ts
import { storeData } from "$lib/services";
import { Settings } from "$lib/types";

const createSettings = () => {
    const defaultSettings: Settings = new Settings()
    const { subscribe, set } = storeData<Settings>('settings', defaultSettings)

    return {
        subscribe,
        set,
        reset: set(defaultSettings)
    }
}

export const settingsStore = createSettings();