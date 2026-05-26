# Writing Section — Design Spec
**Date:** 2026-05-27
**Status:** Approved

## Goal

Add a `/writing` section to the portfolio that reinforces Rohail's positioning as a founding engineer by publishing 4 deep-dive posts (1500–2500 words each) written from real production experience. Each post addresses a problem a potential client or hiring manager is actively facing, demonstrating it has already been solved.

---

## Architecture

```
lib/posts.ts                          ← post data (mirrors lib/projects.ts pattern)
app/writing/page.tsx                  ← listing page
app/writing/[slug]/page.tsx           ← individual post page
components/writing/WritingCard.tsx    ← homepage bento teaser card
components/writing/PostNav.tsx        ← prev/next post pagination
```

No new dependencies. All content stored as typed TypeScript data, consistent with the existing `lib/projects.ts` pattern.

---

## Data Shape (`lib/posts.ts`)

```ts
type PostSection = {
  heading?: string
  paragraphs?: string[]
  bullets?: string[]
  callout?: string        // green-tinted highlight box — key insight or warning
  code?: { lang: string; content: string }
}

type Post = {
  slug: string
  title: string
  subtitle: string
  category: string        // e.g. "FinTech" | "AI" | "Infrastructure" | "Career"
  readTime: string        // e.g. "8 min read"
  publishedAt: string     // ISO date "YYYY-MM-DD"
  excerpt: string         // 2-sentence summary for listing cards and homepage teaser
  sections: PostSection[]
  prev: string | null     // slug of previous post
  next: string | null     // slug of next post
}
```

---

## Posts (4 at launch)

| # | Slug | Title | Category |
|---|------|-------|----------|
| 1 | `founding-engineer-mindset` | What it actually means to own the stack | Career |
| 2 | `fca-compliant-payment-rails` | Building regulated crypto-fiat infrastructure under Australian law | FinTech |
| 3 | `ai-agents-in-production` | Why most AI agents fail in production — and what I built instead | AI |
| 4 | `scaling-to-10k-merchants` | How I kept 10,000 merchants at 99.9% SLA during peak load | Infrastructure |

**Post structure (each post):** The Problem → The Decision → How It Works → What It Cost Not To Do This → The Outcome. This mirrors the case study narrative already used on project pages — a client reads the same problem-first framing they'll see on `/projects/[slug]`.

**Target length:** 1500–2500 words per post.

---

## Pages

### `/writing` (listing page)
- Grid of post cards: title, category chip, read time, excerpt, published date
- Dark bento-style cards with `bento-hover` — consistent with homepage aesthetic
- `generateMetadata` for SEO
- Static generation via `generateStaticParams`

### `/writing/[slug]` (individual post)
- Header: title, subtitle, category chip, read time, published date
- Sections render in order:
  - `heading` → `<h2>` with section label styling (matches case study `sectionLabel`)
  - `paragraphs` → `<p>` elements with `leading-relaxed`
  - `bullets` → styled list with `→` prefix (matches project outcomes style)
  - `callout` → green-tinted card (`bg-primary/10 border-primary/25`) for key insights
  - `code` → monospaced block using JetBrains Mono font
- Back link → `/writing`
- `PostNav` (prev/next) at bottom — mirrors `CaseStudyPagination`
- `generateMetadata` per post for SEO

---

## Homepage Bento Card (`WritingCard`)

- Placed in the bento grid alongside `OwnershipCard` / `ExperienceCard` row
- Grid span: `col-span-12 lg:col-span-4`
- Shows 3 most recent post titles with `→` prefix, category chip, and read time
- `Read all →` link to `/writing`
- Styled with `bento-hover`, dark card background, primary green accents — matches existing cards

---

## Navigation

`NAV_LINKS` in `Nav.tsx` gains:
```ts
{ label: "Writing", href: "/writing", id: "writing" }
```

Active state: highlights when `pathname` starts with `/writing`. Nav component needs `usePathname()` added alongside the existing scroll-based active detection. On non-home routes (e.g. `/writing`, `/writing/[slug]`), the scroll-based section highlighting is irrelevant — only pathname-based active state applies.

---

## SEO

- `/writing` page: title `"Writing — Rohail Butt"`, description from page intro copy
- `/writing/[slug]`: title `"${post.title} — Rohail Butt"`, description from `post.excerpt`
- Both use `generateStaticParams` for full static generation at build time

---

## What Is Explicitly Out of Scope

- No MDX, no markdown files, no CMS
- No comments, no likes, no newsletter signup
- No search or filtering on the listing page
- No tag/category filter pages
- No RSS feed
