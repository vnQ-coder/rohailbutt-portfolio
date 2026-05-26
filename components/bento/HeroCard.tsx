"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CHIPS = ["Founding Engineer", "Full Stack · AI · Infra", "Remote · Available"];

export function HeroCard() {
  const firstRef = useRef<HTMLSpanElement>(null);
  const lastRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    async function animate() {
      const { gsap } = await import("gsap");
      gsap.fromTo(
        [firstRef.current, lastRef.current],
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1, ease: "power4.out", stagger: 0.08, delay: 0.15 }
      );
    }
    animate();
  }, []);

  return (
    <Card className="col-span-12 lg:col-span-8 border-border bg-card relative overflow-hidden min-h-[360px] group">
      {/* Ambient glow top-right */}
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

      <CardContent className="relative z-10 flex flex-col justify-center gap-6 p-8 lg:p-12 h-full">
        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="flex items-center gap-2 w-fit"
        >
          <span
            className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-primary"
          >
            <span
              className="h-1.5 w-1.5 rounded-full bg-primary"
              style={{ boxShadow: "0 0 8px hsl(161 69% 39%)", animation: "pulse-glow 2s ease-in-out infinite" }}
            />
            Open to Remote · Full-Time
          </span>
        </motion.div>

        {/* Name — word-level clip reveal */}
        <h1
          className="font-display font-extrabold leading-[0.88] tracking-[-0.04em]"
          style={{ fontSize: "clamp(3.2rem, 6.5vw, 6rem)" }}
        >
          <span className="block overflow-hidden">
            <span ref={firstRef} className="block" style={{ opacity: 0 }}>
              Rohail
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              ref={lastRef}
              className="block"
              style={{
                opacity: 0,
                background: "linear-gradient(120deg, hsl(160 20% 96%) 30%, hsl(161 69% 45%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Butt.
            </span>
          </span>
        </h1>

        {/* Role chips */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.4 }}
          className="flex flex-wrap gap-2"
        >
          {CHIPS.map((chip) => (
            <span
              key={chip}
              className="rounded border border-border bg-secondary/60 px-2.5 py-1 font-mono text-[0.65rem] text-muted-foreground tracking-wide"
            >
              {chip}
            </span>
          ))}
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.95, duration: 0.5 }}
          className="max-w-[50ch] text-sm leading-relaxed text-muted-foreground lg:text-base"
        >
          6 years turning hard problems into shipped products. Fintech infrastructure at{" "}
          <span className="text-foreground font-medium">$5M+ monthly</span>. AI agents in production.
          SaaS platforms at 10K+ users. I own the stack, the architecture, and the outcome.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.4 }}
          className="flex flex-wrap gap-3"
        >
          <Button
            asChild
            className="bg-primary text-primary-foreground hover:bg-primary/85 font-semibold px-6"
          >
            <a href="#contact">Hire Me →</a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-border text-foreground hover:border-primary/40 hover:bg-primary/5 px-6"
          >
            <a href="#projects">View Work ↓</a>
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  );
}
