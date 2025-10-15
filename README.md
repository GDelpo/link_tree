# Link Tree (React + Vite)

A modern, accessible, and modular “link-in-bio” app built with React, Vite, Tailwind CSS, and Framer Motion. It features a clean component architecture, secure Instagram integration via a serverless function, and deploys seamlessly on Vercel.

## Features

- Modular component architecture organized by intent (layout, ui, data, navigation, feedback)
- Secure Instagram posts integration via Vercel serverless function (no token in the frontend)
- Responsive design, dark mode, and smooth animations
- Centralized content/config and section rendering

## Tech stack

- React + Vite
- Tailwind CSS
- Framer Motion
- Vercel (serverless functions + SPA hosting)

## Getting started

Prerequisites:

- Node.js 18+ and npm

Install dependencies and run the dev server:

1. npm install
2. npm run dev

Notes for local development:

- The Instagram API route is provided by a Vercel serverless function under `api/instagram.js`. When running `vite` locally, that route is not served. To test Instagram locally, either:
  - Use the Vercel CLI and run `vercel dev` to emulate functions locally, or
  - Temporarily mock data in the UI/service.
- Without the function running, the Instagram section will show a graceful error or empty state.

## Import aliases

Configured in `vite.config.js`:

- `@components` → `src/components`
- `@contexts` → `src/contexts`
- `@hooks` → `src/hooks`
- `@layouts` → `src/layouts`
- `@content` → `src/content`
- `@pages` → `src/pages`
- `@config` → `src/config`
- `@services` → `src/services`
- `@` → `src`

Example:

```js
import PageSection from '@components/layout/PageSection';
import AnimatedSection from '@components/ui/AnimatedSection';
import ProgramsSection from '@components/data/ProgramsSection';
```

## Components structure

To improve maintainability, components are organized into intent-based subfolders under `src/components/`:

- layout/ — page layout building blocks
	- PageHeader, PageContainer, PageSection, ContentCard, Sidebar, Navbar, Footer, DecoratedSectionTitle, Portal
- ui — generic UI elements and primitives
	- AnimatedSection, AnimatedGradient, Card, CardGrid, MediaCard, SectionTitle, TimelineItem, FloatingActionButton, FloatingButtons, ThemeToggle, LoadingSpinner, MorphingAvatar, ScrollToTopButton, SkipLink
- data — components that render content sections or data-centric UIs
	- ProgramsSection, ProgramCard, ProgramDetailModal, InstagramSection, Accordion, PersonalizedPlanCTA, ProfileInfo, UserProfileHeader
- navigation — navigation and action entry points
	- CircularSocialLinks, WhatsAppButton, SmartPayment, SmartPricing
- feedback — loading, error boundaries, and debug helpers
	- LazyErrorBoundary, PageLoadingFallback, GeolocationDebugger

Transition note (proxy re-exports):

- During the migration, each component in the subfolders re-exports from its original path (e.g., `src/components/ui/ThemeToggle.jsx` exports from `../ThemeToggle.jsx`).
- This allows existing pages to import from `@components/{layout|ui|data|...}` immediately without physically moving all files at once.

Migration plan (optional, when you’re ready to move files):

1. Move each original component into its new subfolder (matching the proxies).
2. Update re-export files to point at the new relative paths (or delete proxies entirely if all imports are updated).
3. Search for any lingering old imports and update to the new aliases.
4. Build and test.

## Instagram integration (secure)

Serverless function: `api/instagram.js`

- Fetches posts from the Instagram Graph API using a secret access token.
- Returns normalized data to the frontend; no token is ever exposed client-side.

Environment variables (Vercel):

- `INSTAGRAM_ACCESS_TOKEN` — set in the project settings on Vercel.

Frontend service: `src/services/instagramService.js`

- Calls `/api/instagram?limit=6` using a small `apiClient` wrapper.

UI usage: `src/components/data/InstagramSection.jsx`

- Fetches posts on mount, shows loading and error states, renders `CardGrid` with `MediaCard`s.

Local development tips:

- Use `vercel dev` to run the function locally, or mock data if you’re only working on UI.

Response shape (example):

```json
[
	{
		"id": "123",
		"permalink": "https://instagram.com/p/...",
		"imageUrl": "https://.../image.jpg",
		"mediaType": "IMAGE"
	}
]
```

## SPA routing and rewrites

- `vercel.json` includes a catch-all rewrite to `/` so client-side routing works on refresh.

## Scripts

- `npm run dev` — start Vite dev server
- `npm run build` — production build
- `npm run preview` — preview the production build locally

## Deployment (Vercel)

1. Push to a Git repository connected to Vercel.
2. Set the environment variable `INSTAGRAM_ACCESS_TOKEN` in Vercel Project Settings.
3. Deploy. Vercel will serve the SPA and the serverless function under `/api/instagram`.

## Troubleshooting

- 500 on `/api/instagram`: Ensure `INSTAGRAM_ACCESS_TOKEN` is set in Vercel and valid.
- 404 on `/api/instagram` locally: Run `vercel dev` or mock data; Vite alone doesn’t serve API routes.
- CORS issues: Shouldn’t occur when frontend and function are on the same domain (Vercel). If testing externally, keep same-origin.
