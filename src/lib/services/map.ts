// src/lib/services/map.ts
import { map, geoJsonLayer } from '$lib/stores/map'

/**
 * Initializes leaflet map including tiles (e.g. base layer) and features (e.g. counties)
 * @param mapContainer HTML element that will contain the leaflet map
 * @param geojson Parsed, ready to use geojson data
 * @todo enhance coordinate defaults, accessibility and memory 
 * @todo support other tiles/base layers 
 */
export const initMapAndLayers = async(mapContainer: HTMLDivElement, geojson: any) => {
    const L = await import('leaflet'); // lazy import to avoid SSR 
    await import('leaflet/dist/leaflet.css');

    // local instance of the leaflet map + set default view 
      const localLeafletMap = L.map(mapContainer).setView([37.8, -96], 4);

      // add OSM tile as base layer + attribution, add to local map
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(localLeafletMap);

      // local instance of the features geojson layer, e.g. counties
      const localGeoJsonLayer = L.geoJSON(geojson, {
        // set base style
        style: {
            color: '#444',
            weight: 1,
            fillColor: '#ccc',
            fillOpacity: 0.3,
        },
        onEachFeature: (feature, layer) => {
          // get metadata 
          const id = feature.properties.GEOID; 
          const name = feature.properties.NAME;
          
          // add feature id to generated layer as well
          (layer as any).featureId = id; 

          // Add click event to each feature layer
          layer.on('click', () => {
            // if selected, unselect
            if (feature.properties.style.fillColor !== "#ccc") {
                feature.properties.style.fillColor = "#ccc"
                return
            }
            // select it
            feature.properties.style.fillColor = "#FDD2B4"
          });
          // county name shown on hover
          layer.bindTooltip(name);
        }
        }).addTo(localLeafletMap); // add feature layers to local map
    
    // set map and layer store 
    map.set(localLeafletMap);
    geoJsonLayer.set(localGeoJsonLayer);
}
