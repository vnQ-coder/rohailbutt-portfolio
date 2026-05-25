# Portfolio Design Spec — Rohail Butt
**Date:** 2026-05-26  
**Domain:** rohailbutt.dev  
**Status:** Approved — ready for implementation

---

## 1. Overview

A premium, production-ready portfolio website targeting both remote engineering roles and freelance/consulting clients. Positioned as a dual-audience site: hiring managers at enterprise/scale-up companies and founders/product teams seeking senior contract engineers.

**Core positioning:** Senior engineer who architects and ships AI-powered systems at scale — solo or leading teams.

**Primary goals:**
- Convert hiring managers into interview requests
- Convert freelance clients into inbound enquiries
- Demonstrate engineering depth through case studies, not just bullet points

---

## 2. Target Audience

| Audience | What They Need to See |
|---|---|
| Enterprise hiring managers | Distributed systems depth, team leadership, uptime/scale metrics |
| Freelance/agency clients | Solo-build capability, delivery speed, production AI experience |
| Both | Concrete metrics, real impact numbers, architectural thinking |

---

## 3. Design System

### Color Palette
```
--color-bg:           #080C0C   /* deep void background */
--color-surface:      #0F1A18   /* elevated card surfaces */
--color-border:       #1A2E2A   /* subtle teal-tinted separator */
--color-text:         #E8F0EE   /* primary text */
--color-muted:        #6B8C86   /* secondary / label text */
--color-accent:       #10B981   /* emerald accent */
--color-accent-glow:  #10B98115 /* card hover glow */
--color-accent-dim:   #065F46   /* tags, chips */
```

### Typography
| Role | Font | Size | Weight | Notes |
|---|---|---|---|---|
| Display / Hero | Syne | 80–120px | 700–800 | letter-spacing: -0.03em |
| Section titles | Syne | 48px | 600 | |
| Card titles | Inter | 22–28px | 500 | |
| Body | Inter | 16–18px | 400 | line-height: 1.75 |
| Labels / Tags | Inter | 12–13px | 500 | uppercase, tracking-widest |
| Code / Dates | JetBrains Mono | 13px | 400 | |

All fonts loaded via `next/font` with automatic subsetting.

### Spacing (8px base grid)
```
4px / 8px / 16px / 24px / 32px / 48px / 64px / 96px / 128px
```

### Border Radius
```
4px   — tags, chips
8px   — buttons
12px  — small cards
16px  — standard cards
24px  — large cards / hero
```

### Card Hover State (all bento cards)
```css
transform: translateY(-4px);
box-shadow: 0 0 24px rgba(16, 185, 129, 0.12);
border-color: rgba(16, 185, 129, 0.3);
transition: all 200ms cubic-bezier(0.22, 1, 0.36, 1);
```

### Animation Tokens
```css
--ease-out:   cubic-bezier(0.22, 1, 0.36, 1);   /* primary */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* cursor spring */

--duration-fast:   150ms;   /* hover states */
--duration-base:   300ms;   /* UI transitions */
--duration-slow:   500ms;   /* section entrances */
--duration-xslow:  800ms;   /* hero reveal */
```

---

## 4. Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) + TypeScript |
| Styling | Tailwind CSS v4 + CSS custom properties |
| Animation | Framer Motion (components) + GSAP ScrollTrigger (hero/scroll) |
| Smooth scroll | Lenis |
| Fonts | `next/font` — Syne, Inter, JetBrains Mono |
| Icons | Lucide React (monochrome only) |
| Command palette | `cmdk` |
| Dark mode | `next-themes` (dark-first, system-aware) |
| OG images | `next/og` with edge runtime |
| Contact form | React Hook Form + Resend API |
| Analytics | Vercel Analytics |
| Deployment | Vercel (rohailbutt.dev) |

---

## 5. Site Architecture

```
rohailbutt.dev/                     Landing page (bento grid)
rohailbutt.dev/projects/[slug]      Case study pages (dynamic route)
rohailbutt.dev/resume               301 redirect → PDF download
```

### Routes & Slugs
```
/projects/nebula-payments           Fintech infrastructure ($5M+/mo)
/projects/ai-project-manager        AI agent + Jira-style PM tool
/projects/shuttlepro                Distributed platform, 10K+ users
```

