// src/lib/types/map.ts

// SelectedFeatures: the map features (e.g. counties) that the user has selected
export class SelectedFeature  {
    id: string;
    name: string;
    selectedById: string; 
    constructor(id: string, name: string, selectedById: string) {
        this.id = id; 
        this.name = name;
        this.selectedById = selectedById;
    }
}; 