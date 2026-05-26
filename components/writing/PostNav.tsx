import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Post } from "@/lib/posts";

type Props = {
  prev: Post | undefined;
  next: Post | undefined;
};

export function PostNav({ prev, next }: Props) {
  return (
    <div className="mt-12 pt-10 border-t border-border flex flex-col gap-8">
      <div className="flex justify-between gap-4 flex-wrap">
        {prev ? (
          <Link
            href={`/writing/${prev.slug}`}
            className="text-muted-foreground text-sm hover:text-foreground transition-colors flex items-center gap-1.5"
          >
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/writing/${next.slug}`}
            className="text-muted-foreground text-sm hover:text-foreground transition-colors flex items-center gap-1.5"
          >
            {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </div>

      <Button
        asChild
        className="bg-primary text-primary-foreground hover:bg-primary/85 font-semibold w-fit"
      >
        <Link href="/#contact">Working on something like this? Let's talk →</Link>
      </Button>
    </div>
  );
}
