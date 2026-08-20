# eddie-deliver-site

Single-deploy app: React frontend + Express API on one Vercel project.

## Local development

```bash
# terminal 1 — API (http://localhost:3001)
cd server && npm install && npm run dev

# terminal 2 — UI (http://localhost:5173, proxies /api → 3001)
cd client && npm install && npm run dev
```

Admin login uses `server/.env`:
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `JWT_SECRET`

## Local monolith (one port)

```bash
npm run build
cd server && npm start
# open http://localhost:3001
```

## Vercel

1. Import the GitHub repo (root directory `./`).
2. Add environment variables:
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`
   - `JWT_SECRET`
3. Deploy — no `VITE_API_URL` needed (API is `/api` on the same domain).

Static UI is served from `client/dist`. `/api/*` goes to the Express serverless function.
