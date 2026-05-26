import { Card, CardContent } from "@/components/ui/card";

type ProblemCardProps = {
  domain: string;
  problem: string;
  result: string;
  metric: string;
};

export function ProblemCard({ domain, problem, result, metric }: ProblemCardProps) {
  return (
    <Card className="bento-hover border-border bg-card h-full">
      <CardContent className="flex flex-col gap-3 p-6 h-full justify-between">
        <div className="flex flex-col gap-3">
          <span className="font-mono text-primary text-[0.65rem] uppercase tracking-widest">
            {domain}
          </span>
          <p className="text-foreground text-sm leading-relaxed font-medium">
            &ldquo;{problem}&rdquo;
          </p>
        </div>
        <div className="flex flex-col gap-1 border-t border-border/50 pt-3">
          <p className="text-muted-foreground text-xs leading-relaxed">
            {result}
          </p>
          <span
            className="font-display font-bold text-primary mt-1"
            style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", letterSpacing: "-0.02em" }}
          >
            {metric}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
