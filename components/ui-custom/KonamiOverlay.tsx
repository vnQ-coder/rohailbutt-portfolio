"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useKonamiCode } from "@/hooks/useKonamiCode";

const LINES = [
  "> rohail --version",
  "> Senior Engineer v6.0.0",
  "> AI Systems: ✓ Production",
  "> Uptime: 99.9%",
  "> Status: Available for hire",
  "",
  "> Press any key to exit_",
];

export function KonamiOverlay() {
  const activated = useKonamiCode();
  const [visible, setVisible] = useState(false);
  const [visibleLines, setVisibleLines] = useState<string[]>([]);

  useEffect(() => {
    if (activated) {
      setVisible(true);
      setVisibleLines([]);
      LINES.forEach((line, i) => {
        setTimeout(() => {
          setVisibleLines((prev) => [...prev, line]);
        }, i * 180);
      });
    }
  }, [activated]);

  useEffect(() => {
    if (!visible) return;
    function onKey() {
      setVisible(false);
      setVisibleLines([]);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9990] flex items-center justify-center p-8"
          style={{ background: "#000" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.25) 2px,rgba(0,0,0,0.25) 4px)",
            }}
          />
          <div className="relative z-10 font-mono">
            {visibleLines.map((line, i) => (
              <p
                key={i}
                className="leading-loose"
                style={{
                  color: line === "" ? "transparent" : "#10b981",
                  fontSize: "clamp(0.85rem, 1.8vw, 1.05rem)",
                }}
              >
                {line || " "}
              </p>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
