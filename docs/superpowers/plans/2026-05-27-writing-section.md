# Writing Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `/writing` route with 4 deep-dive posts, a `/writing` listing page, a homepage bento teaser card, and a nav link — all styled consistently with the existing dark-green portfolio aesthetic.

**Architecture:** Post content lives in `lib/posts.ts` as typed TypeScript data (mirrors `lib/projects.ts`). Two new page routes (`app/writing/page.tsx`, `app/writing/[slug]/page.tsx`) follow the exact same Next.js 15 static generation pattern as `app/projects/[slug]/page.tsx`. Two new components (`WritingCard`, `PostNav`) are added under `components/writing/`. Nav and homepage are updated last.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion. No new dependencies.

**Verification:** No test runner is installed. Each task verifies with `npx tsc --noEmit` (type check) and `npm run build` (full build). Both must pass before committing.

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `lib/posts.ts` | Post types + all 4 post data objects |
| Create | `components/writing/WritingCard.tsx` | Homepage bento teaser (3 latest posts) |
| Create | `components/writing/PostNav.tsx` | Prev/next post pagination |
| Create | `app/writing/page.tsx` | `/writing` listing page |
| Create | `app/writing/[slug]/page.tsx` | `/writing/[slug]` individual post page |
| Modify | `components/layout/Nav.tsx` | Add Writing link + pathname-based active state |
| Modify | `app/page.tsx` | Add WritingCard to bento grid |

---

## Task 1: Post types and data (`lib/posts.ts`)

**Files:**
- Create: `lib/posts.ts`

- [ ] **Step 1: Create `lib/posts.ts` with types and all 4 posts**

```ts
export type PostSection = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
  callout?: string;
  code?: { lang: string; content: string };
};

export type Post = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  publishedAt: string;
  excerpt: string;
  sections: PostSection[];
  prev: string | null;
  next: string | null;
};

export const posts: Post[] = [
  {
    slug: "founding-engineer-mindset",
    title: "What it actually means to own the stack",
    subtitle: "The difference between a senior engineer and a founding engineer isn't seniority. It's ownership.",
    category: "Career",
    readTime: "7 min read",
    publishedAt: "2026-05-20",
    excerpt: "Most engineers wait to be told what to build. A founding engineer makes decisions no one asked them to make — and ships before anyone notices the gap.",
    sections: [
      {
        heading: "The Problem",
        paragraphs: [
          "I've worked with a lot of excellent engineers who could not function without a product manager. Not because they lacked skill — they were brilliant. But their mental model was: someone tells me what to build, I build it well. That's a senior engineer. That is not a founding engineer.",
          "A founding engineer operates in a different mode entirely. The job isn't just to execute. It's to notice what needs to exist and make it exist — before anyone formally asks. It's to make the architectural call at 11pm when there's no one to escalate to. It's to own the outcome, not just the code.",
          "I learned this the hard way. My first solo build at a startup with zero prior infrastructure, I kept waiting for someone to hand me a spec. No spec came. The timeline didn't move. Eventually I realized: the spec is mine to write. The database schema is mine to design. The compliance decision is mine to make and own. That shift — from executor to owner — is the whole game.",
        ],
      },
      {
        heading: "What Ownership Actually Looks Like",
        paragraphs: [
          "Ownership is not a personality trait. It's a set of concrete behaviors that compound over time.",
          "It looks like designing the database schema before anyone asks you to, because you know the product well enough to know what the data model needs to be. It looks like writing the ADR (architecture decision record) nobody asked for because you want future-you to understand why the decision was made. It looks like flagging a compliance risk in a Slack message at 9am before it becomes a production incident at 9pm.",
        ],
        bullets: [
          "You make the call when there's ambiguity instead of escalating for permission",
          "You design for failure modes nobody mentioned in the requirements",
          "You know the business logic well enough to push back on a feature that would break a downstream contract",
          "You write the runbook before the on-call rotation starts",
          "You notice the missing monitoring and add it without a ticket",
          "You ask 'what happens when this fails at 3x load?' before it goes to staging",
        ],
      },
      {
        heading: "The Decision That Defines It",
        paragraphs: [
          "The clearest test of whether someone has the founding engineer mindset is this: what do they do when they hit a decision that isn't in their job description?",
          "When I was building the compliance pipeline for Nebula Payments, there was a point where the KYC provider's API returned an ambiguous status code that our spec didn't cover. I could have opened a Jira ticket and waited. Instead, I read the provider's terms of service, called their support line, made a judgment call on how to handle it, documented it, and shipped. The ticket never got opened. The feature shipped on time.",
          "That's not heroics. That's ownership. The gap between 'that's not my job' and 'I'll figure it out' is where founding engineers live.",
        ],
        callout: "The job title says engineer. The actual job is: whatever the product needs that nobody else is doing.",
      },
      {
        heading: "How It Works in Practice",
        paragraphs: [
          "Concretely, a founding engineer mindset means operating across three layers simultaneously: execution, architecture, and product.",
          "At the execution layer you write excellent code, review PRs, fix bugs. That's table stakes. At the architecture layer you make infrastructure decisions, design data schemas, set patterns the team will follow for years. At the product layer you understand why features exist, push back on the wrong ones, and occasionally invent the right ones before anyone asks.",
          "Most engineers only operate at the execution layer. Senior engineers move between execution and architecture. Founding engineers hold all three at once — and know which one needs attention at any given moment.",
        ],
        code: {
          lang: "text",
          content: `Execution layer:  "This function handles the edge case correctly"
