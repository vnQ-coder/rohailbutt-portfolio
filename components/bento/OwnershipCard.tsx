import { Card, CardContent } from "@/components/ui/card";

const OWNERSHIP = [
  {
    title: "Products End to End",
    body: "From database schema to deployed product. I make architecture decisions without being asked, own the full stack, and ship without hand-holding. Fintech, SaaS, AI — built all three from scratch.",
  },
  {
    title: "AI in Production",
    body: "Not demos. Not wrappers. Real agents with tool use, RAG pipelines, and live data integration. Systems that make decisions and take actions — running in production today.",
  },
  {
    title: "Scale & Compliance",
    body: "Systems that handle money and cannot fail. KYC/AML, PCI, FCA regulations navigated and shipped. 10K+ users, 99.9% SLA, $5M+/month — with the scars to prove it.",
  },
];

export function OwnershipCard() {
  return (
    <Card id="work" className="bento-hover border-border bg-card h-full">
      <CardContent className="p-6 lg:p-8">
        <p className="font-mono text-primary text-[0.65rem] uppercase tracking-widest mb-6">
          What I Own
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {OWNERSHIP.map(({ title, body }) => (
            <div key={title} className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span
                  className="block w-1 h-4 rounded-full flex-shrink-0"
                  style={{ background: "hsl(161 69% 39%)" }}
                />
                <h3 className="text-foreground font-semibold text-sm">{title}</h3>
              </div>
              <p className="text-muted-foreground text-xs leading-relaxed pl-3">{body}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
