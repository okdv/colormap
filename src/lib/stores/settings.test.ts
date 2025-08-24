import { beforeEach, describe, expect, it } from 'vitest';
import { settingsStore } from '$lib/stores';

describe('settingsStore', () => {
	beforeEach(() => {
		settingsStore.reset();
	});

	it('should init with default settings, check with deep clone', () => {
		const currentSettings = settingsStore.getCurrentValue();
		expect(currentSettings.baseStyle.unselected.fillColor).toBe('#ccc');
	});

	it('should allow settings to be updated and reset', () => {
		let settings = settingsStore.getCurrentValue();
		settings.baseStyle.selected.color = 'red';
		settingsStore.updateSettings(settings);
		settings = settingsStore.getCurrentValue();
		settingsStore.reset();
		settings = settingsStore.getCurrentValue();
		expect(settings.baseStyle.selected.color).toBe('white');
	});
});