Architecture layer: "This service boundary will become a problem at 10x scale"
Product layer:      "This feature will break our compliance posture — here's an alternative"

A founding engineer reads all three signals simultaneously.`,
        },
      },
      {
        heading: "What It Cost Me Not To Do This",
        paragraphs: [
          "Early in my career I missed a production incident that I could have prevented because I noticed a memory leak two weeks earlier, filed a mental note, and didn't act on it. I was waiting for someone to formally prioritize it. Nobody did. At 2am on a Friday it paged the whole team.",
          "That was the last time I waited for formal prioritization on something I could already see was a risk. The cost of 'not my job' is always higher than the cost of just fixing it.",
        ],
      },
      {
        heading: "The Outcome",
        paragraphs: [
          "Six years in, the pattern I've seen is consistent: companies that hire founding engineers ship 2-3x faster than companies that hire executors and hope for product managers to fill the gaps. Not because founding engineers work harder — but because there's no gap to fill. The handoffs are shorter. The decisions are faster. The product sense is baked into the code.",
          "If you're hiring for a senior role and what you actually need is someone who will own the technical side without being managed, that's a founding engineer. The job description might say 'senior full-stack' but the real requirement is someone who treats the product like it's theirs — because for all practical purposes, it is.",
        ],
      },
    ],
    prev: null,
    next: "fca-compliant-payment-rails",
  },
  {
    slug: "fca-compliant-payment-rails",
    title: "Building regulated crypto-fiat infrastructure under Australian law",
    subtitle: "How I built a payment compliance pipeline from zero in 4 months — KYC, AML, three payment rails, and $5M+ monthly in production.",
    category: "FinTech",
    readTime: "9 min read",
    publishedAt: "2026-05-15",
    excerpt: "A crypto startup needed to accept fiat money without getting shut down by regulators. No prior infrastructure, no compliance team, 4 months to production. Here's exactly how I built it.",
    sections: [
      {
        heading: "The Problem",
        paragraphs: [
          "Most crypto startups hit the same wall: they can move crypto natively, but the moment they need to accept fiat — real bank transfers from real customers — they run into a regulatory framework that can shut them down overnight. In Australia, accepting fiat deposits for exchange into digital assets requires navigating AUSTRAC reporting obligations, KYC/AML compliance, and PCI-DSS payment processing requirements. Get any of it wrong and the regulator freezes your accounts.",
          "Nebula Payments had no payment infrastructure whatsoever when I joined. The task was: build the entire compliance pipeline from scratch, integrate three payment rails, pass a PCI compliance audit, and go live within four months. Solo. No prior infrastructure to build on.",
          "This is the kind of problem where the failure mode isn't a bug — it's a regulatory breach. The stakes are different when a missed edge case means a compliance violation, not just a bad user experience.",
        ],
      },
      {
        heading: "Understanding the Regulatory Landscape First",
        paragraphs: [
          "Before writing a single line of code I spent two weeks reading AUSTRAC guidance documents, the Anti-Money Laundering and Counter-Terrorism Financing Act 2006, and PCI-DSS v4.0 requirements. This wasn't optional — building the wrong data model early would mean a rewrite later under time pressure.",
          "The key constraints that shaped every technical decision:",
        ],
        bullets: [
          "KYC verification must occur before any fiat deposit is processed — not after, not concurrently",
          "AML screening must run against OFAC, UN, and Australian sanctions lists on every transaction",
          "Transaction records must be retained for 7 years with tamper-evident audit logs",
          "Suspicious transaction reports (STRs) must be filed with AUSTRAC within defined timeframes",
          "PCI-DSS scope must be minimized — card data must never touch our application servers",
          "Customer funds must be held in a designated trust account, segregated from operational funds",
        ],
      },
      {
        heading: "The Architecture Decision: SQS for Every Payment",
        paragraphs: [
          "The most important decision in the entire system was using AWS SQS as the backbone for all payment processing — not direct API calls.",
          "Direct API calls to payment providers feel simpler. You call the API, you handle the response, you're done. But in a regulated context, 'I tried to call the API and it timed out' is not an acceptable audit trail. You need guaranteed delivery, idempotency, and a clear record of every state transition.",
        ],
        callout: "In fintech, an undelivered message isn't a performance problem — it's a compliance problem. Design for guaranteed delivery from day one.",
      },
      {
        paragraphs: [
          "SQS gives you a durable queue that survives application restarts, network failures, and deployment events. Every payment initiation event hits the queue first. The payment processor service consumes from the queue, processes the transaction, and only acknowledges (deletes) the message after the transaction reaches a terminal state (success or failure). If anything goes wrong mid-processing, the message stays in the queue and gets reprocessed. Dead-letter queues capture anything that fails repeatedly and triggers an alert.",
        ],
        code: {
          lang: "typescript",
          content: `// Payment flow: every transaction goes through the queue
