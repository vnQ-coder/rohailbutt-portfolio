"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "About", href: "#about", id: "about" },
  { label: "Work", href: "#work", id: "work" },
  { label: "Projects", href: "#projects", id: "projects" },
];

export function Nav() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
      const ids = ["about", "work", "projects"];
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 140) {
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
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-8 py-4 transition-all duration-300"
      style={{
        backdropFilter: scrolled ? "blur(12px)" : "none",
        background: scrolled ? "hsl(160 30% 4% / 0.85)" : "transparent",
        borderBottom: scrolled ? "1px solid hsl(160 25% 14%)" : "1px solid transparent",
      }}
    >
      <Link
        href="/"
        className="font-display font-bold text-foreground tracking-tight text-sm hover:text-primary transition-colors"
        style={{ letterSpacing: "-0.02em" }}
      >
        rohailbutt.dev
      </Link>

      <nav className="hidden md:flex items-center gap-6">
        {NAV_LINKS.map(({ label, href, id }) => {
          const isActive = active === id;
          return (
            <a
              key={href}
              href={href}
              className="text-sm transition-colors flex items-center gap-1.5"
              style={{ color: isActive ? "hsl(161 69% 39%)" : "hsl(160 15% 50%)" }}
            >
              {isActive && (
                <span
                  className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"
                  style={{ boxShadow: "0 0 6px hsl(161 69% 39%)" }}
                />
              )}
              {label}
            </a>
          );
        })}

        <Button
          asChild
          size="sm"
          variant="outline"
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold transition-all"
        >
          <a href="#contact">Hire Me →</a>
        </Button>
      </nav>
    </header>
  );
}
