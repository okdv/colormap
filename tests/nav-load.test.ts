import { test, expect } from '@playwright/test';

test('should load navbar', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByAltText('colormap.app logo')).toBeVisible();
	await expect(page.locator('#navbar-dropdown-body')).toBeHidden();
	await expect(page.locator('#navbar-dropdown-entry-1')).toBeDefined();
});
