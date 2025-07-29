// src/lib/types/settings.ts

// structure of the base style itself
type BaseStyle = {
	color: string;
	weight: number;
	fillOpacity: number;
	fillColor: string;
};

// structure of the Settings that hold the base style
type BaseStyleSetting = {
	selected: Omit<BaseStyle, 'fillColor'>;
	unselected: BaseStyle;
};

// Settings: global settings for the web app
export class Settings {
	featureLayerFilename: string;
	baseStyle: BaseStyleSetting;
	constructor(featureLayerFilename?: string | null, baseStyle?: BaseStyleSetting | null) {
		this.featureLayerFilename = featureLayerFilename ?? 'us_counties_2023.geojson';
		this.baseStyle = baseStyle ?? {
			selected: {
				color: 'white',
				weight: 2,
				fillOpacity: 0.5
			},
			unselected: {
				color: '#444',
				weight: 1,
				fillOpacity: 0.3,
				fillColor: '#ccc'
			}
		};
	}
}
