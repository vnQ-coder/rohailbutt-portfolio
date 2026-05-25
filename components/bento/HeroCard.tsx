"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
            ? "&nbsp;"
            : `<span style="display:inline-block;overflow:hidden"><span class="char" style="display:inline-block;transform:translateY(110%)">${char}</span></span>`
        )
        .join("");

      gsap.to(el.querySelectorAll(".char"), {
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.025,
        delay: 0.2,
      });
    }
    animateName();
  }, []);

  return (
    <Card className="col-span-12 lg:col-span-8 bento-hover border-border bg-card min-h-[320px]">
      <CardContent className="flex flex-col justify-center gap-6 p-8 lg:p-10 h-full">
        <h1
          ref={nameRef}
          className="font-display font-extrabold leading-none tracking-tight text-foreground"
          style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", letterSpacing: "-0.03em" }}
        >
          ROHAIL BUTT
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-semibold text-primary"
          style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)", letterSpacing: "-0.02em" }}
        >
          I build AI-powered systems that scale.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="text-muted-foreground leading-relaxed max-w-[52ch] text-sm lg:text-base"
        >
          Senior Full Stack Engineer &amp; AI Solution Architect. 6 years shipping fintech
          infrastructure, distributed systems, and production AI.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.4 }}
          className="flex flex-wrap gap-3"
        >
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/85 font-semibold">
            <a href="#contact">Hire Me →</a>
          </Button>
          <Button asChild variant="outline" className="border-border text-foreground hover:border-primary/50">
            <a href="#projects">View Work ↓</a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.4 }}
          className="flex items-center gap-2 font-mono text-primary text-xs"
        >
          <span
            className="w-2 h-2 rounded-full bg-primary animate-pulse"
            style={{ boxShadow: "0 0 8px hsl(161 69% 39%)" }}
          />
          Available for remote &amp; freelance
        </motion.div>
      </CardContent>
    </Card>
  );
}