async function initiateDeposit(userId: string, amount: Money): Promise<void> {
  const txId = generateIdempotencyKey(userId, amount, Date.now());

  // Write intent to DB first — so we can reconcile even if queue fails
  await db.transaction.create({
    id: txId, userId, amount, status: 'PENDING_QUEUE'
  });

  // Enqueue — SQS guarantees at-least-once delivery
  await sqs.sendMessage({
    QueueUrl: PAYMENT_QUEUE_URL,
    MessageBody: JSON.stringify({ txId, userId, amount }),
    MessageDeduplicationId: txId,  // FIFO queue: exactly-once semantics
    MessageGroupId: userId,         // per-user ordering
  });
}

// Consumer: only ack after terminal state reached
async function processPaymentMessage(message: SQSMessage): Promise<void> {
  const { txId, userId, amount } = JSON.parse(message.Body);

  try {
    await runAmlScreening(userId);     // throws if sanctioned
    const result = await monoova.initiateNpp(amount);  // throws on failure
    await db.transaction.update(txId, { status: 'COMPLETED', providerRef: result.ref });
    await sqs.deleteMessage(message.ReceiptHandle);    // only now
  } catch (err) {
    await db.transaction.update(txId, { status: 'FAILED', error: err.message });
    // do NOT delete — let SQS retry, then DLQ after maxReceiveCount
    throw err;
  }
}`,
        },
      },
      {
        heading: "KYC Pipeline: Verify Before Everything",
        paragraphs: [
          "KYC (Know Your Customer) verification gates every downstream action. A user cannot initiate a deposit, withdraw funds, or increase their transaction limits until their identity is verified. This is not a UX decision — it's a regulatory requirement.",
          "The KYC flow uses a third-party provider (Onfido) for document verification and liveness detection. The integration pattern matters: we don't call Onfido synchronously in the user's request. We generate a short-lived SDK token, return it to the client, and let the client complete the verification flow directly with Onfido. Onfido then webhooks back to our system with the result. This keeps PII off our application servers during the verification flow itself.",
        ],
        bullets: [
          "User submits ID document + selfie via Onfido's SDK — never touches our servers",
          "Onfido webhooks the verification result to our signed endpoint",
          "We verify the webhook signature before trusting the payload",
          "Verification status stored in our DB — subsequent requests check this first",
          "Risk scoring runs alongside: politically exposed persons (PEP) checks, sanctions screening",
          "Enhanced due diligence triggers automatically for high-risk profiles",
        ],
      },
      {
        heading: "Three Payment Rails, One Interface",
        paragraphs: [
          "We needed to support three payment methods: NPP (New Payments Platform — Australia's real-time payment rail), PayID (a human-readable alias for NPP), and BPAY (bill payment, used for B2B and older demographics). Each has a different API, different webhook payload shapes, and different failure semantics.",
          "The solution was a payment provider abstraction layer. Each rail implements the same interface: `initiatePayment`, `refundPayment`, `handleWebhook`, `reconcile`. The application code never knows which rail is underneath. This made the PCI audit substantially easier — the examiner only needs to review the abstraction layer's security controls, not three separate integration codepaths.",
        ],
        code: {
          lang: "typescript",
          content: `interface PaymentRail {
  initiatePayment(params: PaymentParams): Promise<PaymentResult>;
  refundPayment(ref: string, amount: Money): Promise<RefundResult>;
  handleWebhook(payload: unknown, signature: string): Promise<WebhookEvent>;
  reconcile(from: Date, to: Date): Promise<ReconciliationReport>;
}

// Monoova implements NPP + PayID
class MonoovaRail implements PaymentRail { ... }

// Different provider for BPAY
class BpayRail implements PaymentRail { ... }

