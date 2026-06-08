import type { Metadata } from "next";
import "./globals.css";
import { inter, syne, jetbrainsMono } from "@/lib/fonts";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { LenisProvider } from "@/providers/LenisProvider";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui-custom/CustomCursor";
import { CommandPalette } from "@/components/ui-custom/CommandPalette";
import { KonamiOverlay } from "@/components/ui-custom/KonamiOverlay";
import { RainEffect } from "@/components/ui-custom/RainEffect";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Rohail Butt — Senior Full Stack Engineer & AI Solution Architect",
  description:
    "6 years shipping fintech infrastructure, distributed systems, and production AI. Available for remote roles and freelance.",
  metadataBase: new URL("https://rohailbutt.dev"),
  openGraph: {
    title: "Rohail Butt — Senior Full Stack Engineer & AI Solution Architect",
    description:
      "6 years shipping fintech infrastructure, distributed systems, and production AI.",
    url: "https://rohailbutt.dev",
    siteName: "Rohail Butt",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rohail Butt — Senior Full Stack Engineer & AI Solution Architect",
    description:
      "6 years shipping fintech infrastructure, distributed systems, and production AI.",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rohail Butt",
  jobTitle: "Senior Full Stack Engineer & AI Solution Architect",
  url: "https://rohailbutt.dev",
  sameAs: [
    "https://github.com/vnQ-coder",
    "https://linkedin.com/in/rohailbutt29",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${syne.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background text-foreground font-sans">
        <RainEffect />
        <ThemeProvider>
          <LenisProvider>
            <CustomCursor />
            <CommandPalette />
            <KonamiOverlay />
            <Nav />
            <main>{children}</main>
            <Footer />
            <Toaster />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
