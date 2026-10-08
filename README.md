# Plexus Code – Interactive Showcase (MAS B2B)

> **Secure by design. Scalable by default.** | *Cero Fisuras, Conexión Total*

This repository is a live portfolio & technical demonstration of **Plexus Code** – a software engineering and AppSec defensive cybersecurity studio. The platform showcases our core vertical: Multi‑Agent Systems (MAS) and AI‑driven integrations on **Meta platforms** (WhatsApp, Instagram, TikTok, reservations, CRM) and B2B SaaS automation (OpsFlow AI, conversational Fintech agents such as AON Pay).

## Technology Stack – Battle‑Tested Production Stack

| Layer | Technologies & Frameworks |
|-------|---------------------------|
| **Runtime/Server** | Node.js ≥22, Next.js 16 (App Router), Edge Functions |
| **UI / Front‑end** | React 19, TypeScript (strict), Tailwind CSS 4, Zod |
| **API / Data** | Supabase Postgres, Meta APIs (WhatsApp Business, Instagram Graph), Resend (Transactional Email) |
| **Security** | Zero‑Trust architecture, OWASP hardening, server‑side validation, honeypot + rate‑limiting on contact endpoints |
| **Testing / CI** | Vitest (100% pass goal), ESLint, GitHub Actions (lint → type‑check → build → test) |
| **Architecture** | App Router (Server/Client boundaries), Multi‑Agent System (MAS) workflows, real‑time data pipelines |

## Quick Start – Local Development

1. **Clone & Install**
   ```bash
   git clone https://github.com/plexuscode/plexus-code-web.git
   cd plexus-code-web
   npm install
   ```

2. **Environment Variables**
   Copy `.env.example` → `.env.local` and fill in the required keys:
   ```bash
   cp .env.example .env.local
   ```
   **Required keys** (for full functionality):
   ```
   RESEND_API_KEY=         # Sendgrid alternative for transactional emails
   CONTACT_EMAIL=          # Destination for contact‑form leads
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

4. **Quality Gates (Definition of Done)**
   Before any commit, run the full quality suite:
   ```bash
   npx tsc --noEmit        # Type‑check (0 errors)
   npm run lint            # ESLint (0 errors)
   npm run test            # Vitest (100% pass – currently TD‑12 in progress)
   npm run build           # Production build (with DUMMY keys if missing)
   ```

## Architecture Highlights – Defensive Security by Design

- **Zero‑Trust Data Validation** – Every user‑supplied input is sanitized with `escapeHtml` and validated with Zod schemas (`src/lib/validation.ts`).
- **Honeypot + Rate‑Limiting** – Contact endpoints (`/api/contact`) include invisible honeypot fields and in‑memory rate‑limiting (5 requests / 60 seconds per IP) to block spam.
- **Multi‑Agent System (MAS) Structure** – The codebase follows a *coordinator‑planner‑implementer‑reviewer* agent‑oriented workflow (documented in `AGENTS.md`). Each role has a strict boundary, ensuring architectural consistency and secure development.
- **Internationalization (i18n)** – All UI strings are sourced from `src/lib/translations.ts` (es, en, pt parity). The front‑end uses a React Context (`LanguageContext`) for real‑time language switching.
- **Server‑Client Boundaries** – API routes are Server Components; UI logic lives in Client Components with “use client” directives. No secrets are exposed to the browser.

## Continuous Integration → Continuous Deployment

The repository includes a GitHub Actions workflow (`.github/workflows/ci.yml`) that runs on every `push` and `pull_request` to `main`:

1. **Checkout & Setup** – Uses Node.js 22.
2. **Cache & Install** – `npm ci` for reproducible dependencies.
3. **Quality Gates** (sequential):
   - `npm run lint`
   - `npx tsc --noEmit`
   - `npm run build` (with a dummy `RESEND_API_KEY`)
   - `npm run test` (note: currently failing due to TD‑12 – we log the failure but do not block the pipeline).
4. **Pass/Fail** – The workflow exits with the overall result.

## Project Structure (Key Directories)

```
src/
├── app/                          # Next.js 16 App Router
│   ├── layout.tsx               # Root layout (lang="es" fixed for now)
│   ├── page.tsx                 # Homepage (wraps all sections)
│   └── api/contact/route.ts     # Contact endpoint (hardened)
├── components/                   # React UI (Client Components)
│   ├── Navbar.tsx               # Navigation with language selector
│   ├── Hero.tsx                 # Hero section with metrics
│   ├── ServicesBento.tsx        # Service cards bento‑grid
│   ├── TechStack.tsx            # Interactive tech‑stack showcase
│   ├── ContactTerminal.tsx      # Contact form (terminal‑style)
│   ├── ContactModal.tsx         # Advanced contact modal
│   ├── CtaBanner.tsx            # Call‑to‑action banner
│   └── Footer.tsx               # Multi‑column footer
├── context/                     # React Context
│   └── LanguageContext.tsx      # i18n (es, en, pt)
├── lib/                         # Utilities & shared logic
│   ├── translations.ts          # i18n strings (es, en, pt)
│   ├── validation.ts            # Zod schemas + sanitizeInput()
│   ├── env.ts                   # Environment‑variable validation
│   ├── rate‑limit.ts            # In‑memory rate‑limit store
│   └── utils.ts                 # (removed – was dead code)
├── test/                        # Test configuration
│   └── setup.ts                 # Vitest + JSDOM setup
└── components/__tests__         # Component unit tests
```

## Technical Debt & Backlog

Live backlog is maintained in `MEMORY.md`. Current priorities:

| ID | Severity | Description | Status |
|----|----------|-------------|--------|
| TD‑07 | **High** | Environment variable validation in CI & production | Pending |
| TD‑12 | **High** | Fix failing unit tests (Resend mocks, duplicate placeholders) | In Progress |
| TD‑11 | Medium | Remove extraneous packages (dead `cn()` references) | Done |
| TD‑08 | Medium | Clean up unused dependencies (`framer‑motion`, SVGs) | Done |
| TD‑09 | Medium | i18n parity & eliminate hard‑coded strings | Done |
| TD‑05 | Medium | Real API flow for ContactTerminal (Zod + fetch) | Done |
| TD‑06 | Medium | Harden `/api/contact` (honeypot, rate‑limit, sanitization) | Done |

For a full history of decisions, de‑risk logs, and the technical constitution, read `docs/constitution.md`.

## License & Contact

**Plexus Code** – Engineering Studio  
Contact: `contact@plexuscode.com`  
Web: [plexuscode.com](https://plexuscode.com) (if live)  

This codebase is proprietary and intended for internal demonstration and portfolio purposes. All rights reserved.