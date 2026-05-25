import { notFound } from "next/navigation";
import Link from "next/link";
import { getProject, getAdjacentProjects, projects } from "@/lib/projects";
import { CaseStudyHeader } from "@/components/case-study/CaseStudyHeader";
import { MetricsBar } from "@/components/case-study/MetricsBar";
import { KeyDecisionCard } from "@/components/case-study/KeyDecisionCard";
import { CaseStudyPagination } from "@/components/case-study/CaseStudyPagination";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Rohail Butt`,
    description: project.description,
  };
}

const sectionLabel = "font-mono text-primary text-[0.65rem] uppercase tracking-widest block mb-3";

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);

  return (
    <div className="max-w-[900px] mx-auto px-4 lg:px-8 pb-20 pt-28">
      {/* Back */}
      <Link
        href="/#projects"
        className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-sm font-mono mb-12"
      >
        ← Back to Work
      </Link>

      <CaseStudyHeader project={project} />
      <MetricsBar metrics={project.metrics} />

      {/* Problem */}
      <section className="mb-10">
        <span className={sectionLabel}>The Problem</span>
        <p className="text-foreground leading-relaxed">{project.problem}</p>
      </section>

      {/* Role */}
      <section className="mb-10">
        <span className={sectionLabel}>My Role</span>
        <p className="text-foreground leading-relaxed">{project.role}</p>
      </section>

      {/* Key Decisions */}
      <section className="mb-10">
        <span className={sectionLabel}>Key Architectural Decisions</span>
        <div className="flex flex-col gap-4">
          {project.keyDecisions.map((d) => (
            <KeyDecisionCard key={d.title} decision={d} />
          ))}
        </div>
      </section>

      {/* Stack */}
      <section className="mb-10">
        <span className={sectionLabel}>Stack</span>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="border-border text-muted-foreground font-mono text-[0.7rem]"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </section>

      {/* Outcomes */}
      <section className="mb-10">
        <span className={sectionLabel}>Outcome</span>
        <ul className="flex flex-col gap-3">
          {project.outcomes.map((outcome) => (
            <li key={outcome} className="flex items-start gap-3 text-foreground leading-relaxed">
              <span className="text-primary mt-1 flex-shrink-0">→</span>
              {outcome}
            </li>
          ))}
        </ul>
      </section>

      <CaseStudyPagination prev={prev} next={next} />
    </div>
  );
}
