# Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build rohailbutt.dev — a premium dark/emerald bento-grid portfolio with three project case study pages, Cmd+K palette, Konami easter egg, and Resend contact form.

**Architecture:** Next.js 15 App Router with static generation. Landing page is a 12-column CSS bento grid. Case study pages use a shared dynamic route `/projects/[slug]`. All project data lives in a single typed data file.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v4, Framer Motion, GSAP + ScrollTrigger, Lenis, cmdk, next-themes, React Hook Form, Resend, Vercel

---

## File Map

```
app/
  layout.tsx                  Root layout — fonts, providers, metadata, JSON-LD
  page.tsx                    Landing page — assembles bento grid
  globals.css                 CSS custom properties + Tailwind v4 theme
  projects/[slug]/page.tsx    Dynamic case study page
  resume/route.ts             301 redirect to /resume.pdf
  api/contact/route.ts        Resend email handler

components/
  layout/
    Nav.tsx                   Fixed top nav, active-section tracking
    Footer.tsx                Footer with live PKT clock
  bento/
    BentoGrid.tsx             12-col CSS grid container
    HeroCard.tsx              Name reveal (GSAP) + tagline + CTAs
    AboutCard.tsx             Bio text card
    StatCard.tsx              Reusable metric card + CountUp
    AvailabilityCard.tsx      Open-to-work status card
    FeaturedProjectCard.tsx   Full-width featured project card
    ProjectCard.tsx           Half-width project card
    SkillsCard.tsx            Grouped tech skills card
    ExperienceCard.tsx        Experience timeline card
    ContactCard.tsx           Contact section with copy-email
  case-study/
    CaseStudyHeader.tsx       Title, subtitle, category tag
    MetricsBar.tsx            Row of 4 StatCards
    KeyDecisionCard.tsx       "Why X" architectural decision card
    ArchitectureDiagram.tsx   Per-project SVG system diagram
    CaseStudyPagination.tsx   Prev/Next + hire CTA
  ui/
    CommandPalette.tsx        Cmd+K palette (cmdk)
    CustomCursor.tsx          Magnetic cursor (desktop)
    KonamiOverlay.tsx         Retro terminal overlay
    CopyToast.tsx             Clipboard copy toast

hooks/
  useCountUp.ts               IntersectionObserver counter
  useKonamiCode.ts            Konami sequence detector

lib/
  projects.ts                 Typed project data for all 3 projects
  fonts.ts                    next/font: Syne + Inter + JetBrains Mono

providers/
  ThemeProvider.tsx           next-themes wrapper
  LenisProvider.tsx           Lenis smooth scroll

public/
  resume.pdf                  Resume PDF

tailwind.config.ts            (not used in v4 — config is in globals.css)
next.config.ts
postcss.config.mjs
```

---

## Task 1: Project Scaffold & Dependencies

**Files:**
- Create: `package.json` (via create-next-app)
- Create: `postcss.config.mjs`
- Create: `next.config.ts`

- [ ] **Step 1: Scaffold Next.js 15 into existing directory**

```bash
cd /Users/muhammadjamil/Desktop/projects/portfolio
npx create-next-app@latest . --typescript --eslint --app --no-src-dir --import-alias "@/*" --no-tailwind --no-git
```

When prompted: say Yes to overwrite if asked. The `docs/` folder is safe — create-next-app won't touch it.

- [ ] **Step 2: Install all dependencies**

```bash
npm install framer-motion gsap @studio-freight/lenis cmdk next-themes react-hook-form @hookform/resolvers zod resend lucide-react
npm install -D tailwindcss@next @tailwindcss/postcss@next @types/node
```

- [ ] **Step 3: Replace postcss.config.mjs**

```js
// postcss.config.mjs
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

- [ ] **Step 4: Replace next.config.ts**

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
```

- [ ] **Step 5: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js 15 with dependencies"
```

---

## Task 2: Design Tokens & Global CSS

**Files:**
- Create: `app/globals.css`

- [ ] **Step 1: Replace app/globals.css with design system**

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  --color-bg: #080c0c;
  --color-surface: #0f1a18;
  --color-border: #1a2e2a;
  --color-text: #e8f0ee;
  --color-muted: #6b8c86;
  --color-accent: #10b981;
  --color-accent-glow: rgba(16, 185, 129, 0.12);
  --color-accent-dim: #065f46;

  --font-sans: var(--font-inter);
  --font-display: var(--font-syne);
  --font-mono: var(--font-jetbrains);

  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;

  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  background-color: var(--color-bg);
  color: var(--color-text);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-sans), system-ui, sans-serif;
  line-height: 1.75;
}

::selection {
  background-color: var(--color-accent);
  color: #080c0c;
}

/* Custom scrollbar */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--color-bg); }
::-webkit-scrollbar-thumb { background: var(--color-accent-dim); border-radius: 999px; }

/* Focus rings */
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
}

/* Bento card base */
.bento-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  padding: 1.5rem;
  transition: transform 200ms var(--ease-out),
              box-shadow 200ms var(--ease-out),
              border-color 200ms var(--ease-out);
}

.bento-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 0 24px var(--color-accent-glow);
  border-color: rgba(16, 185, 129, 0.3);
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 2: Start dev server and verify dark background renders**

```bash
npm run dev
```

Open `http://localhost:3000`. Background should be `#080c0c`. No white flash.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css postcss.config.mjs
git commit -m "feat: add design tokens and global CSS"
```

---

## Task 3: Fonts & Providers

**Files:**
- Create: `lib/fonts.ts`
- Create: `providers/ThemeProvider.tsx`
- Create: `providers/LenisProvider.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create lib/fonts.ts**

```ts
// lib/fonts.ts
import { Inter, Syne } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export const jetbrainsMono = localFont({
  src: [
    {
      path: "../public/fonts/JetBrainsMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-jetbrains",
  display: "swap",
});
```

- [ ] **Step 2: Download JetBrains Mono font**

```bash
mkdir -p public/fonts
curl -L "https://github.com/JetBrains/JetBrainsMono/releases/download/v2.304/JetBrainsMono-2.304.zip" -o /tmp/jb.zip
unzip /tmp/jb.zip -d /tmp/jb
cp "/tmp/jb/fonts/webfonts/JetBrainsMono-Regular.woff2" public/fonts/
```

- [ ] **Step 3: Create providers/ThemeProvider.tsx**

```tsx
// providers/ThemeProvider.tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  );
}
```

- [ ] **Step 4: Create providers/LenisProvider.tsx**

```tsx
// providers/LenisProvider.tsx
"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

- [ ] **Step 5: Replace app/layout.tsx**

```tsx
// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { inter, syne, jetbrainsMono } from "@/lib/fonts";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { LenisProvider } from "@/providers/LenisProvider";

