import { beforeEach, describe, expect, it } from 'vitest';
import { currentInteractiveLayerStore, interactiveLayersStore, legendStore } from '$lib/stores';
import { get } from 'svelte/store';

describe('legendStore', () => {
	// reset the store value before each test
	beforeEach(() => {
		legendStore.clearAll();
	});

	it('should init with default legend item', () => {
		const initLegendStore = get(legendStore);
		let currentLegendStore = initLegendStore;

		// expect an empty legend to at webapp init
		expect(Object.keys(initLegendStore).length).toBe(0);

		// add a map and expect there to be a map and legend entry now
		legendStore.addMap('test');
		currentLegendStore = get(legendStore);
		const currentLegend = currentLegendStore['test'];
		expect(currentLegend).toBeDefined;
		const currentLegendValues = Object.values(currentLegend);
		expect(currentLegendValues.length).toBe(1);
		expect(currentLegendValues[0].name).toBe('Visited');
	});
});
