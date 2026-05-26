import { Card, CardContent } from "@/components/ui/card";

const SKILLS = [
  { group: "Backend", items: ["NestJS", "Node.js", "GraphQL", "WebSockets", "REST APIs"] },
  { group: "Frontend", items: ["Next.js", "React", "Tailwind CSS", "TypeScript"] },
  { group: "Cloud & Infra", items: ["AWS (EKS · ECS · Lambda · S3)", "Docker", "Kubernetes", "Terraform"] },
  { group: "AI / LLM", items: ["OpenAI API", "RAG Pipelines", "Vector DB", "AI Agents", "LangChain"] },
  { group: "Databases", items: ["PostgreSQL", "MongoDB", "Redis", "Supabase"] },
  { group: "Fintech", items: ["Stripe", "Fireblocks", "Monoova", "KYC / AML", "Crypto-Fiat"] },
  { group: "Languages", items: ["TypeScript", "Python", "JavaScript"] },
];

export function SkillsCard() {
  return (
    <Card className="col-span-12 lg:col-span-8 bento-hover border-border bg-card">
      <CardContent className="p-6 lg:p-8">
        <p className="font-mono text-primary text-[0.65rem] uppercase tracking-widest mb-6">Stack</p>
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