// Router selects the right rail based on payment method
class PaymentRouter {
  route(method: PaymentMethod): PaymentRail {
    switch (method) {
      case 'NPP': return this.monoova;
      case 'PAYID': return this.monoova;
      case 'BPAY': return this.bpay;
    }
  }
}`,
        },
      },
      {
        heading: "100% Test Coverage on Payment Paths: Why and How",
        paragraphs: [
          "The CI pipeline enforces 100% Jest coverage on every file in the `payments/` module. Not 95%. Not 'we aim for high coverage.' 100%, enforced as a merge gate. A PR that drops coverage on payment-critical flows cannot merge.",
          "This sounds extreme. It isn't. In a regulated system, an untested code path is a latent compliance liability. If a code path exists, it will be exercised in production. If it isn't tested, you don't know what it does. In fintech, not knowing what your code does is not acceptable.",
        ],
        bullets: [
          "Every payment state transition has a test: PENDING → PROCESSING → COMPLETED, PENDING → FAILED, PROCESSING → TIMEOUT → RETRY",
          "Every webhook payload shape is tested including malformed and spoofed signatures",
          "Every AML screening outcome is tested: clean, flagged, sanctioned, PEP",
          "Reconciliation logic is tested against real Monoova fixture data",
          "Database rollback behavior is tested by injecting failures mid-transaction",
        ],
      },
      {
        heading: "What It Cost Not To Do This (Lessons From Others)",
        paragraphs: [
          "While building this system I studied several public post-mortems from fintech startups that got fined or shut down by AUSTRAC. The pattern was consistent: they built the happy path first, shipped, then tried to bolt compliance on later. By the time they needed to retrofit KYC gating onto an existing transaction flow, the data model was wrong, the audit trail was incomplete, and the cost of fixing it was higher than starting over.",
          "Compliance is not a feature you add. It's a constraint you design around from the start. If your schema doesn't have a `kycVerifiedAt` timestamp on the user table from day one, you will pay for it later — either in a rewrite or in a fine.",
        ],
        callout: "Retrofitting compliance onto a running payment system is one of the most expensive engineering projects a fintech company can undertake. Do it right at the start or pay three times as much later.",
      },
      {
        heading: "The Outcome",
        paragraphs: [
          "The system went live in 4 months. $5M+ in monthly transaction volume in production. PCI-DSS compliant from day one. Zero regulatory findings in the initial AUSTRAC review. 100% test coverage on all payment-critical paths maintained through the entire product lifetime.",
          "The KYC automation reduced merchant onboarding time by 40% — not because we cut corners, but because automated verification at scale is faster than manual review. The compliance pipeline that looked like overhead on day one became a competitive advantage: we could onboard merchants that our competitors couldn't because our compliance posture was stronger.",
        ],
      },
    ],
    prev: "founding-engineer-mindset",
    next: "ai-agents-in-production",
  },
  {
    slug: "ai-agents-in-production",
    title: "Why most AI agents fail in production — and what I built instead",
    subtitle: "The gap between an AI demo and a production agent isn't model quality. It's architecture.",
    category: "AI",
    readTime: "8 min read",
    publishedAt: "2026-05-10",
    excerpt: "Most AI agents are demos dressed up as products. They work on toy inputs, hallucinate on real data, and break the moment context changes. Here's what a production AI agent actually requires.",
    sections: [
      {
        heading: "The Problem With Most AI Agents",
        paragraphs: [
          "There's a pattern I've seen repeatedly in the last two years: a team builds an AI agent that works perfectly in demos, gets shipped to users, and immediately starts producing wrong or useless outputs. The engineering team is confused — it worked in testing. What changed?",
          "What changed is the input. Demo inputs are clean, well-formed, and match the examples the agent was tuned on. Real inputs are messy, ambiguous, and contain context the agent was never shown. The gap isn't the model. The gap is that the agent was never designed to handle real-world variation.",
          "I ran into this exact problem building the AI Project Manager. The initial prototype generated sprint tickets that looked great on canned inputs. The moment we pointed it at a real codebase with real git history and real team communication patterns, the quality dropped off a cliff. The tickets were too generic, referenced nonexistent components, and missed the actual current state of the code.",
        ],
      },
      {
        heading: "Why Generic AI Tools Don't Solve This",
        paragraphs: [
          "The first instinct is to reach for a general-purpose AI assistant and prompt it harder. 'Generate sprint tickets for this project' with a big system prompt. This doesn't work at scale for a few reasons.",
          "First, a general AI assistant has no access to your live codebase. It can only reason about what you paste into the context window. If your codebase changes daily (it does), a static paste is already stale.",
          "Second, generic tools produce generic outputs. A ticket that says 'Implement user authentication' is useless. A ticket that says 'Add JWT refresh token rotation to the `AuthService.refreshToken()` method in `src/auth/auth.service.ts` — currently only invalidates on logout, needs sliding expiry window per the session spec in `docs/auth.md`' is actionable.",
          "The difference between those two tickets is codebase-awareness. You cannot get codebase-aware outputs from a model that has never seen the codebase.",
        ],
        callout: "A production AI agent needs live access to the data it's reasoning about. Static prompts produce static (wrong) outputs.",
      },
      {
        heading: "The Architecture Decision: Tool Use Over Prompting",
        paragraphs: [
          "The key architectural decision was to give the agent tool use — specifically, GitHub API access as a set of callable tools — rather than pre-loading the codebase into the context window.",
          "Pre-loading the codebase sounds like the obvious solution. Dump the whole repo into the context and let the model reason about it. The problems: large repos exceed context windows, the model attends poorly to distant context, and the snapshot goes stale the moment someone pushes a commit.",
          "Tool use solves all three problems. The agent calls `get_file_tree()` to understand structure, `read_file(path)` to inspect specific files, `get_recent_commits(branch, since)` to understand what changed recently. It fetches exactly what it needs, at the moment it needs it, from the live repo.",
        ],
        code: {
          lang: "typescript",
          content: `// The agent has these tools available
