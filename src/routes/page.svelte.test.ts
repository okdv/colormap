import { page } from '@vitest/browser/context';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Page from './+page.svelte';

describe('/+page.svelte', () => {
	it('should render map tiles', async () => {
		render(Page);

		const heading = page.getByText('OpenStreetMap contributors');
		await expect.element(heading).toBeInTheDocument();
	});
});
