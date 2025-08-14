import { expect, it } from 'vitest';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import type { InteractiveLayer } from '$lib/types';

const interactiveLayersManifestPath = resolve('./static/data/manifest.json');
let rawManifest: InteractiveLayer[];

it('should be available as a raw file', () => {
	try {
		const fileContent = readFileSync(interactiveLayersManifestPath, 'utf-8');
		rawManifest = JSON.parse(fileContent);
	} catch (err) {
		expect.fail(`Could not read manifest: ${err}`);
	}
});

it('should be an array of InteractiveLayers', () => {
	expect(Array.isArray(rawManifest)).toBe(true);
	expect(rawManifest.length > 0).toBe(true);
	for (let i = 0; i < rawManifest.length; i++) {
		const currentInteractiveLayer = rawManifest[i];
		if (!currentInteractiveLayer.id || !currentInteractiveLayer.name || !currentInteractiveLayer.filename) {
			expect.fail('Interactive layer manifest entry is missing one of the following [id, name, filename]');
		}
	}
});

it('should begin with a custom placeholder entry', () => {
	expect(rawManifest[0].id).toBe('custom');
});

it('should have no duplicate entries', () => {
	const currentInteractiveLayerIds = rawManifest.map((layer) => layer.id);
	const uniqueInteractiveLayerIds = new Set(currentInteractiveLayerIds);
	expect(uniqueInteractiveLayerIds.size).toBe(currentInteractiveLayerIds.length);
});
