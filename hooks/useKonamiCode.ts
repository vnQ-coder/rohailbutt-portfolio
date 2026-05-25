"use client";

import { useEffect, useRef, useState } from "react";

const KONAMI = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a",
];

export function useKonamiCode(): boolean {
  const [activated, setActivated] = useState(false);
  const progress = useRef<number>(0);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === KONAMI[progress.current]) {
        progress.current += 1;
        if (progress.current === KONAMI.length) {
          setActivated(true);
          progress.current = 0;
        }
      } else {
        progress.current = e.key === KONAMI[0] ? 1 : 0;
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return activated;
}