const tools: Tool[] = [
  {
    name: "get_file_tree",
    description: "Get the directory tree of the repository",
    parameters: { path: { type: "string", description: "Root path, default '/'" } },
    execute: async ({ path }) => github.getTree(repoOwner, repoName, path),
  },
  {
    name: "read_file",
    description: "Read the contents of a specific file",
    parameters: { path: { type: "string" } },
    execute: async ({ path }) => github.getContent(repoOwner, repoName, path),
  },
  {
    name: "get_recent_commits",
    description: "Get commits to a branch since a given date",
    parameters: { branch: { type: "string" }, since: { type: "string" } },
    execute: async ({ branch, since }) => github.listCommits(repoOwner, repoName, branch, since),
  },
  {
    name: "search_code",
    description: "Search for a symbol or string across the repository",
    parameters: { query: { type: "string" } },
    execute: async ({ query }) => github.searchCode(repoOwner, repoName, query),
  },
];

// Agent loop: let the model decide which tools to call
async function generateTickets(sprintGoal: string): Promise<Ticket[]> {
  const messages = [{ role: "user", content: sprintGoal }];

  while (true) {
    const response = await llm.complete({ messages, tools });
    if (response.stopReason === "end_turn") return parseTickets(response.content);
    if (response.stopReason === "tool_use") {
      const toolResults = await executeTools(response.toolCalls, tools);
      messages.push(...toolResults);
    }
  }
}`,
        },
      },
      {
        heading: "Context Window Strategy",
        paragraphs: [
          "Even with tool use, context window management matters. An agent that calls `read_file` on every file in the repo will exhaust the context window and slow to a crawl. The agent needs to be strategic about what it reads.",
          "The approach: the agent first calls `get_file_tree` to get the overall structure, then `get_recent_commits` to understand what's changed recently. This gives it enough orientation to make targeted reads — it knows to look at `src/payments/` for payment-related tickets rather than reading the entire codebase.",
          "Large context window models (128k+) help significantly here. But even with a large window, structured retrieval is faster and produces better outputs than flooding the context with everything. The model reasons better about a focused, relevant context than a massive undifferentiated dump.",
        ],
      },
      {
        heading: "The RBAC Problem: AI That Respects Access Control",
        paragraphs: [
          "One non-obvious requirement: the AI agent must respect the same role-based access control as the rest of the application. A junior developer should not be able to use the AI to generate tickets that access architecture decisions or infrastructure configs they don't have permission to see.",
          "The solution: the agent's tool calls are scoped to the user's GitHub permissions. The OAuth token used for GitHub API calls is the user's own token — not a service account with admin access. If the user can't read a file directly, the agent can't read it on their behalf.",
        ],
        callout: "Never give an AI agent more permissions than the user it's acting on behalf of. A service account with elevated access is an automatic privilege escalation vulnerability.",
      },
      {
        heading: "What Fails in Production (And How to Handle It)",
        paragraphs: [
          "Three failure modes I hit in production and how I handled each:",
        ],
        bullets: [
          "Model produces malformed JSON for ticket structure — solution: JSON schema validation with a retry loop, max 2 retries before falling back to a simpler structured format",
          "GitHub API rate limits hit during large sprint generations — solution: rate limit detection with exponential backoff, user-facing progress indicator so it doesn't look frozen",
          "Agent goes into a tool-call loop on ambiguous repo structure — solution: max tool call limit per generation (15 calls), graceful degradation to a partial result with a warning",
        ],
      },
      {
        heading: "The Outcome",
        paragraphs: [
          "The agent has been in daily production use by the full engineering team for over six months. It generates contextually accurate sprint tickets that reference actual functions, components, and architectural patterns in the live codebase. The team stopped maintaining a separate Jira backlog — the agent generates the sprint from the codebase state and the team's goals directly.",
          "The key lesson: production AI agents are software engineering problems, not AI problems. The model quality matters less than the architecture around it. Give the agent the right data access, the right tools, and the right failure handling, and the model does its job. Skip any of those and you have a demo, not a product.",
        ],
      },
    ],
    prev: "fca-compliant-payment-rails",
    next: "scaling-to-10k-merchants",
  },
  {
    slug: "scaling-to-10k-merchants",
    title: "How I kept 10,000 merchants at 99.9% SLA during peak load",
    subtitle: "Event-driven architecture, Redis at the right layer, and the infrastructure decisions that made the difference between 99.9% and 97%.",
    category: "Infrastructure",
    readTime: "8 min read",
    publishedAt: "2026-05-05",
    excerpt: "10,000 merchants across 3 continents, inventory sync that couldn't fail during Black Friday peak load. Here's the architecture that held — and the decisions that almost didn't.",
    sections: [
      {
        heading: "The Problem",
        paragraphs: [
          "ShuttlePro synchronizes product inventory between Shopify, WooCommerce, and social commerce platforms for 10,000+ merchants globally. When a merchant sells out of a product on Shopify, that change needs to propagate to their WooCommerce store, their Instagram shop, and their TikTok shop within seconds — not minutes. A propagation delay means overselling. Overselling means refunds, angry customers, and merchant churn.",
          "The system I inherited was a monolith. A single NestJS service handled all sync operations for all merchants. Under normal load it held up. Under peak load — Black Friday, product launches, flash sales — it fell over. Queues backed up. Sync delays stretched from seconds to minutes to hours. Merchants started leaving.",
          "My job was to fix it. Not by adding more servers to the monolith (we tried that — it helped for two weeks). But by rearchitecting the system to scale horizontally under the loads that actually mattered.",
        ],
      },
      {
        heading: "Diagnosing the Bottleneck",
        paragraphs: [
          "Before changing anything, I spent a week with CloudWatch metrics and distributed tracing to understand where the system actually broke down. The assumption was 'the sync service is slow.' The reality was more specific:",
        ],
        bullets: [
          "The sync service was CPU-bound when processing large product catalogs (10,000+ SKU merchants)",
          "The database connection pool was exhausted during peak load — queries were queuing behind each other",
          "All merchants shared a single processing queue — one slow merchant (large catalog) blocked fast merchants",
          "No caching on product catalog reads — the same catalog data was fetched from DB on every sync event",
          "Shopify API rate limits were being hit because all retry logic was synchronous and uncoordinated",
        ],
      },
      {
        paragraphs: [
          "The root cause wasn't 'the system is slow.' It was 'the system has no isolation between merchants.' One merchant's 50,000 SKU catalog was starving 9,999 other merchants of processing capacity.",
        ],
      },
      {
        heading: "The Architecture Decision: Per-Merchant Queue Isolation",
        paragraphs: [
          "The fix that mattered most was moving from a single shared queue to per-merchant queue isolation on AWS SQS. Each merchant gets their own SQS queue. A large catalog sync for one merchant doesn't block any other merchant's queue.",
          "This sounds expensive — 10,000 merchants × 1 queue each = 10,000 queues. SQS charges per request, not per queue. 10,000 queues with low message volume is cheaper than one queue with high message volume hitting throughput limits. We confirmed this with a cost model before committing to the architecture.",
        ],
        code: {
          lang: "typescript",
          content: `// Queue naming convention: deterministic from merchant ID
