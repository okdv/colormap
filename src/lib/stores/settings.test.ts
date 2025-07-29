import { beforeEach, describe, expect, it } from "vitest";
import { settingsStore } from "$lib/stores";


describe('settingsStore', () => {
    beforeEach(() => {
        settingsStore.reset();
    });

    it('should init with default settings, check with deep clone', () => {
        const currentSettings = settingsStore.getCurrentValue();
        expect(currentSettings.featureLayerFilename).toBe('us_counties_2023.geojson');
        expect(currentSettings.baseStyle.unselected.fillColor).toBe('#ccc');
    });

    it('should allow settings to be updated and reset', () => {
        const newFeatureFilename = 'us_states_2024.geojson'
        let settings = settingsStore.getCurrentValue();
        settings.baseStyle.selected.color = 'red'
        settings.featureLayerFilename = newFeatureFilename
        settingsStore.updateSettings(settings)
        settings = settingsStore.getCurrentValue();
        expect(settings.featureLayerFilename).toBe(newFeatureFilename)
        settingsStore.reset()
        settings = settingsStore.getCurrentValue();
        expect(settings.baseStyle.selected.color).toBe('white');
    });

});