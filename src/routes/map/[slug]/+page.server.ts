import type { EntryGenerator, PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import type { GeoJson, InteractiveLayer } from '$lib/types';
import { getManifest, getFile } from '$lib/server/utils.server';

const manifest: InteractiveLayer[] = getManifest();

export const entries: EntryGenerator = async () => {
	return manifest.map((layer) => ({ slug: layer.id }));
};

export const load: PageServerLoad = async ({ params }) => {
	const layerId = params.slug;
	const layer = manifest.find((layer) => layer.id === layerId);

	if (!layer) {
		throw error(404, `GeoJson layer ${layerId} not found`);
	}

	const jsonStr = getFile('./static/data/', layer.filename);
	const geojson: GeoJson = JSON.parse(jsonStr)

	return {
		geojson,
		layerMetadata: layer
	};
};