function getMerchantQueueUrl(merchantId: string): string {
  return \`\${SQS_BASE_URL}/\${process.env.AWS_ACCOUNT_ID}/sync-\${merchantId}\`;
}

// On new merchant signup: provision their queue
async function provisionMerchantQueue(merchantId: string): Promise<void> {
  await sqs.createQueue({
    QueueName: \`sync-\${merchantId}\`,
    Attributes: {
      VisibilityTimeout: "300",          // 5 min — enough for large catalog sync
      MessageRetentionPeriod: "86400",   // 24 hours
      RedrivePolicy: JSON.stringify({
        deadLetterTargetArn: SYNC_DLQ_ARN,
        maxReceiveCount: "3",
      }),
    },
  });
}

// Sync event goes to merchant's own queue
async function enqueueSyncEvent(merchantId: string, event: SyncEvent): Promise<void> {
  const queueUrl = getMerchantQueueUrl(merchantId);
  await sqs.sendMessage({
    QueueUrl: queueUrl,
    MessageBody: JSON.stringify(event),
    MessageDeduplicationId: event.id,
    MessageGroupId: event.resourceType,   // group by resource for ordering
  });
}`,
        },
      },
      {
        heading: "Redis: Caching at the Right Layer",
        paragraphs: [
          "The second biggest win was Redis caching on product catalog reads — but only at the right layer. Early attempts at caching tried to cache entire sync operation results. This was wrong: sync operations are stateful and time-sensitive, caching them produced stale propagations.",
          "The correct layer to cache is the source-of-truth data fetch: the Shopify/WooCommerce product catalog. A merchant's full product catalog changes infrequently (maybe once per minute at peak activity). Fetching it fresh from the API on every sync event is wasteful and hits rate limits fast.",
          "We cache the catalog with a 60-second TTL. Each sync event reads from the cache if fresh, fetches from the API if stale. Under peak load, this reduces Shopify API calls by ~80% — which is the difference between hitting rate limits and not.",
        ],
        callout: "Cache the data that's expensive to fetch and changes slowly. Don't cache the operation results that need to be fresh. Getting this distinction wrong is how you get stale inventory propagations.",
      },
      {
        heading: "EKS Horizontal Scaling: Stateless Services That Scale",
        paragraphs: [
          "The sync service needed to scale horizontally under peak load — 10x traffic on Black Friday vs. normal Tuesdays. This only works if the service is genuinely stateless. Any shared in-memory state (connection pools, worker locks, in-flight job maps) breaks horizontal scaling.",
          "We audited the sync service for statefulness before moving to EKS. Every piece of shared state got moved to Redis or the database. Worker locking moved to Redis distributed locks. Job tracking moved to DynamoDB. After that, scaling from 2 pods to 20 pods took under 90 seconds and required zero code changes.",
        ],
        bullets: [
          "Kubernetes HPA (Horizontal Pod Autoscaler) watches CPU utilization — scales up at 70%, scales down after 10 minutes below 30%",
          "Pre-scaling for known peak events (Black Friday) via a scheduled scaling policy — don't wait for the spike to trigger autoscaling",
          "Pod disruption budgets ensure at least 50% of pods stay running during rolling deployments",
          "Readiness probes verified: a pod isn't added to the load balancer until it has a healthy DB connection and Redis connection",
        ],
      },
      {
        heading: "The 30% Cost Reduction: Spot Instances Done Right",
        paragraphs: [
          "Commerce sync workloads are predictably bursty. Peak during business hours (9am–9pm merchant local time), quiet overnight and weekends. This pattern is ideal for spot instance scheduling.",
          "We run batch reconciliation jobs (end-of-day inventory audits, analytics aggregations, report generation) exclusively on spot instances, scheduled during off-peak hours when spot prices are lowest. Real-time sync remains on on-demand instances — interruption tolerance is zero for customer-facing sync.",
          "The savings: 30% reduction in monthly EC2 costs. The risk: a spot instance can be interrupted with 2 minutes notice. The mitigation: all batch jobs are checkpointed to S3 every 5 minutes and resume from the last checkpoint if interrupted. An interrupted job is a minor delay, not data loss.",
        ],
      },
      {
        heading: "Observability: How You Know It's Working",
        paragraphs: [
          "99.9% SLA is not a target you hit by accident. It's something you instrument, monitor, and defend. We built three layers of observability that made the SLA defensible:",
        ],
        bullets: [
          "Sync latency P50/P95/P99 per merchant — not just aggregate. An aggregate P95 can look healthy while one large merchant is timing out",
          "Queue depth per merchant queue — a rising queue depth is the earliest signal of a processing bottleneck",
          "End-to-end propagation time — from Shopify webhook receipt to WooCommerce update confirmed. This is the metric merchants actually care about",
          "PagerDuty alerts at: queue depth > 1000 messages, P95 latency > 30s, error rate > 0.1%",
          "Weekly SLA report auto-generated from CloudWatch metrics — exact uptime per merchant, breach root cause analysis",
        ],
      },
      {
        heading: "The Outcome",
        paragraphs: [
          "After the rearchitecture: 99.9% SLA maintained through three consecutive Black Fridays. 40% throughput increase at the same infrastructure cost. 35% reduction in P95 latency under peak load. 30% reduction in monthly cloud costs. Zero merchant-reported sync failures in the 6 months following the rollout.",
          "The lesson I'd give to anyone facing a similar scaling problem: your first bottleneck is almost never where you think it is. Measure before you change. The real fix at ShuttlePro wasn't 'make the service faster' — it was 'isolate merchants from each other.' That insight only came from a week of measurement, not a week of coding.",
        ],
      },
    ],
    prev: "ai-agents-in-production",
    next: null,
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAdjacentPosts(slug: string): {
  prev: Post | undefined;
  next: Post | undefined;
} {
  const post = getPost(slug);
  return {
    prev: post?.prev ? getPost(post.prev) : undefined,
    next: post?.next ? getPost(post.next) : undefined,
  };
}
```

- [ ] **Step 2: Verify types compile**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add lib/posts.ts
git commit -m "feat: add post types and 4 writing posts to lib/posts.ts"
```

