import type { PageLoad } from './$types';

export const ssr = false;
export const prerender = true;

// support selecting geojson via URL type param
export const load: PageLoad = () => {
	console.log('homepage loaded')
};
