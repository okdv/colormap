// src/lib/stores/map.ts 
import { writable } from "svelte/store";
import type * as L from 'leaflet'; 

// leaflet map instance, initialized to null bc it only should exist client side
export const map = writable<L.Map | null>(null);

// geojson layer of features (e.g. counties) that sits on top of map, init to null bc it should only exist client side
export const geoJsonLayer = writable<L.GeoJSON | null>(null)