// src/lib/server/utils.server.ts
// server side utility functions, since webapp is SSG'd these are run at build time only 
import { readFileSync } from 'fs';
import { resolve } from 'path';
import type { InteractiveLayer } from "$lib/types";

/**
 * returns a file from the static/data directory using only filepath utilities
 * @returns parsed JSON of the files content
 */
export const getStaticFile = (filename: string) => {
	const filePath = resolve('./static/data/', filename);
	const fileContent = readFileSync(filePath, 'utf-8');
	return JSON.parse(fileContent);
};

// build time cache of interactive layers to avoid duplicate calls to retrieve manifest 
let interactiveLayers: InteractiveLayer[] | null = null

export const getManifest = (): InteractiveLayer[] => {
    if (interactiveLayers) {
        return interactiveLayers
    }
    return getStaticFile('manifest.json')
}