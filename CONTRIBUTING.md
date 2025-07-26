## Getting started

First time? [Start here](#instructions)

### Quick start

This is a quick start guide, meant to be more of a refresher, or a point of reference for experienced FOSS contributors who are familiar with some of the standards.

---

Once you've forked and pulled the project, and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev
```

Once you're ready to push your branch, first build, test and format locally:

```bash
npm run build
npm run format
npm run test # if you see errors about missing dependencies on the host machine, you can disregard those failures
```

This will generate a `/build` dir with static assets. You can preview the production build with `npm run preview` or using the provided docker-compose (nginx). Or really any web server.

Commit messages should follow this format: `<type: chore, feat, fix>: <description> <rel issue number>`

### Instructions

I want this project to be easy to hop in for everyone. Rather this is your first contribution ever, or your thousanth. This is a detailed instruction in getting started. Worth reading at least once, especially if this is your first time contributing to the project. If you have any questions don't hesitate to create an issue.

---

Pre-requisites: git, Node.js v20.x.x, and npm (or pnpm or yarn if your prefer) installed on your machine

Fork the repository and pull it into your local environment

```bash
git clone https://github.com/<your-username>/colormap.git
```

Checkout the develop branch (the most up to date branch). It may be different than what you see on [colormap.app](https://colormap.app).

```bash
git checkout develop
```

Create a local branch off of `develop`, this is where you will make your changes. For example, if you're adding a new component maybe (note, I dont care what your local branch name is, just recommend avoiding working directly on `develop`):

```bash
git checkout -b feature/new-chatbot-component
```

Install dependencies and run the dev server

```bash
npm install
npm run dev
```

Each time you make a significant change, add and commit your changes, please follow this commit message format, `<type: chore, feat, fix>: <description> <rel issue number>`. If targetting a specific Issue, add the issue number at the end, e.g. `#23`.

```bash
git commit -m "feat: added a chatbot #23"
git commit -m "fix: stopped chatbot from becoming sentient #23"
git commit -m "chore: added chatbot usage comments and notes #23"
```

Once you're done making changes, run the production build:

```bash
npm run build
npm run preview
```

Assuming all is well with the build, lint and run testing locally:

```bash
npm run format
npm run test # if you see errors about missing dependencies on the host machine, you can disregard those failures
```

Once you're done, merge develop back onto your branch in case there were any changes:

```bash
git fetch origin
git merge origin/develop # if confident, feel free to rebase instead, it is better practice
```

After a successful, conflict free, merge or rebase, push

```bash
git push origin feature/new-chatbot-component
```

From here you should be able to create a Pull Request in Github, targetting a merge into the `develop` branch, **not** `master`

Please keep PR's specific, they should be targetting a specific feature or bug. If you find something unrelated that needs updating, do that in its own branch and PR.

Await any comments or actions from a maintainer. If approved, your code will be merged into `develop` and then later merged into `master` as part of a release (done by a maintainer)

## Structure, Stack and Standards

### git and Github

- `develop` this is the branch that **all Pull Requests should target**, it is the active development branch.
- `master` this is the default branch, it is the latest production build. It should only be merged to from `develop` by a maintainer for a regular release.
- `other` you may see other branches that are for specific features or recent releases, don't worry about these unless you're a maintainer. contributors only need to worry about `develop`

We use tags to associate specific releases, such as `v1.0.0-beta`, `v1.2.12`

Commit messages should follow this format: `<type: chore, feat, fix>: <description> <rel issue number>`

### Stack

The app uses [Svelte (SvelteKit)](https://svelte.dev/tutorial/svelte/welcome-to-svelte) as a framework/compiler, [TypeScript](https://www.typescriptlang.org/docs/), [TailwindCSS](https://tailwindcss.com/docs/editor-setup) as a CSS library, [FontAwesome](https://fontawesome.com/icons) for icons

Testing will use playwright and vitest, but these are not setup yet

ESLint and Prettier are used for linting/formatting

Github workflows is used to automate builds, releases, etc.

### App structure

```
.
├── src
│   ├── lib
│   │   ├── components # this is where all [Svelte components](https://svelte.dev/docs/svelte/svelte-files) live. Each component has its own file.
│   │   ├── services # this is where most programmatic logic lives. any operation that is not directly interfacing with a store or component should live here. divided into files by association
│   │   ├── stores # [Svelte stores](https://svelte.dev/docs/svelte/stores) are stored here, divided into files by association
│   │   └── types # Typescript data is stored here, types, classes, interfaces, etc. divided into files by association
│   └── routes # where pages and layouts are stored, but this is only a SPA for now see [Svelte docs](https://svelte.dev/docs/kit/routing) for details
├── static
│   ├── data # where geojson feature (e.g. county) files are stored
```

## Source data

Have GIS experience and want to contribute by creating custom geojson files? Please do! We recommend reaching out via issue beforehand to ensure there is a need for the feature type (states, countries, etc) 

Currently the data has been sourced as .shp files from the [US Census](https://www.census.gov/cgi-bin/geo/shapefiles/index.php) and converted to geojson using [GDALs ogr2ogr program](https://gdal.org/en/stable/programs/ogr2ogr.html). 
