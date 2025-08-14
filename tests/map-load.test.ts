import { expect, test } from '@playwright/test';

// may throw errors running locally due to browser dependencies, i think it should work in github actions though

test('should load the webapp and leaflet map', async ({ page }) => {
	await page.goto('/');
});