---

## 6. Landing Page — Bento Grid Layout

12-column CSS grid. Cards span varying column/row counts for a magazine-feel layout.

### Card Inventory (top to bottom)

#### Navigation (fixed top bar)
```
rohailbutt.dev          About · Work · Projects · [ Hire Me → ]
```
- Fixed position, minimal height
- Active section indicator: small emerald dot beside the active link
- `Hire Me` styled as emerald-bordered button
- Mobile: slide-down drawer on `≡` tap

#### Row 1: Hero + About
| Card | Columns | Content |
|---|---|---|
| Hero | 8 | Name (animated reveal), tagline, CTA buttons, availability badge |
| About | 4 | 3-sentence bio, personality, what makes Rohail different |

**Hero copy:**
```
ROHAIL BUTT

I build AI-powered systems
that scale.

Senior Full Stack Engineer & AI Solution Architect.
6 years shipping fintech infrastructure,
distributed systems, and production AI.

[ Hire Me → ]    [ View Work ↓ ]

● Available for remote & freelance
```

**About copy:**
```
I'm a Senior Engineer based in Lahore — I architect
distributed systems, ship production AI agents, and
launch complete SaaS products.

Previously: fintech infrastructure processing $5M+
monthly, event-driven platforms serving 10K+ users
across 3 continents, and AI systems that reason
autonomously over codebases.

I lead teams and ship solo. Both at the same time
if the product demands it.
```

#### Row 2: Stats + Availability
| Card | Columns | Content |
|---|---|---|
| $5M+ | 3 | Monthly Transaction Volume (counts up on scroll) |
| 10K+ | 3 | Global Production Users (counts up on scroll) |
| 99.9% | 3 | Production Uptime SLA (counts up on scroll) |
| Open to Work | 3 | Availability status, contact email, remote/contract badge |

Stat cards: numbers animate from 0 to final value using Intersection Observer when scrolled into view.

#### Row 3: Featured Project (full width)
| Card | Columns | Content |
|---|---|---|
| Nebula Payments | 12 | Project name, tagline, 2-sentence description, stack tags, "View Case Study →" CTA |

Largest card on the page. Background has a subtle gradient shift on hover. CTA links to `/projects/nebula-payments`.

#### Row 4: Project Cards
| Card | Columns | Content |
|---|---|---|
| AI Project Manager | 6 | Title, description, stack, CTA |
| ShuttlePro Platform | 6 | Title, description, stack, CTA |

#### Row 5: Skills + Experience
| Card | Columns | Content |
|---|---|---|
| Skills | 8 | Grouped tech stack (typographic, no icons/progress bars) |
| Experience | 4 | Timeline: 3 companies with titles and date ranges |

**Skills groups:**
```
CORE LANGUAGES        TypeScript · Python · JavaScript
BACKEND               NestJS · Node.js · GraphQL · WebSockets
FRONTEND              Next.js · React · Tailwind CSS
AI / LLM              OpenAI API · Claude API · RAG Pipelines · Vector DB · Autonomous Agents
CLOUD & DEVOPS        AWS (EKS · ECS · Lambda · S3 · SES) · Docker · Kubernetes · Terraform
DATABASES             MongoDB · PostgreSQL · Redis · Supabase
INTEGRATIONS          Stripe · Fireblocks · Monoova · Shopify · WhatsApp Business API · KYC/AML
```

**Experience timeline:**
```
Codeupscale     Nov 2025 → Present    Senior Engineer / Solution Architect
ShuttlePro      May 2021 → Oct 2025   Senior Engineer → Team Lead (2023)
Kinectro        May 2021 → Dec 2023   Consulting Lead (concurrent)
CQ Technologies Oct 2020 → Apr 2021   Software Engineer
```

#### Row 6: Contact (full width)
```
Let's build something serious.

I'm available for senior engineering roles,
technical consulting, and product contracts.

[ Send a Message ]

rohailbutt1995@gmail.com  ←  click to copy
github.com/vnQ-coder
linkedin.com/in/rohailbutt29
```

