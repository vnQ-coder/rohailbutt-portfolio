import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function AvailabilityCard() {
  return (
    <Card className="bento-hover border-border bg-card h-full">
      <CardContent className="flex flex-col justify-between gap-4 p-6 h-full">
        <div>
          <p className="font-mono text-primary text-[0.65rem] uppercase tracking-widest mb-3">
            Status
          </p>
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full bg-primary animate-pulse flex-shrink-0"
              style={{ boxShadow: "0 0 8px hsl(161 69% 39%)" }}
            />
            <span className="text-foreground font-semibold text-sm">Open to Work</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {["Remote", "Full-time", "Contract"].map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-primary border-primary/30 bg-primary/10 font-mono text-[0.65rem]"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <a
          href="mailto:rohailbutt1995@gmail.com"
          className="font-mono text-muted-foreground text-[0.7rem] hover:text-primary transition-colors break-all"
        >
          rohailbutt1995@gmail.com
        </a>
      </CardContent>
    </Card>
  );
}
