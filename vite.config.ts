import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	resolve: process.env.VITEST ? { conditions: ['browser'] } : undefined,
	test: {
		exclude: ['**/node_modules/**', '**/build/**', '**/*.spec.ts', '**/*.spec.js'],
		include: ['src/**/*.test.{js,ts}'] // test.ts = vitest, .spec.ts = playwright
	}
});
