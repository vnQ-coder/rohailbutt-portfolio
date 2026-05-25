"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const CONFETTI_COLORS = ["#10b981", "#34d399", "#6ee7b7", "#a7f3d0", "#059669"];

function fireConfetti() {
  for (let i = 0; i < 80; i++) {
    const el = document.createElement("div");
    const size = 6 + Math.random() * 6;
    el.style.cssText = `
      position:fixed;top:50%;left:50%;
      width:${size}px;height:${size}px;
      border-radius:${Math.random() > 0.5 ? "50%" : "2px"};
      background:${CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)]};
      pointer-events:none;z-index:9998;
    `;
    document.body.appendChild(el);
    const angle = Math.random() * Math.PI * 2;
    const distance = 100 + Math.random() * 250;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    el.animate(
      [
        { transform: "translate(-50%,-50%) scale(1) rotate(0deg)", opacity: 1 },
        { transform: `translate(calc(-50% + ${tx}px),calc(-50% + ${ty}px)) scale(0) rotate(360deg)`, opacity: 0 },
      ],
      { duration: 700 + Math.random() * 500, easing: "ease-out", fill: "forwards" }
    ).onfinish = () => el.remove();
  }
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function run(action: () => void) {
    setOpen(false);
    setTimeout(action, 100);
  }

  const commands = [
    { label: "Download Resume", action: () => window.open("/resume", "_blank") },
    { label: "Contact Rohail", action: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }) },
    { label: "View GitHub", action: () => window.open("https://github.com/vnQ-coder", "_blank") },
    { label: "View LinkedIn", action: () => window.open("https://linkedin.com/in/rohailbutt29", "_blank") },
    { label: "sudo hire rohail", action: () => { fireConfetti(); setTimeout(() => window.alert("Good choice."), 300); } },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[200]"
            style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }}
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[201] w-[min(560px,90vw)] rounded-xl overflow-hidden border border-border"
            style={{ background: "hsl(160 30% 8%)" }}
          >
            <Command className="bg-transparent">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
                <span className="text-muted-foreground text-base">⌘</span>
                <CommandInput
                  placeholder="Type a command…"
                  className="bg-transparent border-none text-foreground placeholder:text-muted-foreground focus:ring-0 flex-1 text-sm font-sans"
                />
              </div>
              <CommandList className="p-2">
                <CommandEmpty className="py-4 text-center font-mono text-muted-foreground text-xs">
                  No commands found.
                </CommandEmpty>
                {commands.map(({ label, action }) => (
                  <CommandItem
                    key={label}
                    onSelect={() => run(action)}
                    className={`px-4 py-3 rounded-lg cursor-pointer text-sm transition-colors data-[selected=true]:bg-border ${
                      label === "sudo hire rohail"
                        ? "text-primary font-mono"
                        : "text-foreground font-sans"
                    }`}
                  >
                    {label}
                  </CommandItem>
                ))}
              </CommandList>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
