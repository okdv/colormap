import { getManifest, getFile, mdToHtml } from '$lib/server/utils.server';
import type { InteractiveLayer } from '$lib/types';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const ssr = false;
export const prerender = true;

const interactiveLayers: InteractiveLayer[] = getManifest();
const readmeMd = getFile('./', 'README.md');
const contributingMd = getFile('./', 'CONTRIBUTING.md');

export const load: PageServerLoad = async () => {
	let readme: string;
	let contributing: string;
	if (!interactiveLayers || interactiveLayers.length === 0) {
		throw error(500, 'Unable to locate manifest data');
	}
	if (!readmeMd || !contributingMd || readmeMd.length === 0 || contributingMd.length === 0) {
		throw error(500, 'Unable to get markdown files');
	}

	readme = mdToHtml(readmeMd, true);
	contributing = mdToHtml(contributingMd, true);

	return {
		interactiveLayers,
		sections: {
			readme,
			contributing
		}
	};
};
