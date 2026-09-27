# Yomi

A lightweight personal manga/manhwa reader PWA for public Olympus content. It targets iOS 15+ (including an iPhone 7) while remaining easy to develop on Windows.

## Architecture

`React PWA → Express API → OlympusStaff`

The client consumes normalized JSON only. `OlympusSource` owns public-page retrieval and Cheerio parsing behind a small `MangaSource` interface, so a future source can implement the same methods without changing screens.

## Requirements and setup

- Node.js 20+
- npm

Run `npm run install:all`, then `npm run dev`. The frontend is at `http://localhost:5173`; Vite proxies `/api` to Express at port 8787.

Run `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build` from the root to verify the project. Production frontend output is `client/dist`; `npm start` serves that app and the API together with Node 20+.

## Deploy to Render

Yomi is a single Render **Web Service**, not a static site: Express serves both the built PWA and `/api` from the same origin. The included `render.yaml` is a Blueprint with the current Render fields for a Node web service and `/api/health` health check.

1. Push this project to a Git repository and create a new **Blueprint** or **Web Service** in Render.
2. If configuring it manually, use runtime **Node**, build command `npm install && npm install --prefix client && npm install --prefix server && npm run build`, start command `npm start`, and health-check path `/api/health`.
3. Deploy. No database, environment variables, or secrets are required.
4. Open the generated HTTPS URL. The app lives at `/`; the API is available under `/api`, for example `/api/health` and `/api/latest`.

The production client requests `/api` as a same-origin relative URL, so it has no production localhost dependency. Express returns `index.html` for non-API paths, enabling direct refreshes of React Router routes such as `/manga/...`; unknown `/api/...` paths instead return JSON 404 responses.

## Public-content boundary

Yomi accesses only publicly reachable Olympus pages and does not bypass sign-in, payment, membership, or access controls. A paid or inaccessible chapter returns an error. Chapter images are served directly from Olympus where possible. `/api/image` exists only as a controlled fallback and accepts HTTPS images from the explicitly allowlisted `olympustaff.com` host.

## PWA installation on iPhone

Deploy the client behind HTTPS with the API available at `/api`, then in Safari open Yomi, tap **Share**, and choose **Add to Home Screen**. The PWA uses standalone display mode and is designed for iOS 15+; it caches the app shell but intentionally does not cache chapter images for offline storage.
