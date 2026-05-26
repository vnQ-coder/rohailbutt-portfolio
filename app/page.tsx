import { BentoGrid } from "@/components/bento/BentoGrid";
import { HeroCard } from "@/components/bento/HeroCard";
import { AboutCard } from "@/components/bento/AboutCard";
import { StatCard } from "@/components/bento/StatCard";
import { AvailabilityCard } from "@/components/bento/AvailabilityCard";
import { FeaturedProjectCard } from "@/components/bento/FeaturedProjectCard";
import { ProjectCard } from "@/components/bento/ProjectCard";
import { SkillsCard } from "@/components/bento/SkillsCard";
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

      {/* Row 2 — Stats + Availability */}
      <StatCard
        rawValue={5}
        prefix="$"
        suffix="M+"
        label="Fintech · Monthly Volume"
        className="col-span-6 sm:col-span-3"
      />
      <StatCard
        rawValue={10000}
        suffix="+"
        label="Users · 3 Continents"
        displayValue="10K+"
        className="col-span-6 sm:col-span-3"
      />
      <StatCard
        rawValue={99.9}
        suffix="%"
        label="Uptime · Production SLA"
        displayValue="99.9%"
        className="col-span-6 sm:col-span-3"
      />
      <AvailabilityCard />

      {/* Row 3 — Featured project */}
      <FeaturedProjectCard project={featured} />

      {/* Row 4 — Secondary projects */}
      {rest.map((p) => (
        <ProjectCard key={p.slug} project={p} />
      ))}

      {/* Row 5 — Skills + Experience */}
      <SkillsCard />
      <ExperienceCard />

      {/* Row 6 — Contact */}
      <ContactCard />
    </BentoGrid>
  );
}
