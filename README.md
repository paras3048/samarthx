# SamarthX

SamarthX is a TanStack Start + React + TypeScript application. The Request a Demo form stores submissions in the configured Supabase `demo_requests` table.

## Requirements

- Node.js (current LTS recommended) and npm
- A Supabase project configured with the `demo_requests` table and an appropriate Row Level Security (RLS) policy that permits public demo-request inserts
- A Cloudflare account for deploying the server-rendered app to Cloudflare Workers

## Local development

1. Install dependencies:

   ```sh
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in the Supabase project URL, project ID, and publishable key from your Supabase project settings. Do not put a Supabase service-role/secret key in any `VITE_` variable or commit it to Git.

3. Start the development server:

   ```sh
   npm run dev
   ```

4. Build locally:

   ```sh
   npm run build
   ```

## Deploy to Cloudflare Workers

This project uses TanStack Start with a server entry and Nitro's Cloudflare-oriented build. GitHub Pages is not suitable for the app's server-rendered runtime without converting it to a static-only build.

1. Create/sign in to a Cloudflare account at https://dash.cloudflare.com/.
2. Install dependencies with `npm install`.
3. Authenticate Wrangler:

   ```sh
   npx wrangler login
   ```

4. Ensure `.env` contains the Supabase public configuration needed at build time, then deploy:

   ```sh
   npm run deploy
   ```

5. Follow Wrangler's prompts if it asks to create or configure the Worker. The site will be published to a `*.workers.dev` address shown after deployment.

If deployment reports that the generated entry or assets directory is missing, run `npm run build` and check that `.output/server/index.mjs` and `.output/public` exist; do not guess a different path.

## Supabase notes

Supabase remains the backend for demo submissions; Cloudflare hosts the web app. The browser uses the Supabase publishable key, which is intended for public/client use. Protect the `demo_requests` table with Row Level Security and validation/rate limiting appropriate for a public form. Never expose a Supabase service-role or secret key in client-side code.
