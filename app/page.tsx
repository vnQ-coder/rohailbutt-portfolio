import { BentoGrid } from "@/components/bento/BentoGrid";
import { HeroCard } from "@/components/bento/HeroCard";
import { AboutCard } from "@/components/bento/AboutCard";
import { ProblemCard } from "@/components/bento/ProblemCard";
import { AvailabilityCard } from "@/components/bento/AvailabilityCard";
import { FeaturedProjectCard } from "@/components/bento/FeaturedProjectCard";
import { ProjectCard } from "@/components/bento/ProjectCard";
import { OwnershipCard } from "@/components/bento/OwnershipCard";
import { ExperienceCard } from "@/components/bento/ExperienceCard";
import { ContactCard } from "@/components/bento/ContactCard";
import { projects } from "@/lib/projects";

export default function Home() {
  const [featured, ...rest] = projects;

  return (
    <BentoGrid>
      {/* Row 1 — Hero + About */}
      <HeroCard />
      <AboutCard />

      {/* Row 2 — Problems Solved + Availability */}
      <ProblemCard
        domain="Fintech"
        problem="A crypto startup needed to accept fiat money without getting shut down by regulators."
        result="Built the compliance pipeline from scratch. FCA-compliant. 4 months to production."
        metric="$5M+ / month"
        className="col-span-6 sm:col-span-3"
      />
      <ProblemCard
        domain="Scale"
        problem="10,000 merchants needed inventory sync that never went down."
        result="Event-driven architecture. Led team of 5. 3 continents."
        metric="99.9% SLA"
        className="col-span-6 sm:col-span-3"
      />
      <ProblemCard
        domain="AI"
        problem="Engineering teams wasting hours on Jira instead of shipping code."
        result="AI agent reads live codebase, generates sprint tickets automatically."
        metric="In production daily"
        className="col-span-6 sm:col-span-3"
      />
      <AvailabilityCard />

      {/* Row 3 — Featured project */}
      <FeaturedProjectCard project={featured} />

      {/* Row 4 — Secondary projects */}
      {rest.map((p) => (
        <ProjectCard key={p.slug} project={p} />
      ))}

      {/* Row 5 — Ownership + Experience */}
      <OwnershipCard />
      <ExperienceCard />

      {/* Row 6 — Contact */}
      <ContactCard />
    </BentoGrid>
  );
}
