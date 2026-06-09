# About Card — Desktop Monitor Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the text-only AboutCard with a CSS desktop monitor mockup that shows a mini version of the portfolio site inside, with a blinking cursor and subtle screen glow — zero JS, zero new dependencies.

**Architecture:** Single file replacement (`components/bento/AboutCard.tsx`) plus two keyframe additions to `globals.css` and two animation entries in `tailwind.config.ts`. The monitor is a pure HTML/CSS structure; animations are Tailwind utility classes backed by custom keyframes. The component stays a Server Component.

**Tech Stack:** Next.js 14, Tailwind CSS, TypeScript — no new packages.

---

### Task 1: Add keyframes to `globals.css`

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Add the two keyframes after the existing `heroGlow` keyframe**

Open `app/globals.css`. After line 85 (`}`  closing `heroGlow`), add:

```css
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

@keyframes glow-pulse {
  0%, 100% { opacity: 0.04; }
  50% { opacity: 0.09; }
}
```

- [ ] **Step 2: Verify the file parses — run the dev server briefly**

```bash
npm run dev 2>&1 | head -20
```

Expected: no CSS parse errors, server starts on port 3000.

- [ ] **Step 3: Kill the dev server (Ctrl-C), then commit**

```bash
git add app/globals.css
git commit -m "feat: add blink and glow-pulse keyframes for monitor About card"
```

---

### Task 2: Register animations in `tailwind.config.ts`

**Files:**
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Extend the `animation` block**

In `tailwind.config.ts`, replace the existing `animation` block:

```ts
animation: {
  pulse: "pulse-glow 2s ease-in-out infinite",
},
```

with:

```ts
animation: {
  pulse: "pulse-glow 2s ease-in-out infinite",
  blink: "blink 1.2s ease-in-out infinite",
  "glow-pulse": "glow-pulse 4s ease-in-out infinite",
},
```

- [ ] **Step 2: Commit**

```bash
git add tailwind.config.ts
git commit -m "feat: register blink and glow-pulse Tailwind animations"
```

---

### Task 3: Replace `AboutCard.tsx` with the monitor design

**Files:**
- Modify: `components/bento/AboutCard.tsx`

- [ ] **Step 1: Replace the entire file content**

