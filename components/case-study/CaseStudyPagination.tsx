import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Project } from "@/lib/projects";

type Props = {
  prev: Project | undefined;
  next: Project | undefined;
};

export function CaseStudyPagination({ prev, next }: Props) {
  return (
    <div className="mt-12 pt-10 border-t border-border flex flex-col gap-8">
      <div className="flex justify-between gap-4 flex-wrap">
        {prev ? (
          <Link href={`/projects/${prev.slug}`} className="text-muted-foreground text-sm hover:text-foreground transition-colors flex items-center gap-1.5">
            ← {prev.title}
          </Link>
        ) : <span />}
        {next ? (
          <Link href={`/projects/${next.slug}`} className="text-muted-foreground text-sm hover:text-foreground transition-colors flex items-center gap-1.5">
            {next.title} →
          </Link>
        ) : <span />}
      </div>

      <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/85 font-semibold w-fit">
        <Link href="/#contact">Hire me for something similar →</Link>
      </Button>
    </div>
  );
}