#### Footer
```
rohailbutt.dev  ·  PKT 21:34:07  ·  built with Next.js 15
```
- Live clock (PKT timezone, ticks in real-time)
- No external links in footer — minimal

---

## 7. Case Study Page Template

All three project pages use the same layout. URL: `/projects/[slug]`

### Sections (top to bottom)

1. **Back link** — `← Back to Work`
2. **Header** — Project name (Syne Bold, 64px), subtitle, category tag
3. **Metrics bar** — 4 stat cards (same component as landing stats)
4. **The Problem** — 2–3 sentences: what was broken, stakes, constraints
5. **My Role** — What Rohail owned end-to-end
6. **Architecture** — SVG system diagram (emerald on dark) + 2 "Key Decision" cards explaining the WHY
7. **Stack** — Inline tech tags
8. **Outcome** — Bulleted metrics list (bold numbers, plain text explanation)
9. **Pagination** — `← Previous Project` / `Next Project →`
10. **Bottom CTA** — `Hire me for something similar →` → scrolls to contact

### Project Content

#### Nebula Payments (`/projects/nebula-payments`)
- **Metrics:** $5M+/mo volume · 100% test coverage · 40% faster onboarding · PCI-compliant
- **Problem:** Build regulated crypto-fiat exchange infrastructure from scratch with full KYC/AML compliance, capable of handling $5M+ monthly under financial regulations.
- **Role:** Solo architect and lead engineer. Owned system design, schema, API contracts, KYC/AML pipeline, payment integrations (Monoova, Wyre, Fireblocks), CI/CD.
- **Key decisions:** SQS async queues for transaction processing decoupling; 100% Jest coverage mandate on payment flows before any merge.
- **Stack:** NestJS · PostgreSQL · Redis · AWS ECS/ECR · Terraform · Monoova · Wyre · Fireblocks · Jest · Supertest
- **Outcome:** $5M+ monthly in production, 40% merchant onboarding reduction, PCI-compliant from day one, 100% test coverage on all payment paths.

#### AI Project Manager (`/projects/ai-project-manager`)
- **Metrics:** Solo build · Production daily use · GitHub-aware AI agent · Full RBAC
- **Problem:** Engineering team needed a Jira-style PM tool with an AI agent that could autonomously generate sprint tickets by reading the actual GitHub codebase — not generic templates.
- **Role:** Solo developer end-to-end. System architecture, schema design, RBAC, agent orchestration, CI/CD deployment.
- **Key decisions:** Claude API for agent reasoning over code context; GitHub tool use for live codebase analysis; NestJS for structured backend with clear service boundaries.
- **Stack:** NestJS · Next.js · Claude API · OpenAI API · MongoDB · GitHub API · Docker · GitHub Actions
- **Outcome:** In daily production use by the engineering team. AI agent generates contextually accurate sprint tickets from real repo state.

#### ShuttlePro Platform (`/projects/shuttlepro`)
- **Metrics:** 10K+ users · 3 continents · 99.9% SLA · 40% throughput gain · 30% cloud cost reduction
- **Problem:** Scale a commerce synchronization platform to 10,000+ merchant accounts across Shopify, WooCommerce, and social commerce — maintaining sub-100ms P95 latency under peak load, globally.
- **Role:** Senior Engineer → Team Lead. Led 5 engineers across 3 squads. Owned AWS infrastructure, Redis caching strategy, CI/CD pipeline, observability.
- **Key decisions:** Event-driven NestJS microservices on AWS EKS for horizontal scaling; Redis caching layer for 45% API response time reduction; spot-instance scheduling for 30% cloud cost reduction.
- **Stack:** NestJS · AWS EKS · Redis · MongoDB · React.js · Shopify API · WooCommerce API · GitHub Actions · AWS CodePipeline · CloudWatch · PagerDuty
- **Outcome:** 99.9% SLA maintained for 10K+ users across 3 continents. 40% throughput gain, 35% P95 latency reduction, 30% monthly cloud cost reduction, 50% faster release cycles.

---

## 8. Interactions & Animations

