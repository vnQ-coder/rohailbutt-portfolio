"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "About", href: "/#about", id: "about", section: true },
  { label: "Work", href: "/#work", id: "work", section: true },
  { label: "Projects", href: "/#projects", id: "projects", section: true },
  { label: "Writing", href: "/writing", id: "writing", section: false },
];

export function Nav() {
  const [scrollActive, setScrollActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) return;
    function onScroll() {
      setScrolled(window.scrollY > 20);
      const ids = ["about", "work", "projects"];
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 140) {
          setScrollActive(id);
          return;
        }
      }
      setScrollActive("");
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  function isActive(link: (typeof NAV_LINKS)[number]): boolean {
    if (!link.section) {
      return pathname.startsWith(link.href);
    }
    return isHome && scrollActive === link.id;
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-8 py-4 transition-all duration-300"
      style={{
        backdropFilter: scrolled || !isHome ? "blur(12px)" : "none",
        background:
          scrolled || !isHome ? "hsl(160 30% 4% / 0.85)" : "transparent",
        borderBottom:
          scrolled || !isHome
            ? "1px solid hsl(160 25% 14%)"
            : "1px solid transparent",
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
        {NAV_LINKS.map((link) => {
          const active = isActive(link);
          return (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm transition-colors flex items-center gap-1.5"
              style={{ color: active ? "hsl(161 69% 39%)" : "hsl(160 15% 50%)" }}
            >
              {active && (
                <span
                  className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"
                  style={{ boxShadow: "0 0 6px hsl(161 69% 39%)" }}
                />
              )}
              {link.label}
            </Link>
          );
        })}

        <Button
          asChild
          size="sm"
          variant="outline"
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold transition-all"
        >
          <Link href="/#contact">Hire Me →</Link>
        </Button>
      </nav>
    </header>
  );
}
