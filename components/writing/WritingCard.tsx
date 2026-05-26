import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { posts } from "@/lib/posts";

export function WritingCard() {
  const latest = posts.slice(0, 3);

  return (
    <Card className="bento-hover border-border bg-card h-full">
      <CardContent className="p-6 lg:p-8 flex flex-col gap-5 h-full">
        <p className="font-mono text-primary text-[0.65rem] uppercase tracking-widest">
          Writing
        </p>

        <div className="flex flex-col gap-4 flex-1">
          {latest.map((post) => (
            <Link
              key={post.slug}
              href={`/writing/${post.slug}`}
              className="group flex flex-col gap-1"
            >
              <div className="flex items-start gap-2">
                <span className="text-primary text-sm mt-0.5 flex-shrink-0">→</span>
                <span className="text-foreground text-sm leading-snug group-hover:text-primary transition-colors">
                  {post.title}
                </span>
              </div>
              <div className="pl-5 flex items-center gap-2">
                <span
                  className="font-mono text-[0.6rem] uppercase tracking-widest px-1.5 py-0.5 rounded border"
                  style={{
                    color: "hsl(161 69% 39%)",
                    borderColor: "hsl(161 69% 39% / 0.3)",
                    background: "hsl(161 69% 39% / 0.08)",
                  }}
                >
                  {post.category}
                </span>
                <span className="text-muted-foreground text-xs font-mono">
                  {post.readTime}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/writing"
          className="text-sm font-mono text-muted-foreground hover:text-primary transition-colors self-end"
        >
          Read all →
        </Link>
      </CardContent>
    </Card>
  );
}
