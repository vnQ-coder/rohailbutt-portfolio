import { notFound } from "next/navigation";
import Link from "next/link";
import { getPost, getAdjacentPosts, posts } from "@/lib/posts";
import { PostNav } from "@/components/writing/PostNav";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Rohail Butt`,
    description: post.excerpt,
  };
}

const sectionHeading =
  "font-mono text-primary text-[0.65rem] uppercase tracking-widest block mb-3";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { prev, next } = getAdjacentPosts(slug);

  return (
    <div className="max-w-[900px] mx-auto px-4 lg:px-8 pb-20 pt-28">
      {/* Back */}
      <Link
        href="/writing"
        className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-sm font-mono mb-12"
      >
        ← All Writing
      </Link>

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 flex-wrap mb-4">
          <Badge
            variant="outline"
            className="border-primary/30 font-mono text-[0.6rem] uppercase tracking-widest"
            style={{ color: "hsl(161 69% 39%)", background: "hsl(161 69% 39% / 0.08)" }}
          >
            {post.category}
          </Badge>
          <span className="text-muted-foreground text-xs font-mono">{post.readTime}</span>
          <span className="text-muted-foreground text-xs font-mono">
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

        <h1
          className="font-display font-bold text-foreground mb-4 leading-tight"
          style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", letterSpacing: "-0.02em" }}
        >
          {post.title}
        </h1>
        <p className="text-muted-foreground leading-relaxed max-w-[60ch]">
          {post.subtitle}
        </p>
      </div>

      {/* Sections */}
      <div className="flex flex-col gap-10">
        {post.sections.map((section, i) => (
          <section key={i}>
            {section.heading && (
              <span className={sectionHeading}>{section.heading}</span>
            )}

            {section.paragraphs?.map((p, j) => (
              <p key={j} className="text-foreground leading-relaxed mb-4 last:mb-0">
                {p}
              </p>
            ))}

            {section.bullets && (
              <ul className="flex flex-col gap-2 mt-3">
                {section.bullets.map((bullet, j) => (
                  <li key={j} className="flex items-start gap-3 text-foreground leading-relaxed">
                    <span className="text-primary mt-1 flex-shrink-0">→</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            )}

            {section.callout && (
              <div
                className="mt-4 rounded-lg border px-5 py-4 text-sm leading-relaxed"
                style={{
                  background: "hsl(161 69% 39% / 0.08)",
                  borderColor: "hsl(161 69% 39% / 0.25)",
                  color: "hsl(160 20% 85%)",
                }}
              >
                {section.callout}
              </div>
            )}

            {section.code && (
              <div className="mt-4 rounded-lg border border-border overflow-x-auto">
                <div
                  className="px-4 py-2 border-b border-border"
                  style={{ background: "hsl(160 30% 6%)" }}
                >
                  <span className="font-mono text-muted-foreground text-xs">
                    {section.code.lang}
                  </span>
                </div>
                <pre
                  className="p-5 text-sm leading-relaxed overflow-x-auto"
                  style={{
                    background: "hsl(160 30% 5%)",
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    color: "hsl(160 20% 80%)",
                  }}
                >
                  <code>{section.code.content}</code>
                </pre>
              </div>
            )}
          </section>
        ))}
      </div>

      <PostNav prev={prev} next={next} />
    </div>
  );
}
