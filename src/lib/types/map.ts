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
		[key: string]: any;
	};
	geometry: {
		type: string;
		coordinates: any[];
	};
};

export type GeoJson = {
	type: string;
	name: string;
	features: GeoJsonFeature[];
};
