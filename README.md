# CareerPilot AI — Frontend

A premium, dark-themed frontend for an AI-powered placement platform. Built with React, TypeScript, Tailwind CSS, React Router, Framer Motion, React Hook Form, React Query, Axios, Lucide Icons, and Recharts.

This is a **frontend-only** build. No backend is included — every data-fetching call goes through Axios services in `src/services/*` pointed at placeholder REST endpoints, ready to be swapped for real ones.

## Getting started

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env` and set `VITE_API_BASE_URL` to your backend's base URL when it's ready. Until then, requests will fail gracefully — pages render with React Query's loading/error states.

## Folder structure

```
src/
  components/   Reusable UI (ui/), layout chrome (layout/), dashboard widgets (dashboard/), charts (charts/)
  pages/        Route-level screens (landing, auth, dashboard feature pages)
  layouts/      PublicLayout, AuthLayout, DashboardLayout
  routes/       AppRoutes + ProtectedRoute
  hooks/        React Query hooks per domain (useTasks, useRoadmap, useChat, ...)
  services/     Axios API modules per domain (auth, student, roadmap, tasks, planner, ...)
  context/      AuthContext, ThemeContext
  types/        Shared TypeScript interfaces
  utils/        cn, constants (routes, API base URL, colors), formatters
  assets/       Static assets
```

## Design system

- Dark theme, near-black base (`#08090D`) with a signature blue → indigo → cyan gradient (`#2563EB` → `#4F46E5` → `#06B6D4`) used for CTAs, progress, and accents.
- Display type: Space Grotesk. Body type: Inter. Data/mono: JetBrains Mono.
- Reusable primitives in `components/ui` (Button, Card, Input, Badge, Avatar, ProgressBar, Modal, Tabs, Skeleton) keep every page visually consistent.

## Features implemented

Landing page, login/register/forgot-password, student dashboard, profile, AI-generated roadmap (flight-path timeline), today's tasks, weekly planner, monthly planner + calendar heatmap, placement readiness (radar chart), analytics (trend + skill charts + heatmap), achievements, AI chat UI, resume upload UI with ATS scoring, mock interview UI, and settings. Fully responsive with Framer Motion transitions throughout.

## Connecting a real backend

This frontend is now wired to the actual CareerPilot AI backend (see `../careerpilot-ai-backend`) — every service in `src/services/*` calls a real Express endpoint and unwraps its `{ success, message, data }` envelope via the shared `unwrap()` helper in `src/services/api.ts`.

**To run the full stack locally:**

```bash
# Terminal 1 — backend
cd careerpilot-ai-backend
npm install
cp .env.example .env   # fill in MongoDB URI, JWT secrets, Gemini key, etc.
npm run dev             # http://localhost:5000

# Terminal 2 — frontend
cd careerpilot-ai
npm install
cp .env.example .env    # defaults to http://localhost:5000/api/v1
npm run dev              # http://localhost:5173
```

**Auth flow**: access + refresh tokens are stored in `localStorage`. `src/services/api.ts` automatically retries a request once with a refreshed access token on a `401`, and redirects to `/login` if the refresh itself fails.

**AI features** (roadmap generation, resume ATS scoring, mock interview questions/feedback, AI chat, readiness suggestions) require `GEMINI_API_KEY` to be set on the backend — without it, those specific endpoints return a clear error instead of silently failing, and the frontend surfaces that error message via `getErrorMessage()`.

**Google login**: the `googleLogin()` method is wired in `AuthContext`, ready for a "Sign in with Google" button that obtains a Firebase ID token client-side and posts it to `/auth/google` — add the Firebase client SDK and a button calling `useAuth().googleLogin(idToken)` when ready.

