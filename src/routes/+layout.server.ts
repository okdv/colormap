import { getManifest } from '$lib/server/utils.server';
import type { InteractiveLayer } from '$lib/types';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const ssr = false;
export const prerender = true;

const interactiveLayers: InteractiveLayer[] = getManifest();

export const load: LayoutServerLoad = async () => {
	if (!interactiveLayers || interactiveLayers.length === 0) {
		throw error(500, 'Unable to locate manifest data');
	}

	return {
		interactiveLayers
	};
};
