// src/lib/types/map.ts

import type { LegendItem } from '$lib/types';

// SelectedFeatures: the map features (e.g. counties) that the user has selected
export class SelectedFeature {
	id: string;
	name: string;
	selectedById: string;
	constructor(id: string, name: string, selectedById: string) {
		this.id = id;
		this.name = name;
		this.selectedById = selectedById;
	}
}

export type GeoJsonFeature = {
	type: string;
	featureId?: string;
	properties: {
		GEOID: string;
		[key: string]: unknown;
	};
	geometry: {
		type: string;
		coordinates: unknown[];
	};
};

export type GeoJson = {
	type: string;
	name: string;
	features: GeoJsonFeature[];
};

export type InteractiveLayer = {
	id: string; // should equal the key from the object
	filename: string;
	name: string;
	defaultZoom?: number;
	defaultCoordinates?: {
		latitude: number;
		longitude: number;
	};
	defaultLegendItems?: LegendItem[];
};

export type Func<T extends any[]> = (...args: T) => void;