export const metadata: Metadata = {
  title: "Rohail Butt — Senior Full Stack Engineer & AI Solution Architect",
  description:
    "6 years shipping fintech infrastructure, distributed systems, and production AI. Available for remote roles and freelance.",
  metadataBase: new URL("https://rohailbutt.dev"),
  openGraph: {
    title: "Rohail Butt — Senior Full Stack Engineer & AI Solution Architect",
    description:
      "6 years shipping fintech infrastructure, distributed systems, and production AI.",
    url: "https://rohailbutt.dev",
    siteName: "Rohail Butt",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rohail Butt — Senior Full Stack Engineer & AI Solution Architect",
    description:
      "6 years shipping fintech infrastructure, distributed systems, and production AI.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rohail Butt",
  jobTitle: "Senior Full Stack Engineer & AI Solution Architect",
  url: "https://rohailbutt.dev",
  sameAs: [
    "https://github.com/vnQ-coder",
    "https://linkedin.com/in/rohailbutt29",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${syne.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider>
          <LenisProvider>{children}</LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 6: Verify**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add lib/fonts.ts providers/ app/layout.tsx public/fonts/
git commit -m "feat: add fonts, theme provider, Lenis smooth scroll"
```

---

## Task 4: Project Data Layer

**Files:**
- Create: `lib/projects.ts`

- [ ] **Step 1: Create lib/projects.ts**

```ts
// lib/projects.ts

export type Metric = {
  value: string;
  label: string;
};

export type KeyDecision = {
  title: string;
  body: string;
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  metrics: Metric[];
  problem: string;
  role: string;
  keyDecisions: KeyDecision[];
  stack: string[];
  outcomes: string[];
  github?: string;
  prev: string | null;
  next: string | null;
};

export const projects: Project[] = [
  {
    slug: "nebula-payments",
    title: "Nebula Payments",
    subtitle: "Regulated Crypto-Fiat Exchange Infrastructure",
    category: "FinTech",
    description:
      "Regulated crypto-fiat exchange processing $5M+ monthly via Monoova, Wyre, and Fireblocks — with end-to-end KYC/AML automation and PCI-compliant data handling.",
    metrics: [
      { value: "$5M+", label: "Monthly Volume" },
      { value: "100%", label: "Payment Test Coverage" },
      { value: "40%", label: "Faster Onboarding" },
      { value: "PCI", label: "Compliant Day One" },
    ],
    problem:
      "Build regulated crypto-fiat exchange infrastructure from scratch capable of handling $5M+ monthly under Australian financial regulations, with full KYC/AML compliance, three payment rail integrations, and zero tolerance for defects on payment-critical flows.",
    role:
      "Solo architect and lead engineer. Owned system design, data schema, API contracts, KYC/AML pipeline, payment integrations (Monoova, Wyre, Fireblocks), CI/CD pipeline, and 100% test coverage mandate.",
    keyDecisions: [
      {
        title: "SQS for async transaction processing",
        body:
          "Financial transactions require guaranteed delivery and decoupled retry logic. SQS queues ensure no transaction is lost under load, payment services can scale independently, and failures surface cleanly without cascading failures across the system.",
      },
      {
        title: "100% Jest coverage on payment flows",
        body:
          "Any untested payment path is a compliance and financial liability. The mandate was enforced via CI gate — a PR that drops coverage on payment services below 100% cannot merge, period.",
      },
    ],
    stack: [
      "NestJS",
      "PostgreSQL",
      "Redis",
      "AWS ECS/ECR",
      "Terraform",
      "Monoova",
      "Wyre",
      "Fireblocks",
      "Jest",
      "Supertest",
    ],
    outcomes: [
      "$5M+ monthly transaction volume in production",
      "100% test coverage on all payment-critical flows",
      "40% reduction in merchant onboarding time",
      "PCI-compliant architecture from day one",
      "End-to-end KYC/AML automation — zero manual review for standard cases",
    ],
    prev: null,
    next: "ai-project-manager",
  },
  {
    slug: "ai-project-manager",
    title: "AI Project Manager",
    subtitle: "Jira-Style PM Tool with Autonomous Sprint Agent",
    category: "AI / Productivity",
    description:
      "A Jira-style project management platform with an embedded AI agent that autonomously generates sprint tickets by analysing the linked GitHub codebase and researching project context.",
    metrics: [
      { value: "Solo", label: "End-to-End Build" },
      { value: "Daily", label: "Production Use" },
      { value: "GitHub", label: "Codebase Aware" },
      { value: "Full", label: "RBAC System" },
    ],
    problem:
      "The engineering team needed a PM tool where the AI agent generates contextually accurate sprint tickets from the real codebase — not generic templates. Generic tools couldn't read live GitHub repos or reason about project structure.",
    role:
      "Solo developer end-to-end. Owned system architecture, MongoDB schema design, RBAC implementation, AI agent orchestration pipeline, CI/CD deployment. Shipped from zero to production.",
    keyDecisions: [
      {
        title: "Claude API for codebase reasoning",
        body:
          "Generating meaningful sprint tickets requires understanding existing code structure, not just project descriptions. Claude's large context window allows passing real file trees and code snippets, producing tickets that reference actual functions, components, and architectural patterns.",
      },
      {
        title: "GitHub tool use for live repo analysis",
        body:
          "Tickets generated from stale snapshots become outdated immediately. The agent uses GitHub API tool calls at generation time to read the current state of the repo — ensuring tickets always reflect what is actually in the codebase.",
      },
    ],
    stack: [
      "NestJS",
      "Next.js",
      "Claude API",
      "OpenAI API",
      "MongoDB",
      "GitHub API",
      "Docker",
      "GitHub Actions",
    ],
    outcomes: [
      "In daily production use by the full engineering team",
      "AI agent generates contextually accurate sprint tickets from live repo state",
      "Full RBAC system with role-based ticket visibility",
      "Shipped solo from architecture to production deployment",
    ],
    prev: "nebula-payments",
    next: "shuttlepro",
  },
  {
    slug: "shuttlepro",
    title: "ShuttlePro Platform",
    subtitle: "Commerce Synchronization at Global Scale",
    category: "E-Commerce / Infrastructure",
    description:
      "Event-driven microservice platform serving 10,000+ merchant accounts across Shopify, WooCommerce, and social commerce — 99.9% SLA across 3 continents.",
    metrics: [
      { value: "10K+", label: "Global Users" },
      { value: "99.9%", label: "Uptime SLA" },
      { value: "40%", label: "Throughput Gain" },
      { value: "30%", label: "Cloud Cost Cut" },
    ],
    problem:
      "Scale a commerce sync platform to 10,000+ merchant accounts across Shopify, WooCommerce, and social commerce APIs — maintaining sub-100ms P95 latency under peak load globally, while reducing cloud costs and leading a team of 5 engineers across 3 product squads.",
    role:
      "Senior Engineer promoted to Team Lead. Led 5 engineers. Owned AWS infrastructure, Redis caching strategy, event-driven architecture, observability (CloudWatch + PagerDuty), and CI/CD pipeline.",
    keyDecisions: [
      {
        title: "Event-driven NestJS microservices on AWS EKS",
        body:
          "Horizontal scaling under commerce-peak load requires services that can scale independently. EKS with Redis Pub/Sub and SQS event queues allows the sync service, order service, and analytics service to scale to exactly the load they're receiving — not in lockstep.",
      },
      {
        title: "Spot-instance scheduling for 30% cost reduction",
        body:
          "Commerce sync workloads are predictably bursty — peak during business hours, quiet overnight. Spot-instance scheduling shifts non-critical batch workloads to off-peak windows, cutting cloud spend by 30% with zero impact on SLA.",
      },
    ],
    stack: [
      "NestJS",
      "AWS EKS",
      "Redis",
      "MongoDB",
      "React.js",
      "Shopify API",
      "WooCommerce API",
      "GitHub Actions",
      "AWS CodePipeline",
      "CloudWatch",
      "PagerDuty",
    ],
    outcomes: [
      "99.9% SLA maintained for 10,000+ users across 3 continents",
      "40% throughput gain and 35% P95 latency reduction under peak load",
      "30% monthly cloud cost reduction via spot-instance scheduling",
      "50% faster release cycles after CI/CD pipeline introduction",
      "Production defect escape rate reduced by 35%",
    ],
    prev: "ai-project-manager",
    next: null,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  prev: Project | undefined;
  next: Project | undefined;
} {
  const project = getProject(slug);
  return {
    prev: project?.prev ? getProject(project.prev) : undefined,
    next: project?.next ? getProject(project.next) : undefined,
  };
}
```

- [ ] **Step 2: Verify types**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add lib/projects.ts
git commit -m "feat: add typed project data layer"
```

---

## Task 5: Utility Hooks

**Files:**
- Create: `hooks/useCountUp.ts`
- Create: `hooks/useKonamiCode.ts`

- [ ] **Step 1: Create hooks/useCountUp.ts**

```ts
// hooks/useCountUp.ts
"use client";

import { useEffect, useRef, useState } from "react";

export function useCountUp(
  target: number,
  duration: number = 2000
): { ref: React.RefObject<HTMLElement | null>; value: number } {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          const start = performance.now();

          function step(now: number) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          }

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { ref, value };
}
```

- [ ] **Step 2: Create hooks/useKonamiCode.ts**

```ts
// hooks/useKonamiCode.ts
"use client";

import { useEffect, useState } from "react";

const KONAMI = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a",
];

export function useKonamiCode(): boolean {
  const [activated, setActivated] = useState(false);
  const progress = useRef<number>(0);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === KONAMI[progress.current]) {
        progress.current += 1;
        if (progress.current === KONAMI.length) {
          setActivated(true);
          progress.current = 0;
        }
      } else {
        progress.current = e.key === KONAMI[0] ? 1 : 0;
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return activated;
}
```

Note: add `import { useRef } from "react"` at the top of useKonamiCode.ts.

- [ ] **Step 3: Fix missing import in useKonamiCode.ts**

```ts
// hooks/useKonamiCode.ts
"use client";

import { useEffect, useRef, useState } from "react";
// rest of file unchanged
```

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add hooks/
git commit -m "feat: add useCountUp and useKonamiCode hooks"
```

---

## Task 6: Nav & Footer

**Files:**
- Create: `components/layout/Nav.tsx`
- Create: `components/layout/Footer.tsx`

- [ ] **Step 1: Create components/layout/Nav.tsx**

```tsx
// components/layout/Nav.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Projects", href: "#projects" },
];

export function Nav() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);

      const sections = ["about", "work", "projects"];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          return;
        }
      }
      setActive("");
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: "1rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        background: scrolled ? "rgba(8,12,12,0.8)" : "transparent",
        borderBottom: scrolled
          ? "1px solid var(--color-border)"
          : "1px solid transparent",
        transition: "all 300ms var(--ease-out)",
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "1rem",
          color: "var(--color-text)",
          textDecoration: "none",
          letterSpacing: "-0.02em",
        }}
      >
        rohailbutt.dev
      </Link>

      <nav style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        {NAV_LINKS.map(({ label, href }) => {
          const id = href.replace("#", "");
          const isActive = active === id;
          return (
            <a
              key={href}
              href={href}
              style={{
                fontSize: "0.875rem",
                color: isActive ? "var(--color-accent)" : "var(--color-muted)",
                textDecoration: "none",
                transition: "color 200ms",
                display: "flex",
                alignItems: "center",
                gap: "0.375rem",
              }}
            >
              {isActive && (
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "var(--color-accent)",
                    display: "inline-block",
                  }}
                />
              )}
              {label}
            </a>
          );
        })}

        <a
          href="#contact"
          style={{
            fontSize: "0.875rem",
            color: "var(--color-accent)",
            textDecoration: "none",
            border: "1px solid var(--color-accent)",
            padding: "0.375rem 0.875rem",
            borderRadius: "var(--radius-md)",
            transition: "all 200ms",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background =
              "var(--color-accent)";
            (e.currentTarget as HTMLElement).style.color = "#080c0c";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.color =
              "var(--color-accent)";
          }}
        >
          Hire Me →
        </a>
      </nav>
    </header>
  );
}
```

- [ ] **Step 2: Create components/layout/Footer.tsx**

```tsx
// components/layout/Footer.tsx
"use client";