### Load Sequence
```
0ms    → Background #080C0C renders (no flash)
200ms  → Nav fades in (opacity 0→1, 300ms)
400ms  → Hero name character-by-character reveal (GSAP SplitText, 800ms)
800ms  → Tagline slides up (translateY 24→0, Framer Motion, 500ms)
1000ms → CTA buttons fade in (staggered 80ms apart)
1200ms → Bento cards cascade in (stagger 60ms, top-left → bottom-right)
```
Total visible content: ~1.4s

### Scroll Animations
- Stat numbers count up on Intersection Observer entry
- All card groups: `opacity 0→1` + `translateY 24→0` on scroll, stagger 80ms
- Skills labels: clip-path reveal, stagger 40ms each
- Experience entries: sequential reveal as user scrolls

### Custom Cursor (desktop only)
- Default: 10px filled emerald circle
- On links/buttons: expands to 40px ring with contextual label
- On project cards: shows "Open →"
- Spring physics via GSAP `quickTo` (80ms lag)
- Disabled on touch devices

### Special Features

#### Cmd+K Command Palette
Built with `cmdk`. Commands:
```
Download Resume       → triggers /resume PDF download
Contact Rohail        → scrolls to contact section
View GitHub           → opens github.com/vnQ-coder
View LinkedIn         → opens linkedin.com/in/rohailbutt29
Toggle Theme          → switches light/dark mode
sudo hire rohail      → confetti + toast "Good choice."
```

#### Konami Code Easter Egg
`↑↑↓↓←→←→BA` triggers retro terminal overlay:
```
> rohail --version
> Senior Engineer v6.0.0
> AI Systems: ✓ Production
> Uptime: 99.9%
> Status: Available for hire
```
Green monospace on black with scanlines. Resets on any keypress.

#### Copy-to-Clipboard Email
Click on email address → silently copies → emerald toast notification "Copied to clipboard". No confirm dialog.

#### Live Footer Clock
Displays current PKT time, ticking in real-time via `setInterval`.

### Accessibility
- `prefers-reduced-motion`: all animations disabled, content fully visible
- `prefers-color-scheme`: dark-first, system-aware via next-themes
- Keyboard navigation: full support, styled emerald focus rings (2px outline)
- Semantic HTML: `<nav>`, `<main>`, `<article>`, `<section>` used correctly
- ARIA labels on all icon-only interactive elements

---

## 9. SEO & Meta

```
Title:        Rohail Butt — Senior Full Stack Engineer & AI Solution Architect
Description:  6 years shipping fintech infrastructure, distributed systems,
              and production AI. Available for remote roles and freelance.
OG image:     Dynamic via next/og — name + role + emerald brand on dark bg
Twitter card: summary_large_image
JSON-LD:      Person schema (name, jobTitle, url, sameAs: [GitHub, LinkedIn])
Sitemap:      Auto-generated covering / and all /projects/* routes
Canonical:    Self-referencing on all pages
```

---

## 10. Performance Targets

| Metric | Target |
|---|---|
| Lighthouse (all categories) | 98+ |
| LCP | < 1.2s |
| CLS | < 0.05 |
| INP | < 100ms |
| TTFB | < 200ms |
| Initial JS bundle | < 100kb gzipped |

Achieved via: SSG for all pages, `next/font` for zero-CLS fonts, `next/image` with priority on hero, GPU-only animations (transform + opacity), lazy-loaded GSAP.

---

## 11. What Is Explicitly Excluded

- Skills progress bars (meaningless, look junior)
- Stock photography or avatar illustrations
- Testimonials (none available — omit rather than fake)
- Blog section (no articles at launch — add post-launch if desired)
- Social media beyond GitHub + LinkedIn
- "Download Resume" as a primary hero CTA
- Any page that is empty or placeholder at launch

---

## 12. Content Not Yet Provided

- Real project screenshots / mockups for case study pages (needed before launch)
- Professional photo of Rohail (optional — many top portfolios skip this)
- Final resume PDF to host at `/resume`
- Confirmation of AWS cert completion date (currently "In Progress — Q3 2026")

---

## 13. Post-Launch Additions (deferred, not in scope now)

- Blog / writing section (once articles exist)
- Dev Labs, Support AI, WhatsApp Call Center as additional project pages (open source projects from resume — can be added as a secondary projects grid)
- Testimonials section (once client feedback is collected)
- Vercel Speed Insights integration
