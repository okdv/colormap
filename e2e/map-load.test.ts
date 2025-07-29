import { expect, test } from '@playwright/test';

// may throw errors running locally due to browser dependencies, i think it should work in github actions though

test('should load the webapp and leaflet map', async ({ page }) => {
	await page.goto('/');
	// confirm map container is visible
	await expect(page.locator('#map-container')).toBeVisible();
	// check that map tiles are rendering by looking for attribution (not perfect but ok for now)
	await expect(page.getByText('OpenStreetMap contributors')).toBeVisible();
});
