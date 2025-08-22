// src/lib/server/utils.server.ts
// server side utility functions, since webapp is SSG'd these are run at build time only
import { readFileSync } from 'fs';
import { resolve } from 'path';
import type { InteractiveLayer } from '$lib/types';

/**
 * returns a file using only filepath utilities
 * @param filepath location of file, e.g. ./static/data/
 * @param filename name of file, e.g. manifest.json
 * @returns parsed file content as string
 */
export const getFile = (filepath: string, filename: string): string => {
	const filePath = resolve('./static/data/', filename);
	const fileContent = readFileSync(filePath, 'utf-8');
	return fileContent;
};

// build time cache of interactive layers to avoid duplicate calls to retrieve manifest
const interactiveLayers: InteractiveLayer[] | null = null;

export const getManifest = (): InteractiveLayer[] => {
	if (interactiveLayers) {
		return interactiveLayers;
	}
	const manifestStr = getFile('./static/data/', 'manifest.json');
	return JSON.parse(manifestStr)
};