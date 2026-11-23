export type Category =
  "All work" | "Agents & MCP" | "Product Engineering" | "Applied AI";
export type Project = {
  slug: string;
  name: string;
  kicker: string;
  description: string;
  category: Category;
  tags: string[];
  repo: string;
  metric: string;
  metricLabel: string;
  color: string;
  problem: string;
  architecture: string[];
  decisions: string[];
  outcomes: string[];
  note: string;
};
export const profile = {
  name: "Chetana Kamraj Patel",
  shortName: "Chetana Patel",
  title: "Software & Applied AI Engineer",
  tagline:
    "8+ years scaling mission-critical financial platforms at Bank of America, now building production AI agents and factory software.",
  location: "Northern Virginia / Washington, D.C.",
  email: "patelkchetana@gmail.com",
  github: "https://github.com/chetsp",
  linkedin: "https://www.linkedin.com/in/cschetanapatel/",
  resume: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/Chetana_Patel_Resume.pdf`,
};
export const categories: Category[] = [
  "All work",
  "Agents & MCP",
  "Product Engineering",
  "Applied AI",
];
export const projects: Project[] = [
  {
    slug: "routemind-ai",
    name: "RouteMind AI",
    kicker: "CONVERSATIONAL LOGISTICS",
    description:
      "Shipment planning with LangGraph, PydanticAI, FastAPI, and Chroma. Validates multi-leg routing constraints and asks for missing parameters before generating a plan.",
    category: "Agents & MCP",
    tags: ["LangGraph", "PydanticAI", "FastAPI", "Chroma", "PostgreSQL"],
    repo: "https://github.com/chetsp/RouteMind-AI",
    metric: "3 legs",
    metricLabel: "constraint-verified routing",
    color: "lime",
    problem:
      "Shipment planners need to compare cost, timing, capacity, and carrier requirements without losing context between follow-up questions. RouteMind explores this workflow with synthetic freight data.",
    architecture: [
      "Shipment request",
      "Typed extraction",
      "LangGraph orchestration",
      "Hybrid evidence retrieval",
      "Deterministic optimizer",
      "Verified plan + citations",
    ],
    decisions: [
      "Keep numerical explanations deterministic and grounded in verified plans rather than model-generated calculations.",
      "Use SQL capability flags as the authority for route eligibility; retrieved documents provide context, not eligibility.",
      "Persist clarification state with a LangGraph SQLite checkpointer. Revisions create linked child requests without overwriting prior plans.",
      "Combine MiniLM semantic retrieval with BM25, with an explicit offline baseline.",
    ],
    outcomes: [
      "Demonstrates routes of up to three scheduled legs with capacity, timing, and handling constraints.",
      "The fixed demo compares a $2,100 route via Phoenix with a $3,400 direct service; a $500 ceiling returns no feasible route.",
      "Includes cited carrier-policy answers, a read-only data explorer, and independently verified what-if options.",
    ],
    note: "Uses synthetic carriers, schedules, and prices. Supports planning and comparison; does not book shipments or return live freight quotes.",
  },
  {
    slug: "gita-guru",
    name: "Gita Guru",
    kicker: "APPLIED AI · ACCESSIBLE LEARNING",
    description:
      "A multilingual learning web app using Claude and JavaScript for explanations across 26+ languages, with browser-native audio narration through the Web Speech API.",
    category: "Applied AI",
    tags: ["JavaScript", "Claude", "Web Speech API", "HTML / CSS"],
    repo: "https://github.com/chetsp/Gita-Guru",
    metric: "26+",
    metricLabel: "learning languages",
    color: "violet",
    problem:
      "Make a complex text approachable for learners of different ages and languages through conversational explanations and interactive storytelling.",
    architecture: [
      "Chapter + verse selection",
      "Claude explanations",
      "Translated story panels",
      "Web Speech narration",
      "Session progress",
    ],
    decisions: [
      "Use browser-native speech synthesis for language-aware audio playback.",
      "Keep the interface lightweight with vanilla HTML, CSS, and JavaScript.",
      "Use sessionStorage for in-session progress, streaks, XP, and badges.",
    ],
    outcomes: [
      "Supports 18 chapters and explanations in 26+ languages.",
      "Includes four-panel stories, narration controls, and an animated SVG character.",
      "Uses Claude to generate verse explanations, story analogies, and learning activities.",
    ],
    note: "The browser uses speech synthesis for narration and sessionStorage for progress. Public hosting requires a server-side proxy for provider credentials.",
  },
  {
    slug: "ai-modernization",
    name: "Survey Application Modernization",
    kicker: "INTERFACE MODERNIZATION",
    description:
      "Converted a static Figma design system into a full-CRUD application using React, TypeScript, Tailwind, and FastAPI, including form validation and persistent storage.",
    category: "Product Engineering",
    tags: ["React", "TypeScript", "Tailwind", "FastAPI", "SQLite"],
    repo: "https://github.com/chetsp/AI-Modernization",
    metric: "Full CRUD",
    metricLabel: "from static design to live data",
    color: "amber",
    problem:
      "The static Figma export needed form state, validation, routing, and persistent CRUD endpoints before students could submit and manage surveys.",
    architecture: [
      "Figma Make design",
      "React + Tailwind",
      "Form validation",
      "FastAPI endpoints",
      "SQLModel + SQLite",
    ],
    decisions: [
      "Refine generated React components with controlled form state and native input behavior.",
      "Wire the interface to real CRUD endpoints rather than leaving static mock data.",
      "Keep brand tokens centralized and use client routing for distinct user journeys.",
    ],
    outcomes: [
      "Connects student survey submission, listing, and deletion to a persistent backend.",
      "Includes client-side routes for the homepage, department information, and student survey.",
      "Replaces static form elements with controlled inputs, validation, and API-backed submission management.",
    ],
    note: "University project covering design-system implementation, client-side validation, routing, and CRUD integration.",
  },
];
export const experience = [
  {
    id: "tesla",
    company: "Tesla",
    role: "Software Engineering Intern",
    team: "Factory Software Team",
    date: "Summer 2026",
    location: "Fremont, CA",
    summary:
      "Manufacturing infrastructure and Carrier Rate Creation workflows.",
    bullets: [
      "Built manufacturing infrastructure workflows, connecting factory software requirements with operational processes.",
      "Designed a conversational AI assistant for Carrier Rate Creation, with structured validation of required inputs before changes could proceed.",
      "Included human-in-the-loop safeguards so users could review proposed actions and resolve incomplete requests.",
    ],
    logo: "tesla",
  },
  {
    id: "george-mason",
    company: "George Mason University",
    role: "M.S. in Computer Science",
    team: "Machine Learning Concentration",
    date: "2026",
    location: "Virginia",
    summary:
      "Graduate coursework and research focus in machine learning, distributed systems, and agentic AI workflows.",
    bullets: [
      "Study machine learning methods and distributed systems, with a focus on applying them to reliable agentic workflows.",
      "Explore Model Context Protocol, retrieval, and tool integration in applied AI systems.",
      "As a Graduate Teaching Assistant, mentor 40+ students in graph algorithms, probability, complexity analysis, and structured problem-solving.",
    ],
    logo: "george-mason",
  },
  {
    id: "bank-of-america-senior",
    company: "Bank of America",
    role: "Senior Software Engineer",
    team: "Asset Valuation & Data Platforms",
    date: "2022 — 2025",
    location: "Margin Call Processing & Asset Valuation Platform",
    summary:
      "Built backend processing and event-driven services for financial calculations and margin workflows.",
    bullets: [
      "Automated 55M+ daily calculations through a distributed processing framework on Linux clusters. Caching and concurrency reduced latency by two-thirds.",
      "Built a distributed task scheduler with Go workers and Python orchestration and monitoring, delivering 52% higher task throughput and fault-tolerant execution across services.",
      "Replaced legacy messaging with Kafka event streams and REST APIs, improving performance by 85% and generating $800K annual infrastructure savings.",
      "Redesigned Margin Call Processing with event-driven microservices handling 10M+ financial contract calculations per day, delivering margin calls 6 hours sooner and removing 10 hours of daily manual review.",
      "Integrated Docker-based CI/CD with AWS and GCP deployments, accelerating releases by 40% and reducing manual intervention by 50%.",
    ],
    logo: "bank-of-america",
  },
  {
    id: "bank-of-america-engineer",
    company: "Bank of America",
    role: "Software Engineer",
    team: "Backend Services & Developer Infrastructure",
    date: "2017 — 2022",
    location: "Backend engineering",
    summary:
      "Developed concurrent processing, API testing, and production monitoring tools.",
    bullets: [
      "Built a concurrent Python interpreter processing 1M+ call logs in under 10 seconds, reducing manual effort by 72%.",
      "Developed a multiprocessing API load-testing framework for 3,000+ calls, saving approximately 450 engineering hours.",
      "Built Java and Grafana monitoring dashboards to track transactions and system health, reducing downtime by 70%.",
    ],
    logo: "bank-of-america",
  },
];
export type CapabilityId = "agents" | "systems" | "product" | "cloud";
export type ToolProof = {
  kind: string;
  title: string;
  detail: string;
  href: string;
  linkLabel: string;
};
export type Tool = {
  id: string;
  name: string;
  pillar: CapabilityId;
  logo?: string;
  symbol?: "retrieval" | "checks" | "schedule" | "database";
  badge: string;
  summary: string;
  proof: ToolProof[];
};
export type Capability = {
  id: CapabilityId;
  title: string;
  label: string;
  description: string;
  diagram: CapabilityId;
  toolIds: string[];
};
export const tools: Tool[] = [
  {
    id: "codex",
    name: "Codex",
    pillar: "agents",
    logo: "codex",
    badge: "Developer tooling",
    summary: "AI-assisted software development and code review.",
    proof: [],
  },
  {
    id: "gemini",
    name: "Gemini",
    pillar: "agents",
    badge: "Agent Stack",
    summary: "Typed language extraction for shipment requirements.",
    proof: [
      {
        kind: "Case study",
        title: "RouteMind AI",
        detail:
          "Optional Gemini provider for PydanticAI extraction; route feasibility is checked separately by the deterministic optimizer.",
        href: "/work/routemind-ai",
        linkLabel: "Read architecture",
      },
    ],
    logo: "googlegemini",
  },
  {
    id: "claude",
    name: "Claude",
    pillar: "agents",
    badge: "Project · Gita Guru",
    summary: "Multilingual explanations and learning activities.",
    proof: [
      {
        kind: "Case study",
        title: "Gita Guru",
        detail:
          "Claude generates verse explanations, analogies, and story panels for a multilingual learning interface.",
        href: "/work/gita-guru",
        linkLabel: "Read case study",
      },
    ],
    logo: "claude",
  },
  {
    id: "langgraph",
    name: "LangGraph",
    pillar: "agents",
    badge: "Agent Stack",
    summary: "Persistent orchestration across clarification and planning.",
    proof: [
      {
        kind: "Case study",
        title: "RouteMind AI",
        detail:
          "Graph orchestration and a SQLite checkpointer preserve request state. Revisions create linked requests rather than overwriting earlier plans.",
        href: "/work/routemind-ai",
        linkLabel: "Read architecture",
      },
    ],
    logo: "langgraph",
  },
  {
    id: "pydanticai",
    name: "PydanticAI",
    pillar: "agents",
    badge: "Agent Stack",
    summary: "Typed extraction with validated model outputs.",
    proof: [
      {
        kind: "Case study",
        title: "RouteMind AI",
        detail:
          "A typed extraction contract translates language into shipment constraints before deterministic optimization.",
        href: "/work/routemind-ai",
        linkLabel: "Read architecture",
      },
    ],
    logo: "pydantic",
  },
  {
    id: "mcp",
    name: "MCP",
    pillar: "agents",
    badge: "Tesla",
    summary: "Tool boundaries for enterprise integrations.",
    proof: [
      {
        kind: "Experience",
        title: "Tesla · Factory Software Team",
        detail:
          "Logistics AI integration connected agents to enterprise APIs, SQL data, and tools through MCP, with validation and human review for operational actions.",
        href: "#tesla",
        linkLabel: "View Tesla experience",
      },
    ],
    logo: "modelcontextprotocol",
  },
  {
    id: "adk",
    name: "Google ADK",
    pillar: "agents",
    badge: "Exploration",
    summary: "Evaluating Google ADK for tool-based agent orchestration.",
    proof: [
      {
        kind: "Exploration",
        title: "Agent orchestration research",
        detail:
          "Current exploration focus. RouteMind uses LangGraph and PydanticAI; it is a related architecture reference, not an ADK implementation.",
        href: "/work/routemind-ai",
        linkLabel: "Related architecture",
      },
    ],
    logo: "google",
  },
  {
    id: "rag",
    name: "RAG",
    pillar: "agents",
    badge: "Agent Stack",
    summary: "Retrieve carrier evidence before explaining a plan.",
    proof: [
      {
        kind: "Case study",
        title: "RouteMind AI",
        detail:
          "Chroma semantic retrieval and BM25 rank carrier-document evidence; answers cite retrieved passages.",
        href: "/work/routemind-ai",
        linkLabel: "Read architecture",
      },
    ],
    symbol: "retrieval",
  },
  {
    id: "evals",
    name: "Evals",
    pillar: "agents",
    badge: "Agent Stack",
    summary: "Check extraction, retrieval, and constraint behavior.",
    proof: [
      {
        kind: "Case study",
        title: "RouteMind AI",
        detail:
          "Quality and behavior evaluations cover planning constraints, parser behavior, and evidence retrieval in the demo.",
        href: "/work/routemind-ai",
        linkLabel: "Read architecture",
      },
    ],
    symbol: "checks",
  },
  {
    id: "python",
    name: "Python",
    pillar: "systems",
    badge: "Production · BofA",
    summary: "Distributed orchestration, processing, and API services.",
    proof: [
      {
        kind: "Experience",
        title: "Bank of America · Senior Software Engineer",
        detail:
          "Python orchestration and a Linux processing framework supported 55M+ daily financial calculations.",
        href: "#bank-of-america-senior",
        linkLabel: "View experience",
      },
      {
        kind: "Case study",
        title: "RouteMind AI",
        detail:
          "FastAPI services, typed request handling, and the routing optimizer are implemented in Python.",
        href: "/work/routemind-ai",
        linkLabel: "Read architecture",
      },
    ],
    logo: "python",
  },
  {
    id: "go",
    name: "Go",
    pillar: "systems",
    badge: "Production · BofA",
    summary: "Concurrent workers for distributed task execution.",
    proof: [
      {
        kind: "Experience",
        title: "Bank of America · Senior Software Engineer",
        detail:
          "Go workers paired with Python orchestration improved task throughput by approximately 52%.",
        href: "#bank-of-america-senior",
        linkLabel: "View experience",
      },
    ],
    logo: "go",
  },
  {
    id: "java",
    name: "Java",
    pillar: "systems",
    badge: "Production · BofA",
    summary: "Transaction monitoring and backend engineering.",
    proof: [
      {
        kind: "Experience",
        title: "Bank of America · Software Engineer",
        detail:
          "Java and Grafana dashboards tracked transactions and system health to support earlier problem detection.",
        href: "#bank-of-america-engineer",
        linkLabel: "View experience",
      },
    ],
    logo: "java",
  },
  {
    id: "kafka",
    name: "Kafka",
    pillar: "systems",
    badge: "Production · BofA",
    summary: "Event streams for financial calculation workflows.",
    proof: [
      {
        kind: "Experience",
        title: "Bank of America · Senior Software Engineer",
        detail:
          "Kafka event streams and REST APIs replaced legacy messaging, improving performance by 85% and saving $800K annually.",
        href: "#bank-of-america-senior",
        linkLabel: "View experience",
      },
    ],
    logo: "apachekafka",
  },
  {
    id: "scheduling",
    name: "Distributed Scheduling",
    pillar: "systems",
    badge: "Production · BofA",
    summary: "Queue work, coordinate workers, and handle failures.",
    proof: [
      {
        kind: "Experience",
        title: "Bank of America · Senior Software Engineer",
        detail:
          "A distributed scheduler coordinated Go workers through Python orchestration and monitoring for fault-tolerant task execution.",
        href: "#bank-of-america-senior",
        linkLabel: "View experience",
      },
    ],
    symbol: "schedule",
  },
  {
    id: "cplusplus",
    name: "C/C++",
    pillar: "systems",
    badge: "Engineering toolkit",
    summary: "Systems programming and concurrency foundations.",
    proof: [
      {
        kind: "Experience",
        title: "Engineering foundations",
        detail:
          "C/C++ is part of the technical toolkit; see the experience section for the distributed processing work built primarily with Python and Go.",
        href: "#bank-of-america-engineer",
        linkLabel: "Engineering background",
      },
    ],
    logo: "cplusplus",
  },
  {
    id: "typescript",
    name: "TypeScript",
    pillar: "product",
    badge: "Product Engineering",
    summary: "Typed interfaces and component contracts.",
    proof: [
      {
        kind: "Case study",
        title: "Survey Application Modernization",
        detail:
          "TypeScript connects the React interface, routes, form state, and API calls.",
        href: "/work/ai-modernization",
        linkLabel: "Read case study",
      },
      {
        kind: "Portfolio",
        title: "This portfolio",
        detail:
          "The App Router, portfolio data model, and components use strict TypeScript.",
        href: "#home",
        linkLabel: "View portfolio",
      },
    ],
    logo: "typescript",
  },
  {
    id: "react",
    name: "React",
    pillar: "product",
    badge: "Product Engineering",
    summary: "Interactive form flows and reusable UI components.",
    proof: [
      {
        kind: "Case study",
        title: "Survey Application Modernization",
        detail:
          "Controlled inputs, live validation, and API-backed survey management turn the static design into a usable interface.",
        href: "/work/ai-modernization",
        linkLabel: "Read case study",
      },
    ],
    logo: "react",
  },
  {
    id: "nextjs",
    name: "Next.js",
    pillar: "product",
    badge: "Portfolio",
    summary: "App Router pages, metadata, and static case studies.",
    proof: [
      {
        kind: "Portfolio",
        title: "This portfolio",
        detail:
          "Static GitHub Pages export serves the site and generated case studies. A server deployment also supports the chat API.",
        href: "#home",
        linkLabel: "View portfolio",
      },
    ],
    logo: "nextdotjs",
  },
  {
    id: "fastapi",
    name: "FastAPI",
    pillar: "product",
    badge: "Agent Stack",
    summary: "Validated REST services for application workflows.",
    proof: [
      {
        kind: "Case study",
        title: "RouteMind AI",
        detail:
          "FastAPI exposes shipment planning, request revision, and readiness endpoints.",
        href: "/work/routemind-ai",
        linkLabel: "Read architecture",
      },
      {
        kind: "Case study",
        title: "Survey Application Modernization",
        detail:
          "FastAPI and SQLModel provide persistent CRUD endpoints for the React application.",
        href: "/work/ai-modernization",
        linkLabel: "Read case study",
      },
    ],
    logo: "fastapi",
  },
  {
    id: "nodejs",
    name: "Node.js",
    pillar: "product",
    badge: "Portfolio",
    summary: "Next.js runtime and application tooling.",
    proof: [
      {
        kind: "Portfolio",
        title: "This portfolio",
        detail:
          "Node.js runs the build toolchain and the optional Next.js server-side assistant route.",
        href: "#home",
        linkLabel: "View portfolio",
      },
    ],
    logo: "nodedotjs",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    pillar: "product",
    badge: "Product Engineering",
    summary: "Shared styling and responsive interface implementation.",
    proof: [
      {
        kind: "Case study",
        title: "Survey Application Modernization",
        detail:
          "Tailwind supports the React implementation of the university design system.",
        href: "/work/ai-modernization",
        linkLabel: "Read case study",
      },
    ],
    logo: "tailwindcss",
  },
  {
    id: "spring",
    name: "Spring Boot",
    pillar: "product",
    badge: "Study & comparison",
    summary: "Comparing backend implementation patterns.",
    proof: [
      {
        kind: "Exploration",
        title: "Backend framework comparison",
        detail:
          "Spring Boot is part of the broader study toolkit. The linked modernization project implements its backend in FastAPI, not Spring Boot.",
        href: "/work/ai-modernization",
        linkLabel: "Related REST architecture",
      },
    ],
    logo: "spring",
  },
  {
    id: "aws",
    name: "AWS",
    pillar: "cloud",
    badge: "Production · BofA",
    summary: "Cloud deployments with container-based delivery.",
    proof: [
      {
        kind: "Experience",
        title: "Bank of America · Senior Software Engineer",
        detail:
          "AWS cloud solutions integrated Docker-based CI/CD to accelerate deployments and reduce manual intervention.",
        href: "#bank-of-america-senior",
        linkLabel: "View experience",
      },
    ],
    logo: "amazonwebservices",
  },
  {
    id: "gcp",
    name: "GCP",
    pillar: "cloud",
    badge: "Production · BofA",
    summary: "Cloud application delivery and infrastructure.",
    proof: [
      {
        kind: "Experience",
        title: "Bank of America · Senior Software Engineer",
        detail:
          "GCP deployments were part of the cloud delivery work alongside AWS and Docker-based pipelines.",
        href: "#bank-of-america-senior",
        linkLabel: "View experience",
      },
    ],
    logo: "googlecloud",
  },
  {
    id: "docker",
    name: "Docker",
    pillar: "cloud",
    badge: "Production · BofA",
    summary: "Reproducible application and service packaging.",
    proof: [
      {
        kind: "Experience",
        title: "Bank of America · Senior Software Engineer",
        detail: "Docker-based CI/CD accelerated deployments by 40%.",
        href: "#bank-of-america-senior",
        linkLabel: "View experience",
      },
      {
        kind: "Case study",
        title: "RouteMind AI",
        detail:
          "Docker Compose packages the API, PostgreSQL, embeddings, and persistent local state.",
        href: "/work/routemind-ai",
        linkLabel: "Read architecture",
      },
    ],
    logo: "docker",
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    pillar: "cloud",
    badge: "Academic deployment",
    summary: "Container orchestration with declared services.",
    proof: [
      {
        kind: "Repository",
        title: "Kubernetes survey deployment",
        detail:
          "The academic survey application deploys separate frontend and API containers to k3s on AWS EC2.",
        href: "https://github.com/chetsp/Full-Stack-Student-Survey-Application",
        linkLabel: "View repository",
      },
    ],
    logo: "kubernetes",
  },
  {
    id: "helm",
    name: "Helm",
    pillar: "cloud",
    badge: "Academic deployment",
    summary: "Repeatable Kubernetes deployment configuration.",
    proof: [
      {
        kind: "Repository",
        title: "Kubernetes survey deployment",
        detail:
          "Helm templates describe frontend and backend deployments, configuration, and services.",
        href: "https://github.com/chetsp/Full-Stack-Student-Survey-Application",
        linkLabel: "View repository",
      },
    ],
    logo: "helm",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    pillar: "cloud",
    badge: "Project · RouteMind",
    summary: "Durable relational storage for planning data.",
    proof: [
      {
        kind: "Case study",
        title: "RouteMind AI",
        detail:
          "The Docker deployment uses PostgreSQL 17 for schedules, carrier data, and externally visible planning results.",
        href: "/work/routemind-ai",
        linkLabel: "Read architecture",
      },
    ],
    logo: "postgresql",
  },
  {
    id: "mysql",
    name: "MySQL",
    pillar: "cloud",
    badge: "Academic deployment",
    summary: "Persistent relational storage behind CRUD APIs.",
    proof: [
      {
        kind: "Repository",
        title: "Kubernetes survey deployment",
        detail:
          "MySQL 8 stores survey submissions through SQLModel and SQLAlchemy.",
        href: "https://github.com/chetsp/Full-Stack-Student-Survey-Application",
        linkLabel: "View repository",
      },
    ],
    logo: "mysql",
  },
  {
    id: "opentelemetry",
    name: "OpenTelemetry",
    pillar: "cloud",
    badge: "Exploration",
    summary: "Exploring traces, metrics, and telemetry conventions.",
    proof: [
      {
        kind: "Exploration",
        title: "Observability focus",
        detail:
          "Exploring distributed tracing and telemetry conventions. The related production monitoring work used Java and Grafana.",
        href: "#bank-of-america-engineer",
        linkLabel: "Related monitoring experience",
      },
    ],
    logo: "opentelemetry",
  },
  {
    id: "grafana",
    name: "Grafana",
    pillar: "cloud",
    badge: "Production · BofA",
    summary: "Operational dashboards for transactions and health.",
    proof: [
      {
        kind: "Experience",
        title: "Bank of America · Software Engineer",
        detail:
          "Built Java and Grafana monitoring dashboards, reducing system downtime by 70%.",
        href: "#bank-of-america-engineer",
        linkLabel: "View experience",
      },
    ],
    logo: "grafana",
  },
  {
    id: "sql",
    name: "SQL",
    pillar: "cloud",
    badge: "Tesla · Data",
    summary: "Structured queries and durable application data.",
    proof: [
      {
        kind: "Experience",
        title: "Tesla · Logistics AI",
        detail:
          "Enterprise integration connected agents to SQL databases and operational APIs.",
        href: "#tesla",
        linkLabel: "View experience",
      },
      {
        kind: "Case study",
        title: "RouteMind AI",
        detail:
          "Relational constraints and carrier capability flags remain authoritative for route eligibility.",
        href: "/work/routemind-ai",
        linkLabel: "Read architecture",
      },
    ],
    symbol: "database",
  },
  {
    id: "cicd",
    name: "CI/CD",
    pillar: "cloud",
    badge: "Production · BofA",
    summary: "Automated build and release workflows.",
    proof: [
      {
        kind: "Experience",
        title: "Bank of America · Senior Software Engineer",
        detail: "Container-based delivery reduced manual intervention by 50%.",
        href: "#bank-of-america-senior",
        linkLabel: "View experience",
      },
      {
        kind: "Portfolio",
        title: "This portfolio",
        detail:
          "GitHub Actions builds, lints, and deploys the static portfolio to Pages.",
        href: "#home",
        linkLabel: "View portfolio",
      },
    ],
    logo: "githubactions",
  },
];
export const capabilities: Capability[] = [
  {
    id: "agents",
    title: "Agentic AI & Orchestration",
    label: "01 / AGENT WORKFLOWS",
    description:
      "Typed extraction, stateful orchestration, retrieval, and review boundaries.",
    diagram: "agents",
    toolIds: [
      "codex",
      "gemini",
      "claude",
      "langgraph",
      "pydanticai",
      "mcp",
      "adk",
      "rag",
      "evals",
    ],
  },
  {
    id: "systems",
    title: "High-Throughput Distributed Systems",
    label: "02 / PROCESSING AT SCALE",
    description:
      "Concurrent workers, scheduling, and event streams for financial processing.",
    diagram: "systems",
    toolIds: ["python", "go", "java", "kafka", "scheduling", "cplusplus"],
  },
  {
    id: "product",
    title: "Full-Stack & Product Engineering",
    label: "03 / APPLICATION DELIVERY",
    description:
      "Typed interfaces connected to validated APIs and persistent application state.",
    diagram: "product",
    toolIds: [
      "typescript",
      "react",
      "nextjs",
      "fastapi",
      "nodejs",
      "tailwind",
      "spring",
    ],
  },
  {
    id: "cloud",
    title: "Cloud, Data & Observability",
    label: "04 / OPERATIONS & DATA",
    description:
      "Container packaging, relational storage, orchestration, and monitoring.",
    diagram: "cloud",
    toolIds: [
      "aws",
      "gcp",
      "docker",
      "kubernetes",
      "helm",
      "postgresql",
      "mysql",
      "opentelemetry",
      "grafana",
      "sql",
      "cicd",
    ],
  },
];
export const engineeringPrinciples = [
  {
    id: "reliability",
    title: "Deterministic Reliability",
    detail: "55M+ daily financial calculations with strict data contracts.",
  },
  {
    id: "governance",
    title: "Governed Agentic AI",
    detail:
      "Typed inputs, Pydantic validation, MCP tool boundaries, and human-in-the-loop review.",
  },
  {
    id: "ownership",
    title: "End-to-End Ownership",
    detail:
      "Architecture, distributed backends, telemetry, and production operations.",
  },
];
export const skillGroups = capabilities.map((capability) => ({
  name: capability.title,
  items: tools
    .filter((tool) => tool.pillar === capability.id)
    .map((tool) => tool.name),
  detail: capability.description,
}));
export const knowledgeBase = {
  profile,
  experience,
  projects,
  skillGroups,
  tools,
  capabilities,
  engineeringPrinciples,
  sourceNote:
    "Professional background and metrics provided by Chetana. Project architecture and scope are maintained with the linked repositories.",
};
