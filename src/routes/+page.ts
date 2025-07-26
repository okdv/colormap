import { selectedLayerStore } from "$lib/stores";
import type { PageLoad } from "./$types";

export const ssr = false;
export const prerender = true;

// support selecting geojson via URL type param
export const load: PageLoad = ({ url }) => {
    // get geojson from URL params
    const layerName = url.searchParams.get('type');

    // if url param is present, use it
    if (layerName && layerName.length > 0) {
        selectedLayerStore.selectLayer(layerName);
    }
}