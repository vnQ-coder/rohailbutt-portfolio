import type { KeyDecision } from "@/lib/projects";

export function KeyDecisionCard({ decision }: { decision: KeyDecision }) {
  return (
    <div className="rounded-xl p-5 border-l-[3px] border-primary" style={{ background: "hsl(160 30% 8%)", border: "1px solid hsl(160 25% 14%)", borderLeft: "3px solid hsl(161 69% 39%)" }}>
      <h4 className="font-display font-semibold text-foreground mb-3 text-base">
        {decision.title}
      </h4>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {decision.body}
      </p>
    </div>
  );
}
