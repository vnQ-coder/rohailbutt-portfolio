"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const EMAIL = "rohailbutt1995@gmail.com";

export function ContactCard() {
  async function copyEmail() {
    await navigator.clipboard.writeText(EMAIL);
    toast.success("Copied to clipboard", {
      description: EMAIL,
      style: {
        background: "hsl(160 30% 8%)",
        border: "1px solid hsl(160 25% 14%)",
        color: "hsl(160 20% 92%)",
      },
    });
  }

  return (
    <section id="contact">
      <Card className="bento-hover border-border bg-card">
        <CardContent className="flex flex-col items-center text-center gap-6 p-8 lg:p-14">
          <p className="font-mono text-primary text-[0.65rem] uppercase tracking-widest">
            Get in Touch
          </p>

          <h2
            className="font-display font-bold text-foreground"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", letterSpacing: "-0.02em" }}
          >
            Building something that needs to ship and scale?
          </h2>

          <p className="text-muted-foreground max-w-[52ch] leading-relaxed text-sm lg:text-base">
            If you&apos;re a fintech company that needs compliant infrastructure, a startup
            that needs a founding engineer to own the technical side, or a team building AI
            that actually needs to work in production — that&apos;s exactly where I operate.
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            <Button onClick={copyEmail} className="bg-primary text-primary-foreground hover:bg-primary/85 font-semibold">
              Copy Email
            </Button>
            <Button asChild variant="outline" className="border-border text-foreground hover:border-primary/50">
              <a href="https://github.com/vnQ-coder" target="_blank" rel="noopener noreferrer">GitHub</a>
            </Button>
            <Button asChild variant="outline" className="border-border text-foreground hover:border-primary/50">
              <a href="https://linkedin.com/in/rohailbutt29" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </Button>
          </div>

          <button
            onClick={copyEmail}
            className="font-mono text-muted-foreground text-xs hover:text-primary transition-colors underline decoration-dashed underline-offset-4"
          >
            {EMAIL}
          </button>
        </CardContent>
      </Card>
    </section>
  );
}
