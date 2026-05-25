import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="col-span-12 sm:col-span-6 block group" data-cursor="View Case Study">
      <Card className="bento-hover border-border bg-card h-full">
        <CardContent className="flex flex-col gap-4 p-6 h-full">
          <Badge variant="outline" className="w-fit text-primary border-primary/30 bg-primary/10 font-mono text-[0.65rem]">
            {project.category}
          </Badge>

          <h3
            className="font-display font-bold text-foreground leading-tight"
            style={{ fontSize: "clamp(1.1rem, 2vw, 1.35rem)", letterSpacing: "-0.02em" }}
          >
            {project.title}
          </h3>

          <p className="text-muted-foreground text-sm leading-relaxed flex-1">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.stack.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="outline" className="border-border text-muted-foreground font-mono text-[0.6rem]">
                {tech}
              </Badge>
            ))}
          </div>

          <span className="text-primary font-semibold text-sm group-hover:gap-2 transition-all">
            View Case Study →
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
