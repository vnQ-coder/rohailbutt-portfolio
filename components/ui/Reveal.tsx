"use client";

import { ReactNode, useEffect, useRef } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
};

/**
 * Scroll-reveal as progressive enhancement. The server HTML is fully
 * visible, so content renders even if JS never loads (slow networks,
 * hard refresh). After hydration, elements still below the viewport are
 * hidden and transitioned in when they scroll into view.
 */
export function Reveal({ children, className = "", delay = 0, id }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;
    // Never hide content the user can already see.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.95) return;

    el.style.transitionDelay = `${delay}s`;
    el.classList.add("reveal-pending");

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("reveal-shown");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <div id={id} ref={ref} className={className}>
      {children}
    </div>
  );
}
