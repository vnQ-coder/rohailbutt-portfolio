# About Card — Desktop Monitor Mockup

**Date:** 2026-06-09  
**Status:** Approved

## Overview

Replace the current text-only `AboutCard` with a desktop monitor mockup that renders a miniature version of the portfolio site inside a realistic CSS monitor frame. The card sits in the bento grid at `col-span-12 lg:col-span-4`, to the right of the HeroCard.

## Design

### Monitor Frame
- Dark teal monitor casing (`#1a3326` body, `#2a5040` border) matching the site palette
- Rounded corners (`border-radius: 12px 12px 0 0`) on the screen frame
- Monitor neck (narrow vertical bar) + wide oval base below the screen
- Inset box-shadow to give depth; subtle green glow via `radial-gradient` overlay

### Screen Content
- **Browser chrome bar** at top: macOS-style traffic lights (red/yellow/green dots) + address bar showing `rohailbutt.dev` with a lock icon
- **Mini site nav**: logo text + Work / Projects links + "Hire Me →" button
- **Status badge**: `● OPEN TO REMOTE · FULL-TIME`
- **Hero headline**: "I build systems that handle real money and real decisions." with a blinking cursor at the end
- **Bio excerpt**: one sentence — "Most engineers need a product manager to tell them what to build. I come with the product sense built in."
- **Tag pills**: Fintech, Distributed Systems, Production AI, Based in Lahore
- **CTA button**: green "Hire Me →"

### Caption (below monitor)
Two lines of text beneath the monitor stand:
- Line 1: "Founding Engineer · 6 years" (highlighted color)
- Line 2: "Open to senior and founding roles at remote-first companies building something worth the effort."

### Animations
- **Blinking cursor**: single `@keyframes blink` on a 5×8px green rectangle — `opacity` 0→1 at 1.2s ease-in-out. Zero JS.
- **Screen glow**: `@keyframes glow-pulse` on a `radial-gradient` overlay — opacity 0.04→0.09 at 4s ease-in-out. Purely decorative.
- No other animations. No JavaScript.

### "About" label
Monospace uppercase label (`ABOUT`) retained at top-left of card, matching other bento cards.

### Ambient grid
Subtle CSS grid lines (`background-image: linear-gradient`) at 3% opacity on the card background — matches the aesthetic of other cards.

## Implementation

### File changed
`components/bento/AboutCard.tsx` — full replacement. No new files needed.

### Approach
- Pure Tailwind + inline styles where Tailwind classes don't cover micro-sizing (e.g., 5px font-size inside the mini screen)
- CSS animations via Tailwind's `animate-*` + custom keyframes in `globals.css`, or inline `<style>` scoped to the component via a `<style jsx>` block if Next.js supports it — otherwise add to `globals.css`
- No new dependencies
- Component remains a Server Component (no `'use client'` needed — animations are CSS-only)

### Keyframes to add to `globals.css`
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

### Tailwind config additions
```ts
// tailwind.config.ts — extend animation and keyframes
animation: {
  'blink': 'blink 1.2s ease-in-out infinite',
  'glow-pulse': 'glow-pulse 4s ease-in-out infinite',
}
```

## Constraints
- Lightweight: CSS-only animations, no JS, no new npm packages
- Production-ready: no placeholder content, real bio text, real URL
- Responsive: card already handled by bento grid; monitor scales with card width using `w-full`
- Accessibility: `aria-hidden="true"` on the decorative monitor; real about text remains in the caption below for screen readers
