// src/lib/stores/settings.ts
import { storeData } from "$lib/services";
import { Settings } from "$lib/types";

const createSettings = () => {
    const defaultSettings: Settings = new Settings()
    const store = storeData<Settings>('settings', defaultSettings)

    return {
        subscribe: store.subscribe,
        updateSettings: (newSettings: Settings) => store.set(newSettings),
        reset: () => store.set(defaultSettings)
    }
}

export const settingsStore = createSettings();