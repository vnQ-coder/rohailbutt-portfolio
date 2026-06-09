import { Card, CardContent } from "@/components/ui/card";

export function AboutCard() {
  return (
    <Card className="bento-hover border-border bg-card h-full">
      <CardContent className="p-6 lg:p-8 flex flex-col items-center gap-5 h-full">

        {/* Card label */}
        <p className="font-mono text-primary text-[0.65rem] uppercase tracking-widest self-start">
          About
        </p>

        {/* Monitor — aria-hidden, decorative */}
        <div className="w-full flex flex-col items-center" aria-hidden="true">

          {/* Screen frame */}
          <div
            className="w-full rounded-t-xl overflow-hidden"
            style={{
              background: "#1a3326",
              border: "2px solid #2a5040",
              padding: "7px",
              boxShadow: "inset 0 0 20px rgba(0,0,0,0.5), 0 8px 32px rgba(0,200,100,0.06)",
            }}
          >
            {/* Screen */}
            <div
              className="relative rounded-md overflow-hidden"
              style={{ background: "#040d08" }}
            >
              {/* Ambient glow overlay */}
              <div
                className="absolute inset-0 rounded-md pointer-events-none animate-[glow-pulse_4s_ease-in-out_infinite]"
                style={{
                  background: "radial-gradient(ellipse at 50% 40%, #22c55e, transparent 70%)",
                }}
              />

              {/* Browser chrome bar */}
              <div
                className="flex items-center gap-2 px-2.5 py-1.5"
                style={{ background: "#0a1a10", borderBottom: "1px solid #1a3326" }}
              >
                {/* Traffic lights */}
                <div className="flex gap-1">
                  <span className="block w-[7px] h-[7px] rounded-full opacity-85" style={{ background: "#ff5f56" }} />
                  <span className="block w-[7px] h-[7px] rounded-full opacity-85" style={{ background: "#ffbd2e" }} />
                  <span className="block w-[7px] h-[7px] rounded-full opacity-85" style={{ background: "#27c93f" }} />
                </div>
                {/* Address bar */}
                <div
                  className="flex-1 flex items-center gap-1 px-2 rounded"
                  style={{ background: "#061009", height: "16px" }}
                >
                  {/* Lock icon */}
                  <span
                    className="block rounded-sm opacity-60"
                    style={{ width: 6, height: 6, border: "1px solid #22c55e" }}
                  />
                  <span className="font-mono text-[7px] text-[#4ade80] opacity-70">
                    rohailbutt.dev
                  </span>
                </div>
              </div>

              {/* Mini site content */}
              <div className="px-4 py-3">
                {/* Mini nav */}
                <div
                  className="flex items-center justify-between mb-3 pb-2"
                  style={{ borderBottom: "1px solid #1a3326" }}
                >
                  <span className="font-mono font-semibold text-[8px] text-[#4ade80]">
                    rohailbutt.dev
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[6.5px] text-[#6ee7b7] opacity-60">Work</span>
                    <span className="text-[6.5px] text-[#6ee7b7] opacity-60">Projects</span>
                    <span
                      className="text-[6px] text-[#22c55e] px-1.5 py-0.5 rounded"
                      style={{ border: "1px solid #22c55e" }}
                    >
                      Hire Me →
                    </span>
                  </div>
                </div>

                {/* Status badge */}
                <p className="font-mono text-[6px] text-[#22c55e] tracking-widest opacity-70 mb-1">
                  ● OPEN TO REMOTE · FULL-TIME
                </p>

                {/* Headline + blinking cursor */}
                <p className="font-bold text-[11px] text-[#d1fae5] leading-snug mb-2">
                  I build systems that handle real money and real{" "}
                  <span className="text-[#4ade80]">decisions.</span>
                  <span
                    className="inline-block rounded-sm ml-0.5 align-middle animate-[blink_1.2s_ease-in-out_infinite]"
                    style={{ width: 5, height: 8, background: "#22c55e" }}
                  />
                </p>

                {/* Bio */}
                <p className="text-[7px] text-[#6ee7b7] leading-relaxed opacity-85 mb-3">
                  Most engineers need a product manager to tell them what to build.
                  I come with the product sense built in.
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {["Fintech", "Distributed Systems", "Production AI", "Based in Lahore"].map((tag) => (
                    <span
                      key={tag}
                      className="text-[5.5px] text-[#22c55e] px-1.5 py-0.5 rounded"
                      style={{ border: "1px solid #1e4a32", background: "#061009" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <span
                  className="inline-block text-[6.5px] font-bold px-2 py-1 rounded"
                  style={{ background: "#22c55e", color: "#022c12" }}
                >
                  Hire Me →
                </span>
              </div>
            </div>
          </div>

          {/* Monitor neck */}
          <div
            style={{
              width: 32,
              height: 16,
              background: "#1a3326",
              borderLeft: "2px solid #2a5040",
              borderRight: "2px solid #2a5040",
            }}
          />

          {/* Monitor base */}
          <div
            className="rounded-md"
            style={{
              width: 120,
              height: 10,
              background: "#1a3326",
              border: "2px solid #2a5040",
              boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
            }}
          />
        </div>

        {/* Accessible caption — visible to screen readers and users */}
        <div className="text-center flex flex-col gap-1">
          <p className="text-foreground text-sm font-semibold">
            Founding Engineer · 6 years · Lahore
          </p>
          <p className="text-muted-foreground text-xs leading-relaxed">
            Open to senior and founding engineer roles at remote-first companies
            building something worth the effort.
          </p>
        </div>

      </CardContent>
    </Card>
  );
}
