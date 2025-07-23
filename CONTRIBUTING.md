## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview` or nginx, instructions below:.

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

## Commit messages

Please follow this git commit message format: `<type: chore, feat, fix>: <description> <rel issue number>`

e.g. `chore: cleaning up comments`, `feat: adding calendar feature #13`, `fix: home button deletes all data #16`
