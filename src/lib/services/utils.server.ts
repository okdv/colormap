/** src/lib/services/utils.server.ts
 *      a suite of utility functions to run at static site generation (server side render)
 *      @important do not call these on the client side
 */
import { readFileSync } from 'fs';
import { resolve } from 'path';

/**
 * returns a file from the static/data directory using only filepath utilities
 * @returns parsed JSON of the files content
 */
export const getStaticFile = (filename: string) => {
	const filePath = resolve('./static/data/', filename);
	const fileContent = readFileSync(filePath, 'utf-8');
	return JSON.parse(fileContent);
};
