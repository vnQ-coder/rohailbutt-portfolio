import { Card, CardContent } from "@/components/ui/card";

const SKILLS = [
  { group: "Languages", items: ["TypeScript", "Python", "JavaScript"] },
  { group: "Backend", items: ["NestJS", "Node.js", "GraphQL", "WebSockets"] },
  { group: "Frontend", items: ["Next.js", "React", "Tailwind CSS"] },
  { group: "AI / LLM", items: ["OpenAI API", "LLM APIs", "RAG Pipelines", "Vector DB", "AI Agents"] },
  { group: "Cloud & DevOps", items: ["AWS (EKS · ECS · Lambda · S3)", "Docker", "Kubernetes", "Terraform"] },
  { group: "Databases", items: ["MongoDB", "PostgreSQL", "Redis", "Supabase"] },
  { group: "Integrations", items: ["Stripe", "Fireblocks", "Monoova", "Shopify", "WhatsApp API", "KYC/AML"] },
];

export function SkillsCard() {
  return (
    <Card id="work" className="col-span-12 lg:col-span-8 bento-hover border-border bg-card">
      <CardContent className="p-6 lg:p-8">
        <p className="font-mono text-primary text-[0.65rem] uppercase tracking-widest mb-6">Skills</p>
        <div className="flex flex-col gap-3">
          {SKILLS.map(({ group, items }) => (
            <div key={group} className="grid grid-cols-[9rem_1fr] gap-2 items-baseline">
              <span className="font-mono text-muted-foreground text-[0.65rem] uppercase tracking-wider">
                {group}
              </span>
              <span className="text-foreground text-sm leading-relaxed">
                {items.join(" · ")}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