---

## Task 2: PostNav component (`components/writing/PostNav.tsx`)

**Files:**
- Create: `components/writing/PostNav.tsx`

- [ ] **Step 1: Create `components/writing/PostNav.tsx`**

```tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Post } from "@/lib/posts";

type Props = {
  prev: Post | undefined;
  next: Post | undefined;
};

export function PostNav({ prev, next }: Props) {
  return (
    <div className="mt-12 pt-10 border-t border-border flex flex-col gap-8">
      <div className="flex justify-between gap-4 flex-wrap">
        {prev ? (
          <Link
            href={`/writing/${prev.slug}`}
            className="text-muted-foreground text-sm hover:text-foreground transition-colors flex items-center gap-1.5"
          >
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/writing/${next.slug}`}
            className="text-muted-foreground text-sm hover:text-foreground transition-colors flex items-center gap-1.5"
          >
            {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </div>

      <Button
        asChild
        className="bg-primary text-primary-foreground hover:bg-primary/85 font-semibold w-fit"
      >
        <Link href="/#contact">Working on something like this? Let's talk →</Link>
      </Button>
    </div>
  );
}
```

- [ ] **Step 2: Verify types compile**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/writing/PostNav.tsx
git commit -m "feat: add PostNav component for writing section"
```

---

## Task 3: WritingCard homepage bento component (`components/writing/WritingCard.tsx`)

**Files:**
- Create: `components/writing/WritingCard.tsx`

- [ ] **Step 1: Create `components/writing/WritingCard.tsx`**

```tsx
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { posts } from "@/lib/posts";

export function WritingCard() {
  const latest = posts.slice(0, 3);

  return (
    <Card className="bento-hover border-border bg-card h-full">
      <CardContent className="p-6 lg:p-8 flex flex-col gap-5 h-full">
        <p className="font-mono text-primary text-[0.65rem] uppercase tracking-widest">
          Writing
        </p>

        <div className="flex flex-col gap-4 flex-1">
          {latest.map((post) => (
            <Link
              key={post.slug}
              href={`/writing/${post.slug}`}
              className="group flex flex-col gap-1"
            >
              <div className="flex items-start gap-2">
                <span className="text-primary text-sm mt-0.5 flex-shrink-0">→</span>
                <span className="text-foreground text-sm leading-snug group-hover:text-primary transition-colors">
                  {post.title}
                </span>
              </div>
              <div className="pl-5 flex items-center gap-2">
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
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/writing"
          className="text-sm font-mono text-muted-foreground hover:text-primary transition-colors self-end"
        >
          Read all →
        </Link>
      </CardContent>
    </Card>
  );
}
```

