import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const EXPERIENCE = [
  { company: "Codeupscale", role: "Senior Engineer / Solution Architect", period: "Nov 2025 → Present" },
  { company: "ShuttlePro", role: "Senior Engineer → Team Lead", period: "May 2021 → Oct 2025" },
  { company: "Kinectro", role: "Consulting Lead (concurrent)", period: "May 2021 → Dec 2023" },
  { company: "CQ Technologies", role: "Software Engineer", period: "Oct 2020 → Apr 2021" },
];

export function ExperienceCard() {
  return (
    <Card className="col-span-12 lg:col-span-4 bento-hover border-border bg-card">
      <CardContent className="p-6 lg:p-8">
        <p className="font-mono text-primary text-[0.65rem] uppercase tracking-widest mb-6">Experience</p>
        <div className="flex flex-col gap-4">
          {EXPERIENCE.map(({ company, role, period }, i) => (
            <div key={company}>
              <div className="flex flex-col gap-0.5">
                <span className="text-foreground font-semibold text-sm">{company}</span>
                <span className="text-muted-foreground text-xs">{role}</span>
                <span className="font-mono text-[0.65rem]" style={{ color: "hsl(161 69% 25%)" }}>{period}</span>
              </div>
              {i < EXPERIENCE.length - 1 && <Separator className="mt-4 bg-border" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
