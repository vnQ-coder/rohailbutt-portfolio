import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const EXPERIENCE = [
  { company: "Codeupscale", role: "Senior Engineer / Solution Architect", period: "Nov 2025 → Present", impact: "Architecting AI-powered SaaS products for enterprise clients" },
  { company: "ShuttlePro", role: "Senior Engineer → Team Lead", period: "May 2021 → Oct 2025", impact: "Built commerce sync infra serving 10K+ users · grew to tech lead" },
  { company: "Kinectro", role: "Consulting Lead (concurrent)", period: "May 2021 → Dec 2023", impact: "Led full-stack consulting across fintech and B2B clients" },
  { company: "CQ Technologies", role: "Software Engineer", period: "Oct 2020 → Apr 2021", impact: "Shipped backend features for B2B SaaS product" },
];

export function ExperienceCard() {
  return (
    <Card className="col-span-12 lg:col-span-4 bento-hover border-border bg-card">
      <CardContent className="p-6 lg:p-8">
        <p className="font-mono text-primary text-[0.65rem] uppercase tracking-widest mb-6">Experience</p>
        <div className="flex flex-col gap-4">
          {EXPERIENCE.map(({ company, role, period, impact }, i) => (
            <div key={company}>
              <div className="flex flex-col gap-0.5">
                <span className="text-foreground font-semibold text-sm">{company}</span>
                <span className="text-muted-foreground text-xs">{role}</span>
                <span className="font-mono text-[0.65rem]" style={{ color: "hsl(161 69% 25%)" }}>{period}</span>
                <span className="text-muted-foreground/70 text-xs mt-0.5 leading-relaxed">{impact}</span>
              </div>
              {i < EXPERIENCE.length - 1 && <Separator className="mt-4 bg-border" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
