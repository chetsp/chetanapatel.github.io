# Chetana Patel — Software & Applied AI Engineer

A dark, responsive developer portfolio built with Next.js App Router, TypeScript, Tailwind CSS v4, Framer Motion, Lucide, and locally bundled Inter/Sora fonts.

## Develop

Requires Node.js 20.9+ (validated with Node 24).

```sh
npm ci
npm run dev -- --port 3000
```

## Production

```sh
npm run build
npm start -- --port 3000
```

Deploy the repository to a host supporting Next.js Node/serverless routes, such as Vercel, or run the production server yourself. Set the project root to this repository. The live portfolio is published through the GitHub Pages workflow below.

**GitHub Pages cannot run `/api/chat`.** The provided Actions workflow publishes a static version with a local portfolio guide; use a Next.js host for live Gemini responses. The previous root `index.html` and `style.css` are preserved as legacy files. Choose GitHub Actions as the Pages source so the new build is deployed instead of these legacy files.

## Update content

- `src/data/portfolio.ts`: profile links, experience, skills, and typed project case studies.
- `src/data/assistant.ts`: deterministic local knowledge answers.
- `src/components/portfolio.tsx`: interactive homepage.
- `src/app/globals.css`: visual tokens and responsive styles.
- `public/Chetana_Patel_Resume.pdf`: downloadable résumé. Replace with an updated PDF using the same filename.

LinkedIn is `https://www.linkedin.com/in/cschetanapatel/`; GitHub is `https://github.com/chetsp`. The email is from the supplied résumé.

## Portfolio assistant

The assistant works without credentials using a clearly labeled local knowledge guide. To enable live Gemini answers, copy `.env.example` to `.env.local` and set `GEMINI_API_KEY` privately. Optionally choose `GEMINI_MODEL` (default `gemini-2.5-flash`). Never use a `NEXT_PUBLIC_` variable for this key or commit `.env.local`.

`POST /api/chat` accepts `{ "message": "How does RouteMind work?" }`. The server validates input, limits question length, uses a timeout, and grounds prompts in the structured portfolio knowledge base. Missing keys, provider errors, and timeouts fall back to deterministic answers. Only individual questions are sent to the provider; chats are not stored by this app. Before exposing a paid key to unrestricted traffic, configure platform-level rate limiting and spend limits. No live provider call was validated without credentials.

The contact section provides a direct email link, copy-email button, LinkedIn, GitHub, and résumé download. There is no message form or third-party form submission service.

## Content provenance

Professional experience: user-supplied brief and résumé. Project descriptions: public READMEs for `chetsp/RouteMind-AI`, `chetsp/Gita-Guru`, and `chetsp/AI-Modernization`, inspected November 22, 2026. Repository feature descriptions are not independent benchmarks. RouteMind uses synthetic freight data and is separate from Tesla work. MCP, ADK, and OpenTelemetry are labeled as current exploration areas rather than verified production deployments.

The reference `https://nikunj.codenex.dev/` was blocked by the environment's network policy; styling follows the written brief rather than a verified visual reproduction.

## Validation

```sh
npm run build
npm run typecheck
npm run lint
# With the production server running in a second terminal:
npx playwright install chromium
npm run test:smoke
```

For an existing system Chromium, use `CHROMIUM_PATH=/usr/bin/chromium npm run test:smoke`. `BASE_URL` overrides the default test server URL of `http://127.0.0.1:3000`. The smoke test covers five viewport sizes, reduced-motion visibility, anchors, project filtering, expanded experience and metric anchors, skills, assistant replies, drawer keyboard behavior, PDF downloads, social links, case studies, validation errors, unknown routes, and mobile navigation. The local-mode checks expect the server to be running without a Gemini key.

## GitHub Pages deployment

The repository now includes `.github/workflows/pages.yml`. Pushing `main` builds a static export and deploys it with GitHub Actions. If automatic Pages enablement is denied, open **Settings → Pages → Source → GitHub Actions**, then rerun the workflow.

Expected URL: https://chetsp.github.io/chetanapatel.github.io/

The Pages build supports case studies, PDF downloads, filters, tours, and the local portfolio guide without credentials. Live Gemini chat remains available only in a normal Next.js server deployment. API keys are never included in the static client.

To reproduce the Pages export locally:

```sh
GITHUB_PAGES=true npm run build
```

The `out/` folder contains the static site. The repository subpath is configured in `next.config.ts`; update the workflow's `NEXT_PUBLIC_BASE_PATH` if the repository name changes. Normal `npm run build` retains server-side chat support.

## Résumé downloads

All résumé buttons use `profile.resume` in `src/data/portfolio.ts`. The URL includes the GitHub Pages base path and points to `public/Chetana_Patel_Resume.pdf`. Replace that PDF with the same filename to update every download. The latest uploaded résumé is used as the canonical download.

For the exported GitHub Pages site, run the smoke test with `STATIC_SITE=true` and `BASE_URL` set to the served repository subpath. Server API checks are skipped for that static build; local assistant interactions and asset links are still checked.

## Light and dark themes

The navigation toggle (also present on case study pages) uses `next-themes` with a class on `<html>`, a dark default, and system preference disabled. The selection is persisted in localStorage. The provider’s inline script applies a saved theme before hydration. Icons are selected with CSS so they match the pre-paint theme without a mounted-state delay.

All component colors use the dark `:root` and light `:root.light` tokens in `src/app/globals.css`. Light mode uses white page backgrounds, off-white cards, dark zinc text, and darker green accents for readable buttons and links.

With the app running, execute `npm run test:themes` (with `BASE_URL` and optionally `CHROMIUM_PATH` as described above). Tests check both themes across four screen sizes, all case studies, the chat drawer, text/surface contrast, persistence, keyboard activation, and a saved light theme with hydration bundles blocked.
