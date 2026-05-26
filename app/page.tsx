import { BentoGrid } from "@/components/bento/BentoGrid";
import { HeroCard } from "@/components/bento/HeroCard";
import { AboutCard } from "@/components/bento/AboutCard";
import { ProblemCard } from "@/components/bento/ProblemCard";
import { AvailabilityCard } from "@/components/bento/AvailabilityCard";
import { FeaturedProjectCard } from "@/components/bento/FeaturedProjectCard";
import { ProjectCard } from "@/components/bento/ProjectCard";
import { OwnershipCard } from "@/components/bento/OwnershipCard";
import { ExperienceCard } from "@/components/bento/ExperienceCard";
import { WritingCard } from "@/components/writing/WritingCard";
import { ContactCard } from "@/components/bento/ContactCard";
import { Reveal } from "@/components/ui/Reveal";
import { projects } from "@/lib/projects";

export default function Home() {
  const [featured, ...rest] = projects;

  return (
    <BentoGrid>
      {/* Row 1 — Hero + About */}
      <HeroCard />
      <Reveal id="about" className="col-span-12 lg:col-span-4" delay={0.1}>
        <AboutCard />
      </Reveal>

      {/* Row 2 — Problems Solved + Availability */}
      <Reveal className="col-span-6 sm:col-span-3" delay={0}>
        <ProblemCard
          domain="Fintech"
          problem="A crypto startup needed to accept fiat money without getting shut down by regulators."
          result="Built the compliance pipeline from scratch. FCA-compliant. 4 months to production."
          metric="$5M+ / month"
        />
      </Reveal>
      <Reveal className="col-span-6 sm:col-span-3" delay={0.1}>
        <ProblemCard
          domain="Scale"
          problem="10,000 merchants needed inventory sync that never went down."
          result="Event-driven architecture. Led team of 5. 3 continents."
          metric="99.9% SLA"
        />
      </Reveal>
      <Reveal className="col-span-6 sm:col-span-3" delay={0.2}>
        <ProblemCard
          domain="AI"
          problem="Engineering teams wasting hours on Jira instead of shipping code."
          result="AI agent reads live codebase, generates sprint tickets automatically."
          metric="In production daily"
        />
      </Reveal>
      <Reveal className="col-span-6 sm:col-span-3" delay={0.3}>
        <AvailabilityCard />
      </Reveal>

      {/* Row 3 — Featured project */}
      <Reveal id="projects" className="col-span-12" delay={0}>
        <FeaturedProjectCard project={featured} />
      </Reveal>

      {/* Row 4 — Secondary projects */}
      {rest.map((p, i) => (
        <Reveal key={p.slug} className="col-span-12 sm:col-span-6" delay={i * 0.12}>
          <ProjectCard project={p} />
        </Reveal>
      ))}

      {/* Row 5 — Ownership + Experience + Writing */}
      <Reveal id="work" className="col-span-12 lg:col-span-8" delay={0}>
        <OwnershipCard />
      </Reveal>
      <Reveal className="col-span-12 lg:col-span-4" delay={0.15}>
        <ExperienceCard />
      </Reveal>
      <Reveal className="col-span-12 lg:col-span-4" delay={0.2}>
        <WritingCard />
      </Reveal>

      {/* Row 6 — Contact */}
      <Reveal className="col-span-12" delay={0}>
        <ContactCard />
      </Reveal>
    </BentoGrid>
  );
}
