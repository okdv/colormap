import { getStaticFile } from '../src/lib/services/utils.server';
import type { InteractiveLayer } from '$lib/types';
import { test } from '@playwright/test';

let manifest: InteractiveLayer[] = getStaticFile('manifest.json');

test.describe('Prerendered Map Pages', () => {
	if (!manifest || manifest.length === 0) {
		test.fail('No manifest data available', () => {});
		return;
	}

	for (const layer of manifest) {
		test(`should correctly prerender the page for slug: ${layer.id}`, async ({ page }) => {
			await page.goto(`/map/${layer.id}`);
		});
	}
});