```tsx
import { Card, CardContent } from "@/components/ui/card";

export function AboutCard() {
  return (
    <Card className="bento-hover border-border bg-card h-full">
      <CardContent className="p-6 lg:p-8 flex flex-col items-center gap-5 h-full">

        {/* Card label */}
        <p className="font-mono text-primary text-[0.65rem] uppercase tracking-widest self-start">
          About
        </p>

        {/* Monitor — aria-hidden, decorative */}
        <div className="w-full flex flex-col items-center" aria-hidden="true">

          {/* Screen frame */}
          <div
            className="w-full rounded-t-xl overflow-hidden"
            style={{
              background: "#1a3326",
              border: "2px solid #2a5040",
              padding: "7px",
              boxShadow: "inset 0 0 20px rgba(0,0,0,0.5), 0 8px 32px rgba(0,200,100,0.06)",
            }}
          >
            {/* Screen */}
            <div
              className="relative rounded-md overflow-hidden"
              style={{ background: "#040d08" }}
            >
              {/* Ambient glow overlay */}
              <div
                className="absolute inset-0 rounded-md pointer-events-none animate-[glow-pulse_4s_ease-in-out_infinite]"
                style={{
                  background: "radial-gradient(ellipse at 50% 40%, #22c55e, transparent 70%)",
                }}
              />

              {/* Browser chrome bar */}
              <div
                className="flex items-center gap-2 px-2.5 py-1.5"
                style={{ background: "#0a1a10", borderBottom: "1px solid #1a3326" }}
              >
                {/* Traffic lights */}
                <div className="flex gap-1">
                  <span className="block w-[7px] h-[7px] rounded-full opacity-85" style={{ background: "#ff5f56" }} />
                  <span className="block w-[7px] h-[7px] rounded-full opacity-85" style={{ background: "#ffbd2e" }} />
                  <span className="block w-[7px] h-[7px] rounded-full opacity-85" style={{ background: "#27c93f" }} />
                </div>
                {/* Address bar */}
                <div
                  className="flex-1 flex items-center gap-1 px-2 rounded"
                  style={{ background: "#061009", height: "16px" }}
                >
                  {/* Lock icon */}
                  <span
                    className="block rounded-sm opacity-60"
                    style={{ width: 6, height: 6, border: "1px solid #22c55e" }}
                  />
                  <span className="font-mono text-[7px] text-[#4ade80] opacity-70">
                    rohailbutt.dev
                  </span>
                </div>
              </div>

              {/* Mini site content */}
              <div className="px-4 py-3">
                {/* Mini nav */}
                <div
                  className="flex items-center justify-between mb-3 pb-2"
                  style={{ borderBottom: "1px solid #1a3326" }}
                >
                  <span className="font-mono font-semibold text-[8px] text-[#4ade80]">
                    rohailbutt.dev
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[6.5px] text-[#6ee7b7] opacity-60">Work</span>
                    <span className="text-[6.5px] text-[#6ee7b7] opacity-60">Projects</span>
                    <span
                      className="text-[6px] text-[#22c55e] px-1.5 py-0.5 rounded"
                      style={{ border: "1px solid #22c55e" }}
                    >
                      Hire Me →
                    </span>
                  </div>
                </div>

                {/* Status badge */}
                <p className="font-mono text-[6px] text-[#22c55e] tracking-widest opacity-70 mb-1">
                  ● OPEN TO REMOTE · FULL-TIME
                </p>

                {/* Headline + blinking cursor */}
                <p className="font-bold text-[11px] text-[#d1fae5] leading-snug mb-2">
                  I build systems that handle real money and real{" "}
                  <span className="text-[#4ade80]">decisions.</span>
                  <span
                    className="inline-block rounded-sm ml-0.5 align-middle animate-[blink_1.2s_ease-in-out_infinite]"
                    style={{ width: 5, height: 8, background: "#22c55e" }}
                  />
                </p>

                {/* Bio */}
                <p className="text-[7px] text-[#6ee7b7] leading-relaxed opacity-85 mb-3">
                  Most engineers need a product manager to tell them what to build.
                  I come with the product sense built in.
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {["Fintech", "Distributed Systems", "Production AI", "Based in Lahore"].map((tag) => (
                    <span
                      key={tag}
                      className="text-[5.5px] text-[#22c55e] px-1.5 py-0.5 rounded"
                      style={{ border: "1px solid #1e4a32", background: "#061009" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <span
                  className="inline-block text-[6.5px] font-bold px-2 py-1 rounded"
                  style={{ background: "#22c55e", color: "#022c12" }}
                >
                  Hire Me →
                </span>
              </div>
            </div>
          </div>

          {/* Monitor neck */}
          <div
            style={{
              width: 32,
              height: 16,
              background: "#1a3326",
              borderLeft: "2px solid #2a5040",
              borderRight: "2px solid #2a5040",
            }}
          />

          {/* Monitor base */}
          <div
            className="rounded-md"
            style={{
              width: 120,
              height: 10,
              background: "#1a3326",
              border: "2px solid #2a5040",
              boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
            }}
          />
        </div>

        {/* Accessible caption — visible to screen readers and users */}
        <div className="text-center flex flex-col gap-1">
          <p className="text-foreground text-sm font-semibold">
            Founding Engineer · 6 years
          </p>
          <p className="text-muted-foreground text-xs leading-relaxed">
            Open to senior and founding engineer roles at remote-first companies
            building something worth the effort.
          </p>
        </div>

      </CardContent>
    </Card>
  );
}
```

- [ ] **Step 2: Start dev server and visually verify**

```bash
npm run dev
```

Open `http://localhost:3000`. Confirm:
- Monitor frame renders to the right of the Hero card
- Browser chrome bar visible with traffic lights and address bar
- Mini site content visible inside screen (headline, bio, tags, CTA)
- Cursor blinks at end of headline
- Screen has a subtle green glow
- Monitor neck and base visible below screen
- Caption text ("Founding Engineer · 6 years") below monitor

- [ ] **Step 3: Check responsive — resize to mobile**

Resize browser to < 1024px. Confirm the card stacks below the HeroCard and the monitor fills the card width gracefully.

- [ ] **Step 4: Kill dev server, commit**

```bash
git add components/bento/AboutCard.tsx
git commit -m "feat: replace About card with CSS desktop monitor mockup"
```

---

### Task 4: Push

- [ ] **Step 1: Push to remote**

```bash
git push
```

Expected: branch updates on remote with 3 new commits.
