// src/lib/types/legend.ts

// LegendItem: items on map legend that user can remove/add/edit/select
export class LegendItem {
    id: string
    name: string
    color: string
    constructor(name?: string | null, color?: string | null) {
        this.id = crypto.randomUUID()
        this.name = name ?? "Name..."
        // generate a random color if one is not provided
        if (!color) {
            color = `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}`;
        }
        this.color = color;
    }
}