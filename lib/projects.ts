export type Metric = {
  value: string;
  label: string;
};

export type KeyDecision = {
  title: string;
  body: string;
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  metrics: Metric[];
  problem: string;
  role: string;
  keyDecisions: KeyDecision[];
  stack: string[];
  outcomes: string[];
  github?: string;
  prev: string | null;
  next: string | null;
};

export const projects: Project[] = [
  {
    slug: "nebula-payments",
    title: "Nebula Payments",
    subtitle: "Regulated Crypto-Fiat Exchange Infrastructure",
    category: "FinTech",
    description:
      "Regulated crypto-fiat exchange processing $5M+ monthly via Monoova, Wyre, and Fireblocks — with end-to-end KYC/AML automation and PCI-compliant data handling.",
    metrics: [
      { value: "$5M+", label: "Monthly Volume" },
      { value: "100%", label: "Payment Test Coverage" },
      { value: "40%", label: "Faster Onboarding" },
      { value: "PCI", label: "Compliant Day One" },
    ],
    problem:
      "Build regulated crypto-fiat exchange infrastructure from scratch capable of handling $5M+ monthly under Australian financial regulations, with full KYC/AML compliance, three payment rail integrations, and zero tolerance for defects on payment-critical flows.",
    role:
      "Solo architect and lead engineer. Owned system design, data schema, API contracts, KYC/AML pipeline, payment integrations (Monoova, Wyre, Fireblocks), CI/CD pipeline, and 100% test coverage mandate.",
    keyDecisions: [
      {
        title: "SQS for async transaction processing",
        body: "Financial transactions require guaranteed delivery and decoupled retry logic. SQS queues ensure no transaction is lost under load, payment services can scale independently, and failures surface cleanly without cascading failures across the system.",
      },
      {
        title: "100% Jest coverage on payment flows",
        body: "Any untested payment path is a compliance and financial liability. The mandate was enforced via CI gate — a PR that drops coverage on payment services below 100% cannot merge, period.",
      },
    ],
    stack: ["NestJS", "PostgreSQL", "Redis", "AWS ECS/ECR", "Terraform", "Monoova", "Wyre", "Fireblocks", "Jest", "Supertest"],
    outcomes: [
      "$5M+ monthly transaction volume in production",
      "100% test coverage on all payment-critical flows",
      "40% reduction in merchant onboarding time",
      "PCI-compliant architecture from day one",
      "End-to-end KYC/AML automation — zero manual review for standard cases",
    ],
    prev: null,
    next: "ai-project-manager",
  },
  {
    slug: "ai-project-manager",
    title: "AI Project Manager",
    subtitle: "Jira-Style PM Tool with Autonomous Sprint Agent",
    category: "AI / Productivity",
    description:
      "A Jira-style project management platform with an embedded AI agent that autonomously generates sprint tickets by analysing the linked GitHub codebase and researching project context.",
    metrics: [
      { value: "Solo", label: "End-to-End Build" },
      { value: "Daily", label: "Production Use" },
      { value: "GitHub", label: "Codebase Aware" },
      { value: "Full", label: "RBAC System" },
    ],
    problem:
      "The engineering team needed a PM tool where the AI agent generates contextually accurate sprint tickets from the real codebase — not generic templates. Generic tools could not read live GitHub repos or reason about project structure.",
    role:
      "Solo developer end-to-end. Owned system architecture, MongoDB schema design, RBAC implementation, AI agent orchestration pipeline, CI/CD deployment.",
    keyDecisions: [
      {
        title: "Large context window for codebase reasoning",
        body: "Generating meaningful sprint tickets requires understanding existing code structure, not just project descriptions. A large context window allows passing real file trees and code snippets, producing tickets that reference actual functions, components, and architectural patterns.",
      },
      {
        title: "GitHub API tool use for live repo analysis",
        body: "Tickets generated from stale snapshots become outdated immediately. The agent uses GitHub API calls at generation time to read the current state of the repo — ensuring tickets always reflect what is actually in the codebase.",
      },
    ],
    stack: ["NestJS", "Next.js", "OpenAI API", "LLM APIs", "MongoDB", "GitHub API", "Docker", "GitHub Actions"],
    outcomes: [
      "In daily production use by the full engineering team",
      "AI agent generates contextually accurate sprint tickets from live repo state",
      "Full RBAC system with role-based ticket visibility",
      "Shipped solo from architecture to production deployment",
    ],
    prev: "nebula-payments",
    next: "shuttlepro",
  },
  {
    slug: "shuttlepro",
    title: "ShuttlePro Platform",
    subtitle: "Commerce Synchronization at Global Scale",
    category: "E-Commerce / Infrastructure",
    description:
      "Event-driven microservice platform serving 10,000+ merchant accounts across Shopify, WooCommerce, and social commerce — 99.9% SLA across 3 continents.",
    metrics: [
      { value: "10K+", label: "Global Users" },
      { value: "99.9%", label: "Uptime SLA" },
      { value: "40%", label: "Throughput Gain" },
      { value: "30%", label: "Cloud Cost Cut" },
    ],
    problem:
      "Scale a commerce sync platform to 10,000+ merchant accounts across Shopify, WooCommerce, and social commerce APIs — maintaining sub-100ms P95 latency under peak load globally, while reducing cloud costs and leading a team of 5 engineers across 3 product squads.",
    role:
      "Senior Engineer promoted to Team Lead. Led 5 engineers across 3 squads. Owned AWS infrastructure, Redis caching strategy, event-driven architecture, observability (CloudWatch + PagerDuty), and CI/CD pipeline.",
    keyDecisions: [
      {
        title: "Event-driven NestJS microservices on AWS EKS",
        body: "Horizontal scaling under commerce-peak load requires services that can scale independently. EKS with Redis Pub/Sub and SQS event queues allows the sync, order, and analytics services to scale to exactly the load they are receiving — not in lockstep.",
      },
      {
        title: "Spot-instance scheduling for 30% cost reduction",
        body: "Commerce sync workloads are predictably bursty — peak during business hours, quiet overnight. Spot-instance scheduling shifts non-critical batch workloads to off-peak windows, cutting cloud spend by 30% with zero impact on SLA.",
      },
    ],
    stack: ["NestJS", "AWS EKS", "Redis", "MongoDB", "React.js", "Shopify API", "WooCommerce API", "GitHub Actions", "AWS CodePipeline", "CloudWatch", "PagerDuty"],
    outcomes: [
      "99.9% SLA maintained for 10,000+ users across 3 continents",
      "40% throughput gain and 35% P95 latency reduction under peak load",
      "30% monthly cloud cost reduction via spot-instance scheduling",
      "50% faster release cycles after CI/CD pipeline introduction",
      "Production defect escape rate reduced by 35%",
    ],
    prev: "ai-project-manager",
    next: null,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  prev: Project | undefined;
  next: Project | undefined;
} {
  const project = getProject(slug);
  return {
    prev: project?.prev ? getProject(project.prev) : undefined,
    next: project?.next ? getProject(project.next) : undefined,
  };
}
