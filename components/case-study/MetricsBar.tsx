import { Card, CardContent } from "@/components/ui/card";
import type { Metric } from "@/lib/projects";

export function MetricsBar({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
      {metrics.map(({ value, label }) => (
        <Card key={label} className="border-border bg-card">
          <CardContent className="flex flex-col items-center justify-center gap-2 p-5 text-center">
            <div
              className="font-display font-bold text-primary leading-none"
              style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", letterSpacing: "-0.02em" }}
            >
              {value}
            </div>
            <p className="font-mono text-muted-foreground text-[0.65rem] uppercase tracking-widest">
              {label}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
