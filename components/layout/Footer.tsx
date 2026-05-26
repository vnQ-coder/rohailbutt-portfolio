"use client";

import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";

function getPKTTime() {
  return new Date().toLocaleTimeString("en-US", {
    timeZone: "Asia/Karachi",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

export function Footer() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(getPKTTime());
    const id = setInterval(() => setTime(getPKTTime()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="mt-8">
      <Separator className="bg-border" />
      <div className="flex items-center justify-between flex-wrap gap-3 px-6 lg:px-8 py-5">
        <span className="font-mono text-muted-foreground text-[0.7rem]">rohailbutt.dev</span>
        <span className="font-mono text-muted-foreground text-[0.7rem]">PKT {time ?? "--:--:--"}</span>

      </div>
    </footer>
  );
}
