import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173,
		reuseExistingServer: !process.env.CI
	},
	testDir: './e2e',
	fullyParallel: true, // run tests in parallel
	retries: process.env.CI ? 2 : 0, // retry tests if in github action
	workers: process.env.CI ? 1 : undefined, // run with one worker only in github action 
	forbidOnly: !!process.env.CI, // fail in github action if left test.only in code anywhere 
	reporter: 'html', // https://playwright.dev/docs/test-reporters
	// shared settings for all projects 
	use: {
		baseURL: 'http://localhost:4173',
		trace: 'on-first-retry',
	}, 
	// projects for major browsers/environments 
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		  },
	  
		  {
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] },
		  },
	  
		  {
			name: 'webkit',
			use: { ...devices['Desktop Safari'] },
		  },
		/* Test against mobile viewports. */
		// {
		//   name: 'Mobile Chrome',
		//   use: { ...devices['Pixel 5'] },
		// },
		// {
		//   name: 'Mobile Safari', 
		//   use: { ...devices['iPhone 12'] },
		// },

		/* Test against branded browsers. */
		// {
		//   name: 'Microsoft Edge',
		//   use: { ...devices['Desktop Edge'], channel: 'msedge' },
		// },
		// {
		//   name: 'Google Chrome',
		//   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
		// },
	]
});
