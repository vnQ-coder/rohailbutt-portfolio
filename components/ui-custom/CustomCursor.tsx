"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState(false);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const curX = useRef(0);
  const curY = useRef(0);
  const rafId = useRef<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let hasMoved = false;

    function onMove(e: MouseEvent) {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      if (!hasMoved) {
        hasMoved = true;
        // Appear at the pointer instead of easing in from the corner.
        curX.current = e.clientX;
        curY.current = e.clientY;
        setActive(true);
      }
    }

    function animate() {
      curX.current += (mouseX.current - curX.current) * 0.15;
      curY.current += (mouseY.current - curY.current) * 0.15;
      if (cursor) {
        cursor.style.transform = `translate(${curX.current}px, ${curY.current}px) translate(-50%, -50%)`;
      }
      rafId.current = requestAnimationFrame(animate);
    }

    function onEnterCapture(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const el = target.closest("[data-cursor]");
      if (el) {
        setLabel(el.getAttribute("data-cursor") ?? "");
        setExpanded(true);
      } else if (target.closest("a, button")) {
        setLabel("Open");
        setExpanded(true);
      }
    }

    function onLeaveCapture(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const related = e.relatedTarget as HTMLElement | null;
      const el = target.closest("[data-cursor], a, button");
      if (el && !related?.closest("[data-cursor], a, button")) {
        setLabel("");
        setExpanded(false);
      }
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onEnterCapture, true);
    document.addEventListener("mouseout", onLeaveCapture, true);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnterCapture, true);
      document.removeEventListener("mouseout", onLeaveCapture, true);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Suppress the native cursor only while the custom one is rendering, so
  // users keep a working cursor before hydration or on slow connections.
  useEffect(() => {
    if (!active) return;
    document.documentElement.classList.add("custom-cursor-active");
    return () => document.documentElement.classList.remove("custom-cursor-active");
  }, [active]);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center rounded-full transition-[width,height,background] duration-200"
      style={{
        width: expanded ? 72 : 10,
        height: expanded ? 72 : 10,
        background: expanded ? "transparent" : "hsl(161 69% 39%)",
        border: expanded ? "1.5px solid hsl(161 69% 39%)" : "none",
        willChange: "transform",
        opacity: active ? 1 : 0,
      }}
    >
      {expanded && label && (
        <span className="font-mono text-primary whitespace-nowrap" style={{ fontSize: "0.6rem" }}>
          {label}
        </span>
      )}
    </div>
  );
}
