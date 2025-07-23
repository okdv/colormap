## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev
```

## Building

Before creating any Pull Requests please build and run the build.

To create the build:

```bash
npm run build
```

This will generate a `/build` dir with static assets 

You can preview the production build with `npm run preview` or using the provided docker-compose (nginx). Or really any web server. 

### Testing the Production Build with nginx container

If you're making changes that affect the production build, especially with the static adapter, you can test it locally using Docker Compose and Nginx:

1.  **Build the SvelteKit project for production:**
    ```bash
    npm run build
    ```
    This generates the static files in the `build` directory.
2.  **Ensure Podman or Docker is running**
3.  **Navigate to the root of the project**
4.  **Spin up the Nginx server with Docker Compose:**
    ```bash
    docker compose up -d
    ```
    Your production build should then be accessible at `http://localhost`.
5.  **To stop the server** once you're done testing:
    ```bash
    docker compose down
    ```

## Stack and Standards

### Stack 
The app uses [Svelte (SvelteKit)](https://svelte.dev/tutorial/svelte/welcome-to-svelte) as a framework/compiler, [TypeScript](https://www.typescriptlang.org/docs/), [TailwindCSS](https://tailwindcss.com/docs/editor-setup) as a CSS library, [FontAwesome](https://fontawesome.com/icons) for icons

Testing will use playwright and vitest, but these are not setup yet

ESLint and Prettier are used for linting/formatting, no need to run these yourself, we will do this prior to any releases

## Commit messages

Please follow this git commit message format: `<type: chore, feat, fix>: <description> <rel issue number>`

e.g. `chore: cleaning up comments`, `feat: adding calendar feature #13`, `fix: home button deletes all data #16`
