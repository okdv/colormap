import { getManifest, getFile, mdToHtml } from '$lib/server/utils.server';
import type { InteractiveLayer } from '$lib/types';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const ssr = false;
export const prerender = true;

const interactiveLayers: InteractiveLayer[] = getManifest();
const readmeMd = getFile('./', 'README.md');
let contributingMd = getFile('./', 'CONTRIBUTING.md');

export const load: PageServerLoad = async () => {
	if (!interactiveLayers || interactiveLayers.length === 0) {
		throw error(500, 'Unable to locate manifest data');
	}
	if (!readmeMd || !contributingMd || readmeMd.length === 0 || contributingMd.length === 0) {
		throw error(500, 'Unable to get markdown files');
	}

	// pre-processing markdowns
	// add ID to contribute interactive layers for nav purposes
	contributingMd.replace(/#+\scontribute\sinteractive\slayers\s*/gi, '<h3 class="text-4xl" id="contribute-interactive-layers">Contribute Interactive Layers</h3>')

	const readme = mdToHtml(readmeMd, true);
	const contributing = mdToHtml(contributingMd, true);

	return {
		interactiveLayers,
		sections: {
			readme,
			contributing
		}
	};
};
