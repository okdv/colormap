import { test } from '@playwright/test';

test('should load the webapp and leaflet map', async ({ page }) => {
	await page.goto('/');
});
