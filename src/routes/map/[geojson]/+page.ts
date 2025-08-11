import { getFeatureLayers } from '$lib/services';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const prerender = true;
export const ssr = false;

export const load: PageLoad = async ({ params }) => {
	const interactiveLayersManifest = await getFeatureLayers();
	if (interactiveLayersManifest.includes(params.geojson)) {
		return {
			geojson: params.geojson
		};
	}
	error(404, `Interactive map layer ${params.geojson} not found`);
};
