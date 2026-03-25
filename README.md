# Pure Renewal — Next.js + Payload + Supabase

This project runs your Pure Renewal site in Next.js, uses Payload CMS as the backend, and connects to Supabase Postgres.

## What is included

- Payload collections: `Users` and `Media`
- Next.js frontend routes for the Pure Renewal pages

## 1) Configure environment

```bash
cp .env.example .env
```

Then set:

- `DATABASE_URL` to your Supabase Postgres connection string (with `sslmode=require`)
- `PAYLOAD_SECRET` to a long random value

## 2) Install and run

```bash
npm install
npm run dev
```

Open `http://localhost:3000` for the site and `http://localhost:3000/admin` for Payload admin.

## Useful commands

- `npm run dev` - start local development
- `npm run build` - production build
- `npm run generate:types` - regenerate Payload TypeScript types
- `npm run export:pages` - export static files to `dist/` for GitHub Pages

## GitHub Pages

This repo includes `.github/workflows/deploy-pages.yml` to deploy static pages to GitHub Pages on every push to `main`.

- Static export output: `dist/`
- Workflow sets `BASE_PATH` to `/<repo-name>` for project pages routing
