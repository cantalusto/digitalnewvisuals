# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Dev Commands

```bash
npm run dev       # Start development server (localhost:3000)
npm run build     # Production build
npm run start     # Serve production build
npm run lint      # Run ESLint
```

## Architecture

**DigitalNest** — a single-page marketing website for a Brazilian digital agency, built with Next.js 14 (App Router), React 18, and TypeScript. All content is in Portuguese.

### Tech Stack

- **Framework:** Next.js 14 with App Router (`app/` directory)
- **Animation:** GSAP + ScrollTrigger for scroll-driven animations, Framer Motion for React animations
- **3D:** Three.js via @react-three/fiber and @react-three/drei
- **Smooth Scroll:** Lenis library synced with GSAP's ticker
- **Styling:** Tailwind CSS — dark theme with neon green accent (`#00FF41`)
- **Icons:** Lucide React

### Page Structure

All components are client-side (`'use client'`). The single page (`app/page.tsx`) composes these sections in order:

1. **Hero3D** — 3D flying words grid with GSAP ScrollTrigger (responsive: 2x4 mobile, 4x4 desktop)
2. **AboutSection** — 192-frame canvas animation controlled by scroll, stats counter, company timeline (2023–2026), team showcase
3. **ServicesSection** — 4 service cards (Web Dev, UI/UX, Marketing, Branding) with expandable modals
4. **ProjectsSection** — Project showcase grid with hover effects
5. **Marquee** — Infinite scrolling text strip
6. **ContactSection** — Contact form and footer

**Navbar** floats above all sections with scroll-triggered visibility and hash-based navigation (#sobre, #serviços, #projetos, #contato).

### Key Patterns

- **Custom hooks** (`hooks/`) encapsulate animation logic: `useLenis` sets up smooth scroll + GSAP sync, `useScrollProgress` tracks scroll phases, `useScrollLock` locks scroll during animations, `useCustomCursor` tracks mouse position
- **Barrel exports** via `index.ts` in `components/` and `hooks/`
- **Path alias:** `@/*` maps to project root (configured in `tsconfig.json`)
- **Mobile detection** in `page.tsx` uses `window.innerWidth < 768` and touch detection to conditionally render (e.g., custom cursor hidden on mobile, fewer Hero3D items)
- **Frame animation** in AboutSection renders 192 sequential images from `public/digitalanimation/` onto a canvas, driven by scroll position

### Styling Conventions

- CSS variable `--accent: #00FF41` defined in `globals.css`
- Custom Tailwind color: `accent` maps to `#00FF41`
- Custom CSS classes in `globals.css`: `.stroke-text` (outlined text), `.preserve-3d`, custom scrollbar styling
- No light mode — the site is dark-only (black background)

### No Backend

This is a static frontend site. There are no API routes, database connections, environment variables, or form submission handlers.