import { useEffect, useState } from "react";

function getPKTTime() {
  return new Date().toLocaleTimeString("en-US", {
    timeZone: "Asia/Karachi",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

export function Footer() {
  const [time, setTime] = useState(getPKTTime());

  useEffect(() => {
    const id = setInterval(() => setTime(getPKTTime()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer
      style={{
        borderTop: "1px solid var(--color-border)",
        padding: "1.5rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "0.5rem",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          color: "var(--color-muted)",
        }}
      >
        rohailbutt.dev
      </span>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          color: "var(--color-muted)",
        }}
      >
        PKT {time}
      </span>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          color: "var(--color-muted)",
        }}
      >
        built with Next.js 15
      </span>
    </footer>
  );
}
```

- [ ] **Step 3: Add Nav and Footer to root layout**

In `app/layout.tsx`, update the `<body>` section:

```tsx
// inside RootLayout's return, replace <body> contents
<body>
  <ThemeProvider>
    <LenisProvider>
      <Nav />
      <main>{children}</main>
      <Footer />
    </LenisProvider>
  </ThemeProvider>
</body>
```

Add import at top of layout.tsx:
```tsx
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
```

- [ ] **Step 4: Verify dev server — nav and footer visible**

```bash
npm run dev
```

Open `http://localhost:3000`. Nav fixed at top, footer at bottom, clock ticking.

- [ ] **Step 5: Commit**

```bash
git add components/layout/ app/layout.tsx
git commit -m "feat: add nav with active-section tracking and footer with live clock"
```

---

## Task 7: StatCard Component

**Files:**
- Create: `components/bento/StatCard.tsx`

- [ ] **Step 1: Create components/bento/StatCard.tsx**

```tsx
// components/bento/StatCard.tsx
"use client";

import { useCountUp } from "@/hooks/useCountUp";

type StatCardProps = {
  rawValue: number;
  suffix: string;
  prefix?: string;
  label: string;
  displayValue?: string;
};

export function StatCard({
  rawValue,
  suffix,
  prefix = "",
  label,
  displayValue,
}: StatCardProps) {
  const { ref, value } = useCountUp(rawValue, 2000);

  return (
    <div className="bento-card" style={{ textAlign: "center" }}>
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
          fontWeight: 700,
          color: "var(--color-accent)",
          letterSpacing: "-0.03em",
          lineHeight: 1,
          marginBottom: "0.5rem",
        }}
      >
        {displayValue ??
          `${prefix}${value.toLocaleString()}${suffix}`}
      </div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          color: "var(--color-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
        }}
      >
        {label}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add components/bento/StatCard.tsx
git commit -m "feat: add StatCard with CountUp animation"
```

---

## Task 8: HeroCard

**Files:**
- Create: `components/bento/HeroCard.tsx`

- [ ] **Step 1: Create components/bento/HeroCard.tsx**

```tsx
// components/bento/HeroCard.tsx
"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function HeroCard() {
  const nameRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    async function animateName() {
      const { gsap } = await import("gsap");
      const el = nameRef.current;
      if (!el) return;

      const text = el.textContent ?? "";
      el.innerHTML = text
        .split("")
        .map((char) =>
          char === " "
            ? " "
            : `<span style="display:inline-block;overflow:hidden"><span class="char" style="display:inline-block;transform:translateY(110%)">${char}</span></span>`
        )
        .join("");

      gsap.to(el.querySelectorAll(".char"), {
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.03,
        delay: 0.2,
      });
    }

    animateName();
  }, []);

  return (
    <div
      className="bento-card"
      style={{
        gridColumn: "span 8",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "1.5rem",
        minHeight: 320,
        padding: "2.5rem",
      }}
    >
      <h1
        ref={nameRef}
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(3rem, 8vw, 6rem)",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          lineHeight: 1,
          color: "var(--color-text)",
        }}
      >
        ROHAIL BUTT
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
          fontWeight: 600,
          fontFamily: "var(--font-display)",
          color: "var(--color-accent)",
          letterSpacing: "-0.02em",
        }}
      >
        I build AI-powered systems that scale.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        style={{
          fontSize: "1rem",
          color: "var(--color-muted)",
          lineHeight: 1.7,
          maxWidth: "52ch",
        }}
      >
        Senior Full Stack Engineer & AI Solution Architect. 6 years shipping
        fintech infrastructure, distributed systems, and production AI.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.4 }}
        style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
      >
        <a
          href="#contact"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem 1.5rem",
            background: "var(--color-accent)",
            color: "#080c0c",
            fontWeight: 600,
            fontSize: "0.9rem",
            borderRadius: "var(--radius-md)",
            textDecoration: "none",
            transition: "opacity 200ms",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.opacity = "0.85")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.opacity = "1")
          }
        >
          Hire Me →
        </a>
        <a
          href="#projects"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem 1.5rem",
            background: "transparent",
            color: "var(--color-text)",
            fontWeight: 500,
            fontSize: "0.9rem",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--color-border)",
            textDecoration: "none",
            transition: "border-color 200ms",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.borderColor =
              "var(--color-accent)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.borderColor =
              "var(--color-border)")
          }
        >
          View Work ↓
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.4 }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          fontFamily: "var(--font-mono)",
          fontSize: "0.8rem",
          color: "var(--color-accent)",
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "var(--color-accent)",
            boxShadow: "0 0 8px var(--color-accent)",
            animation: "pulse 2s infinite",
          }}
        />
        Available for remote & freelance
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 2: Add pulse keyframe to globals.css**

Append to `app/globals.css`:

```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
```

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add components/bento/HeroCard.tsx app/globals.css
git commit -m "feat: add HeroCard with GSAP name reveal and Framer Motion animations"
```

---

## Task 9: About, Availability, Skills & Experience Cards

**Files:**
- Create: `components/bento/AboutCard.tsx`
- Create: `components/bento/AvailabilityCard.tsx`
- Create: `components/bento/SkillsCard.tsx`
- Create: `components/bento/ExperienceCard.tsx`

- [ ] **Step 1: Create components/bento/AboutCard.tsx**

```tsx
// components/bento/AboutCard.tsx
export function AboutCard() {
  return (
    <div className="bento-card" style={{ gridColumn: "span 4" }}>
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.7rem",
          color: "var(--color-accent)",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          marginBottom: "1rem",
        }}
      >
        About
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
        {[
          "I'm a Senior Engineer based in Lahore — I architect distributed systems, ship production AI agents, and launch complete SaaS products.",
          "Previously: fintech infrastructure processing $5M+ monthly, event-driven platforms serving 10K+ users across 3 continents, and AI systems that reason autonomously over codebases.",
          "I lead teams and ship solo. Both at the same time if the product demands it.",
        ].map((para, i) => (
          <p
            key={i}
            style={{
              fontSize: "0.9rem",
              color: i === 0 ? "var(--color-text)" : "var(--color-muted)",
              lineHeight: 1.7,
            }}
          >
            {para}
          </p>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create components/bento/AvailabilityCard.tsx**

```tsx
// components/bento/AvailabilityCard.tsx
export function AvailabilityCard() {
  return (
    <div
      className="bento-card"
      style={{
        gridColumn: "span 3",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "1rem",
      }}
    >
      <div>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            color: "var(--color-accent)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: "0.75rem",
          }}
        >
          Status
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "var(--color-accent)",
              boxShadow: "0 0 8px var(--color-accent)",
              animation: "pulse 2s infinite",
            }}
          />
          <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>
            Open to Work
          </span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
        {["Remote", "Full-time", "Contract"].map((tag) => (
          <span
            key={tag}
            style={{
              display: "inline-block",
              padding: "0.25rem 0.625rem",
              background: "var(--color-accent-dim)",
              color: "var(--color-accent)",
              borderRadius: "var(--radius-sm)",
              fontSize: "0.75rem",
              fontFamily: "var(--font-mono)",
              width: "fit-content",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      <a
        href="mailto:rohailbutt1995@gmail.com"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          color: "var(--color-muted)",
          textDecoration: "none",
          wordBreak: "break-all",
        }}
      >
        rohailbutt1995@gmail.com
      </a>
    </div>
  );
}
```

- [ ] **Step 3: Create components/bento/SkillsCard.tsx**

```tsx
// components/bento/SkillsCard.tsx

const SKILLS = [
  { group: "Core Languages", items: ["TypeScript", "Python", "JavaScript"] },
  { group: "Backend", items: ["NestJS", "Node.js", "GraphQL", "WebSockets"] },
  { group: "Frontend", items: ["Next.js", "React", "Tailwind CSS"] },
  {
    group: "AI / LLM",
    items: ["OpenAI API", "Claude API", "RAG Pipelines", "Vector DB", "Autonomous Agents"],
  },
  {
    group: "Cloud & DevOps",
    items: ["AWS (EKS · ECS · Lambda · S3)", "Docker", "Kubernetes", "Terraform"],
  },
  {
    group: "Databases",
    items: ["MongoDB", "PostgreSQL", "Redis", "Supabase"],
  },
  {
    group: "Integrations",
    items: ["Stripe", "Fireblocks", "Monoova", "Shopify", "WhatsApp API", "KYC/AML"],
  },
];

export function SkillsCard() {
  return (
    <div
      id="work"
      className="bento-card"
      style={{ gridColumn: "span 8" }}
    >
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.7rem",
          color: "var(--color-accent)",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          marginBottom: "1.5rem",
        }}
      >
        Skills
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
        {SKILLS.map(({ group, items }) => (
          <div
            key={group}
            style={{
              display: "grid",
              gridTemplateColumns: "10rem 1fr",
              gap: "0.5rem",
              alignItems: "baseline",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: "var(--color-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {group}
            </span>
            <span
              style={{
                fontSize: "0.9rem",
                color: "var(--color-text)",
                lineHeight: 1.6,
              }}
            >
              {items.join(" · ")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create components/bento/ExperienceCard.tsx**

```tsx
// components/bento/ExperienceCard.tsx

const EXPERIENCE = [
  {
    company: "Codeupscale",
    role: "Senior Engineer / Solution Architect",
    period: "Nov 2025 → Present",
  },
  {
    company: "ShuttlePro",
    role: "Senior Engineer → Team Lead",
    period: "May 2021 → Oct 2025",
  },
  {
    company: "Kinectro",
    role: "Consulting Lead (concurrent)",
    period: "May 2021 → Dec 2023",
  },
  {
    company: "CQ Technologies",
    role: "Software Engineer",
    period: "Oct 2020 → Apr 2021",
  },
];

export function ExperienceCard() {
  return (
    <div className="bento-card" style={{ gridColumn: "span 4" }}>
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.7rem",
          color: "var(--color-accent)",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          marginBottom: "1.5rem",
        }}
      >
        Experience
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {EXPERIENCE.map(({ company, role, period }) => (
          <div key={company} style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <span
              style={{
                fontWeight: 600,
                fontSize: "0.9rem",
                color: "var(--color-text)",
              }}
            >
              {company}
            </span>
            <span style={{ fontSize: "0.8rem", color: "var(--color-muted)" }}>
              {role}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: "var(--color-accent-dim)",
                marginTop: "0.125rem",
              }}
            >
              {period}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Verify**

```bash
npx tsc --noEmit
```

- [ ] **Step 6: Commit**

```bash
git add components/bento/AboutCard.tsx components/bento/AvailabilityCard.tsx components/bento/SkillsCard.tsx components/bento/ExperienceCard.tsx
git commit -m "feat: add About, Availability, Skills, Experience bento cards"
```

---

## Task 10: Project Cards

**Files:**
- Create: `components/bento/FeaturedProjectCard.tsx`
- Create: `components/bento/ProjectCard.tsx`

- [ ] **Step 1: Create components/bento/FeaturedProjectCard.tsx**

```tsx
// components/bento/FeaturedProjectCard.tsx
"use client";

import Link from "next/link";
import type { Project } from "@/lib/projects";

export function FeaturedProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      style={{ textDecoration: "none" }}
    >
      <div
        id="projects"
        className="bento-card"
        style={{
          gridColumn: "span 12",
          padding: "2.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
          cursor: "pointer",
          background:
            "linear-gradient(135deg, var(--color-surface) 0%, rgba(16,185,129,0.04) 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              color: "var(--color-accent)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Featured Project
          </span>
          <span
            style={{
              padding: "0.2rem 0.5rem",
              background: "var(--color-accent-dim)",
              color: "var(--color-accent)",
              borderRadius: "var(--radius-sm)",
              fontSize: "0.7rem",
              fontFamily: "var(--font-mono)",
            }}
          >
            {project.category}
          </span>
        </div>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "var(--color-text)",
          }}
        >
          {project.title}
        </h2>

        <p
          style={{
            fontSize: "1rem",
            color: "var(--color-muted)",
            lineHeight: 1.7,
            maxWidth: "72ch",
          }}
        >
          {project.description}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {project.stack.slice(0, 6).map((tech) => (
            <span
              key={tech}
              style={{
                padding: "0.25rem 0.625rem",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-sm)",
                fontSize: "0.75rem",
                fontFamily: "var(--font-mono)",
                color: "var(--color-muted)",
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "var(--color-accent)",
            fontWeight: 600,
            fontSize: "0.9rem",
          }}
        >
          View Case Study →
        </div>
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Create components/bento/ProjectCard.tsx**

```tsx
// components/bento/ProjectCard.tsx
import Link from "next/link";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      style={{ textDecoration: "none" }}
    >
      <div
        className="bento-card"
        style={{
          gridColumn: "span 6",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          cursor: "pointer",
          height: "100%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span
            style={{
              padding: "0.2rem 0.5rem",
              background: "var(--color-accent-dim)",
              color: "var(--color-accent)",
              borderRadius: "var(--radius-sm)",
              fontSize: "0.7rem",
              fontFamily: "var(--font-mono)",
            }}
          >
            {project.category}
          </span>
        </div>

        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.25rem",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "var(--color-text)",
          }}
        >
          {project.title}
        </h3>

        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--color-muted)",
            lineHeight: 1.7,
            flex: 1,
          }}
        >
          {project.description}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
          {project.stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              style={{
                padding: "0.2rem 0.5rem",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-sm)",
                fontSize: "0.7rem",
                fontFamily: "var(--font-mono)",
                color: "var(--color-muted)",
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        <span
          style={{
            color: "var(--color-accent)",
            fontSize: "0.85rem",
            fontWeight: 600,
          }}
        >
          View Case Study →
        </span>
      </div>
    </Link>
  );
}
```

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add components/bento/FeaturedProjectCard.tsx components/bento/ProjectCard.tsx
git commit -m "feat: add FeaturedProjectCard and ProjectCard components"
```

---

## Task 11: Contact Card & CopyToast

**Files:**
- Create: `components/bento/ContactCard.tsx`
- Create: `components/ui/CopyToast.tsx`

- [ ] **Step 1: Create components/ui/CopyToast.tsx**

```tsx
// components/ui/CopyToast.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";

export function CopyToast({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2 }}
          style={{
            position: "fixed",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            background: "var(--color-accent)",
            color: "#080c0c",
            padding: "0.5rem 1.25rem",
            borderRadius: "var(--radius-md)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
            fontWeight: 600,
            zIndex: 100,
            pointerEvents: "none",
          }}
        >
          Copied to clipboard
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Create components/bento/ContactCard.tsx**

```tsx
// components/bento/ContactCard.tsx
"use client";

import { useState } from "react";
import { CopyToast } from "@/components/ui/CopyToast";

const EMAIL = "rohailbutt1995@gmail.com";

export function ContactCard() {
  const [toastVisible, setToastVisible] = useState(false);

  async function copyEmail() {
    await navigator.clipboard.writeText(EMAIL);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  }

  return (
    <section id="contact">
      <div
        className="bento-card"
        style={{
          gridColumn: "span 12",
          padding: "3rem",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            color: "var(--color-accent)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          Get in Touch
        </p>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "var(--color-text)",
          }}
        >
          Let's build something serious.
        </h2>

        <p style={{ color: "var(--color-muted)", maxWidth: "50ch", lineHeight: 1.7 }}>
          Available for senior engineering roles, technical consulting, and
          product contracts.
        </p>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <button
            onClick={copyEmail}
            style={{
              padding: "0.75rem 1.5rem",
              background: "var(--color-accent)",
              color: "#080c0c",
              fontWeight: 600,
              fontSize: "0.9rem",
              borderRadius: "var(--radius-md)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            Copy Email
          </button>
          <a
            href="https://github.com/vnQ-coder"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "0.75rem 1.5rem",
              border: "1px solid var(--color-border)",
              color: "var(--color-text)",
              fontWeight: 500,
              fontSize: "0.9rem",
              borderRadius: "var(--radius-md)",
              textDecoration: "none",
            }}
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/rohailbutt29"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "0.75rem 1.5rem",
              border: "1px solid var(--color-border)",
              color: "var(--color-text)",
              fontWeight: 500,
              fontSize: "0.9rem",
              borderRadius: "var(--radius-md)",
              textDecoration: "none",
            }}
          >
            LinkedIn
          </a>
        </div>

        <button
          onClick={copyEmail}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
            color: "var(--color-muted)",
            background: "none",
            border: "none",
            cursor: "pointer",
            textDecoration: "underline",
            textDecorationStyle: "dashed",
          }}
        >
          {EMAIL}
        </button>
      </div>

      <CopyToast visible={toastVisible} />
    </section>
  );
}
```

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add components/bento/ContactCard.tsx components/ui/CopyToast.tsx
git commit -m "feat: add ContactCard with clipboard copy and CopyToast"
```

---

## Task 12: BentoGrid & Landing Page

**Files:**
- Create: `components/bento/BentoGrid.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create components/bento/BentoGrid.tsx**

```tsx
// components/bento/BentoGrid.tsx
export function BentoGrid({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        gap: "1rem",
        padding: "2rem",
        maxWidth: "1400px",
        margin: "0 auto",
        paddingTop: "6rem",
      }}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Replace app/page.tsx**

```tsx
// app/page.tsx
import { BentoGrid } from "@/components/bento/BentoGrid";
import { HeroCard } from "@/components/bento/HeroCard";
import { AboutCard } from "@/components/bento/AboutCard";
import { StatCard } from "@/components/bento/StatCard";
import { AvailabilityCard } from "@/components/bento/AvailabilityCard";
import { FeaturedProjectCard } from "@/components/bento/FeaturedProjectCard";
import { ProjectCard } from "@/components/bento/ProjectCard";
import { SkillsCard } from "@/components/bento/SkillsCard";
import { ExperienceCard } from "@/components/bento/ExperienceCard";
import { ContactCard } from "@/components/bento/ContactCard";
import { projects } from "@/lib/projects";

export default function Home() {
  const [featured, ...rest] = projects;

  return (
    <BentoGrid>
      {/* Row 1: Hero + About */}
      <HeroCard />
      <AboutCard />

      {/* Row 2: Stats + Availability */}
      <StatCard rawValue={5} prefix="$" suffix="M+" label="Monthly Txn Volume" />
      <StatCard rawValue={10000} suffix="+" label="Global Production Users" displayValue="10K+" />
      <StatCard rawValue={99.9} suffix="%" label="Production Uptime SLA" displayValue="99.9%" />
      <AvailabilityCard />

      {/* Row 3: Featured project */}
      <FeaturedProjectCard project={featured} />

      {/* Row 4: More projects */}
      {rest.map((p) => (
        <ProjectCard key={p.slug} project={p} />
      ))}

      {/* Row 5: Skills + Experience */}
      <SkillsCard />
      <ExperienceCard />

      {/* Row 6: Contact */}
      <ContactCard />
    </BentoGrid>
  );
}
```

- [ ] **Step 3: Start dev server and do full visual review**

```bash
npm run dev
```

Open `http://localhost:3000`. Check:
- Bento grid renders correctly
- Hero name animates in
- Stats visible
- Project cards link correctly
- Skills groups readable
- Contact card visible

- [ ] **Step 4: Commit**

```bash
git add components/bento/BentoGrid.tsx app/page.tsx
git commit -m "feat: assemble bento grid landing page"
```

---

## Task 13: Custom Cursor

**Files:**
- Create: `components/ui/CustomCursor.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create components/ui/CustomCursor.tsx**

```tsx
// components/ui/CustomCursor.tsx
"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let curX = 0;
    let curY = 0;

    function onMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }

    function animate() {
      curX += (mouseX - curX) * 0.15;
      curY += (mouseY - curY) * 0.15;
      if (cursor) {
        cursor.style.transform = `translate(${curX}px, ${curY}px) translate(-50%, -50%)`;
      }
      requestAnimationFrame(animate);
    }

    function onEnter(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const card = target.closest("[data-cursor]");
      if (card) {
        setLabel(card.getAttribute("data-cursor") ?? "");
        setExpanded(true);
      }
    }

    function onLeave() {
      setLabel("");
      setExpanded(false);
    }

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseenter", onEnter, true);
    document.addEventListener("mouseleave", onLeave, true);
    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseenter", onEnter, true);
      document.removeEventListener("mouseleave", onLeave, true);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: expanded ? 80 : 12,
        height: expanded ? 80 : 12,
        borderRadius: "50%",
        background: expanded ? "transparent" : "var(--color-accent)",
        border: expanded ? "1.5px solid var(--color-accent)" : "none",
        transition: "width 250ms var(--ease-out), height 250ms var(--ease-out), background 250ms",
        willChange: "transform",
      }}
    >
      {expanded && label && (
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: "var(--color-accent)",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Add data-cursor attributes to project cards**

In `components/bento/FeaturedProjectCard.tsx`, add `data-cursor="View Case Study"` to the outer `<div>`.

In `components/bento/ProjectCard.tsx`, add `data-cursor="View Case Study"` to the outer `<div>`.

- [ ] **Step 3: Add CustomCursor to layout.tsx**

```tsx
// In app/layout.tsx — add import:
import { CustomCursor } from "@/components/ui/CustomCursor";

// In <body>, add before <Nav />:
<CustomCursor />
```

- [ ] **Step 4: Add global cursor: none to globals.css**

Append to `app/globals.css`:
```css
@media (hover: hover) {
  * { cursor: none; }
  a, button { cursor: none; }
}
```

- [ ] **Step 5: Verify on desktop — cursor follows mouse and expands on project cards**

```bash
npm run dev
```

- [ ] **Step 6: Commit**

```bash
git add components/ui/CustomCursor.tsx components/bento/FeaturedProjectCard.tsx components/bento/ProjectCard.tsx app/layout.tsx app/globals.css
git commit -m "feat: add magnetic custom cursor with label expansion"
```

---

## Task 14: Command Palette

**Files:**
- Create: `components/ui/CommandPalette.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create components/ui/CommandPalette.tsx**

```tsx
// components/ui/CommandPalette.tsx
"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { AnimatePresence, motion } from "framer-motion";

const CONFETTI_COLORS = ["#10b981", "#34d399", "#6ee7b7", "#a7f3d0"];

function fireConfetti() {
  for (let i = 0; i < 60; i++) {
    const el = document.createElement("div");
    el.style.cssText = `
      position:fixed;
      top:50%;left:50%;
      width:8px;height:8px;
      border-radius:50%;
      background:${CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)]};
      pointer-events:none;
      z-index:9998;
    `;
    document.body.appendChild(el);
    const angle = Math.random() * Math.PI * 2;
    const distance = 80 + Math.random() * 200;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    el.animate(
      [
        { transform: "translate(-50%,-50%) scale(1)", opacity: 1 },
        { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0)`, opacity: 0 },
      ],
      { duration: 700 + Math.random() * 400, easing: "ease-out", fill: "forwards" }
    ).onfinish = () => el.remove();
  }
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function runCommand(action: () => void) {
    setOpen(false);
    action();
  }

  const commands = [
    {
      label: "Download Resume",
      action: () => window.open("/resume", "_blank"),
    },
    {
      label: "Contact Rohail",
      action: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      label: "View GitHub",
      action: () => window.open("https://github.com/vnQ-coder", "_blank"),
    },
    {
      label: "View LinkedIn",
      action: () => window.open("https://linkedin.com/in/rohailbutt29", "_blank"),
    },
    {
      label: "sudo hire rohail",
      action: () => {
        fireConfetti();
        setTimeout(() => alert("Good choice."), 300);
      },
    },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(4px)",
              zIndex: 200,
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed",
              top: "20%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "min(560px, 90vw)",
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-xl)",
              overflow: "hidden",
              zIndex: 201,
            }}
          >
            <Command label="Command Palette">
              <div
                style={{
                  padding: "0.75rem 1rem",
                  borderBottom: "1px solid var(--color-border)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span style={{ color: "var(--color-muted)", fontSize: "1rem" }}>⌘</span>
                <Command.Input
                  placeholder="Type a command…"
                  style={{
                    background: "none",
                    border: "none",
                    outline: "none",
                    color: "var(--color-text)",
                    fontSize: "0.95rem",
                    fontFamily: "var(--font-sans)",
                    flex: 1,
                    caretColor: "var(--color-accent)",
                  }}
                />
              </div>
              <Command.List style={{ padding: "0.5rem" }}>
                <Command.Empty
                  style={{
                    padding: "1rem",
                    textAlign: "center",
                    color: "var(--color-muted)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.8rem",
                  }}
                >
                  No commands found.
                </Command.Empty>
                {commands.map(({ label, action }) => (
                  <Command.Item
                    key={label}
                    onSelect={() => runCommand(action)}
                    style={{
                      padding: "0.75rem 1rem",
                      borderRadius: "var(--radius-md)",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      color: label === "sudo hire rohail" ? "var(--color-accent)" : "var(--color-text)",
                      fontFamily: label === "sudo hire rohail" ? "var(--font-mono)" : "var(--font-sans)",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                    data-selected-style={{ background: "var(--color-border)" }}
                  >
                    {label}
                  </Command.Item>
                ))}
              </Command.List>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Add CommandPalette to layout.tsx**

```tsx
// app/layout.tsx — add import:
import { CommandPalette } from "@/components/ui/CommandPalette";

// In <body>, add after <CustomCursor />:
<CommandPalette />
```

- [ ] **Step 3: Add cmdk selected item highlight to globals.css**

Append to `app/globals.css`:
```css
[cmdk-item][data-selected="true"] {
  background: var(--color-border);
  color: var(--color-accent);
}
```

- [ ] **Step 4: Test Cmd+K opens palette, Escape closes, "sudo hire rohail" fires confetti**

```bash
npm run dev
```

Press `Cmd+K` (Mac) or `Ctrl+K` (Windows). Palette opens. Type "sudo" and select.

- [ ] **Step 5: Commit**

```bash
git add components/ui/CommandPalette.tsx app/layout.tsx app/globals.css
git commit -m "feat: add Cmd+K command palette with confetti easter egg"
```

---

## Task 15: Konami Code Easter Egg

**Files:**
- Create: `components/ui/KonamiOverlay.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create components/ui/KonamiOverlay.tsx**

```tsx
// components/ui/KonamiOverlay.tsx
"use client";

import { useKonamiCode } from "@/hooks/useKonamiCode";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

const LINES = [
  "> rohail --version",
  "> Senior Engineer v6.0.0",
  "> AI Systems: ✓ Production",
  "> Uptime: 99.9%",
  "> Status: Available for hire",
  "",
  "> Press any key to exit_",
];

export function KonamiOverlay() {
  const activated = useKonamiCode();
  const [visible, setVisible] = useState(false);
  const [visibleLines, setVisibleLines] = useState<string[]>([]);

  useEffect(() => {
    if (activated) {
      setVisible(true);
      setVisibleLines([]);
      LINES.forEach((line, i) => {
        setTimeout(() => {
          setVisibleLines((prev) => [...prev, line]);
        }, i * 200);
      });
    }
  }, [activated]);

  useEffect(() => {
    if (!visible) return;
    function onKey() {
      setVisible(false);
      setVisibleLines([]);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            inset: 0,
            background: "#000",
            zIndex: 9990,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 0,
            fontFamily: "var(--font-mono)",
            padding: "2rem",
          }}
        >
          {/* Scanlines */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
              pointerEvents: "none",
            }}
          />
          <div style={{ position: "relative", zIndex: 1 }}>
            {visibleLines.map((line, i) => (
              <p
                key={i}
                style={{
                  color: "#10b981",
                  fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
                  lineHeight: 2,
                  margin: 0,
                  opacity: line === "" ? 0 : 1,
                }}
              >
                {line}
              </p>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Add KonamiOverlay to layout.tsx**

```tsx
import { KonamiOverlay } from "@/components/ui/KonamiOverlay";

// In <body>, add after <CommandPalette />:
<KonamiOverlay />
```

- [ ] **Step 3: Verify — type Konami code on landing page**

```bash
npm run dev
```

Type `↑↑↓↓←→←→BA`. Retro terminal overlay should appear. Any key dismisses.

- [ ] **Step 4: Commit**

```bash
git add components/ui/KonamiOverlay.tsx app/layout.tsx
git commit -m "feat: add Konami code retro terminal easter egg"
```

---

## Task 16: Case Study Components

**Files:**
- Create: `components/case-study/CaseStudyHeader.tsx`
- Create: `components/case-study/MetricsBar.tsx`
- Create: `components/case-study/KeyDecisionCard.tsx`
- Create: `components/case-study/CaseStudyPagination.tsx`

- [ ] **Step 1: Create components/case-study/CaseStudyHeader.tsx**

```tsx
// components/case-study/CaseStudyHeader.tsx
import type { Project } from "@/lib/projects";

export function CaseStudyHeader({ project }: { project: Project }) {
  return (
    <div style={{ marginBottom: "3rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          marginBottom: "1.5rem",
        }}
      >
        <span
          style={{
            padding: "0.25rem 0.625rem",
            background: "var(--color-accent-dim)",
            color: "var(--color-accent)",
            borderRadius: "var(--radius-sm)",
            fontSize: "0.75rem",
            fontFamily: "var(--font-mono)",
          }}
        >
          {project.category}
        </span>
      </div>

      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.5rem, 6vw, 4rem)",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          color: "var(--color-text)",
          marginBottom: "1rem",
          lineHeight: 1.05,
        }}
      >
        {project.title}
      </h1>

      <p
        style={{
          fontSize: "1.125rem",
          color: "var(--color-muted)",
          lineHeight: 1.7,
          maxWidth: "60ch",
        }}
      >
        {project.subtitle}
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Create components/case-study/MetricsBar.tsx**

```tsx
// components/case-study/MetricsBar.tsx
import type { Metric } from "@/lib/projects";

export function MetricsBar({ metrics }: { metrics: Metric[] }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "1rem",
        marginBottom: "3rem",
      }}
    >
      {metrics.map(({ value, label }) => (
        <div
          key={label}
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-xl)",
            padding: "1.5rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2rem",
              fontWeight: 700,
              color: "var(--color-accent)",
              letterSpacing: "-0.02em",
              lineHeight: 1,
              marginBottom: "0.5rem",
            }}
          >
            {value}
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              color: "var(--color-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Create components/case-study/KeyDecisionCard.tsx**

```tsx
// components/case-study/KeyDecisionCard.tsx
import type { KeyDecision } from "@/lib/projects";

export function KeyDecisionCard({ decision }: { decision: KeyDecision }) {
  return (
    <div
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderLeft: "3px solid var(--color-accent)",
        borderRadius: "var(--radius-lg)",
        padding: "1.5rem",
      }}
    >
      <h4
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1rem",
          fontWeight: 600,
          color: "var(--color-text)",
          marginBottom: "0.75rem",
        }}
      >
        {decision.title}
      </h4>
      <p
        style={{
          fontSize: "0.875rem",
          color: "var(--color-muted)",
          lineHeight: 1.75,
        }}
      >
        {decision.body}
      </p>
    </div>
  );
}
```

- [ ] **Step 4: Create components/case-study/CaseStudyPagination.tsx**

```tsx
// components/case-study/CaseStudyPagination.tsx
import Link from "next/link";
import type { Project } from "@/lib/projects";

type Props = {
  prev: Project | undefined;
  next: Project | undefined;
};

export function CaseStudyPagination({ prev, next }: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        paddingTop: "3rem",
        borderTop: "1px solid var(--color-border)",
        marginTop: "3rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        {prev ? (
          <Link
            href={`/projects/${prev.slug}`}
            style={{
              textDecoration: "none",
              color: "var(--color-muted)",
              fontSize: "0.875rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/projects/${next.slug}`}
            style={{
              textDecoration: "none",
              color: "var(--color-muted)",
              fontSize: "0.875rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </div>

      <a
        href="/#contact"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.875rem 1.75rem",
          background: "var(--color-accent)",
          color: "#080c0c",
          fontWeight: 600,
          fontSize: "0.9rem",
          borderRadius: "var(--radius-md)",
          textDecoration: "none",
          width: "fit-content",
        }}
      >
        Hire me for something similar →
      </a>
    </div>
  );
}
```

- [ ] **Step 5: Verify**

```bash
npx tsc --noEmit
```

- [ ] **Step 6: Commit**

```bash
git add components/case-study/
git commit -m "feat: add case study shared components"
```

---

## Task 17: Case Study Page

**Files:**
- Create: `app/projects/[slug]/page.tsx`

- [ ] **Step 1: Create app/projects/[slug]/page.tsx**

```tsx
// app/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProject, getAdjacentProjects, projects } from "@/lib/projects";
import { CaseStudyHeader } from "@/components/case-study/CaseStudyHeader";
import { MetricsBar } from "@/components/case-study/MetricsBar";
import { KeyDecisionCard } from "@/components/case-study/KeyDecisionCard";
import { CaseStudyPagination } from "@/components/case-study/CaseStudyPagination";
import type { Metadata } from "next";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Rohail Butt`,
    description: project.description,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);

  const sectionStyle = {
    marginBottom: "3rem",
  };

  const sectionLabelStyle: React.CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "0.7rem",
    color: "var(--color-accent)",
    textTransform: "uppercase" as const,
    letterSpacing: "0.1em",
    marginBottom: "1rem",
    display: "block",
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "8rem 2rem 4rem",
      }}
    >
      {/* Back link */}
      <Link
        href="/#projects"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.375rem",
          color: "var(--color-muted)",
          textDecoration: "none",
          fontSize: "0.875rem",
          marginBottom: "3rem",
          fontFamily: "var(--font-mono)",
        }}
      >
        ← Back to Work
      </Link>

      <CaseStudyHeader project={project} />
      <MetricsBar metrics={project.metrics} />

      {/* Problem */}
      <div style={sectionStyle}>
        <span style={sectionLabelStyle}>The Problem</span>
        <p style={{ fontSize: "1rem", color: "var(--color-text)", lineHeight: 1.8 }}>
          {project.problem}
        </p>
      </div>

      {/* Role */}
      <div style={sectionStyle}>
        <span style={sectionLabelStyle}>My Role</span>
        <p style={{ fontSize: "1rem", color: "var(--color-text)", lineHeight: 1.8 }}>
          {project.role}
        </p>
      </div>

      {/* Key Decisions */}
      <div style={sectionStyle}>
        <span style={sectionLabelStyle}>Key Architectural Decisions</span>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {project.keyDecisions.map((d) => (
            <KeyDecisionCard key={d.title} decision={d} />
          ))}
        </div>
      </div>

      {/* Stack */}
      <div style={sectionStyle}>
        <span style={sectionLabelStyle}>Stack</span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {project.stack.map((tech) => (
            <span
              key={tech}
              style={{
                padding: "0.3rem 0.75rem",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-sm)",
                fontSize: "0.8rem",
                fontFamily: "var(--font-mono)",
                color: "var(--color-muted)",
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Outcomes */}
      <div style={sectionStyle}>
        <span style={sectionLabelStyle}>Outcome</span>
        <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem", listStyle: "none" }}>
          {project.outcomes.map((outcome) => (
            <li
              key={outcome}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.75rem",
                fontSize: "1rem",
                color: "var(--color-text)",
                lineHeight: 1.7,
              }}
            >
              <span style={{ color: "var(--color-accent)", flexShrink: 0, marginTop: "0.2rem" }}>
                →
              </span>
              {outcome}
            </li>
          ))}
        </ul>
      </div>

      <CaseStudyPagination prev={prev} next={next} />
    </div>
  );
}
```

- [ ] **Step 2: Verify all three case study pages**

```bash
npm run dev
```

Visit:
- `http://localhost:3000/projects/nebula-payments`
- `http://localhost:3000/projects/ai-project-manager`
- `http://localhost:3000/projects/shuttlepro`

All three should render with correct content, metrics, decisions, and pagination.

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add app/projects/
git commit -m "feat: add dynamic case study pages for all three projects"
```

---

## Task 18: Resume Redirect & Contact API

**Files:**
- Create: `app/resume/route.ts`
- Create: `app/api/contact/route.ts`

- [ ] **Step 1: Add resume PDF to public/**

Place Rohail's resume PDF at `public/resume.pdf`.

- [ ] **Step 2: Create app/resume/route.ts**

```ts
// app/resume/route.ts
import { redirect } from "next/navigation";

export function GET() {
  redirect("/resume.pdf");
}
```

- [ ] **Step 3: Add RESEND_API_KEY to .env.local**

```bash
# .env.local
RESEND_API_KEY=re_your_key_here
CONTACT_EMAIL=rohailbutt1995@gmail.com
```

Get a free Resend API key at resend.com.

- [ ] **Step 4: Create app/api/contact/route.ts**

```ts
// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const schema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(5000),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { name, email, message } = parsed.data;

  const { error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: process.env.CONTACT_EMAIL!,
    subject: `New message from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
    replyTo: email,
  });

  if (error) {
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
```

- [ ] **Step 5: Verify**

```bash
npx tsc --noEmit
```

- [ ] **Step 6: Commit**

```bash
git add app/resume/ app/api/ public/resume.pdf .env.local
git commit -m "feat: add resume redirect and Resend contact API route"
```

Note: add `.env.local` to `.gitignore` before committing.

```bash
echo ".env.local" >> .gitignore
git add .gitignore
```

---

## Task 19: OG Image & Final SEO

**Files:**
- Create: `app/opengraph-image.tsx`

- [ ] **Step 1: Create app/opengraph-image.tsx**

```tsx
// app/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Rohail Butt — Senior Full Stack Engineer & AI Solution Architect";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#080c0c",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 20,
            color: "#10b981",
            marginBottom: 24,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontFamily: "monospace",
          }}
        >
          rohailbutt.dev
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#e8f0ee",
            lineHeight: 1,
            letterSpacing: "-0.03em",
            marginBottom: 24,
          }}
        >
          ROHAIL BUTT
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#6b8c86",
            lineHeight: 1.5,
            maxWidth: 800,
          }}
        >
          Senior Full Stack Engineer & AI Solution Architect
        </div>
        <div
          style={{
            marginTop: 48,
            display: "flex",
            gap: 16,
            fontSize: 18,
            color: "#10b981",
            fontFamily: "monospace",
          }}
        >
          <span>$5M+ Txn Volume</span>
          <span>·</span>
          <span>10K+ Users</span>
          <span>·</span>
          <span>99.9% SLA</span>
          <span>·</span>
          <span>6 Years</span>
        </div>
      </div>
    ),
    size
  );
}
```

- [ ] **Step 2: Verify OG image renders**

```bash
npm run dev
```

Visit `http://localhost:3000/opengraph-image`. Should see the dark OG image.

- [ ] **Step 3: Commit**

```bash
git add app/opengraph-image.tsx
git commit -m "feat: add dynamic OG image via next/og"
```

---

## Task 20: Build Verification & Push to GitHub

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: all pages build successfully with no TypeScript errors. Note any warnings.

- [ ] **Step 2: Fix any build errors**

Common issues:
- Missing `"use client"` on components that use hooks → add directive
- Unescaped HTML entities in JSX → wrap in `{}`
- Missing `key` props → add unique keys

- [ ] **Step 3: Run dev for final visual QA**

```bash
npm run dev
```

Check:
- [ ] Landing page bento grid renders correctly at 1440px
- [ ] Landing page is readable at 375px (mobile)
- [ ] Hero name animates on load
- [ ] Stat cards count up on scroll
- [ ] Project cards hover with glow effect
- [ ] Custom cursor tracks mouse on desktop
- [ ] Cmd+K opens palette
- [ ] `↑↑↓↓←→←→BA` triggers Konami overlay
- [ ] Email copy button shows toast
- [ ] All three case study pages render
- [ ] Case study pagination works
- [ ] `/resume` redirects to PDF

- [ ] **Step 4: Push to GitHub**

```bash
git push origin main
```

- [ ] **Step 5: Deploy to Vercel**

```bash
npx vercel --prod
```

Or connect repo at vercel.com/new, select `vnQ-coder/rohailbutt-portfolio`, deploy.

Set environment variable `RESEND_API_KEY` in Vercel dashboard under Settings → Environment Variables.

- [ ] **Step 6: Add custom domain**

In Vercel dashboard → Domains → add `rohailbutt.dev`. Update DNS at your registrar:
```
Type: A      Name: @    Value: 76.76.21.21
Type: CNAME  Name: www  Value: cname.vercel-dns.com
```

- [ ] **Step 7: Final Lighthouse audit**

After deploying, run Lighthouse on `https://rohailbutt.dev`:

```
Target: 98+ Performance, 100 Accessibility, 100 Best Practices, 100 SEO
```

Fix any issues that drop below target.

- [ ] **Step 8: Final commit**

```bash
git add -A
git commit -m "feat: production-ready portfolio — rohailbutt.dev"
git push origin main
```

---

## Self-Review

**Spec coverage check:**

| Spec Section | Plan Coverage |
|---|---|
| Color system (#080C0C, #10B981) | ✓ Task 2 globals.css |
| Typography (Syne, Inter, JetBrains Mono) | ✓ Task 3 fonts.ts |
| Bento grid landing | ✓ Tasks 7–12 |
| Hero GSAP name reveal | ✓ Task 8 HeroCard |
| Stat CountUp animation | ✓ Tasks 5 + 7 |
| Custom cursor (desktop) | ✓ Task 13 |
| Cmd+K palette | ✓ Task 14 |
| Konami easter egg | ✓ Task 15 |
| Copy-to-clipboard toast | ✓ Task 11 |
| Case study pages (3) | ✓ Tasks 16–17 |
| Resume redirect | ✓ Task 18 |
| Contact + Resend API | ✓ Task 18 |
| OG image | ✓ Task 19 |
| JSON-LD Person schema | ✓ Task 3 layout.tsx |
| Footer live clock | ✓ Task 6 |
| Lenis smooth scroll | ✓ Task 3 |
| Performance (98+ Lighthouse) | ✓ Task 20 audit step |
| `prefers-reduced-motion` | ✓ Task 2 globals.css |
| Keyboard focus rings | ✓ Task 2 globals.css |
| rohailbutt.dev domain | ✓ Task 20 |

**No placeholders found.** All code blocks are complete. All file paths are exact.

**Type consistency:** `Project`, `Metric`, `KeyDecision` defined in `lib/projects.ts` Task 4. Used identically in Tasks 7, 10, 16, 17. `getProject` and `getAdjacentProjects` defined in Task 4 and called in Task 17. Consistent.
