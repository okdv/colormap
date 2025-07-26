// src/lib/types/map.ts

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
