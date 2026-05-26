import Link from "next/link";
import { posts } from "@/lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writing — Rohail Butt",
  description:
    "Deep dives on fintech infrastructure, production AI, and what it takes to build systems that scale. Written from real production experience.",
};

export default function WritingPage() {
  return (
    <div className="max-w-[900px] mx-auto px-4 lg:px-8 pb-20 pt-28">
      <div className="mb-12">
        <p className="font-mono text-primary text-[0.65rem] uppercase tracking-widest mb-4">
          Writing
        </p>
        <h1
          className="font-display font-bold text-foreground mb-4"
          style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", letterSpacing: "-0.02em" }}
        >
          Problems I&apos;ve solved.
          <br />
          Written down so you don&apos;t have to.
        </h1>
        <p className="text-muted-foreground max-w-[52ch] leading-relaxed">
          Deep dives on fintech compliance, production AI, distributed systems, and
          the founding engineer mindset. All from real projects, real constraints,
          real outcomes.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/writing/${post.slug}`}
            className="group block border border-border rounded-xl p-6 bg-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(16,185,129,0.12)] hover:border-primary/30"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 flex-wrap">
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
                <span className="text-muted-foreground text-xs font-mono">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>

              <h2
                className="font-display font-semibold text-foreground group-hover:text-primary transition-colors leading-snug"
                style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)" }}
              >
                {post.title}
              </h2>

              <p className="text-muted-foreground text-sm leading-relaxed">
                {post.excerpt}
              </p>

              <span className="text-primary text-sm font-mono">
                Read →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