- [ ] **Step 2: Verify types compile**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/writing/WritingCard.tsx
git commit -m "feat: add WritingCard bento component"
```

---

## Task 4: Writing listing page (`app/writing/page.tsx`)

**Files:**
- Create: `app/writing/page.tsx`

- [ ] **Step 1: Create `app/writing/page.tsx`**

```tsx
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
```

- [ ] **Step 2: Verify types compile**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/writing/page.tsx
git commit -m "feat: add /writing listing page"
```

---

## Task 5: Individual post page (`app/writing/[slug]/page.tsx`)

**Files:**
- Create: `app/writing/[slug]/page.tsx`

- [ ] **Step 1: Create `app/writing/[slug]/page.tsx`**

```tsx
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
```

- [ ] **Step 2: Verify types compile**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/writing/[slug]/page.tsx
git commit -m "feat: add /writing/[slug] individual post page"
```

---

## Task 6: Update Nav (`components/layout/Nav.tsx`)

**Files:**
- Modify: `components/layout/Nav.tsx`

The nav currently only uses scroll position for active state. On `/writing` and `/writing/[slug]` there is no scroll-based section to track — active state must come from the current pathname. This requires adding `usePathname` from `next/navigation`.

- [ ] **Step 1: Replace `components/layout/Nav.tsx` entirely**

```tsx
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "About", href: "#about", id: "about", section: true },
  { label: "Work", href: "#work", id: "work", section: true },
  { label: "Projects", href: "#projects", id: "projects", section: true },
  { label: "Writing", href: "/writing", id: "writing", section: false },
];

export function Nav() {
  const [scrollActive, setScrollActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) return;
    function onScroll() {
      setScrolled(window.scrollY > 20);
      const ids = ["about", "work", "projects"];
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 140) {
          setScrollActive(id);
          return;
        }
      }
      setScrollActive("");
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  function isActive(link: (typeof NAV_LINKS)[number]): boolean {
    if (!link.section) {
      return pathname.startsWith(link.href);
    }
    return isHome && scrollActive === link.id;
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-8 py-4 transition-all duration-300"
      style={{
        backdropFilter: scrolled || !isHome ? "blur(12px)" : "none",
        background:
          scrolled || !isHome ? "hsl(160 30% 4% / 0.85)" : "transparent",
        borderBottom:
          scrolled || !isHome
            ? "1px solid hsl(160 25% 14%)"
            : "1px solid transparent",
      }}
    >
      <Link
        href="/"
        className="font-display font-bold text-foreground tracking-tight text-sm hover:text-primary transition-colors"
        style={{ letterSpacing: "-0.02em" }}
      >
        rohailbutt.dev
      </Link>

      <nav className="hidden md:flex items-center gap-6">
        {NAV_LINKS.map((link) => {
          const active = isActive(link);
          return (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm transition-colors flex items-center gap-1.5"
              style={{ color: active ? "hsl(161 69% 39%)" : "hsl(160 15% 50%)" }}
            >
              {active && (
                <span
                  className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"
                  style={{ boxShadow: "0 0 6px hsl(161 69% 39%)" }}
                />
              )}
              {link.label}
            </Link>
          );
        })}

        <Button
          asChild
          size="sm"
          variant="outline"
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold transition-all"
        >
          <a href="/#contact">Hire Me →</a>
        </Button>
      </nav>
    </header>
  );
}
```

- [ ] **Step 2: Verify types compile**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/layout/Nav.tsx
git commit -m "feat: add Writing nav link with pathname-based active state"
```

---

## Task 7: Add WritingCard to homepage (`app/page.tsx`)

**Files:**
- Modify: `app/page.tsx`

The `WritingCard` goes in the bento grid. It sits alongside the `ExperienceCard` in the row that currently has `OwnershipCard` (col-span-8) and `ExperienceCard` (col-span-4). We add `WritingCard` at `col-span-12 lg:col-span-4` and adjust `OwnershipCard` to `col-span-12 lg:col-span-8` — the layout is already this way, so `WritingCard` just extends the row into a third column by stacking below on smaller screens. On large screens it sits alongside Experience.

- [ ] **Step 1: Update `app/page.tsx`**

Replace the full file with:

```tsx
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
```

- [ ] **Step 2: Verify types compile and build passes**

```bash
npx tsc --noEmit && npm run build
```

Expected: no TypeScript errors, build completes successfully.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: add WritingCard to homepage bento grid"
```

---

## Final verification

- [ ] Run dev server and check `/writing` lists all 4 posts
- [ ] Click each post and verify it renders all sections correctly (headings, paragraphs, bullets, callouts, code blocks)
- [ ] Verify nav "Writing" link highlights when on `/writing` and `/writing/[slug]`
- [ ] Verify homepage WritingCard shows 3 posts and "Read all →" links to `/writing`
- [ ] Verify PostNav prev/next links work between posts
- [ ] Run final build: `npm run build`
