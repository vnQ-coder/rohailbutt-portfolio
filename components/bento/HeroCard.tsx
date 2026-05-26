"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const HEADLINE = ["I build systems that", "handle real money", "and real decisions."];

export function HeroCard() {
  const line0 = useRef<HTMLSpanElement>(null);
  const line1 = useRef<HTMLSpanElement>(null);
  const line2 = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    async function animate() {
      const { gsap } = await import("gsap");
      gsap.fromTo(
        [line0.current, line1.current, line2.current],
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1, ease: "power4.out", stagger: 0.1, delay: 0.15 }
      );
    }
    animate();
  }, []);

  return (
    <Card className="col-span-12 lg:col-span-8 border-border bg-card relative overflow-hidden min-h-[360px] group">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 -right-16 w-72 h-72 rounded-full opacity-[0.08] blur-3xl"
        style={{ background: "hsl(161 69% 39%)" }}
      />
      {/* Subtle grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(161 69% 39%) 1px, transparent 1px), linear-gradient(90deg, hsl(161 69% 39%) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <CardContent className="relative z-10 flex flex-col justify-center gap-5 p-8 lg:p-12 h-full">
        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="flex items-center gap-2 w-fit"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-primary">
            <span
              className="h-1.5 w-1.5 rounded-full bg-primary"
              style={{ boxShadow: "0 0 8px hsl(161 69% 39%)", animation: "pulse-glow 2s ease-in-out infinite" }}
            />
            Open to Remote · Full-Time
          </span>
        </motion.div>

        {/* Headline — value prop first, not name */}
        <h1
          className="font-display font-extrabold leading-[0.92] tracking-[-0.03em]"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)" }}
        >
            {HEADLINE.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <span
                ref={i === 0 ? line0 : i === 1 ? line1 : line2}
                className="block"
                style={{
                  opacity: 0,
                  ...(i === HEADLINE.length - 1
                    ? {
                        background: "linear-gradient(120deg, hsl(160 20% 96%) 30%, hsl(161 69% 45%))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }
                    : {}),
                }}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        {/* Name + role — secondary */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="font-mono text-muted-foreground text-xs tracking-widest uppercase"
        >
          Rohail Butt &mdash; Founding Engineer &middot; 6 years
        </motion.p>

        {/* Proof statement */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="max-w-[52ch] text-sm leading-relaxed text-muted-foreground lg:text-base"
        >
          Fintech at{" "}
          <span className="text-foreground font-medium">$5M+ monthly</span>. AI agents in
          production. 3 products shipped from scratch. I own the stack and the outcome.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.4 }}
          className="flex flex-wrap gap-3"
        >
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/85 font-semibold px-6">
            <a href="#contact">Hire Me →</a>
          </Button>
          <Button asChild variant="outline" className="border-border text-foreground hover:border-primary/40 hover:bg-primary/5 px-6">
            <a href="#projects">See the Work ↓</a>
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  );
}
