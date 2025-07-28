// src/lib/types/settings.ts

type BaseStyle = {
    color: string,
    weight: number, 
    fillOpacity: number
    fillColor: string,
}

type BaseStyleSetting = {
    selected: Omit<BaseStyle, 'fillColor'>,
    unselected: BaseStyle
}

// Settings: global settings for the web app 
export type Settings = {
    featureLayerFilename: string,
    baseStyle: BaseStyleSetting
}
