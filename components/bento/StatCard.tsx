"use client";

import { useCountUp } from "@/hooks/useCountUp";
import { Card, CardContent } from "@/components/ui/card";

type StatCardProps = {
  rawValue: number;
  suffix?: string;
  prefix?: string;
  label: string;
  displayValue?: string;
  className?: string;
};

export function StatCard({
  rawValue,
  suffix = "",
  prefix = "",
  label,
  displayValue,
  className = "",
}: StatCardProps) {
  const { ref, value } = useCountUp(rawValue, 2000);

  return (
    <Card className={`bento-hover border-border bg-card ${className}`}>
      <CardContent className="flex flex-col items-center justify-center gap-2 p-6 text-center h-full">
        <div
          ref={ref}
          className="font-display font-bold text-primary leading-none"
          style={{
            fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
            letterSpacing: "-0.03em",
          }}
        >
          {displayValue ?? `${prefix}${value.toLocaleString()}${suffix}`}
        </div>
        <p className="font-mono text-muted-foreground text-[0.65rem] uppercase tracking-widest">
          {label}
        </p>
      </CardContent>
    </Card>
  );
}
