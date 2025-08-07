import { existsSync } from 'fs'; // checks drive for files
import { fileURLToPath } from 'url'; //converts url to path string
import { dirname, join } from 'path'; //dirname returns directory portion of file path

const fileName = fileURLToPath(import.meta.url); // import.meta.url gives the URL of the current module
const dirName = dirname(fileName); // === ./static/data

const statesFilePath = join(dirName, '/us_states_2024.geojson');
const countriesFilePath = join(dirName, '/us_counties_2023.geojson');

try {
	if (existsSync(statesFilePath)) {
		console.log('Found states data!');
	} else {
		console.log('Could not find state data');
	}
} catch (error) {
	console.log(`There was an error with the states data: ${error}`);
}

try {
	if (existsSync(countriesFilePath)) {
		console.log('Found countries data!');
	} else {
		console.log('Could not find countries data');
	}
} catch (error) {
	console.log(`There was an error with the countries data: ${error}`);
}

// console.log( statesFilePath);
// console.log( countriesFilePath);
