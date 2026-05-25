import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/projects";

export function FeaturedProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="col-span-12 block group" data-cursor="View Case Study">
      <Card className="bento-hover border-border bg-card w-full" style={{ background: "linear-gradient(135deg, hsl(160 30% 8%) 0%, hsl(161 69% 39% / 0.05) 100%)" }}>
        <CardContent className="flex flex-col gap-5 p-6 lg:p-10">
          <div className="flex items-center gap-3">
            <span className="font-mono text-primary text-[0.65rem] uppercase tracking-widest">
              Featured Project
            </span>
            <Badge variant="outline" className="text-primary border-primary/30 bg-primary/10 font-mono text-[0.65rem]">
              {project.category}
            </Badge>
          </div>

          <h2
            className="font-display font-bold text-foreground leading-tight"
            style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", letterSpacing: "-0.02em" }}
          >
            {project.title}
          </h2>

          <p className="text-muted-foreground leading-relaxed text-sm lg:text-base max-w-[72ch]">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.stack.slice(0, 6).map((tech) => (
              <Badge key={tech} variant="outline" className="border-border text-muted-foreground font-mono text-[0.65rem]">
                {tech}
              </Badge>
            ))}
          </div>

          <span className="text-primary font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
            View Case Study →
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
