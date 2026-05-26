import { Card, CardContent } from "@/components/ui/card";

export function AboutCard() {
  return (
    <Card className="col-span-12 lg:col-span-4 bento-hover border-border bg-card">
      <CardContent className="p-6 lg:p-8 flex flex-col gap-4 h-full">
        <p className="font-mono text-primary text-[0.65rem] uppercase tracking-widest">About</p>
        <div className="flex flex-col gap-3">
          <p className="text-foreground text-sm leading-relaxed">
            Most engineers need a product manager to tell them what to build. I come with the
            product sense built in.
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            I&apos;ve been the only engineer on systems that couldn&apos;t afford to fail, and the
            tech lead on teams that needed both direction and working code. Fintech compliance,
            distributed architecture, production AI — shipped all three without a blueprint.
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Based in Lahore. Open to senior and founding engineer roles at remote-first companies
            building something worth the effort.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
