import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Rohail Butt — Senior Full Stack Engineer & AI Solution Architect";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#080c0c",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 18,
            color: "#10b981",
            marginBottom: 24,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          rohailbutt.dev
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#e8f0ee",
            lineHeight: 1,
            letterSpacing: "-0.03em",
            marginBottom: 24,
          }}
        >
          ROHAIL BUTT
        </div>
        <div
          style={{
            fontSize: 26,
            color: "#6b8c86",
            lineHeight: 1.5,
            maxWidth: 800,
          }}
        >
          Senior Full Stack Engineer &amp; AI Solution Architect
        </div>
        <div
          style={{
            marginTop: 48,
            display: "flex",
            gap: 20,
            fontSize: 16,
            color: "#10b981",
          }}
        >
          <span>$5M+ Txn Volume</span>
          <span>·</span>
          <span>10K+ Users</span>
          <span>·</span>
          <span>99.9% SLA</span>
          <span>·</span>
          <span>6 Years Production</span>
        </div>
      </div>
    ),
    size
  );
}
