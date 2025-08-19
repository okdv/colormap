import type { EntryGenerator, PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import type { GeoJson, InteractiveLayer } from '$lib/types';
import { getStaticFile } from '$lib/services/utils.server';

const manifest: InteractiveLayer[] = getStaticFile('manifest.json')

console.log('page loaded - server')

export const entries: EntryGenerator = async() => {
    return manifest.map(layer => ({ slug: layer.id}));
};

export const load: PageServerLoad = async({params}) => {
    const layerId = params.slug;
    const layer = manifest.find(layer => layer.id === layerId)

    if (!layer) {
        throw error(404, `GeoJson layer ${layerId} not found`);
    }

    const geojson: GeoJson = getStaticFile(layer.filename)
    
    return {
        geojson, 
        layerMetadata: layer
    }
}
