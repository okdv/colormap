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
	const filePath = resolve(filepath, filename);
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
	return JSON.parse(manifestStr);
};

/**
 * convert markdown into html, specifically used to convert README and CONTRIBUITING into homepage sections
 * @param md markdown file content as a string
 * @param trim controls rather some md elements should be removed, such as primary header
 * @returns html parsed from markdown
 */
export const mdToHtml = (md: string, trim: boolean = false) => {
	if (trim) {
		md = md.replace(/#.*[\n\r]/, '');
	}
	const html = md
		.replace(/^(#+)\s(.*)/gm, (match, hashes, content) => {
			// headers
			const level = hashes.length+1;
			return `<h${level} class="text-${6 - level}xl">${content}</h${level}>`;
		})
		.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // bold
		.replace(/\*(.*?)\*/g, '<em>$1</em>') // italics
		.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-500 hover:text-blue-700 underline">$1</a>') // links
		.replace(/`{3}[a-zA-Z]+.*/g, '<code class="bg-gray-200 text-red-600 px-1 rounded">') // code
		.replace(/`{3}.*/g, '</code>')
		.replace(/`([^`]+)`/g, '<code class="bg-gray-200 text-red-600 px-1 rounded">$1</code>')
		.replace(/\[\s{1}\]/g, '<input type="checkbox" />') // checkboxes
		.replace(/\[x{1}\]/gi, '<input type="checkbox" checked />') 
		.replace(/\n\n/g, '<p></p>'); // Simple paragraph breaks

	return html;
};
