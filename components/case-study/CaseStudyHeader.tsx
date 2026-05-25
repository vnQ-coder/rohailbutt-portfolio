import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/projects";

export function CaseStudyHeader({ project }: { project: Project }) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <Badge variant="outline" className="text-primary border-primary/30 bg-primary/10 font-mono text-[0.65rem]">
          {project.category}
        </Badge>
      </div>
      <h1
        className="font-display font-extrabold text-foreground mb-4 leading-[1.05]"
        style={{ fontSize: "clamp(2rem, 6vw, 4rem)", letterSpacing: "-0.03em" }}
      >
        {project.title}
      </h1>
      <p className="text-muted-foreground leading-relaxed max-w-[60ch] text-base lg:text-lg">
        {project.subtitle}
      </p>
    </div>
  );
}
