# Growvia Website Templates

This repository aggregates reusable website starters so the Growvia team can spin up
client demos in minutes. Each template lives in its own directory so it can evolve
independently.

## Available templates & sandboxes

- `aesthetic-tile-website-next`: A full-featured Next.js 15 app used for the
  Aesthetic Tile marketing site (app router, Tailwind, e2e + unit tests).
- `prospects/`: Prospect-specific sandboxes cloned from the templates so we can
  tailor a home page pitch without touching the base projects.

## Using a template locally

1. `cd` into the template directory you want to work with.
2. Install dependencies with `pnpm install` (Node 20+ recommended).
3. Run `pnpm dev` to start the development server, or `pnpm build && pnpm start`
   to preview a production build.

## Adding more templates

1. Create a new folder at the repo root named for the template.
2. Copy the template source (omit build artifacts like `.next` or `node_modules`).
3. Document any special instructions in that template's `README.md`.

Feel free to open an issue or PR when a new template or update is ready.
