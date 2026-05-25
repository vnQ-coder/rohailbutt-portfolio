import { Card, CardContent } from "@/components/ui/card";

export function AboutCard() {
  return (
    <Card className="col-span-12 lg:col-span-4 bento-hover border-border bg-card">
      <CardContent className="p-6 lg:p-8 flex flex-col gap-4 h-full">
        <p className="font-mono text-primary text-[0.65rem] uppercase tracking-widest">About</p>
        <div className="flex flex-col gap-3">
          <p className="text-foreground text-sm leading-relaxed">
            I&apos;m a Senior Engineer based in Lahore — I architect distributed systems, ship
            production AI agents, and launch complete SaaS products.
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Previously: fintech infrastructure processing $5M+ monthly, event-driven platforms
            serving 10K+ users across 3 continents, and AI systems that reason autonomously over
            codebases.
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            I lead teams and ship solo. Both at the same time if the product demands it.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
